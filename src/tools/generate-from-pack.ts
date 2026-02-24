import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Framework } from '../lib/types.js';
import { initializeRegistry } from '../lib/design-references/component-registry/init.js';
import { getPack, getAllPacks } from '../lib/design-references/template-packs/index.js';
import { composePageFromTemplate } from '../lib/design-references/template-compositions/index.js';
import { createLogger } from '../lib/logger.js';

const logger = createLogger('generate-from-pack');

const inputSchema = {
  pack_id: z.string().describe('Template pack ID (e.g., saas-dashboard, startup-landing)'),
  framework: z.enum(['react', 'nextjs', 'vue', 'angular', 'svelte', 'html']).describe('Target framework'),
  project_name: z.string().describe('Project name'),
};

interface IGeneratedFile {
  path: string;
  content: string;
}

interface IPackOutput {
  packName: string;
  framework: string;
  files: IGeneratedFile[];
  theme: {
    colorSystemId: string;
    fontPairingId: string;
    visualStyle: string;
    mood: string;
  };
  instructions: string;
}

export function registerGenerateFromPack(server: McpServer): void {
  server.tool(
    'generate_from_template_pack',
    'Generate a full multi-page application from a template pack',
    inputSchema,
    async (params) => {
      const { pack_id, framework, project_name } = params as {
        pack_id: string;
        framework: Framework;
        project_name: string;
      };

      logger.info({ pack_id, framework, project_name }, 'Generating from template pack');

      initializeRegistry();

      const pack = getPack(pack_id);
      if (!pack) {
        const available = getAllPacks();
        const packList = available.map((p) => `- ${p.id}: ${p.name}`).join('\n');
        return {
          content: [
            {
              type: 'text',
              text: `Error: Pack "${pack_id}" not found.\n\nAvailable packs:\n${packList}`,
            },
          ],
        };
      }

      logger.info({ packName: pack.name, pageCount: pack.pages.length }, 'Pack found');

      const files: IGeneratedFile[] = [];

      for (const page of pack.pages) {
        logger.info({ pageTitle: page.title, compositionId: page.compositionId }, 'Composing page');

        const composed = composePageFromTemplate(page.compositionId, {
          mood: [pack.theme.mood],
          visualStyle: pack.theme.visualStyle,
        });

        let pageContent: string;
        if (composed) {
          pageContent = wrapPageInFramework(composed.jsx, page.title, framework, project_name);
        } else {
          pageContent = generatePlaceholder(page.title, framework, project_name);
        }

        const filePath = getPageFilePath(page.path, page.isIndex, framework);
        files.push({ path: filePath, content: pageContent });
      }

      const layoutFile = generateLayout(pack.sharedComponents, framework, project_name);
      if (layoutFile) {
        files.push(layoutFile);
      }

      const routingFile = generateRoutingConfig(pack.pages, framework);
      if (routingFile) {
        files.push(routingFile);
      }

      const instructions = generateSetupInstructions(pack, framework);

      const output: IPackOutput = {
        packName: pack.name,
        framework,
        files,
        theme: {
          colorSystemId: pack.theme.colorSystemId,
          fontPairingId: pack.theme.fontPairingId,
          visualStyle: pack.theme.visualStyle,
          mood: pack.theme.mood,
        },
        instructions,
      };

      logger.info({ fileCount: files.length }, 'Pack generation complete');

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(output, null, 2),
          },
        ],
      };
    }
  );
}

