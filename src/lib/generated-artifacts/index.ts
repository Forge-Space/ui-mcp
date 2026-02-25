export type { ArtifactType, IGeneratedArtifact, IComponentStructure, IArtifactQuery, ILearningStats } from './types.js';

export {
  generateArtifactId,
  storeArtifact,
  getArtifact,
  queryArtifacts,
  updateFeedbackScore,
  updateQualityScore,
  getArtifactCount,
  getTopArtifacts,
  deleteArtifact,
  resetSchemaInit,
} from './artifact-store.js';

export {
  recordGeneratedArtifact,
  getPromotionCandidates,
  getLearningStats,
  getRecentArtifacts,
  getSimilarArtifacts,
} from './learning-loop.js';
