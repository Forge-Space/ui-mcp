import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '../lib/config.js';
import { registerScaffoldFullApplication } from '../tools/scaffold-full-application.js';
import { initializeRegistry, resetInitialization } from '../lib/design-references/component-registry/init.js';
import {
  registerComposition,
  clearCompositions,
  findBestComposition,
} from '../lib/design-references/template-compositions/index.js';
import type { IPageComposition } from '../lib/design-references/template-compositions/types.js';

const makeLandingComposition = (): IPageComposition => ({
  id: 'test-scaffold-landing',
  name: 'Test Landing',
  description: 'Landing for scaffold tests',
  templateType: 'landing',
  sections: [
    {
      id: 'hero',
      name: 'Hero Section',
      query: { category: 'organism', tags: ['hero'] },
      containerClasses: 'px-4 py-20',
    },
  ],
  layout: 'single-column',
  layoutClasses: 'min-h-screen',
  mood: ['professional'],
  industry: ['saas'],
  visualStyles: ['linear-modern'],
  quality: {
    antiGeneric: [],
    inspirationSource: 'test',
    designPhilosophy: 'test',
  },
});

const makeDashboardComposition = (): IPageComposition => ({
  id: 'test-scaffold-dashboard',
  name: 'Test Dashboard',
  description: 'Dashboard for scaffold tests',
  templateType: 'dashboard',
  sections: [
    {
      id: 'stats',
      name: 'Stats Grid',
      query: { category: 'organism', tags: ['stats'] },
      containerClasses: 'p-6',
    },
  ],
  layout: 'sidebar-left',
  layoutClasses: 'flex min-h-screen',
  mood: ['professional'],
  industry: ['saas'],
  visualStyles: ['linear-modern'],
  quality: {
    antiGeneric: [],
    inspirationSource: 'test',
    designPhilosophy: 'test',
  },
});

describe('scaffold_full_application ML integration', () => {
  beforeAll(() => {
    loadConfig();
  });

  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
    clearCompositions();
  });

  afterEach(() => {
    clearCompositions();
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerScaffoldFullApplication(server)).not.toThrow();
  });

  it('scaffold tool is importable and exports register function', async () => {
    const mod = await import('../tools/scaffold-full-application.js');
    expect(mod.registerScaffoldFullApplication).toBeDefined();
    expect(typeof mod.registerScaffoldFullApplication).toBe('function');
  });

  it('compositions are available after initializeRegistry', () => {
    registerComposition(makeLandingComposition());
    registerComposition(makeDashboardComposition());

    const landing = findBestComposition('landing', {
      mood: ['professional'],
      industry: ['saas'],
    });
    expect(landing).toBeDefined();
    expect(landing!.id).toBe('test-scaffold-landing');

    const dashboard = findBestComposition('dashboard', {
      mood: ['professional'],
    });
    expect(dashboard).toBeDefined();
    expect(dashboard!.id).toBe('test-scaffold-dashboard');
  });

  it('findBestComposition returns undefined for missing types', () => {
    const result = findBestComposition('error_404', {
      mood: ['professional'],
    });
    expect(result).toBeUndefined();
  });

  it('composition scoring selects best match by mood+industry', () => {
    const comp1: IPageComposition = {
      ...makeLandingComposition(),
      id: 'landing-playful',
      mood: ['playful'],
      industry: ['ecommerce'],
    };
    const comp2: IPageComposition = {
      ...makeLandingComposition(),
      id: 'landing-pro-saas',
      mood: ['professional'],
      industry: ['saas'],
    };
    registerComposition(comp1);
    registerComposition(comp2);

    const best = findBestComposition('landing', {
      mood: ['professional'],
      industry: ['saas'],
    });
    expect(best).toBeDefined();
    expect(best!.id).toBe('landing-pro-saas');
  });

  it('clearCompositions resets state', () => {
    registerComposition(makeLandingComposition());
    expect(findBestComposition('landing')).toBeDefined();

    clearCompositions();
    expect(findBestComposition('landing')).toBeUndefined();
  });
});
