import { loadConfig } from '../lib/config.js';
import { designContextStore, DEFAULT_CONTEXT } from '../lib/design-context.js';
import {
  resolveColorSystemHsl,
  generateCssVariableBlock,
  generateFontImportHtml,
} from '../lib/templates/css-variables.js';
import { getPreset } from '../lib/design-references/index.js';
import type { IFigmaDesignToken } from '../lib/types.js';

let mapTokensToTailwind: typeof import('../lib/tailwind-mapper.js').mapTokensToTailwind;

beforeAll(async () => {
  loadConfig();
  const mod = await import('../lib/tailwind-mapper.js');
  mapTokensToTailwind = mod.mapTokensToTailwind;
});

// ── Design Context Store ────────────────────────────────────
describe('DesignContextStore', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  it('get() returns a clone, not the internal reference', () => {
    const a = designContextStore.get();
    const b = designContextStore.get();
    expect(a).toEqual(b);
    expect(a).not.toBe(b);
  });

  it('DEFAULT_CONTEXT is preset-driven and has valid hex colors', () => {
    const hexRe = /^#[0-9a-f]{6}$/i;
    expect(DEFAULT_CONTEXT.colorPalette.primary).toMatch(hexRe);
    expect(DEFAULT_CONTEXT.colorPalette.background).toMatch(hexRe);
    expect(DEFAULT_CONTEXT.typography.fontFamily).toBeTruthy();
  });

  it('update() deep-merges nested objects', () => {
    const original = designContextStore.get();
    designContextStore.update({ colorPalette: { ...original.colorPalette, primary: '#ff0000' } });
    const updated = designContextStore.get();
    expect(updated.colorPalette.primary).toBe('#ff0000');
    // Other color fields should be preserved
    expect(updated.colorPalette.background).toBe(original.colorPalette.background);
    expect(updated.colorPalette.foreground).toBe(original.colorPalette.foreground);
  });

  it('update() preserves non-updated top-level keys', () => {
    const original = designContextStore.get();
    designContextStore.update({ iconSet: 'heroicons' });
    const updated = designContextStore.get();
    expect(updated.iconSet).toBe('heroicons');
    expect(updated.typography).toEqual(original.typography);
    expect(updated.colorPalette).toEqual(original.colorPalette);
  });

  it('set() replaces entire context', () => {
    const preset = getPreset('ocean-manrope');
    designContextStore.set(preset);
    const ctx = designContextStore.get();
    expect(ctx.colorPalette.primary).toBe(preset.colorPalette.primary);
  });

  it('selectPreset() switches to a named preset', () => {
    const ctx = designContextStore.selectPreset('emerald-dmsans');
    expect(ctx.colorPalette.primary).toBe(getPreset('emerald-dmsans').colorPalette.primary);
  });

  it('listPresets() returns available preset names', () => {
    const presets = designContextStore.listPresets();
    expect(presets.length).toBeGreaterThan(5);
    expect(presets).toContain('zinc-manrope');
  });

  it('reset() restores to default preset', () => {
    designContextStore.update({ iconSet: 'heroicons' });
    designContextStore.reset();
    const ctx = designContextStore.get();
    expect(ctx.iconSet).toBe(DEFAULT_CONTEXT.iconSet);
  });
});

