import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore } from '../lib/design-context.js';
import { auditStyles } from '../lib/style-audit.js';
import { extractDesignFromUrl } from '../lib/design-extractor.js';
import { jsxToHtmlAttributes, jsxToSvelte } from '../lib/utils/jsx.utils.js';
import type { IGeneratedFile, IDesignContext } from '../lib/types.js';

const inputSchema = {
  component_type: z
    .string()
    .describe(
      'Type of component to generate (e.g., "button", "card", "form", "navbar", "sidebar", "modal", "table", "hero")'
    ),
  framework: z.enum(['react', 'nextjs', 'vue', 'angular', 'svelte', 'html']).describe('Target framework'),
  props: z.record(z.string()).optional().describe('Component props as key-value pairs'),
  component_library: z
    .enum(['shadcn', 'radix', 'headlessui', 'primevue', 'material', 'none'])
    .default('none')
    .describe('Component library to use in generated code'),
  design_reference_url: z.string().url().optional().describe('URL to extract design inspiration from'),
  existing_tailwind_config: z.string().optional().describe('Existing tailwind.config.js content for style audit'),
  existing_css_variables: z.string().optional().describe('Existing CSS variables for style audit'),
};

export function registerGenerateUiComponent(server: McpServer): void {
  server.tool(
    'generate_ui_component',
    'Create or iterate UI components with style audit and design context awareness. Supports React, Next.js, Vue, Angular, Svelte, and HTML. NOTE: component_library parameter is currently not implemented - all components use raw Tailwind CSS classes. Component library integration is planned for a future release.',
    inputSchema,
    async ({
      component_type,
      framework,
      props,
      component_library,
      design_reference_url,
      existing_tailwind_config,
      existing_css_variables,
    }) => {
      const warnings: string[] = [];

      // Warn if component_library is specified but not 'none'
      if (component_library && component_library !== 'none') {
        warnings.push(
          `⚠️  Component library '${component_library}' is not yet implemented. Generated component will use raw Tailwind CSS classes.`
        );
      }

      // Style audit
      if (existing_tailwind_config || existing_css_variables) {
        const auditResult = auditStyles(existing_tailwind_config, existing_css_variables);
        designContextStore.update(auditResult.context);
        warnings.push(...auditResult.warnings);
      }

      // Design URL extraction
      if (design_reference_url) {
        try {
          const designData = await extractDesignFromUrl(design_reference_url);
          if (designData.colors.length > 0) {
            // designContextStore.get() returns a deep clone, safe to mutate
            const context = designContextStore.get();
            context.colorPalette.primary = designData.colors[0] ?? context.colorPalette.primary;
            if (designData.colors[1]) context.colorPalette.secondary = designData.colors[1];
            if (designData.colors[2]) context.colorPalette.accent = designData.colors[2];
            designContextStore.set(context);
          }
          if (designData.typography.fonts.length > 0) {
            // designContextStore.get() returns a deep clone, safe to mutate
            const context = designContextStore.get();
            context.typography.fontFamily = `${designData.typography.fonts[0]}, system-ui, sans-serif`;
            designContextStore.set(context);
          }
        } catch (error) {
          warnings.push(`Design extraction failed: ${String(error)}`);
        }
      }

      const designContext = designContextStore.get();
      const files = generateComponent(component_type, framework, designContext, props);

      const summary = [
        `Generated ${component_type} component for ${framework}`,
        `Files: ${files.length}`,
        ...(warnings.length > 0 ? ['Warnings:', ...warnings.map((w) => `  ⚠ ${w}`)] : []),
      ].join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          {
            type: 'text',
            text: JSON.stringify({ files, designContext }, null, 2),
          },
        ],
      };
    }
  );
}

