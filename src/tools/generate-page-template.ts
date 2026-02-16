import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore } from '../lib/design-context.js';
import type { IDesignContext, IGeneratedFile, PageTemplateType } from '../lib/types.js';
import { initializeRegistry } from '../lib/design-references/component-registry/init.js';
import { getRegistrySize } from '../lib/design-references/component-registry/index.js';

const inputSchema = {
  template: z
    .enum([
      'landing',
      'dashboard',
      'auth_login',
      'auth_signup',
      'pricing',
      'settings',
      'crud_table',
      'blog_list',
      'onboarding',
      'error_404',
    ])
    .describe('Type of page template to generate'),
  framework: z.enum(['react', 'nextjs', 'vue', 'angular', 'svelte', 'html']).describe('Target framework'),
  component_library: z
    .enum(['shadcn', 'radix', 'headlessui', 'primevue', 'material', 'none'])
    .default('none')
    .describe('Component library to use'),
  dark_mode: z.boolean().default(false).describe('Include dark mode variant classes'),
  project_name: z.string().optional().describe('Project/app name to use in the template (defaults to "MyApp")'),
  mood: z.enum(['bold', 'calm', 'playful', 'professional', 'premium', 'energetic', 'minimal', 'editorial', 'futuristic', 'warm', 'corporate', 'creative']).optional().describe('Design mood/personality'),
  industry: z.enum(['saas', 'fintech', 'ecommerce', 'healthcare', 'education', 'startup', 'agency', 'media', 'devtools', 'general']).optional().describe('Target industry for tailored design'),
  visual_style: z.enum(['glassmorphism', 'neubrutalism', 'soft-depth', 'bento-grid', 'gradient-mesh', 'dark-premium', 'minimal-editorial', 'linear-modern', 'retro-playful', 'corporate-trust']).optional().describe('Visual style layer to apply'),
};

/**
 * Register the generate_page_template MCP tool
 *
 * Generates pre-built page templates for common UI patterns.
 *
 * @param server - The MCP server instance to register the tool with
 *
 * **Input Schema:**
 * - `template` (enum): Type of page template (landing, dashboard, auth_login, auth_signup, pricing, settings, crud_table, blog_list, onboarding, error_404)
 * - `framework` (enum): Target framework (react, nextjs, vue, angular, svelte, html)
 * - `component_library` (enum): Component library to use (shadcn, radix, headlessui, primevue, material, none)
 * - `dark_mode` (boolean): Include dark mode variant classes (default: false)
 * - `project_name` (string, optional): Project/app name (default: "MyApp")
 *
 * **Behavior:**
 * - Retrieves current design context from designContextStore
 * - Calls generateTemplate() to produce framework-specific files
 * - Returns formatted summary and JSON with files and design context
 *
 * **Output:**
 * - Text summary with template type, framework, library, dark mode status, and file list
 * - JSON with generated files array and design context object
 */
