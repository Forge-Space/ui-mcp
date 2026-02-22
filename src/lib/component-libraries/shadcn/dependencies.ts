/**
 * shadcn/ui Dependencies Management
 *
 * Handles installation, configuration, and management of shadcn/ui dependencies
 */

import type { IGeneratedFile, Framework } from '../../types.js';

export interface ShadcnDependency {
  name: string;
  version?: string;
  type: 'dependency' | 'devDependency' | 'peerDependency';
  optional?: boolean;
  reason?: string;
}

export interface ShadcnConfig {
  style: 'default' | 'new-york' | 'zinc';
  baseColor:
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'rose'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';
  cssVariables: boolean;
  prefix: string;
  tailwind: {
    config: string;
    css: string;
    baseColor?: string;
    cssVariables?: boolean;
    prefix?: string;
  };
  rsc: boolean;
  tsx: boolean;
  aliases: {
    components: string;
    utils: string;
    ui: string;
    lib: string;
    hooks: string;
  };
}

/**
 * Default shadcn dependencies
 */
export const defaultDependencies: ShadcnDependency[] = [
  // Core dependencies
  {
    name: 'react',
    type: 'peerDependency',
    reason: 'React framework',
  },
  {
    name: 'react-dom',
    type: 'peerDependency',
    reason: 'React DOM renderer',
  },
  {
    name: 'typescript',
    type: 'devDependency',
    reason: 'TypeScript support',
  },
  {
    name: '@types/react',
    type: 'devDependency',
    reason: 'React TypeScript types',
  },
  {
    name: '@types/react-dom',
    type: 'devDependency',
    reason: 'React DOM TypeScript types',
  },

  // Tailwind CSS
  {
    name: 'tailwindcss',
    type: 'devDependency',
    version: '^3.4.0',
    reason: 'CSS framework',
  },
  {
    name: 'postcss',
    type: 'devDependency',
    version: '^8',
    reason: 'CSS post-processing',
  },
  {
    name: 'autoprefixer',
    type: 'devDependency',
    version: '^10.0.1',
    reason: 'CSS autoprefixing',
  },

  // Utility libraries
  {
    name: 'class-variance-authority',
    type: 'dependency',
    version: '^0.7.0',
    reason: 'Component variant management',
  },
  {
    name: 'clsx',
    type: 'dependency',
    version: '^2.0.0',
    reason: 'Conditional class names',
  },
  {
    name: 'tailwind-merge',
    type: 'dependency',
    version: '^2.2.0',
    reason: 'Tailwind class merging',
  },

  // Radix UI primitives
  {
    name: '@radix-ui/react-slot',
    type: 'dependency',
    version: '^1.0.2',
    reason: 'Slot primitive for compound components',
  },
  {
    name: '@radix-ui/react-dialog',
    type: 'dependency',
    version: '^1.0.5',
    reason: 'Dialog primitive',
  },
  {
    name: '@radix-ui/react-dropdown-menu',
    type: 'dependency',
    version: '^2.0.6',
    reason: 'Dropdown menu primitive',
  },
  {
    name: '@radix-ui/react-toast',
    type: 'dependency',
    version: '^1.1.5',
    reason: 'Toast notification primitive',
  },
  {
    name: '@radix-ui/react-tooltip',
    type: 'dependency',
    version: '^1.0.7',
    reason: 'Tooltip primitive',
  },

  // Icons
  {
    name: 'lucide-react',
    type: 'dependency',
    version: '^0.263.1',
    reason: 'Icon library',
  },

  // Development tools
  {
    name: '@types/node',
    type: 'devDependency',
    version: '^20',
    reason: 'Node.js TypeScript types',
  },
  {
    name: 'eslint',
    type: 'devDependency',
    version: '^8',
    reason: 'Code linting',
  },
  {
    name: 'eslint-config-next',
    type: 'devDependency',
    version: '14.2.1',
    reason: 'Next.js ESLint configuration',
  },
];

