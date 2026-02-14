import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore } from '../lib/design-context.js';
import { auditStyles } from '../lib/style-audit.js';
import { extractDesignFromUrl } from '../lib/design-extractor.js';
import type { IGeneratedFile, IDesignContext } from '../lib/types.js';

const inputSchema = {
  component_type: z.string().describe('Type of component to generate (e.g., "button", "card", "form", "navbar", "sidebar", "modal", "table", "hero")'),
  framework: z.enum(['react', 'nextjs', 'vue', 'angular']).describe('Target framework'),
  props: z.record(z.string()).optional().describe('Component props as key-value pairs'),
  design_reference_url: z.string().url().optional().describe('URL to extract design inspiration from'),
  existing_tailwind_config: z.string().optional().describe('Existing tailwind.config.js content for style audit'),
  existing_css_variables: z.string().optional().describe('Existing CSS variables for style audit'),
};

export function registerGenerateUiComponent(server: McpServer): void {
  server.tool(
    'generate_ui_component',
    'Create or iterate UI components with style audit and design context awareness. Supports React, Next.js, Vue, and Angular.',
    inputSchema,
    async ({ component_type, framework, props, design_reference_url, existing_tailwind_config, existing_css_variables }) => {
      const warnings: string[] = [];

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
            const ctx = designContextStore.get();
            ctx.colorPalette.primary = designData.colors[0] ?? ctx.colorPalette.primary;
            if (designData.colors[1]) ctx.colorPalette.secondary = designData.colors[1];
            if (designData.colors[2]) ctx.colorPalette.accent = designData.colors[2];
            designContextStore.set(ctx);
          }
          if (designData.typography.fonts.length > 0) {
            const ctx = designContextStore.get();
            ctx.typography.fontFamily = `${designData.typography.fonts[0]}, system-ui, sans-serif`;
            designContextStore.set(ctx);
          }
        } catch (e) {
          warnings.push(`Design extraction failed: ${String(e)}`);
        }
      }

      const ctx = designContextStore.get();
      const files = generateComponent(component_type, framework, ctx, props);

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
            text: JSON.stringify({ files, designContext: ctx }, null, 2),
          },
        ],
      };
    }
  );
}

function generateComponent(
  componentType: string,
  framework: string,
  ctx: IDesignContext,
  props?: Record<string, string>
): IGeneratedFile[] {
  const componentName = toPascalCase(componentType);
  const propsInterface = props
    ? Object.entries(props)
        .map(([key, type]) => `  ${key}: ${type};`)
        .join('\n')
    : '';

  switch (framework) {
    case 'react':
    case 'nextjs':
      return generateReactComponent(componentName, componentType, ctx, propsInterface, props);
    case 'vue':
      return generateVueComponent(componentName, componentType, ctx, props);
    case 'angular':
      return generateAngularComponent(componentName, componentType, ctx, props);
    default:
      return generateReactComponent(componentName, componentType, ctx, propsInterface, props);
  }
}

function generateReactComponent(
  name: string,
  type: string,
  ctx: IDesignContext,
  propsInterface: string,
  props?: Record<string, string>
): IGeneratedFile[] {
  const propsType = propsInterface
    ? `\ninterface ${name}Props {\n${propsInterface}\n}\n`
    : '';
  const propsArg = propsInterface ? `{ ${Object.keys(props ?? {}).join(', ')} }: ${name}Props` : '';
  const body = getComponentBody(type, ctx, 'react');

  return [
    {
      path: `components/${kebabCase(name)}.tsx`,
      content: `import { cn } from '@/lib/utils'\n${propsType}
export function ${name}(${propsArg}) {
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

function getComponentBody(type: string, ctx: IDesignContext, _fw: string): string {
  const primary = ctx.colorPalette.primary;
  const radius = ctx.borderRadius.md;

  switch (type.toLowerCase()) {
    case 'button':
      return `    <button
      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ backgroundColor: '${primary}', borderRadius: '${radius}' }}
    >
      Click me
    </button>`;

    case 'card':
      return `    <div className="rounded-lg border bg-white p-6 shadow-sm" style={{ borderRadius: '${ctx.borderRadius.lg}' }}>
      <h3 className="text-lg font-semibold" style={{ color: '${ctx.colorPalette.foreground}' }}>Card Title</h3>
      <p className="mt-2 text-sm" style={{ color: '${ctx.colorPalette.mutedForeground}' }}>Card description goes here.</p>
    </div>`;

    case 'form':
      return `    <form className="space-y-4 rounded-lg border p-6" style={{ borderRadius: '${ctx.borderRadius.lg}' }}>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter your email" style={{ borderRadius: '${radius}' }} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input type="password" className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter your password" style={{ borderRadius: '${radius}' }} />
      </div>
      <button type="submit" className="w-full rounded-md px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: '${primary}', borderRadius: '${radius}' }}>
        Submit
      </button>
    </form>`;

    case 'navbar':
    case 'nav':
      return `    <nav className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: '${primary}' }}>
      <div className="text-lg font-bold text-white">Logo</div>
      <div className="flex gap-6">
        <a href="#" className="text-sm text-white/80 hover:text-white">Home</a>
        <a href="#" className="text-sm text-white/80 hover:text-white">About</a>
        <a href="#" className="text-sm text-white/80 hover:text-white">Contact</a>
      </div>
    </nav>`;

    case 'hero':
      return `    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold tracking-tight" style={{ color: '${ctx.colorPalette.foreground}' }}>
        Welcome to Your App
      </h1>
      <p className="mt-4 max-w-xl text-lg" style={{ color: '${ctx.colorPalette.mutedForeground}' }}>
        Build something amazing with modern tools and best practices.
      </p>
      <button className="mt-8 rounded-md px-8 py-3 text-sm font-medium text-white" style={{ backgroundColor: '${primary}', borderRadius: '${radius}' }}>
        Get Started
      </button>
    </section>`;

    case 'modal':
      return `    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg" style={{ borderRadius: '${ctx.borderRadius.lg}' }}>
        <h2 className="text-lg font-semibold" style={{ color: '${ctx.colorPalette.foreground}' }}>Modal Title</h2>
        <p className="mt-2 text-sm" style={{ color: '${ctx.colorPalette.mutedForeground}' }}>Modal content goes here.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-md border px-4 py-2 text-sm">Cancel</button>
          <button className="rounded-md px-4 py-2 text-sm text-white" style={{ backgroundColor: '${primary}' }}>Confirm</button>
        </div>
      </div>
    </div>`;

    default:
      return `    <div className="rounded-lg border p-4" style={{ borderRadius: '${ctx.borderRadius.lg}' }}>
      <p style={{ color: '${ctx.colorPalette.foreground}' }}>${type} component</p>
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
    case 'string': return 'String';
    case 'number': return 'Number';
    case 'boolean': return 'Boolean';
    default: return 'Object';
  }
}
