import type { IGeneratedFile, IDesignContext, Architecture, StateManagement, Framework } from '../lib/types.js';
import { createLogger } from '../lib/logger.js';
import { designContextStore } from '../lib/design-context.js';

// Import all template generators
import { generateReactProject } from '../lib/templates/react.js';
import { generateNextjsProject } from '../lib/templates/nextjs.js';
import { generateVueProject } from '../lib/templates/vue.js';
import { generateAngularProject } from '../lib/templates/angular.js';
import { generateHtmlProject } from '../lib/templates/html.js';
import { generateSvelteProject } from '../lib/templates/svelte.js';

const logger = createLogger('generation-service');

// Helper function to infer TypeScript types from JavaScript values
function getTypeScriptType(value: any): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'any[]';
    const itemType = getTypeScriptType(value[0]);
    return itemType === 'any' ? 'any[]' : `Array<${itemType}>`;
  }
  if (typeof value === 'object') return 'Record<string, any>';
  return typeof value;
}

/**
 * Generation Service - Handles all code generation operations
 * Provides a unified interface for project and component generation across frameworks
 */
export class GenerationService {
  private readonly frameworkGenerators: Map<Framework, typeof generateReactProject>;

  constructor() {
    this.frameworkGenerators = new Map([
      ['react', generateReactProject],
      ['nextjs', generateNextjsProject],
      ['vue', generateVueProject],
      ['angular', generateAngularProject],
      ['html', generateHtmlProject],
      ['svelte', generateSvelteProject],
    ]);
  }

  /**
   * Generate a complete project for the specified framework
   * @param request Project generation request
   * @returns Array of generated files
   */
  generateProject(request: {
    framework: Framework;
    projectName: string;
    architecture: Architecture;
    stateManagement: StateManagement;
    designContext?: IDesignContext;
  }): IGeneratedFile[] {
    const { framework, projectName, architecture, stateManagement, designContext } = request;

    logger.info(`Generating ${framework} project: ${projectName}`);

    const generator = this.frameworkGenerators.get(framework);
    if (!generator) {
      throw new Error(`Unsupported framework: ${framework}`);
    }

    const context = designContext || designContextStore.get();
    const files = generator(projectName, architecture, stateManagement, context);

    logger.info(`Generated ${files.length} files for ${framework} project`);
    return files;
  }

  /**
   * Generate a UI component for the specified framework
   * @param request Component generation request
   * @returns Generated component files
   */
  async generateComponent(request: {
    framework: Framework;
    componentType: string;
    props?: Record<string, any>;
    designContext?: IDesignContext;
  }): Promise<IGeneratedFile[]> {
    const { framework, componentType, props, designContext } = request;

    logger.info(`Generating ${framework} component: ${componentType}`);

    // This would integrate with the existing generate_ui_component tool
    // For now, we'll create a placeholder implementation
    const context = designContext || designContextStore.get();

    // Generate component files based on framework and type
    const files = await this.generateComponentFiles(framework, componentType, props || {}, context);

    logger.info(`Generated ${files.length} component files`);
    return files;
  }

  /**
   * Get supported frameworks
   * @returns Array of supported framework names
   */
  getSupportedFrameworks(): Framework[] {
    return Array.from(this.frameworkGenerators.keys());
  }

  /**
   * Check if a framework is supported
   * @param framework Framework to check
   * @returns True if supported
   */
  isFrameworkSupported(framework: string): framework is Framework {
    return this.frameworkGenerators.has(framework as Framework);
  }

  /**
   * Validate generation request
   * @param request Generation request to validate
   * @returns Validation result
   */
  validateGenerationRequest(request: { framework: Framework; projectName?: string; componentType?: string }): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check framework support
    if (!this.isFrameworkSupported(request.framework)) {
      errors.push(`Unsupported framework: ${request.framework}`);
    }

    // Validate project name for project generation
    if (request.projectName) {
      if (!request.projectName.trim()) {
        errors.push('Project name cannot be empty');
      }
      if (!/^[a-zA-Z0-9-_]+$/.test(request.projectName)) {
        errors.push('Project name can only contain letters, numbers, hyphens, and underscores');
      }
    }