export function registerGeneratePageTemplate(server: McpServer): void {
  server.tool(
    'generate_page_template',
    'Generate pre-built page templates for common UI patterns: landing pages, dashboards, auth flows, pricing, settings, CRUD tables, blog listings, onboarding wizards, and error pages. Supports all frameworks and component libraries.',
    inputSchema,
    ({ template, framework, component_library, dark_mode, project_name, mood, industry, visual_style }) => {
      try {
        // Initialize the component registry on first use
        initializeRegistry();

        const ctx = designContextStore.get();
        const appName = project_name ?? 'MyApp';
        const files = generateTemplate(template, framework, component_library, dark_mode, appName, ctx);

        // RAG metadata for the response
        const registrySize = getRegistrySize();
        const designParams = [
          mood && `Mood: ${mood}`,
          industry && `Industry: ${industry}`,
          visual_style && `Style: ${visual_style}`,
        ].filter(Boolean).join(' | ');

        const ragInfo = registrySize > 0
          ? `\n📚 RAG Registry: ${registrySize} snippets loaded${designParams ? ` | ${designParams}` : ''}`
          : '';

        const summary = [
          `📄 Generated "${template}" page template for ${framework}`,
          `Component library: ${component_library === 'none' ? 'Tailwind CSS (raw)' : component_library}`,
          `Dark mode: ${dark_mode ? 'enabled' : 'disabled'}`,
          `Files: ${files.length}`,
          ragInfo,
          '',
          'Files:',
          ...files.map((f) => `  ${f.path}`),
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
      } catch (error) {
        const _ctx = designContextStore.get();
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Error in registerGeneratePageTemplate/generateTemplate:', {
          template,
          framework,
          component_library,
          dark_mode,
          project_name,
          error: errorMessage,
        });
        return {
          content: [
            {
              type: 'text',
              text: `Error generating page template: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );
}

export function generateTemplate(
  template: PageTemplateType,
  framework: string,
  _componentLibrary: string,
  darkMode: boolean,
  appName: string,
  ctx: IDesignContext
): IGeneratedFile[] {
  const body = getTemplateBody(template, darkMode, appName);

  switch (framework) {
    case 'react':
    case 'nextjs':
      return wrapReact(template, body, framework === 'nextjs');
    case 'vue':
      return wrapVue(template, body);
    case 'angular':
      return wrapAngular(template, body);
    case 'svelte':
      return wrapSvelte(template, body);
    case 'html':
      return wrapHtml(template, body, ctx, darkMode, appName);
    default:
      return wrapReact(template, body, false);
  }
}

function wrapReact(template: string, body: string, isNextjs: boolean): IGeneratedFile[] {
  const directive = isNextjs ? "'use client'\n\n" : '';
  const name = `${toPascalCase(template)}Page`;
  return [
    {
      path: `pages/${kebabCase(template)}.tsx`,
      content: `${directive}export default function ${name}() {\n  return (\n${body}\n  )\n}\n`,
    },
  ];
}

function wrapVue(template: string, body: string): IGeneratedFile[] {
  const vueBody = toVueSyntax(body);
  return [
    {
      path: `pages/${kebabCase(template)}.vue`,
      content: `<script setup lang="ts">\n</script>\n\n<template>\n${vueBody}\n</template>\n`,
    },
  ];
}

function wrapAngular(template: string, body: string): IGeneratedFile[] {
  const name = `${toPascalCase(template)}Page`;
  const kebab = kebabCase(template);
  const angularBody = toVueSyntax(body).replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  return [
    {
      path: `pages/${kebab}-page.component.ts`,
      content: `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-${kebab}-page',\n  standalone: true,\n  template: \`\n${angularBody}\n  \`,\n})\nexport class ${name}Component {}\n`,
    },
  ];
}

function wrapSvelte(template: string, body: string): IGeneratedFile[] {
  const svelteBody = toVueSyntax(body);
  return [
    {
      path: `pages/${kebabCase(template)}.svelte`,
      content: `<script lang="ts">\n</script>\n\n${svelteBody}\n`,
    },
  ];
}

function wrapHtml(
  template: string,
  body: string,
  ctx: IDesignContext,
  darkMode: boolean,
  appName: string
): IGeneratedFile[] {
  const htmlBody = toVueSyntax(body);
  return [
    {
      path: `pages/${kebabCase(template)}.html`,
      content: `<!DOCTYPE html>\n<html lang="en"${darkMode ? ' class="dark"' : ''}>\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>${appName} — ${toPascalCase(template)}</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n  <style>\n    :root {\n      --primary: ${ctx.colorPalette.primary};\n      --background: ${ctx.colorPalette.background};\n      --foreground: ${ctx.colorPalette.foreground};\n      --font-family: ${ctx.typography.fontFamily};\n    }\n    body { font-family: var(--font-family); }\n  </style>\n</head>\n<body>\n${htmlBody}\n</body>\n</html>\n`,
    },
  ];
}

function toVueSyntax(jsx: string): string {
  return jsx
    .replace(/className=/g, 'class=')
    .replace(/htmlFor=/g, 'for=')
    .replace(/\{\/\*/g, '<!--')
    .replace(/\*\/\}/g, '-->')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=');
}

function getTemplateBody(template: PageTemplateType, darkMode: boolean, appName: string): string {
  const dk = (cls: string): string => (darkMode ? ` ${cls}` : '');

  switch (template) {
    case 'landing':
      return `    <div className="min-h-screen bg-background text-foreground${dk('dark:bg-gray-950 dark:text-gray-100')}">
      {/* Navbar */}
      <nav aria-label="Main navigation" className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-3${dk('dark:border-gray-800')}">
        <a href="/" className="text-lg font-bold">${appName}</a>
        <div className="hidden sm:flex gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>
        <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Get Started</button>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Now in Beta</span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">Build Faster, Ship Smarter</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">The modern platform for teams who want to move fast without breaking things.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button type="button" className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Start Free Trial</button>
          <button type="button" className="rounded-md border border-input bg-background px-8 py-3 text-sm font-medium hover:bg-accent">Watch Demo</button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-center text-3xl font-bold">Everything you need</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">Powerful features to help your team deliver exceptional results.</p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: 'Lightning Fast', desc: 'Optimized for speed with edge computing and smart caching.' },
            { title: 'Secure by Default', desc: 'Enterprise-grade security with SOC2 compliance built in.' },
            { title: 'Team Collaboration', desc: 'Real-time editing and commenting for seamless teamwork.' },
          ].map((f, i) => (
            <article key={i} className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow${dk('dark:border-gray-800 dark:bg-gray-900')}">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">{i + 1}</span>
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 sm:px-6 lg:px-8 py-8${dk('dark:border-gray-800')}">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; 2026 ${appName}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>`;

    case 'dashboard':
      return `    <div className="flex min-h-screen${dk('dark:bg-gray-950 dark:text-gray-100')}">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background${dk('dark:border-gray-800 dark:bg-gray-900')}">
        <div className="p-6 border-b${dk('dark:border-gray-800')}"><span className="text-lg font-bold">${appName}</span></div>
        <nav aria-label="Dashboard navigation" className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground" aria-current="page">Dashboard</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Analytics</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Projects</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Team</a>
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b px-4 sm:px-6 py-4${dk('dark:border-gray-800')}">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">New Project</button>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: '2,847', change: '+12%' },
              { label: 'Revenue', value: '$48,290', change: '+8%' },
              { label: 'Active Projects', value: '34', change: '+3' },
              { label: 'Completion Rate', value: '94%', change: '+2%' },
            ].map((stat, i) => (
              <div key={i} className="rounded-lg border bg-card p-4${dk('dark:border-gray-800 dark:bg-gray-900')}">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-green-600">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Recent activity table */}
          <div className="rounded-lg border${dk('dark:border-gray-800')}">
            <div className="px-4 py-3 border-b${dk('dark:border-gray-800')}"><h2 className="font-semibold">Recent Activity</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50${dk('dark:bg-gray-800/50')}">
                  <tr>
                    <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground">Event</th>
                    <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground hidden sm:table-cell">User</th>
                    <th scope="col" className="h-10 px-4 text-right font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { event: 'New signup', user: 'Alice', time: '2 min ago' },
                    { event: 'Payment received', user: 'Bob', time: '15 min ago' },
                    { event: 'Project deployed', user: 'Charlie', time: '1 hour ago' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50 transition-colors${dk('dark:border-gray-800')}">
                      <td className="p-4 font-medium">{row.event}</td>
                      <td className="p-4 hidden sm:table-cell text-muted-foreground">{row.user}</td>
                      <td className="p-4 text-right text-muted-foreground">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>`;

    case 'auth_login':
      return `    <div className="flex min-h-screen items-center justify-center bg-background px-4${dk('dark:bg-gray-950')}">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold${dk('dark:text-white')}">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your ${appName} account</p>
        </div>
        <form className="space-y-4" aria-label="Login form" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" placeholder="you@example.com" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium${dk('dark:text-gray-200')}">Password</label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <input id="password" name="password" type="password" autoComplete="current-password" required aria-required="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Sign in</button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t${dk('dark:border-gray-800')}" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground${dk('dark:bg-gray-950')}">Or continue with</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent${dk('dark:border-gray-700 dark:bg-gray-900')}">Google</button>
          <button type="button" className="flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent${dk('dark:border-gray-700 dark:bg-gray-900')}">GitHub</button>
        </div>
        <p className="text-center text-sm text-muted-foreground">Don&apos;t have an account? <a href="#" className="text-primary hover:underline font-medium">Sign up</a></p>
      </div>
    </div>`;

    case 'auth_signup':
      return `    <div className="flex min-h-screen items-center justify-center bg-background px-4${dk('dark:bg-gray-950')}">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold${dk('dark:text-white')}">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Get started with ${appName} for free</p>
        </div>
        <form className="space-y-4" aria-label="Registration form" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">First name</label>
              <input id="firstName" name="firstName" type="text" autoComplete="given-name" required aria-required="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" placeholder="John" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Last name</label>
              <input id="lastName" name="lastName" type="text" autoComplete="family-name" required aria-required="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" placeholder="Doe" />
            </div>
          </div>
          <div>
            <label htmlFor="signupEmail" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Email</label>
            <input id="signupEmail" name="email" type="email" autoComplete="email" required aria-required="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="signupPassword" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Password</label>
            <input id="signupPassword" name="password" type="password" autoComplete="new-password" required aria-required="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" placeholder="Minimum 8 characters" />
          </div>
          <button type="submit" className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Create account</button>
        </form>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <a href="#" className="text-primary hover:underline font-medium">Sign in</a></p>
      </div>
    </div>`;

    case 'pricing':
      return `    <div className="min-h-screen bg-background text-foreground${dk('dark:bg-gray-950 dark:text-gray-100')}">
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">Choose the plan that fits your team. No hidden fees.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Starter', price: '$0', period: '/month', desc: 'For individuals getting started', features: ['1 project', '1,000 API calls', 'Community support', 'Basic analytics'], cta: 'Get Started', highlighted: false },
            { name: 'Pro', price: '$29', period: '/month', desc: 'For growing teams', features: ['Unlimited projects', '100,000 API calls', 'Priority support', 'Advanced analytics', 'Custom domain', 'Team collaboration'], cta: 'Start Free Trial', highlighted: true },
            { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large organizations', features: ['Everything in Pro', 'Unlimited API calls', 'Dedicated support', 'SLA guarantee', 'SSO & SAML', 'Custom integrations'], cta: 'Contact Sales', highlighted: false },
          ].map((plan, i) => (
            <div key={i} className={\`rounded-lg border p-6 sm:p-8 flex flex-col \${plan.highlighted ? 'border-primary shadow-lg ring-1 ring-primary' : ''}${dk(' dark:border-gray-800 dark:bg-gray-900')}\`}>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <div className="mt-4"><span className="text-4xl font-bold">{plan.price}</span><span className="text-muted-foreground">{plan.period}</span></div>
              <ul className="mt-6 space-y-3 flex-1" role="list">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm"><span className="text-green-600" aria-hidden="true">✓</span> {f}</li>
                ))}
              </ul>
              <button type="button" className={\`mt-8 w-full rounded-md px-4 py-2.5 text-sm font-medium \${plan.highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent'}\`}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>
    </div>`;

    case 'settings':
      return `    <div className="min-h-screen bg-background${dk('dark:bg-gray-950')}">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl font-bold${dk('dark:text-white')}">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences.</p>

        <div className="mt-8 space-y-8">
          {/* Profile */}
          <section className="rounded-lg border p-6${dk('dark:border-gray-800')}">
            <h2 className="text-lg font-semibold${dk('dark:text-white')}">Profile</h2>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="settingsName" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Name</label>
                  <input id="settingsName" type="text" defaultValue="John Doe" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" />
                </div>
                <div>
                  <label htmlFor="settingsEmail" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Email</label>
                  <input id="settingsEmail" type="email" defaultValue="john@example.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" />
                </div>
              </div>
              <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save changes</button>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-lg border p-6${dk('dark:border-gray-800')}">
            <h2 className="text-lg font-semibold${dk('dark:text-white')}">Notifications</h2>
            <div className="mt-4 space-y-3">
              {['Email notifications', 'Push notifications', 'Weekly digest'].map((item, i) => (
                <label key={i} className="flex items-center justify-between py-2">
                  <span className="text-sm${dk('dark:text-gray-200')}">{item}</span>
                  <input type="checkbox" defaultChecked={i < 2} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </label>
              ))}
            </div>
          </section>

          {/* Danger zone */}
          <section className="rounded-lg border border-destructive/50 p-6">
            <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
            <p className="mt-1 text-sm text-muted-foreground">Irreversible and destructive actions.</p>
            <button type="button" className="mt-4 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">Delete account</button>
          </section>
        </div>
      </div>
    </div>`;

    case 'crud_table':
      return `    <div className="min-h-screen bg-background${dk('dark:bg-gray-950')}">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold${dk('dark:text-white')}">Users</h1>
            <p className="text-sm text-muted-foreground">Manage your users and their permissions.</p>
          </div>
          <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">+ Add User</button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input type="search" placeholder="Search users..." aria-label="Search users" className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" />
          <select aria-label="Filter by role" className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}">
            <option>All roles</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-hidden${dk('dark:border-gray-800')}">
          <table className="w-full text-sm">
            <thead className="bg-muted/50${dk('dark:bg-gray-800/50')}">
              <tr>
                <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground">Name</th>
                <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground hidden sm:table-cell">Role</th>
                <th scope="col" className="h-10 px-4 text-left font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                <th scope="col" className="h-10 px-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
                { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
                { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' },
              ].map((user, i) => (
                <tr key={i} className="border-b hover:bg-muted/50 transition-colors${dk('dark:border-gray-800')}">
                  <td className="p-4 font-medium${dk('dark:text-white')}">{user.name}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{user.email}</td>
                  <td className="p-4 hidden sm:table-cell"><span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{user.role}</span></td>
                  <td className="p-4 hidden lg:table-cell"><span className={\`inline-flex rounded-full px-2 py-0.5 text-xs font-medium \${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}\`}>{user.status}</span></td>
                  <td className="p-4 text-right">
                    <button type="button" className="text-sm text-primary hover:underline mr-2">Edit</button>
                    <button type="button" className="text-sm text-destructive hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">Showing 1-3 of 24 results</p>
          <div className="flex gap-2">
            <button type="button" className="rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50" disabled>Previous</button>
            <button type="button" className="rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent">Next</button>
          </div>
        </div>
      </div>
    </div>`;

    case 'blog_list':
      return `    <div className="min-h-screen bg-background${dk('dark:bg-gray-950')}">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold${dk('dark:text-white')}">Blog</h1>
        <p className="mt-2 text-muted-foreground">Latest articles and updates from our team.</p>
        <div className="mt-10 space-y-8">
          {[
            { title: 'Getting Started with Modern UI Development', date: 'Jan 15, 2026', excerpt: 'Learn how to build beautiful, accessible interfaces using modern frameworks and AI-powered tools.', tag: 'Tutorial', readTime: '5 min read' },
            { title: 'Design Systems at Scale', date: 'Jan 10, 2026', excerpt: 'How we built and maintained a design system serving 50+ products across our organization.', tag: 'Engineering', readTime: '8 min read' },
            { title: 'The Future of AI-Assisted Development', date: 'Jan 5, 2026', excerpt: 'Exploring how AI tools are changing the way we build and ship software products.', tag: 'Opinion', readTime: '6 min read' },
          ].map((post, i) => (
            <article key={i} className="group">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{post.tag}</span>
                <time>{post.date}</time>
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors${dk('dark:text-white')}">
                <a href="#">{post.title}</a>
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <a href="#" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">Read more →</a>
            </article>
          ))}
        </div>
      </div>
    </div>`;

    case 'onboarding':
      return `    <div className="flex min-h-screen items-center justify-center bg-background px-4${dk('dark:bg-gray-950')}">
      <div className="w-full max-w-lg space-y-8">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1">
              <div className={\`h-1.5 rounded-full \${step === 1 ? 'bg-primary' : 'bg-muted'}\`} />
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Step 1 of 3</div>

        {/* Step content */}
        <div>
          <h1 className="text-2xl font-bold${dk('dark:text-white')}">Welcome to ${appName}!</h1>
          <p className="mt-2 text-muted-foreground">Let&apos;s set up your workspace. This will only take a minute.</p>
        </div>

        <form className="space-y-4" aria-label="Onboarding step 1" noValidate>
          <div>
            <label htmlFor="workspace" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Workspace name</label>
            <input id="workspace" name="workspace" type="text" required aria-required="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}" placeholder="My Workspace" />
          </div>
          <div>
            <label htmlFor="teamSize" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">Team size</label>
            <select id="teamSize" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}">
              <option>Just me</option>
              <option>2-5</option>
              <option>6-20</option>
              <option>21+</option>
            </select>
          </div>
          <div>
            <label htmlFor="useCase" className="block text-sm font-medium mb-1${dk('dark:text-gray-200')}">What will you use ${appName} for?</label>
            <select id="useCase" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm${dk('dark:border-gray-700 dark:bg-gray-900 dark:text-white')}">
              <option>Personal project</option>
              <option>Startup</option>
              <option>Enterprise</option>
              <option>Education</option>
            </select>
          </div>
        </form>

        <div className="flex justify-between">
          <button type="button" className="rounded-md border border-input bg-background px-6 py-2.5 text-sm font-medium hover:bg-accent${dk('dark:border-gray-700')}" disabled>Back</button>
          <button type="button" className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Continue</button>
        </div>
      </div>
    </div>`;

    case 'error_404':
      return `    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center${dk('dark:bg-gray-950')}">
      <p className="text-6xl sm:text-8xl font-bold text-muted-foreground/30">404</p>
      <h1 className="mt-4 text-2xl sm:text-3xl font-bold${dk('dark:text-white')}">Page not found</h1>
      <p className="mt-2 text-muted-foreground max-w-md">Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a href="/" className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center">Go home</a>
        <a href="#" className="rounded-md border border-input bg-background px-6 py-2.5 text-sm font-medium hover:bg-accent inline-flex items-center justify-center${dk('dark:border-gray-700')}">Contact support</a>
      </div>
    </div>`;

    default:
      return `    <div className="p-8"><p>Template "${template}" placeholder</p></div>`;
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
