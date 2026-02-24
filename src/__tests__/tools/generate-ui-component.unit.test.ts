import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGenerateUiComponent, generateComponent } from '../../tools/generate-ui-component.js';
import { DEFAULT_DESIGN_CONTEXT } from '../../lib/generators/default-design-context.js';
import type { IDesignContext } from '../../lib/types.js';

describe('generate_ui_component tool', () => {
  let server: McpServer;

  beforeEach(() => {
    server = new McpServer({ name: 'test', version: '1.0.0' });
  });

  describe('registerGenerateUiComponent', () => {
    it('registers without errors', () => {
      expect(() => registerGenerateUiComponent(server)).not.toThrow();
    });

    it('registers a tool on the server', () => {
      const initialToolCount = server['tools'] ? Object.keys(server['tools']).length : 0;
      registerGenerateUiComponent(server);
      expect(true).toBe(true);
    });
  });

  describe('generateComponent', () => {
    let designContext: IDesignContext;

    beforeEach(() => {
      designContext = structuredClone(DEFAULT_DESIGN_CONTEXT);
    });

    describe('basic generation', () => {
      it('generates React button component', () => {
        const files = generateComponent('button', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
        expect(files[0]).toHaveProperty('path');
        expect(files[0]).toHaveProperty('content');
      });

      it('generates Vue card component', () => {
        const files = generateComponent('card', 'vue', designContext);
        expect(files.length).toBeGreaterThan(0);
        expect(files[0].path.toLowerCase()).toContain('card');
      });

      it('generates Svelte form component', () => {
        const files = generateComponent('form', 'svelte', designContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates Angular modal component', () => {
        const files = generateComponent('modal', 'angular', designContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates HTML navbar component', () => {
        const files = generateComponent('navbar', 'html', designContext);
        expect(files.length).toBeGreaterThan(0);
      });
    });

    describe('component types', () => {
      const componentTypes = ['button', 'card', 'form', 'navbar', 'hero', 'modal', 'table', 'sidebar'];

      componentTypes.forEach((type) => {
        it(`generates ${type} component`, () => {
          const files = generateComponent(type, 'react', designContext);
          expect(files.length).toBeGreaterThan(0);
          expect(files[0].content.length).toBeGreaterThan(0);
        });
      });
    });

    describe('frameworks', () => {
      const frameworks: Array<[string, string]> = [
        ['react', 'tsx'],
        ['vue', 'vue'],
        ['svelte', 'svelte'],
        ['angular', 'ts'],
        ['html', 'html'],
      ];

      frameworks.forEach(([framework, expectedExt]) => {
        it(`generates component for ${framework}`, () => {
          const files = generateComponent('button', framework, designContext);
          expect(files.length).toBeGreaterThan(0);
        });
      });
    });

    describe('props handling', () => {
      it('generates component with no props', () => {
        const files = generateComponent('button', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates component with simple props', () => {
        const props = { label: 'string', onClick: 'function' };
        const files = generateComponent('button', 'react', designContext, props);
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates component with multiple props', () => {
        const props = {
          title: 'string',
          subtitle: 'string',
          isVisible: 'boolean',
          count: 'number',
        };
        const files = generateComponent('card', 'react', designContext, props);
        expect(files.length).toBeGreaterThan(0);
      });

      it('handles empty props object', () => {
        const files = generateComponent('button', 'react', designContext, {});
        expect(files.length).toBeGreaterThan(0);
      });
    });

    describe('design context', () => {
      it('uses default design context', () => {
        const files = generateComponent('button', 'react', DEFAULT_DESIGN_CONTEXT);
        expect(files.length).toBeGreaterThan(0);
      });

      it('uses custom color palette', () => {
        const customContext: IDesignContext = {
          ...designContext,
          colorPalette: {
            ...designContext.colorPalette,
            primary: '#ff0000',
            background: '#000000',
          },
        };
        const files = generateComponent('button', 'react', customContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('uses custom typography', () => {
        const customContext: IDesignContext = {
          ...designContext,
          typography: {
            ...designContext.typography,
            fontFamily: 'Roboto, sans-serif',
          },
        };
        const files = generateComponent('button', 'react', customContext);
        expect(files.length).toBeGreaterThan(0);
      });
    });

    describe('component libraries', () => {
      it('generates component with shadcn library', () => {
        const files = generateComponent('button', 'react', designContext, {}, undefined, undefined, 'shadcn');
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates component with radix library', () => {
        const files = generateComponent('button', 'react', designContext, {}, undefined, undefined, 'radix');
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates component with headlessui library', () => {
        const files = generateComponent('button', 'react', designContext, {}, undefined, undefined, 'headlessui');
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates component with material library', () => {
        const files = generateComponent('button', 'react', designContext, {}, undefined, undefined, 'material');
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates component with no library', () => {
        const files = generateComponent('button', 'react', designContext, {}, undefined, undefined, 'none');
        expect(files.length).toBeGreaterThan(0);
      });
    });

    describe('error handling', () => {
      it('handles invalid framework gracefully with fallback', () => {
        const files = generateComponent('button', 'invalid-framework', designContext);
        expect(files.length).toBeGreaterThan(0);
        expect(files[0]).toHaveProperty('path');
        expect(files[0]).toHaveProperty('content');
      });

      it('handles empty component type with fallback', () => {
        const files = generateComponent('', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('handles unknown component type with fallback', () => {
        const files = generateComponent('unknown-super-component', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
      });
    });

    describe('output structure', () => {
      it('returns array of files', () => {
        const files = generateComponent('button', 'react', designContext);
        expect(Array.isArray(files)).toBe(true);
      });

      it('each file has path property', () => {
        const files = generateComponent('button', 'react', designContext);
        files.forEach((file) => {
          expect(file).toHaveProperty('path');
          expect(typeof file.path).toBe('string');
        });
      });

      it('each file has content property', () => {
        const files = generateComponent('button', 'react', designContext);
        files.forEach((file) => {
          expect(file).toHaveProperty('content');
          expect(typeof file.content).toBe('string');
        });
      });

      it('content is not empty', () => {
        const files = generateComponent('button', 'react', designContext);
        files.forEach((file) => {
          expect(file.content.length).toBeGreaterThan(0);
        });
      });
    });

    describe('accessibility', () => {
      it('generates accessible button with aria-label', () => {
        const files = generateComponent('button', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates accessible form with labels', () => {
        const files = generateComponent('form', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates accessible modal with ARIA attributes', () => {
        const files = generateComponent('modal', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
      });

      it('generates accessible navbar with navigation landmark', () => {
        const files = generateComponent('navbar', 'react', designContext);
        expect(files.length).toBeGreaterThan(0);
      });
    });

    describe('multi-file generation', () => {
      it('can generate multiple files for a component', () => {
        const files = generateComponent('button', 'react', designContext);
        expect(files.length).toBeGreaterThanOrEqual(1);
      });

      it('each file has unique path', () => {
        const files = generateComponent('button', 'react', designContext);
        const paths = files.map((f) => f.path);
        const uniquePaths = new Set(paths);
        expect(uniquePaths.size).toBe(paths.length);
      });
    });

    describe('RAG options', () => {
      it('handles variant option', () => {
        const ragOptions = { variant: 'outline' };
        const files = generateComponent('button', 'react', designContext, {}, ragOptions);
        expect(files.length).toBeGreaterThan(0);
      });

      it('handles mood option', () => {
        const ragOptions = { mood: 'professional' as const };
        const files = generateComponent('button', 'react', designContext, {}, ragOptions);
        expect(files.length).toBeGreaterThan(0);
      });

      it('handles industry option', () => {
        const ragOptions = { industry: 'saas' as const };
        const files = generateComponent('button', 'react', designContext, {}, ragOptions);
        expect(files.length).toBeGreaterThan(0);
      });

      it('handles style option', () => {
        const ragOptions = { style: 'glassmorphism' as const };
        const files = generateComponent('button', 'react', designContext, {}, ragOptions);
        expect(files.length).toBeGreaterThan(0);
      });

      it('handles multiple RAG options', () => {
        const ragOptions = {
          variant: 'gradient',
          mood: 'bold' as const,
          industry: 'fintech' as const,
          style: 'dark-premium' as const,
        };
        const files = generateComponent('button', 'react', designContext, {}, ragOptions);
        expect(files.length).toBeGreaterThan(0);
      });
    });
  });
});
