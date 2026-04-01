import type { IDesignContext } from '@forgespace/siza-gen';
import { deepMergeContext } from '../lib/design-context-merge.js';

describe('design-context-merge', () => {
  const baseContext: IDesignContext = {
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: 16,
      lineHeight: 1.5,
    },
    colorPalette: {
      primary: '#000',
      secondary: '#666',
      accent: '#ff0000',
      background: '#fff',
      foreground: '#000',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      full: 999,
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.1)',
    },
    iconSet: 'feather',
    animationLib: 'framer-motion',
    buttonVariants: ['primary', 'secondary', 'ghost'],
  };

  it('returns base context when override is empty', () => {
    const result = deepMergeContext(baseContext, {});
    expect(result).toEqual(baseContext);
  });

  it('overrides typography when provided', () => {
    const override = {
      typography: {
        fontFamily: 'Georgia, serif',
      },
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.typography.fontFamily).toBe('Georgia, serif');
    expect(result.typography.fontSize).toBe(16);
    expect(result.colorPalette).toEqual(baseContext.colorPalette);
  });

  it('merges color palette', () => {
    const override = {
      colorPalette: {
        primary: '#ff0000',
      },
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.colorPalette.primary).toBe('#ff0000');
    expect(result.colorPalette.secondary).toBe('#666');
    expect(result.colorPalette.accent).toBe('#ff0000');
  });

  it('merges spacing independently', () => {
    const override = {
      spacing: {
        xs: 2,
        md: 20,
      },
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.spacing.xs).toBe(2);
    expect(result.spacing.md).toBe(20);
    expect(result.spacing.sm).toBe(8);
    expect(result.spacing.lg).toBe(24);
  });

  it('merges border radius', () => {
    const override = {
      borderRadius: {
        full: 0,
      },
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.borderRadius.full).toBe(0);
    expect(result.borderRadius.sm).toBe(4);
  });

  it('uses scalar override for iconSet', () => {
    const override = {
      iconSet: 'lucide',
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.iconSet).toBe('lucide');
  });

  it('uses scalar override for animationLib', () => {
    const override = {
      animationLib: 'gsap',
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.animationLib).toBe('gsap');
  });

  it('uses scalar override for buttonVariants', () => {
    const override = {
      buttonVariants: ['primary', 'secondary'],
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.buttonVariants).toEqual(['primary', 'secondary']);
  });

  it('handles multiple overrides simultaneously', () => {
    const override: Partial<IDesignContext> = {
      typography: { fontFamily: 'Roboto' },
      colorPalette: { primary: '#0066cc' },
      spacing: { md: 18 },
      iconSet: 'phosphor',
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.typography.fontFamily).toBe('Roboto');
    expect(result.colorPalette.primary).toBe('#0066cc');
    expect(result.spacing.md).toBe(18);
    expect(result.iconSet).toBe('phosphor');
    // Unmodified props should remain
    expect(result.typography.fontSize).toBe(16);
    expect(result.colorPalette.secondary).toBe('#666');
  });

  it('does not mutate the base context', () => {
    const baseClone = JSON.parse(JSON.stringify(baseContext));
    const override = {
      typography: { fontFamily: 'Comic Sans' },
      colorPalette: { primary: '#f0f' },
    };
    deepMergeContext(baseContext, override);
    expect(baseContext).toEqual(baseClone);
  });

  it('handles undefined override values gracefully', () => {
    const override: Partial<IDesignContext> = {
      typography: undefined,
    };
    const result = deepMergeContext(baseContext, override);
    expect(result.typography).toEqual(baseContext.typography);
  });
});
