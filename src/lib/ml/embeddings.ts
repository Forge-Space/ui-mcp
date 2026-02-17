/**
 * Sentence embeddings using Transformers.js (ONNX runtime).
 *
 * Downloads `all-MiniLM-L6-v2` on first use (~80MB), cached in `.uiforge/models/`.
 * Runs entirely on CPU — ~50-100ms per embedding on modern hardware.
 */

import path from 'node:path';
import fs from 'node:fs';
import pino from 'pino';
import type { IEmbedding, ISimilarityResult, IEmbeddingConfig } from './types.js';

const logger = pino({ name: 'ml-embeddings' });

// Lazy-loaded pipeline
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let extractor: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pipelineFn: any = null;

const DEFAULT_CONFIG: IEmbeddingConfig = {
  modelId: 'Xenova/all-MiniLM-L6-v2',
  cacheDir: path.resolve(process.cwd(), '.uiforge', 'models'),
  dimensions: 384,
};

let config: IEmbeddingConfig = { ...DEFAULT_CONFIG };

/**
 * Override default embedding configuration.
 */
export function configureEmbeddings(overrides: Partial<IEmbeddingConfig>): void {
  config = { ...DEFAULT_CONFIG, ...overrides };
  extractor = null; // Reset so next call re-loads with new config
}

/**
 * Get the embedding configuration.
 */
export function getEmbeddingConfig(): IEmbeddingConfig {
  return { ...config };
}

/**
 * Lazily initialize the sentence-transformer pipeline.
 * Downloads the model on first use if not cached.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getExtractor(): Promise<any> {
  if (extractor) return extractor;

  // Ensure cache directory exists
  if (!fs.existsSync(config.cacheDir)) {
    fs.mkdirSync(config.cacheDir, { recursive: true });
  }

  // Dynamic import to avoid loading the large library at module init time
  if (!pipelineFn) {
    const transformers = await import('@huggingface/transformers');
    pipelineFn = transformers.pipeline;
    // Configure Transformers.js to use our cache dir
    if (transformers.env) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (transformers.env as any).cacheDir = config.cacheDir;
    }
  }

  logger.info({ model: config.modelId, cache: config.cacheDir }, 'Loading embedding model');
  try {
    extractor = await pipelineFn('feature-extraction', config.modelId, {
      quantized: true, // Use quantized model for smaller size & faster CPU inference
    });
    logger.info('Embedding model loaded');
    return extractor;
  } catch (err) {
    logger.error({ err, model: config.modelId }, 'Failed to load embedding model');
    throw new Error(`Failed to load embedding model: ${err}`);
  }
}

/**
 * Generate an embedding vector for a single text string.
 */
export async function embed(text: string): Promise<Float32Array> {
  const ext = await getExtractor();
  const output = await ext(text, { pooling: 'mean', normalize: true });
  // Ensure output.data is converted to Float32Array
  if (output.data instanceof Float32Array) {
    return output.data;
  }
  return new Float32Array(output.data);
}

/**
 * Generate embeddings for multiple texts in batch.
 * More efficient than calling embed() in a loop.
 */
export async function embedBatch(texts: string[]): Promise<Float32Array[]> {
  if (texts.length === 0) return [];
  const ext = await getExtractor();
  const results: Float32Array[] = [];

  // Process in small batches to avoid memory spikes on Celeron N100
  const BATCH_SIZE = 8;
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    // Parallelize within batch for better performance
    const batchPromises = batch.map((text) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ext(text, { pooling: 'mean', normalize: true }).then((output: any) => new Float32Array(output.data))
    );
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
}

/**
 * Create a full IEmbedding object from text.
 */
export async function createEmbedding(
  sourceId: string,
  sourceType: IEmbedding['sourceType'],
  text: string
): Promise<IEmbedding> {
  const vector = await embed(text);
  return {
    sourceId,
    sourceType,
    text,
    vector,
    dimensions: vector.length,
    createdAt: Date.now(),
  };
}

/**
 * Compute cosine similarity between two vectors.
 * Assumes both vectors are already normalized (which they are from the pipeline).
 */
export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  if (a.length !== b.length) {
    throw new Error(`Vector length mismatch: ${a.length} vs ${b.length}`);
  }
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += (a[i] ?? 0) * (b[i] ?? 0);
  }
  return dot;
}

/**
 * Find the most similar embeddings to a query vector.
 */
export function findSimilar(
  queryVector: Float32Array,
  candidates: IEmbedding[],
  topK: number = 5,
  threshold: number = 0.3
): ISimilarityResult[] {
  const scored = candidates
    .map((c) => ({
      id: c.sourceId,
      similarity: cosineSimilarity(queryVector, c.vector),
      text: c.text,
    }))
    .filter((r) => r.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity);

  return scored.slice(0, topK);
}

/**
 * Check if the embedding model is loaded.
 */
export function isModelLoaded(): boolean {
  return extractor !== null;
}

/**
 * Unload the model to free memory.
 */
export function unloadModel(): void {
  extractor = null;
  logger.info('Embedding model unloaded');
}
