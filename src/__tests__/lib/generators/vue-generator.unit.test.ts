import { VueGenerator } from '../../../lib/generators/vue-generator.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../../lib/generators/default-design-context.js';
import type { IDesignContext } from '../../../lib/types.js';

describe('VueGenerator', () => {
  let generator: VueGenerator;
  let designContext: IDesignContext;

  beforeEach(() => {
    generator = new VueGenerator('vue');
    designContext = structuredClone(DEFAULT_DESIGN_CONTEXT);
  });

  describe('constructor', () => {
    it('creates a Vue generator instance', () => {
      expect(generator).toBeInstanceOf(VueGenerator);
      expect(generator.getFramework()).toBe('vue');
    });
  });

  describe('generateProject', () => {
    it('generates basic Vue project structure', () => {
      const files = generator.generateProject('vue-app', 'flat', 'none', designContext);
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].path).toContain('README');
    });

    it('includes project name in README', () => {
      const files = generator.generateProject('my-vue-app', 'flat', 'none', designContext);
      const readme = files.find((f) => f.path.includes('README'));
      expect(readme?.content).toContain('my-vue-app');
    });
  });

  describe('generateComponent', () => {
    it('generates Vue button component', () => {
      const files = generator.generateComponent('Button', {}, designContext);
      expect(files.length).toBeGreaterThan(0);
      const componentFile = files.find((f) => f.path.includes('Button'));
      expect(componentFile).toBeDefined();
    });

    it('generates component with props', () => {
      const props = { label: 'string', onClick: 'function' };
      const files = generator.generateComponent('CustomButton', props, designContext);
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates test file', () => {
      const files = generator.generateComponent('Button', {}, designContext);
      const testFile = files.find((f) => f.path.includes('test') || f.path.includes('spec'));
      expect(testFile).toBeDefined();
    });

    it('generates component with shadcn library', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'shadcn');
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with radix library', () => {
      const files = generator.generateComponent('Dialog', {}, designContext, 'radix');
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with headlessui library', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'headlessui');
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with primevue library', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'primevue');
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('component library dependencies', () => {
    it('returns shadcn dependencies', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'shadcn');
      expect(files.length).toBeGreaterThan(0);
    });

    it('returns radix dependencies', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'radix');
      expect(files.length).toBeGreaterThan(0);
    });

    it('returns headlessui dependencies', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'headlessui');
      expect(files.length).toBeGreaterThan(0);
    });

    it('returns primevue dependencies', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'primevue');
      expect(files.length).toBeGreaterThan(0);
    });
  });
});
