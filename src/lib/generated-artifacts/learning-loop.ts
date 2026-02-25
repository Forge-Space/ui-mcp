import type Database from 'better-sqlite3';
import pino from 'pino';
import type { IGeneratedArtifact, ILearningStats } from './types.js';
import { queryArtifacts, getArtifactCount, storeArtifact, generateArtifactId } from './artifact-store.js';

const logger = pino({ name: 'learning-loop' });

const PROMOTION_QUALITY_THRESHOLD = 7;
const PROMOTION_FEEDBACK_THRESHOLD = 1.0;
const MIN_ARTIFACTS_FOR_STATS = 5;

export function recordGeneratedArtifact(
  prompt: string,
  code: string,
  type: IGeneratedArtifact['type'],
  db: Database.Database,
  options?: {
    category?: string;
    qualityScore?: number;
    structure?: IGeneratedArtifact['structure'];
    metadata?: Record<string, unknown>;
    inspirationSources?: string[];
  }
): IGeneratedArtifact {
  const artifact: IGeneratedArtifact = {
    id: generateArtifactId(prompt, type),
    type,
    category: options?.category,
    prompt,
    code,
    structure: options?.structure,
    metadata: options?.metadata,
    qualityScore: options?.qualityScore,
    inspirationSources: options?.inspirationSources,
    createdAt: Date.now(),
  };

  storeArtifact(artifact, db);
  logger.info({ id: artifact.id, type }, 'Generation recorded');

  return artifact;
}

export function getPromotionCandidates(db: Database.Database): IGeneratedArtifact[] {
  return queryArtifacts(
    {
      minQualityScore: PROMOTION_QUALITY_THRESHOLD,
      minFeedbackScore: PROMOTION_FEEDBACK_THRESHOLD,
      limit: 20,
    },
    db
  );
}

export function getLearningStats(db: Database.Database): ILearningStats {
  const total = getArtifactCount(db);

  if (total < MIN_ARTIFACTS_FOR_STATS) {
    return {
      totalArtifacts: total,
      avgQualityScore: 0,
      avgFeedbackScore: 0,
      topPatterns: [],
      promotionCandidates: 0,
    };
  }

  const qualityRow = db
    .prepare(
      `SELECT AVG(quality_score) as avg_q
       FROM generated_artifacts
       WHERE quality_score IS NOT NULL`
    )
    .get() as { avg_q: number | null };

  const feedbackRow = db
    .prepare(
      `SELECT AVG(feedback_score) as avg_f
       FROM generated_artifacts
       WHERE feedback_score IS NOT NULL`
    )
    .get() as { avg_f: number | null };

  const patternRows = db
    .prepare(
      `SELECT category, COUNT(*) as cnt
       FROM generated_artifacts
       WHERE category IS NOT NULL
       GROUP BY category
       ORDER BY cnt DESC
       LIMIT 10`
    )
    .all() as Array<{ category: string; cnt: number }>;

  const promotionCount = db
    .prepare(
      `SELECT COUNT(*) as cnt
       FROM generated_artifacts
       WHERE quality_score >= ? AND feedback_score >= ?`
    )
    .get(PROMOTION_QUALITY_THRESHOLD, PROMOTION_FEEDBACK_THRESHOLD) as { cnt: number };

  return {
    totalArtifacts: total,
    avgQualityScore: qualityRow.avg_q ?? 0,
    avgFeedbackScore: feedbackRow.avg_f ?? 0,
    topPatterns: patternRows.map((r) => ({
      category: r.category,
      count: r.cnt,
    })),
    promotionCandidates: promotionCount.cnt,
  };
}

export function getRecentArtifacts(db: Database.Database, limit: number = 10): IGeneratedArtifact[] {
  return queryArtifacts({ limit }, db);
}

export function getSimilarArtifacts(
  type: IGeneratedArtifact['type'],
  category: string,
  db: Database.Database,
  limit: number = 5
): IGeneratedArtifact[] {
  return queryArtifacts({ type, category, limit }, db);
}
