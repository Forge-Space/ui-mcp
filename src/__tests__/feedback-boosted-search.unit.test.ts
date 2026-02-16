import { getMemoryDatabase } from '../lib/design-references/database/store.js';
import { initializeRegistry, resetInitialization } from '../lib/design-references/component-registry/init.js';
import {
  feedbackBoostedSearch,
  getFeedbackBoost,
} from '../lib/feedback/feedback-boosted-search.js';
import type Database from 'better-sqlite3';

describe('feedback-boosted-search', () => {
  let db: Database.Database;

  beforeEach(() => {
    resetInitialization();
    initializeRegistry();
    db = getMemoryDatabase();
  });

  afterEach(() => {
    db.close();
  });

  describe('feedbackBoostedSearch', () => {
    it('returns results without feedback (base search only)', () => {
      const results = feedbackBoostedSearch({ type: 'button' }, db);
      expect(results.length).toBeGreaterThan(0);
      // All results should have positive scores
      for (const r of results) {
        expect(r.score).toBeGreaterThan(0);
      }
    });

    it('boosts results when positive feedback exists', () => {
      // First get base scores
      const baseBefore = feedbackBoostedSearch({ type: 'button' }, db);
      const baseScore = baseBefore[0]?.score ?? 0;

      // Insert positive feedback for button type
      for (let i = 0; i < 5; i++) {
        db.prepare(
          `INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).run(`gen-${i}`, 'test', 'button', 1.5, 'explicit', Math.floor(Date.now() / 1000));
      }

      const boosted = feedbackBoostedSearch({ type: 'button' }, db);
      expect(boosted.length).toBeGreaterThan(0);
      // Boosted score should be strictly higher than base
      expect(boosted[0]!.score).toBeGreaterThan(baseScore);
    });

    it('penalizes results when negative feedback exists', () => {
      // Get base scores before negative feedback
      const baseBefore = feedbackBoostedSearch({ type: 'button' }, db);
      const baseScore = baseBefore[0]?.score ?? 0;

      // Insert negative feedback for button type
      for (let i = 0; i < 5; i++) {
        db.prepare(
          `INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).run(`gen-neg-${i}`, 'test', 'button', -1.0, 'explicit', Date.now());
      }

      const baseAfter = feedbackBoostedSearch({ type: 'button' }, db);
      // Results should still be returned but with lower scores
      expect(baseAfter.length).toBeGreaterThan(0);
      expect(baseAfter[0]!.score).toBeLessThan(baseScore);
    });

    it('returns empty for nonexistent type', () => {
      const results = feedbackBoostedSearch({ type: 'zzz_nonexistent_zzz' }, db);
      expect(results.length).toBe(0);
    });

    it('maintains sort order after boosting', () => {
      const results = feedbackBoostedSearch({ type: 'button', mood: 'bold' }, db);
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1]!.score).toBeGreaterThanOrEqual(results[i]!.score);
      }
    });
  });

  describe('getFeedbackBoost', () => {
    it('returns 1.0 when no feedback exists', () => {
      expect(getFeedbackBoost('button', db)).toBe(1.0);
    });

    it('returns 1.0 when feedback count is below threshold', () => {
      db.prepare(
        `INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).run('gen-1', 'test', 'button', 1.5, 'explicit', Date.now());

      expect(getFeedbackBoost('button', db)).toBe(1.0); // Only 1 entry, need 3
    });

    it('returns > 1.0 for positive feedback', () => {
      for (let i = 0; i < 5; i++) {
        db.prepare(
          `INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).run(`gen-${i}`, 'test', 'card', 1.5, 'explicit', Date.now());
      }

      const boost = getFeedbackBoost('card', db);
      expect(boost).toBeGreaterThan(1.0);
      expect(boost).toBeLessThanOrEqual(1.3);
    });

    it('returns < 1.0 for negative feedback', () => {
      for (let i = 0; i < 5; i++) {
        db.prepare(
          `INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).run(`gen-neg-${i}`, 'test', 'hero', -1.0, 'explicit', Date.now());
      }

      const boost = getFeedbackBoost('hero', db);
      expect(boost).toBeLessThan(1.0);
      expect(boost).toBeGreaterThanOrEqual(0.7);
    });

    it('clamps boost between 0.7 and 1.3', () => {
      // Max positive
      for (let i = 0; i < 10; i++) {
        db.prepare(
          `INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).run(`gen-max-${i}`, 'test', 'nav', 2.0, 'explicit', Date.now());
      }
      expect(getFeedbackBoost('nav', db)).toBeLessThanOrEqual(1.3);

      // Max negative
      for (let i = 0; i < 10; i++) {
        db.prepare(
          `INSERT INTO feedback (generation_id, prompt, component_type, score, feedback_type, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).run(`gen-min-${i}`, 'test', 'footer', -1.0, 'explicit', Date.now());
      }
      expect(getFeedbackBoost('footer', db)).toBeGreaterThanOrEqual(0.7);
    });
  });
});
