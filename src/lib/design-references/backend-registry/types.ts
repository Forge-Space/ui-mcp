export type BackendCategory =
  | 'api-route'
  | 'middleware'
  | 'architecture'
  | 'database'
  | 'security'
  | 'observability'
  | 'performance'
  | 'documentation';

export type BackendFramework =
  | 'express'
  | 'nextjs-api'
  | 'nextjs-server-actions'
  | 'hono'
  | 'fastify'
  | 'framework-agnostic';

export type BackendPattern =
  | 'clean-architecture'
  | 'service-layer'
  | 'repository'
  | 'middleware-chain'
  | 'event-driven'
  | 'cqrs'
  | 'factory'
  | 'strategy'
  | 'observer'
  | 'decorator'
  | 'singleton';

export interface IBackendQuality {
  securityChecks: string[];
  performanceConsiderations: string[];
  antiPatterns: string[];
  inspirationSource: string;
}

export interface IBackendSnippet {
  id: string;
  name: string;
  category: BackendCategory;
  type: string;
  variant: string;
  tags: string[];
  framework: BackendFramework[];
  patterns: BackendPattern[];
  typescript: string;
  dependencies: string[];
  envVars?: string[];
  quality: IBackendQuality;
  testHint: string;
}
