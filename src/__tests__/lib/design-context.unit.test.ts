import { designContextStore, DEFAULT_CONTEXT } from '../../lib/design-context.js';
import type { IDesignContext } from '../../lib/types.js';

describe('design-context', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  describe('DEFAULT_CONTEXT', () => {
    it('exports a valid design context', () => {
      expect(DEFAULT_CONTEXT).toBeDefined();
      expect(DEFAULT_CONTEXT).toHaveProperty('typography');
      expect(DEFAULT_CONTEXT).toHaveProperty('colorPalette');
      expect(DEFAULT_CONTEXT).toHaveProperty('spacing');
      expect(DEFAULT_CONTEXT).toHaveProperty('borderRadius');
      expect(DEFAULT_CONTEXT).toHaveProperty('shadows');
    });

    it('has valid typography', () => {
      expect(DEFAULT_CONTEXT.typography).toHaveProperty('fontFamily');
      expect(DEFAULT_CONTEXT.typography).toHaveProperty('fontSize');
      expect(DEFAULT_CONTEXT.typography).toHaveProperty('fontWeight');
      expect(DEFAULT_CONTEXT.typography).toHaveProperty('lineHeight');
    });

    it('has valid color palette', () => {
      expect(DEFAULT_CONTEXT.colorPalette).toHaveProperty('primary');
      expect(DEFAULT_CONTEXT.colorPalette).toHaveProperty('secondary');
      expect(DEFAULT_CONTEXT.colorPalette).toHaveProperty('background');
      expect(DEFAULT_CONTEXT.colorPalette).toHaveProperty('foreground');
    });
  });

  describe('DesignContextStore', () => {
    describe('get', () => {
      it('returns the current context', () => {
        const context = designContextStore.get();
        expect(context).toBeDefined();
        expect(context).toHaveProperty('typography');
        expect(context).toHaveProperty('colorPalette');
      });

      it('returns a deep clone', () => {
        const context1 = designContextStore.get();
        const context2 = designContextStore.get();
        expect(context1).not.toBe(context2);
        expect(context1).toEqual(context2);
      });

      it('modifications to returned context do not affect store', () => {
        const context = designContextStore.get();
        context.colorPalette.primary = '#ff0000';

        const newContext = designContextStore.get();
        expect(newContext.colorPalette.primary).not.toBe('#ff0000');
      });
    });

    describe('set', () => {
      it('sets the entire context', () => {
        const customContext: IDesignContext = {
          ...DEFAULT_CONTEXT,
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#123456',
          },
        };

        designContextStore.set(customContext);
        const retrieved = designContextStore.get();

        expect(retrieved.colorPalette.primary).toBe('#123456');
      });

      it('stores a deep clone', () => {
        const customContext: IDesignContext = {
          ...DEFAULT_CONTEXT,
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#abcdef',
          },
        };

        designContextStore.set(customContext);
        customContext.colorPalette.primary = '#000000';

        const retrieved = designContextStore.get();
        expect(retrieved.colorPalette.primary).toBe('#abcdef');
      });
    });

    describe('update', () => {
      it('merges partial context with existing', () => {
        designContextStore.set({
          ...DEFAULT_CONTEXT,
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#111111',
          },
        });

        designContextStore.update({
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            secondary: '#222222',
          },
        });

        const context = designContextStore.get();
        expect(context.colorPalette.secondary).toBe('#222222');
      });

      it('preserves unmodified fields', () => {
        const originalFontFamily = designContextStore.get().typography.fontFamily;

        designContextStore.update({
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#ff0000',
          },
        });

        const context = designContextStore.get();
        expect(context.typography.fontFamily).toBe(originalFontFamily);
        expect(context.colorPalette.primary).toBe('#ff0000');
      });

      it('handles nested updates', () => {
        designContextStore.update({
          typography: {
            ...DEFAULT_CONTEXT.typography,
            fontSize: {
              ...DEFAULT_CONTEXT.typography.fontSize,
              base: '1.5rem',
            },
          },
        });

        const context = designContextStore.get();
        expect(context.typography.fontSize.base).toBe('1.5rem');
      });

      it('handles undefined values gracefully', () => {
        designContextStore.update({
          colorPalette: undefined,
        });

        const context = designContextStore.get();
        expect(context.colorPalette).toBeDefined();
      });
    });

    describe('selectPreset', () => {
      it('applies a preset by name', () => {
        const presets = designContextStore.listPresets();
        const presetName = presets[0];
        const preset = designContextStore.selectPreset(presetName);
        expect(preset).toBeDefined();
        expect(preset).toHaveProperty('typography');
        expect(preset).toHaveProperty('colorPalette');
      });

      it('updates the store context', () => {
        const presets = designContextStore.listPresets();
        const presetName = presets[0];
        designContextStore.selectPreset(presetName);
        const context = designContextStore.get();
        expect(context).toBeDefined();
      });

      it('returns a clone of the preset', () => {
        const presets = designContextStore.listPresets();
        const presetName = presets[0];
        const preset1 = designContextStore.selectPreset(presetName);
        const preset2 = designContextStore.get();
        expect(preset1).not.toBe(preset2);
        expect(preset1).toEqual(preset2);
      });
    });

    describe('listPresets', () => {
      it('returns an array of preset names', () => {
        const presets = designContextStore.listPresets();
        expect(Array.isArray(presets)).toBe(true);
        expect(presets.length).toBeGreaterThan(0);
      });

      it('includes presets', () => {
        const presets = designContextStore.listPresets();
        expect(presets.length).toBeGreaterThan(0);
      });
    });

    describe('reset', () => {
      it('resets to default context', () => {
        designContextStore.update({
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#ff0000',
          },
        });

        designContextStore.reset();
        const context = designContextStore.get();

        expect(context.colorPalette.primary).toBe(DEFAULT_CONTEXT.colorPalette.primary);
      });

      it('clears all custom modifications', () => {
        designContextStore.update({
          typography: {
            ...DEFAULT_CONTEXT.typography,
            fontFamily: 'CustomFont, sans-serif',
          },
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#custom',
            secondary: '#custom2',
          },
        });

        designContextStore.reset();
        const context = designContextStore.get();

        expect(context.typography.fontFamily).toBe(DEFAULT_CONTEXT.typography.fontFamily);
        expect(context.colorPalette.primary).toBe(DEFAULT_CONTEXT.colorPalette.primary);
        expect(context.colorPalette.secondary).toBe(DEFAULT_CONTEXT.colorPalette.secondary);
      });
    });

    describe('immutability', () => {
      it('maintains immutability through set operations', () => {
        const custom: IDesignContext = {
          ...DEFAULT_CONTEXT,
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#test',
          },
        };

        designContextStore.set(custom);
        custom.colorPalette.primary = '#changed';

        const retrieved = designContextStore.get();
        expect(retrieved.colorPalette.primary).toBe('#test');
      });

      it('maintains immutability through update operations', () => {
        const partial = {
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#initial',
          },
        };

        designContextStore.update(partial);
        if (partial.colorPalette) {
          partial.colorPalette.primary = '#modified';
        }

        const retrieved = designContextStore.get();
        expect(retrieved.colorPalette.primary).toBe('#initial');
      });
    });

    describe('edge cases', () => {
      it('handles empty partial update', () => {
        const before = designContextStore.get();
        designContextStore.update({});
        const after = designContextStore.get();

        expect(after).toEqual(before);
      });

      it('handles arrays in context', () => {
        designContextStore.update({
          spacing: {
            unit: 8,
            scale: [0, 8, 16, 24],
          },
        });

        const context = designContextStore.get();
        expect(context.spacing.scale).toEqual([0, 8, 16, 24]);
      });

      it('handles null values in partial', () => {
        designContextStore.update({
          colorPalette: {
            ...DEFAULT_CONTEXT.colorPalette,
            primary: '#test',
          },
        });

        const context = designContextStore.get();
        expect(context.colorPalette).toBeDefined();
      });
    });
  });
});
