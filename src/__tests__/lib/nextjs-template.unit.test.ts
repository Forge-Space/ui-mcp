import { describe, it, expect } from '@jest/globals';
import { generateNextjsProject } from '../../lib/templates/nextjs.js';
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
    fontFamily: 'Roboto',
    headingFont: 'Playfair Display',
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

describe('generateNextjsProject', () => {
  it('generates files without zustand (default state management)', () => {
    const files = generateNextjsProject('my-app', 'flat', 'none');
    expect(files.length).toBeGreaterThan(0);
    const pkg = files.find((f) => f.path.endsWith('package.json'));
    expect(pkg).toBeDefined();
    const pkgContent = JSON.parse(pkg!.content);
    expect(pkgContent.dependencies).not.toHaveProperty('zustand');
    const storeFile = files.find((f) => f.path.includes('use-app-store'));
    expect(storeFile).toBeUndefined();
  });

  it('adds zustand dependency when stateManagement is zustand', () => {
    const files = generateNextjsProject('my-app', 'flat', 'zustand');
    const pkg = files.find((f) => f.path.endsWith('package.json'));
    expect(pkg).toBeDefined();
    const pkgContent = JSON.parse(pkg!.content);
    expect(pkgContent.dependencies).toHaveProperty('zustand');
  });

  it('generates zustand store file when stateManagement is zustand', () => {
    const files = generateNextjsProject('my-app', 'flat', 'zustand');
    const storeFile = files.find((f) => f.path.includes('use-app-store'));
    expect(storeFile).toBeDefined();
    expect(storeFile!.content).toContain('create');
    expect(storeFile!.content).toContain('useAppStore');
  });

  it('uses provided fontFamily in layout.tsx', () => {
    const files = generateNextjsProject('my-app', 'flat', 'none', fullCtx);
    const layout = files.find((f) => f.path.endsWith('layout.tsx'));
    expect(layout).toBeDefined();
    expect(layout!.content).toContain('Roboto');
  });

  it('uses Inter as default font when no designContext provided', () => {
    const files = generateNextjsProject('my-app', 'flat', 'none');
    const layout = files.find((f) => f.path.endsWith('layout.tsx'));
    expect(layout).toBeDefined();
    expect(layout!.content).toContain('Inter');
  });

  it('generates globals.css', () => {
    const files = generateNextjsProject('my-app', 'flat', 'none');
    const css = files.find((f) => f.path.endsWith('globals.css'));
    expect(css).toBeDefined();
  });

  it('generates project with feature-based architecture', () => {
    const files = generateNextjsProject('my-app', 'feature-based', 'none');
    expect(files.length).toBeGreaterThan(0);
  });

  it('generates project with atomic architecture', () => {
    const files = generateNextjsProject('my-app', 'atomic', 'none');
    expect(files.length).toBeGreaterThan(0);
  });

  it('uses project name in package.json', () => {
    const files = generateNextjsProject('test-project', 'flat', 'none');
    const pkg = files.find((f) => f.path.endsWith('package.json'));
    expect(pkg).toBeDefined();
    const pkgContent = JSON.parse(pkg!.content);
    expect(pkgContent.name).toBe('test-project');
  });
});
