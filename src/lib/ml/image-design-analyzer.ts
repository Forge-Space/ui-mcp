/**
 * Image Design Analyzer
 *
 * Extracts structured design patterns from UI screenshots/mockups for ML training.
 * Does NOT store images - only extracts and stores structured design data.
 */

import type { MoodTag, IndustryTag, VisualStyleId } from '../design-references/component-registry/types.js';

// Quality scoring thresholds
export const MIN_QUALITY_SCORE = 0.3;
export const HIGH_QUALITY_THRESHOLD = 0.7;
export const EXCELLENT_QUALITY_THRESHOLD = 0.9;

// Spacing validation
const MIN_SPACING_PX = 0;
const MAX_SPACING_PX = 128;
const COMMON_SPACING_BASES = [4, 8, 16] as const;

export interface IDesignAnalysis {
  /** Detected color palette */
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    background: string[];
    text: string[];
  };

  /** Typography information */
  typography: {
    fontFamilies: string[];
    headingSizes: string[];
    bodySizes: string[];
    weights: string[];
  };

  /** Spacing and layout */
  spacing: {
    system: string; // e.g., "4px base", "8px base"
    padding: string[];
    margin: string[];
    gap: string[];
  };

  /** Detected UI components */
  components: Array<{
    type: string; // button, card, form, navigation, etc.
    variant?: string; // primary, secondary, outline, etc.
    description: string;
  }>;

  /** Layout patterns */
  layout: {
    type: string; // grid, flex, stack, etc.
    structure: string; // description of layout structure
    responsive: boolean;
  };

  /** Visual style classification */
  visualStyle: {
    primary: VisualStyleId;
    characteristics: string[];
  };

  /** Inferred mood and industry */
  mood: MoodTag[];
  industry: IndustryTag[];

  /** Overall design quality score (0-1) */
  qualityScore: number;

  /** Additional metadata */
  metadata: {
    complexity: 'simple' | 'moderate' | 'complex';
    modernityScore: number; // 0-1
    accessibilityNotes: string[];
  };
}

/**
 * Analyze an image description and generated code to extract design patterns.
 * This function processes the output from image_to_component to extract structured design data.
 */
export function extractDesignPatterns(
  imageDescription: string,
  generatedCode: string,
  componentTypes: string[]
): IDesignAnalysis {
  const colors = extractColorPalette(generatedCode);
  const typography = extractTypography(generatedCode);
  const spacing = extractSpacing(generatedCode);
  const components = detectComponents(imageDescription, componentTypes);
  const layout = detectLayout(imageDescription, generatedCode);
  const visualStyle = inferVisualStyle(generatedCode, imageDescription);
  const { mood, industry } = inferMoodAndIndustry(imageDescription, visualStyle);
  const qualityScore = calculateQualityScore(colors, typography, spacing, components);
  const metadata = extractMetadata(imageDescription, generatedCode);

  return {
    colors,
    typography,
    spacing,
    components,
    layout,
    visualStyle,
    mood,
    industry,
    qualityScore,
    metadata,
  };
}

/**
 * Extract color palette from generated Tailwind CSS code.
 */
function extractColorPalette(code: string): IDesignAnalysis['colors'] {
  const colors = {
    primary: [] as string[],
    secondary: [] as string[],
    accent: [] as string[],
    background: [] as string[],
    text: [] as string[],
  };

  // Extract Tailwind color classes
  const colorPatterns = {
    primary: /bg-(?:blue|indigo|purple|violet)-\d+/g,
    secondary: /bg-(?:gray|slate|zinc)-\d+/g,
    accent: /bg-(?:pink|rose|orange|amber)-\d+/g,
    background: /bg-(?:white|black|gray(?:-\d+)?|slate(?:-\d+)?)/g,
    text: /text-(?:gray|slate|zinc|black|white)(?:-\d+)?/g,
  };

  for (const [category, pattern] of Object.entries(colorPatterns)) {
    const matches = code.match(pattern) || [];
    colors[category as keyof typeof colors] = [...new Set(matches)];
  }

  return colors;
}