// ── CSS Variables Generator ─────────────────────────────────
describe('css-variables', () => {
  it('resolveColorSystemHsl returns HSL strings for all color keys', () => {
    const ctx = getPreset();
    const vars = resolveColorSystemHsl(ctx);
    expect(vars.light['--primary']).toBeDefined();
    expect(vars.light['--background']).toBeDefined();
    expect(vars.light['--foreground']).toBeDefined();
    expect(vars.light['--destructive']).toBeDefined();
    // HSL format: "H S% L%"
    for (const val of Object.values(vars.light)) {
      expect(val).toMatch(/^\d+\s+\d+%\s+\d+%$/);
    }
    expect(vars.radius).toBeTruthy();
  });

  it('generateCssVariableBlock produces valid Tailwind CSS', () => {
    const ctx = getPreset();
    const block = generateCssVariableBlock(ctx);
    expect(block).toContain('@tailwind base;');
    expect(block).toContain('@tailwind components;');
    expect(block).toContain('@tailwind utilities;');
    expect(block).toContain(':root {');
    expect(block).toContain('--primary:');
    expect(block).toContain('--background:');
    expect(block).toContain('--radius:');
    expect(block).toContain('bg-background');
    expect(block).toContain('text-foreground');
  });

  it('generateCssVariableBlock changes with different presets', () => {
    const zinc = generateCssVariableBlock(getPreset('zinc-manrope'));
    const ocean = generateCssVariableBlock(getPreset('ocean-manrope'));
    // Primary colors differ between zinc and ocean
    expect(zinc).not.toBe(ocean);
  });

  it('generateFontImportHtml includes body font', () => {
    const ctx = getPreset('zinc-manrope');
    const html = generateFontImportHtml(ctx);
    expect(html).toContain('fonts.googleapis.com');
    expect(html).toContain('preconnect');
    expect(html).toContain('Inter');
  });

  it('generateFontImportHtml includes heading font when different from body', () => {
    const ctx = getPreset('zinc-manrope');
    const html = generateFontImportHtml(ctx);
    // Manrope is heading, Inter is body — both should appear
    expect(html).toContain('Manrope');
    expect(html).toContain('Inter');
  });

  it('generateFontImportHtml deduplicates when heading equals body', () => {
    const ctx = getPreset('zinc-inter');
    const html = generateFontImportHtml(ctx);
    // Only one family= param since heading and body are both Inter
    const familyCount = (html.match(/family=/g) || []).length;
    expect(familyCount).toBe(1);
  });
});

// ── Semantic Tailwind Mapper ────────────────────────────────
describe('semantic tailwind-mapper', () => {
  it('maps spacing 16px to p-4 (not p-[16px])', () => {
    const tokens: IFigmaDesignToken[] = [{ name: 'space', type: 'number', value: 16, category: 'spacing' }];
    const result = mapTokensToTailwind(tokens);
    const padding = result.find((m) => m.cssProperty === 'padding');
    expect(padding?.className).toBe('p-4');
  });

  it('maps spacing 8px to p-2', () => {
    const tokens: IFigmaDesignToken[] = [{ name: 'space', type: 'number', value: 8, category: 'spacing' }];
    const result = mapTokensToTailwind(tokens);
    const padding = result.find((m) => m.cssProperty === 'padding');
    expect(padding?.className).toBe('p-2');
  });

  it('maps spacing 24px to p-6', () => {
    const tokens: IFigmaDesignToken[] = [{ name: 'space', type: 'number', value: 24, category: 'spacing' }];
    const result = mapTokensToTailwind(tokens);
    const padding = result.find((m) => m.cssProperty === 'padding');
    expect(padding?.className).toBe('p-6');
  });

  it('falls back to arbitrary value for non-standard spacing', () => {
    const tokens: IFigmaDesignToken[] = [{ name: 'space', type: 'number', value: 100, category: 'spacing' }];
    const result = mapTokensToTailwind(tokens);
    const padding = result.find((m) => m.cssProperty === 'padding');
    expect(padding?.className).toBe('p-[100px]');
  });

  it('maps font-size 1rem to text-base', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'font-size-base', type: 'string', value: '1rem', category: 'typography' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result[0]?.className).toBe('text-base');
  });

  it('maps font-size 1.5rem to text-2xl', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'font-size-2xl', type: 'string', value: '1.5rem', category: 'typography' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result[0]?.className).toBe('text-2xl');
  });

  it('maps shadow to named shadow class', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'shadow-md', type: 'string', value: '0 4px 6px rgba(0,0,0,0.1)', category: 'shadow' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result[0]?.className).toBe('shadow-md');
  });

  it('maps large shadow to shadow-lg or higher', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'shadow-lg', type: 'string', value: '0 10px 15px rgba(0,0,0,0.1)', category: 'shadow' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result[0]?.className).toMatch(/^shadow-(lg|xl|2xl)$/);
  });

  it('maps line-height 1.5 to leading-normal', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'line-height-normal', type: 'string', value: '1.5', category: 'typography' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result[0]?.className).toBe('leading-normal');
  });

  it('maps line-height 1.25 to leading-tight', () => {
    const tokens: IFigmaDesignToken[] = [
      { name: 'line-height-tight', type: 'string', value: '1.25', category: 'typography' },
    ];
    const result = mapTokensToTailwind(tokens);
    expect(result[0]?.className).toBe('leading-tight');
  });
});
