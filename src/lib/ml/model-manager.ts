/**
 * Model manager — handles model/adapter paths, directory setup,
 * and model availability checks for the sidecar model system.
 *
 * All models and adapters are stored in `.uiforge/` (gitignored).
 * Models are downloaded on first use and cached locally.
 */

import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import pino from 'pino';
import type { AdapterType } from './types.js';

const logger = pino({ name: 'model-manager' });

/** Valid adapter types for validation */
export const ADAPTER_TYPES = ['quality-scorer', 'prompt-enhancer', 'style-recommender'] as const;

/** Default base directory for UIForge ML artifacts. */
const DEFAULT_BASE_DIR = join(homedir(), '.uiforge');

/** Model registry — known models and their download URLs. */
const MODEL_REGISTRY = {
  'qwen2.5-0.5b': {
    filename: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
    size: '~350MB',
    url: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf',
  },
} as const;

export type ModelId = keyof typeof MODEL_REGISTRY;

/** Paths configuration for the ML subsystem. */
export interface IModelPaths {
  base: string;
  models: string;
  adapters: string;
  trainingData: string;
  embeddings: string;
}

let _baseDir = DEFAULT_BASE_DIR;

/**
 * Configure the base directory for all ML artifacts.
 * Must be called before any other model-manager function.
 */
export function configureModelDir(baseDir: string): void {
  _baseDir = baseDir;
  logger.debug({ baseDir }, 'Model directory configured');
}

/**
 * Get the current base directory.
 */
export function getBaseDir(): string {
  return _baseDir;
}

/**
 * Get all standard paths for the ML subsystem.
 */
export function getModelPaths(): IModelPaths {
  return {
    base: _baseDir,
    models: join(_baseDir, 'models'),
    adapters: join(_baseDir, 'adapters'),
    trainingData: join(_baseDir, 'training-data'),
    embeddings: join(_baseDir, 'embeddings'),
  };
}

/**
 * Ensure all required directories exist.
 * Creates them recursively if missing.
 */
export function ensureDirectories(): IModelPaths {
  const paths = getModelPaths();
  for (const dir of Object.values(paths)) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
      logger.debug({ dir }, 'Created directory');
    }
  }
  return paths;
}

/**
 * Get the full path to a base model GGUF file.
 */
export function getModelPath(modelId: ModelId): string {
  const model = MODEL_REGISTRY[modelId];
  return join(getModelPaths().models, model.filename);
}

/**
 * Get the full path to a LoRA adapter file.
 */
export function getAdapterPath(adapter: AdapterType): string {
  return join(getModelPaths().adapters, `${adapter}.gguf`);
}

/**
 * Get the full path to a training data JSONL file.
 */
export function getTrainingDataPath(adapter: AdapterType): string {
  return join(getModelPaths().trainingData, `${adapter}.jsonl`);
}

/**
 * Check if a base model is available locally.
 */
export function isModelAvailable(modelId: ModelId): boolean {
  return existsSync(getModelPath(modelId));
}

/**
 * Check if a LoRA adapter is available locally.
 */
export function isAdapterAvailable(adapter: AdapterType): boolean {
  return existsSync(getAdapterPath(adapter));
}

/**
 * Get the download URL for a model.
 */
export function getModelDownloadUrl(modelId: ModelId): string {
  return MODEL_REGISTRY[modelId].url;
}

/**
 * Get the expected model filename.
 */
export function getModelFilename(modelId: ModelId): string {
  return MODEL_REGISTRY[modelId].filename;
}

/**
 * Get info about all available adapters.
 */
export function listAdapters(): Array<{
  adapter: AdapterType;
  available: boolean;
  path: string;
  sizeBytes: number;
}> {
  const adapters: AdapterType[] = ['quality-scorer', 'prompt-enhancer', 'style-recommender'];
  return adapters.map((adapter) => {
    const path = getAdapterPath(adapter);
    const available = existsSync(path);
    const sizeBytes = available ? statSync(path).size : 0;
    return { adapter, available, path, sizeBytes };
  });
}

/**
 * Get info about all available models.
 */
export function listModels(): Array<{
  modelId: ModelId;
  available: boolean;
  path: string;
  sizeBytes: number;
}> {
  return (Object.keys(MODEL_REGISTRY) as ModelId[]).map((modelId) => {
    const path = getModelPath(modelId);
    const available = existsSync(path);
    const sizeBytes = available ? statSync(path).size : 0;
    return { modelId, available, path, sizeBytes };
  });
}

/**
 * Get total disk usage of all ML artifacts.
 * Recursively calculates directory sizes.
 */
export function getDiskUsage(): { totalBytes: number; breakdown: Record<string, number> } {
  const paths = getModelPaths();
  const breakdown: Record<string, number> = {};
  let totalBytes = 0;

  for (const [key, dir] of Object.entries(paths)) {
    if (key === 'base') continue;
    const size = getDirectorySize(dir);
    breakdown[key] = size;
    totalBytes += size;
  }

  return { totalBytes, breakdown };
}

/**
 * Recursively calculate directory size.
 */
function getDirectorySize(dir: string): number {
  if (!existsSync(dir)) return 0;
  const stat = statSync(dir);
  if (!stat.isDirectory()) return stat.size;

  let total = 0;
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = statSync(filePath);
    if (fileStat.isDirectory()) {
      total += getDirectorySize(filePath); // Recursive call
    } else {
      total += fileStat.size;
    }
  }
  return total;
}
