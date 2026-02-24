/**
 * Material-UI Component Library Integration
 */

export * from './templates.js';

import type { IGeneratedFile, IDesignContext, Framework } from '../../types.js';
import { generateMaterialComponent, getMaterialTemplates } from './templates.js';

export interface MaterialSetupOptions {
  framework: Framework;
  projectName: string;
  components?: string[];
  designContext?: IDesignContext;
  customizations?: Record<string, unknown>;
}

export function setupMaterialProject(options: MaterialSetupOptions): IGeneratedFile[] {
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
          dev: options.framework === 'nextjs' ? 'next dev' : 'vite',
          build: options.framework === 'nextjs' ? 'next build' : 'tsc && vite build',
          start: options.framework === 'nextjs' ? 'next start' : 'vite preview',
          lint: options.framework === 'nextjs' ? 'next lint' : 'eslint . --ext ts,tsx',
          'type-check': 'tsc --noEmit',
        },
        dependencies: {
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          '@mui/material': '^5.15.0',
          '@mui/icons-material': '^5.15.0',
          '@emotion/react': '^11.11.0',
          '@emotion/styled': '^11.11.0',
        },
        devDependencies: {
          typescript: '^5.0.0',
          '@types/react': '^18.2.0',
          '@types/react-dom': '^18.2.0',
          '@types/node': '^20',
          vite: '^5.0.0',
          '@vitejs/plugin-react': '^4.0.0',
        },
      },
      null,
      2
    ),
  });

  // Always include theme setup
  try {
    files.push(...generateMaterialComponent('Theme', options.designContext ?? ({} as IDesignContext)));
  } catch {
    // skip if not found
  }

  if (options.components) {
    for (const name of options.components) {
      try {
        files.push(...generateMaterialComponent(name, options.designContext ?? ({} as IDesignContext)));
      } catch {
        // skip unknown components
      }
    }
  }

  return files;
}

export function getAvailableMaterialComponents(): string[] {
  return getMaterialTemplates()
    .map((t) => t.name)
    .concat([
      'Autocomplete',
      'Chip',
      'Avatar',
      'Badge',
      'Tooltip',
      'Snackbar',
      'Alert',
      'LinearProgress',
      'CircularProgress',
      'Table',
      'DataGrid',
      'Accordion',
      'Tabs',
      'Drawer',
      'AppBar',
      'BottomNavigation',
      'Breadcrumbs',
      'Pagination',
      'Rating',
      'Slider',
      'Switch',
      'Checkbox',
      'RadioGroup',
      'Select',
      'DatePicker',
      'TimePicker',
    ]);
}

export function getAvailableMaterialPatterns(): string[] {
  return [
    'DashboardLayout',
    'DataTable',
    'LoginForm',
    'SettingsPage',
    'ProfileCard',
    'NotificationCenter',
    'SearchBar',
    'FilterPanel',
    'StepperForm',
  ];
}