/**
 * Default shadcn configuration
 */
export const defaultConfig: ShadcnConfig = {
  style: 'default',
  baseColor: 'slate',
  cssVariables: true,
  prefix: '',
  tailwind: {
    config: 'tailwind.config.js',
    css: 'app/globals.css',
    baseColor: 'slate',
    cssVariables: true,
    prefix: '',
  },
  rsc: true,
  tsx: true,
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    ui: '@/components/ui',
    lib: '@/lib',
    hooks: '@/hooks',
  },
};

/**
 * Generate package.json with shadcn dependencies
 */
export function generatePackageJson(
  framework: Framework,
  projectName: string,
  _config: ShadcnConfig = defaultConfig,
  additionalDependencies?: ShadcnDependency[]
): IGeneratedFile {
  const dependencies = defaultDependencies.concat(additionalDependencies || []);

  const deps = dependencies
    .filter((dep) => dep.type === 'dependency')
    .reduce(
      (acc, dep) => {
        acc[dep.name] = dep.version || 'latest';
        return acc;
      },
      {} as Record<string, string>
    );

  const devDeps = dependencies
    .filter((dep) => dep.type === 'devDependency')
    .reduce(
      (acc, dep) => {
        acc[dep.name] = dep.version || 'latest';
        return acc;
      },
      {} as Record<string, string>
    );

  const peerDeps = dependencies
    .filter((dep) => dep.type === 'peerDependency')
    .reduce(
      (acc, dep) => {
        acc[dep.name] = dep.version || 'latest';
        return acc;
      },
      {} as Record<string, string>
    );

  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: getScripts(framework),
    dependencies: deps,
    devDependencies: devDeps,
    peerDependencies: peerDeps,
    engines: {
      node: '>=18.0.0',
      npm: '>=8.0.0',
    },
  };

  return {
    path: 'package.json',
    content: JSON.stringify(packageJson, null, 2),
  };
}

/**
 * Get framework-specific scripts
 */
function getScripts(framework: Framework): Record<string, string> {
  switch (framework) {
    case 'nextjs':
      return {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        'type-check': 'tsc --noEmit',
      };
    case 'react':
      return {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
        'type-check': 'tsc --noEmit',
      };
    default:
      return {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
      };
  }
}

/**
 * Generate Tailwind configuration
 */
export function generateTailwindConfig(config: ShadcnConfig = defaultConfig): IGeneratedFile {
  const tailwindConfig = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: config.prefix,
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
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
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require('tailwindcss-animate')],
  };

  return {
    path: 'tailwind.config.js',
    content: `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(tailwindConfig, null, 2)}`,
  };
}

/**
 * Generate CSS variables file
 */
export function generateCssVariables(config: ShadcnConfig = defaultConfig): IGeneratedFile {
  const _baseColors = {
    slate: {
      50: '248 250 252',
      100: '241 245 249',
      200: '226 232 240',
      300: '203 213 225',
      400: '148 163 184',
      500: '100 116 139',
      600: '71 85 105',
      700: '51 65 85',
      800: '30 41 59',
      900: '15 23 42',
      950: '2 6 23',
    },
  };

  const css = `@tailwind base;
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

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

  return {
    path: config.tailwind.css,
    content: css,
  };
}

/**
 * Generate utils file
 */
export function generateUtilsFile(_config: ShadcnConfig = defaultConfig): IGeneratedFile {
  const utils = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  return {
    path: 'lib/utils.ts',
    content: utils,
  };
}

/**
 * Generate all shadcn setup files
 */
export function generateShadcnSetup(
  framework: Framework,
  projectName: string,
  config: ShadcnConfig = defaultConfig,
  additionalDependencies?: ShadcnDependency[]
): IGeneratedFile[] {
  return [
    generatePackageJson(framework, projectName, config, additionalDependencies),
    generateTailwindConfig(config),
    generateCssVariables(config),
    generateUtilsFile(config),
  ];
}
