import {
  createLogger,
  type IDesignContext,
  type IImageAnalysis,
  type IPatternMatch,
  type IScrapedPage,
} from '@forgespace/siza-gen';

const logger = createLogger('pattern-detector');

// Pattern detection constants
const _MAX_PATTERNS_PER_CATEGORY = 10; // Maximum patterns to return per category (reserved for future use)
const CONFIDENCE_PRECISION = 100; // Precision for confidence calculation (e.g., 100 = 2 decimal places)
const MIN_SOURCES_FOR_PATTERN = 0.3; // Minimum proportion of sources required for a pattern

// Color processing constants
const HEX_COLOR_LENGTH = 6; // Expected length of hex color without #
const COLOR_QUANTIZATION_STEP = 16; // RGB quantization step for color rounding
const DEFAULT_BRIGHTNESS = 128; // Default brightness for invalid colors

// Brightness calculation constants (ITU-R BT.601 standard)
const BRIGHTNESS_RED_WEIGHT = 299;
const BRIGHTNESS_GREEN_WEIGHT = 587;
const BRIGHTNESS_BLUE_WEIGHT = 114;
const BRIGHTNESS_DIVISOR = 1000;

// Color classification thresholds
const LIGHT_COLOR_THRESHOLD = 200; // Brightness threshold for light colors
const DARK_COLOR_THRESHOLD = 80; // Brightness threshold for dark colors
const MAX_BRIGHTNESS = 256; // Maximum possible brightness value

