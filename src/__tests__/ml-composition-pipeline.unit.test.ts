import { loadConfig } from '../lib/config.js';
import { generateTemplate } from '../tools/generate-page-template.js';
import { designContextStore } from '../lib/design-context.js';
import { initializeRegistry, resetInitialization } from '../lib/design-references/component-registry/init.js';
import { registerComposition, clearCompositions } from '../lib/design-references/template-compositions/index.js';
import type { IPageComposition } from '../lib/design-references/template-compositions/types.js';
import type { PageTemplateType } from '../lib/types.js';

const MOCK_COMPOSITION: IPageComposition = {
  id: 'test-landing-comp',
  name: 'Test Landing Composition',
  description: 'A test composition for landing pages',
  templateType: 'landing',
  sections: [
    {
      id: 'hero',
      name: 'Hero',
      query: { category: 'organism', tags: ['hero'] },
      containerClasses: 'px-4 py-20',
    },
    {
      id: 'features',
      name: 'Features',
      query: { category: 'organism', tags: ['features'] },
      containerClasses: 'px-4 py-16',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'min-h-screen bg-background',
  mood: ['professional', 'calm'],
  industry: ['saas'],
  visualStyles: ['linear-modern'],
  quality: {
    antiGeneric: ['no bland hero'],
    inspirationSource: 'Linear.app',
    designPhilosophy: 'Clean professional SaaS',
  },
};

describe('ML composition pipeline', () => {
  let ctx: ReturnType<typeof designContextStore.get>;

  beforeAll(() => {
    loadConfig();
  });

  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
    clearCompositions();
    ctx = designContextStore.get();
  });

  afterEach(() => {
    clearCompositions();
  });

  it('falls back to hardcoded when no composition exists', async () => {
    const files = await generateTemplate('error_404', 'react', 'none', false, 'TestApp', ctx, {
      mood: 'professional',
      industry: 'saas',
    });

    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
    expect(files[0].content).toContain('404');
  });

  it('falls back to hardcoded when no ML options provided', async () => {
    registerComposition(MOCK_COMPOSITION);
    const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx);

    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
    expect(files[0].content).toContain('TestApp');
    expect(files[0].content).toContain('Build Faster');
  });

  it('uses composition when available and quality passes', async () => {
    registerComposition(MOCK_COMPOSITION);
    const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx, {
      mood: 'professional',
      industry: 'saas',
      visual_style: 'linear-modern',
    });

    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
    expect(files[0].path).toContain('landing');
  });

  it('works when composition sections have no matching snippets', async () => {
    const emptyComp: IPageComposition = {
      ...MOCK_COMPOSITION,
      id: 'empty-comp',
      sections: [
        {
          id: 'missing',
          name: 'Missing Section',
          query: { category: 'organism', tags: ['nonexistent-tag-xyz'] },
          containerClasses: '',
        },
      ],
    };
    registerComposition(emptyComp);

    const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx, {
      mood: 'professional',
      industry: 'saas',
    });

    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
  });

  it('generates valid output for all frameworks with composition', async () => {
    registerComposition(MOCK_COMPOSITION);
    const frameworks = ['react', 'nextjs', 'vue', 'angular', 'svelte', 'html'] as const;

    for (const fw of frameworks) {
      const files = await generateTemplate('landing', fw, 'none', false, 'TestApp', ctx, {
        mood: 'professional',
        industry: 'saas',
      });
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].path).toBeTruthy();
      expect(files[0].content).toBeTruthy();
    }
  });

  it('backward compatible: works without options param', async () => {
    const files = await generateTemplate('landing', 'react', 'none', false, 'TestApp', ctx);

    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
    expect(files[0].content).toContain('export');
  });

  it.each<PageTemplateType>([
    'landing',
    'dashboard',
    'auth_login',
    'pricing',
    'settings',
    'crud_table',
    'blog_list',
    'onboarding',
    'error_404',
  ])('template %s works with ML options', async (template) => {
    const files = await generateTemplate(template, 'react', 'none', false, 'TestApp', ctx, {
      mood: 'professional',
      industry: 'saas',
    });
    expect(files).toBeDefined();
    expect(files.length).toBeGreaterThan(0);
  });
});
