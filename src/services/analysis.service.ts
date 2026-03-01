import {
  createLogger,
  type IDesignContext,
  type IFigmaDesignToken,
  type IImageAnalysis,
  type IPatternMatch,
  type IScrapedPage,
  type ITailwindMapping,
} from '@forgespace/siza-gen';
import { analyzeImage } from '../lib/image-analyzer.js';
import { detectCommonPatterns } from '../lib/pattern-detector.js';
import { extractDesignFromUrl } from '../lib/design-extractor.js';

const logger = createLogger('analysis-service');

/**
 * Analysis Service - Handles all image and pattern analysis operations
 */
export class AnalysisService {
  /**
   * Analyze an image for design patterns and tokens
   */
  async analyzeImage(
    imageData: string,
    _options: {
      extractColors?: boolean;
      extractTypography?: boolean;
      extractComponents?: boolean;
    } = {}
  ): Promise<{
    colors: string[];
    typography: Array<{ family: string; size: number; weight: string }>;
    layout: Array<{ type: string; position: { x: number; y: number; width: number; height: number } }>;
    components: Array<{ type: string; confidence: number }>;
    designTokens: IFigmaDesignToken[];
  }> {
    logger.info('Analyzing image for design patterns');

    try {
      const imageBuffer = Buffer.from(imageData, 'base64');
      const analysis = await analyzeImage(imageBuffer, 'design-analysis');

      logger.info(
        `Image analysis complete: ${analysis.dominantColors.length} colors, ${analysis.detectedComponents.length} components`
      );

      return {
        colors: analysis.dominantColors.map((c) => c.hex),
        typography: [],
        layout: analysis.layoutRegions.map((r) => ({
          type: r.role,
          position: r.bounds,
        })),
        components: analysis.detectedComponents.map((c) => ({
          type: c,
          confidence: 0.8,
        })),
        designTokens: [],
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`Image analysis failed: ${msg}`);
      throw new Error(`Image analysis failed: ${msg}`, { cause: err });
    }
  }

