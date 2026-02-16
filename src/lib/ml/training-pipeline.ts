/**
 * Training pipeline — orchestrates LoRA fine-tuning jobs.
 *
 * Flow: check readiness → export data → spawn training → track status → save adapter.
 *
 * Training runs as a background process via child_process so the MCP server
 * stays responsive. Status is tracked in the SQLite training_jobs table.
 *
 * Note: Actual LoRA training requires the llama.cpp `finetune` binary
 * or a Python training script. This module manages the orchestration layer.
 */

import type Database from 'better-sqlite3';
import { spawn, type ChildProcess } from 'node:child_process';
import { existsSync } from 'node:fs';
import pino from 'pino';
import type { AdapterType, ILoRAConfig, ITrainingStatus } from './types.js';
import { exportForAdapter, hasEnoughData } from './training-data-exporter.js';
import {
  ensureDirectories,
  getAdapterPath,
  getModelPath,
  isModelAvailable,
  type ModelId,
} from './model-manager.js';

const logger = pino({ name: 'training-pipeline' });

/** Default LoRA configuration optimized for N100 CPU. */
export const DEFAULT_LORA_CONFIG: ILoRAConfig = {
  rank: 8,
  epochs: 3,
  batchSize: 4,
  learningRate: 1e-4,
};

/** Active training processes indexed by adapter type. */
const activeJobs = new Map<AdapterType, ChildProcess>();

/**
 * Create a new training job record in the database.
 */
export function createTrainingJob(
  adapter: AdapterType,
  examplesCount: number,
  db: Database.Database
): number {
  const result = db
    .prepare(
      `INSERT INTO training_jobs (adapter, status, progress, started_at, examples_count)
       VALUES (?, 'preparing', 0, ?, ?)`
    )
    .run(adapter, Date.now(), examplesCount);

  return Number(result.lastInsertRowid);
}

/**
 * Update training job status.
 */
export function updateJobStatus(
  jobId: number,
  status: ITrainingStatus['status'],
  progress: number,
  db: Database.Database,
  error?: string
): void {
  const completedAt = status === 'complete' || status === 'failed'
    ? Date.now()
    : null;

  db.prepare(
    `UPDATE training_jobs
     SET status = ?, progress = ?, error = ?, completed_at = COALESCE(?, completed_at)
     WHERE id = ?`
  ).run(status, progress, error ?? null, completedAt, jobId);
}

/**
 * Get the latest training job status for an adapter.
 */
export function getLatestJobStatus(
  adapter: AdapterType,
  db: Database.Database
): ITrainingStatus | null {
  const row = db
    .prepare(
      `SELECT adapter, status, progress, error, started_at, completed_at
       FROM training_jobs
       WHERE adapter = ?
       ORDER BY id DESC
       LIMIT 1`
    )
    .get(adapter) as {
      adapter: string;
      status: string;
      progress: number;
      error: string | null;
      started_at: number | null;
      completed_at: number | null;
    } | undefined;

  if (!row) return null;

  return {
    adapter: row.adapter as AdapterType,
    status: row.status as ITrainingStatus['status'],
    progress: row.progress,
    error: row.error ?? undefined,
    startedAt: row.started_at ?? undefined,
    completedAt: row.completed_at ?? undefined,
  };
}

/**
 * Get status of all training jobs.
 */
export function getAllJobStatuses(
  db: Database.Database
): ITrainingStatus[] {
  const adapters: AdapterType[] = ['quality-scorer', 'prompt-enhancer', 'style-recommender'];
  const statuses: ITrainingStatus[] = [];

  for (const adapter of adapters) {
    const status = getLatestJobStatus(adapter, db);
    if (status) {
      statuses.push(status);
    } else {
      statuses.push({
        adapter,
        status: 'idle',
        progress: 0,
      });
    }
  }

  return statuses;
}

/**
 * Check if a training job is currently running for an adapter.
 */
export function isTraining(adapter: AdapterType): boolean {
  return activeJobs.has(adapter);
}

/**
 * Pre-flight check: verify all prerequisites for training.
 */
export function checkTrainingReadiness(
  adapter: AdapterType,
  modelId: ModelId,
  db: Database.Database
): {
  ready: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check data availability
  const dataCheck = hasEnoughData(adapter, db);
  if (!dataCheck.ready) {
    issues.push(
      `Not enough training data: ${dataCheck.count}/${dataCheck.required} examples`
    );
  }

  // Check model availability
  if (!isModelAvailable(modelId)) {
    issues.push(
      `Base model '${modelId}' not found. Download it first.`
    );
  }

  // Check if already training
  if (isTraining(adapter)) {
    issues.push(`Training already in progress for '${adapter}'`);
  }

  return { ready: issues.length === 0, issues };
}

/**
 * Start a LoRA training job for the specified adapter.
 *
 * This exports training data, then spawns an external training process.
 * The process can be:
 * 1. llama.cpp `finetune` binary (if available)
 * 2. A Python training script (if Python + PEFT are available)
 * 3. A mock/stub for testing
 *
 * Returns the job ID for status tracking.
 */
