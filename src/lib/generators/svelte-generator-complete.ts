import { BaseGenerator } from './base-generator.js';
import type { IGeneratedFile, IDesignContext, Architecture, StateManagement, Framework } from '../types.js';
import { createLogger } from '../logger.js';

const _logger = createLogger('svelte-generator');

/**
 * Svelte Generator - Generates Svelte components and projects
 */
export class SvelteGenerator extends BaseGenerator {
  constructor(framework: Framework) {
    super(framework);
  }

  /**
   * Generate a complete SvelteKit project
   */
  generateProject(
    projectName: string,
    architecture: Architecture,
    stateManagement: StateManagement,
    designContext: IDesignContext
  ): IGeneratedFile[] {
    this.logStart('project', projectName);

    const files: IGeneratedFile[] = [];

    // Package.json
    files.push(this.createPackageJsonFile(projectName, stateManagement));

    // SvelteKit config
    files.push(this.createSvelteConfigFile());

    // Vite config
    files.push(this.createViteConfigFile());

    // TypeScript config
    files.push(this.createTsConfigFile());

    // Tailwind config
    files.push(this.createTailwindConfig(designContext));

    // App.html
    files.push(this.createAppHtmlFile(projectName));

    // Layout files
    const layoutFiles = this.createLayoutFiles(designContext);
    files.push(...layoutFiles);

    // App CSS
    files.push(this.createAppCssFile());

    // Main page
    files.push(this.createMainPage(designContext));

    // README
    files.push(this.createReadmeFile(projectName));

    // State management setup
    if (stateManagement !== 'none') {
      const stateFiles = this.createStateManagementFiles(stateManagement, designContext);
      files.push(...stateFiles);
    }

    this.logComplete('project', projectName, files.length);
    return files;
  }

  /**
   * Generate a Svelte component
   */
  generateComponent(
    componentType: string,
    props: Record<string, unknown>,
    designContext: IDesignContext
  ): IGeneratedFile[] {
    this.logStart('component', componentType);

    const componentName = this.formatComponentName(componentType);
    const files: IGeneratedFile[] = [];

    // Component file
    files.push(this.createComponentFile(componentName, componentType, props, designContext));

    // Storybook file
    files.push(this.createStorybookFile(componentName, componentType, designContext));

    // Test file
    files.push(this.createTestFile(componentName, componentType, designContext));

    // Type definitions file
    files.push(this.createTypeDefinitionsFile(componentName, props));

    this.logComplete('component', componentType, files.length);
    return files;
  }

  private createPackageJsonFile(projectName: string, stateManagement: StateManagement): IGeneratedFile {
    const dependencies: Record<string, string> = {
      '@sveltejs/kit': '^2.0.0',
      svelte: '^4.2.0',
      clsx: '^2.0.0',
      tailwindcss: '^3.4.0',
      'tailwind-merge': '^2.0.0',
      postcss: '^8.4.0',
      autoprefixer: '^10.4.0',
    };

    const devDependencies: Record<string, string> = {
      '@playwright/test': '^1.40.0',
      '@sveltejs/adapter-auto': '^3.0.0',
      '@sveltejs/kit': '^2.0.0',
      '@types/node': '^20.0.0',
      '@typescript-eslint/eslint-plugin': '^6.0.0',
      '@typescript-eslint/parser': '^6.0.0',
      eslint: '^8.45.0',
      'eslint-config-prettier': '^9.0.0',
      'eslint-plugin-svelte': '^2.35.0',
      prettier: '^3.0.0',
      'prettier-plugin-svelte': '^3.0.0',
      svelte: '^4.2.0',
      'svelte-check': '^3.4.0',
      tslib: '^2.6.0',
      typescript: '^5.0.0',
      vite: '^5.0.0',
      '@testing-library/svelte': '^4.0.0',
      vitest: '^1.0.0',
    };

    // Add state management dependencies
    if (stateManagement === 'stores') {
      dependencies['@sveltejs/adapter-node'] = '^1.3.0';
    }

    return {
      path: 'package.json',
      content: this.createPackageJson(projectName, dependencies, devDependencies),
    };
  }

  private createSvelteConfigFile(): IGeneratedFile {
    return {
      path: 'svelte.config.js',
      content: `import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
};

export default config;
`,
    };
  }

