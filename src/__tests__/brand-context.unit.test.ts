import { designContextStore } from '@forgespace/siza-gen';
import { withBrandContext, withBrandContextSync } from '../lib/brand-context.js';

const VALID_BRAND_JSON = JSON.stringify({
  colors: {
    primary: { hex: '#1a56db' },
    secondary: { hex: '#7e3af2' },
    accent: { hex: '#ff5a1f' },
    neutral: [
      { hex: '#111827' },
      { hex: '#374151' },
      { hex: '#6b7280' },
      { hex: '#9ca3af' },
      { hex: '#d1d5db' },
      { hex: '#f3f4f6' },
      { hex: '#f9fafb' },
    ],
    semantic: {
      success: { hex: '#057a55' },
      warning: { hex: '#e3a008' },
      error: { hex: '#e02424' },
      info: { hex: '#1c64f2' },
    },
  },
  typography: {
    headingFont: 'Poppins',
    bodyFont: 'Inter',
    baseSize: 16,
    steps: [
      { name: 'xs', size: '0.75rem', lineHeight: '1.2', weight: 400 },
      { name: 'sm', size: '0.875rem', lineHeight: '1.3', weight: 400 },
      { name: 'base', size: '1rem', lineHeight: '1.5', weight: 400 },
      { name: 'lg', size: '1.125rem', lineHeight: '1.5', weight: 500 },
      { name: 'xl', size: '1.25rem', lineHeight: '1.4', weight: 600 },
    ],
  },
  spacing: {
    unit: 4,
    values: { '1': '0.25rem', '2': '0.5rem', '4': '1rem' },
  },
});

describe('withBrandContext', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  it('is a no-op when brandJson is undefined', async () => {
    const before = designContextStore.get();
    const result = await withBrandContext(undefined, async () => {
      return designContextStore.get();
    });
    expect(result.colorPalette.primary).toBe(before.colorPalette.primary);
  });

  it('updates design context during execution', async () => {
    await withBrandContext(VALID_BRAND_JSON, async () => {
      const ctx = designContextStore.get();
      expect(ctx.colorPalette.primary).toBe('#1a56db');
      expect(ctx.colorPalette.secondary).toBe('#7e3af2');
      expect(ctx.typography.headingFont).toBe('Poppins');
      expect(ctx.typography.fontFamily).toBe('Inter');
    });
  });

  it('restores previous context after execution', async () => {
    const before = designContextStore.get();
    await withBrandContext(VALID_BRAND_JSON, async () => {
      expect(designContextStore.get().colorPalette.primary).toBe('#1a56db');
    });
    const after = designContextStore.get();
    expect(after.colorPalette.primary).toBe(before.colorPalette.primary);
  });

  it('restores context on error', async () => {
    const before = designContextStore.get();
    await expect(
      withBrandContext(VALID_BRAND_JSON, async () => {
        throw new Error('test error');
      })
    ).rejects.toThrow('test error');
    const after = designContextStore.get();
    expect(after.colorPalette.primary).toBe(before.colorPalette.primary);
  });

  it('throws on invalid JSON', async () => {
    await expect(
      withBrandContext('not-json', async () => {
        return 'should not reach';
      })
    ).rejects.toThrow();
  });

  it('returns the function result', async () => {
    const result = await withBrandContext(VALID_BRAND_JSON, async () => {
      return 42;
    });
    expect(result).toBe(42);
  });
});

describe('withBrandContextSync', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  it('is a no-op when brandJson is undefined', () => {
    const before = designContextStore.get();
    const result = withBrandContextSync(undefined, () => {
      return designContextStore.get();
    });
    expect(result.colorPalette.primary).toBe(before.colorPalette.primary);
  });

  it('updates and restores context synchronously', () => {
    const before = designContextStore.get();
    withBrandContextSync(VALID_BRAND_JSON, () => {
      const ctx = designContextStore.get();
      expect(ctx.colorPalette.primary).toBe('#1a56db');
    });
    const after = designContextStore.get();
    expect(after.colorPalette.primary).toBe(before.colorPalette.primary);
  });

  it('restores context on sync error', () => {
    const before = designContextStore.get();
    expect(() => {
      withBrandContextSync(VALID_BRAND_JSON, () => {
        throw new Error('sync error');
      });
    }).toThrow('sync error');
    const after = designContextStore.get();
    expect(after.colorPalette.primary).toBe(before.colorPalette.primary);
  });
});