export function startTrainingJob(
  adapter: AdapterType,
  modelId: ModelId,
  db: Database.Database,
  config: ILoRAConfig = DEFAULT_LORA_CONFIG,
  trainingCommand?: string
): { jobId: number; status: ITrainingStatus } {
  // Ensure directories exist
  const paths = ensureDirectories();

  // Export training data
  const { path: dataPath, count } = exportForAdapter(adapter, db, paths.trainingData);

  if (count === 0) {
    const jobId = createTrainingJob(adapter, 0, db);
    updateJobStatus(jobId, 'failed', 0, db, 'No training data available');
    return {
      jobId,
      status: {
        adapter,
        status: 'failed',
        progress: 0,
        error: 'No training data available',
      },
    };
  }

  const jobId = createTrainingJob(adapter, count, db);

  // Determine training command
  const modelPath = getModelPath(modelId);
  const adapterPath = getAdapterPath(adapter);
  const cmd =
    trainingCommand ??
    buildDefaultTrainingCommand(modelPath, dataPath, adapterPath, config);

  logger.info(
    { adapter, jobId, count, modelId },
    'Starting LoRA training job'
  );

  // Spawn training process
  try {
    // Parse command into argv array for safer execution
    const cmdParts = cmd.split(/\s+/);
    const child = spawn(cmdParts[0], cmdParts.slice(1), {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: true,
    });

    activeJobs.set(adapter, child);

    updateJobStatus(jobId, 'training', 10, db);

    child.stdout?.on('data', (data: Buffer) => {
      const line = data.toString().trim();
      // Parse progress from output if possible
      const progress = parseProgress(line);
      if (progress !== null) {
        updateJobStatus(jobId, 'training', progress, db);
      }
      logger.debug({ adapter, line }, 'Training output');
    });

    child.stderr?.on('data', (data: Buffer) => {
      logger.warn({ adapter, stderr: data.toString().trim() }, 'Training stderr');
    });

    child.on('close', (code) => {
      activeJobs.delete(adapter);

      // Kill entire process group to prevent orphaned processes
      if (child.pid) {
        try {
          process.kill(-child.pid, 'SIGTERM');
        } catch (err) {
          logger.debug({ err }, 'Process group already terminated');
        }
      }

      if (code === 0 && existsSync(adapterPath)) {
        updateJobStatus(jobId, 'complete', 100, db);
        logger.info({ adapter, jobId }, 'Training completed successfully');
      } else {
        updateJobStatus(
          jobId,
          'failed',
          0,
          db,
          `Process exited with code ${code}`
        );
        logger.error({ adapter, jobId, code }, 'Training failed');
      }
    });

    child.on('error', (err) => {
      activeJobs.delete(adapter);
      updateJobStatus(jobId, 'failed', 0, db, err.message);
      logger.error({ adapter, jobId, error: err.message }, 'Training process error');
    });

    // Unref so the process doesn't prevent Node from exiting
    child.unref();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    updateJobStatus(jobId, 'failed', 0, db, msg);
    return {
      jobId,
      status: { adapter, status: 'failed', progress: 0, error: msg },
    };
  }

  return {
    jobId,
    status: { adapter, status: 'training', progress: 10, startedAt: Date.now() },
  };
}

/**
 * Cancel a running training job.
 */
export function cancelTrainingJob(
  adapter: AdapterType,
  db: Database.Database
): boolean {
  const child = activeJobs.get(adapter);
  if (!child) return false;

  try {
    child.kill('SIGTERM');
    activeJobs.delete(adapter);

    const status = getLatestJobStatus(adapter, db);
    if (status) {
      // Find job ID by querying
      const row = db
        .prepare(
          `SELECT id FROM training_jobs WHERE adapter = ? ORDER BY id DESC LIMIT 1`
        )
        .get(adapter) as { id: number } | undefined;
      if (row) {
        updateJobStatus(row.id, 'failed', 0, db, 'Cancelled by user');
      }
    }

    logger.info({ adapter }, 'Training job cancelled');
    return true;
  } catch {
    return false;
  }
}

/**
 * Get a summary of the training pipeline state.
 */
export function getTrainingSummary(db: Database.Database): {
  jobs: ITrainingStatus[];
  dataReadiness: Record<AdapterType, { ready: boolean; count: number; required: number }>;
  activeCount: number;
} {
  const adapters: AdapterType[] = ['quality-scorer', 'prompt-enhancer', 'style-recommender'];
  const dataReadiness = {} as Record<
    AdapterType,
    { ready: boolean; count: number; required: number }
  >;

  for (const adapter of adapters) {
    dataReadiness[adapter] = hasEnoughData(adapter, db);
  }

  return {
    jobs: getAllJobStatuses(db),
    dataReadiness,
    activeCount: activeJobs.size,
  };
}

// --- Internal helpers ---

function buildDefaultTrainingCommand(
  modelPath: string,
  dataPath: string,
  adapterPath: string,
  config: ILoRAConfig
): string {
  // Default: use llama.cpp finetune binary
  return [
    'llama-finetune',
    `--model "${modelPath}"`,
    `--train-data "${dataPath}"`,
    `--lora-out "${adapterPath}"`,
    `--lora-r ${config.rank}`,
    `--epochs ${config.epochs}`,
    `--batch ${config.batchSize}`,
    `--learning-rate ${config.learningRate}`,
    '--threads 2',
  ].join(' ');
}

function parseProgress(line: string): number | null {
  // Try to parse "progress: 45%" or "epoch 2/3" patterns
  const percentMatch = line.match(/(\d+(?:\.\d+)?)%/);
  if (percentMatch) {
    return Math.min(99, parseFloat(percentMatch[1]!));
  }

  const epochMatch = line.match(/epoch\s+(\d+)\s*\/\s*(\d+)/i);
  if (epochMatch) {
    const current = parseInt(epochMatch[1]!, 10);
    const total = parseInt(epochMatch[2]!, 10);
    return Math.min(99, Math.round((current / total) * 100));
  }

  return null;
}
