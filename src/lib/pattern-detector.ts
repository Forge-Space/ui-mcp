import type { IPatternMatch, IScrapedPage, IImageAnalysis, IDesignContext } from './types.js';
import { normalizeColors } from './browser-scraper.js';

interface AnalysisInput {
  scrapedPages: IScrapedPage[];
  imageAnalyses: IImageAnalysis[];
}

export function detectCommonPatterns(input: AnalysisInput): IPatternMatch[] {
  const patterns: IPatternMatch[] = [];
  const { scrapedPages, imageAnalyses } = input;
  const totalSources = scrapedPages.length + imageAnalyses.length;

  if (totalSources === 0) return patterns;

  patterns.push(...detectColorPatterns(scrapedPages, imageAnalyses, totalSources));
  patterns.push(...detectTypographyPatterns(scrapedPages, totalSources));
  patterns.push(...detectLayoutPatterns(scrapedPages, imageAnalyses, totalSources));
  patterns.push(...detectComponentPatterns(scrapedPages, imageAnalyses, totalSources));
  patterns.push(...detectSpacingPatterns(scrapedPages, totalSources));

  return patterns.sort((a, b) => b.confidence - a.confidence);
}

function detectColorPatterns(pages: IScrapedPage[], images: IImageAnalysis[], totalSources: number): IPatternMatch[] {
  const colorFrequency = new Map<string, Set<string>>();

  for (const page of pages) {
    const normalized = normalizeColors(page.colors);
    for (const color of normalized) {
      const rounded = roundHexColor(color);
      if (!colorFrequency.has(rounded)) colorFrequency.set(rounded, new Set());
      colorFrequency.get(rounded)!.add(page.url);
    }
  }

  for (const img of images) {
    for (const dc of img.dominantColors) {
      const rounded = roundHexColor(dc.hex);
      if (!colorFrequency.has(rounded)) colorFrequency.set(rounded, new Set());
      colorFrequency.get(rounded)!.add(img.label);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [color, sources] of colorFrequency) {
    if (sources.size >= Math.max(1, Math.ceil(totalSources * 0.3))) {
      patterns.push({
        category: 'color',
        pattern: color,
        confidence: Math.round((sources.size / totalSources) * 100) / 100,
        sources: [...sources],
      });
    }
  }

  return patterns.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
}

function detectTypographyPatterns(pages: IScrapedPage[], _totalSources: number): IPatternMatch[] {
  const fontFrequency = new Map<string, Set<string>>();

  for (const page of pages) {
    for (const font of page.fonts) {
      const normalized = font.toLowerCase().trim();
      if (!fontFrequency.has(normalized)) fontFrequency.set(normalized, new Set());
      fontFrequency.get(normalized)!.add(page.url);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [font, sources] of fontFrequency) {
    if (isSystemFont(font)) continue;
    patterns.push({
      category: 'typography',
      pattern: font,
      confidence: Math.round((sources.size / Math.max(1, pages.length)) * 100) / 100,
      sources: [...sources],
    });
  }

  return patterns.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
}

function detectLayoutPatterns(pages: IScrapedPage[], images: IImageAnalysis[], totalSources: number): IPatternMatch[] {
  const layoutFrequency = new Map<string, Set<string>>();

  for (const page of pages) {
    for (const layout of page.layoutPatterns) {
      if (!layoutFrequency.has(layout)) layoutFrequency.set(layout, new Set());
      layoutFrequency.get(layout)!.add(page.url);
    }
  }

  for (const img of images) {
    for (const region of img.layoutRegions) {
      const layout = region.role;
      if (!layoutFrequency.has(layout)) layoutFrequency.set(layout, new Set());
      layoutFrequency.get(layout)!.add(img.label);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [layout, sources] of layoutFrequency) {
    patterns.push({
      category: 'layout',
      pattern: layout,
      confidence: Math.round((sources.size / totalSources) * 100) / 100,
      sources: [...sources],
    });
  }

  return patterns.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
}

function detectComponentPatterns(
  pages: IScrapedPage[],
  images: IImageAnalysis[],
  totalSources: number
): IPatternMatch[] {
  const componentFrequency = new Map<string, Set<string>>();

  for (const page of pages) {
    for (const comp of page.componentTypes) {
      if (!componentFrequency.has(comp)) componentFrequency.set(comp, new Set());
      componentFrequency.get(comp)!.add(page.url);
    }
  }

  for (const img of images) {
    for (const comp of img.detectedComponents) {
      if (!componentFrequency.has(comp)) componentFrequency.set(comp, new Set());
      componentFrequency.get(comp)!.add(img.label);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [comp, sources] of componentFrequency) {
    patterns.push({
      category: 'component',
      pattern: comp,
      confidence: Math.round((sources.size / totalSources) * 100) / 100,
      sources: [...sources],
    });
  }

  return patterns.sort((a, b) => b.confidence - a.confidence).slice(0, 15);
}

function detectSpacingPatterns(pages: IScrapedPage[], totalSources: number): IPatternMatch[] {
  const spacingFrequency = new Map<string, Set<string>>();

  for (const page of pages) {
    for (const spacing of page.spacing) {
      const normalized = normalizeSpacing(spacing);
      if (!normalized) continue;
      if (!spacingFrequency.has(normalized)) spacingFrequency.set(normalized, new Set());
      spacingFrequency.get(normalized)!.add(page.url);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [spacing, sources] of spacingFrequency) {
    if (sources.size >= Math.max(1, Math.ceil(totalSources * 0.3))) {
      patterns.push({
        category: 'spacing',
        pattern: spacing,
        confidence: Math.round((sources.size / Math.max(1, pages.length)) * 100) / 100,
        sources: [...sources],
      });
    }
  }

  return patterns.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
}

export function buildSuggestedContext(patterns: IPatternMatch[]): Partial<IDesignContext> {
  const ctx: Partial<IDesignContext> = {};

  // Extract color palette from color patterns
  const colorPatterns = patterns.filter((p) => p.category === 'color').sort((a, b) => b.confidence - a.confidence);

  if (colorPatterns.length > 0) {
    const colors = colorPatterns.map((p) => p.pattern);
    ctx.colorPalette = {
      primary: colors[0] ?? '#2563eb',
      primaryForeground: '#ffffff',
      secondary: colors[1] ?? '#64748b',
      secondaryForeground: '#ffffff',
      accent: colors[2] ?? '#f59e0b',
      accentForeground: '#ffffff',
      background: findLightestColor(colors) ?? '#ffffff',
      foreground: findDarkestColor(colors) ?? '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    };
  }

  // Extract typography from font patterns
  const fontPatterns = patterns.filter((p) => p.category === 'typography').sort((a, b) => b.confidence - a.confidence);

  if (fontPatterns.length > 0) {
    ctx.typography = {
      fontFamily: `${fontPatterns[0].pattern}, system-ui, sans-serif`,
      headingFont: fontPatterns.length > 1 ? fontPatterns[1].pattern : undefined,
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

  return ctx;
}

// --- Utility functions ---

function roundHexColor(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const r = Math.round(parseInt(clean.slice(0, 2), 16) / 16) * 16;
  const g = Math.round(parseInt(clean.slice(2, 4), 16) / 16) * 16;
  const b = Math.round(parseInt(clean.slice(4, 6), 16) / 16) * 16;
  return `#${Math.min(r, 255).toString(16).padStart(2, '0')}${Math.min(g, 255).toString(16).padStart(2, '0')}${Math.min(b, 255).toString(16).padStart(2, '0')}`;
}

function isSystemFont(font: string): boolean {
  const systemFonts = [
    'system-ui',
    'sans-serif',
    'serif',
    'monospace',
    'cursive',
    'fantasy',
    'arial',
    'helvetica',
    'times new roman',
    'times',
    'courier new',
    'courier',
    'verdana',
    'georgia',
    'palatino',
    'garamond',
    'comic sans ms',
    'impact',
    'tahoma',
    'trebuchet ms',
    'lucida console',
    'lucida sans unicode',
    '-apple-system',
    'blinkmacsystemfont',
    'segoe ui',
    'ui-sans-serif',
    'ui-serif',
    'ui-monospace',
    'ui-rounded',
  ];
  return systemFonts.includes(font.toLowerCase());
}

function normalizeSpacing(spacing: string): string | null {
  const match = spacing.match(/^(\d+(?:\.\d+)?)(px|rem|em)$/);
  if (!match) return null;
  const value = parseFloat(match[1]);
  const unit = match[2];
  if (unit === 'px' && value > 0 && value <= 200) return spacing;
  if ((unit === 'rem' || unit === 'em') && value > 0 && value <= 20) return spacing;
  return null;
}

function colorBrightness(hex: string): number {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return 128;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function findLightestColor(colors: string[]): string | undefined {
  let lightest: string | undefined;
  let maxBrightness = -1;
  for (const c of colors) {
    const b = colorBrightness(c);
    if (b > maxBrightness && b > 200) {
      maxBrightness = b;
      lightest = c;
    }
  }
  return lightest;
}

function findDarkestColor(colors: string[]): string | undefined {
  let darkest: string | undefined;
  let minBrightness = 256;
  for (const c of colors) {
    const b = colorBrightness(c);
    if (b < minBrightness && b < 80) {
      minBrightness = b;
      darkest = c;
    }
  }
  return darkest;
}
