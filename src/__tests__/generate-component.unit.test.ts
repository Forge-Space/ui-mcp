import { designContextStore } from '@forgespace/siza-gen';
import { auditStyles } from '../lib/style-audit.js';

describe('generate_ui_component', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  describe('design context integration', () => {
    it('starts with default design context', () => {
      const ctx = designContextStore.get();
      expect(ctx.colorPalette.primary).toMatch(/^#[0-9a-f]{6}$/i);
      expect(ctx.typography.fontFamily).toBe('Inter');
      expect(ctx.typography.headingFont).toBe('Manrope');
    });

    it('updates context via style audit', () => {
      const tailwindConfig = `
        module.exports = {
          theme: {
            extend: {
              colors: {
                primary: '#ff6600',
                secondary: '#333333',
              }
            }
          }
        }
      `;

      const result = auditStyles(tailwindConfig);
      designContextStore.update(result.context);
      const ctx = designContextStore.get();

      expect(ctx.colorPalette.primary).toBe('#ff6600');
      expect(ctx.colorPalette.secondary).toBe('#333333');
    });

    it('updates context via CSS variables', () => {
      const css = `
        :root {
          --primary: #e11d48;
          --background: #fafafa;
          --foreground: #111827;
        }
      `;

      const result = auditStyles(undefined, css);
      designContextStore.update(result.context);
      const ctx = designContextStore.get();

      expect(ctx.colorPalette.primary).toBe('#e11d48');
      expect(ctx.colorPalette.background).toBe('#fafafa');
      expect(ctx.colorPalette.foreground).toBe('#111827');
    });

    it('merges tailwind and CSS variable contexts', () => {
      const tw = `
        module.exports = {
          theme: {
            extend: {
              colors: { primary: '#3b82f6' }
            }
          }
        }
      `;
      const css = `
        :root {
          --accent-color: #f97316;
        }
      `;

      const result = auditStyles(tw, css);
      // CSS overrides TW when both produce a colorPalette — CSS accent-color maps to accentColor
      expect(result.context.colorPalette).toBeDefined();
      // The merged result should have the TW primary preserved via the CSS merge
      expect(result.context.colorPalette?.primary).toBe('#3b82f6');
    });

    // Edge cases for design context
    it('handles invalid CSS gracefully', () => {
      const invalidCss = `
        :root {
          --primary: invalid-color;
        }
      `;

      expect(() => {
        const result = auditStyles(undefined, invalidCss);
        designContextStore.update(result.context);
      }).not.toThrow();
    });

    it('handles malformed tailwind config', () => {
      const malformedConfig = `
        module.exports = {
          theme: {
            extend: {
              colors: {
                primary: 'not-a-color'
              }
            }
          }
        }
      `;

      expect(() => {
        const result = auditStyles(malformedConfig);
        designContextStore.update(result.context);
      }).not.toThrow();
    });

    it('preserves context when audit fails', () => {
      const originalCtx = designContextStore.get();

      expect(() => {
        const result = auditStyles('invalid config', 'invalid css');
        if (result.context) {
          designContextStore.update(result.context);
        }
      }).not.toThrow();

      // Context should remain valid even if audit fails
      const currentCtx = designContextStore.get();
      expect(currentCtx.colorPalette.primary).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});
