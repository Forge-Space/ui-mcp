export const ARTIFACTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS generated_artifacts (
    id                TEXT PRIMARY KEY,
    type              TEXT NOT NULL,
    category          TEXT,
    prompt            TEXT NOT NULL,
    code              TEXT NOT NULL,
    structure_json    TEXT,
    metadata_json     TEXT,
    quality_score     REAL,
    feedback_score    REAL,
    inspiration_sources TEXT,
    embedding_blob    BLOB,
    embedding_dims    INTEGER,
    created_at        INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE INDEX IF NOT EXISTS idx_artifacts_type
    ON generated_artifacts(type);
  CREATE INDEX IF NOT EXISTS idx_artifacts_category
    ON generated_artifacts(category);
  CREATE INDEX IF NOT EXISTS idx_artifacts_quality
    ON generated_artifacts(quality_score DESC);
  CREATE INDEX IF NOT EXISTS idx_artifacts_feedback
    ON generated_artifacts(feedback_score DESC);
  CREATE INDEX IF NOT EXISTS idx_artifacts_created
    ON generated_artifacts(created_at DESC);
`;