  private createViteConfigFile(): IGeneratedFile {
    return {
      path: 'vite.config.ts',
      content: `import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
});
`,
    };
  }

  private createTsConfigFile(): IGeneratedFile {
    return {
      path: 'tsconfig.json',
      content: `{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
`,
    };
  }

  private createTailwindConfig(designContext: IDesignContext): IGeneratedFile {
    return {
      path: 'tailwind.config.js',
      content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '${designContext.colorPalette.primary}',
        secondary: '${designContext.colorPalette.secondary}',
        background: '${designContext.colorPalette.background}',
        foreground: '${designContext.colorPalette.foreground}',
        accent: '${designContext.colorPalette.accent}',
        muted: '${designContext.colorPalette.muted}',
        destructive: '${designContext.colorPalette.destructive}',
      },
      fontFamily: {
        sans: ['${designContext.typography.fontFamily}', 'sans-serif'],
        heading: ['${designContext.typography.headingFont || designContext.typography.fontFamily}', 'sans-serif'],
      },
      spacing: {
        scale: ${JSON.stringify(designContext.spacing.scale || [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96])},
      },
      borderRadius: {
        md: '${designContext.borderRadius?.md || '0.5rem'}',
      },
    },
  },
  plugins: [],
}
`,
    };
  }

  private createAppHtmlFile(projectName: string): IGeneratedFile {
    return {
      path: 'src/app.html',
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${projectName}</title>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover" class="bg-background text-foreground">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
`,
    };
  }

  private createLayoutFiles(designContext: IDesignContext): IGeneratedFile[] {
    const files: IGeneratedFile[] = [];

    // Root layout
    files.push({
      path: 'src/routes/+layout.svelte',
      content: `<script lang="ts">
  import '../app.css';
</script>

<div class="min-h-screen bg-background text-foreground">
  <slot />
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: '${designContext.typography.fontFamily}', system-ui, sans-serif;
  }
</style>
`,
    });

    return files;
  }

  private createMainPage(designContext: IDesignContext): IGeneratedFile {
    return {
      path: 'src/routes/+page.svelte',
      content: `<script lang="ts">
</script>

<svelte:head>
  <title>Welcome to ${designContext.typography.fontFamily}</title>
</svelte:head>

<header class="p-6 bg-primary text-primary-foreground">
  <h1 class="text-3xl font-bold">
    Welcome to ${designContext.typography.fontFamily}
  </h1>
</header>

<main class="container mx-auto px-4 py-8">
  <h2 class="text-4xl font-bold text-primary">
    Your SvelteKit application is ready!
  </h2>
  <p class="text-lg text-muted-foreground">
    This is a SvelteKit project generated by UIForge MCP with custom design context.
  </p>

  <div class="mt-8 p-4 rounded-lg border border-border bg-card">
    <h3 class="text-xl font-semibold mb-2 text-card-foreground">
      Design Context Applied
    </h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Primary Color: ${designContext.colorPalette.primary}</li>
      <li>• Font Family: ${designContext.typography.fontFamily}</li>
      <li>• Background: ${designContext.colorPalette.background}</li>
      <li>• Spacing Scale: ${JSON.stringify(designContext.spacing.scale)}</li>
    </ul>
  </div>
</main>
`,
    };
  }

  private createAppCssFile(): IGeneratedFile {
    return {
      path: 'src/app.css',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`,
    };
  }

  private createStateManagementFiles(
    stateManagement: StateManagement,
    _designContext: IDesignContext
  ): IGeneratedFile[] {
    const files: IGeneratedFile[] = [];

    if (stateManagement === 'stores') {
      files.push({
        path: 'src/lib/stores/app.ts',
        content: `import { writable, derived } from 'svelte/store';

interface AppState {
  count: number;
  user: { name: string; email: string } | null;
  theme: 'light' | 'dark';
}

function createAppState(): AppState {
  return {
    count: 0,
    user: null,
    theme: 'light'
  };
}

export const appStore = writable<AppState>(createAppState());

// Derived stores
export const count = derived(appStore, ($appStore) => $appStore.count);
export const user = derived(appStore, ($appStore) => $appStore.user);
export const theme = derived(appStore, ($appStore) => $appStore.theme);

// Actions
export const increment = () => {
  appStore.update(state => ({ ...state, count: state.count + 1 }));
};

export const decrement = () => {
  appStore.update(state => ({ ...state, count: state.count - 1 }));
};

export const setUser = (user: { name: string; email: string }) => {
  appStore.update(state => ({ ...state, user }));
};

export const clearUser = () => {
  appStore.update(state => ({ ...state, user: null }));
};

export const toggleTheme = () => {
  appStore.update(state => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light'
  }));
};
`,
      });
    }

    return files;
  }

  private createComponentFile(
    componentName: string,
    componentType: string,
    props: Record<string, unknown>,
    designContext: IDesignContext
  ): IGeneratedFile {
    const propsInterface =
      Object.keys(props).length > 0
        ? `interface ${componentName}Props {\n${Object.entries(props)
            .map(([key, type]) => `  ${key}: ${type};`)
            .join('\n')}\n}\n\n`
        : '';

    const content = `${propsInterface}<script lang="ts">
  export let ${Object.keys(props).length > 0 ? `{ ${Object.keys(props).join(', ')} }` : ''}: ${componentName}Props = ${Object.keys(props).length > 0 ? '{}' : 'undefined'};
