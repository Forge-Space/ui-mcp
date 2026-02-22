/**
 * shadcn/ui Component Library Integration
 *
 * Complete integration for shadcn/ui component library including:
 * - Component templates
 * - Dependency management
 * - Common patterns
 * - Setup utilities
 */

export * from './templates.js';
export * from './dependencies.js';
export * from './patterns.js';

import type { IGeneratedFile, IDesignContext, Framework } from '../../types.js';
import { generateShadcnSetup } from './dependencies.js';
import { generateShadcnComponent } from './templates.js';
import { generateShadcnPattern } from './patterns.js';

/**
 * Complete shadcn/ui setup
 */
export interface ShadcnSetupOptions {
  framework: Framework;
  projectName: string;
  components?: string[];
  patterns?: string[];
  designContext?: IDesignContext;
  customizations?: Record<string, any>;
}

/**
 * Generate complete shadcn/ui project setup
 */
export function setupShadcnProject(options: ShadcnSetupOptions): IGeneratedFile[] {
  const files: IGeneratedFile[] = [];

  // 1. Generate setup files (package.json, tailwind, etc.)
  const setupFiles = generateShadcnSetup(options.framework, options.projectName, undefined, []);
  files.push(...setupFiles);

  // 2. Generate component files
  if (options.components) {
    options.components.forEach((componentName) => {
      try {
        const componentFiles = generateShadcnComponent(
          componentName,
          options.designContext ?? ({} as IDesignContext),
          options.customizations
        );
        files.push(...componentFiles);
      } catch (error) {
        console.warn(`Failed to generate component ${componentName}:`, error);
      }
    });
  }

  // 3. Generate pattern files
  if (options.patterns) {
    options.patterns.forEach((patternName) => {
      try {
        const patternFiles = generateShadcnPattern(
          patternName,
          options.designContext ?? ({} as IDesignContext),
          options.customizations
        );
        files.push(...patternFiles);
      } catch (error) {
        console.warn(`Failed to generate pattern ${patternName}:`, error);
      }
    });
  }

  return files;
}

/**
 * Get available shadcn components
 */
export function getAvailableShadcnComponents(): string[] {
  return [
    'Button',
    'Card',
    'Input',
    'Label',
    'Select',
    'Checkbox',
    'RadioGroup',
    'Switch',
    'Slider',
    'Progress',
    'Dialog',
    'Sheet',
    'DropdownMenu',
    'ContextMenu',
    'Popover',
    'Tooltip',
    'Toast',
    'Alert',
    'Badge',
    'Avatar',
    'Skeleton',
    'Table',
    'Tabs',
    'Accordion',
    'Collapsible',
    'Command',
    'NavigationMenu',
    'Sidebar',
    'Separator',
    'ScrollArea',
  ];
}

/**
 * Get available shadcn patterns
 */
export function getAvailableShadcnPatterns(): string[] {
  return [
    'LoginForm',
    'HeaderNavigation',
    'ToastNotifications',
    'DataTable',
    'SearchAndFilter',
    'UserProfile',
    'SettingsForm',
    'DashboardLayout',
    'OnboardingWizard',
    'ErrorBoundary',
  ];
}

/**
 * Validate shadcn setup
 */
export function validateShadcnSetup(files: IGeneratedFile[]): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for required files
  const requiredFiles = ['package.json', 'tailwind.config.js', 'lib/utils.ts'];

  requiredFiles.forEach((file) => {
    if (!files.find((f) => f.path === file)) {
      errors.push(`Missing required file: ${file}`);
    }
  });

  // Check for component directory structure
  const componentFiles = files.filter((f) => f.path.startsWith('components/ui/'));
  if (componentFiles.length === 0) {
    warnings.push('No UI components generated');
  }

  // Check for CSS file
  const cssFile = files.find((f) => f.path.includes('.css'));
  if (!cssFile) {
    errors.push('Missing CSS file with Tailwind directives');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
