export type ArtifactType = 'component' | 'page' | 'module' | 'api-route' | 'project';

export interface IComponentStructure {
  component: string;
  category: 'atom' | 'molecule' | 'organism';
  children?: IComponentStructure[];
  props?: Record<string, unknown>;
  layout?: string;
  tokens?: Record<string, string>;
}

export interface IGeneratedArtifact {
  id: string;
  type: ArtifactType;
  category?: string;
  prompt: string;
  code: string;
  structure?: IComponentStructure;
  metadata?: Record<string, unknown>;
  qualityScore?: number;
  feedbackScore?: number;
  inspirationSources?: string[];
  createdAt: number;
}

export interface IArtifactQuery {
  type?: ArtifactType;
  category?: string;
  minQualityScore?: number;
  minFeedbackScore?: number;
  limit?: number;
}

export interface ILearningStats {
  totalArtifacts: number;
  avgQualityScore: number;
  avgFeedbackScore: number;
  topPatterns: Array<{ category: string; count: number }>;
  promotionCandidates: number;
}