/**
 * Extract typography information from generated code.
 */
function extractTypography(code: string): IDesignAnalysis['typography'] {
  const fontFamilies = [...new Set(code.match(/font-(?:sans|serif|mono)/g) || ['font-sans'])];
  const headingSizes = [...new Set(code.match(/text-(?:xl|2xl|3xl|4xl|5xl|6xl)/g) || [])];
  const bodySizes = [...new Set(code.match(/text-(?:xs|sm|base|lg)/g) || ['text-base'])];
  const weights = [...new Set(code.match(/font-(?:light|normal|medium|semibold|bold|extrabold)/g) || [])];

  return {
    fontFamilies,
    headingSizes,
    bodySizes,
    weights,
  };
}

/**
 * Extract spacing system from generated code.
 */
function extractSpacing(code: string): IDesignAnalysis['spacing'] {
  const paddingClasses = [...new Set(code.match(/p[xytblr]?-\d+/g) || [])];
  const marginClasses = [...new Set(code.match(/m[xytblr]?-\d+/g) || [])];
  const gapClasses = [...new Set(code.match(/gap-\d+/g) || [])];

  // Infer spacing system base
  const spacingValues = [...paddingClasses, ...marginClasses, ...gapClasses]
    .map(c => parseInt(c.match(/\d+/)?.[0] || '0'))
    .filter(v => v > MIN_SPACING_PX && v <= MAX_SPACING_PX);

  const minSpacing = spacingValues.length > 0 ? Math.min(...spacingValues) : COMMON_SPACING_BASES[0];
  const system = minSpacing <= 2 ? '4px base' : minSpacing <= 4 ? '4px base' : '8px base';

  return {
    system,
    padding: paddingClasses,
    margin: marginClasses,
    gap: gapClasses,
  };
}

/**
 * Detect UI components from description and types.
 */
function detectComponents(
  description: string,
  componentTypes: string[]
): IDesignAnalysis['components'] {
  const components: IDesignAnalysis['components'] = [];

  // Map common UI elements to component types
  const componentKeywords = {
    button: ['button', 'cta', 'action', 'submit'],
    card: ['card', 'panel', 'box', 'container'],
    form: ['form', 'input', 'field', 'textbox'],
    navigation: ['nav', 'menu', 'header', 'navbar'],
    hero: ['hero', 'banner', 'jumbotron'],
    footer: ['footer', 'bottom'],
    modal: ['modal', 'dialog', 'popup'],
    table: ['table', 'grid', 'data'],
  };

  const lowerDesc = description.toLowerCase();

  for (const [type, keywords] of Object.entries(componentKeywords)) {
    if (keywords.some(kw => lowerDesc.includes(kw)) || componentTypes.includes(type)) {
      components.push({
        type,
        description: `Detected ${type} component from image analysis`,
      });
    }
  }

  return components;
}

/**
 * Detect layout patterns from description and code.
 */
function detectLayout(description: string, code: string): IDesignAnalysis['layout'] {
  const hasGrid = code.includes('grid') || description.toLowerCase().includes('grid');
  const _hasFlex = description.toLowerCase().includes('flex');
  const hasResponsive = code.includes('md:') || code.includes('lg:') || code.includes('sm:');

  let type = 'flex';
  if (hasGrid) type = 'grid';

  return {
    type,
    structure: hasGrid ? 'Grid-based layout with multiple columns' : 'Flexbox-based layout',
    responsive: hasResponsive,
  };
}

/**
 * Infer visual style from code and description.
 */
