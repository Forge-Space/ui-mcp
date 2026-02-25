import { loadConfig } from '@forgespace/siza-gen';
import type { IScrapedPage, IImageAnalysis, IPatternMatch } from '@forgespace/siza-gen';

let detectCommonPatterns: typeof import('../lib/pattern-detector.js').detectCommonPatterns;
let buildSuggestedContext: typeof import('../lib/pattern-detector.js').buildSuggestedContext;

beforeAll(async () => {
  loadConfig();
  const mod = await import('../lib/pattern-detector.js');
  detectCommonPatterns = mod.detectCommonPatterns;
  buildSuggestedContext = mod.buildSuggestedContext;
});

function makePage(overrides: Partial<IScrapedPage> = {}): IScrapedPage {
  return {
    url: 'https://example.com',
    title: 'Example',
    colors: ['rgb(37, 99, 235)', '#ffffff', '#0f172a'],
    fonts: ['Inter', 'system-ui'],
    fontSizes: ['16px', '14px', '24px'],
    spacing: ['16px', '24px', '8px'],
    layoutPatterns: ['flexbox', 'css-grid'],
    componentTypes: ['navigation', 'header', 'button', 'form'],
    meta: {},
    ...overrides,
  };
}

function makeImageAnalysis(overrides: Partial<IImageAnalysis> = {}): IImageAnalysis {
  return {
    label: 'test-image',
    dominantColors: [
      { hex: '#2563eb', percentage: 40 },
      { hex: '#ffffff', percentage: 35 },
      { hex: '#0f172a', percentage: 25 },
    ],
    layoutRegions: [
      { role: 'header', bounds: { x: 0, y: 0, w: 1440, h: 80 } },
      { role: 'main-content', bounds: { x: 0, y: 80, w: 1440, h: 720 } },
      { role: 'footer', bounds: { x: 0, y: 800, w: 1440, h: 100 } },
    ],
    detectedComponents: ['navigation', 'header', 'footer', 'content-section'],
    dimensions: { width: 1440, height: 900 },
    ...overrides,
  };
}

