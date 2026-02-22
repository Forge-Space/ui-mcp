import type { IGeneratedFile, IDesignContext, Architecture, StateManagement, Framework } from '../types.js';
import { BaseGenerator, ComponentLibrary } from './base-generator.js';
import { createLogger } from '../logger.js';
import { ReactGenerator } from './react-generator.js';
import { VueGenerator } from './vue-generator.js';
import { SvelteGenerator } from './svelte-generator.js';
import { AngularGenerator } from './angular-generator.js';
import { HtmlGenerator } from './html-generator.js';

const logger = createLogger('generator-factory');

// Type for generator constructor functions
type GeneratorConstructor = new (framework: Framework) => BaseGenerator;

/**
 * Generator Factory - Creates and manages framework generators
 * Provides a unified interface for creating generators and ensures consistent behavior
 */
export class GeneratorFactory {
  private static instance: GeneratorFactory;
  private generators: Map<Framework, GeneratorConstructor> = new Map();
  private instances: Map<Framework, BaseGenerator> = new Map();

  private constructor() {
    this.registerDefaultGenerators();
  }

  /**
   * Get singleton instance
   * @returns GeneratorFactory instance
   */
  static getInstance(): GeneratorFactory {
    if (!GeneratorFactory.instance) {
      GeneratorFactory.instance = new GeneratorFactory();
    }
    return GeneratorFactory.instance;
  }

  /**
   * Register a generator class for a framework
   * @param framework Framework type
   * @param generatorClass Generator class constructor
   */
  registerGenerator(framework: Framework, generatorClass: GeneratorConstructor): void {
    this.generators.set(framework, generatorClass);
    // Clear any existing instance for this framework
    this.instances.delete(framework);
    logger.info(`Registered generator for framework: ${framework}`);
  }

  /**
   * Create a generator instance for the specified framework
   * @param framework Framework type
   * @returns Generator instance
   */
  createGenerator(framework: Framework): BaseGenerator {
    // Return cached instance if available
    if (this.instances.has(framework)) {
      return this.instances.get(framework) as BaseGenerator;
    }

    const GeneratorClass = this.generators.get(framework);
    if (!GeneratorClass) {
      throw new Error(`No generator registered for framework: ${framework}`);
    }

    const instance = new GeneratorClass(framework);
    this.instances.set(framework, instance);

    logger.info(`Created generator instance for framework: ${framework}`);
    return instance;
  }

  /**
   * Generate a project using the specified framework
   * @param framework Framework type
   * @param projectName Project name
   * @param architecture Architecture pattern
   * @param stateManagement State management approach
   * @param designContext Design context
   * @returns Array of generated files
   */
  generateProject(
    framework: Framework,
    projectName: string,
    architecture: Architecture,
    stateManagement: StateManagement,
    designContext?: IDesignContext
  ): IGeneratedFile[] {
    const generator = this.createGenerator(framework);
    return generator.generateProject(
      projectName,
      architecture,
      stateManagement,
      designContext || this.getDefaultContext()
    );
  }

  /**
   * Generate a UI component
   * @param framework Target framework
   * @param componentType Component type
   * @param props Component props
   * @param designContext Design context
   * @param componentLibrary Component library to use
   * @returns Array of generated files
   */
  generateComponent(
    framework: Framework,
    componentType: string,
    props: Record<string, unknown>,
    designContext?: IDesignContext,
    componentLibrary?: ComponentLibrary
  ): IGeneratedFile[] {
    const generator = this.createGenerator(framework);
    return generator.generateComponent(
      componentType,
      props,
      designContext || this.getDefaultContext(),
      componentLibrary
    );
  }

  /**
   * Get list of supported frameworks
   * @returns Array of supported framework types
   */
  getSupportedFrameworks(): Framework[] {
    return Array.from(this.generators.keys());
  }

  /**
   * Check if a framework is supported
   * @param framework Framework to check
   * @returns True if supported
   */
  isFrameworkSupported(framework: string): framework is Framework {
    return this.generators.has(framework as Framework);
  }

  /**
   * Get generator information for all supported frameworks
   * @returns Array of generator information
   */
  getGeneratorInfo(): Array<{
    framework: Framework;
    className: string;
    isInstantiated: boolean;
  }> {
    return Array.from(this.generators.entries()).map(([framework, generatorClass]) => ({
      framework,
      className: generatorClass.name,
      isInstantiated: this.instances.has(framework),
    }));
  }

  /**
   * Clear all cached instances
   */
  clearInstances(): void {
    this.instances.clear();
    logger.info('Cleared all generator instances');
  }

  /**
   * Clear instance for a specific framework
   * @param framework Framework to clear
   */
  clearInstance(framework: Framework): void {
    this.instances.delete(framework);
    logger.info(`Cleared generator instance for framework: ${framework}`);
  }

  /**
   * Unregister a generator
   * @param framework Framework to unregister
   */
  unregisterGenerator(framework: Framework): void {
    this.generators.delete(framework);
    this.instances.delete(framework);
    logger.info(`Unregistered generator for framework: ${framework}`);
  }

  /**
   * Get default design context
   * @returns Default design context
   */
  private getDefaultContext(): IDesignContext {
    // This would typically come from the design context store
    // For now, return a basic default
    return {
      typography: {
        fontFamily: 'Inter, sans-serif',
        headingFont: 'Inter, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.75',
        },
      },
      colorPalette: {
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        secondary: '#64748b',
        secondaryForeground: '#ffffff',
        accent: '#f59e0b',
        accentForeground: '#000000',
        background: '#ffffff',
        foreground: '#1e293b',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
      },
      spacing: {
        unit: 4,
        scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    };
  }

  /**
   * Register default generators for all supported frameworks
   */
  private registerDefaultGenerators(): void {
    logger.info('Registering default generators');

    // Register concrete generator classes
    this.registerGenerator('react', ReactGenerator);
    this.registerGenerator('vue', VueGenerator);
    this.registerGenerator('svelte', SvelteGenerator);
    this.registerGenerator('angular', AngularGenerator);
    this.registerGenerator('html', HtmlGenerator);

    // Note: Next.js uses the React generator with specific configurations
    this.registerGenerator('nextjs', ReactGenerator);

    logger.info(`Registered ${this.getSupportedFrameworks().length} framework generators`);
  }
}

/**
 * Convenience function to create a generator
 * @param framework Framework type
 * @returns Generator instance
 */
export function createGenerator(framework: Framework): BaseGenerator {
  return GeneratorFactory.getInstance().createGenerator(framework);
}

/**
 * Convenience function to generate a project
 * @param framework Framework type
 * @param projectName Project name
 * @param architecture Architecture pattern
 * @param stateManagement State management approach
 * @param designContext Design context
 * @returns Array of generated files
 */
export function generateProject(
  framework: Framework,
  projectName: string,
  architecture: Architecture,
  stateManagement: StateManagement,
  designContext?: IDesignContext
): IGeneratedFile[] {
  return GeneratorFactory.getInstance().generateProject(
    framework,
    projectName,
    architecture,
    stateManagement,
    designContext
  );
}

/**
 * Convenience function to generate a component
 * @param framework Framework type
 * @param componentType Component type
 * @param props Component props
 * @param designContext Design context
 * @param componentLibrary Component library to use
 * @returns Array of generated files
 */
export function generateComponent(
  framework: Framework,
  componentType: string,
  props: Record<string, unknown>,
  designContext?: IDesignContext,
  componentLibrary?: ComponentLibrary
): IGeneratedFile[] {
  return GeneratorFactory.getInstance().generateComponent(
    framework,
    componentType,
    props,
    designContext,
    componentLibrary
  );
}
