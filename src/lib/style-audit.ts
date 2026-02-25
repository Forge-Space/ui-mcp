import type { IDesignContext } from '@forgespace/siza-gen';

interface StyleAuditResult {
  tokens: Partial<IDesignContext>;
  warnings: string[];
}

export function parseTailwindConfig(configString: string): StyleAuditResult {
  const warnings: string[] = [];
  const tokens: Partial<IDesignContext> = {};

  try {
    const colorsMatch = configString.match(/colors\s*:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
    if (colorsMatch) {
      const colorsBlock = colorsMatch[1];
      const colorPalette: Record<string, string> = {};

      const colorEntries = colorsBlock.matchAll(/['"]?(\w+)['"]?\s*:\s*['"]([#\w]+)['"]/g);
      for (const match of colorEntries) {
        colorPalette[match[1]] = match[2];
      }

      if (Object.keys(colorPalette).length > 0) {
        tokens.colorPalette = {
          primary: colorPalette['primary'] ?? '#2563eb',
          primaryForeground: colorPalette['primaryForeground'] ?? colorPalette['primary-foreground'] ?? '#ffffff',
          secondary: colorPalette['secondary'] ?? '#64748b',
          secondaryForeground: colorPalette['secondaryForeground'] ?? colorPalette['secondary-foreground'] ?? '#ffffff',
          accent: colorPalette['accent'] ?? '#f59e0b',
          accentForeground: colorPalette['accentForeground'] ?? colorPalette['accent-foreground'] ?? '#1c1917',
          background: colorPalette['background'] ?? '#ffffff',
          foreground: colorPalette['foreground'] ?? '#0f172a',
          muted: colorPalette['muted'] ?? '#f1f5f9',
          mutedForeground: colorPalette['mutedForeground'] ?? colorPalette['muted-foreground'] ?? '#64748b',
          border: colorPalette['border'] ?? '#e2e8f0',
          destructive: colorPalette['destructive'] ?? '#ef4444',
          destructiveForeground:
            colorPalette['destructiveForeground'] ?? colorPalette['destructive-foreground'] ?? '#ffffff',
        };
      }
    }

    const fontFamilyMatch = configString.match(/fontFamily\s*:\s*\{[^}]*sans\s*:\s*\[['"]([^'"]+)['"]/s);
    if (fontFamilyMatch) {
      tokens.typography = {
        fontFamily: fontFamilyMatch[1],
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
      };
    }

    const borderRadiusMatch = configString.match(/borderRadius\s*:\s*\{([^}]+)\}/s);
    if (borderRadiusMatch) {
      const radiusBlock = borderRadiusMatch[1];
      const radiusEntries: Record<string, string> = {};
      const matches = radiusBlock.matchAll(/['"]?(\w+)['"]?\s*:\s*['"]([^'"]+)['"]/g);
      for (const match of matches) {
        radiusEntries[match[1]] = match[2];
      }
      if (Object.keys(radiusEntries).length > 0) {
        tokens.borderRadius = {
          sm: radiusEntries['sm'] ?? '0.25rem',
          md: radiusEntries['md'] ?? '0.375rem',
          lg: radiusEntries['lg'] ?? '0.5rem',
          full: radiusEntries['full'] ?? '9999px',
        };
      }
    }
  } catch (error) {
    warnings.push(`Failed to parse Tailwind config: ${String(error)}`);
  }

  return { tokens, warnings };
}

export function parseCssVariables(cssString: string): StyleAuditResult {
  const warnings: string[] = [];
  const colorPalette: Record<string, string> = {};

  try {
    const varMatches = cssString.matchAll(/--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g);
    for (const match of varMatches) {
      const name = match[1].trim();
      const value = match[2].trim();

      if (
        name.includes('color') ||
        name.includes('bg') ||
        name.includes('foreground') ||
        name.includes('primary') ||
        name.includes('secondary') ||
        name.includes('accent') ||
        name.includes('muted') ||
        name.includes('destructive') ||
        name.includes('border') ||
        name.includes('background')
      ) {
        const camelName = name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
        colorPalette[camelName] = value;
      }
    }
  } catch (error) {
    warnings.push(`Failed to parse CSS variables: ${String(error)}`);
  }

  const tokens: Partial<IDesignContext> = {};
  if (Object.keys(colorPalette).length > 0) {
    // Only include colors actually found — no defaults here.
    // Defaults are applied at the design-context layer, not the parser.
    // Build a partial colorPalette with only the found values
    const partialColorPalette: Partial<IDesignContext['colorPalette']> = {};

    if (colorPalette['primary']) partialColorPalette.primary = colorPalette['primary'];
    if (colorPalette['primaryForeground']) partialColorPalette.primaryForeground = colorPalette['primaryForeground'];
    if (colorPalette['secondary']) partialColorPalette.secondary = colorPalette['secondary'];
    if (colorPalette['secondaryForeground'])
      partialColorPalette.secondaryForeground = colorPalette['secondaryForeground'];
    if (colorPalette['accent']) partialColorPalette.accent = colorPalette['accent'];
    if (colorPalette['accentForeground']) partialColorPalette.accentForeground = colorPalette['accentForeground'];
    if (colorPalette['background']) partialColorPalette.background = colorPalette['background'];
    if (colorPalette['foreground']) partialColorPalette.foreground = colorPalette['foreground'];
    if (colorPalette['muted']) partialColorPalette.muted = colorPalette['muted'];
    if (colorPalette['mutedForeground']) partialColorPalette.mutedForeground = colorPalette['mutedForeground'];
    if (colorPalette['border']) partialColorPalette.border = colorPalette['border'];
    if (colorPalette['destructive']) partialColorPalette.destructive = colorPalette['destructive'];
    if (colorPalette['destructiveForeground'])
      partialColorPalette.destructiveForeground = colorPalette['destructiveForeground'];

    if (Object.keys(partialColorPalette).length > 0) {
      tokens.colorPalette = partialColorPalette as IDesignContext['colorPalette'];
    }
  }

  return { tokens, warnings };
}

export function auditStyles(
  tailwindConfig?: string,
  cssVariables?: string
): { context: Partial<IDesignContext>; warnings: string[] } {
  const allWarnings: string[] = [];
  let merged: Partial<IDesignContext> = {};

  if (tailwindConfig) {
    const tailwindResult = parseTailwindConfig(tailwindConfig);
    merged = { ...merged, ...tailwindResult.tokens };
    allWarnings.push(...tailwindResult.warnings);
  }

  if (cssVariables) {
    const cssResult = parseCssVariables(cssVariables);
    // Deep-merge colorPalette: CSS values override TW values, but missing CSS values keep TW values
    if (cssResult.tokens.colorPalette) {
      const base = merged.colorPalette ?? ({} as Partial<IDesignContext['colorPalette']>);
      cssResult.tokens.colorPalette = { ...base, ...cssResult.tokens.colorPalette } as IDesignContext['colorPalette'];
    }
    merged = { ...merged, ...cssResult.tokens };
    allWarnings.push(...cssResult.warnings);
  }

  return { context: merged, warnings: allWarnings };
}
