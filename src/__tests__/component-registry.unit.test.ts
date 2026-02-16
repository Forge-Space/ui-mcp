import {
  registerSnippet,
  registerSnippets,
  getSnippetById,
  getRegistrySize,
  searchComponents,
  getVariants,
  getAvailableTypes,
  getByCategory,
  getByMood,
  getByIndustry,
  applyVisualStyle,
  injectAnimations,
  composeSection,
  getBestMatch,
} from '../lib/design-references/component-registry/index.js';
import { initializeRegistry, isRegistryInitialized, resetInitialization } from '../lib/design-references/component-registry/init.js';
import type { IComponentSnippet } from '../lib/design-references/component-registry/types.js';

// ── Helper: minimal valid snippet ──────────────────────────

function makeSnippet(overrides: Partial<IComponentSnippet> = {}): IComponentSnippet {
  return {
    id: overrides.id ?? 'test-button-primary',
    name: overrides.name ?? 'Test Button',
    type: 'button',
    variant: 'primary',
    category: 'atom',
    mood: ['professional'],
    industry: ['general'],
    visualStyles: ['linear-modern'],
    tags: ['cta', 'action'],
    tailwindClasses: { root: 'px-4 py-2 rounded-lg bg-blue-600 text-white' },
    jsx: '<button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Click me</button>',
    a11y: {
      roles: ['button'],
      ariaAttributes: ['aria-label'],
      keyboardNav: 'Enter/Space to activate',
      contrastRatio: '7:1',
      focusVisible: true,
      reducedMotion: false,
    },
    responsive: { strategy: 'mobile-first', breakpoints: ['sm', 'md', 'lg'] },
    quality: {
      antiGeneric: ['custom-radius', 'brand-colors'],
      inspirationSource: 'linear.app',
      craftDetails: ['subtle-shadow', 'micro-interaction'],
    },
    ...overrides,
  };
}

// ── Registry CRUD ──────────────────────────────────────────

describe('component-registry CRUD', () => {
  beforeEach(() => {
    // Re-initialize to get a clean registry state
    resetInitialization();
    initializeRegistry();
  });

  it('initializeRegistry populates the registry', () => {
    expect(getRegistrySize()).toBeGreaterThan(0);
    expect(isRegistryInitialized()).toBe(true);
  });

  it('calling initializeRegistry twice is idempotent', () => {
    const size1 = getRegistrySize();
    initializeRegistry();
    expect(getRegistrySize()).toBe(size1);
  });

  it('registerSnippet adds a new snippet', () => {
    const before = getRegistrySize();
    registerSnippet(makeSnippet({ id: 'crud-test-unique-1' }));
    expect(getRegistrySize()).toBe(before + 1);
  });

  it('registerSnippet updates existing snippet by id', () => {
    const snippet = makeSnippet({ id: 'crud-test-update' });
    registerSnippet(snippet);
    const sizeBefore = getRegistrySize();
    registerSnippet({ ...snippet, variant: 'updated-variant' });
    expect(getRegistrySize()).toBe(sizeBefore);
    expect(getSnippetById('crud-test-update')?.variant).toBe('updated-variant');
  });

  it('registerSnippets adds multiple at once', () => {
    const before = getRegistrySize();
    registerSnippets([
      makeSnippet({ id: 'bulk-1' }),
      makeSnippet({ id: 'bulk-2' }),
    ]);
    expect(getRegistrySize()).toBe(before + 2);
  });

  it('getSnippetById returns undefined for unknown id', () => {
    expect(getSnippetById('nonexistent-xyz-123')).toBeUndefined();
  });
});

// ── Search & Query ─────────────────────────────────────────