function inferVisualStyle(
  code: string,
  description: string
): IDesignAnalysis['visualStyle'] {
  const characteristics: string[] = [];
  let primary: VisualStyleId = 'soft-depth';

  // Detect glassmorphism
  if (code.includes('backdrop-blur') || code.includes('bg-opacity')) {
    primary = 'glassmorphism';
    characteristics.push('backdrop-blur', 'transparency');
  }
  // Detect soft-depth (neumorphism-like)
  else if (code.includes('shadow-inner') && code.includes('shadow-lg')) {
    primary = 'soft-depth';
    characteristics.push('soft-shadows', 'subtle-depth');
  }
  // Detect neubrutalism
  else if (code.includes('border-4') || description.toLowerCase().includes('bold')) {
    primary = 'neubrutalism';
    characteristics.push('bold-borders', 'high-contrast');
  }
  // Default to soft-depth
  else {
    characteristics.push('clean', 'simple');
  }

  return { primary, characteristics };
}

/**
 * Infer mood and industry from description and visual style.
 */
function inferMoodAndIndustry(
  description: string,
  visualStyle: IDesignAnalysis['visualStyle']
): { mood: MoodTag[]; industry: IndustryTag[] } {
  const mood: MoodTag[] = [];
  const industry: IndustryTag[] = ['general'];

  const lowerDesc = description.toLowerCase();

  // Mood inference
  if (visualStyle.primary === 'neubrutalism' || lowerDesc.includes('bold')) {
    mood.push('bold');
  }
  if (visualStyle.primary === 'soft-depth' || lowerDesc.includes('clean')) {
    mood.push('minimal', 'professional');
  }
  if (lowerDesc.includes('playful') || lowerDesc.includes('fun')) {
    mood.push('playful');
  }
  if (lowerDesc.includes('creative') || lowerDesc.includes('luxury')) {
    mood.push('creative');
  }

  // Industry inference
  if (lowerDesc.includes('finance') || lowerDesc.includes('bank')) {
    industry.push('fintech');
  } else if (lowerDesc.includes('health') || lowerDesc.includes('medical')) {
    industry.push('healthcare');
  } else if (lowerDesc.includes('ecommerce') || lowerDesc.includes('shop')) {
    industry.push('ecommerce');
  } else if (lowerDesc.includes('saas') || lowerDesc.includes('software')) {
    industry.push('saas');
  }

  return { mood, industry };
}

/**
 * Calculate overall design quality score based on extracted patterns.
 */
function calculateQualityScore(
  colors: IDesignAnalysis['colors'],
  typography: IDesignAnalysis['typography'],
  spacing: IDesignAnalysis['spacing'],
  components: IDesignAnalysis['components']
): number {
  let score = 0.5; // Base score

  // Color palette quality
  const totalColors = Object.values(colors).flat().length;
  if (totalColors >= 3 && totalColors <= 10) score += 0.1;

  // Typography consistency
  if (typography.fontFamilies.length <= 2) score += 0.1;
  if (typography.weights.length >= 2) score += 0.1;

  // Spacing consistency
  if (spacing.padding.length > 0) score += 0.1;

  // Component variety
  if (components.length >= 2) score += 0.1;

  return Math.min(score, 1.0);
}

/**
 * Extract metadata about the design.
 */
function extractMetadata(
  description: string,
  code: string
): IDesignAnalysis['metadata'] {
  const componentCount = (code.match(/<[A-Z]/g) || []).length;
  const complexity = componentCount < 3 ? 'simple' : componentCount < 8 ? 'moderate' : 'complex';

  // Modernity indicators
  const modernFeatures = [
    code.includes('backdrop-blur'),
    code.includes('transition'),
    code.includes('hover:'),
    code.includes('dark:'),
    code.includes('group-hover:'),
  ].filter(Boolean).length;
  const modernityScore = Math.min(modernFeatures / 5, 1.0);

  // Accessibility notes
  const accessibilityNotes: string[] = [];
  if (!code.includes('aria-')) accessibilityNotes.push('Consider adding ARIA attributes');
  if (!code.includes('alt=')) accessibilityNotes.push('Ensure images have alt text');

  return {
    complexity,
    modernityScore,
    accessibilityNotes,
  };
}
