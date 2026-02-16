/**
 * Feedback-boosted search — merges feedback scores into registry search results.
 *
 * Replaces raw `searchComponents()` with a version that boosts results
 * based on accumulated user feedback, so the RAG system learns over time.
 */

import type Database from 'better-sqlite3';
import type { IComponentQuery, ISearchResult } from '../design-references/component-registry/types.js';
import { searchComponents } from '../design-references/component-registry/index.js';

/** Maximum boost factor from feedback (30% boost at max score). */
const FEEDBACK_BOOST_FACTOR = 0.3;

/** Minimum feedback count before we start boosting. */
const MIN_FEEDBACK_FOR_BOOST = 3;

/**
 * Search components with feedback-based score boosting.
 *
 * 1. Runs the base registry search (in-memory scoring).
 * 2. Looks up aggregate feedback scores per component type from SQLite.
 * 3. Boosts/penalizes results by up to ±30% based on feedback history.
 */
export function feedbackBoostedSearch(
  query: IComponentQuery,
  db: Database.Database
): ISearchResult[] {
  // 1. Base search
  const baseResults = searchComponents(query);
  if (baseResults.length === 0) return [];

  // 2. Load feedback scores for relevant component types
  const types = new Set(baseResults.map((r) => r.snippet.type));
  const feedbackScores = new Map<string, { avgScore: number; count: number }>();

  for (const type of types) {
    const row = db
      .prepare(
        `SELECT AVG(score) as avg_score, COUNT(*) as cnt
         FROM feedback
         WHERE component_type = ?`
      )
      .get(type) as { avg_score: number | null; cnt: number } | undefined;

    if (row && row.cnt >= MIN_FEEDBACK_FOR_BOOST && row.avg_score !== null) {
      feedbackScores.set(type, { avgScore: row.avg_score, count: row.cnt });
    }
  }

  // Also check per-snippet feedback (by generation output matching snippet id)
  // Batch query to avoid N+1
  const snippetScores = new Map<string, { avgScore: number; count: number }>();
  const uniquePairs = new Set<string>();
  for (const r of baseResults) {
    uniquePairs.add(JSON.stringify([r.snippet.type, query.style ?? null]));
  }

  if (uniquePairs.size > 0) {
    const pairsList = Array.from(uniquePairs).map(s => JSON.parse(s) as [string, string | null]);
    const placeholders = pairsList.map(() => '(?, ?)').join(', ');
    const params = pairsList.flatMap(([type, style]) => [type, style]);

    const rows = db
      .prepare(
        `SELECT f.component_type, f.style, AVG(f.score) as avg_score, COUNT(*) as cnt
         FROM feedback f
         WHERE (f.component_type, f.style) IN (VALUES ${placeholders})
         GROUP BY f.component_type, f.style`
      )
      .all(...params) as Array<{ component_type: string; style: string | null; avg_score: number; cnt: number }>;

    for (const row of rows) {
      for (const r of baseResults) {
        if (r.snippet.type === row.component_type && (query.style ?? null) === row.style) {
          snippetScores.set(r.snippet.id, { avgScore: row.avg_score, count: row.cnt });
        }
      }
    }
  }

  // 3. Apply boost
  const boostedResults = baseResults.map((result) => {
    let boost = 0;

    // Type-level boost
    const typeFeedback = feedbackScores.get(result.snippet.type);
    if (typeFeedback) {
      // Normalize avgScore from [-1, 2] to [-1, 1]: (score - 0.5) / 1.5
      // Maps: -1→-1, 0.5→0, 2→1
      const normalizedScore = (typeFeedback.avgScore - 0.5) / 1.5;
      boost += normalizedScore * FEEDBACK_BOOST_FACTOR;
    }

    // Snippet-level boost (stronger signal)
    const snippetFeedback = snippetScores.get(result.snippet.id);
    if (snippetFeedback) {
      const normalizedScore = (snippetFeedback.avgScore - 0.5) / 1.5;
      boost += normalizedScore * FEEDBACK_BOOST_FACTOR * 0.5; // Half weight for snippet-specific
    }

    return {
      ...result,
      score: result.score * (1 + boost),
    };
  });

  // Re-sort by boosted score
  boostedResults.sort((a, b) => b.score - a.score);

  return boostedResults;
}

/**
 * Get the feedback boost factor for a specific component type.
 * Returns a multiplier between 0.7 and 1.3 (±30%).
 */
export function getFeedbackBoost(
  componentType: string,
  db: Database.Database
): number {
  const row = db
    .prepare(
      `SELECT AVG(score) as avg_score, COUNT(*) as cnt
       FROM feedback
       WHERE component_type = ?`
    )
    .get(componentType) as { avg_score: number | null; cnt: number } | undefined;

  if (!row || row.cnt < MIN_FEEDBACK_FOR_BOOST || row.avg_score === null) {
    return 1.0; // No boost
  }

  // Normalize avgScore from [-1, 2] to [-1, 1]: (score - 0.5) / 1.5
  const normalizedScore = (row.avg_score - 0.5) / 1.5;
  const boost = normalizedScore * FEEDBACK_BOOST_FACTOR;
  return Math.max(0.7, Math.min(1.3, 1 + boost));
}