function generateComponent(
  componentType: string,
  framework: string,
  designContext: IDesignContext,
  props?: Record<string, string>
): IGeneratedFile[] {
  const componentName = toPascalCase(componentType);
  // Generate only the interface body (not the full interface declaration)
  const propsInterfaceBody =
    props && Object.keys(props).length > 0
      ? Object.entries(props)
          .map(([key, propType]) => `  ${key}: ${propType};`)
          .join('\n')
      : '';

  switch (framework) {
    case 'react':
    case 'nextjs':
      return generateReactComponent(componentName, componentType, designContext, propsInterfaceBody, props);
    case 'vue':
      return generateVueComponent(componentName, componentType, designContext, props);
    case 'angular':
      return generateAngularComponent(componentName, componentType, designContext, props);
    case 'svelte':
      return generateSvelteComponent(componentName, componentType, designContext, props);
    case 'html':
      return generateHtmlComponent(componentName, componentType, designContext);
    default:
      return generateReactComponent(componentName, componentType, designContext, propsInterfaceBody, props);
  }
}

function generateReactComponent(
  name: string,
  type: string,
  ctx: IDesignContext,
  propsInterfaceBody: string,
  props?: Record<string, string>
): IGeneratedFile[] {
  const propsType = propsInterfaceBody ? `interface ${name}Props {\n${propsInterfaceBody}\n}\n\n` : '';
  const propsArg = propsInterfaceBody ? `{ ${Object.keys(props ?? {}).join(', ')} }: ${name}Props` : '';
  const body = getComponentBody(type, ctx, 'react');

  return [
    {
      path: `components/${kebabCase(name)}.tsx`,
      content: `${propsType}export function ${name}(${propsArg}) {
  return (
${body}
  )
}
`,
    },
  ];
}

function generateVueComponent(
  name: string,
  type: string,
  ctx: IDesignContext,
  props?: Record<string, string>
): IGeneratedFile[] {
  const propsBlock = props
    ? Object.entries(props)
        .map(([key, pType]) => `  ${key}: { type: ${vueType(pType)}, required: true },`)
        .join('\n')
    : '';
  const body = getComponentBody(type, ctx, 'vue');

  return [
    {
      path: `components/${kebabCase(name)}.vue`,
      content: `<script setup lang="ts">
${propsBlock ? `defineProps({\n${propsBlock}\n})` : ''}
</script>

<template>
${body}
</template>
`,
    },
  ];
}

function generateAngularComponent(
  name: string,
  type: string,
  ctx: IDesignContext,
  props?: Record<string, string>
): IGeneratedFile[] {
  const inputDecls = props
    ? Object.entries(props)
        .map(([key, pType]) => `  @Input() ${key}!: ${pType};`)
        .join('\n')
    : '';
  const body = getComponentBody(type, ctx, 'angular');

  return [
    {
      path: `components/${kebabCase(name)}.component.ts`,
      content: `import { Component${props ? ', Input' : ''} } from '@angular/core';

@Component({
  selector: 'app-${kebabCase(name)}',
  standalone: true,
  template: \`
${body}
  \`,
})
export class ${name}Component {
${inputDecls}
}
`,
    },
  ];
}

function generateSvelteComponent(
  name: string,
  type: string,
  ctx: IDesignContext,
  props?: Record<string, string>
): IGeneratedFile[] {
  const propsDecl = props
    ? Object.entries(props)
        .map(([key, pType]) => `  export let ${key}: ${pType};`)
        .join('\n')
    : '';
  const body = jsxToSvelte(getComponentBody(type, ctx, 'svelte'));

  return [
    {
      path: `components/${kebabCase(name)}.svelte`,
      content: `<script lang="ts">
${propsDecl}
</script>

${body}
`,
    },
  ];
}

