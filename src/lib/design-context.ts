import type { IDesignContext } from './types.js';

const DEFAULT_CONTEXT: IDesignContext = {
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
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  colorPalette: {
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#64748b',
    secondaryForeground: '#ffffff',
    accent: '#f59e0b',
    accentForeground: '#1c1917',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    border: '#e2e8f0',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
  },
  spacing: {
    unit: 4,
    scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64],
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
};

class DesignContextStore {
  private context: IDesignContext;

  constructor() {
    this.context = structuredClone(DEFAULT_CONTEXT);
  }

  get(): IDesignContext {
    return structuredClone(this.context);
  }

  set(ctx: IDesignContext): void {
    this.context = structuredClone(ctx);
  }

  update(partial: Partial<IDesignContext>): void {
    this.context = { ...this.context, ...structuredClone(partial) };
  }

  reset(): void {
    this.context = structuredClone(DEFAULT_CONTEXT);
  }
}

export const designContextStore = new DesignContextStore();
export { DEFAULT_CONTEXT };
