import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import {
  GeneratorFactory,
  createGenerator,
  generateProject,
  generateComponent,
} from '../lib/generators/generator-factory.js';
import type {
  IGeneratedFile,
  IDesignContext,
  Architecture,
  StateManagement,
  Framework,
  ComponentLibraryId,
  IComponentLibrary,
} from '../lib/types.js';

describe('GeneratorFactory', () => {
  let factory: GeneratorFactory;

  beforeEach(() => {
    factory = GeneratorFactory.getInstance();
  });

  afterEach(() => {
    factory.clearInstances();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const factory1 = GeneratorFactory.getInstance();
      const factory2 = GeneratorFactory.getInstance();
      expect(factory1).toBe(factory2);
    });
  });

  describe('Framework Support', () => {
    it('should support all expected frameworks', () => {
      const supportedFrameworks = factory.getSupportedFrameworks();
      const expectedFrameworks: Framework[] = ['react', 'nextjs', 'vue', 'svelte', 'angular', 'html'];

      expect(supportedFrameworks).toHaveLength(expectedFrameworks.length);
      expectedFrameworks.forEach((framework) => {
        expect(supportedFrameworks).toContain(framework);
      });
    });

    it('should correctly identify supported frameworks', () => {
      expect(factory.isFrameworkSupported('react')).toBe(true);
      expect(factory.isFrameworkSupported('nextjs')).toBe(true);
      expect(factory.isFrameworkSupported('vue')).toBe(true);
      expect(factory.isFrameworkSupported('svelte')).toBe(true);
      expect(factory.isFrameworkSupported('angular')).toBe(true);
      expect(factory.isFrameworkSupported('html')).toBe(true);
      expect(factory.isFrameworkSupported('invalid')).toBe(false);
    });
  });

  describe('Generator Creation', () => {
    it('should create generators for all supported frameworks', () => {
      const supportedFrameworks = factory.getSupportedFrameworks();

      supportedFrameworks.forEach((framework) => {
        const generator = factory.createGenerator(framework);
        expect(generator).toBeDefined();
        expect(generator.getFramework()).toBe(framework);
      });
    });

    it('should cache generator instances', () => {
      const generator1 = factory.createGenerator('react');
      const generator2 = factory.createGenerator('react');

      expect(generator1).toBe(generator2);
    });

    it('should throw error for unsupported framework', () => {
      expect(() => factory.createGenerator('invalid' as Framework)).toThrow(
        'No generator registered for framework: invalid'
      );
    });
  });

  describe('Project Generation', () => {
    it('should generate projects for all supported frameworks', () => {
      const supportedFrameworks = factory.getSupportedFrameworks();

      supportedFrameworks.forEach((framework) => {
        const files = factory.generateProject(framework, 'test-project', 'flat', 'none');

        expect(Array.isArray(files)).toBe(true);
        expect(files.length).toBeGreaterThan(0);

        // Check that files have proper structure
        files.forEach((file) => {
          expect(file).toHaveProperty('path');
          expect(file).toHaveProperty('content');
          expect(typeof file.path).toBe('string');
          expect(typeof file.content).toBe('string');
        });
      });
    });

    it('should generate different architectures', () => {
      const architectures: Architecture[] = ['flat', 'feature-based', 'atomic'];

      architectures.forEach((architecture) => {
        const files = factory.generateProject('react', `test-${architecture}`, architecture, 'none');

        expect(files.length).toBeGreaterThan(0);
      });
    });

    it('should generate different state management setups', () => {
      const stateManagements: StateManagement[] = ['useState', 'zustand', 'pinia', 'signals', 'none'];

      stateManagements.forEach((stateManagement) => {
        const files = factory.generateProject('react', `test-${stateManagement}`, 'flat', stateManagement);

        expect(files.length).toBeGreaterThan(0);
      });
    });

    it('should use custom design context when provided', () => {
      const customContext: IDesignContext = {
        typography: {
          fontFamily: 'Custom Font',
          headingFont: 'Custom Heading Font',
          fontSize: {
            xs: '0.5rem',
            sm: '0.75rem',
            base: '1rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '2rem',
            '3xl': '3rem',
          },
          fontWeight: {
            normal: '300',
            medium: '400',
            semibold: '500',
            bold: '600',
          },
          lineHeight: {
            tight: '1.1',
            normal: '1.4',
            relaxed: '1.7',
          },
        },
        colorPalette: {
          primary: '#custom-primary',
          primaryForeground: '#ffffff',
          secondary: '#custom-secondary',
          secondaryForeground: '#ffffff',
          accent: '#custom-accent',
          accentForeground: '#000000',
          background: '#custom-background',
          foreground: '#custom-foreground',
          muted: '#custom-muted',
          mutedForeground: '#custom-muted-foreground',
          border: '#custom-border',
          destructive: '#custom-destructive',
          destructiveForeground: '#ffffff',
        },
        spacing: {
          unit: 8,
          scale: [0, 8, 16, 24, 32, 48, 64, 96],
        },
        borderRadius: {
          sm: '0.25rem',
          md: '0.5rem',
          lg: '0.75rem',
          full: '9999px',
        },
        shadows: {
          sm: '0 2px 4px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 8px -1px rgb(0 0 0 / 0.1)',
          lg: '0 8px 16px -2px rgb(0 0 0 / 0.15)',
        },
      };

      const files = factory.generateProject('react', 'test-custom-context', 'flat', 'none', customContext);

      expect(files.length).toBeGreaterThan(0);

      // Check that custom context is reflected in generated files
      const cssFile = files.find((f) => f.path.includes('.css') || f.path.includes('tailwind'));
      if (cssFile) {
        expect(cssFile.content).toContain('custom-primary');
      }
    });
  });

  describe('Component Generation', () => {
    it('should generate components for all supported frameworks', () => {
      const supportedFrameworks = factory.getSupportedFrameworks();

      supportedFrameworks.forEach((framework) => {
        const files = factory.generateComponent(framework, 'button', { variant: 'primary' });

        expect(Array.isArray(files)).toBe(true);
        expect(files.length).toBeGreaterThan(0);

        // Check that files have proper structure
        files.forEach((file) => {
          expect(file).toHaveProperty('path');
          expect(file).toHaveProperty('content');
          expect(typeof file.path).toBe('string');
          expect(typeof file.content).toBe('string');
        });
      });
    });

    it('should generate components with different libraries', () => {
      const componentLibraries: ComponentLibraryId[] = [
        'shadcn',
        'radix',
        'headlessui',
        'primevue',
        'material',
        'none',
      ];

      componentLibraries.forEach((library) => {
        const files = factory.generateComponent('react', 'button', { variant: 'primary' }, undefined, library);

        expect(files.length).toBeGreaterThan(0);
      });
    });

    it('should generate different component types', () => {
      const componentTypes = ['button', 'card', 'input', 'modal', 'dropdown'];

      componentTypes.forEach((componentType) => {
        const files = factory.generateComponent('react', componentType, { variant: 'primary' });

        expect(files.length).toBeGreaterThan(0);
      });
    });

    it('should handle component props correctly', () => {
      const props = {
        variant: 'primary',
        size: 'large',
        disabled: true,
        onClick: 'handleClick',
      };

      const files = factory.generateComponent('react', 'button', props);

      expect(files.length).toBeGreaterThan(0);

      // Check that props are reflected in generated component
      const componentFile = files.find((f) => f.path.includes('.tsx') || f.path.includes('.jsx'));
      if (componentFile) {
        expect(componentFile.content).toContain('variant');
        expect(componentFile.content).toContain('size');
        expect(componentFile.content).toContain('disabled');
      }
    });
  });

  describe('Generator Information', () => {
    it('should provide generator information', () => {
      const info = factory.getGeneratorInfo();

      expect(Array.isArray(info)).toBe(true);
      expect(info.length).toBeGreaterThan(0);

      info.forEach((generatorInfo) => {
        expect(generatorInfo).toHaveProperty('framework');
        expect(generatorInfo).toHaveProperty('className');
        expect(generatorInfo).toHaveProperty('isInstantiated');
        expect(typeof generatorInfo.framework).toBe('string');
        expect(typeof generatorInfo.className).toBe('string');
        expect(typeof generatorInfo.isInstantiated).toBe('boolean');
      });
    });

    it('should track instantiation status', () => {
      // Initially no instances should be created
      let info = factory.getGeneratorInfo();
      info.forEach((generatorInfo) => {
        expect(generatorInfo.isInstantiated).toBe(false);
      });

      // Create a generator
      factory.createGenerator('react');

      // Now React should be instantiated
      info = factory.getGeneratorInfo();
      const reactInfo = info.find((i) => i.framework === 'react');
      expect(reactInfo?.isInstantiated).toBe(true);
    });
  });

  describe('Instance Management', () => {
    it('should clear all instances', () => {
      // Create some instances
      factory.createGenerator('react');
      factory.createGenerator('vue');
      factory.createGenerator('angular');

      // Verify instances exist
      let info = factory.getGeneratorInfo();
      const instantiatedCount = info.filter((i) => i.isInstantiated).length;
      expect(instantiatedCount).toBeGreaterThan(0);

      // Clear all instances
      factory.clearInstances();

      // Verify no instances exist
      info = factory.getGeneratorInfo();
      info.forEach((generatorInfo) => {
        expect(generatorInfo.isInstantiated).toBe(false);
      });
    });

    it('should clear specific instance', () => {
      // Create instances
      factory.createGenerator('react');
      factory.createGenerator('vue');

      // Clear specific instance
      factory.clearInstance('react');

      // Verify only React instance is cleared
      const info = factory.getGeneratorInfo();
      const reactInfo = info.find((i) => i.framework === 'react');
      const vueInfo = info.find((i) => i.framework === 'vue');

      expect(reactInfo?.isInstantiated).toBe(false);
      expect(vueInfo?.isInstantiated).toBe(true);
    });
  });
});

describe('Convenience Functions', () => {
  describe('createGenerator', () => {
    it('should create a generator instance', () => {
      const generator = createGenerator('react');
      expect(generator).toBeDefined();
      expect(generator.getFramework()).toBe('react');
    });

    it('should throw error for unsupported framework', () => {
      expect(() => createGenerator('invalid' as Framework)).toThrow();
    });
  });

  describe('generateProject', () => {
    it('should generate a project', () => {
      const files = generateProject('react', 'test-project', 'flat', 'none');

      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('generateComponent', () => {
    it('should generate a component', () => {
      const files = generateComponent('react', 'button', { variant: 'primary' });

      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
    });

    it('should support component libraries', () => {
      const files = generateComponent('react', 'button', { variant: 'primary' }, undefined, 'shadcn');

      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
    });
  });
});
