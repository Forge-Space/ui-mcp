import { registerBackendSnippets } from '../index.js';
import { authMiddlewareSnippets } from './auth-middleware.js';
import { validationMiddlewareSnippets } from './validation-middleware.js';
import { rateLimitingSnippets } from './rate-limiting.js';
import { errorHandlingSnippets } from './error-handling.js';
import { loggingMiddlewareSnippets } from './logging-middleware.js';
import { corsSecuritySnippets } from './cors-security.js';
import { cachingMiddlewareSnippets } from './caching-middleware.js';

export function registerMiddleware(): void {
  registerBackendSnippets(authMiddlewareSnippets);
  registerBackendSnippets(validationMiddlewareSnippets);
  registerBackendSnippets(rateLimitingSnippets);
  registerBackendSnippets(errorHandlingSnippets);
  registerBackendSnippets(loggingMiddlewareSnippets);
  registerBackendSnippets(corsSecuritySnippets);
  registerBackendSnippets(cachingMiddlewareSnippets);
}

export {
  authMiddlewareSnippets,
  validationMiddlewareSnippets,
  rateLimitingSnippets,
  errorHandlingSnippets,
  loggingMiddlewareSnippets,
  corsSecuritySnippets,
  cachingMiddlewareSnippets,
};
