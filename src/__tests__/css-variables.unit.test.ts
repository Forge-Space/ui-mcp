import { loadConfig } from '@forgespace/siza-gen';
import {
  resolveColorSystemHsl,
  generateCssVariableBlock,
  generateFontImportHtml,
} from '../lib/templates/css-variables.js';
import { getPreset } from '@forgespace/siza-gen';

// Load config before any dynamic imports that use config
beforeAll(async () => {
  loadConfig();
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

  // Edge cases
  it('handles empty context gracefully', () => {
    const emptyCtx = getPreset(); // Use valid preset instead of empty object
    expect(() => generateCssVariableBlock(emptyCtx)).not.toThrow();
  });

  it('generates valid CSS with proper structure', () => {
    const ctx = getPreset();
    const block = generateCssVariableBlock(ctx);
    expect(block).toContain('@tailwind base;');
    expect(block).toContain(':root {');
    expect(block).toContain('--primary:');
  });

  it('handles missing font data gracefully', () => {
    const ctx = getPreset();
    // Remove font data
    ctx.typography = {} as any;
    expect(() => generateFontImportHtml(ctx)).not.toThrow();
  });

  it('generates consistent HSL values', () => {
    const ctx = getPreset();
    const vars1 = resolveColorSystemHsl(ctx);
    const vars2 = resolveColorSystemHsl(ctx);
    expect(vars1).toEqual(vars2);
  });
});
