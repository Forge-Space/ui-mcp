import { HtmlGenerator } from '../../../lib/generators/html-generator.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../../lib/generators/default-design-context.js';
import type { IDesignContext } from '../../../lib/types.js';

describe('HtmlGenerator', () => {
  let generator: HtmlGenerator;
  let designContext: IDesignContext;

  beforeEach(() => {
    generator = new HtmlGenerator('html');
    designContext = structuredClone(DEFAULT_DESIGN_CONTEXT);
  });

  describe('constructor', () => {
    it('creates an HTML generator instance', () => {
      expect(generator).toBeInstanceOf(HtmlGenerator);
      expect(generator.getFramework()).toBe('html');
    });
  });

  describe('generateProject', () => {
    it('generates basic HTML project structure', () => {
      const files = generator.generateProject('html-app', 'flat', 'none', designContext);
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe('generateComponent', () => {
    it('generates HTML button component', () => {
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
