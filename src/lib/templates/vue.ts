import type { IGeneratedFile, IDesignContext, Architecture, StateManagement } from '@forgespace/siza-gen';
import { generateCssVariableBlock, generateFontImportHtml } from './css-variables.js';

export function generateVueProject(
  projectName: string,
  _architecture: Architecture,
  stateManagement: StateManagement,
  designContext?: IDesignContext
): IGeneratedFile[] {
  const files: IGeneratedFile[] = [];

  // package.json
  files.push({
    path: `${projectName}/package.json`,
    content: JSON.stringify(
      {
        name: projectName,
        version: '0.1.0',
        private: true,
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vue-tsc -b && vite build',
          preview: 'vite preview',
        },
        dependencies: {
          vue: '^3.5.0',
          'vue-router': '^4.4.0',
          '@phosphor-icons/vue': '^2.2.0',
          'vee-validate': '^4.14.0',
          '@vee-validate/zod': '^4.14.0',
          zod: '^3.24.0',
          '@tanstack/vue-query': '^5.62.0',
          clsx: '^2.1.1',
          'tailwind-merge': '^3.0.0',
          ...(stateManagement === 'pinia' ? { pinia: '^3.0.0' } : {}),
        },
        devDependencies: {
          '@vitejs/plugin-vue': '^5.2.0',
          autoprefixer: '^10.4.20',
          postcss: '^8.4.49',
          tailwindcss: '^3.4.17',
          typescript: '^5.7.0',
          'vue-tsc': '^2.2.0',
          vite: '^6.0.0',
          eslint: '^9.17.0',
          prettier: '^3.4.0',
          vitest: '^3.0.0',
          '@vue/test-utils': '^2.4.0',
          jsdom: '^25.0.0',
        },
      },
      null,
      2
    ),
  });

  // vite.config.ts
  files.push({
    path: `${projectName}/vite.config.ts`,
    content: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`,
  });

  // tsconfig.json
  files.push({
    path: `${projectName}/tsconfig.json`,
    content: JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'bundler',
          strict: true,
          jsx: 'preserve',
          sourceMap: true,
          baseUrl: '.',
          paths: { '@/*': ['./src/*'] },
          lib: ['ES2023', 'DOM', 'DOM.Iterable'],
          skipLibCheck: true,
        },
        include: ['src/**/*.ts', 'src/**/*.vue'],
      },
      null,
      2
    ),
  });

  // tailwind.config.js
  files.push({
    path: `${projectName}/tailwind.config.js`,
    content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
`,
  });

  // postcss.config.js
  files.push({
    path: `${projectName}/postcss.config.js`,
    content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`,
  });

  // index.html
  const fontLinks = generateFontImportHtml(designContext);
  files.push({
    path: `${projectName}/index.html`,
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${projectName} — Modern web application" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:title" content="${projectName}" />
    <meta property="og:description" content="${projectName} — Modern web application" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    ${fontLinks}
    <title>${projectName}</title>
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">Skip to main content</a>
    <div id="app"></div>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
  });

  // src/main.ts
  const mainImports =
    stateManagement === 'pinia'
      ? `import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
`
      : `import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
`;

  files.push({ path: `${projectName}/src/main.ts`, content: mainImports });

  // src/style.css
  files.push({
    path: `${projectName}/src/style.css`,
    content: generateCssVariableBlock(designContext),
  });

  // src/lib/utils.ts
  files.push({
    path: `${projectName}/src/lib/utils.ts`,
    content: `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
  });

  // src/App.vue
  files.push({
    path: `${projectName}/src/App.vue`,
    content: `<script setup lang="ts">
import { PhRocketLaunch, PhGithubLogo, PhLightning } from '@phosphor-icons/vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header role="banner" class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <nav aria-label="Main navigation" class="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <span class="text-lg font-semibold">${projectName}</span>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">About</button>
          <button class="px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">Features</button>
          <button class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Get Started</button>
        </div>
      </nav>
    </header>

    <main id="main-content" role="main" class="flex-1">
      <section aria-labelledby="hero-heading" class="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto max-w-4xl text-center space-y-6">
          <h1 id="hero-heading" class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            ${projectName}
          </h1>
          <p class="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            A modern, responsive web application built with Vue 3, Tailwind CSS, and Composition API.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              <PhRocketLaunch class="mr-2 h-4 w-4" aria-hidden="true" />
              Get Started
            </button>
            <button class="inline-flex items-center px-6 py-3 border border-input bg-background rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
              <PhGithubLogo class="mr-2 h-4 w-4" aria-hidden="true" />
              View Source
            </button>
          </div>
        </div>
      </section>

      <section aria-labelledby="features-heading" class="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div class="container mx-auto max-w-6xl">
          <h2 id="features-heading" class="text-2xl sm:text-3xl font-bold text-center mb-10">Features</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article v-for="feature in [
              { title: 'Responsive Design', desc: 'Looks great on every screen size, from mobile to desktop.' },
              { title: 'Accessible', desc: 'Built with ARIA landmarks, keyboard navigation, and semantic HTML.' },
              { title: 'Performant', desc: 'Optimized with Composition API, lazy loading, and efficient reactivity.' },
            ]" :key="feature.title" class="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <PhLightning class="h-8 w-8 text-primary mb-3" aria-hidden="true" />
              <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ feature.desc }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer role="contentinfo" class="border-t py-8 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {{ new Date().getFullYear() }} ${projectName}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
`,
  });

  // Pinia store
  if (stateManagement === 'pinia') {
    files.push({
      path: `${projectName}/src/stores/app.ts`,
      content: `import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  return { count, increment, decrement, reset }
})
`,
    });
  }

  // env.d.ts
  files.push({
    path: `${projectName}/src/env.d.ts`,
    content: `/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
`,
  });

  return files;
}