describe('component-registry search', () => {
  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
  });

  it('searchComponents returns empty for empty query on empty registry', () => {
    // Register nothing extra — just use the initialized registry
    const results = searchComponents({ type: 'nonexistent-widget-xyz' });
    expect(results).toEqual([]);
  });

  it('searchComponents returns results for known type', () => {
    const results = searchComponents({ type: 'button' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.score).toBeGreaterThan(0);
    expect(results[0]!.snippet.type).toBe('button');
  });

  it('search scores type match higher than partial match', () => {
    registerSnippet(makeSnippet({ id: 'exact-hero', type: 'hero', variant: 'centered' }));
    registerSnippet(makeSnippet({ id: 'partial-hero-card', type: 'hero-card', variant: 'default' }));

    const results = searchComponents({ type: 'hero' });
    const exactResult = results.find((r) => r.snippet.id === 'exact-hero');
    const partialResult = results.find((r) => r.snippet.id === 'partial-hero-card');

    expect(exactResult).toBeDefined();
    expect(partialResult).toBeDefined();

    if (!exactResult || !partialResult) {
      throw new Error('searchComponents failed to return expected results');
    }

    expect(exactResult.score).toBeGreaterThan(partialResult.score);
  });

  it('search with mood filter boosts matching snippets', () => {
    registerSnippet(makeSnippet({ id: 'bold-btn', mood: ['bold'], type: 'button', variant: 'bold-cta' }));
    registerSnippet(makeSnippet({ id: 'calm-btn', mood: ['calm'], type: 'button', variant: 'calm-cta' }));

    const results = searchComponents({ type: 'button', mood: 'bold' });
    const boldResult = results.find((r) => r.snippet.id === 'bold-btn');
    const calmResult = results.find((r) => r.snippet.id === 'calm-btn');

    expect(boldResult).toBeDefined();
    expect(calmResult).toBeDefined();
    expect(boldResult!.score).toBeGreaterThan(calmResult!.score);
  });

  it('search with industry filter boosts matching snippets', () => {
    registerSnippet(makeSnippet({ id: 'saas-card', industry: ['saas'], type: 'card', variant: 'saas-v' }));
    registerSnippet(makeSnippet({ id: 'general-card', industry: ['general'], type: 'card', variant: 'gen-v' }));

    const results = searchComponents({ type: 'card', industry: 'saas' });
    const saasResult = results.find((r) => r.snippet.id === 'saas-card');
    const generalResult = results.find((r) => r.snippet.id === 'general-card');

    expect(saasResult).toBeDefined();
    expect(generalResult).toBeDefined();
    expect(saasResult!.score).toBeGreaterThan(generalResult!.score);
  });

  it('search with visual style filter works', () => {
    registerSnippet(makeSnippet({ id: 'glass-btn', visualStyles: ['glassmorphism'], type: 'button', variant: 'glass-v' }));
    const results = searchComponents({ type: 'button', style: 'glassmorphism' });
    const glassResult = results.find((r) => r.snippet.id === 'glass-btn');
    expect(glassResult).toBeDefined();
    expect(glassResult!.score).toBeGreaterThan(0);
  });

  it('search with tags filter works', () => {
    registerSnippet(makeSnippet({ id: 'tag-test', tags: ['hero', 'landing'], type: 'section', variant: 'tag-v' }));
    const results = searchComponents({ type: 'section', tags: ['hero', 'landing'] });
    const tagResult = results.find((r) => r.snippet.id === 'tag-test');
    expect(tagResult).toBeDefined();
  });

  it('mood affinity gives partial score for related moods', () => {
    registerSnippet(makeSnippet({ id: 'minimal-comp', mood: ['minimal'], type: 'input', variant: 'min-v' }));
    // 'calm' is related to 'minimal' via affinities
    const results = searchComponents({ type: 'input', mood: 'calm' });
    const result = results.find((r) => r.snippet.id === 'minimal-comp');
    expect(result).toBeDefined();
    expect(result!.score).toBeGreaterThan(0);
  });
});

// ── Filter helpers ─────────────────────────────────────────

describe('component-registry filters', () => {
  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
  });

  it('getVariants returns snippets for a given type', () => {
    const variants = getVariants('button');
    expect(variants.length).toBeGreaterThan(0);
    expect(variants.every((v) => v.type === 'button')).toBe(true);
  });

  it('getAvailableTypes returns unique types', () => {
    const types = getAvailableTypes();
    expect(types.length).toBeGreaterThan(0);
    expect(new Set(types).size).toBe(types.length);
  });

  it('getByCategory returns atom snippets', () => {
    const atoms = getByCategory('atom');
    expect(atoms.length).toBeGreaterThan(0);
    expect(atoms.every((a) => a.category === 'atom')).toBe(true);
  });

  it('getByCategory returns molecule snippets', () => {
    const molecules = getByCategory('molecule');
    expect(molecules.length).toBeGreaterThan(0);
    expect(molecules.every((m) => m.category === 'molecule')).toBe(true);
  });

  it('getByCategory returns organism snippets', () => {
    const organisms = getByCategory('organism');
    expect(organisms.length).toBeGreaterThan(0);
    expect(organisms.every((o) => o.category === 'organism')).toBe(true);
  });

  it('getByMood returns snippets matching mood', () => {
    const professional = getByMood('professional');
    expect(professional.length).toBeGreaterThan(0);
    expect(professional.every((s) => s.mood.includes('professional'))).toBe(true);
  });

  it('getByIndustry returns snippets matching industry', () => {
    const general = getByIndustry('general');
    expect(general.length).toBeGreaterThan(0);
    expect(general.every((s) => s.industry.includes('general'))).toBe(true);
  });
});

