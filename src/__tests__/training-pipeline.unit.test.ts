import { getMemoryDatabase } from '../lib/design-references/database/store.js';
import { initializeRegistry, resetInitialization } from '../lib/design-references/component-registry/init.js';
import {
  exportRawExamples,
  buildQualityScorerData,
  buildPromptEnhancerData,
  buildStyleRecommenderData,
  writeJsonl,
  hasEnoughData,
} from '../lib/ml/training-data-exporter.js';
import {
  configureModelDir,
  getBaseDir,
  getModelPaths,
  ensureDirectories,
  getModelPath,
  getAdapterPath,
  getTrainingDataPath,
  isModelAvailable,
  isAdapterAvailable,
  listAdapters,
  listModels,
  getDiskUsage,
} from '../lib/ml/model-manager.js';
import {
  createTrainingJob,
  updateJobStatus,
  getLatestJobStatus,
  getAllJobStatuses,
  checkTrainingReadiness,
  getTrainingSummary,
  DEFAULT_LORA_CONFIG,
} from '../lib/ml/training-pipeline.js';
import type { ITrainingExample } from '../lib/ml/types.js';
import type Database from 'better-sqlite3';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('training-data-exporter', () => {
  let db: Database.Database;

  beforeAll(() => {
    resetInitialization();
    initializeRegistry();
  });

  beforeEach(() => {
    db = getMemoryDatabase();
  });

  afterEach(() => {
    db.close();
  });

  function seedFeedback(count: number, scoreRange: [number, number] = [-1, 2]): void {
    const stmt = db.prepare(
      `INSERT INTO feedback (generation_id, prompt, component_type, variant, mood, industry, style, score, feedback_type, code_hash, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    try {
      db.exec('BEGIN');
      for (let i = 0; i < count; i++) {
        // Deterministic score based on index to avoid flaky tests
        const normalizedIndex = i / Math.max(count - 1, 1);
        const score = scoreRange[0] + normalizedIndex * (scoreRange[1] - scoreRange[0]);
        stmt.run(
          `gen-${i}`,
          `Create a ${i % 2 === 0 ? 'card' : 'button'} component with ${i % 3 === 0 ? 'glassmorphism' : 'neumorphism'}`,
          i % 2 === 0 ? 'card' : 'button',
          'default',
          'professional',
          'saas',
          i % 3 === 0 ? 'glassmorphism' : 'neumorphism',
          score,
          i % 2 === 0 ? 'explicit' : 'implicit',
          `hash-${i}`,
          Math.floor(Date.now() / 1000) - i * 60
        );
      }
      db.exec('COMMIT');
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  }

  describe('exportRawExamples', () => {
    it('returns empty array when no feedback exists', () => {
      expect(exportRawExamples(db)).toEqual([]);
    });

    it('exports examples with metadata', () => {
      seedFeedback(5, [0.5, 1.5]);
      const examples = exportRawExamples(db);
      expect(examples.length).toBeGreaterThan(0);
      expect(examples[0]).toHaveProperty('prompt');
      expect(examples[0]).toHaveProperty('score');
      expect(examples[0]).toHaveProperty('params');
    });

    it('filters by minimum absolute score', () => {
      seedFeedback(10, [-0.1, 0.1]);
      const examples = exportRawExamples(db, { minAbsScore: 0.5 });
      expect(examples.length).toBe(0);
    });

    it('respects limit parameter', () => {
      seedFeedback(20, [0.5, 1.5]);
      const examples = exportRawExamples(db, { limit: 5 });
      expect(examples.length).toBe(5);
    });
  });

  describe('buildQualityScorerData', () => {
    it('converts examples to instruction format', () => {
      const examples: ITrainingExample[] = [
        { prompt: 'Create a card', code: 'div>h2+p', score: 1.5, params: { componentType: 'card' } },
        { prompt: 'Build a nav', code: 'nav>ul>li', score: -0.5, params: { componentType: 'nav' } },
      ];
      const rows = buildQualityScorerData(examples);
      expect(rows.length).toBe(2);
      expect(rows[0]!.instruction).toContain('Rate the likelihood');
      expect(rows[0]!.input).toContain('card');
      // Score 1.5 → (1.5+1)*3.33 = 8.33 → 8
      expect(parseInt(rows[0]!.output)).toBeGreaterThanOrEqual(7);
    });

    it('clamps output score to 0-10', () => {
      const examples: ITrainingExample[] = [
        { prompt: 'Test', code: '', score: 5.0, params: {} },
        { prompt: 'Test', code: '', score: -5.0, params: {} },
      ];
      const rows = buildQualityScorerData(examples);
      expect(parseInt(rows[0]!.output)).toBeLessThanOrEqual(10);
      expect(parseInt(rows[1]!.output)).toBeGreaterThanOrEqual(0);
    });

    it('skips empty prompts', () => {
      const examples: ITrainingExample[] = [
        { prompt: '', code: '', score: 1.0, params: {} },
      ];
      expect(buildQualityScorerData(examples).length).toBe(0);
    });
  });

  describe('buildPromptEnhancerData', () => {
    it('pairs bad prompts with good prompts of same type', () => {
      const examples: ITrainingExample[] = [
        { prompt: 'Good card prompt', code: '', score: 1.5, params: { componentType: 'card' } },
        { prompt: 'Bad card prompt', code: '', score: -0.8, params: { componentType: 'card' } },
      ];
      const rows = buildPromptEnhancerData(examples);
      expect(rows.length).toBe(1);
      expect(rows[0]!.input).toBe('Bad card prompt');
      expect(rows[0]!.output).toBe('Good card prompt');
    });

    it('returns empty if no bad prompts exist', () => {
      const examples: ITrainingExample[] = [
        { prompt: 'Great prompt', code: '', score: 1.5, params: { componentType: 'card' } },
      ];
      expect(buildPromptEnhancerData(examples).length).toBe(0);
    });
  });

  describe('buildStyleRecommenderData', () => {
    it('extracts style recommendations from positive feedback', () => {
      const examples: ITrainingExample[] = [
        { prompt: 'Dark hero section', code: '', score: 1.2, params: { style: 'glassmorphism' } },
        { prompt: 'Light card', code: '', score: 0.1, params: { style: 'neumorphism' } }, // too low score
        { prompt: 'Simple button', code: '', score: 1.0, params: {} }, // no style
      ];
      const rows = buildStyleRecommenderData(examples);
      expect(rows.length).toBe(1);
      expect(rows[0]!.output).toBe('glassmorphism');
    });
  });

  describe('writeJsonl', () => {
    let tmpDir: string;

    beforeEach(() => {
      tmpDir = mkdtempSync(join(tmpdir(), 'uiforge-test-'));
    });

    afterEach(() => {
      rmSync(tmpDir, { recursive: true, force: true });
    });

    it('writes rows to JSONL file', () => {
      const rows = [
        { instruction: 'test', input: 'a', output: 'b' },
        { instruction: 'test', input: 'c', output: 'd' },
      ];
      const filePath = join(tmpDir, 'test.jsonl');
      const count = writeJsonl(rows, filePath);
      expect(count).toBe(2);
      expect(existsSync(filePath)).toBe(true);

      const content = readFileSync(filePath, 'utf-8');
      const lines = content.trim().split('\n');
      expect(lines.length).toBe(2);
      expect(JSON.parse(lines[0]!)).toEqual(rows[0]);
    });

    it('returns 0 for empty rows', () => {
      expect(writeJsonl([], join(tmpDir, 'empty.jsonl'))).toBe(0);
    });

    it('creates parent directories', () => {
      const filePath = join(tmpDir, 'nested', 'deep', 'data.jsonl');
      writeJsonl([{ a: '1' }], filePath);
      expect(existsSync(filePath)).toBe(true);
    });
  });

  describe('hasEnoughData', () => {
    it('reports not ready with no data', () => {
      const result = hasEnoughData('quality-scorer', db);
      expect(result.ready).toBe(false);
      expect(result.count).toBe(0);
      expect(result.required).toBe(100);
    });

    it('reports ready when threshold is met', () => {
      seedFeedback(150, [0.5, 1.5]);
      const result = hasEnoughData('quality-scorer', db);
      expect(result.ready).toBe(true);
      expect(result.count).toBeGreaterThanOrEqual(100);
    });

    it('has different thresholds per adapter', () => {
      const qs = hasEnoughData('quality-scorer', db);
      const pe = hasEnoughData('prompt-enhancer', db);
      const sr = hasEnoughData('style-recommender', db);
      expect(qs.required).toBe(100);
      expect(pe.required).toBe(200);
      expect(sr.required).toBe(300);
    });
  });
});

describe('model-manager', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'uiforge-model-test-'));
    configureModelDir(tmpDir);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('configures and returns base dir', () => {
    expect(getBaseDir()).toBe(tmpDir);
  });

  it('returns correct model paths', () => {
    const paths = getModelPaths();
    expect(paths.base).toBe(tmpDir);
    expect(paths.models).toContain('models');
    expect(paths.adapters).toContain('adapters');
    expect(paths.trainingData).toContain('training-data');
  });

  it('ensures directories are created', () => {
    const paths = ensureDirectories();
    expect(existsSync(paths.models)).toBe(true);
    expect(existsSync(paths.adapters)).toBe(true);
    expect(existsSync(paths.trainingData)).toBe(true);
    expect(existsSync(paths.embeddings)).toBe(true);
  });

  it('returns model path for known model', () => {
    const path = getModelPath('qwen2.5-0.5b');
    expect(path).toContain('qwen2.5-0.5b-instruct-q4_k_m.gguf');
  });

  it('returns adapter path', () => {
    const path = getAdapterPath('quality-scorer');
    expect(path).toContain('quality-scorer.gguf');
  });

  it('returns training data path', () => {
    const path = getTrainingDataPath('prompt-enhancer');
    expect(path).toContain('prompt-enhancer.jsonl');
  });

  it('reports model not available when file missing', () => {
    expect(isModelAvailable('qwen2.5-0.5b')).toBe(false);
  });

  it('reports adapter not available when file missing', () => {
    expect(isAdapterAvailable('quality-scorer')).toBe(false);
  });

  it('lists all adapters', () => {
    const adapters = listAdapters();
    expect(adapters.length).toBe(3);
    expect(adapters.map((a) => a.adapter)).toEqual([
      'quality-scorer',
      'prompt-enhancer',
      'style-recommender',
    ]);
    expect(adapters.every((a) => !a.available)).toBe(true);
  });

  it('lists all models', () => {
    const models = listModels();
    expect(models.length).toBe(1);
    expect(models[0]!.modelId).toBe('qwen2.5-0.5b');
    expect(models[0]!.available).toBe(false);
  });

  it('reports zero disk usage initially', () => {
    ensureDirectories();
    const usage = getDiskUsage();
    expect(usage.totalBytes).toBe(0);
  });
});

describe('training-pipeline', () => {
  let db: Database.Database;

  beforeAll(() => {
    resetInitialization();
    initializeRegistry();
  });

  beforeEach(() => {
    db = getMemoryDatabase();
  });

  afterEach(() => {
    db.close();
  });

  describe('createTrainingJob', () => {
    it('creates a job record', () => {
      const jobId = createTrainingJob('quality-scorer', 100, db);
      expect(jobId).toBeGreaterThan(0);

      const row = db
        .prepare('SELECT * FROM training_jobs WHERE id = ?')
        .get(jobId) as { adapter: string; status: string; examples_count: number };
      expect(row.adapter).toBe('quality-scorer');
      expect(row.status).toBe('preparing');
      expect(row.examples_count).toBe(100);
    });
  });

  describe('updateJobStatus', () => {
    it('updates status and progress', () => {
      const jobId = createTrainingJob('quality-scorer', 50, db);
      updateJobStatus(jobId, 'training', 45, db);

      const row = db
        .prepare('SELECT status, progress FROM training_jobs WHERE id = ?')
        .get(jobId) as { status: string; progress: number };
      expect(row.status).toBe('training');
      expect(row.progress).toBe(45);
    });

    it('sets completed_at when status is complete', () => {
      const jobId = createTrainingJob('quality-scorer', 50, db);
      updateJobStatus(jobId, 'complete', 100, db);

      const row = db
        .prepare('SELECT completed_at FROM training_jobs WHERE id = ?')
        .get(jobId) as { completed_at: number | null };
      expect(row.completed_at).not.toBeNull();
    });

    it('records error on failure', () => {
      const jobId = createTrainingJob('quality-scorer', 50, db);
      updateJobStatus(jobId, 'failed', 0, db, 'Out of memory');

      const row = db
        .prepare('SELECT error FROM training_jobs WHERE id = ?')
        .get(jobId) as { error: string | null };
      expect(row.error).toBe('Out of memory');
    });
  });

  describe('getLatestJobStatus', () => {
    it('returns null when no jobs exist', () => {
      expect(getLatestJobStatus('quality-scorer', db)).toBeNull();
    });

    it('returns the latest job for an adapter', () => {
      createTrainingJob('quality-scorer', 50, db);
      const jobId2 = createTrainingJob('quality-scorer', 100, db);
      updateJobStatus(jobId2, 'complete', 100, db);

      const status = getLatestJobStatus('quality-scorer', db);
      expect(status).not.toBeNull();
      expect(status!.status).toBe('complete');
    });
  });

  describe('getAllJobStatuses', () => {
    it('returns idle status for all adapters when no jobs exist', () => {
      const statuses = getAllJobStatuses(db);
      expect(statuses.length).toBe(3);
      expect(statuses.every((s) => s.status === 'idle')).toBe(true);
    });

    it('mixes real and idle statuses', () => {
      createTrainingJob('quality-scorer', 50, db);
      const statuses = getAllJobStatuses(db);
      const qs = statuses.find((s) => s.adapter === 'quality-scorer');
      const pe = statuses.find((s) => s.adapter === 'prompt-enhancer');
      expect(qs!.status).toBe('preparing');
      expect(pe!.status).toBe('idle');
    });
  });

  describe('checkTrainingReadiness', () => {
    it('reports issues when data is insufficient', () => {
      const result = checkTrainingReadiness('quality-scorer', 'qwen2.5-0.5b', db);
      expect(result.ready).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
      expect(result.issues.some((i) => i.includes('Not enough training data'))).toBe(true);
    });

    it('reports model not found', () => {
      // Seed enough data (minimal columns suffice - checkTrainingReadiness only checks row count)
      // The "Base model" issue is triggered because the model file doesn't exist on disk,
      // not because of missing feedback columns
      const stmt = db.prepare(
        `INSERT INTO feedback (generation_id, prompt, score, feedback_type, created_at)
         VALUES (?, ?, ?, ?, ?)`
      );
      for (let i = 0; i < 150; i++) {
        stmt.run(`g-${i}`, `prompt-${i}`, 0.8, 'explicit', Math.floor(Date.now() / 1000));
      }

      const result = checkTrainingReadiness('quality-scorer', 'qwen2.5-0.5b', db);
      expect(result.issues.some((i) => i.includes('Base model'))).toBe(true);
    });
  });

  describe('getTrainingSummary', () => {
    it('returns complete summary', () => {
      const summary = getTrainingSummary(db);
      expect(summary.jobs.length).toBe(3);
      expect(summary.dataReadiness).toHaveProperty('quality-scorer');
      expect(summary.dataReadiness).toHaveProperty('prompt-enhancer');
      expect(summary.dataReadiness).toHaveProperty('style-recommender');
      expect(summary.activeCount).toBe(0);
    });
  });

  describe('DEFAULT_LORA_CONFIG', () => {
    it('has sensible defaults for N100 CPU', () => {
      // Use ranges instead of exact values to allow tuning without breaking tests
      expect(DEFAULT_LORA_CONFIG.rank).toBeGreaterThanOrEqual(4);
      expect(DEFAULT_LORA_CONFIG.rank).toBeLessThanOrEqual(16);
      expect(DEFAULT_LORA_CONFIG.batchSize).toBeGreaterThanOrEqual(1);
      expect(DEFAULT_LORA_CONFIG.batchSize).toBeLessThanOrEqual(8);
      expect(DEFAULT_LORA_CONFIG.epochs).toBeGreaterThanOrEqual(1);
      expect(DEFAULT_LORA_CONFIG.epochs).toBeLessThanOrEqual(10);
      expect(DEFAULT_LORA_CONFIG.learningRate).toBeGreaterThan(0);
      expect(DEFAULT_LORA_CONFIG.learningRate).toBeLessThan(0.01);
    });
  });
});
