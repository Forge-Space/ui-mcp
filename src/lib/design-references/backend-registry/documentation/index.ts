import { registerBackendSnippets } from '../index.js';
import { swaggerPatternSnippets } from './swagger-patterns.js';
import { apiVersioningSnippets } from './api-versioning.js';

export function registerDocumentation(): void {
  registerBackendSnippets(swaggerPatternSnippets);
  registerBackendSnippets(apiVersioningSnippets);
}

export { swaggerPatternSnippets, apiVersioningSnippets };