function wrapPageInFramework(jsx: string, title: string, framework: Framework, projectName: string): string {
  switch (framework) {
    case 'nextjs':
      return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | ${projectName}',
};

export default function ${toPascalCase(title)}Page() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;

    case 'react':
      return `import React from 'react';

export function ${toPascalCase(title)}Page() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;

    case 'vue':
      return `<template>
  ${jsx}
</template>

<script setup lang="ts">
// ${title} page
</script>
`;

    case 'angular':
      return `import { Component } from '@angular/core';

@Component({
  selector: 'app-${toKebabCase(title)}',
  template: \`
    ${jsx}
  \`,
})
export class ${toPascalCase(title)}Component {}
`;

    case 'svelte':
      return `<script lang="ts">
  // ${title} page
</script>

${jsx}
`;

    case 'html':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${projectName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${jsx}
</body>
</html>
`;

    default:
      return jsx;
  }
}

function generatePlaceholder(title: string, framework: Framework, projectName: string): string {
  const placeholderJsx = `<div className="min-h-screen flex items-center justify-center">
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">${title}</h1>
    <p className="text-gray-600">Composition not found. Placeholder generated.</p>
  </div>
</div>`;

  return wrapPageInFramework(placeholderJsx, title, framework, projectName);
}

function getPageFilePath(pagePath: string, isIndex: boolean, framework: Framework): string {
  switch (framework) {
    case 'nextjs':
      return isIndex ? `app/page.tsx` : `app${pagePath}/page.tsx`;

    case 'react':
      return isIndex ? `src/pages/Home.tsx` : `src/pages/${toPascalCase(pagePath.replace('/', ''))}.tsx`;

    case 'vue':
      return isIndex ? `src/views/Home.vue` : `src/views/${toPascalCase(pagePath.replace('/', ''))}.vue`;

    case 'angular':
      return isIndex
        ? `src/app/home/home.component.ts`
        : `src/app${pagePath}/${toKebabCase(pagePath.replace('/', ''))}.component.ts`;

    case 'svelte':
      return isIndex ? `src/routes/+page.svelte` : `src/routes${pagePath}/+page.svelte`;

    case 'html':
      return isIndex ? `index.html` : `${pagePath.substring(1)}.html`;

    default:
      return pagePath;
  }
}

function generateLayout(sharedComponents: string[], framework: Framework, projectName: string): IGeneratedFile | null {
  const hasNav = sharedComponents.some((c) => c.toLowerCase().includes('nav'));
  const hasFooter = sharedComponents.some((c) => c.toLowerCase().includes('footer'));

  if (!hasNav && !hasFooter) {
    return null;
  }

  const navPlaceholder = hasNav
    ? `<nav className="border-b">
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-bold">${projectName}</h1>
    </div>
  </nav>`
    : '';

  const footerPlaceholder = hasFooter
    ? `<footer className="border-t mt-auto">
    <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600">
      © 2026 ${projectName}. All rights reserved.
    </div>
  </footer>`
    : '';

  switch (framework) {
    case 'nextjs':
      return {
        path: 'app/layout.tsx',
        content: `import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          ${navPlaceholder}
          <main className="flex-1">{children}</main>
          ${footerPlaceholder}
        </div>
      </body>
    </html>
  );
}
`,
      };

    case 'react':
      return {
        path: 'src/components/Layout.tsx',
        content: `import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      ${navPlaceholder}
      <main className="flex-1">{children}</main>
      ${footerPlaceholder}
    </div>
  );
}
`,
      };

    case 'vue':
      return {
        path: 'src/layouts/Default.vue',
        content: `<template>
  <div class="min-h-screen flex flex-col">
    ${navPlaceholder}
    <main class="flex-1">
      <slot />
    </main>
    ${footerPlaceholder}
  </div>
</template>
`,
      };

    default:
      return null;
  }
}

function generateRoutingConfig(
  pages: Array<{ path: string; title: string; isIndex: boolean }>,
  framework: Framework
): IGeneratedFile | null {
  if (framework !== 'react') {
    return null;
  }

  const routes = pages
    .map((page) => {
      const componentName = page.isIndex ? 'HomePage' : `${toPascalCase(page.path.replace('/', ''))}Page`;
      const routePath = page.isIndex ? '/' : page.path;
      return `  { path: '${routePath}', element: <${componentName} /> },`;
    })
    .join('\n');

  const imports = pages
    .map((page) => {
      const componentName = page.isIndex ? 'HomePage' : `${toPascalCase(page.path.replace('/', ''))}Page`;
      const fileName = page.isIndex ? 'Home' : toPascalCase(page.path.replace('/', ''));
      return `import { ${componentName} } from './pages/${fileName}';`;
    })
    .join('\n');

  return {
    path: 'src/App.tsx',
    content: `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
${imports}

const routes = [
${routes}
];

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
`,
  };
}

function generateSetupInstructions(
  pack: { name: string; description: string; appType: string },
  framework: Framework
): string {
  const baseInstructions = `# ${pack.name}

${pack.description}

## Setup

1. Install dependencies:
`;

  const frameworkInstructions: Record<Framework, string> = {
    nextjs: `${baseInstructions}
   npm install next react react-dom
   npm install -D @types/react @types/react-dom tailwindcss

2. Initialize Tailwind CSS:
   npx tailwindcss init -p

3. Update tailwind.config.js to include your content paths

4. Create app/globals.css with Tailwind directives

5. Run the development server:
   npm run dev
`,

    react: `${baseInstructions}
   npm install react react-dom react-router-dom
   npm install -D @types/react @types/react-dom tailwindcss vite

2. Configure Vite and Tailwind CSS

3. Run the development server:
   npm run dev
`,

    vue: `${baseInstructions}
   npm install vue vue-router
   npm install -D @vitejs/plugin-vue tailwindcss

2. Configure Vite and Tailwind CSS

3. Run the development server:
   npm run dev
`,

    angular: `${baseInstructions}
   npm install
   ng add @angular/material (optional)

2. Run the development server:
   ng serve
`,

    svelte: `${baseInstructions}
   npm install
   npm install -D tailwindcss

2. Configure Tailwind CSS

3. Run the development server:
   npm run dev
`,

    html: `${baseInstructions}
   (No dependencies required - uses Tailwind CDN)

2. Open index.html in your browser or serve with:
   npx serve .
`,
  };

  return frameworkInstructions[framework];
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
