let rgbToHex: typeof import('../lib/browser-scraper.js').rgbToHex;
let normalizeColors: typeof import('../lib/browser-scraper.js').normalizeColors;

beforeAll(async () => {
  const mod = await import('../lib/browser-scraper.js');
  rgbToHex = mod.rgbToHex;
  normalizeColors = mod.normalizeColors;
});

describe('browser-scraper utilities', () => {
  describe('rgbToHex', () => {
    it('converts rgb(255, 0, 0) to #ff0000', () => {
      expect(rgbToHex('rgb(255, 0, 0)')).toBe('#ff0000');
    });

    it('converts rgb(0, 128, 255) to #0080ff', () => {
      expect(rgbToHex('rgb(0, 128, 255)')).toBe('#0080ff');
    });

    it('converts rgba(37, 99, 235, 1) to #2563eb', () => {
      expect(rgbToHex('rgba(37, 99, 235, 1)')).toBe('#2563eb');
    });

    it('converts rgb(0, 0, 0) to #000000', () => {
      expect(rgbToHex('rgb(0, 0, 0)')).toBe('#000000');
    });

    it('converts rgb(255, 255, 255) to #ffffff', () => {
      expect(rgbToHex('rgb(255, 255, 255)')).toBe('#ffffff');
    });

    it('returns null for invalid input', () => {
      expect(rgbToHex('not-a-color')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(rgbToHex('')).toBeNull();
    });

    it('returns null for hex color input', () => {
      expect(rgbToHex('#ff0000')).toBeNull();
    });
  });

  describe('normalizeColors', () => {
    it('normalizes hex colors to lowercase', () => {
      const result = normalizeColors(['#FF0000', '#00FF00', '#0000FF']);
      expect(result).toContain('#ff0000');
      expect(result).toContain('#00ff00');
      expect(result).toContain('#0000ff');
    });

    it('converts rgb colors to hex', () => {
      const result = normalizeColors(['rgb(255, 0, 0)', 'rgb(0, 128, 255)']);
      expect(result).toContain('#ff0000');
      expect(result).toContain('#0080ff');
    });

    it('handles mixed hex and rgb colors', () => {
      const result = normalizeColors(['#2563eb', 'rgb(255, 255, 255)', '#0f172a']);
      expect(result).toContain('#2563eb');
      expect(result).toContain('#ffffff');
      expect(result).toContain('#0f172a');
    });

    it('deduplicates colors', () => {
      const result = normalizeColors(['#ff0000', 'rgb(255, 0, 0)', '#FF0000']);
      expect(result.length).toBe(1);
      expect(result[0]).toBe('#ff0000');
    });

    it('returns empty array for empty input', () => {
      expect(normalizeColors([])).toEqual([]);
    });

    it('skips invalid rgb values', () => {
      const result = normalizeColors(['not-a-color', '#ff0000']);
      expect(result).toEqual(['#ff0000']);
    });

    it('handles rgba colors', () => {
      const result = normalizeColors(['rgba(37, 99, 235, 0.5)']);
      expect(result).toContain('#2563eb');
    });
  });
});
