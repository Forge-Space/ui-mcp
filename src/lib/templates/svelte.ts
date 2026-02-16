import type { IGeneratedFile, IDesignContext, Architecture, StateManagement } from '../types.js';
import { generateCssVariableBlock, generateFontImportHtml } from './css-variables.js';

export function generateSvelteProject(
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
          dev: 'vite dev',
          build: 'vite build',
          preview: 'vite preview',
          check: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json',
          'check:watch': 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch',
        },
        dependencies: {
          '@sveltejs/kit': '^2.0.0',
          svelte: '^5.0.0',
          '@phosphor-icons/svelte': '^2.0.0',
          clsx: '^2.1.1',
          'tailwind-merge': '^3.0.0',
          zod: '^3.24.0',
        },
        devDependencies: {
          '@sveltejs/adapter-auto': '^3.0.0',
          '@sveltejs/vite-plugin-svelte': '^4.0.0',
          autoprefixer: '^10.4.20',
          postcss: '^8.4.49',
          tailwindcss: '^3.4.17',
          typescript: '^5.7.0',
          vite: '^6.0.0',
          'svelte-check': '^4.0.0',
          prettier: '^3.4.0',
          'prettier-plugin-svelte': '^3.3.0',
          eslint: '^9.17.0',
          'eslint-plugin-svelte': '^2.46.0',
          vitest: '^3.0.0',
          '@testing-library/svelte': '^5.2.0',
          jsdom: '^25.0.0',
        },
      },
      null,
      2
    ),
  });

  // svelte.config.js
  files.push({
    path: `${projectName}/svelte.config.js`,
    content: `import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;
`,
  });

  // vite.config.ts
  files.push({
    path: `${projectName}/vite.config.ts`,
    content: `import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
`,
  });

  // tsconfig.json
  files.push({
    path: `${projectName}/tsconfig.json`,
    content: JSON.stringify(
      {
        extends: './.svelte-kit/tsconfig.json',
        compilerOptions: {
          allowJs: true,
          checkJs: true,
          esModuleInterop: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          skipLibCheck: true,
          sourceMap: true,
          strict: true,
          moduleResolution: 'bundler',
        },
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
  content: ['./src/**/*.{html,js,svelte,ts}'],
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
};
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
};
`,
  });

  // .prettierrc
  files.push({
    path: `${projectName}/.prettierrc`,
    content: JSON.stringify(
      {
        useTabs: true,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        plugins: ['prettier-plugin-svelte'],
        overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
      },
      null,
      2
    ),
  });

  // .eslintrc.cjs
  files.push({
    path: `${projectName}/.eslintrc.cjs`,
    content: `module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:svelte/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
};
`,
  });

  // src/app.html
  const fontImport = generateFontImportHtml(designContext);
  files.push({
    path: `${projectName}/src/app.html`,
    content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${fontImport}
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
`,
  });

  // src/app.css
  files.push({
    path: `${projectName}/src/app.css`,
    content: generateCssVariableBlock(designContext),
  });

  // src/routes/+layout.svelte
  files.push({
    path: `${projectName}/src/routes/+layout.svelte`,
    content: `<script lang="ts">
  import '../app.css';
</script>

<slot />
`,
  });

  // src/routes/+layout.ts
  files.push({
    path: `${projectName}/src/routes/+layout.ts`,
    content: `export const prerender = true;
export const ssr = false;
`,
  });

  // src/routes/+page.svelte
  const primaryColor = designContext?.colorPalette?.primary ?? '#3b82f6';
  files.push({
    path: `${projectName}/src/routes/+page.svelte`,
    content: `<script lang="ts">
  import Button from '$lib/components/ui/button.svelte';
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-background p-8">
  <div class="text-center">
    <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
      Welcome to <span class="bg-gradient-to-r from-[${primaryColor}] to-purple-600 bg-clip-text text-transparent">${projectName}</span>
    </h1>
    <p class="mb-8 text-lg text-muted-foreground">
      Your SvelteKit application is ready to go. Start building amazing things!
    </p>
    <div class="flex gap-4 justify-center">
      <Button variant="default">Get Started</Button>
      <Button variant="outline">Learn More</Button>
    </div>
  </div>
</div>
`,
  });

  // src/lib/utils.ts
  files.push({
    path: `${projectName}/src/lib/utils.ts`,
    content: `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
  });

  // src/lib/components/ui/button.svelte
  files.push({
    path: `${projectName}/src/lib/components/ui/button.svelte`,
    content: `<script lang="ts">
  import { cn } from '$lib/utils';

  export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  export let disabled = false;

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  let className = '';
  export { className as class };
</script>

<button
  type="button"
  class={cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className
  )}
  {disabled}
  on:click
>
  <slot />
</button>
`,
  });

  // Add Svelte stores if state management is not 'none'
  if (stateManagement !== 'none') {
    files.push({
      path: `${projectName}/src/lib/stores/app.ts`,
      content: `import { writable } from 'svelte/store';

export interface AppState {
  user: { name: string; email: string } | null;
  theme: 'light' | 'dark';
}

const initialState: AppState = {
  user: null,
  theme: 'light',
};

export const appStore = writable<AppState>(initialState);

// Helper functions
export function setUser(user: AppState['user']) {
  appStore.update((state) => ({ ...state, user }));
}

export function setTheme(theme: AppState['theme']) {
  appStore.update((state) => ({ ...state, theme }));
}

export function resetStore() {
  appStore.set(initialState);
}
`,
    });
  }

  // static/favicon.png (placeholder comment)
  files.push({
    path: `${projectName}/static/favicon.png`,
    content: '# Add your favicon.png here',
  });

  // .gitignore
  files.push({
    path: `${projectName}/.gitignore`,
    content: `.DS_Store
node_modules
/build
/.svelte-kit
/package
.env
.env.*
!.env.example
vite.config.js.timestamp-*
vite.config.ts.timestamp-*
`,
  });

  // README.md
  files.push({
    path: `${projectName}/README.md`,
    content: `# ${projectName}

A SvelteKit application built with TypeScript and Tailwind CSS.

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Phosphor Icons
${stateManagement !== 'none' ? '- **State Management**: Svelte Stores\n' : ''}
## Project Structure

\`\`\`
src/
├── routes/           # SvelteKit file-based routing
├── lib/
│   ├── components/   # Reusable components
${stateManagement !== 'none' ? '│   ├── stores/       # Svelte stores\n' : ''}│   └── utils.ts      # Utility functions
├── app.html          # HTML shell
└── app.css           # Global styles
\`\`\`
`,
  });

  return files;
}
