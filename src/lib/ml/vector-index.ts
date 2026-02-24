import type Database from 'better-sqlite3';
import { createRequire } from 'node:module';
import pino from 'pino';

const logger = pino({ name: 'vector-index' });

const DIMENSIONS = 384;
const VSS_TABLE = 'vss_embeddings';

let vssAvailable = false;

export function isVssAvailable(): boolean {
  return vssAvailable;
}

export function initVectorIndex(db: Database.Database): boolean {
  try {
    const esmRequire = createRequire(import.meta.url);
    const { loadVector, loadVss } = esmRequire('sqlite-vss');
    loadVector(db);
    loadVss(db);
    db.exec(`CREATE VIRTUAL TABLE IF NOT EXISTS ${VSS_TABLE} USING vss0(vector(${DIMENSIONS}))`);
    vssAvailable = true;
    logger.info('sqlite-vss loaded, vector index ready');
    return true;
  } catch (err) {
    vssAvailable = false;
    logger.warn({ err }, 'sqlite-vss unavailable, falling back to brute-force search');
    return false;
  }
}

export function indexEmbedding(db: Database.Database, rowid: number, vector: Float32Array): void {
  if (!vssAvailable) return;
  const buf = Buffer.from(vector.buffer, vector.byteOffset, vector.byteLength);
  db.prepare(`INSERT INTO ${VSS_TABLE}(rowid, vector) VALUES (?, ?)`).run(rowid, buf);
}

export function indexEmbeddings(db: Database.Database, rows: Array<{ rowid: number; vector: Float32Array }>): void {
  if (!vssAvailable || rows.length === 0) return;
  const stmt = db.prepare(`INSERT INTO ${VSS_TABLE}(rowid, vector) VALUES (?, ?)`);
  const insertAll = db.transaction(() => {
    for (const r of rows) {
      const buf = Buffer.from(r.vector.buffer, r.vector.byteOffset, r.vector.byteLength);
      stmt.run(r.rowid, buf);
    }
  });
  insertAll();
}

export function removeFromIndex(db: Database.Database, rowid: number): void {
  if (!vssAvailable) return;
  db.prepare(`DELETE FROM ${VSS_TABLE} WHERE rowid = ?`).run(rowid);
}

export interface IVssSearchResult {
  rowid: number;
  distance: number;
}

export function searchVectors(db: Database.Database, queryVector: Float32Array, topK: number = 5): IVssSearchResult[] {
  if (!vssAvailable) return [];
  const buf = Buffer.from(queryVector.buffer, queryVector.byteOffset, queryVector.byteLength);
  return db
    .prepare(`SELECT rowid, distance FROM ${VSS_TABLE} WHERE vss_search(vector, ?) LIMIT ?`)
    .all(buf, topK) as IVssSearchResult[];
}

export function rebuildIndex(db: Database.Database): number {
  if (!vssAvailable) return 0;
  db.exec(`DROP TABLE IF EXISTS ${VSS_TABLE}`);
  db.exec(`CREATE VIRTUAL TABLE ${VSS_TABLE} USING vss0(vector(${DIMENSIONS}))`);

  const rows = db.prepare('SELECT rowid, vector_blob, dimensions FROM embeddings').all() as Array<{
    rowid: number;
    vector_blob: Buffer;
    dimensions: number;
  }>;

  if (rows.length === 0) return 0;

  const stmt = db.prepare(`INSERT INTO ${VSS_TABLE}(rowid, vector) VALUES (?, ?)`);
  const insertAll = db.transaction(() => {
    for (const r of rows) {
      stmt.run(r.rowid, r.vector_blob);
    }
  });
  insertAll();
  logger.info({ count: rows.length }, 'Vector index rebuilt');
  return rows.length;
}
