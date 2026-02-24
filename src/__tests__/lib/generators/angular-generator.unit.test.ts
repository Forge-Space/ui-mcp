import { AngularGenerator } from '../../../lib/generators/angular-generator.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../../lib/generators/default-design-context.js';
import type { IDesignContext } from '../../../lib/types.js';

describe('AngularGenerator', () => {
  let generator: AngularGenerator;
  let designContext: IDesignContext;

  beforeEach(() => {
    generator = new AngularGenerator('angular');
    designContext = structuredClone(DEFAULT_DESIGN_CONTEXT);
  });

  describe('constructor', () => {
    it('creates an Angular generator instance', () => {
      expect(generator).toBeInstanceOf(AngularGenerator);
      expect(generator.getFramework()).toBe('angular');
    });
  });

  describe('generateProject', () => {
    it('generates basic Angular project structure', () => {
      const files = generator.generateProject('angular-app', 'flat', 'none', designContext);
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('generateComponent', () => {
    it('generates Angular button component', () => {
      const files = generator.generateComponent('Button', {}, designContext);
      expect(files.length).toBeGreaterThan(0);
    });

    it('generates component with props', () => {
      const props = { label: 'string' };
      const files = generator.generateComponent('CustomButton', props, designContext);
      expect(files.length).toBeGreaterThan(0);
    });
  });
});
