import {
  isSidecarReady,
  getSidecarInfo,
  unloadSidecar,
} from '../lib/ml/sidecar-model.js';
import {
  scoreQuality,
  isLikelyAccepted,
} from '../lib/ml/quality-scorer.js';
import type { IQualityScore } from '../lib/ml/quality-scorer.js';
import {
  enhancePrompt,
  enhanceWithRules,
  needsEnhancement,
} from '../lib/ml/prompt-enhancer.js';
import type { IEnhancedPrompt } from '../lib/ml/prompt-enhancer.js';

// ---- Sidecar Model Tests ----

describe('sidecar-model', () => {
  describe('isSidecarReady', () => {
    it('returns false when no model is loaded', () => {
      expect(isSidecarReady()).toBe(false);
    });
  });

  describe('getSidecarInfo', () => {
    it('returns unloaded state by default', () => {
      const info = getSidecarInfo();
      expect(info.loaded).toBe(false);
      expect(info.modelId).toBeNull();
      expect(info.adapter).toBeNull();
    });
  });

  describe('unloadSidecar', () => {
    it('completes without error when nothing is loaded', async () => {
      await expect(unloadSidecar()).resolves.toBeUndefined();
    });
  });
});

// ---- Quality Scorer Tests ----

describe('quality-scorer', () => {
  const WELL_STRUCTURED_CODE = `
    import React from 'react';

    interface CardProps {
      title: string;
      description: string;
    }

    export default function Card({ title, description }: CardProps) {
      return (
        <article
          className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
          role="article"
          aria-label={title}
        >
          <header>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
              {title}
            </h2>
          </header>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
          <footer className="mt-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              tabIndex={0}
              aria-label="Read more"
            >
              Read More
            </button>
          </footer>
        </article>
      );
    }
  `;

  const MINIMAL_CODE = '<div>Hello</div>';

  const EMPTY_CODE = '';

  describe('scoreQuality', () => {
    it('scores well-structured code higher than minimal code', async () => {
      const goodScore = await scoreQuality('Create a card component', WELL_STRUCTURED_CODE, { componentType: 'card' });
      const badScore = await scoreQuality('Create a card component', MINIMAL_CODE, { componentType: 'card' });

      expect(goodScore.score).toBeGreaterThan(badScore.score);
    });

    it('returns heuristic source when model is not loaded', async () => {
      const result = await scoreQuality('Test prompt', WELL_STRUCTURED_CODE);
      expect(result.source).toBe('heuristic');
    });

    it('returns score in 0-10 range', async () => {
      const result = await scoreQuality('Create a button', WELL_STRUCTURED_CODE);
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(10);
    });

    it('returns confidence value', async () => {
      const result = await scoreQuality('Test', WELL_STRUCTURED_CODE);
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });

    it('includes factor breakdown for heuristic scoring', async () => {
      const result = await scoreQuality('Create a card', WELL_STRUCTURED_CODE, { componentType: 'card' });
      expect(result.factors).toBeDefined();
      if (result.factors) {
        expect(result.factors.length).toBeDefined();
        expect(result.factors.accessibility).toBeDefined();
        expect(result.factors.structure).toBeDefined();
      }
    });

    it('tracks latency', async () => {
      const result = await scoreQuality('Test', MINIMAL_CODE);
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    });

    it('scores empty code very low', async () => {
      const result = await scoreQuality('Create something', EMPTY_CODE);
      expect(result.score).toBeLessThan(4);
    });

    it('rewards accessibility markers', async () => {
      const withA11y = '<div role="dialog" aria-label="Test"><label htmlFor="name">Name</label></div>';
      const withoutA11y = '<div><span>Name</span></div>';

      const a11yScore = await scoreQuality('Create a form', withA11y);
      const noA11yScore = await scoreQuality('Create a form', withoutA11y);

      expect(a11yScore.factors!.accessibility).toBeGreaterThan(noA11yScore.factors!.accessibility);
    });

    it('rewards responsive design markers', async () => {
      const responsive = '<div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">Content</div>';
      const fixed = '<div className="p-4">Content</div>';

      const respScore = await scoreQuality('Create a section', responsive);
      const fixedScore = await scoreQuality('Create a section', fixed);

      expect(respScore.factors!.responsive).toBeGreaterThan(fixedScore.factors!.responsive);
    });

    it('rewards dark mode support', async () => {
      const darkMode = '<div className="bg-white dark:bg-gray-900 text-black dark:text-white">Hello</div>';
      const noDarkMode = '<div className="bg-white text-black">Hello</div>';

      const darkScore = await scoreQuality('Create a div', darkMode);
      const lightScore = await scoreQuality('Create a div', noDarkMode);

      expect(darkScore.factors!.darkMode).toBeGreaterThan(lightScore.factors!.darkMode);
    });
  });

  describe('isLikelyAccepted', () => {
    it('returns true for well-structured code', async () => {
      const result = await isLikelyAccepted('Create a card', WELL_STRUCTURED_CODE, { componentType: 'card' });
      expect(result).toBe(true);
    });

    it('returns false for empty code', async () => {
      const result = await isLikelyAccepted('Create a card', EMPTY_CODE);
      expect(result).toBe(false);
    });
  });
});

