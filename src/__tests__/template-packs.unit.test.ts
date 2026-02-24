import { describe, it, expect, beforeEach } from '@jest/globals';
import { registerPack, getPack, getAllPacks, searchPacks } from '../lib/design-references/template-packs/index.js';
import { initializePacks } from '../lib/design-references/template-packs/init.js';
import type { ITemplatePack } from '../lib/design-references/template-packs/types.js';

describe('Template Packs', () => {
  beforeEach(() => {
    initializePacks();
  });

  describe('registerPack', () => {
    it('should register a template pack', () => {
      const pack: ITemplatePack = {
        id: 'test-pack',
        name: 'Test Pack',
        description: 'A test template pack',
        appType: 'test',
        pages: [
          {
            path: '/',
            compositionId: 'test-home',
            title: 'Home',
            isIndex: true,
          },
        ],
        theme: {
          colorSystemId: 'test-colors',
          fontPairingId: 'test-fonts',
          visualStyle: 'minimal-editorial',
          mood: 'minimal',
        },
        sharedComponents: ['nav-test'],
        quality: {
          antiGeneric: ['Avoid generic test content'],
          designPhilosophy: 'Test philosophy',
          inspirationSources: ['Test source'],
        },
      };

      registerPack(pack);
      expect(getPack('test-pack')).toEqual(pack);
    });
  });

  describe('getPack', () => {
    it('should retrieve a registered pack by id', () => {
      const pack = getPack('saas-dashboard');
      expect(pack).toBeDefined();
      expect(pack?.id).toBe('saas-dashboard');
      expect(pack?.name).toBe('SaaS Dashboard');
    });

    it('should return undefined for non-existent pack', () => {
      const pack = getPack('non-existent');
      expect(pack).toBeUndefined();
    });
  });

  describe('getAllPacks', () => {
    it('should return all registered packs', () => {
      const packs = getAllPacks();
      expect(packs.length).toBeGreaterThanOrEqual(3);
      const packIds = packs.map((p) => p.id);
      expect(packIds).toContain('saas-dashboard');
      expect(packIds).toContain('startup-landing');
      expect(packIds).toContain('ai-chat-app');
    });
  });

  describe('searchPacks', () => {
    it('should return all packs when no appType specified', () => {
      const packs = searchPacks();
      expect(packs.length).toBeGreaterThanOrEqual(3);
    });

    it('should filter packs by appType', () => {
      const saasPacks = searchPacks('saas');
      expect(saasPacks.length).toBeGreaterThanOrEqual(1);
      expect(saasPacks[0].appType).toBe('saas');
    });

    it('should return empty array for non-existent appType', () => {
      const packs = searchPacks('non-existent');
      expect(packs).toEqual([]);
    });

    it('should be case-insensitive', () => {
      const upperPacks = searchPacks('SAAS');
      const lowerPacks = searchPacks('saas');
      expect(upperPacks).toEqual(lowerPacks);
    });
  });

  describe('SaaS Dashboard Pack', () => {
    it('should have correct structure', () => {
      const pack = getPack('saas-dashboard');
      expect(pack).toBeDefined();
      expect(pack?.pages).toHaveLength(6);
      expect(pack?.theme.colorSystemId).toBe('midnight-sora');
      expect(pack?.theme.visualStyle).toBe('dark-premium');
      expect(pack?.sharedComponents).toContain('nav-sidebar-collapsible');
      expect(pack?.quality.inspirationSources.length).toBeGreaterThan(0);
    });
  });

  describe('Startup Landing Pack', () => {
    it('should have correct structure', () => {
      const pack = getPack('startup-landing');
      expect(pack).toBeDefined();
      expect(pack?.pages).toHaveLength(4);
      expect(pack?.theme.colorSystemId).toBe('zinc-manrope');
      expect(pack?.theme.visualStyle).toBe('minimal-editorial');
      expect(pack?.sharedComponents).toContain('nav-transparent-sticky');
      expect(pack?.quality.inspirationSources.length).toBeGreaterThan(0);
    });
  });

  describe('AI Chat App Pack', () => {
    it('should have correct structure', () => {
      const pack = getPack('ai-chat-app');
      expect(pack).toBeDefined();
      expect(pack?.pages).toHaveLength(3);
      expect(pack?.theme.colorSystemId).toBe('slate-inter');
      expect(pack?.theme.visualStyle).toBe('linear-modern');
      expect(pack?.sharedComponents).toContain('nav-sidebar-conversations');
      expect(pack?.quality.inspirationSources.length).toBeGreaterThan(0);
    });
  });
});
