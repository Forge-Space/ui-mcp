/**
 * Persistent embedding store backed by SQLite.
 * Stores and retrieves vector embeddings for semantic search.
 * Uses sqlite-vss HNSW index when available, brute-force fallback otherwise.
 */

import type Database from 'better-sqlite3';
import type { IEmbedding, ISimilarityResult } from './types.js';
import { cosineSimilarity } from './embeddings.js';
import { isVssAvailable, indexEmbedding, indexEmbeddings, searchVectors } from './vector-index.js';

/**
 * Store an embedding in the database.
 */
export function storeEmbedding(embedding: IEmbedding, db: Database.Database): void {
  const blob = Buffer.from(embedding.vector.buffer);
  const result = db
    .prepare(
      `
    INSERT OR REPLACE INTO embeddings (source_id, source_type, text, vector_blob, dimensions, model, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `
    )
    .run(
      embedding.sourceId,
      embedding.sourceType,
      embedding.text,
      blob,
      embedding.dimensions,
      'all-MiniLM-L6-v2',
      embedding.createdAt
    );

  if (isVssAvailable() && result.lastInsertRowid) {
    indexEmbedding(db, Number(result.lastInsertRowid), embedding.vector);
  }
}

/**
 * Store multiple embeddings in a single transaction.
 */
export function storeEmbeddings(embeddings: IEmbedding[], db: Database.Database): void {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO embeddings (source_id, source_type, text, vector_blob, dimensions, model, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const vssRows: Array<{ rowid: number; vector: Float32Array }> = [];
  const useVss = isVssAvailable();

  const insertAll = db.transaction(() => {
    for (const e of embeddings) {
      const blob = Buffer.from(e.vector.buffer);
      const result = stmt.run(e.sourceId, e.sourceType, e.text, blob, e.dimensions, 'all-MiniLM-L6-v2', e.createdAt);
      if (useVss && result.lastInsertRowid) {
        vssRows.push({ rowid: Number(result.lastInsertRowid), vector: e.vector });
      }
    }
  });

  insertAll();

  if (vssRows.length > 0) {
    indexEmbeddings(db, vssRows);
  }
}

/**
 * Load all embeddings of a given source type.
 */
export function loadEmbeddings(sourceType: IEmbedding['sourceType'], db: Database.Database): IEmbedding[] {
  const rows = db
    .prepare(
      'SELECT source_id, source_type, text, vector_blob, dimensions, created_at FROM embeddings WHERE source_type = ?'
    )
    .all(sourceType) as Array<{
    source_id: string;
    source_type: string;
    text: string;
    vector_blob: Buffer;
    dimensions: number;
    created_at: number;
  }>;

  return rows.map((r) => ({
    sourceId: r.source_id,
    sourceType: r.source_type as IEmbedding['sourceType'],
    text: r.text,
    vector: new Float32Array(r.vector_blob.buffer, r.vector_blob.byteOffset, r.dimensions),
    dimensions: r.dimensions,
    createdAt: r.created_at,
  }));
}

/**
 * Get a single embedding by source ID and type.
 */
export function getEmbedding(
  sourceId: string,
  sourceType: IEmbedding['sourceType'],
  db: Database.Database
): IEmbedding | undefined {
  const row = db
    .prepare(
      'SELECT source_id, source_type, text, vector_blob, dimensions, created_at FROM embeddings WHERE source_id = ? AND source_type = ?'
    )
    .get(sourceId, sourceType) as
    | {
        source_id: string;
        source_type: string;
        text: string;
        vector_blob: Buffer;
        dimensions: number;
        created_at: number;
      }
    | undefined;

  if (!row) return undefined;

  return {
    sourceId: row.source_id,
    sourceType: row.source_type as IEmbedding['sourceType'],
    text: row.text,
    vector: new Float32Array(row.vector_blob.buffer, row.vector_blob.byteOffset, row.dimensions),
    dimensions: row.dimensions,
    createdAt: row.created_at,
  };
}

/**
 * Semantic search: find the most similar embeddings to a query vector.
 * Uses sqlite-vss HNSW index when available (O(log n)), falls back to
 * in-memory brute-force cosine similarity otherwise.
 */
export function semanticSearch(
  queryVector: Float32Array,
  sourceType: IEmbedding['sourceType'],
  db: Database.Database,
  topK: number = 5,
  threshold: number = 0.3
): ISimilarityResult[] {
  if (isVssAvailable()) {
    return vssSearch(queryVector, sourceType, db, topK, threshold);
  }
  return bruteForcSearch(queryVector, sourceType, db, topK, threshold);
}

function vssSearch(
  queryVector: Float32Array,
  sourceType: IEmbedding['sourceType'],
  db: Database.Database,
  topK: number,
  threshold: number
): ISimilarityResult[] {
  const vssResults = searchVectors(db, queryVector, topK * 3);
  if (vssResults.length === 0) return [];

  const rowids = vssResults.map((r) => r.rowid);
  const placeholders = rowids.map(() => '?').join(',');
  const rows = db
    .prepare(
      `SELECT rowid, source_id, source_type, text, vector_blob, dimensions
       FROM embeddings
       WHERE rowid IN (${placeholders}) AND source_type = ?`
    )
    .all(...rowids, sourceType) as Array<{
    rowid: number;
    source_id: string;
    source_type: string;
    text: string;
    vector_blob: Buffer;
    dimensions: number;
  }>;

  return rows
    .map((r) => {
      const vec = new Float32Array(r.vector_blob.buffer, r.vector_blob.byteOffset, r.dimensions);
      return {
        id: r.source_id,
        similarity: cosineSimilarity(queryVector, vec),
        text: r.text,
      };
    })
    .filter((r) => r.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

function bruteForcSearch(
  queryVector: Float32Array,
  sourceType: IEmbedding['sourceType'],
  db: Database.Database,
  topK: number,
  threshold: number
): ISimilarityResult[] {
  const candidates = loadEmbeddings(sourceType, db);
  return candidates
    .map((c) => ({
      id: c.sourceId,
      similarity: cosineSimilarity(queryVector, c.vector),
      text: c.text,
    }))
    .filter((r) => r.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

/**
 * Get the count of stored embeddings by type.
 */
export function getEmbeddingCount(sourceType: IEmbedding['sourceType'], db: Database.Database): number {
  const row = db.prepare('SELECT COUNT(*) as cnt FROM embeddings WHERE source_type = ?').get(sourceType) as {
    cnt: number;
  };
  return row.cnt;
}

/**
 * Delete embeddings by source type.
 */
export function deleteEmbeddings(sourceType: IEmbedding['sourceType'], db: Database.Database): number {
  const result = db.prepare('DELETE FROM embeddings WHERE source_type = ?').run(sourceType);
  return result.changes;
}