  /**
   * Detect patterns from multiple sources
   */
  detectPatterns(
    sources: Array<{
      type: 'url' | 'image' | 'text';
      content: string;
      metadata?: Record<string, unknown>;
    }>
  ): {
    commonPatterns: Array<{ type: string; confidence: number; sources: string[] }>;
    uniquePatterns: Array<{ type: string; pattern: string; confidence: number }>;
    recommendations: string[];
  } {
    logger.info(`Detecting patterns from ${sources.length} sources`);

    try {
      const scrapedPages: IScrapedPage[] = sources
        .filter((s) => s.type === 'url')
        .map((s) => ({
          url: s.content,
          title: String(s.metadata?.title ?? 'Unknown'),
          colors: [] as string[],
          fonts: [] as string[],
          fontSizes: [] as string[],
          spacing: [] as string[],
          layoutPatterns: [] as string[],
          componentTypes: [] as string[],
          meta: {},
        }));

      const imageAnalyses: IImageAnalysis[] = sources
        .filter((s) => s.type === 'image')
        .map((s) => ({
          label: String(s.metadata?.label ?? 'image'),
          dominantColors: [] as { hex: string; percentage: number }[],
          layoutRegions: [] as { role: string; bounds: { x: number; y: number; width: number; height: number } }[],
          detectedComponents: [] as string[],
          dimensions: { width: 0, height: 0 },
        }));

      const patterns = detectCommonPatterns({ scrapedPages, imageAnalyses });

      const commonPatterns = patterns.map((p: IPatternMatch) => ({
        type: p.category,
        confidence: p.confidence,
        sources: p.sources,
      }));

      const uniquePatterns = patterns
        .filter((p: IPatternMatch) => p.sources.length === 1)
        .map((p: IPatternMatch) => ({
          type: p.category,
          pattern: p.pattern,
          confidence: p.confidence,
        }));

      const recommendations = this.generateRecommendations(patterns);

      logger.info(`Pattern detection complete: ${commonPatterns.length} common patterns found`);
      return { commonPatterns, uniquePatterns, recommendations };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`Pattern detection failed: ${msg}`);
      throw new Error(`Pattern detection failed: ${msg}`, { cause: err });
    }
  }

  /**
   * Extract design information from a URL
   */
  async extractFromUrl(
    url: string,
    options: {
      extractColors?: boolean;
      extractTypography?: boolean;
    } = {}
  ): Promise<{
    colors: string[];
    typography: { fonts: string[]; sizes: string[] };
    layoutHints: string[];
  }> {
    logger.info(`Extracting design from URL: ${url}`);

    try {
      const extraction = await extractDesignFromUrl(url, {
        extractColors: options.extractColors ?? true,
        extractTypography: options.extractTypography ?? true,
      });

      logger.info(`URL extraction complete: ${extraction.colors.length} colors found`);
      return extraction;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`URL extraction failed: ${msg}`);
      throw new Error(`URL extraction failed: ${msg}`, { cause: err });
    }
  }

  /**
   * Map design tokens to Tailwind CSS classes
   */
  mapToTailwind(
    designTokens: IFigmaDesignToken[],
    options: {
      includeUtilities?: boolean;
      includeComponents?: boolean;
      customPrefix?: string;
    } = {}
  ): {
    mappings: ITailwindMapping[];
    customClasses: string[];
    configExtensions: Record<string, unknown>;
  } {
    logger.info(`Mapping ${designTokens.length} design tokens to Tailwind CSS`);

    try {
      const mappings: ITailwindMapping[] = [];
      const customClasses: string[] = [];
      const configExtensions: Record<string, unknown> = {};

      for (const token of designTokens) {
        const mapping = this.createTailwindMapping(token);
        if (mapping) {
          mappings.push(mapping);
          if (options.includeUtilities) {
            customClasses.push(this.createUtilityClass(token, options.customPrefix));
          }
          if (options.includeComponents) {
            this.extendConfig(token, configExtensions);
          }
        }
      }

      logger.info(`Tailwind mapping complete: ${mappings.length} mappings created`);
      return { mappings, customClasses, configExtensions };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`Tailwind mapping failed: ${msg}`);
      throw new Error(`Tailwind mapping failed: ${msg}`, { cause: err });
    }
  }

  /**
   * Analyze design context for consistency and improvements
   */
  analyzeDesignContext(context: IDesignContext): {
    score: number;
    issues: Array<{ type: 'error' | 'warning' | 'info'; message: string; suggestion: string }>;
    recommendations: string[];
    completeness: { colors: number; typography: number; spacing: number; borderRadius: number; shadows: number };
  } {
    logger.info('Analyzing design context for consistency');

    const issues: Array<{ type: 'error' | 'warning' | 'info'; message: string; suggestion: string }> = [];
    const recommendations: string[] = [];
    let score = 100;

    if (!context.colorPalette.primary) {
      issues.push({
        type: 'error',
        message: 'Primary color is missing',
        suggestion: 'Add a primary color to the color palette',
      });
      score -= 20;
    }
    if (!context.colorPalette.background) {
      issues.push({ type: 'error', message: 'Background color is missing', suggestion: 'Add a background color' });
      score -= 15;
    }
    if (!context.colorPalette.foreground) {
      issues.push({
        type: 'warning',
        message: 'Foreground color is missing',
        suggestion: 'Add a foreground color for text',
      });
      score -= 10;
    }
    if (!context.typography.fontFamily) {
      issues.push({ type: 'error', message: 'Font family is missing', suggestion: 'Specify a default font family' });
      score -= 15;
    }
    if (!context.typography.headingFont) {
      recommendations.push('Consider specifying a heading font for better hierarchy');
      score -= 5;
    }
    if (!context.spacing.unit || context.spacing.unit <= 0) {
      issues.push({ type: 'error', message: 'Invalid spacing unit', suggestion: 'Set a positive spacing unit value' });
      score -= 10;
    }
    if (!context.spacing.scale || context.spacing.scale.length === 0) {
      recommendations.push('Add a spacing scale for consistent spacing');
      score -= 5;
    }
    if (!context.borderRadius) {
      recommendations.push('Add border radius values for consistent rounded corners');
      score -= 5;
    }
    if (!context.shadows) {
      recommendations.push('Add shadow values for depth and elevation');
      score -= 5;
    }
    if (context.colorPalette.primary && context.colorPalette.primary === context.colorPalette.background) {
      issues.push({
        type: 'error',
        message: 'Primary and background colors are the same',
        suggestion: 'Use contrasting colors',
      });
      score -= 25;
    }

    const completeness = {
      colors: this.calculateCompleteness(context.colorPalette, [
        'primary',
        'secondary',
        'background',
        'foreground',
        'muted',
        'accent',
        'border',
        'destructive',
      ]),
      typography: this.calculateCompleteness(context.typography, [
        'fontFamily',
        'headingFont',
        'fontSize',
        'fontWeight',
        'lineHeight',
      ]),
      spacing: this.calculateCompleteness(context.spacing, ['unit', 'scale']),
      borderRadius: this.calculateCompleteness(context.borderRadius, ['sm', 'md', 'lg', 'full']),
      shadows: this.calculateCompleteness(context.shadows, ['sm', 'md', 'lg']),
    };

    logger.info(`Design context analysis complete: score ${score}/100`);
    return { score: Math.max(0, score), issues, recommendations, completeness };
  }

  private createTailwindMapping(token: IFigmaDesignToken): ITailwindMapping | null {
    const className = token.name.replace(/[/\s]/g, '-').toLowerCase();
    switch (token.category) {
      case 'color':
        return { className: `--color-${className}`, cssProperty: 'color', value: String(token.value) };
      case 'spacing':
        return { className, cssProperty: 'padding', value: `${token.value}px` };
      case 'borderRadius':
        return { className: `rounded-${className}`, cssProperty: 'border-radius', value: `${token.value}px` };
      default:
        return null;
    }
  }

  private createUtilityClass(token: IFigmaDesignToken, prefix?: string): string {
    const className = `${prefix ?? ''}${token.name.replace(/[/\s]/g, '-').toLowerCase()}`;
    switch (token.category) {
      case 'color':
        return `.${className} { color: ${token.value}; }`;
      case 'spacing':
        return `.${className} { padding: ${token.value}px; }`;
      case 'borderRadius':
        return `.${className} { border-radius: ${token.value}px; }`;
      default:
        return `.${className} { /* ${token.category}: ${token.value} */ }`;
    }
  }

  private extendConfig(token: IFigmaDesignToken, config: Record<string, unknown>): void {
    const theme = (config.theme ?? {}) as Record<string, Record<string, unknown>>;
    switch (token.category) {
      case 'color':
        theme.colors = { ...(theme.colors ?? {}), [token.name]: token.value };
        break;
      case 'spacing':
        theme.spacing = { ...(theme.spacing ?? {}), [token.name]: `${token.value}px` };
        break;
      case 'borderRadius':
        theme.borderRadius = { ...(theme.borderRadius ?? {}), [token.name]: `${token.value}px` };
        break;
    }
    config.theme = theme;
  }

  private calculateCompleteness(obj: unknown, requiredKeys: string[]): number {
    if (!obj || typeof obj !== 'object') return 0;
    const record = obj as Record<string, unknown>;
    const present = requiredKeys.filter((k) => record[k] !== undefined && record[k] !== null);
    return Math.round((present.length / requiredKeys.length) * 100);
  }

  private generateRecommendations(patterns: IPatternMatch[]): string[] {
    const recommendations: string[] = [];
    if (patterns.length === 0) {
      recommendations.push('Consider adding more design sources for better pattern detection');
      return recommendations;
    }
    if (patterns.some((p) => p.category === 'color')) {
      recommendations.push('Strong color palette detected - consider using these colors consistently');
    }
    if (patterns.some((p) => p.category === 'typography')) {
      recommendations.push('Typography patterns detected - establish a clear type hierarchy');
    }
    if (patterns.some((p) => p.category === 'layout')) {
      recommendations.push('Layout patterns detected - maintain consistent spacing and alignment');
    }
    return recommendations;
  }
}

export const analysisService = new AnalysisService();
