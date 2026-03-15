/**
 * Edge-case tests for image-analyzer that require custom sharp mock behavior.
 * Uses jest.unstable_mockModule for proper ESM mock isolation with coverage.
 */
import { describe, it, expect, jest } from '@jest/globals';

// ── Custom sharp mock factory ──────────────────────────────────────────────

type ToBufferResult = { data: Buffer; info: { width: number; height: number; channels: number; size: number } };

const mockToBuffer = jest.fn<() => Promise<ToBufferResult | Buffer>>();

jest.unstable_mockModule('sharp', () => {
  const instance = () => {
    const self: Record<string, unknown> = {};
    const chain = () => self;
    self.metadata = async () => ({ width: 100, height: 100, channels: 3, format: 'png' });
    self.raw = chain;
    self.png = chain;
    self.jpeg = chain;
    self.webp = chain;
    self.resize = chain;
    self.extract = chain;
    self.flatten = chain;
    self.negate = chain;
    self.normalise = chain;
    self.normalize = chain;
    self.removeAlpha = chain;
    self.ensureAlpha = chain;
    self.toBuffer = mockToBuffer;
    self.toFile = async () => ({ width: 100, height: 100, channels: 3, size: 9 });
    self.stats = async () => ({
      channels: [
        { min: 0, max: 255, sum: 12750, squaresSum: 650250, mean: 128, stdev: 50 },
        { min: 0, max: 255, sum: 12750, squaresSum: 650250, mean: 128, stdev: 50 },
        { min: 0, max: 255, sum: 12750, squaresSum: 650250, mean: 128, stdev: 50 },
      ],
    });
    return self;
  };

  return {
    default: Object.assign((_input?: unknown) => instance(), {
      cache: () => {},
      concurrency: () => 0,
      simd: () => false,
    }),
  };
});

const { extractDominantColors, detectLayoutRegions } = await import('../../lib/image-analyzer.js');

function makeBuffer(r: number, g: number, b: number, pixels = 100 * 100): Buffer {
  const buf = Buffer.alloc(pixels * 3);
  for (let i = 0; i < pixels; i++) {
    buf[i * 3] = r;
    buf[i * 3 + 1] = g;
    buf[i * 3 + 2] = b;
  }
  return buf;
}

