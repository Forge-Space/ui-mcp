import { validateSnippet, validateSnippetStrict } from '../lib/quality/anti-generic-rules.js';
import type { IComponentSnippet } from '../lib/design-references/component-registry/types.js';

function makeSnippet(overrides: Partial<IComponentSnippet> = {}): IComponentSnippet {
  return {
    id: 'test-quality',
    name: 'Test Component',
    type: 'button',
    variant: 'primary',
    category: 'atom',
    mood: ['professional'],
    industry: ['general'],
    visualStyles: ['linear-modern'],
    tags: ['cta'],
    tailwindClasses: { root: 'px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium' },
    jsx: '<button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Action</button>',
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Enter/Space',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: true,
    },
    responsive: { strategy: 'mobile-first', breakpoints: [] },
    quality: {
      antiGeneric: ['custom-radius not default', 'brand-aware color tokens'],
      inspirationSource: 'linear.app',
      craftDetails: ['subtle-shadow on hover', '8pt grid aligned'],
    },
    ...overrides,
  };
}

describe('quality validation rules', () => {
  it('valid snippet passes validation', () => {
    const result = validateSnippet(makeSnippet());
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('catches raw color literal in tailwindClasses', () => {
    const result = validateSnippet(
      makeSnippet({
        tailwindClasses: { root: 'bg-red-500 text-white' },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Raw color literal'))).toBe(true);
  });

  it('catches bg- prefix raw colors', () => {
    const result = validateSnippet(
      makeSnippet({
        tailwindClasses: { root: 'bg-emerald-50 text-white' },
      })
    );
    expect(result.valid).toBe(false);
  });

  it('catches text- prefix raw colors', () => {
    const result = validateSnippet(
      makeSnippet({
        tailwindClasses: { root: 'text-amber-700' },
      })
    );
    expect(result.valid).toBe(false);
  });

  it('catches ring- prefix raw colors', () => {
    const result = validateSnippet(
      makeSnippet({
        tailwindClasses: { root: 'ring-red-600' },
      })
    );
    expect(result.valid).toBe(false);
  });

  it('exempts gradient prefixes (from/via/to)', () => {
    const result = validateSnippet(
      makeSnippet({
        tailwindClasses: {
          root: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
        },
      })
    );
    expect(result.errors.filter((e) => e.includes('Raw color literal'))).toHaveLength(0);
  });

  it('does NOT flag placeholder HTML attributes', () => {
    const result = validateSnippet(
      makeSnippet({
        jsx: '<input placeholder="Enter your email" className="..." />',
      })
    );
    expect(result.errors.filter((e) => e.includes('Placeholder content'))).toHaveLength(0);
  });

  it('does NOT flag Tailwind placeholder modifier', () => {
    const result = validateSnippet(
      makeSnippet({
        jsx: '<input className="placeholder:text-muted-foreground" />',
      })
    );
    expect(result.errors.filter((e) => e.includes('Placeholder content'))).toHaveLength(0);
  });

  it('catches actual placeholder text content', () => {
    const result = validateSnippet(
      makeSnippet({
        jsx: '<p>placeholder text</p>',
      })
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Placeholder content'))).toBe(true);
  });

  it('catches lorem ipsum', () => {
    const result = validateSnippet(
      makeSnippet({
        jsx: '<p>Lorem Ipsum dolor sit amet</p>',
      })
    );
    expect(result.valid).toBe(false);
  });

  it('requires 2+ antiGeneric markers', () => {
    const result = validateSnippet(
      makeSnippet({
        quality: {
          antiGeneric: ['only-one'],
          inspirationSource: 'test',
          craftDetails: ['detail-1', 'detail-2'],
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('antiGeneric'))).toBe(true);
  });

  it('requires 2+ craftDetails', () => {
    const result = validateSnippet(
      makeSnippet({
        quality: {
          antiGeneric: ['marker-1', 'marker-2'],
          inspirationSource: 'test',
          craftDetails: ['only-one'],
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('craftDetails'))).toBe(true);
  });

  it('requires inspirationSource', () => {
    const result = validateSnippet(
      makeSnippet({
        quality: {
          antiGeneric: ['marker-1', 'marker-2'],
          inspirationSource: '',
          craftDetails: ['detail-1', 'detail-2'],
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('inspirationSource'))).toBe(true);
  });

  it('strict validation requires focusVisible', () => {
    const result = validateSnippetStrict(
      makeSnippet({
        a11y: {
          roles: ['button'],
          ariaAttributes: ['aria-label'],
          keyboardNav: 'Enter',
          contrastRatio: '7:1',
          focusVisible: false,
          reducedMotion: true,
        },
      })
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('focusVisible'))).toBe(true);
  });
});
