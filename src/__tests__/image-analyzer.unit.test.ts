import sharp from 'sharp';
import type { IImageAnalysis } from '../lib/types.js';

// We test the real sharp-based functions (no mocking needed for unit tests)
let extractDominantColors: typeof import('../lib/image-analyzer.js').extractDominantColors;
let detectLayoutRegions: typeof import('../lib/image-analyzer.js').detectLayoutRegions;
let detectComponentsFromRegions: typeof import('../lib/image-analyzer.js').detectComponentsFromRegions;
let analyzeImage: typeof import('../lib/image-analyzer.js').analyzeImage;

beforeAll(async () => {
  const mod = await import('../lib/image-analyzer.js');
  extractDominantColors = mod.extractDominantColors;
  detectLayoutRegions = mod.detectLayoutRegions;
  detectComponentsFromRegions = mod.detectComponentsFromRegions;
  analyzeImage = mod.analyzeImage;
});

async function createTestImage(
  width: number,
  height: number,
  color: { r: number; g: number; b: number }
): Promise<Buffer> {
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: color,
    },
  })
    .png()
    .toBuffer();
}

async function createGradientImage(width: number, height: number): Promise<Buffer> {
  // Create a simple two-tone image: top half blue, bottom half white
  const topHalf = await sharp({
    create: { width, height: Math.floor(height / 2), channels: 3, background: { r: 37, g: 99, b: 235 } },
  })
    .raw()
    .toBuffer();

  const bottomHalf = await sharp({
    create: { width, height: Math.ceil(height / 2), channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .raw()
    .toBuffer();

  const combined = Buffer.concat([topHalf, bottomHalf]);

  return sharp(combined, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer();
}

describe('image-analyzer', () => {
  describe('extractDominantColors', () => {
    it('extracts dominant color from a solid-color image', async () => {
      const redImage = await createTestImage(100, 100, { r: 255, g: 0, b: 0 });
      const colors = await extractDominantColors(redImage, 5);

      expect(colors.length).toBeGreaterThan(0);
      // The dominant color should be close to red
      const dominant = colors[0];
      expect(dominant.percentage).toBeGreaterThan(50);
      expect(dominant.hex).toMatch(/^#[0-9a-f]{6}$/);
    });

    it('extracts multiple colors from a multi-color image', async () => {
      const image = await createGradientImage(200, 200);
      const colors = await extractDominantColors(image, 8);

      expect(colors.length).toBeGreaterThanOrEqual(2);
      // Should have both a blue-ish and white-ish color
      const hasBlue = colors.some((c) => {
        const b = parseInt(c.hex.slice(5, 7), 16);
        return b > 150;
      });
      const hasLight = colors.some((c) => {
        const r = parseInt(c.hex.slice(1, 3), 16);
        return r > 200;
      });
      expect(hasBlue).toBe(true);
      expect(hasLight).toBe(true);
    });

    it('respects maxColors parameter', async () => {
      const image = await createGradientImage(200, 200);
      const colors = await extractDominantColors(image, 2);
      expect(colors.length).toBeLessThanOrEqual(2);
    });

    it('returns percentages that sum to approximately 100', async () => {
      const image = await createTestImage(100, 100, { r: 0, g: 128, b: 255 });
      const colors = await extractDominantColors(image, 5);
      const totalPercentage = colors.reduce((sum, c) => sum + c.percentage, 0);
      expect(totalPercentage).toBeGreaterThanOrEqual(90);
      expect(totalPercentage).toBeLessThanOrEqual(110);
    });
  });

  describe('detectLayoutRegions', () => {
    it('detects header, main-content, and footer regions', async () => {
      const image = await createGradientImage(1440, 900);
      const regions = await detectLayoutRegions(image);

      expect(regions.length).toBeGreaterThanOrEqual(2);
      const roles = regions.map((r) => r.role);
      expect(roles).toContain('header');
      expect(roles).toContain('main-content');
      expect(roles).toContain('footer');
    });

    it('returns regions with valid bounds', async () => {
      const image = await createTestImage(800, 600, { r: 200, g: 200, b: 200 });
      const regions = await detectLayoutRegions(image);

      for (const region of regions) {
        expect(region.bounds.x).toBeGreaterThanOrEqual(0);
        expect(region.bounds.y).toBeGreaterThanOrEqual(0);
        expect(region.bounds.width).toBeGreaterThan(0);
        expect(region.bounds.height).toBeGreaterThan(0);
      }
    });
  });

  describe('detectComponentsFromRegions', () => {
    it('detects navigation and header from header region', () => {
      const regions = [{ role: 'header', bounds: { x: 0, y: 0, width: 1440, height: 80 } }];
      const components = detectComponentsFromRegions(regions);
      expect(components).toContain('navigation');
      expect(components).toContain('header');
    });

    it('detects footer from footer region', () => {
      const regions = [{ role: 'footer', bounds: { x: 0, y: 800, width: 1440, height: 100 } }];
      const components = detectComponentsFromRegions(regions);
      expect(components).toContain('footer');
    });

    it('detects content-section from main-content region', () => {
      const regions = [{ role: 'main-content', bounds: { x: 0, y: 100, width: 1440, height: 700 } }];
      const components = detectComponentsFromRegions(regions);
      expect(components).toContain('content-section');
    });

    it('detects sidebar from sidebar region', () => {
      const regions = [{ role: 'sidebar', bounds: { x: 0, y: 0, width: 300, height: 900 } }];
      const components = detectComponentsFromRegions(regions);
      expect(components).toContain('sidebar');
    });

    it('returns empty array for unknown regions', () => {
      const regions = [{ role: 'unknown', bounds: { x: 0, y: 0, width: 100, height: 100 } }];
      const components = detectComponentsFromRegions(regions);
      expect(components).toEqual([]);
    });
  });

  describe('analyzeImage', () => {
    it('returns a complete IImageAnalysis object', async () => {
      const image = await createTestImage(800, 600, { r: 37, g: 99, b: 235 });
      const result: IImageAnalysis = await analyzeImage(image, 'test-image');

      expect(result.label).toBe('test-image');
      expect(result.dimensions.width).toBe(800);
      expect(result.dimensions.height).toBe(600);
      expect(result.dominantColors.length).toBeGreaterThan(0);
      expect(result.layoutRegions.length).toBeGreaterThan(0);
      expect(Array.isArray(result.detectedComponents)).toBe(true);
    });

    it('handles small images', async () => {
      const image = await createTestImage(50, 50, { r: 128, g: 128, b: 128 });
      const result = await analyzeImage(image, 'tiny');

      expect(result.dimensions.width).toBe(50);
      expect(result.dimensions.height).toBe(50);
      expect(result.dominantColors.length).toBeGreaterThan(0);
    });
  });
});
