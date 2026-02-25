import { designContextStore, type IDesignContext } from '@forgespace/siza-gen';

interface CssVariableSet {
  light: Record<string, string>;
  radius: string;
}

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return `0 0% ${Math.round(l * 100)}%`;
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / d + 2) / 6 : ((r - g) / d + 4) / 6;

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function resolveColorSystemHsl(ctx?: IDesignContext): CssVariableSet {
  const context = ctx ?? designContextStore.get();

  // Try to find the matching color system from design-references for raw HSL values
  // Otherwise convert hex values from the context to HSL
  const cp = context.colorPalette;

  return {
    light: {
      '--background': hexToHsl(cp.background),
      '--foreground': hexToHsl(cp.foreground),
      '--primary': hexToHsl(cp.primary),
      '--primary-foreground': hexToHsl(cp.primaryForeground),
      '--secondary': hexToHsl(cp.secondary),
      '--secondary-foreground': hexToHsl(cp.secondaryForeground),
      '--muted': hexToHsl(cp.muted),
      '--muted-foreground': hexToHsl(cp.mutedForeground),
      '--accent': hexToHsl(cp.accent),
      '--accent-foreground': hexToHsl(cp.accentForeground),
      '--destructive': hexToHsl(cp.destructive),
      '--destructive-foreground': hexToHsl(cp.destructiveForeground),
      '--border': hexToHsl(cp.border),
    },
    radius: context.borderRadius?.lg ?? '0.5rem',
  };
}

export function generateCssVariableBlock(ctx?: IDesignContext): string {
  const vars = resolveColorSystemHsl(ctx);
  const lines = Object.entries(vars.light)
    .map(([k, v]) => `    ${k}: ${v};`)
    .join('\n');

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${lines}
    --radius: ${vars.radius};
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
}

export function generateFontImportHtml(ctx?: IDesignContext): string {
  const context = ctx ?? designContextStore.get();
  const bodyFont = context.typography?.fontFamily ?? 'Inter';
  const headingFont = context.typography?.headingFont;

  const families = [bodyFont];
  if (headingFont && headingFont !== bodyFont) {
    families.push(headingFont);
  }

  const params = families.map((f) => `family=${f.replace(/\s/g, '+')}:wght@400;500;600;700`).join('&');

  return `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?${params}&display=swap" rel="stylesheet" />`;
}
