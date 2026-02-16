/**
 * SQLite schema for the RAG component graph.
 * Models graph relationships using junction tables.
 * Static TypeScript files remain the source of truth;
 * the DB is a runtime index rebuilt when missing.
 */

export const SCHEMA_VERSION = 1;

export const CREATE_TABLES = `
  -- Metadata
  CREATE TABLE IF NOT EXISTS meta (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  -- Node tables
  CREATE TABLE IF NOT EXISTS components (
    id           TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    category     TEXT NOT NULL,  -- atom | molecule | organism
    type         TEXT NOT NULL,
    variant      TEXT NOT NULL,
    jsx          TEXT NOT NULL,
    css          TEXT,
    a11y_json    TEXT NOT NULL,  -- JSON blob
    seo_json     TEXT,           -- JSON blob
    responsive_json TEXT NOT NULL, -- JSON blob
    quality_json TEXT NOT NULL,  -- JSON blob
    created_at   INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS tags (
    name TEXT PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS moods (
    name TEXT PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS industries (
    name TEXT PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS visual_styles (
    name TEXT PRIMARY KEY
  );

  -- Junction / edge tables
  CREATE TABLE IF NOT EXISTS component_tags (
    component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    tag_name     TEXT NOT NULL REFERENCES tags(name) ON DELETE CASCADE,
    PRIMARY KEY (component_id, tag_name)
  );

  CREATE TABLE IF NOT EXISTS component_moods (
    component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    mood_name    TEXT NOT NULL REFERENCES moods(name) ON DELETE CASCADE,
    PRIMARY KEY (component_id, mood_name)
  );

  CREATE TABLE IF NOT EXISTS component_industries (
    component_id  TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    industry_name TEXT NOT NULL REFERENCES industries(name) ON DELETE CASCADE,
    PRIMARY KEY (component_id, industry_name)
  );

  CREATE TABLE IF NOT EXISTS component_visual_styles (
    component_id    TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    style_name      TEXT NOT NULL REFERENCES visual_styles(name) ON DELETE CASCADE,
    PRIMARY KEY (component_id, style_name)
  );

  CREATE TABLE IF NOT EXISTS component_tailwind (
    component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    role         TEXT NOT NULL,
    classes      TEXT NOT NULL,
    PRIMARY KEY (component_id, role)
  );

  CREATE TABLE IF NOT EXISTS component_compositions (
    parent_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    child_id  TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
    PRIMARY KEY (parent_id, child_id)
  );

  -- Embeddings table for semantic search
  CREATE TABLE IF NOT EXISTS embeddings (
    source_id   TEXT NOT NULL,
    source_type TEXT NOT NULL,  -- component | pattern | prompt
    text        TEXT NOT NULL,
    vector_blob BLOB NOT NULL,  -- Float32Array serialized as buffer
    dimensions  INTEGER NOT NULL,
    model        TEXT NOT NULL,
    created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
    PRIMARY KEY (source_id, source_type)
  );

  CREATE INDEX IF NOT EXISTS idx_embeddings_source_type ON embeddings(source_type);

  -- Feedback tables for ML training
  CREATE TABLE IF NOT EXISTS feedback (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    generation_id TEXT NOT NULL,
    prompt       TEXT NOT NULL,
    component_type TEXT,
    variant      TEXT,
    mood         TEXT,
    industry     TEXT,
    style        TEXT,
    score        REAL NOT NULL CHECK(score >= -1 AND score <= 2),       -- -1 to 2
    feedback_type TEXT NOT NULL,      -- explicit | implicit
    code_hash    TEXT,
    rating       INTEGER,              -- Optional rating field
    confidence   REAL,                 -- Optional confidence field
    created_at   INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE INDEX IF NOT EXISTS idx_feedback_generation_id ON feedback(generation_id);
  CREATE INDEX IF NOT EXISTS idx_feedback_feedback_type ON feedback(feedback_type);
  CREATE INDEX IF NOT EXISTS idx_feedback_generation_feedback_type ON feedback(generation_id, feedback_type);

  CREATE TABLE IF NOT EXISTS training_jobs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    adapter     TEXT NOT NULL,        -- quality-scorer | prompt-enhancer | style-recommender
    status      TEXT NOT NULL,        -- idle | preparing | training | complete | failed
    progress    REAL NOT NULL DEFAULT 0,
    error       TEXT,
    started_at  INTEGER,
    completed_at INTEGER,
    examples_count INTEGER DEFAULT 0
  );

  -- Indexes for fast lookups
  CREATE INDEX IF NOT EXISTS idx_components_type ON components(type);
  CREATE INDEX IF NOT EXISTS idx_components_category ON components(category);
  CREATE INDEX IF NOT EXISTS idx_components_variant ON components(type, variant);
  CREATE INDEX IF NOT EXISTS idx_component_moods_mood ON component_moods(mood_name);
  CREATE INDEX IF NOT EXISTS idx_component_industries_ind ON component_industries(industry_name);
  CREATE INDEX IF NOT EXISTS idx_component_styles_style ON component_visual_styles(style_name);
  CREATE INDEX IF NOT EXISTS idx_component_tags_tag ON component_tags(tag_name);
`;