// ---- Prompt Enhancer Tests ----

describe('prompt-enhancer', () => {
  describe('enhancePrompt', () => {
    it('enhances a simple prompt', async () => {
      const result = await enhancePrompt('Create a card');
      expect(result.enhanced.length).toBeGreaterThan('Create a card'.length);
      expect(result.original).toBe('Create a card');
      expect(result.source).toBe('rules');
      expect(result.additions.length).toBeGreaterThan(0);
    });

    it('adds accessibility guidance', async () => {
      const result = await enhancePrompt('Build a login form');
      expect(result.enhanced.toLowerCase()).toContain('aria');
      expect(result.additions).toContain('accessibility');
    });

    it('adds responsive guidance', async () => {
      const result = await enhancePrompt('Create a pricing card');
      expect(result.enhanced.toLowerCase()).toContain('responsive');
      expect(result.additions).toContain('responsive');
    });

    it('does not duplicate accessibility hint when already present', async () => {
      const result = await enhancePrompt('Create an accessible form with ARIA labels');
      expect(result.additions).not.toContain('accessibility');
    });

    it('does not duplicate responsive hint when already present', async () => {
      const result = await enhancePrompt('Create a responsive card for mobile');
      expect(result.additions).not.toContain('responsive');
    });

    it('adds framework context', async () => {
      const result = await enhancePrompt('Create a card', { framework: 'React' });
      expect(result.enhanced).toContain('React');
      expect(result.additions).toContain('framework');
    });

    it('does not duplicate framework when already in prompt', async () => {
      const result = await enhancePrompt('Create a React card component', { framework: 'React' });
      expect(result.additions).not.toContain('framework');
    });

    it('adds style context', async () => {
      const result = await enhancePrompt('Create a card', { style: 'glassmorphism' });
      expect(result.enhanced).toContain('glassmorphism');
      expect(result.additions).toContain('style');
    });

    it('adds mood context', async () => {
      const result = await enhancePrompt('Create a hero section', { mood: 'professional' });
      expect(result.enhanced).toContain('professional');
      expect(result.additions).toContain('mood');
    });

    it('adds component-specific hints for card', async () => {
      const result = await enhancePrompt('Create a card', { componentType: 'card' });
      expect(result.additions.some((a) => a.startsWith('component-hint'))).toBe(true);
    });

    it('adds component-specific hints for modal', async () => {
      const result = await enhancePrompt('Create a modal dialog', { componentType: 'modal' });
      expect(result.enhanced.toLowerCase()).toContain('escape');
    });

    it('tracks latency', async () => {
      const result = await enhancePrompt('Test');
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    });
  });

  describe('enhanceWithRules', () => {
    it('expands vague terms', () => {
      const result = enhanceWithRules('Create a nice card');
      expect(result.enhanced).not.toContain('nice');
      expect(result.enhanced).toContain('polished');
      expect(result.additions.some((a) => a.startsWith('expanded:'))).toBe(true);
    });

    it('expands "simple" to more specific terms', () => {
      const result = enhanceWithRules('Make a simple button');
      expect(result.enhanced).not.toMatch(/\bsimple\b/i);
      expect(result.enhanced).toContain('clean');
    });

    it('expands "cool" to specific styling terms', () => {
      const result = enhanceWithRules('Build a cool hero section');
      expect(result.enhanced).not.toMatch(/\bcool\b/i);
      expect(result.enhanced).toContain('modern');
    });
  });

  describe('needsEnhancement', () => {
    it('returns true for short prompts', () => {
      expect(needsEnhancement('Build a card')).toBe(true);
    });

    it('returns true for prompts with vague terms', () => {
      expect(needsEnhancement('Create a nice looking modern dashboard with a clean design')).toBe(true);
    });

    it('returns true for prompts missing accessibility', () => {
      expect(needsEnhancement('Create a responsive card component with dark mode support and animations')).toBe(true);
    });

    it('returns false for comprehensive prompts', () => {
      const comprehensive = 'Create a responsive accessible card component with ARIA labels and mobile breakpoints';
      expect(needsEnhancement(comprehensive)).toBe(false);
    });
  });
});
