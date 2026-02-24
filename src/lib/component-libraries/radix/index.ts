/**
 * Radix UI Component Library Integration
 */

export * from './templates.js';
export * from './dependencies.js';

import type { IGeneratedFile, IDesignContext, Framework } from '../../types.js';
import { generateRadixSetup } from './dependencies.js';
import { generateRadixComponent } from './templates.js';

export interface RadixSetupOptions {
  framework: Framework;
  projectName: string;
  components?: string[];
  designContext?: IDesignContext;
  customizations?: Record<string, unknown>;
}

export function setupRadixProject(options: RadixSetupOptions): IGeneratedFile[] {
  const files: IGeneratedFile[] = [];

  files.push(...generateRadixSetup(options.framework, options.projectName));

  if (options.components) {
    for (const name of options.components) {
      try {
        files.push(
          ...generateRadixComponent(name, options.designContext ?? ({} as IDesignContext), options.customizations)
        );
      } catch {
        // skip unknown components
      }
    }
  }

  return files;
}

export function getAvailableRadixComponents(): string[] {
  return [
    'Button',
    'Dialog',
    'DropdownMenu',
    'Tooltip',
    'Popover',
    'Tabs',
    'Switch',
    'Checkbox',
    'RadioGroup',
    'NavigationMenu',
    'ContextMenu',
    'AlertDialog',
    'HoverCard',
    'Accordion',
    'Collapsible',
    'Separator',
    'ScrollArea',
    'Select',
    'Slider',
    'Progress',
    'Avatar',
  ];
}

export function getAvailableRadixPatterns(): string[] {
  return ['CommandPalette', 'ComboBox', 'DatePicker', 'MultiSelect', 'RichTextEditor', 'ColorPicker'];
}