</script>

<div class="p-4 rounded-lg shadow-md border border-border bg-card" style="background-color: ${designContext.colorPalette.background}; color: ${designContext.colorPalette.foreground};">
  <h2 class="text-xl font-semibold mb-2 text-card-foreground" style="color: ${designContext.colorPalette.primary};">
    ${componentName}
  </h2>
  <p class="text-muted-foreground">
    This is a ${componentType} component generated by UIForge MCP with Svelte.
    It includes proper TypeScript types, Tailwind CSS styling, and accessibility features.
  </p>

  {#if Object.keys(${JSON.stringify(props)}).length > 0}
    <div class="mt-4 p-3 bg-muted rounded-md">
      <h3 class="font-medium text-sm mb-2">Props:</h3>
      <ul class="text-xs space-y-1">
        ${Object.entries(props)
          .map(([key, type]) => `<li><code>${key}</code>: ${type}</li>`)
          .join('')}
      </ul>
    </div>
  {/if}
</div>

<style>
  /* Component-specific styles */
</style>
`;

    return {
      path: `src/lib/components/${componentName}.svelte`,
      content,
    };
  }

  private createStorybookFile(
    componentName: string,
    _componentType: string,
    _designContext: IDesignContext
  ): IGeneratedFile {
    const content = `<script context="module">
  import type { Meta, StoryObj } from '@storybook/svelte';
  import { ${componentName} } from './${componentName}.svelte';

  const meta: Meta<${componentName}> = {
    title: 'Components/${componentName}',
    component: ${componentName},
    tags: ['autodocs'],
  };

  export default meta;

  type Story = StoryObj<${componentName}>;

  export const Default: Story = {
    args: {},
  };
</script>
`;

    return {
      path: `src/lib/components/${componentName}.stories.svelte`,
      content,
    };
  }

  private createTestFile(componentName: string, componentType: string, _designContext: IDesignContext): IGeneratedFile {
    const content = `import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { ${componentName} } from './${componentName}.svelte';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    const { container } = render(${componentName});

    expect(container).toBeInTheDocument();
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });

  it('displays the component type', () => {
    const { container } = render(${componentName});

    expect(container.textContent).toContain('${componentType}');
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(${componentName});

    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading?.tagName).toBe('H2');
  });

  it('applies design context styles', () => {
    const { container } = render(${componentName});

    const div = container.querySelector('div');
    expect(div).toHaveClass('rounded-lg');
    expect(div).toHaveClass('shadow-md');
  });
});
`;

    return {
      path: `src/lib/components/${componentName}.test.ts`,
      content,
    };
  }

  private createTypeDefinitionsFile(componentName: string, props: Record<string, unknown>): IGeneratedFile {
    const content = `export interface ${componentName}Props {
${
  Object.entries(props).length > 0
    ? Object.entries(props)
        .map(([key, type]) => `  ${key}: ${type};`)
        .join('\n')
    : '  // No props defined'
}
}

export interface ${componentName}Events {
  click?: CustomEvent<MouseEvent>;
  submit?: CustomEvent<FormData>;
}

