/**
 * SQLite-backed graph store for the RAG component registry.
 * Uses better-sqlite3 for embedded, zero-cost persistence.
 *
 * Static TypeScript files remain the source of truth.
 * The DB is a runtime index rebuilt from static files when missing.
 */

import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import pino from 'pino';
import { CREATE_TABLES, SCHEMA_VERSION } from './schema.js';
import { safeJSONParse } from '../../config.js';
import { initVectorIndex } from '../../ml/vector-index.js';

const logger = pino({ name: 'design-references-db' });
import type {
  IComponentSnippet,
  IComponentSeo,
  IComponentQuery,
  ISearchResult,
  ComponentCategory,
  MoodTag,
  IndustryTag,
  VisualStyleId,
} from '../component-registry/types.js';

// --- Singleton ---

let db: Database.Database | null = null;
let _dbPath: string | null = null;

/**
 * Get or create the SQLite database connection.
 * Defaults to `.uiforge/rag.sqlite` in the project root.
 */
export function getDatabase(customPath?: string): Database.Database {
  if (db) return db;

  const resolvedPath = customPath ?? getDefaultDbPath();
  const dir = path.dirname(resolvedPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(resolvedPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(CREATE_TABLES);
  db.pragma('synchronous = NORMAL');
  db.prepare('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)').run('schema_version', String(SCHEMA_VERSION));

  initVectorIndex(db);

  logger.info({ dbPath: resolvedPath }, 'Database opened/created');
  _dbPath = resolvedPath;
  return db;
}

/**
 * Get an in-memory database (useful for testing).
 */
export function getMemoryDatabase(): Database.Database {
  const memDb = new Database(':memory:');
  memDb.pragma('foreign_keys = ON');
  memDb.exec(CREATE_TABLES);
  memDb.prepare('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)').run('schema_version', String(SCHEMA_VERSION));
  return memDb;
}

/**
 * Close the database connection.
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
    _dbPath = null;
  }
}

/**
 * Check if the database has been seeded with component data.
 */
export function isSeeded(database?: Database.Database): boolean {
  const d = database ?? getDatabase();
  const row = d.prepare('SELECT value FROM meta WHERE key = ?').get('seeded') as { value: string } | undefined;
  return row?.value === 'true';
}

// --- Seed ---

/**
 * Seed the database from an array of component snippets.
 * This is called after loading static TypeScript files into the in-memory registry.
 */
export function seedComponents(snippets: IComponentSnippet[], database?: Database.Database): void {
  const d = database ?? getDatabase();

  const insertComponent = d.prepare(`
    INSERT OR REPLACE INTO components (id, name, category, type, variant, jsx, css, a11y_json, seo_json, responsive_json, quality_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTag = d.prepare('INSERT OR IGNORE INTO tags (name) VALUES (?)');
  const insertMood = d.prepare('INSERT OR IGNORE INTO moods (name) VALUES (?)');
  const insertIndustry = d.prepare('INSERT OR IGNORE INTO industries (name) VALUES (?)');
  const insertStyle = d.prepare('INSERT OR IGNORE INTO visual_styles (name) VALUES (?)');

  const insertComponentTag = d.prepare('INSERT OR IGNORE INTO component_tags (component_id, tag_name) VALUES (?, ?)');
  const insertComponentMood = d.prepare(
    'INSERT OR IGNORE INTO component_moods (component_id, mood_name) VALUES (?, ?)'
  );
  const insertComponentIndustry = d.prepare(
    'INSERT OR IGNORE INTO component_industries (component_id, industry_name) VALUES (?, ?)'
  );
  const insertComponentStyle = d.prepare(
    'INSERT OR IGNORE INTO component_visual_styles (component_id, style_name) VALUES (?, ?)'
  );
  const insertTailwind = d.prepare(
    'INSERT OR REPLACE INTO component_tailwind (component_id, role, classes) VALUES (?, ?, ?)'
  );

  const seedAll = d.transaction(() => {
    for (const s of snippets) {
      insertComponent.run(
        s.id,
        s.name,
        s.category,
        s.type,
        s.variant,
        s.jsx,
        s.css ?? null,
        JSON.stringify(s.a11y),
        s.seo ? JSON.stringify(s.seo) : null,
        JSON.stringify(s.responsive),
        JSON.stringify(s.quality)
      );

      for (const tag of s.tags) {
        insertTag.run(tag);
        insertComponentTag.run(s.id, tag);
      }
      for (const mood of s.mood) {
        insertMood.run(mood);
        insertComponentMood.run(s.id, mood);
      }
      for (const ind of s.industry) {
        insertIndustry.run(ind);
        insertComponentIndustry.run(s.id, ind);
      }
      for (const style of s.visualStyles) {
        insertStyle.run(style);
        insertComponentStyle.run(s.id, style);
      }
      for (const [role, classes] of Object.entries(s.tailwindClasses)) {
        insertTailwind.run(s.id, role, classes);
      }
    }

    d.prepare('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)').run('seeded', 'true');
    d.prepare('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)').run('seed_count', String(snippets.length));
  });

  seedAll();
  logger.info({ count: snippets.length }, 'Components seeded to database');
}

// --- Query ---

/**
 * Search components using indexed SQL queries.
 * Replaces the O(n) linear search with indexed lookups.
 */
export function queryComponents(query: IComponentQuery, database?: Database.Database): ISearchResult[] {
  const d = database ?? getDatabase();

  // Build dynamic score + WHERE using positional ? params (separated arrays)
  const whereParams: (string | number)[] = [];
  const scoreParams: (string | number)[] = [];
  const whereConditions: string[] = [];
  const scoreExprParts: string[] = [];

  if (query.type) {
    const typeVal = query.type.toLowerCase();
    whereConditions.push('(c.type = ? OR c.type LIKE ?)');
    whereParams.push(typeVal, `%${typeVal}%`);
    scoreExprParts.push('CASE WHEN c.type = ? THEN 10 WHEN c.type LIKE ? THEN 5 ELSE 0 END');
    scoreParams.push(typeVal, `%${typeVal}%`);
  }

  if (query.variant) {
    const varVal = query.variant.toLowerCase();
    whereConditions.push('(c.variant = ? OR c.variant LIKE ?)');
    whereParams.push(varVal, `%${varVal}%`);
    scoreExprParts.push('CASE WHEN c.variant = ? THEN 8 WHEN c.variant LIKE ? THEN 4 ELSE 0 END');
    scoreParams.push(varVal, `%${varVal}%`);
  }

  if (query.category) {
    scoreExprParts.push('CASE WHEN c.category = ? THEN 4 ELSE 0 END');
    scoreParams.push(query.category);
  }

  if (query.mood) {
    scoreExprParts.push(`CASE WHEN EXISTS (
      SELECT 1 FROM component_moods cm WHERE cm.component_id = c.id AND cm.mood_name = ?
    ) THEN 6 ELSE 0 END`);
    scoreParams.push(query.mood);
  }

  if (query.industry) {
    scoreExprParts.push(`CASE WHEN EXISTS (
      SELECT 1 FROM component_industries ci WHERE ci.component_id = c.id AND ci.industry_name = ?
    ) THEN 5 WHEN EXISTS (
      SELECT 1 FROM component_industries ci WHERE ci.component_id = c.id AND ci.industry_name = 'general'
    ) THEN 2 ELSE 0 END`);
    scoreParams.push(query.industry);
  }

  if (query.style) {
    scoreExprParts.push(`CASE WHEN EXISTS (
      SELECT 1 FROM component_visual_styles cs WHERE cs.component_id = c.id AND cs.style_name = ?
    ) THEN 6 ELSE 0 END`);
    scoreParams.push(query.style);
  }

  const finalScore = scoreExprParts.length > 0 ? scoreExprParts.join(' + ') : '0';
  const finalWhere = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

  // In SQLite, ? params bind left-to-right: first the score expr params in SELECT,
  // then the WHERE params. So we need score params first.
  const sql = `
    SELECT * FROM (
      SELECT c.id, (${finalScore}) as score
      FROM components c
      ${finalWhere}
    ) WHERE score > 0
    ORDER BY score DESC
    LIMIT 20
  `;

  // Parameter order: score expression ? params come first (in SELECT), then WHERE ? params
  const allParams = [...scoreParams, ...whereParams];
  const rows = d.prepare(sql).all(...allParams) as Array<{ id: string; score: number }>;

  logger.debug({ query, resultCount: rows.length }, 'Query executed');

  // Hydrate full snippets (batch queries to avoid N+1)
  const snippets = hydrateSnippetsBatch(
    rows.map((r) => r.id),
    d
  );
  const snippetById = new Map(snippets.map((s) => [s.id, s]));
  return rows
    .map((row) => {
      const snippet = snippetById.get(row.id);
      if (!snippet) return null;
      return { snippet, score: row.score };
    })
    .filter((item): item is { snippet: IComponentSnippet; score: number } => item !== null);
}

/**
 * Get a single component by ID, fully hydrated.
 */
export function getComponentById(id: string, database?: Database.Database): IComponentSnippet | undefined {
  const d = database ?? getDatabase();
  const row = d.prepare('SELECT id FROM components WHERE id = ?').get(id) as { id: string } | undefined;
  if (!row) return undefined;
  return hydrateSnippet(id, d);
}

/**
 * Get all components for a given category.
 */
export function getComponentsByCategory(
  category: ComponentCategory,
  database?: Database.Database
): IComponentSnippet[] {
  const d = database ?? getDatabase();
  const rows = d.prepare('SELECT id FROM components WHERE category = ?').all(category) as Array<{
    id: string;
  }>;
  const ids = rows.map((r) => r.id);
  return hydrateSnippetsBatch(ids, d);
}

/**
 * Get components that share a relationship (e.g., same mood, same industry).
 */
export function getRelatedComponents(componentId: string, database?: Database.Database): IComponentSnippet[] {
  const d = database ?? getDatabase();

  // Find components that share at least one mood or industry with the given component
  const sql = `
    SELECT DISTINCT c2.id
    FROM components c2
    WHERE c2.id != ? AND (
      EXISTS (
        SELECT 1 FROM component_moods cm1
        JOIN component_moods cm2 ON cm1.mood_name = cm2.mood_name
        WHERE cm1.component_id = ? AND cm2.component_id = c2.id
      )
      OR EXISTS (
        SELECT 1 FROM component_industries ci1
        JOIN component_industries ci2 ON ci1.industry_name = ci2.industry_name
        WHERE ci1.component_id = ? AND ci2.component_id = c2.id
      )
    )
    LIMIT 10
  `;

  const rows = d.prepare(sql).all(componentId, componentId, componentId) as Array<{ id: string }>;
  const ids = rows.map((r) => r.id);
  return hydrateSnippetsBatch(ids, d);
}

/**
 * Get component count.
 */
export function getComponentCount(database?: Database.Database): number {
  const d = database ?? getDatabase();
  const row = d.prepare('SELECT COUNT(*) as cnt FROM components').get() as { cnt: number };
  return row.cnt;
}

// --- Hydration ---

/**
 * Batch hydrate multiple snippets to avoid N+1 queries.
 */
function hydrateSnippetsBatch(ids: string[], d: Database.Database): IComponentSnippet[] {
  if (ids.length === 0) return [];

  const SQLITE_MAX_VARIABLE_NUMBER = 900;
  const allRows: Array<{
    id: string;
    name: string;
    category: ComponentCategory;
    type: string;
    variant: string;
    jsx: string;
    css: string | null;
    a11y_json: string;
    seo_json: string | null;
    responsive_json: string;
    quality_json: string;
  }> = [];

  // Split ids into chunks to avoid SQLite variable limit
  for (let i = 0; i < ids.length; i += SQLITE_MAX_VARIABLE_NUMBER) {
    const chunk = ids.slice(i, i + SQLITE_MAX_VARIABLE_NUMBER);
    const placeholders = chunk.map(() => '?').join(',');

    const rows = d
      .prepare(
        `SELECT id, name, category, type, variant, jsx, css, a11y_json, seo_json, responsive_json, quality_json
         FROM components WHERE id IN (${placeholders})`
      )
      .all(...chunk) as typeof allRows;

    allRows.push(...rows);
  }

  // Batch fetch all related data (also chunked)
  const tagsMap = new Map<string, string[]>();
  for (let i = 0; i < ids.length; i += SQLITE_MAX_VARIABLE_NUMBER) {
    const chunk = ids.slice(i, i + SQLITE_MAX_VARIABLE_NUMBER);
    const placeholders = chunk.map(() => '?').join(',');
    const tagsRows = d
      .prepare(`SELECT component_id, tag_name FROM component_tags WHERE component_id IN (${placeholders})`)
      .all(...chunk) as Array<{ component_id: string; tag_name: string }>;
    for (const row of tagsRows) {
      if (!tagsMap.has(row.component_id)) tagsMap.set(row.component_id, []);
      tagsMap.get(row.component_id)?.push(row.tag_name);
    }
  }

  const moodsMap = new Map<string, MoodTag[]>();
  for (let i = 0; i < ids.length; i += SQLITE_MAX_VARIABLE_NUMBER) {
    const chunk = ids.slice(i, i + SQLITE_MAX_VARIABLE_NUMBER);
    const placeholders = chunk.map(() => '?').join(',');
    const moodsRows = d
      .prepare(`SELECT component_id, mood_name FROM component_moods WHERE component_id IN (${placeholders})`)
      .all(...chunk) as Array<{ component_id: string; mood_name: MoodTag }>;
    for (const row of moodsRows) {
      if (!moodsMap.has(row.component_id)) moodsMap.set(row.component_id, []);
      moodsMap.get(row.component_id)?.push(row.mood_name);
    }
  }

  const industriesMap = new Map<string, IndustryTag[]>();
  for (let i = 0; i < ids.length; i += SQLITE_MAX_VARIABLE_NUMBER) {
    const chunk = ids.slice(i, i + SQLITE_MAX_VARIABLE_NUMBER);
    const placeholders = chunk.map(() => '?').join(',');
    const industriesRows = d
      .prepare(`SELECT component_id, industry_name FROM component_industries WHERE component_id IN (${placeholders})`)
      .all(...chunk) as Array<{ component_id: string; industry_name: IndustryTag }>;
    for (const row of industriesRows) {
      if (!industriesMap.has(row.component_id)) industriesMap.set(row.component_id, []);
      industriesMap.get(row.component_id)?.push(row.industry_name);
    }
  }

  const stylesMap = new Map<string, VisualStyleId[]>();
  for (let i = 0; i < ids.length; i += SQLITE_MAX_VARIABLE_NUMBER) {
    const chunk = ids.slice(i, i + SQLITE_MAX_VARIABLE_NUMBER);
    const placeholders = chunk.map(() => '?').join(',');
    const stylesRows = d
      .prepare(`SELECT component_id, style_name FROM component_visual_styles WHERE component_id IN (${placeholders})`)
      .all(...chunk) as Array<{ component_id: string; style_name: VisualStyleId }>;
    for (const row of stylesRows) {
      if (!stylesMap.has(row.component_id)) stylesMap.set(row.component_id, []);
      stylesMap.get(row.component_id)?.push(row.style_name);
    }
  }

  const tailwindMap = new Map<string, Record<string, string>>();
  for (let i = 0; i < ids.length; i += SQLITE_MAX_VARIABLE_NUMBER) {
    const chunk = ids.slice(i, i + SQLITE_MAX_VARIABLE_NUMBER);
    const placeholders = chunk.map(() => '?').join(',');
    const tailwindRows = d
      .prepare(`SELECT component_id, role, classes FROM component_tailwind WHERE component_id IN (${placeholders})`)
      .all(...chunk) as Array<{ component_id: string; role: string; classes: string }>;
    for (const row of tailwindRows) {
      if (!tailwindMap.has(row.component_id)) tailwindMap.set(row.component_id, {});
      const tailwindEntry = tailwindMap.get(row.component_id);
      if (tailwindEntry) tailwindEntry[row.role] = row.classes;
    }
  }

  // Build snippets with safe JSON parsing (using imported safeJSONParse from config.js)
  return allRows.map((row) => {
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      type: row.type,
      variant: row.variant,
      tags: tagsMap.get(row.id) ?? [],
      mood: moodsMap.get(row.id) ?? [],
      industry: industriesMap.get(row.id) ?? [],
      visualStyles: stylesMap.get(row.id) ?? [],
      jsx: row.jsx,
      tailwindClasses: tailwindMap.get(row.id) ?? {},
      css: row.css ?? undefined,
      a11y: safeJSONParse(row.a11y_json, {
        roles: [],
        ariaAttributes: [],
        keyboardNav: '',
        contrastRatio: '',
        focusVisible: false,
        reducedMotion: false,
      }),
      seo: row.seo_json ? safeJSONParse<IComponentSeo>(row.seo_json, { semanticElement: 'div' }) : undefined,
      responsive: safeJSONParse(row.responsive_json, { strategy: 'mobile-first', breakpoints: [] }),
      quality: safeJSONParse(row.quality_json, { antiGeneric: [], inspirationSource: '', craftDetails: [] }),
    };
  });
}

function hydrateSnippet(id: string, d: Database.Database): IComponentSnippet {
  const results = hydrateSnippetsBatch([id], d);
  if (results.length === 0) {
    throw new Error(`Component with id ${id} not found`);
  }
  return results[0];
}

// --- Bulk Load ---

export function getAllComponents(database?: Database.Database): IComponentSnippet[] {
  const d = database ?? getDatabase();
  const rows = d.prepare('SELECT id FROM components').all() as Array<{ id: string }>;
  return hydrateSnippetsBatch(
    rows.map((r) => r.id),
    d
  );
}

export function upsertComponent(snippet: IComponentSnippet, database?: Database.Database): void {
  seedComponents([snippet], database);
}

export function deleteComponent(id: string, database?: Database.Database): boolean {
  const d = database ?? getDatabase();
  const result = d.prepare('DELETE FROM components WHERE id = ?').run(id);
  return result.changes > 0;
}

// --- Utility ---

function getDefaultDbPath(): string {
  return path.resolve(process.cwd(), '.uiforge', 'rag.sqlite');
}
