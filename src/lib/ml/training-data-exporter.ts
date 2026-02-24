/**
 * Training data exporter — extracts feedback data from SQLite
 * and writes JSONL files suitable for LoRA fine-tuning.
 *
 * Produces adapter-specific datasets:
 * - quality-scorer: prompt + code → score (regression)
 * - prompt-enhancer: original prompt → improved prompt (text-to-text)
 * - style-recommender: prompt → style label (classification)
 */

import type Database from 'better-sqlite3';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import pino from 'pino';
import type { AdapterType, ITrainingExample } from './types.js';

const logger = pino({ name: 'training-data-exporter' });

/** A single JSONL row for quality-scorer training. */
export interface IQualityScorerRow {
  instruction: string;
  input: string;
  output: string;
}

/** A single JSONL row for prompt-enhancer training. */
export interface IPromptEnhancerRow {
  instruction: string;
  input: string;
  output: string;
}

/** A single JSONL row for style-recommender training. */
export interface IStyleRecommenderRow {
  instruction: string;
  input: string;
  output: string;
}

/**
 * Export raw training examples from the feedback table.
 * Returns scored feedback entries with all available metadata.
 */
export function exportRawExamples(
  db: Database.Database,
  opts: { minAbsScore?: number; limit?: number } = {}
): ITrainingExample[] {
  const minAbs = opts.minAbsScore ?? 0.3;
  const limit = opts.limit ?? 10_000;

  const rows = db
    .prepare(
      `SELECT prompt, score, component_type, variant, mood, industry, style, code_hash
       FROM feedback
       WHERE ABS(score) >= ?
       ORDER BY created_at DESC
       LIMIT ?`
    )
    .all(minAbs, limit) as Array<{
    prompt: string;
    score: number;
    component_type: string | null;
    variant: string | null;
    mood: string | null;
    industry: string | null;
    style: string | null;
    code_hash: string | null;
  }>;

  return rows.map((r) => ({
    prompt: r.prompt,
    code: r.code_hash ?? '',
    score: r.score,
    params: {
      ...(r.component_type ? { componentType: r.component_type } : {}),
      ...(r.variant ? { variant: r.variant } : {}),
      ...(r.mood ? { mood: r.mood } : {}),
      ...(r.industry ? { industry: r.industry } : {}),
      ...(r.style ? { style: r.style } : {}),
    },
  }));
}

/**
 * Build quality-scorer training data.
 * Format: instruction-following where the model predicts acceptance score.
 */
export function buildQualityScorerData(examples: ITrainingExample[]): IQualityScorerRow[] {
  return examples
    .filter((e) => e.prompt.length > 0)
    .map((e) => ({
      instruction:
        'Rate the likelihood that the following UI generation request will be accepted by the user. Respond with a score from 0 to 10.',
      input: `Prompt: ${e.prompt}\nComponent: ${e.params.componentType ?? 'unknown'}\nStyle: ${e.params.style ?? 'default'}`,
      output: `${Math.max(0, Math.min(10, Math.round((e.score + 1) * 3.33)))}`,
    }));
}

/**
 * Build prompt-enhancer training data.
 * Pairs low-scored prompts with high-scored prompts for the same component type.
 */
export function buildPromptEnhancerData(examples: ITrainingExample[]): IPromptEnhancerRow[] {
  // Group by component type
  const byType = new Map<string, ITrainingExample[]>();
  for (const e of examples) {
    const key = e.params.componentType ?? 'unknown';
    if (!byType.has(key)) byType.set(key, []);
    byType.get(key)?.push(e);
  }

  const rows: IPromptEnhancerRow[] = [];

  for (const [, group] of byType) {
    const good = group.filter((e) => e.score > 0.5).sort((a, b) => b.score - a.score);
    const bad = group.filter((e) => e.score < -0.3).sort((a, b) => a.score - b.score);

    // Pair each bad prompt with the best good prompt
    for (const b of bad) {
      if (good.length === 0) break;
      rows.push({
        instruction:
          'Improve the following UI generation prompt to produce better results that will be accepted by the user.',
        input: b.prompt,
        output: good[0]?.prompt ?? '',
      });
    }
  }

  return rows;
}

/**
 * Build style-recommender training data.
 * Format: prompt → recommended style name.
 */
export function buildStyleRecommenderData(examples: ITrainingExample[]): IStyleRecommenderRow[] {
  return examples
    .filter((e) => e.score > 0.3 && e.params.style && e.params.style !== 'default')
    .map((e) => ({
      instruction: 'Given the following UI generation request, recommend the best visual style.',
      input: e.prompt,
      output: e.params.style ?? '',
    }));
}

/**
 * Write training data to a JSONL file.
 * Creates parent directories if needed.
 */
export function writeJsonl<T extends object>(rows: T[], filePath: string): number {
  if (rows.length === 0) return 0;

  const dir = join(filePath, '..');
  mkdirSync(dir, { recursive: true });

  const lines = rows.map((r) => JSON.stringify(r)).join('\n');
  writeFileSync(filePath, `${lines}\n`, 'utf-8');

  logger.info({ path: filePath, rows: rows.length }, 'Training data written');
  return rows.length;
}

/**
 * Export adapter-specific training data to JSONL files.
 * Returns the count of examples written per adapter.
 */
export function exportForAdapter(
  adapter: AdapterType,
  db: Database.Database,
  outputDir: string
): { path: string; count: number } {
  const raw = exportRawExamples(db);

  let rows: Array<object>;
  let filename: string;

  switch (adapter) {
    case 'quality-scorer':
      rows = buildQualityScorerData(raw);
      filename = 'quality-scorer.jsonl';
      break;
    case 'prompt-enhancer':
      rows = buildPromptEnhancerData(raw);
      filename = 'prompt-enhancer.jsonl';
      break;
    case 'style-recommender':
      rows = buildStyleRecommenderData(raw);
      filename = 'style-recommender.jsonl';
      break;
  }

  const filePath = join(outputDir, filename);
  const count = writeJsonl(rows, filePath);

  return { path: filePath, count };
}

/**
 * Check if enough training data is available for a given adapter.
 */
export function hasEnoughData(
  adapter: AdapterType,
  db: Database.Database,
  includeSynthetic: boolean = false
): { ready: boolean; count: number; required: number } {
  const feedbackThresholds: Record<AdapterType, number> = {
    'quality-scorer': 100,
    'prompt-enhancer': 200,
    'style-recommender': 300,
  };

  const syntheticThresholds: Record<AdapterType, number> = {
    'quality-scorer': 50,
    'prompt-enhancer': 100,
    'style-recommender': 80,
  };

  const count = (db.prepare('SELECT COUNT(*) as cnt FROM feedback WHERE ABS(score) >= 0.3').get() as { cnt: number })
    .cnt;

  const required = includeSynthetic ? syntheticThresholds[adapter] : feedbackThresholds[adapter];

  return { ready: count >= required, count, required };
}
