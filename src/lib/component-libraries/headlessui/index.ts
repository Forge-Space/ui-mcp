/**
 * Headless UI Component Library Integration
 */

export * from './templates.js';

import type { IGeneratedFile, IDesignContext, Framework } from '../../types.js';
import { generateHeadlessComponent, getHeadlessTemplates } from './templates.js';

export interface HeadlessSetupOptions {
  framework: Framework;
  projectName: string;
  components?: string[];
  designContext?: IDesignContext;
  customizations?: Record<string, unknown>;
}

export function setupHeadlessProject(options: HeadlessSetupOptions): IGeneratedFile[] {
  const files: IGeneratedFile[] = [];

  // Base package.json
  files.push({
    path: 'package.json',
    content: JSON.stringify(
      {
        name: options.projectName,
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'vite',
          build: 'tsc && vite build',
          preview: 'vite preview',
          'type-check': 'tsc --noEmit',
        },
        dependencies: {
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          '@headlessui/react': '^1.7.17',
          'lucide-react': '^0.263.1',
          clsx: '^2.0.0',
          'tailwind-merge': '^2.2.0',
        },
        devDependencies: {
          typescript: '^5.0.0',
          '@types/react': '^18.2.0',
          '@types/react-dom': '^18.2.0',
          tailwindcss: '^3.4.0',
          postcss: '^8',
          autoprefixer: '^10.0.1',
          vite: '^5.0.0',
          '@vitejs/plugin-react': '^4.0.0',
        },
      },
      null,
      2
    ),
  });

  // Utils file
  files.push({
    path: 'lib/utils.ts',
    content: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
  });

  if (options.components) {
    for (const name of options.components) {
      try {
        files.push(...generateHeadlessComponent(name, options.designContext ?? ({} as IDesignContext)));
      } catch {
        // skip unknown components
      }
    }
  }

  return files;
}

export function getAvailableHeadlessComponents(): string[] {
  return getHeadlessTemplates()
    .map((t) => t.name)
    .concat(['Listbox', 'Menu', 'Popover', 'RadioGroup', 'Switch', 'Disclosure', 'FocusTrap', 'TransitionGroup']);
}

export function getAvailableHeadlessPatterns(): string[] {
  return ['CommandPalette', 'MultiSelect', 'NestedMenu', 'Slideover', 'Notification', 'StepWizard'];
}
