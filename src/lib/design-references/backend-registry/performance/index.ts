import { registerBackendSnippets } from '../index.js';
import { bundleOptimizationSnippets } from './bundle-optimization.js';
import { cachingStrategySnippets } from './caching-strategies.js';

export function registerPerformance(): void {
  registerBackendSnippets(bundleOptimizationSnippets);
  registerBackendSnippets(cachingStrategySnippets);
}

export { bundleOptimizationSnippets, cachingStrategySnippets };