describe('pattern-detector', () => {
  describe('detectCommonPatterns', () => {
    it('returns empty array when no sources provided', () => {
      const patterns = detectCommonPatterns({ scrapedPages: [], imageAnalyses: [] });
      expect(patterns).toEqual([]);
    });

    it('detects color patterns from a single page', () => {
      const page = makePage();
      const patterns = detectCommonPatterns({ scrapedPages: [page], imageAnalyses: [] });

      const colorPatterns = patterns.filter((p) => p.category === 'color');
      expect(colorPatterns.length).toBeGreaterThan(0);
      for (const cp of colorPatterns) {
        expect(cp.pattern).toMatch(/^#[0-9a-f]{6}$/);
        expect(cp.confidence).toBeGreaterThan(0);
        expect(cp.sources.length).toBeGreaterThan(0);
      }
    });

    it('detects typography patterns from pages', () => {
      const page = makePage({ fonts: ['Roboto', 'Open Sans'] });
      const patterns = detectCommonPatterns({ scrapedPages: [page], imageAnalyses: [] });

      const fontPatterns = patterns.filter((p) => p.category === 'typography');
      expect(fontPatterns.length).toBeGreaterThan(0);
      const fontNames = fontPatterns.map((p) => p.pattern);
      expect(fontNames).toContain('roboto');
    });

    it('filters out system fonts from typography patterns', () => {
      const page = makePage({ fonts: ['system-ui', 'Arial', 'Helvetica', 'Roboto'] });
      const patterns = detectCommonPatterns({ scrapedPages: [page], imageAnalyses: [] });

      const fontPatterns = patterns.filter((p) => p.category === 'typography');
      const fontNames = fontPatterns.map((p) => p.pattern);
      expect(fontNames).not.toContain('system-ui');
      expect(fontNames).not.toContain('arial');
      expect(fontNames).not.toContain('helvetica');
      expect(fontNames).toContain('roboto');
    });

    it('detects layout patterns from pages', () => {
      const page = makePage({ layoutPatterns: ['flexbox', 'tailwindcss'] });
      const patterns = detectCommonPatterns({ scrapedPages: [page], imageAnalyses: [] });

      const layoutPatterns = patterns.filter((p) => p.category === 'layout');
      const layoutNames = layoutPatterns.map((p) => p.pattern);
      expect(layoutNames).toContain('flexbox');
      expect(layoutNames).toContain('tailwindcss');
    });

    it('detects component patterns from pages and images', () => {
      const page = makePage({ componentTypes: ['navigation', 'button', 'card'] });
      const img = makeImageAnalysis({ detectedComponents: ['navigation', 'header', 'footer'] });
      const patterns = detectCommonPatterns({ scrapedPages: [page], imageAnalyses: [img] });

      const compPatterns = patterns.filter((p) => p.category === 'component');
      const compNames = compPatterns.map((p) => p.pattern);
      expect(compNames).toContain('navigation');
    });

    it('increases confidence when pattern appears in multiple sources', () => {
      const page1 = makePage({ url: 'https://site1.com', componentTypes: ['navigation', 'button'] });
      const page2 = makePage({ url: 'https://site2.com', componentTypes: ['navigation', 'card'] });
      const patterns = detectCommonPatterns({ scrapedPages: [page1, page2], imageAnalyses: [] });

      const navPattern = patterns.find((p) => p.category === 'component' && p.pattern === 'navigation');
      expect(navPattern).toBeDefined();
      expect(navPattern!.confidence).toBe(1);
      expect(navPattern!.sources.length).toBe(2);
    });

    it('detects spacing patterns from pages', () => {
      const page = makePage({ spacing: ['16px', '24px', '8px'] });
      const patterns = detectCommonPatterns({ scrapedPages: [page], imageAnalyses: [] });

      const spacingPatterns = patterns.filter((p) => p.category === 'spacing');
      expect(spacingPatterns.length).toBeGreaterThan(0);
    });

    it('detects patterns from image analyses only', () => {
      const img = makeImageAnalysis();
      const patterns = detectCommonPatterns({ scrapedPages: [], imageAnalyses: [img] });

      expect(patterns.length).toBeGreaterThan(0);
      const categories = new Set(patterns.map((p) => p.category));
      expect(categories.has('color')).toBe(true);
      expect(categories.has('layout')).toBe(true);
      expect(categories.has('component')).toBe(true);
    });

    it('sorts patterns by confidence descending', () => {
      const page1 = makePage({ url: 'https://a.com', colors: ['#ff0000', '#00ff00'] });
      const page2 = makePage({ url: 'https://b.com', colors: ['#ff0000', '#0000ff'] });
      const patterns = detectCommonPatterns({ scrapedPages: [page1, page2], imageAnalyses: [] });

      for (let i = 1; i < patterns.length; i++) {
        expect(patterns[i].confidence).toBeLessThanOrEqual(patterns[i - 1].confidence);
      }
    });
  });

  describe('buildSuggestedContext', () => {
    it('returns empty object when no patterns provided', () => {
      const ctx = buildSuggestedContext([]);
      expect(Object.keys(ctx).length).toBe(0);
    });

    it('builds color palette from color patterns', () => {
      const patterns: IPatternMatch[] = [
        { category: 'color', pattern: '#2563eb', confidence: 1, sources: ['a'] },
        { category: 'color', pattern: '#64748b', confidence: 0.8, sources: ['a'] },
        { category: 'color', pattern: '#f59e0b', confidence: 0.6, sources: ['a'] },
      ];
      const ctx = buildSuggestedContext(patterns);

      expect(ctx.colorPalette).toBeDefined();
      expect(ctx.colorPalette!.primary).toBe('#2563eb');
      expect(ctx.colorPalette!.secondary).toBe('#64748b');
      expect(ctx.colorPalette!.accent).toBe('#f59e0b');
    });

    it('builds typography from font patterns', () => {
      const patterns: IPatternMatch[] = [
        { category: 'typography', pattern: 'Inter', confidence: 1, sources: ['a'] },
        { category: 'typography', pattern: 'Manrope', confidence: 0.5, sources: ['a'] },
      ];
      const ctx = buildSuggestedContext(patterns);

      expect(ctx.typography).toBeDefined();
      expect(ctx.typography!.fontFamily).toContain('Inter');
      expect(ctx.typography!.headingFont).toBe('Manrope');
    });

    it('uses first font as heading when only one font pattern', () => {
      const patterns: IPatternMatch[] = [{ category: 'typography', pattern: 'Roboto', confidence: 1, sources: ['a'] }];
      const ctx = buildSuggestedContext(patterns);

      expect(ctx.typography!.fontFamily).toContain('Roboto');
      expect(ctx.typography!.headingFont).toBeUndefined();
    });

    it('ignores non-color/typography patterns for context building', () => {
      const patterns: IPatternMatch[] = [
        { category: 'layout', pattern: 'flexbox', confidence: 1, sources: ['a'] },
        { category: 'component', pattern: 'navigation', confidence: 1, sources: ['a'] },
        { category: 'spacing', pattern: '16px', confidence: 1, sources: ['a'] },
      ];
      const ctx = buildSuggestedContext(patterns);

      expect(ctx.colorPalette).toBeUndefined();
      expect(ctx.typography).toBeUndefined();
    });
  });
});
