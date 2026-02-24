/**
 * ML subsystem for UIForge MCP.
 *
 * Layer 1: Sentence embeddings (Transformers.js) — immediate value, no training.
 * Layer 2: LoRA fine-tuning (node-llama-cpp) — future, after feedback accumulates.
 */

export type {
  IEmbedding,
  ISimilarityResult,
  IEmbeddingConfig,
  ITrainingExample,
  ILoRAConfig,
  AdapterType,
  ITrainingStatus,
} from './types.js';

export {
  configureEmbeddings,
  getEmbeddingConfig,
  embed,
  embedBatch,
  createEmbedding,
  cosineSimilarity,
  findSimilar,
  isModelLoaded,
  unloadModel,
} from './embeddings.js';

export {
  storeEmbedding,
  storeEmbeddings,
  loadEmbeddings,
  getEmbedding,
  semanticSearch,
  getEmbeddingCount,
  deleteEmbeddings,
} from './embedding-store.js';

export {
  exportRawExamples,
  buildQualityScorerData,
  buildPromptEnhancerData,
  buildStyleRecommenderData,
  writeJsonl,
  exportForAdapter,
  hasEnoughData,
} from './training-data-exporter.js';

export {
  configureModelDir,
  getBaseDir,
  getModelPaths,
  ensureDirectories,
  getModelPath,
  getAdapterPath,
  getTrainingDataPath,
  isModelAvailable,
  isAdapterAvailable,
  getModelDownloadUrl,
  listAdapters,
  listModels,
  getDiskUsage,
} from './model-manager.js';

export type { ModelId, IModelPaths } from './model-manager.js';

export {
  DEFAULT_LORA_CONFIG,
  createTrainingJob,
  updateJobStatus,
  getLatestJobStatus,
  getAllJobStatuses,
  isTraining,
  checkTrainingReadiness,
  startTrainingJob,
  cancelTrainingJob,
  getTrainingSummary,
} from './training-pipeline.js';

export {
  isLlamaCppAvailable,
  isSidecarReady,
  getSidecarInfo,
  loadSidecar,
  unloadSidecar,
  infer,
} from './sidecar-model.js';

export type { ISidecarResult } from './sidecar-model.js';

export { scoreQuality, scoreQualityWithRAG, isLikelyAccepted } from './quality-scorer.js';

export type { IQualityScore } from './quality-scorer.js';

export { enhancePrompt, enhanceWithRules, enhancePromptWithRAG, needsEnhancement } from './prompt-enhancer.js';

export type { IEnhancedPrompt, IEnhancementContext } from './prompt-enhancer.js';

export { recommendStyle } from './style-recommender.js';

export type { IStyleRecommendation, IStyleContext } from './style-recommender.js';
