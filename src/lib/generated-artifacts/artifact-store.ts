import type Database from 'better-sqlite3';
import { createHash } from 'node:crypto';
import pino from 'pino';
import type { IGeneratedArtifact, IArtifactQuery, IComponentStructure, ArtifactType } from './types.js';
import { ARTIFACTS_SCHEMA } from './schema.js';
import { safeJSONParse } from '../config.js';

const logger = pino({ name: 'artifact-store' });

let schemaInitialized = false;

function ensureSchema(db: Database.Database): void {
  if (schemaInitialized) return;
  db.exec(ARTIFACTS_SCHEMA);
  schemaInitialized = true;
}

export function resetSchemaInit(): void {
  schemaInitialized = false;
}

export function generateArtifactId(prompt: string, type: ArtifactType): string {
  const hash = createHash('sha256').update(`${type}:${prompt}:${Date.now()}`).digest('hex').slice(0, 12);
  return `art-${type}-${hash}`;
}

export function storeArtifact(artifact: IGeneratedArtifact, db: Database.Database): void {
  ensureSchema(db);

  db.prepare(
    `INSERT OR REPLACE INTO generated_artifacts
     (id, type, category, prompt, code, structure_json, metadata_json,
      quality_score, feedback_score, inspiration_sources, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    artifact.id,
    artifact.type,
    artifact.category ?? null,
    artifact.prompt,
    artifact.code,
    artifact.structure ? JSON.stringify(artifact.structure) : null,
    artifact.metadata ? JSON.stringify(artifact.metadata) : null,
    artifact.qualityScore ?? null,
    artifact.feedbackScore ?? null,
    artifact.inspirationSources ? JSON.stringify(artifact.inspirationSources) : null,
    artifact.createdAt
  );

  logger.debug({ id: artifact.id, type: artifact.type }, 'Artifact stored');
}

export function getArtifact(id: string, db: Database.Database): IGeneratedArtifact | undefined {
  ensureSchema(db);

  const row = db.prepare('SELECT * FROM generated_artifacts WHERE id = ?').get(id) as RawArtifactRow | undefined;

  if (!row) return undefined;
  return hydrateArtifact(row);
}

export function queryArtifacts(query: IArtifactQuery, db: Database.Database): IGeneratedArtifact[] {
  ensureSchema(db);

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (query.type) {
    conditions.push('type = ?');
    params.push(query.type);
  }
  if (query.category) {
    conditions.push('category = ?');
    params.push(query.category);
  }
  if (query.minQualityScore !== undefined) {
    conditions.push('quality_score >= ?');
    params.push(query.minQualityScore);
  }
  if (query.minFeedbackScore !== undefined) {
    conditions.push('feedback_score >= ?');
    params.push(query.minFeedbackScore);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const limit = query.limit ?? 50;

  const rows = db
    .prepare(
      `SELECT * FROM generated_artifacts ${where}
       ORDER BY created_at DESC LIMIT ?`
    )
    .all(...params, limit) as RawArtifactRow[];

  return rows.map(hydrateArtifact);
}

export function updateFeedbackScore(id: string, score: number, db: Database.Database): boolean {
  ensureSchema(db);

  const result = db.prepare('UPDATE generated_artifacts SET feedback_score = ? WHERE id = ?').run(score, id);
  return result.changes > 0;
}

export function updateQualityScore(id: string, score: number, db: Database.Database): boolean {
  ensureSchema(db);

  const result = db.prepare('UPDATE generated_artifacts SET quality_score = ? WHERE id = ?').run(score, id);
  return result.changes > 0;
}

export function getArtifactCount(db: Database.Database, type?: ArtifactType): number {
  ensureSchema(db);

  if (type) {
    const row = db.prepare('SELECT COUNT(*) as cnt FROM generated_artifacts WHERE type = ?').get(type) as {
      cnt: number;
    };
    return row.cnt;
  }

  const row = db.prepare('SELECT COUNT(*) as cnt FROM generated_artifacts').get() as { cnt: number };
  return row.cnt;
}

export function getTopArtifacts(db: Database.Database, limit: number = 10): IGeneratedArtifact[] {
  ensureSchema(db);

  const rows = db
    .prepare(
      `SELECT * FROM generated_artifacts
       WHERE quality_score IS NOT NULL OR feedback_score IS NOT NULL
       ORDER BY COALESCE(feedback_score, 0) + COALESCE(quality_score, 0) DESC
       LIMIT ?`
    )
    .all(limit) as RawArtifactRow[];

  return rows.map(hydrateArtifact);
}

export function deleteArtifact(id: string, db: Database.Database): boolean {
  ensureSchema(db);

  const result = db.prepare('DELETE FROM generated_artifacts WHERE id = ?').run(id);
  return result.changes > 0;
}

interface RawArtifactRow {
  id: string;
  type: string;
  category: string | null;
  prompt: string;
  code: string;
  structure_json: string | null;
  metadata_json: string | null;
  quality_score: number | null;
  feedback_score: number | null;
  inspiration_sources: string | null;
  embedding_blob: Buffer | null;
  embedding_dims: number | null;
  created_at: number;
}

function hydrateArtifact(row: RawArtifactRow): IGeneratedArtifact {
  return {
    id: row.id,
    type: row.type as ArtifactType,
    category: row.category ?? undefined,
    prompt: row.prompt,
    code: row.code,
    structure: row.structure_json
      ? safeJSONParse<IComponentStructure>(row.structure_json, {
          component: 'Unknown',
          category: 'atom',
        })
      : undefined,
    metadata: row.metadata_json ? safeJSONParse<Record<string, unknown>>(row.metadata_json, {}) : undefined,
    qualityScore: row.quality_score ?? undefined,
    feedbackScore: row.feedback_score ?? undefined,
    inspirationSources: row.inspiration_sources ? safeJSONParse<string[]>(row.inspiration_sources, []) : undefined,
    createdAt: row.created_at,
  };
}