function generateHtmlComponent(name: string, type: string, ctx: IDesignContext): IGeneratedFile[] {
  const body = jsxToHtmlAttributes(getComponentBody(type, ctx, 'html'));

  return [
    {
      path: `components/${kebabCase(name)}.html`,
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name}</title>
  <!-- CDN approach for quick prototyping. Trade-offs: no tree-shaking, runtime network dependency.
       For production: use build-time Tailwind compilation (npm install tailwindcss) or prebuilt CSS. -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: ${ctx.colorPalette.primary};
      --background: ${ctx.colorPalette.background};
      --foreground: ${ctx.colorPalette.foreground};
      --font-family: ${ctx.typography.fontFamily};
    }
    body { font-family: var(--font-family); }
  </style>
</head>
<body>
${body}
</body>
</html>
`,
    },
  ];
}

function getComponentBody(type: string, _ctx: IDesignContext, _fw: string): string {
  switch (type.toLowerCase()) {
    case 'button':
      return `    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      aria-label="Action button"
    >
      Click me
    </button>`;

    case 'card':
      return `    <article className="rounded-lg border bg-card p-4 sm:p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-base sm:text-lg font-semibold text-foreground">Card Title</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Card description goes here.</p>
    </article>`;

    case 'form':
      return `    <form className="space-y-4 rounded-lg border bg-card p-4 sm:p-6" aria-label="Login form" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your email" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required aria-required="true" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your password" />
      </div>
      <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        Submit
      </button>
    </form>`;

    case 'navbar':
    case 'nav':
      return `    <nav aria-label="Main navigation" className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <a href="/" className="text-lg font-bold text-foreground">Logo</a>
      <div className="hidden sm:flex gap-4 md:gap-6" role="menubar">
        <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Home</a>
        <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">About</a>
        <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Contact</a>
      </div>
      <button type="button" className="sm:hidden p-2 rounded-md hover:bg-accent" aria-label="Toggle menu" aria-expanded="false">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
      </button>
    </nav>`;

    case 'hero':
      return `    <section aria-labelledby="hero-heading" className="flex min-h-[60vh] flex-col items-center justify-center bg-background text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        Welcome to Your App
      </h1>
      <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Build something amazing with modern tools and best practices.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button type="button" className="rounded-md bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Get Started
        </button>
        <button type="button" className="rounded-md border border-input bg-background px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Learn More
        </button>
      </div>
    </section>`;

    case 'modal':
      return `    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-desc" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm sm:max-w-md rounded-lg bg-background p-4 sm:p-6 shadow-lg">
        <h2 id="modal-title" className="text-lg font-semibold text-foreground">Modal Title</h2>
        <p id="modal-desc" className="mt-2 text-sm text-muted-foreground leading-relaxed">Modal content goes here.</p>
        <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button type="button" className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Cancel</button>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Confirm</button>
        </div>
      </div>
    </div>`;

    case 'table':
      return `    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="w-full caption-bottom text-sm" role="table">
        <caption className="mt-4 text-sm text-muted-foreground">A list of items.</caption>
        <thead className="border-b bg-muted/50">
          <tr>
            <th scope="col" className="h-10 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th scope="col" className="h-10 px-3 sm:px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">Status</th>
            <th scope="col" className="h-10 px-3 sm:px-4 text-right align-middle font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b transition-colors hover:bg-muted/50">
            <td className="p-3 sm:p-4 align-middle font-medium">Item 1</td>
            <td className="p-3 sm:p-4 align-middle hidden sm:table-cell"><span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Active</span></td>
            <td className="p-3 sm:p-4 align-middle text-right"><button type="button" className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>`;

    case 'sidebar':
      return `    <aside aria-label="Sidebar navigation" className="flex h-full w-56 sm:w-64 flex-col border-r bg-background">
      <div className="p-4 sm:p-6 border-b">
        <span className="text-lg font-semibold text-foreground">App Name</span>
      </div>
      <nav aria-label="Sidebar links" className="flex-1 space-y-1 p-2 sm:p-4">
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground">Dashboard</a>
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Settings</a>
        <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Profile</a>
      </nav>
    </aside>`;

    default:
      return `    <div className="rounded-lg border bg-card p-4 sm:p-6 text-card-foreground shadow-sm">
      <p className="text-foreground">${type} component</p>
    </div>`;
  }
}

function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c: string) => c.toUpperCase());
}

function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function vueType(tsType: string): string {
  switch (tsType.toLowerCase()) {
    case 'string':
      return 'String';
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Boolean';
    default:
      return 'Object';
  }
}
