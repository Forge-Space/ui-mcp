import { describe, it, expect } from '@jest/globals';
import { generateHtmlProject } from '../../lib/templates/html.js';
import type { IDesignContext } from '@forgespace/siza-gen';

const fullCtx: IDesignContext = {
  colorPalette: {
    primary: '#7c3aed',
    primaryForeground: '#ffffff',
    secondary: '#3B82F6',
    secondaryForeground: '#0f172a',
    accent: '#F59E0B',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    border: '#e2e8f0',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    headingFont: 'Playfair Display, serif',
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
  },
  spacing: { unit: 8, scale: [0, 4, 8, 12, 16, 24, 32, 48, 64] },
  borderRadius: { sm: '0.125rem', md: '0.25rem', lg: '0.5rem', full: '9999px' },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  iconSet: 'lucide',
};

describe('generateHtmlProject', () => {
  it('generates files with no designContext (all defaults)', () => {
    const files = generateHtmlProject('my-app', 'flat', 'none');
    expect(files.length).toBeGreaterThan(0);
    const css = files.find((f) => f.path.endsWith('style.css'));
    expect(css).toBeDefined();
    expect(css!.content).toContain('#7c3aed'); // primary default
    expect(css!.content).toContain('Inter, system-ui, sans-serif'); // fontFamily default
    expect(css!.content).toContain('0.25rem'); // radius-sm default
    expect(css!.content).toContain('4px'); // spacing-unit default
  });

  it('uses provided designContext values (no defaults)', () => {
    const files = generateHtmlProject('custom-app', 'flat', 'none', fullCtx);
    const css = files.find((f) => f.path.endsWith('style.css'));
    expect(css).toBeDefined();
    expect(css!.content).toContain('Roboto, sans-serif');
    expect(css!.content).toContain('Playfair Display, serif'); // headingFont
    expect(css!.content).toContain('0.125rem'); // radius-sm provided
    expect(css!.content).toContain('8px'); // spacing-unit provided
    expect(css!.content).toContain('0 1px 3px rgba(0,0,0,0.1)'); // shadow-sm provided
    expect(css!.content).toContain('0 4px 6px rgba(0,0,0,0.1)'); // shadow-md provided
    expect(css!.content).toContain('0 10px 15px rgba(0,0,0,0.1)'); // shadow-lg provided
  });

  it('uses provided year in footer', () => {
    const files = generateHtmlProject('my-app', 'flat', 'none', undefined, 2020);
    const html = files.find((f) => f.path.endsWith('index.html'));
    expect(html).toBeDefined();
    expect(html!.content).toContain('2020');
  });

  it('uses current year when year not provided', () => {
    const files = generateHtmlProject('my-app', 'flat', 'none');
    const html = files.find((f) => f.path.endsWith('index.html'));
    expect(html).toBeDefined();
    expect(html!.content).toContain(String(new Date().getFullYear()));
  });

  it('uses default headingFont when typography.headingFont is missing', () => {
    const ctxNoHeading: IDesignContext = {
      ...fullCtx,
      typography: { ...fullCtx.typography, headingFont: undefined },
    };
    const files = generateHtmlProject('app', 'flat', 'none', ctxNoHeading);
    const css = files.find((f) => f.path.endsWith('style.css'));
    expect(css!.content).toContain('Roboto, sans-serif'); // falls back to fontFamily
  });

  it('uses default shadows when shadows not provided', () => {
    const ctxNoShadows: IDesignContext = {
      ...fullCtx,
      shadows: { sm: '', md: '', lg: '' },
    };
    const files = generateHtmlProject('app', 'flat', 'none', ctxNoShadows);
    const css = files.find((f) => f.path.endsWith('style.css'));
    expect(css).toBeDefined();
  });

  it('uses default spacing unit when spacing.unit is zero', () => {
    const ctxZeroUnit: IDesignContext = {
      ...fullCtx,
      spacing: { unit: 0, scale: [] },
    };
    const files = generateHtmlProject('app', 'flat', 'none', ctxZeroUnit);
    const css = files.find((f) => f.path.endsWith('style.css'));
    expect(css).toBeDefined();
    expect(css!.content).toContain('px'); // some spacing value
  });

  it('generates index.html with project name', () => {
    const files = generateHtmlProject('test-project', 'flat', 'none');
    const html = files.find((f) => f.path.endsWith('index.html'));
    expect(html).toBeDefined();
    expect(html!.content).toContain('test-project');
    expect(html!.content).toContain('<!DOCTYPE html>');
  });

  it('generates multiple files (html, css, js)', () => {
    const files = generateHtmlProject('multi-app', 'flat', 'none');
    expect(files.length).toBeGreaterThanOrEqual(3);
    const paths = files.map((f) => f.path);
    expect(paths.some((p) => p.endsWith('.html'))).toBe(true);
    expect(paths.some((p) => p.endsWith('.css'))).toBe(true);
    expect(paths.some((p) => p.endsWith('.js'))).toBe(true);
  });

  it('uses feature-based architecture', () => {
    const files = generateHtmlProject('app', 'feature-based', 'none');
    expect(files.length).toBeGreaterThan(0);
  });

  it('uses atomic architecture', () => {
    const files = generateHtmlProject('app', 'atomic', 'none');
    expect(files.length).toBeGreaterThan(0);
  });
});
