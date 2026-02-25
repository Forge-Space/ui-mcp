import type { IBackendSnippet, BackendCategory, BackendFramework } from './types.js';

const snippets: IBackendSnippet[] = [];

export function registerBackendSnippets(items: IBackendSnippet[]): void {
  for (const item of items) {
    const idx = snippets.findIndex((s) => s.id === item.id);
    if (idx >= 0) {
      snippets[idx] = item;
    } else {
      snippets.push(item);
    }
  }
}

export function getBackendSnippet(id: string): IBackendSnippet | undefined {
  return snippets.find((s) => s.id === id);
}

export function getBackendSnippetsByCategory(category: BackendCategory): IBackendSnippet[] {
  return snippets.filter((s) => s.category === category);
}

export function getBackendSnippetsByFramework(framework: BackendFramework): IBackendSnippet[] {
  return snippets.filter((s) => s.framework.includes(framework));
}

export function searchBackendSnippets(query: {
  category?: BackendCategory;
  framework?: BackendFramework;
  tags?: string[];
  type?: string;
}): IBackendSnippet[] {
  return snippets.filter((s) => {
    if (query.category && s.category !== query.category) return false;
    if (query.framework && !s.framework.includes(query.framework)) return false;
    if (query.type && s.type !== query.type) return false;
    if (query.tags?.length) {
      const hasTag = query.tags.some((t) => s.tags.includes(t));
      if (!hasTag) return false;
    }
    return true;
  });
}

export function getAllBackendSnippets(): readonly IBackendSnippet[] {
  return Object.freeze([...snippets]);
}

export function clearAllBackendSnippets(): void {
  snippets.length = 0;
  initialized = false;
}

let initialized = false;

export async function initializeBackendRegistry(): Promise<void> {
  if (initialized) return;
  const { registerApiRoutes } = await import('./api-routes/index.js');
  const { registerMiddleware } = await import('./middleware/index.js');
  const { registerArchitecture } = await import('./architecture/index.js');
  const { registerDatabase } = await import('./database/index.js');
  const { registerSecurity } = await import('./security/index.js');
  const { registerObservability } = await import('./observability/index.js');
  const { registerPerformance } = await import('./performance/index.js');
  const { registerDocumentation } = await import('./documentation/index.js');
  registerApiRoutes();
  registerMiddleware();
  registerArchitecture();
  registerDatabase();
  registerSecurity();
  registerObservability();
  registerPerformance();
  registerDocumentation();
  initialized = true;
}

export type { IBackendSnippet, BackendCategory, BackendFramework } from './types.js';
