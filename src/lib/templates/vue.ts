import type { IGeneratedFile, Architecture, StateManagement } from '../types.js';

export function generateVueProject(
  projectName: string,
  _architecture: Architecture,
  stateManagement: StateManagement
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
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b',
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
  files.push({
    path: `${projectName}/index.html`,
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
  });

  // src/main.ts
  const mainImports = stateManagement === 'pinia'
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
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
  });

  // src/App.vue
  files.push({
    path: `${projectName}/src/App.vue`,
    content: `<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">
        ${projectName}
      </h1>
      <p class="text-gray-500 text-lg">
        Built with Vue 3, Tailwind CSS, and Composition API
      </p>
      <button
        class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Get Started
      </button>
    </div>
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