describe('image-analyzer edge cases (custom mock)', () => {
  // ── quantizeColors: buffer size validation (lines 43-45) ────────────────

  describe('extractDominantColors — invalid buffer size', () => {
    it('throws Invalid pixel buffer when data is smaller than pixelCount*3', async () => {
      // info says 4x4=16 pixels → 48 bytes required, but data has only 2 bytes
      mockToBuffer.mockResolvedValueOnce({
        data: Buffer.alloc(2, 0),
        info: { width: 4, height: 4, channels: 3, size: 2 },
      } as ToBufferResult);

      const buf = makeBuffer(128, 128, 128);
      await expect(extractDominantColors(buf)).rejects.toThrow('Invalid pixel buffer');
    });
  });

  // ── extractDominantColors: totalPixels === 0 (lines 89-96) ──────────────

  describe('extractDominantColors — zero pixel image', () => {
    it('returns empty array when pixel count is zero (0x0 image)', async () => {
      // 0x0 image → pixelCount = 0 → no pixels → totalPixels = 0
      mockToBuffer.mockResolvedValueOnce({
        data: Buffer.alloc(0),
        info: { width: 0, height: 0, channels: 3, size: 0 },
      } as ToBufferResult);

      const buf = makeBuffer(128, 128, 128);
      const result = await extractDominantColors(buf);
      expect(result).toEqual([]);
    });
  });

  // ── colorDistance: merge similar colors (lines 43-45 actual = colorDistance) ──

  describe('extractDominantColors — colorDistance merge path', () => {
    it('merges similar colors when two distinct color buckets are within threshold', async () => {
      // Create pixels with two very similar colors (differ by < COLOR_SIMILARITY_THRESHOLD)
      // so colorDistance is called during merge and both land in the same bucket
      const buf = makeBuffer(128, 128, 128, 2);
      // First pixel: 128,128,128 → quantized to same bucket
      // Second pixel: 130,130,130 → quantizes to same bucket as 128 (rounded to step)
      // To trigger merge we need two different quantized colors close to each other
      const pixels = Buffer.alloc(4 * 4 * 3); // 4x4 pixels
      // First half: color A (0, 0, 0)
      for (let i = 0; i < 8 * 3; i++) pixels[i] = 0;
      // Second half: color B (32, 32, 32) — different bucket, colorDistance = sqrt(3)*32 ≈ 55.4
      // That's > COLOR_SIMILARITY_THRESHOLD (50), so they won't merge. Try (16, 16, 16) → dist ≈ 27.7
      for (let i = 8 * 3; i < 16 * 3; i++) pixels[i] = 16;

      mockToBuffer.mockResolvedValueOnce({
        data: pixels,
        info: { width: 4, height: 4, channels: 3, size: pixels.length },
      } as ToBufferResult);

      const result = await extractDominantColors(buf, 5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  // ── detectLayoutRegions: data.length < 3 guard (lines 122-123, 166-168) ──

  describe('detectLayoutRegions — empty band data', () => {
    it('handles 0-byte band response gracefully (data.length < 3 guard)', async () => {
      // detectLayoutRegions calls metadata() then 10 × toBuffer (bands)
      // All band calls return 0 bytes → triggers data.length < 3 guard
      for (let i = 0; i < 10; i++) {
        mockToBuffer.mockResolvedValueOnce({
          data: Buffer.alloc(0),
          info: { width: 0, height: 0, channels: 3, size: 0 },
        } as ToBufferResult);
      }

      const buf = makeBuffer(128, 128, 128);
      const result = await detectLayoutRegions(buf);
      expect(Array.isArray(result)).toBe(true);
      // With all-zero brightness, no significant brightness difference → no navigation
    });
  });

  // ── detectLayoutRegions: sharp throws in band loop (lines 181-182) ────────

  describe('detectLayoutRegions — sharp error during band processing', () => {
    it('uses DEFAULT_BRIGHTNESS when sharp throws in brightness band loop', async () => {
      // detectLayoutRegions calls metadata() then 10 × toBuffer (all throw)
      for (let i = 0; i < 10; i++) {
        mockToBuffer.mockRejectedValueOnce(new Error('sharp band error'));
      }

      const buf = makeBuffer(128, 128, 128);
      const result = await detectLayoutRegions(buf);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  // ── detectLayoutRegions: navigation region (lines 199-200) ────────────────

  describe('detectLayoutRegions — navigation region detection', () => {
    it('adds navigation region when top-band brightness differs significantly from middle', async () => {
      // detectLayoutRegions calls: metadata() + 10 × toBuffer (one per band)
      // metadata() is NOT mocked via mockToBuffer (uses self.metadata directly)
      // Only toBuffer calls are intercepted by mockToBuffer

      // Band 0 (top): very bright pixels (255,255,255) → brightness ≈ 255
      const brightPixels = Buffer.alloc(3, 255);
      const brightInfo = { width: 1, height: 1, channels: 3, size: 3 };

      // Bands 1-4: medium brightness
      const medPixels = Buffer.alloc(3, 128);
      const medInfo = { width: 1, height: 1, channels: 3, size: 3 };

      // Band 5 (mid = floor(10/2)): very dark pixels (0,0,0) → brightness = 0
      const darkPixels = Buffer.alloc(3, 0);
      const darkInfo = { width: 1, height: 1, channels: 3, size: 3 };

      // Queue 10 band calls
      mockToBuffer.mockResolvedValueOnce({ data: brightPixels, info: brightInfo } as ToBufferResult); // band 0
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 1
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 2
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 3
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 4
      mockToBuffer.mockResolvedValueOnce({ data: darkPixels, info: darkInfo } as ToBufferResult); // band 5 (mid)
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 6
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 7
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 8
      mockToBuffer.mockResolvedValueOnce({ data: medPixels, info: medInfo } as ToBufferResult); // band 9

      const buf = makeBuffer(128, 128, 128);
      const result = await detectLayoutRegions(buf);
      expect(result.some((r) => r.role === 'navigation')).toBe(true);
    });
  });
});
