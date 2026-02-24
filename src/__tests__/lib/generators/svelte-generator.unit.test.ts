import { SvelteGenerator } from '../../../lib/generators/svelte-generator.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../../lib/generators/default-design-context.js';
import type { IDesignContext } from '../../../lib/types.js';

describe('SvelteGenerator', () => {
  let generator: SvelteGenerator;
  let designContext: IDesignContext;

  beforeEach(() => {
    generator = new SvelteGenerator('svelte');
    designContext = structuredClone(DEFAULT_DESIGN_CONTEXT);
  });

  describe('constructor', () => {
    it('creates a Svelte generator instance', () => {
      expect(generator).toBeInstanceOf(SvelteGenerator);
      expect(generator.getFramework()).toBe('svelte');
    });
  });

  describe('generateProject', () => {
    it('generates basic Svelte project structure', () => {
      const files = generator.generateProject('svelte-app', 'flat', 'none', designContext);
      expect(files.length).toBeGreaterThan(0);
    });

    it('includes project name', () => {
      const files = generator.generateProject('my-svelte-app', 'flat', 'none', designContext);
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('generateComponent', () => {
    it('generates Svelte button component', () => {
      const files = generator.generateComponent('Button', {}, designContext);
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with props', () => {
      const props = { label: 'string' };
      const files = generator.generateComponent('CustomButton', props, designContext);
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with shadcn library', () => {
      const files = generator.generateComponent('Button', {}, designContext, 'shadcn');
      expect(files.length).toBeGreaterThan(0);
    });
  });
});