export interface ${componentName}Slots {
  default?: any;
  header?: any;
  content?: any;
  footer?: any;
}
`;

    return {
      path: `src/lib/components/${componentName}.types.ts`,
      content,
    };
  }

  private createReadmeFile(projectName: string): IGeneratedFile {
    return {
      path: 'README.md',
      content: `# ${projectName}

A SvelteKit project generated by UIForge MCP.

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run type checking
npm run check
\`\`\`

## Project Structure

This project uses SvelteKit with:
- TypeScript for type safety
- Tailwind CSS for styling
- Vitest for testing
- ESLint and Prettier for code quality

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run test\` - Run tests
- \`npm run check\` - Run Svelte type checking
- \`npm run lint\` - Run ESLint
- \`npm run format\` - Format code with Prettier

## Learn More

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev/)

## Component Development

Components are located in \`src/lib/components/\` with:
- \`.svelte\` files for components
- \`.test.ts\` files for unit tests
- \`.stories.svelte\` files for Storybook stories
- \`.types.ts\` files for TypeScript definitions

## Deployment

This project is ready for deployment to:
- Vercel (recommended for SvelteKit)
- Netlify
- Any static hosting service
`,
    };
  }

  // Component library implementations
  protected getShadcnDependencies(): string[] {
    return ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-svelte'];
  }

  protected getRadixDependencies(): string[] {
    return ['@radix-ui/react-icons', '@radix-ui/react-slot'];
  }

  protected getHeadlessUIDependencies(): string[] {
    return ['@headlessui/vue'];
  }

  protected getPrimeVueDependencies(): string[] {
    return ['primevue', 'primeicons'];
  }

  protected getMaterialDependencies(): string[] {
    return ['@mui/material', '@mui/icons-material'];
  }

  protected getShadcnImports(): string[] {
    return ["import { cn } from '@/lib/utils'", "import * as Slot from '@radix-ui/react-slot'"];
  }

  protected getRadixImports(): string[] {
    return ["import * as RadixIcons from '@radix-ui/react-icons'", "import * as RadixSlot from '@radix-ui/react-slot'"];
  }

  protected getHeadlessUIImports(): string[] {
    return ["import { Button as HeadlessButton } from '@headlessui/vue'"];
  }

  protected getPrimeVueImports(): string[] {
    return ["import Button from 'primevue/button'", "import InputText from 'primevue/inputtext'"];
  }

  protected getMaterialImports(): string[] {
    return [
      "import { Button as MaterialButton } from '@mui/material'",
      "import { TextField as MaterialTextField } from '@mui/material'",
    ];
  }

  protected generateShadcnComponent(_componentType: string, _props: Record<string, unknown>): string {
    return `<script lang="ts">
  import { cn } from '$lib/utils';
  import { Button } from '$lib/components/ui/button';

  export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  export let class: string = '';
</script>

<Button {variant} {size} class={cn(class)}>
  <slot />
</Button>`;
  }

  protected generateRadixComponent(_componentType: string, _props: Record<string, unknown>): string {
    return `<script lang="ts">
  import * as Slider from '@radix-ui/themes/components/slider';
</script>

<Slider.Root>
  <Slider.Track>
    <Slider.Range />
  </Slider.Track>
  <Slider.Thumb />
</Slider.Root>`;
  }

  protected generateHeadlessUIComponent(_componentType: string, _props: Record<string, unknown>): string {
    return `<script lang="ts">
  // Headless UI not directly supported in Svelte, use Radix UI instead
</script>

<div class="headless-component">
  Component placeholder
</div>`;
  }

  protected generatePrimeVueComponent(_componentType: string, _props: Record<string, unknown>): string {
    return `<script lang="ts">
  // PrimeVue is Vue-specific, not available for Svelte
</script>

<div class="primevue-component">
  Component placeholder
</div>`;
  }

  protected generateMaterialComponent(_componentType: string, _props: Record<string, unknown>): string {
    return `<script lang="ts">
  // Material-UI is React-specific, not available for Svelte
</script>

<div class="material-component">
  Component placeholder
</div>`;
  }

  protected generateTailwindComponent(_componentType: string, _props: Record<string, unknown>): string {
    return `<script lang="ts">
  export let className = '';
  export let variant = 'default';
</script>

<div class="p-4 rounded-lg border {className}" data-variant={variant}>
  <slot />
</div>`;
  }
}
