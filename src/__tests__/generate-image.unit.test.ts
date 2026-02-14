import { describe, it, expect, vi, beforeEach } from 'vitest';
import { designContextStore } from '../lib/design-context.js';

const MOCK_SVG = '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#f8f9fa"/></svg>';
const MOCK_PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);

vi.mock('satori', () => ({
  default: vi.fn().mockImplementation(async (_jsx: unknown, opts: { width: number; height: number }) =>
    `<svg width="${opts.width}" height="${opts.height}" xmlns="http://www.w3.org/2000/svg"><rect width="${opts.width}" height="${opts.height}" fill="#f8f9fa"/></svg>`
  ),
}));

vi.mock('@resvg/resvg-js', () => ({
  Resvg: vi.fn().mockImplementation(() => ({
    render: () => ({ asPng: () => new Uint8Array(MOCK_PNG) }),
  })),
}));

// Import after mocks are set up
const { renderSvg, renderPng } = await import('../lib/image-renderer.js');

describe('generate_design_image', () => {
  beforeEach(() => {
    designContextStore.reset();
  });

  describe('SVG rendering', () => {
    it('renders wireframe SVG', async () => {
      const svg = await renderSvg({
        description: 'Login form',
        type: 'wireframe',
        width: 800,
        height: 600,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('width="800"');
      expect(svg).toContain('height="600"');
    });

    it('renders mockup SVG', async () => {
      const svg = await renderSvg({
        description: 'Dashboard layout',
        type: 'mockup',
        width: 1200,
        height: 800,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('width="1200"');
    });

    it('renders component preview SVG', async () => {
      const svg = await renderSvg({
        description: 'Button component',
        type: 'component_preview',
        width: 400,
        height: 300,
      });

      expect(svg).toContain('<svg');
    });

    it('uses design context for mockup colors', async () => {
      const ctx = designContextStore.get();
      ctx.colorPalette.primary = '#e11d48';

      const svg = await renderSvg({
        description: 'Test mockup',
        type: 'mockup',
        width: 600,
        height: 400,
        designContext: ctx,
      });

      expect(svg).toContain('<svg');
      expect(svg.length).toBeGreaterThan(50);
    });
  });

  describe('PNG rendering', () => {
    it('renders PNG buffer', async () => {
      const png = await renderPng({
        description: 'Test wireframe',
        type: 'wireframe',
        width: 400,
        height: 300,
      });

      expect(Buffer.isBuffer(png)).toBe(true);
      expect(png.length).toBeGreaterThan(0);
      // PNG magic bytes
      expect(png[0]).toBe(0x89);
      expect(png[1]).toBe(0x50); // P
      expect(png[2]).toBe(0x4e); // N
      expect(png[3]).toBe(0x47); // G
    });

    it('PNG can be base64 encoded', async () => {
      const png = await renderPng({
        description: 'Base64 test',
        type: 'wireframe',
        width: 200,
        height: 200,
      });

      const base64 = png.toString('base64');
      expect(base64.length).toBeGreaterThan(0);
      expect(Buffer.from(base64, 'base64').length).toBe(png.length);
    });
  });
});
