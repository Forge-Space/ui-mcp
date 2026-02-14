import { describe, it, expect, beforeEach } from 'vitest';
import { designContextStore } from '../lib/design-context.js';
import { auditStyles } from '../lib/style-audit.js';

describe('generate_ui_component', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  describe('design context integration', () => {
    it('starts with default design context', () => {
      const ctx = designContextStore.get();
      expect(ctx.colorPalette.primary).toBe('#2563eb');
      expect(ctx.typography.fontFamily).toContain('Inter');
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
  });

  describe('context store operations', () => {
    it('set replaces entire context', () => {
      const ctx = designContextStore.get();
      ctx.colorPalette.primary = '#000000';
      designContextStore.set(ctx);
      expect(designContextStore.get().colorPalette.primary).toBe('#000000');
    });

    it('update merges partial context', () => {
      designContextStore.update({
        colorPalette: {
          ...designContextStore.get().colorPalette,
          primary: '#111111',
        },
      });
      expect(designContextStore.get().colorPalette.primary).toBe('#111111');
      // Other fields preserved
      expect(designContextStore.get().typography.fontFamily).toContain('Inter');
    });

    it('reset restores defaults', () => {
      designContextStore.update({
        colorPalette: {
          ...designContextStore.get().colorPalette,
          primary: '#999999',
        },
      });
      designContextStore.reset();
      expect(designContextStore.get().colorPalette.primary).toBe('#2563eb');
    });

    it('get returns a clone (not a reference)', () => {
      const ctx1 = designContextStore.get();
      ctx1.colorPalette.primary = '#aabbcc';
      const ctx2 = designContextStore.get();
      expect(ctx2.colorPalette.primary).not.toBe('#aabbcc');
    });
  });
});