// Spacing validation constants
const MAX_SPACING_PX = 200; // Maximum valid spacing in pixels
const MAX_SPACING_REM = 20; // Maximum valid spacing in rem/em

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
      colorFrequency.get(rounded)?.add(page.url);
    }
  }

  for (const imageAnalysis of images) {
    for (const dominantColor of imageAnalysis.dominantColors) {
      const rounded = roundHexColor(dominantColor.hex);
      if (!colorFrequency.has(rounded)) colorFrequency.set(rounded, new Set());
      colorFrequency.get(rounded)?.add(imageAnalysis.label);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [color, sources] of colorFrequency) {
    if (sources.size >= Math.max(1, Math.ceil(totalSources * MIN_SOURCES_FOR_PATTERN))) {
      patterns.push({
        category: 'color',
        pattern: color,
        confidence: Math.round((sources.size / totalSources) * CONFIDENCE_PRECISION) / CONFIDENCE_PRECISION,
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
      fontFrequency.get(normalized)?.add(page.url);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [font, sources] of fontFrequency) {
    if (isSystemFont(font)) continue;
    patterns.push({
      category: 'typography',
      pattern: font,
      confidence: Math.round((sources.size / Math.max(1, pages.length)) * CONFIDENCE_PRECISION) / CONFIDENCE_PRECISION,
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
      layoutFrequency.get(layout)?.add(page.url);
    }
  }

  for (const imageAnalysis of images) {
    for (const region of imageAnalysis.layoutRegions) {
      const layout = region.role;
      if (!layoutFrequency.has(layout)) layoutFrequency.set(layout, new Set());
      layoutFrequency.get(layout)?.add(imageAnalysis.label);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [layout, sources] of layoutFrequency) {
    patterns.push({
      category: 'layout',
      pattern: layout,
      confidence: Math.round((sources.size / totalSources) * CONFIDENCE_PRECISION) / CONFIDENCE_PRECISION,
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
    for (const componentType of page.componentTypes) {
      if (!componentFrequency.has(componentType)) componentFrequency.set(componentType, new Set());
      componentFrequency.get(componentType)?.add(page.url);
    }
  }

  for (const imageAnalysis of images) {
    for (const componentType of imageAnalysis.detectedComponents) {
      if (!componentFrequency.has(componentType)) componentFrequency.set(componentType, new Set());
      componentFrequency.get(componentType)?.add(imageAnalysis.label);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [componentType, sources] of componentFrequency) {
    patterns.push({
      category: 'component',
      pattern: componentType,
      confidence: Math.round((sources.size / totalSources) * CONFIDENCE_PRECISION) / CONFIDENCE_PRECISION,
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
      spacingFrequency.get(normalized)?.add(page.url);
    }
  }

  const patterns: IPatternMatch[] = [];
  for (const [spacing, sources] of spacingFrequency) {
    if (sources.size >= Math.max(1, Math.ceil(totalSources * MIN_SOURCES_FOR_PATTERN))) {
      patterns.push({
        category: 'spacing',
        pattern: spacing,
        confidence:
          Math.round((sources.size / Math.max(1, pages.length)) * CONFIDENCE_PRECISION) / CONFIDENCE_PRECISION,
        sources: [...sources],
      });
    }
  }

  return patterns.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
}

export function buildSuggestedContext(patterns: IPatternMatch[]): Partial<IDesignContext> {
  const ctx: Partial<IDesignContext> = {};

  // Extract color palette from color patterns
  const colorPatterns = patterns
    .filter((pattern) => pattern.category === 'color')
    .sort((a, b) => b.confidence - a.confidence);

  if (colorPatterns.length > 0) {
    const colors = colorPatterns.map((pattern) => pattern.pattern);
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
  const fontPatterns = patterns
    .filter((pattern) => pattern.category === 'typography')
    .sort((a, b) => b.confidence - a.confidence);

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

  // Validate hex format before processing
  if (clean.length !== HEX_COLOR_LENGTH || !/^[0-9a-fA-F]{6}$/.test(clean)) {
    return hex; // Return original if invalid
  }

  const r = (Math.round(parseInt(clean.slice(0, 2), 16) / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP) & 0xff;
  const g = (Math.round(parseInt(clean.slice(2, 4), 16) / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP) & 0xff;
  const b = (Math.round(parseInt(clean.slice(4, 6), 16) / COLOR_QUANTIZATION_STEP) * COLOR_QUANTIZATION_STEP) & 0xff;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
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
  // Validate input to prevent TypeError on null/undefined
  if (!spacing || typeof spacing !== 'string') return null;

  const match = spacing.match(/^(\d+(?:\.\d+)?)(px|rem|em)$/);
  if (!match) return null;
  const value = parseFloat(match[1]);
  const unit = match[2];
  if (unit === 'px' && value > 0 && value <= MAX_SPACING_PX) return spacing;
  if ((unit === 'rem' || unit === 'em') && value > 0 && value <= MAX_SPACING_REM) return spacing;
  return null;
}

function colorBrightness(hex: string): number {
  const clean = hex.replace('#', '');

  // Validate hex format: must be exactly 6 valid hex characters
  if (clean.length !== HEX_COLOR_LENGTH || !/^[0-9a-fA-F]{6}$/.test(clean)) {
    logger.warn({ hex, cleanLength: clean.length }, 'Invalid hex color format, using default brightness');
    return DEFAULT_BRIGHTNESS;
  }

  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  // Note: With valid hex format, parseInt should never return NaN, but keep for safety
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    logger.warn({ hex, r, g, b }, 'Failed to parse RGB from hex color, using default brightness');
    return DEFAULT_BRIGHTNESS;
  }

  return (r * BRIGHTNESS_RED_WEIGHT + g * BRIGHTNESS_GREEN_WEIGHT + b * BRIGHTNESS_BLUE_WEIGHT) / BRIGHTNESS_DIVISOR;
}

function findLightestColor(colors: string[]): string | undefined {
  let lightest: string | undefined;
  let maxBrightness = -1;
  for (const color of colors) {
    const brightness = colorBrightness(color);
    if (brightness > maxBrightness && brightness > LIGHT_COLOR_THRESHOLD) {
      maxBrightness = brightness;
      lightest = color;
    }
  }
  return lightest;
}

function findDarkestColor(colors: string[]): string | undefined {
  let darkest: string | undefined;
  let minBrightness = MAX_BRIGHTNESS;
  for (const color of colors) {
    const brightness = colorBrightness(color);
    if (brightness < minBrightness && brightness < DARK_COLOR_THRESHOLD) {
      minBrightness = brightness;
      darkest = color;
    }
  }
  return darkest;
}
