import { describe, it, expect } from '@jest/globals';
import { loadConfig } from '@forgespace/siza-gen';
import { deepMergeContext } from '../../lib/design-context-merge.js';
import type { IDesignContext } from '@forgespace/siza-gen';

const base: IDesignContext = {
  colorPalette: {
    primary: '#7c3aed',
    primaryForeground: '#ffffff',
    secondary: '#3B82F6',
    secondaryForeground: '#ffffff',
    accent: '#F59E0B',
    accentForeground: '#1c1917',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    border: '#e2e8f0',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' },
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
  },
  spacing: { unit: 4, scale: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96] },
  borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', full: '9999px' },
  shadows: { sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.07)', lg: '0 10px 15px rgba(0,0,0,0.1)' },
  iconSet: 'lucide',
  animationLib: 'tailwind',
  buttonVariants: [],
};

describe('deepMergeContext', () => {
  beforeEach(() => {
    loadConfig();
  });

  it('returns base unchanged when override is empty', () => {
    const result = deepMergeContext(base, {});
    expect(result.colorPalette).toEqual(base.colorPalette);
    expect(result.typography).toEqual(base.typography);
    expect(result.iconSet).toBe('lucide');
  });

  it('overrides colorPalette when provided', () => {
    const override: Partial<IDesignContext> = {
      colorPalette: { ...base.colorPalette, primary: '#ff0000' },
    };
    const result = deepMergeContext(base, override);
    expect(result.colorPalette.primary).toBe('#ff0000');
    // other colors preserved
    expect(result.colorPalette.secondary).toBe('#3B82F6');
  });

  it('merges typography — overrides only provided keys', () => {
    const override: Partial<IDesignContext> = {
      typography: { ...base.typography, fontFamily: 'Roboto, sans-serif' },
    };
    const result = deepMergeContext(base, override);
    expect(result.typography.fontFamily).toBe('Roboto, sans-serif');
    expect(result.typography.fontWeight).toEqual(base.typography.fontWeight);
  });

  it('keeps base spacing when no spacing override', () => {
    const result = deepMergeContext(base, { colorPalette: base.colorPalette });
    expect(result.spacing.unit).toBe(4);
  });

  it('overrides spacing when provided', () => {
    const override: Partial<IDesignContext> = {
      spacing: { unit: 8, scale: [0, 8, 16, 24] },
    };
    const result = deepMergeContext(base, override);
    expect(result.spacing.unit).toBe(8);
  });

  it('overrides borderRadius when provided', () => {
    const override: Partial<IDesignContext> = {
      borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', full: '50%' },
    };
    const result = deepMergeContext(base, override);
    expect(result.borderRadius.sm).toBe('0.5rem');
    expect(result.borderRadius.full).toBe('50%');
  });

  it('overrides iconSet with nullish coalescing', () => {
    const result = deepMergeContext(base, { iconSet: 'heroicons' });
    expect(result.iconSet).toBe('heroicons');
  });

  it('keeps base iconSet when override is undefined', () => {
    const result = deepMergeContext(base, { colorPalette: base.colorPalette });
    expect(result.iconSet).toBe('lucide');
  });

  it('overrides shadows when provided', () => {
    const customShadows = {
      sm: '0 2px 4px rgba(0,0,0,0.1)',
      md: '0 8px 16px rgba(0,0,0,0.2)',
      lg: '0 20px 40px rgba(0,0,0,0.3)',
    };
    const result = deepMergeContext(base, { shadows: customShadows });
    expect(result.shadows.sm).toBe('0 2px 4px rgba(0,0,0,0.1)');
  });

  it('returns a new object (not mutating base)', () => {
    const override: Partial<IDesignContext> = {
      colorPalette: { ...base.colorPalette, primary: '#000000' },
    };
    const result = deepMergeContext(base, override);
    expect(base.colorPalette.primary).toBe('#7c3aed'); // base unchanged
    expect(result.colorPalette.primary).toBe('#000000');
  });
});
