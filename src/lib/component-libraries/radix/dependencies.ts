/**
 * Radix UI Dependencies Management
 */

import type { IGeneratedFile, Framework } from '../../types.js';

export interface RadixDependency {
  name: string;
  version?: string;
  type: 'dependency' | 'devDependency' | 'peerDependency';
  optional?: boolean;
  reason?: string;
}

export interface RadixConfig {
  style: 'unstyled' | 'styled';
  theme: 'light' | 'dark' | 'auto';
  animations: boolean;
  focusManagement: boolean;
}

export const defaultDependencies: RadixDependency[] = [
  { name: 'react', type: 'peerDependency' },
  { name: 'react-dom', type: 'peerDependency' },
  { name: 'typescript', type: 'devDependency' },
  { name: '@types/react', type: 'devDependency' },
  { name: '@types/react-dom', type: 'devDependency' },
  { name: '@radix-ui/react-slot', type: 'dependency', version: '^1.0.2' },
  { name: '@radix-ui/react-dialog', type: 'dependency', version: '^1.0.5' },
  { name: '@radix-ui/react-dropdown-menu', type: 'dependency', version: '^2.0.6' },
  { name: '@radix-ui/react-navigation-menu', type: 'dependency', version: '^1.1.0' },
  { name: '@radix-ui/react-tooltip', type: 'dependency', version: '^1.0.7' },
  { name: '@radix-ui/react-focus-scope', type: 'dependency', version: '^1.0.4' },
  { name: '@radix-ui/react-portal', type: 'dependency', version: '^1.0.4' },
  { name: '@radix-ui/react-popover', type: 'dependency', version: '^1.0.7' },
  { name: '@radix-ui/react-tabs', type: 'dependency', version: '^1.0.4' },
  { name: '@radix-ui/react-switch', type: 'dependency', version: '^1.0.3' },
  { name: '@radix-ui/react-checkbox', type: 'dependency', version: '^1.0.4' },
  { name: '@radix-ui/react-radio-group', type: 'dependency', version: '^1.1.3' },
  { name: 'lucide-react', type: 'dependency', version: '^0.263.1' },
  { name: '@types/node', type: 'devDependency', version: '^20' },
  { name: 'eslint', type: 'devDependency', version: '^8' },
  { name: '@typescript-eslint/parser', type: 'devDependency', version: '^6' },
  { name: '@typescript-eslint/eslint-plugin', type: 'devDependency', version: '^5' },
];

export const defaultConfig: RadixConfig = {
  style: 'unstyled',
  theme: 'auto',
  animations: true,
  focusManagement: true,
};

export function generatePackageJson(
  framework: Framework,
  projectName: string,
  config: RadixConfig = defaultConfig,
  additionalDependencies?: RadixDependency[]
): IGeneratedFile {
  const all = defaultDependencies.concat(additionalDependencies || []);

  const deps = all
    .filter((d) => d.type === 'dependency')
    .reduce(
      (acc, d) => {
        acc[d.name] = d.version || 'latest';
        return acc;
      },
      {} as Record<string, string>
    );

  const devDeps = all
    .filter((d) => d.type === 'devDependency')
    .reduce(
      (acc, d) => {
        acc[d.name] = d.version || 'latest';
        return acc;
      },
      {} as Record<string, string>
    );

  const peerDeps = all
    .filter((d) => d.type === 'peerDependency')
    .reduce(
      (acc, d) => {
        acc[d.name] = d.version || 'latest';
        return acc;
      },
      {} as Record<string, string>
    );

  const scripts: Record<string, string> =
    framework === 'nextjs'
      ? { dev: 'next dev', build: 'next build', start: 'next start', lint: 'next lint', 'type-check': 'tsc --noEmit' }
      : {
          dev: 'vite',
          build: 'tsc && vite build',
          preview: 'vite preview',
          lint: 'eslint . --ext ts,tsx',
          'type-check': 'tsc --noEmit',
        };

  return {
    path: 'package.json',
    content: JSON.stringify(
      {
        name: projectName,
        version: '0.1.0',
        private: true,
        scripts,
        dependencies: deps,
        devDependencies: devDeps,
        peerDependencies: peerDeps,
      },
      null,
      2
    ),
  };
}

export function generateCssConfig(config: RadixConfig = defaultConfig): IGeneratedFile {
  const darkBlock =
    config.theme === 'dark'
      ? `
.dark {
  --radix-overlay-bg: hsl(0 0% 0% / 0.7);
  --radix-content-bg: hsl(222 84% 5%);
  --radix-border: hsl(217 33% 17%);
  --radix-text: hsl(210 40% 98%);
}`
      : '';

  return {
    path: 'styles/radix-variables.css',
    content: `:root {
  --radix-overlay-bg: hsl(0 0% 0% / 0.4);
  --radix-content-bg: hsl(0 0% 100%);
  --radix-border: hsl(214 32% 91%);
  --radix-text: hsl(222 84% 5%);
  --radix-focus-ring: hsl(222 84% 5%);
}
${darkBlock}
.radix-focus-visible {
  outline: 2px solid var(--radix-focus-ring);
  outline-offset: 2px;
}`,
  };
}

export function generateUtilsFile(): IGeneratedFile {
  return {
    path: 'lib/utils.ts',
    content: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
  };
}

export function generateRadixSetup(
  framework: Framework,
  projectName: string,
  config: RadixConfig = defaultConfig,
  additionalDependencies?: RadixDependency[]
): IGeneratedFile[] {
  return [
    generatePackageJson(framework, projectName, config, additionalDependencies),
    generateCssConfig(config),
    generateUtilsFile(),
  ];
}
