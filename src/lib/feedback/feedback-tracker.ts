/**
 * Feedback tracker — records generation events and manages the implicit feedback loop.
 *
 * Stores generation history in SQLite and uses the prompt classifier
 * to derive implicit feedback scores from consecutive generations.
 */

import type Database from 'better-sqlite3';
import { createHash } from 'node:crypto';
import { classifyPromptPair } from './prompt-classifier.js';
import { fingerprint } from './pattern-detector.js';
import type { IFeedback, IGeneration } from './types.js';
import pino from 'pino';

const logger = pino({ name: 'feedback-tracker' });

// In-memory ring buffer for the last generation per session (for implicit feedback)
const lastGeneration = new Map<string, IGeneration>();

/**
 * Record a generation event.
 * If a previous generation exists for this session, implicit feedback is derived.
 */
export function recordGeneration(
  gen: IGeneration,
  generatedCode: string,
  db: Database.Database,
  promptContext?: string
): { implicitFeedback?: IFeedback } {
  // Store the generation in the feedback table as a pending entry
  const codeHash = createHash('sha256').update(generatedCode).digest('hex').slice(0, 16);
  gen.outputHash = codeHash;

  // Check for implicit feedback from previous generation in same session
  let implicitFeedback: IFeedback | undefined;
  const prev = lastGeneration.get(gen.sessionId);

  if (prev) {
    const classification = classifyPromptPair(prev, gen, promptContext);

    if (classification.signals.length > 0) {
      implicitFeedback = {
        id: `ifb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        generationId: prev.id,
        rating: classification.combinedScore > 0.3 ? 'positive' : classification.combinedScore < -0.3 ? 'negative' : 'neutral',
        source: 'implicit',
        score: classification.combinedScore,
        confidence: classification.combinedConfidence,
        timestamp: Date.now(),
      };

      storeFeedback(implicitFeedback, db);
      logger.debug(
        { generationId: prev.id, score: implicitFeedback.score, signals: classification.signals.length },
        'Implicit feedback recorded'
      );
    }
  }

  // Update last generation for this session
  lastGeneration.set(gen.sessionId, gen);

  // Detect and store code pattern
  const { skeleton, hash } = fingerprint(generatedCode);
  upsertPattern(hash, skeleton, generatedCode, db);

  return { implicitFeedback };
}

/**
 * Record explicit user feedback for a generation.
 */
export function recordExplicitFeedback(
  generationId: string,
  rating: 'positive' | 'negative',
  db: Database.Database,
  comment?: string
): IFeedback {
  const score = rating === 'positive' ? 1.5 : -1.0;

  const feedback: IFeedback = {
    id: `efb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    generationId,
    rating,
    source: 'explicit',
    score,
    confidence: 1.0, // Explicit feedback is always high confidence
    comment,
    timestamp: Date.now(),
  };

  storeFeedback(feedback, db);
  logger.info({ generationId, rating }, 'Explicit feedback recorded');

  return feedback;
}

/**
 * Get the aggregate feedback score for a component snippet or pattern.
 * Returns a value between -1 and 2, or 0 if no feedback exists.
 */
export function getAggregateScore(
  componentType: string,
  db: Database.Database
): number {
  const row = db
    .prepare(`
      SELECT AVG(score) as avg_score, COUNT(*) as cnt
      FROM feedback
      WHERE component_type = ?
    `)
    .get(componentType) as { avg_score: number | null; cnt: number };

  if (!row || row.cnt === 0) return 0;
  return row.avg_score ?? 0;
}

/**
 * Get feedback count (useful for determining training readiness).
 */
export function getFeedbackCount(db: Database.Database): number {
  const row = db.prepare('SELECT COUNT(*) as cnt FROM feedback').get() as { cnt: number };
  return row.cnt;
}

/**
 * Get feedback statistics.
 */
export function getFeedbackStats(db: Database.Database): {
  total: number;
  explicit: number;
  implicit: number;
  avgScore: number;
  positive: number;
  negative: number;
  neutral: number;
} {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM feedback').get() as { cnt: number };
  const explicit = db.prepare("SELECT COUNT(*) as cnt FROM feedback WHERE feedback_type = 'explicit'").get() as { cnt: number };
  const implicit = db.prepare("SELECT COUNT(*) as cnt FROM feedback WHERE feedback_type = 'implicit'").get() as { cnt: number };
  const avg = db.prepare('SELECT AVG(score) as avg FROM feedback').get() as { avg: number | null };

  return {
    total: total.cnt,
    explicit: explicit.cnt,
    implicit: implicit.cnt,
    avgScore: avg.avg ?? 0,
    positive: (db.prepare("SELECT COUNT(*) as cnt FROM feedback WHERE score > 0.3").get() as { cnt: number }).cnt,
    negative: (db.prepare("SELECT COUNT(*) as cnt FROM feedback WHERE score < -0.3").get() as { cnt: number }).cnt,
    neutral: (db.prepare("SELECT COUNT(*) as cnt FROM feedback WHERE score >= -0.3 AND score <= 0.3").get() as { cnt: number }).cnt,
  };
}

/**
 * Export training data as JSONL-style array for LoRA fine-tuning.
 */
export function exportTrainingData(
  db: Database.Database,
  minScore?: number
): Array<{ prompt: string; score: number; componentType: string | null; style: string | null }> {
  const whereClause = minScore !== undefined ? 'WHERE ABS(score) >= ?' : '';
  const params = minScore !== undefined ? [minScore] : [];

  const rows = db
    .prepare(`SELECT prompt, score, component_type, style FROM feedback ${whereClause} ORDER BY created_at DESC`)
    .all(...params) as Array<{
      prompt: string;
      score: number;
      component_type: string | null;
      style: string | null;
    }>;

  return rows.map((r) => ({
    prompt: r.prompt,
    score: r.score,
    componentType: r.component_type,
    style: r.style,
  }));
}

// --- Internal helpers ---

function storeFeedback(feedback: IFeedback, db: Database.Database): void {
  // Retrieve generation context from session cache
  const genContext = lastGeneration.get(feedback.generationId);

  db.prepare(
    `INSERT INTO feedback (generation_id, prompt, component_type, variant, mood, industry, style, score, feedback_type, code_hash, rating, confidence, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    feedback.generationId,
    genContext?.prompt ?? '',
    genContext?.componentType ?? '',
    genContext?.variant ?? '',
    genContext?.mood ?? '',
    genContext?.industry ?? '',
    genContext?.style ?? '',
    feedback.score,
    feedback.source,
    genContext?.codeHash ?? '',
    feedback.rating ?? null,
    feedback.confidence ?? null,
    feedback.timestamp
  );
}

function upsertPattern(hash: string, skeleton: string, code: string, db: Database.Database): void {
  // Check if pattern exists
  const existing = db
    .prepare('SELECT source_id FROM embeddings WHERE source_id = ? AND source_type = ?')
    .get(hash, 'description') as { source_id: string } | undefined;

  // We store patterns as a simple meta entry — the full pattern table will
  // be expanded when we implement feedback-boosted search (Step 14)
  if (!existing) {
    logger.debug({ hash, skeleton }, 'New code pattern detected');
  }
}

/**
 * Clear the in-memory session cache (useful for testing).
 */
export function clearSessionCache(): void {
  lastGeneration.clear();
}
