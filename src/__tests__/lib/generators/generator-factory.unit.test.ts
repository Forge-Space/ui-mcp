import {
  GeneratorFactory,
  createGenerator,
  generateProject,
  generateComponent,
} from '../../../lib/generators/generator-factory.js';
import { ReactGenerator } from '../../../lib/generators/react-generator.js';
import { VueGenerator } from '../../../lib/generators/vue-generator.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../../lib/generators/default-design-context.js';
import type { Framework, IDesignContext } from '../../../lib/types.js';

describe('GeneratorFactory', () => {
  let factory: GeneratorFactory;

  beforeEach(() => {
    factory = GeneratorFactory.getInstance();
    factory.clearInstances();
  });

  describe('getInstance', () => {
    it('returns singleton instance', () => {
      const instance1 = GeneratorFactory.getInstance();
      const instance2 = GeneratorFactory.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('createGenerator', () => {
    it('creates React generator', () => {
      const generator = factory.createGenerator('react');
      expect(generator).toBeInstanceOf(ReactGenerator);
    });

    it('creates Vue generator', () => {
      const generator = factory.createGenerator('vue');
      expect(generator).toBeInstanceOf(VueGenerator);
    });

    it('creates Svelte generator', () => {
      const generator = factory.createGenerator('svelte');
      expect(generator).toBeDefined();
    });

    it('creates Angular generator', () => {
      const generator = factory.createGenerator('angular');
      expect(generator).toBeDefined();
    });

    it('creates HTML generator', () => {
      const generator = factory.createGenerator('html');
      expect(generator).toBeDefined();
    });

    it('creates Next.js generator', () => {
      const generator = factory.createGenerator('nextjs');
      expect(generator).toBeInstanceOf(ReactGenerator);
    });

    it('caches generator instances', () => {
      const generator1 = factory.createGenerator('react');
      const generator2 = factory.createGenerator('react');
      expect(generator1).toBe(generator2);
    });

    it('throws error for unsupported framework', () => {
      expect(() => {
        factory.createGenerator('invalid' as Framework);
      }).toThrow('No generator registered for framework');
    });
  });

  describe('generateProject', () => {
    it('generates React project', () => {
      const files = factory.generateProject('react', 'test-app', 'flat', 'none');
      expect(files.length).toBeGreaterThan(0);
      expect(files.some((f) => f.path === 'package.json')).toBe(true);
    });

    it('generates Vue project', () => {
      const files = factory.generateProject('vue', 'vue-app', 'flat', 'none');
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates project with custom design context', () => {
      const customContext: IDesignContext = {
        ...DEFAULT_DESIGN_CONTEXT,
        colorPalette: {
          ...DEFAULT_DESIGN_CONTEXT.colorPalette,
          primary: '#ff0000',
        },
      };
      const files = factory.generateProject('react', 'custom-app', 'flat', 'none', customContext);
      expect(files.length).toBeGreaterThan(0);
    });

    it('uses default context when none provided', () => {
      const files = factory.generateProject('react', 'default-app', 'flat', 'none');
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('generateComponent', () => {
    it('generates React component', () => {
      const files = factory.generateComponent('react', 'Button', {});
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with props', () => {
      const files = factory.generateComponent('react', 'Button', { label: 'string', onClick: 'function' });
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with custom design context', () => {
      const files = factory.generateComponent('react', 'Button', {}, DEFAULT_DESIGN_CONTEXT);
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with component library', () => {
      const files = factory.generateComponent('react', 'Button', {}, DEFAULT_DESIGN_CONTEXT, 'shadcn');
      expect(files.length).toBeGreaterThan(0);
    });

    it('uses default context when none provided', () => {
      const files = factory.generateComponent('react', 'Card', {});
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('getSupportedFrameworks', () => {
    it('returns all supported frameworks', () => {
      const frameworks = factory.getSupportedFrameworks();
      expect(frameworks.length).toBeGreaterThan(0);
      expect(frameworks).toContain('react');
      expect(frameworks).toContain('vue');
      expect(frameworks).toContain('svelte');
    });

    it('includes all registered frameworks', () => {
      const frameworks = factory.getSupportedFrameworks();
      expect(frameworks).toContain('react');
      expect(frameworks).toContain('vue');
      expect(frameworks).toContain('svelte');
      expect(frameworks).toContain('angular');
      expect(frameworks).toContain('html');
      expect(frameworks).toContain('nextjs');
    });
  });

  describe('isFrameworkSupported', () => {
    it('returns true for supported frameworks', () => {
      expect(factory.isFrameworkSupported('react')).toBe(true);
      expect(factory.isFrameworkSupported('vue')).toBe(true);
      expect(factory.isFrameworkSupported('svelte')).toBe(true);
    });

    it('returns false for unsupported frameworks', () => {
      expect(factory.isFrameworkSupported('invalid')).toBe(false);
      expect(factory.isFrameworkSupported('ember')).toBe(false);
    });
  });

  describe('getGeneratorInfo', () => {
    it('returns generator information', () => {
      const info = factory.getGeneratorInfo();
      expect(info.length).toBeGreaterThan(0);
      expect(info[0]).toHaveProperty('framework');
      expect(info[0]).toHaveProperty('className');
      expect(info[0]).toHaveProperty('isInstantiated');
    });

    it('shows instantiation status', () => {
      factory.clearInstances();
      const infoBefore = factory.getGeneratorInfo();
      const reactInfoBefore = infoBefore.find((i) => i.framework === 'react');
      expect(reactInfoBefore?.isInstantiated).toBe(false);

      factory.createGenerator('react');
      const infoAfter = factory.getGeneratorInfo();
      const reactInfoAfter = infoAfter.find((i) => i.framework === 'react');
      expect(reactInfoAfter?.isInstantiated).toBe(true);
    });
  });

  describe('clearInstances', () => {
    it('clears all cached instances', () => {
      factory.createGenerator('react');
      factory.createGenerator('vue');

      factory.clearInstances();

      const info = factory.getGeneratorInfo();
      const allNotInstantiated = info.every((i) => !i.isInstantiated);
      expect(allNotInstantiated).toBe(true);
    });

    it('forces new instance creation after clear', () => {
      const gen1 = factory.createGenerator('react');
      factory.clearInstances();
      const gen2 = factory.createGenerator('react');
      expect(gen1).not.toBe(gen2);
    });
  });

  describe('clearInstance', () => {
    it('clears instance for specific framework', () => {
      factory.createGenerator('react');
      factory.createGenerator('vue');

      factory.clearInstance('react');

      const info = factory.getGeneratorInfo();
      const reactInfo = info.find((i) => i.framework === 'react');
      const vueInfo = info.find((i) => i.framework === 'vue');

      expect(reactInfo?.isInstantiated).toBe(false);
      expect(vueInfo?.isInstantiated).toBe(true);
    });
  });

  describe('registerGenerator', () => {
    it('registers custom generator', () => {
      class CustomGenerator extends ReactGenerator {}

      factory.registerGenerator('react', CustomGenerator);
      const generator = factory.createGenerator('react');

      expect(generator).toBeInstanceOf(CustomGenerator);
    });

    it('clears existing instance when re-registering', () => {
      const gen1 = factory.createGenerator('react');

      class NewReactGenerator extends ReactGenerator {}
      factory.registerGenerator('react', NewReactGenerator);

      const gen2 = factory.createGenerator('react');
      expect(gen1).not.toBe(gen2);
    });
  });

  describe('unregisterGenerator', () => {
    afterEach(() => {
      factory.registerGenerator('react', ReactGenerator);
    });

    it('removes generator registration', () => {
      factory.unregisterGenerator('react');
      expect(() => factory.createGenerator('react')).toThrow();
    });

    it('clears associated instance', () => {
      factory.createGenerator('react');
      factory.unregisterGenerator('react');

      expect(() => factory.createGenerator('react')).toThrow();
    });
  });

  describe('convenience functions', () => {
    describe('createGenerator', () => {
      it('creates generator using factory', () => {
        const generator = createGenerator('react');
        expect(generator).toBeInstanceOf(ReactGenerator);
      });
    });

    describe('generateProject', () => {
      it('generates project using factory', () => {
        const files = generateProject('react', 'test-app', 'flat', 'none');
        expect(files.length).toBeGreaterThan(0);
      });

      it('passes design context correctly', () => {
        const files = generateProject('react', 'test-app', 'flat', 'none', DEFAULT_DESIGN_CONTEXT);
        expect(files.length).toBeGreaterThan(0);
      });
    });

    describe('generateComponent', () => {
      it('generates component using factory', () => {
        const files = generateComponent('react', 'Button', {});
        expect(files.length).toBeGreaterThan(0);
      });

      it('passes all parameters correctly', () => {
        const files = generateComponent('react', 'Button', { label: 'string' }, DEFAULT_DESIGN_CONTEXT, 'shadcn');
        expect(files.length).toBeGreaterThan(0);
      });
    });
  });

  describe('multiple framework support', () => {
    it('can generate for multiple frameworks in sequence', () => {
      const reactFiles = factory.generateComponent('react', 'Button', {});
      const vueFiles = factory.generateComponent('vue', 'Button', {});
      const svelteFiles = factory.generateComponent('svelte', 'Button', {});

      expect(reactFiles.length).toBeGreaterThan(0);
      expect(vueFiles.length).toBeGreaterThan(0);
      expect(svelteFiles.length).toBeGreaterThan(0);
    });

    it('maintains separate instances per framework', () => {
      const reactGen1 = factory.createGenerator('react');
      const vueGen = factory.createGenerator('vue');
      const reactGen2 = factory.createGenerator('react');

      expect(reactGen1).toBe(reactGen2);
      expect(reactGen1).not.toBe(vueGen);
    });
  });
});