// ── getBestMatch ───────────────────────────────────────────

describe('component-registry getBestMatch', () => {
  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
  });

  it('returns a snippet for a known type', () => {
    const match = getBestMatch('button');
    expect(match).toBeDefined();
    expect(match!.type).toBe('button');
  });

  it('returns undefined for unknown type', () => {
    const match = getBestMatch('nonexistent-widget-xyz');
    expect(match).toBeUndefined();
  });

  it('prefers exact variant match', () => {
    registerSnippet(makeSnippet({ id: 'exact-var-test', type: 'button', variant: 'ghost' }));
    const match = getBestMatch('button', { variant: 'ghost' });
    expect(match).toBeDefined();
    expect(match!.variant).toBe('ghost');
  });
});

// ── Visual Style Application ──────────────────────────────

describe('component-registry applyVisualStyle', () => {
  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
  });

  it('returns original snippet for unknown style id', () => {
    const snippet = makeSnippet();
    const result = applyVisualStyle(snippet, 'nonexistent-style' as any);
    expect(result.tailwindClasses).toEqual(snippet.tailwindClasses);
  });

  it('applies glassmorphism style modifiers', () => {
    const snippet = makeSnippet({ tailwindClasses: { root: 'bg-white p-4' } });
    const result = applyVisualStyle(snippet, 'glassmorphism');
    // Should have modified classes (glassmorphism adds backdrop-blur etc.)
    expect(result.tailwindClasses.root).not.toBe(snippet.tailwindClasses.root);
  });
});

// ── Animation Injection ───────────────────────────────────

describe('component-registry injectAnimations', () => {
  it('returns original snippet for unknown animation ids', () => {
    const snippet = makeSnippet();
    const result = injectAnimations(snippet, ['nonexistent-anim-xyz']);
    expect(result.tailwindClasses).toEqual(snippet.tailwindClasses);
  });

  it('injects known animation classes into root', () => {
    const snippet = makeSnippet({ tailwindClasses: { root: 'p-4' } });
    const result = injectAnimations(snippet, ['fade-up']);
    expect(result.tailwindClasses.root).toContain('animate-in');
    expect(result.animations).toContain('fade-up');
  });

  it('appends multiple animation ids', () => {
    const snippet = makeSnippet({ tailwindClasses: { root: 'p-4' } });
    const result = injectAnimations(snippet, ['fade-up', 'fade-in']);
    expect(result.animations).toContain('fade-up');
    expect(result.animations).toContain('fade-in');
  });
});

// ── composeSection ─────────────────────────────────────────

describe('component-registry composeSection', () => {
  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
  });

  it('returns a snippet for known organism type', () => {
    const section = composeSection('hero');
    expect(section).toBeDefined();
    expect(section!.category).toBe('organism');
    expect(section!.type).toBe('hero');
  });

  it('returns an organism even for unknown type (category fallback)', () => {
    // composeSection always queries category:'organism', so any organism
    // gets a non-zero score from the category match alone
    const section = composeSection('zzz-no-match-widget');
    expect(section).toBeDefined();
    expect(section!.category).toBe('organism');
  });

  it('applies visual style when provided', () => {
    const plain = composeSection('hero');
    const styled = composeSection('hero', { style: 'glassmorphism' });
    expect(styled).toBeDefined();
    // Styled version should have different classes than plain
    if (plain && styled) {
      const plainRoot = Object.values(plain.tailwindClasses).join(' ');
      const styledRoot = Object.values(styled.tailwindClasses).join(' ');
      expect(styledRoot).not.toBe(plainRoot);
    }
  });
});