    // Validate component type for component generation
    if (request.componentType) {
      if (!request.componentType.trim()) {
        errors.push('Component type cannot be empty');
      }
      if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(request.componentType)) {
        errors.push(
          'Component type must start with a letter and contain only letters, numbers, hyphens, and underscores'
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get generation statistics
   * @returns Statistics about supported frameworks and capabilities
   */
  getGenerationStats(): {
    supportedFrameworks: Framework[];
    totalFrameworks: number;
    supportedArchitectures: Architecture[];
    supportedStateManagement: StateManagement[];
  } {
    return {
      supportedFrameworks: this.getSupportedFrameworks(),
      totalFrameworks: this.frameworkGenerators.size,
      supportedArchitectures: ['flat', 'feature-based', 'atomic'],
      supportedStateManagement: ['useState', 'zustand', 'pinia', 'signals', 'none'],
    };
  }

  /**
   * Generate component files (placeholder implementation)
   * @param framework Target framework
   * @param componentType Component type
   * @param props Component props
   * @param designContext Design context
   * @returns Array of generated files
   */
  private async generateComponentFiles(
    framework: Framework,
    componentType: string,
    props: Record<string, any>,
    designContext: IDesignContext
  ): Promise<IGeneratedFile[]> {
    const files: IGeneratedFile[] = [];

    // This is a simplified implementation
    // In the full implementation, this would use the existing component generation logic

    const componentName = this.formatComponentName(componentType);
    const fileName = `${componentName}.${this.getFileExtension(framework)}`;

    // Generate component file
    files.push({
      path: fileName,
      content: this.generateComponentCode(framework, componentName, props, designContext),
    });

    // Generate test file
    files.push({
      path: `${componentName}.test.${this.getFileExtension(framework)}`,
      content: this.generateComponentTest(framework, componentName),
    });

    // Generate story file for frameworks that support it
    if (['react', 'nextjs', 'vue', 'svelte'].includes(framework)) {
      files.push({
        path: `${componentName}.stories.${this.getFileExtension(framework)}`,
        content: this.generateComponentStory(framework, componentName),
      });
    }

    return files;
  }

  /**
   * Format component name based on framework conventions
   * @param componentType Component type
   * @returns Formatted component name
   */
  private formatComponentName(componentType: string): string {
    // Convert kebab-case to PascalCase
    return componentType
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  /**
   * Get file extension for framework
   * @param framework Framework
   * @returns File extension
   */
  private getFileExtension(framework: Framework): string {
    switch (framework) {
      case 'react':
      case 'nextjs':
        return 'tsx';
      case 'svelte':
        return 'svelte';
      case 'vue':
        return 'vue';
      case 'angular':
        return 'ts';
      case 'html':
        return 'html';
      default:
        return 'ts';
    }
  }

  /**
   * Generate component code (simplified)
   * @param framework Target framework
   * @param componentName Component name
   * @param props Component props
   * @param designContext Design context
   * @returns Component code
   */
  private generateComponentCode(
    framework: Framework,
    componentName: string,
    props: Record<string, any>,
    designContext: IDesignContext
  ): string {
    // This is a simplified implementation
    // The full implementation would use the existing template generators

    const primaryColor = designContext.colorPalette.primary;

    switch (framework) {
      case 'react':
      case 'nextjs':
        return `import React from 'react';

export interface ${componentName}Props {
  ${Object.entries(props)
    .map(([key, value]) => `${key}: ${getTypeScriptType(value)};`)
    .join('\n  ')}
}

export function ${componentName}({ ${Object.keys(props).join(', ')} }: ${componentName}Props) {
  return (
    <div style={{ color: '${primaryColor}' }}>
      <h1>${componentName}</h1>
    </div>
  );
}`;

      case 'vue':
        return `<template>
  <div :style="{ color: '${primaryColor}' }">
    <h1>${componentName}</h1>
  </div>
</template>

<script setup lang="ts">
interface Props {
  ${Object.entries(props)
    .map(([key, value]) => `${key}: ${typeof value};`)
    .join('\n  ')}
}

defineProps<Props>();
</script>`;

      case 'svelte':
        return `<script lang="ts">
  export interface Props {
    ${Object.entries(props)
      .map(([key, value]) => `${key}: ${getTypeScriptType(value)};`)
      .join('\n  ')}
  }

  let { ${Object.keys(props).join(', ')} }: Props = $props();
</script>

<div style:color={primaryColor}>
  <h1>${componentName}</h1>
</div>`;

      default:
        return `// ${componentName} for ${framework}
// Primary color: ${primaryColor}
// Props: ${JSON.stringify(props, null, 2)}`;
    }
  }

  /**
   * Generate component test (simplified)
   * @param framework Target framework
   * @param componentName Component name
   * @returns Test code
   */
  private generateComponentTest(framework: Framework, componentName: string): string {
    switch (framework) {
      case 'react':
      case 'nextjs':
        return `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });
});`;

      default:
        return `// Test for ${componentName} in ${framework}`;
    }
  }

  /**
   * Generate component story (simplified)
   * @param framework Target framework
   * @param componentName Component name
   * @returns Story code
   */
  private generateComponentStory(framework: Framework, componentName: string): string {
    switch (framework) {
      case 'react':
      case 'nextjs':
        return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};`;

      default:
        return `// Story for ${componentName} in ${framework}`;
    }
  }
}

// Export singleton instance for backward compatibility
export const generationService = new GenerationService();
