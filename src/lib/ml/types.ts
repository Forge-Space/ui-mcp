/**
 * Type definitions for the ML subsystem.
 */

import { z } from 'zod';

/** A vector embedding with its source metadata. */
export interface IEmbedding {
  /** The source entity ID (e.g., component snippet ID or prompt hash). */
  sourceId: string;
  /** The source type. */
  sourceType: 'component' | 'prompt' | 'description';
  /** The text that was embedded. */
  text: string;
  /** The embedding vector (Float32). */
  vector: Float32Array;
  /** Dimensionality of the vector. */
  dimensions: number;
  /** Timestamp of creation. */
  createdAt: number;
}

/** Cosine similarity search result. */
export interface ISimilarityResult {
  /** The matched entity ID. */
  id: string;
  /** Cosine similarity score (0-1). */
  similarity: number;
  /** The original text that was embedded. */
  text: string;
}

/** Configuration for the embedding model. */
export interface IEmbeddingConfig {
  /** HuggingFace model identifier. */
  modelId: string;
  /** Local cache directory for the downloaded model. */
  cacheDir: string;
  /** Expected dimensionality of embeddings. */
  dimensions: number;
}

/** A training example for LoRA fine-tuning. */
export interface ITrainingExample {
  /** The user prompt that triggered generation. */
  prompt: string;
  /** The generated code. */
  code: string;
  /** Feedback score (-1 to 2, where >0 = accepted). */
  score: number;
  /** Generation parameters used. */
  params: Record<string, string>;
}

/** Configuration for LoRA training. */
export interface ILoRAConfig {
  /** LoRA rank (lower = smaller adapter). */
  rank: number;
  /** Number of training epochs. */
  epochs: number;
  /** Batch size (CPU-friendly). */
  batchSize: number;
  /** Learning rate. */
  learningRate: number;
}

/** Adapter types for the sidecar model. */
export type AdapterType = 'quality-scorer' | 'prompt-enhancer' | 'style-recommender';

/** Status of a training job. */
export interface ITrainingStatus {
  adapter: AdapterType;
  status: 'idle' | 'preparing' | 'training' | 'complete' | 'failed';
  progress: number; // 0-100
  error?: string;
  startedAt?: number;
  completedAt?: number;
}

// Zod runtime validation schemas
export const TrainingExampleSchema = z.object({
  prompt: z.string().min(1),
  code: z.string().min(1),
  score: z.number().min(-1).max(2),
  params: z.record(z.string()),
});

export const TrainingStatusSchema = z.object({
  adapter: z.enum(['quality-scorer', 'prompt-enhancer', 'style-recommender']),
  status: z.enum(['idle', 'preparing', 'training', 'complete', 'failed']),
  progress: z.number().min(0).max(100),
  error: z.string().optional(),
  startedAt: z.number().optional(),
  completedAt: z.number().optional(),
});
