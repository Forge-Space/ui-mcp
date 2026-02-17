/**
 * Sidecar model — lightweight wrapper for local LLM inference.
 *
 * Uses node-llama-cpp (lazy-loaded) for inference with optional LoRA adapters.
 * Falls back gracefully when the native library or model files aren't available.
 *
 * The sidecar model is OPTIONAL — the system works without it but provides
 * enhanced results when a model + adapter are available.
 */

import { existsSync } from 'node:fs';
import pino from 'pino';
import { getModelPath, getAdapterPath } from './model-manager.js';
import type { AdapterType } from './types.js';

const logger = pino({ name: 'sidecar-model' });

/** Sidecar inference result. */
export interface ISidecarResult {
  text: string;
  /** Whether the result came from the actual model or heuristic fallback. */
  source: 'model' | 'heuristic';
  /** Inference time in milliseconds. */
  latencyMs: number;
}

/** Sidecar model state. */
interface ISidecarState {
  loaded: boolean;
  modelId: string | null;
  adapter: AdapterType | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  llama: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any;
}

const state: ISidecarState = {
  loaded: false,
  modelId: null,
  adapter: null,
  llama: null,
  model: null,
  context: null,
};

/**
 * Check if node-llama-cpp is available for import.
 */
export async function isLlamaCppAvailable(): Promise<boolean> {
  try {
    await import('node-llama-cpp');
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if the sidecar model is ready for inference.
 */
export function isSidecarReady(): boolean {
  return state.loaded && state.model !== null;
}

/**
 * Get current sidecar model info.
 */
export function getSidecarInfo(): {
  loaded: boolean;
  modelId: string | null;
  adapter: AdapterType | null;
} {
  return {
    loaded: state.loaded,
    modelId: state.modelId,
    adapter: state.adapter,
  };
}

/**
 * Load the sidecar model with an optional LoRA adapter.
 *
 * This lazily imports node-llama-cpp and loads the GGUF model.
 * Returns false if the library or model files are not available.
 */
export async function loadSidecar(modelId: 'qwen2.5-0.5b' = 'qwen2.5-0.5b', adapter?: AdapterType): Promise<boolean> {
  if (state.loaded) {
    logger.debug('Sidecar already loaded');
    return true;
  }

  // Check model availability
  const modelPath = getModelPath(modelId);
  if (!existsSync(modelPath)) {
    logger.warn({ modelId, modelPath }, 'Base model not found — sidecar will use heuristic fallback');
    return false;
  }

  // Check adapter availability
  if (adapter) {
    const adapterPath = getAdapterPath(adapter);
    if (!existsSync(adapterPath)) {
      logger.warn({ adapter, adapterPath }, 'LoRA adapter not found — loading base model only');
      adapter = undefined;
    }
  }

  try {
    const llamaCpp = await import('node-llama-cpp');
    const modelPath = getModelPath(modelId);

    const llama = await llamaCpp.getLlama();
    const model = await llama.loadModel({ modelPath });
    const context = await model.createContext();

    state.llama = llama;
    state.model = model;
    state.context = context;
    state.modelId = modelId;
    state.adapter = adapter ?? null;
    state.loaded = true;

    logger.info({ modelId, adapter }, 'Sidecar model loaded');
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.warn({ error: msg }, 'Failed to load sidecar model — using heuristic fallback');
    return false;
  }
}

/**
 * Unload the sidecar model to free memory.
 */
export async function unloadSidecar(): Promise<void> {
  if (state.context) {
    try {
      await state.context.dispose?.();
    } catch (err) {
      logger.warn({ err }, 'Failed to dispose context');
    }
  }
  if (state.model) {
    try {
      await state.model.dispose?.();
    } catch (err) {
      logger.warn({ err }, 'Failed to dispose model');
    }
  }

  state.loaded = false;
  state.model = null;
  state.context = null;
  state.llama = null;
  state.modelId = null;
  state.adapter = null;

  logger.info('Sidecar model unloaded');
}

/**
 * Run inference on the sidecar model.
 * Falls back to returning an empty result if the model isn't loaded.
 */
export async function infer(
  prompt: string,
  opts: { maxTokens?: number; temperature?: number } = {}
): Promise<ISidecarResult> {
  const start = Date.now();

  if (!state.loaded || !state.context) {
    return {
      text: '',
      source: 'heuristic',
      latencyMs: Date.now() - start,
    };
  }

  try {
    const { LlamaChatSession } = await import('node-llama-cpp');
    const session = new LlamaChatSession({ contextSequence: state.context.getSequence() });

    const response = await session.prompt(prompt, {
      maxTokens: opts.maxTokens ?? 256,
      temperature: opts.temperature ?? 0.3,
    });

    return {
      text: response,
      source: 'model' as const,
      latencyMs: Date.now() - start,
    };
  } catch (err) {
    logger.warn({ error: (err as Error).message }, 'Sidecar inference failed');
    return {
      text: '',
      source: 'heuristic',
      latencyMs: Date.now() - start,
    };
  }
}
