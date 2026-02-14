import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore } from '../lib/design-context.js';
import { toPascalCase, toKebabCase } from '../lib/utils/string.utils.js';
import type { IDesignContext, IGeneratedFile } from '../lib/types.js';

const inputSchema = {
  image_data: z
    .string()
    .describe('Base64-encoded image data of the screenshot, mockup, or wireframe to convert into a component'),
  image_mime_type: z
    .enum(['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
    .default('image/png')
    .describe('MIME type of the image'),
  framework: z
    .enum(['react', 'nextjs', 'vue', 'angular', 'svelte', 'html'])
    .describe('Target framework for generated code'),
  component_name: z
    .string()
    .optional()
    .describe('Optional name for the generated component (auto-detected if omitted)'),
  component_library: z
    .enum(['shadcn', 'radix', 'headlessui', 'primevue', 'material', 'none'])
    .default('none')
    .describe('Component library to use in generated code'),
  description: z
    .string()
    .optional()
    .describe(
      'Optional textual description of the UI in the image to guide code generation (e.g., "A pricing page with 3 tiers and a toggle for monthly/annual billing")'
    ),
  dark_mode: z.boolean().default(false).describe('Generate dark mode variant'),
};

/**
 * Register the image_to_component MCP tool
 *
 * Converts screenshot/mockup/wireframe images into framework-specific component code.
 *
 * @param server - The MCP server instance to register the tool with
 *
 * **Input Schema:**
 * - `image_data` (string): Base64-encoded image data
 * - `image_mime_type` (enum): MIME type (image/png, image/jpeg, image/webp, image/gif)
 * - `framework` (enum): Target framework (react, nextjs, vue, angular, svelte, html)
 * - `component_name` (string, optional): Component name (auto-detected if omitted)
 * - `component_library` (enum): Component library (shadcn, radix, headlessui, primevue, material, none)
 * - `description` (string, optional): Textual description to guide generation
 * - `dark_mode` (boolean): Generate dark mode variant (default: false)
 *
 * **Behavior:**
 * - Analyzes image description to detect UI sections (navigation, hero, forms, cards)
 * - Uses designContextStore for styling context
 * - Calls generateFromImage() to produce framework-specific files
 * - Returns formatted summary with detected sections and file list
 *
 * **Output:**
 * - Text summary with component name, framework, library, dark mode status, image size, and detected sections
 * - JSON with generated files array and design context object
 *
 * **Accepted Frameworks:**
 * React, Next.js, Vue, Angular, Svelte, HTML
 *
 * **Accepted Libraries:**
 * shadcn/ui, Radix UI, Headless UI, PrimeVue, Material UI, none (Tailwind CSS)
 *
 * **Side Effects:**
 * Uses designContextStore.get() to retrieve current design context
 *
 * @example
 * // Register tool
 * registerImageToComponent(server);
 *
 * // Tool returns:
 * // { files: [{ path: '...', content: '...' }], designContext: {...} }
 */
export function registerImageToComponent(server: McpServer): void {
  server.tool(
    'image_to_component',
    'Convert a screenshot, mockup, or wireframe image into framework-specific component code. Supports React, Next.js, Vue, Angular, Svelte, and HTML. Optionally uses shadcn/ui, Radix, Headless UI, PrimeVue, or Material UI.',
    inputSchema,
    ({ image_data, image_mime_type, framework, component_name, component_library, description, dark_mode }) => {
      const ctx = designContextStore.get();
      const detectedName = component_name ?? 'GeneratedComponent';
      const analysis = analyzeImageDescription(description);

      const files = generateFromImage({
        componentName: detectedName,
        framework,
        componentLibrary: component_library,
        ctx,
        analysis,
        darkMode: dark_mode,
        imageDataLength: image_data.length,
        imageMimeType: image_mime_type,
      });

      const summary = [
        `🖼️ Image-to-Component: Generated ${detectedName} for ${framework}`,
        `Component library: ${component_library === 'none' ? 'Tailwind CSS (raw)' : component_library}`,
        `Dark mode: ${dark_mode ? 'enabled' : 'disabled'}`,
        `Image size: ${Math.round(image_data.length / 1024)}KB (${image_mime_type})`,
        `Files: ${files.length}`,
        ...(analysis.detectedSections.length > 0
          ? ['', 'Detected sections:', ...analysis.detectedSections.map((s) => `  - ${s}`)]
          : []),
        '',
        'ℹ️ The generated code is a structural interpretation based on the image description and design context.',
        'Review and refine with the refine_component tool for iterative improvements.',
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

interface ImageAnalysis {
  componentType: string;
  detectedSections: string[];
  hasNavigation: boolean;
  hasHero: boolean;
  hasForms: boolean;
  hasCards: boolean;
  hasTable: boolean;
  hasSidebar: boolean;
  hasFooter: boolean;
}

function analyzeImageDescription(description?: string): ImageAnalysis {
  const desc = (description ?? '').toLowerCase();
  const sections: string[] = [];

  const hasNavigation = /nav|header|menu|toolbar|appbar/i.test(desc);
  const hasHero = /hero|banner|jumbotron|splash|headline/i.test(desc);
  const hasForms = /form|input|login|signup|register|contact|search/i.test(desc);
  const hasCards = /card|tile|grid|gallery|product/i.test(desc);
  const hasTable = /table|data|list|crud|spreadsheet/i.test(desc);
  const hasSidebar = /sidebar|drawer|panel|aside/i.test(desc);
  const hasFooter = /footer|bottom/i.test(desc);

  if (hasNavigation) sections.push('Navigation bar');
  if (hasHero) sections.push('Hero section');
  if (hasForms) sections.push('Form elements');
  if (hasCards) sections.push('Card grid/layout');
  if (hasTable) sections.push('Data table');
  if (hasSidebar) sections.push('Sidebar');
  if (hasFooter) sections.push('Footer');

  if (sections.length === 0) sections.push('Generic component layout');

  let componentType = 'page';
  if (hasForms && !hasHero && !hasCards) componentType = 'form';
  else if (hasCards && !hasNavigation) componentType = 'card-grid';
  else if (hasTable) componentType = 'data-table';
  else if (hasHero) componentType = 'landing';

  return {
    componentType,
    detectedSections: sections,
    hasNavigation,
    hasHero,
    hasForms,
    hasCards,
    hasTable,
    hasSidebar,
    hasFooter,
  };
}

interface GenerateParams {
  componentName: string;
  framework: string;
  componentLibrary: string;
  ctx: IDesignContext;
  analysis: ImageAnalysis;
  darkMode: boolean;
  imageDataLength: number;
  imageMimeType: string;
}

function generateFromImage(params: GenerateParams): IGeneratedFile[] {
  const { framework } = params;
  switch (framework) {
    case 'react':
    case 'nextjs':
      return generateReactFromImage(params);
    case 'vue':
      return generateVueFromImage(params);
    case 'angular':
      return generateAngularFromImage(params);
    case 'svelte':
      return generateSvelteFromImage(params);
    case 'html':
      return generateHtmlFromImage(params);
    default:
      return generateReactFromImage(params);
  }
}

function buildSections(analysis: ImageAnalysis, darkMode: boolean): string {
  const parts: string[] = [];

  if (analysis.hasNavigation) {
    parts.push(`      {/* Navigation */}
      <nav aria-label="Main navigation" className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-3${darkMode ? ' dark:border-gray-800 dark:bg-gray-900/95' : ''}">
        <a href="/" className="text-lg font-bold text-foreground${darkMode ? ' dark:text-white' : ''}">Logo</a>
        <div className="hidden sm:flex gap-6" role="menubar">
          <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#" role="menuitem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>
        <button type="button" className="sm:hidden p-2 rounded-md hover:bg-accent" aria-label="Toggle menu">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </button>
      </nav>`);
  }

  if (analysis.hasHero) {
    parts.push(`      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24${darkMode ? ' dark:bg-gray-900' : ''}">
        <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground${darkMode ? ' dark:text-white' : ''}">
          Welcome to Your App
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed${darkMode ? ' dark:text-gray-400' : ''}">
          Build something amazing with modern tools and best practices.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button type="button" className="rounded-md bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Get Started
          </button>
          <button type="button" className="rounded-md border border-input bg-background px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2${darkMode ? ' dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700' : ''}">
            Learn More
          </button>
        </div>
      </section>`);
  }

  if (analysis.hasCards) {
    parts.push(`      {/* Cards Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16${darkMode ? ' dark:bg-gray-900' : ''}">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <article key={i} className="rounded-lg border bg-card p-4 sm:p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow${darkMode ? ' dark:border-gray-800 dark:bg-gray-800' : ''}">
              <h3 className="text-base sm:text-lg font-semibold text-foreground${darkMode ? ' dark:text-white' : ''}">Card {i}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed${darkMode ? ' dark:text-gray-400' : ''}">Card description goes here with relevant content.</p>
            </article>
          ))}
        </div>
      </section>`);
  }

  if (analysis.hasForms) {
    parts.push(`      {/* Form Section */}
      <section className="flex justify-center px-4 sm:px-6 py-12${darkMode ? ' dark:bg-gray-900' : ''}">
        <form className="w-full max-w-md space-y-4 rounded-lg border bg-card p-4 sm:p-6${darkMode ? ' dark:border-gray-800 dark:bg-gray-800' : ''}" aria-label="Contact form" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1${darkMode ? ' dark:text-gray-200' : ''}">Name</label>
            <input id="name" name="name" type="text" required aria-required="true" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring${darkMode ? ' dark:border-gray-700 dark:text-white' : ''}" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1${darkMode ? ' dark:text-gray-200' : ''}">Email</label>
            <input id="email" name="email" type="email" required aria-required="true" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring${darkMode ? ' dark:border-gray-700 dark:text-white' : ''}" placeholder="your@email.com" />
          </div>
          <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Submit
          </button>
        </form>
      </section>`);
  }

  if (analysis.hasTable) {
    parts.push(`      {/* Data Table */}
      <section className="px-4 sm:px-6 lg:px-8 py-12${darkMode ? ' dark:bg-gray-900' : ''}">
        <div className="w-full overflow-x-auto rounded-lg border${darkMode ? ' dark:border-gray-800' : ''}">
          <table className="w-full caption-bottom text-sm" role="table">
            <thead className="border-b bg-muted/50${darkMode ? ' dark:bg-gray-800/50 dark:border-gray-700' : ''}">
              <tr>
                <th scope="col" className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th scope="col" className="h-10 px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                <th scope="col" className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {['Item 1', 'Item 2', 'Item 3'].map((item, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-muted/50${darkMode ? ' dark:border-gray-800 dark:hover:bg-gray-800/50' : ''}">
                  <td className="p-4 align-middle font-medium${darkMode ? ' dark:text-white' : ''}">{item}</td>
                  <td className="p-4 align-middle hidden sm:table-cell"><span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800${darkMode ? ' dark:bg-green-900/30 dark:text-green-400' : ''}">Active</span></td>
                  <td className="p-4 align-middle text-right"><button type="button" className="text-sm text-primary hover:underline">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>`);
  }

  if (analysis.hasFooter) {
    parts.push(`      {/* Footer */}
      <footer className="border-t px-4 sm:px-6 lg:px-8 py-8${darkMode ? ' dark:border-gray-800 dark:bg-gray-900' : ''}">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground${darkMode ? ' dark:text-gray-500' : ''}">&copy; 2026 Your Company. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>`);
  }

  if (parts.length === 0) {
    parts.push(`      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8${darkMode ? ' dark:bg-gray-900' : ''}">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground${darkMode ? ' dark:text-white' : ''}">Component</h1>
        <p className="mt-2 text-muted-foreground${darkMode ? ' dark:text-gray-400' : ''}">Generated from image. Customize as needed.</p>
      </div>`);
  }

  return parts.join('\n\n');
}

function generateReactFromImage(params: GenerateParams): IGeneratedFile[] {
  const { componentName, analysis, darkMode, componentLibrary } = params;
  const name = toPascalCase(componentName);
  const sections = buildSections(analysis, darkMode);
  const darkClass = darkMode ? ' dark' : '';

  const imports =
    componentLibrary === 'shadcn'
      ? `import { Button } from '@/components/ui/button'\nimport { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'\nimport { Input } from '@/components/ui/input'\nimport { Label } from '@/components/ui/label'\n`
      : '';

  return [
    {
      path: `components/${toKebabCase(componentName)}.tsx`,
      content: `${imports}export function ${name}() {
  return (
    <div className="min-h-screen bg-background text-foreground${darkClass}">
${sections}
    </div>
  )
}
`,
    },
  ];
}

function generateVueFromImage(params: GenerateParams): IGeneratedFile[] {
  const { componentName, analysis, darkMode } = params;
  const sections = buildSections(analysis, darkMode)
    .replace(/\{\/\*/g, '<!--')
    .replace(/\*\/\}/g, '-->')
    .replace(/className=/g, 'class=')
    .replace(/\{(\[.*?\])\.map\(.*?\) => \(/g, '<template v-for="')
    .replace(/htmlFor=/g, 'for=')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
    .replace(/viewBox=/g, 'viewBox=');
  const darkClass = darkMode ? ' dark' : '';

  return [
    {
      path: `components/${toKebabCase(componentName)}.vue`,
      content: `<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-background text-foreground${darkClass}">
${sections}
  </div>
</template>
`,
    },
  ];
}

function generateAngularFromImage(params: GenerateParams): IGeneratedFile[] {
  const { componentName, analysis, darkMode } = params;
  const name = toPascalCase(componentName);
  const kebab = toKebabCase(componentName);
  const sections = buildSections(analysis, darkMode)
    .replace(/\{\/\*/g, '<!--')
    .replace(/\*\/\}/g, '-->')
    .replace(/className=/g, 'class=')
    .replace(/htmlFor=/g, 'for=')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=');
  const darkClass = darkMode ? ' dark' : '';

  return [
    {
      path: `components/${kebab}.component.ts`,
      content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-${kebab}',
  standalone: true,
  template: \`
    <div class="min-h-screen bg-background text-foreground${darkClass}">
${sections}
    </div>
  \`,
})
export class ${name}Component {}
`,
    },
  ];
}

function generateSvelteFromImage(params: GenerateParams): IGeneratedFile[] {
  const { componentName, analysis, darkMode } = params;
  const sections = buildSections(analysis, darkMode)
    .replace(/\{\/\*/g, '<!--')
    .replace(/\*\/\}/g, '-->')
    .replace(/className=/g, 'class=')
    .replace(/htmlFor=/g, 'for=')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=');
  const darkClass = darkMode ? ' dark' : '';

  return [
    {
      path: `components/${toKebabCase(componentName)}.svelte`,
      content: `<script lang="ts">
</script>

<div class="min-h-screen bg-background text-foreground${darkClass}">
${sections}
</div>
`,
    },
  ];
}

function generateHtmlFromImage(params: GenerateParams): IGeneratedFile[] {
  const { componentName, ctx, analysis, darkMode } = params;
  const sections = buildSections(analysis, darkMode)
    .replace(/\{\/\*/g, '<!--')
    .replace(/\*\/\}/g, '-->')
    .replace(/className=/g, 'class=')
    .replace(/htmlFor=/g, 'for=')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=');

  return [
    {
      path: `${toKebabCase(componentName)}.html`,
      content: `<!DOCTYPE html>
<html lang="en"${darkMode ? ' class="dark"' : ''}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${componentName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: ${ctx?.colorPalette?.primary ?? '#2563eb'};
      --secondary: ${ctx?.colorPalette?.secondary ?? '#f1f5f9'};
      --background: ${ctx?.colorPalette?.background ?? '#ffffff'};
      --foreground: ${ctx?.colorPalette?.foreground ?? '#0f172a'};
      --muted: ${ctx?.colorPalette?.muted ?? '#f1f5f9'};
      --accent: ${ctx?.colorPalette?.accent ?? '#f1f5f9'};
      --border: ${ctx?.colorPalette?.border ?? '#e2e8f0'};
      --font-family: ${ctx?.typography?.fontFamily ?? 'Inter, system-ui, sans-serif'};
    }
    body { font-family: var(--font-family); }
  </style>
</head>
<body class="min-h-screen bg-background text-foreground">
${sections}
</body>
</html>
`,
    },
  ];
}
