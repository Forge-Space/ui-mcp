/**
 * Figma-specific error classes
 */

import { UIForgeError } from './base.error.js';

export class FigmaError extends UIForgeError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'FIGMA_ERROR', details);
  }
}

export class FigmaAuthError extends UIForgeError {
  constructor(message = 'Figma authentication failed. Check FIGMA_ACCESS_TOKEN.') {
    super(message, 'FIGMA_AUTH_ERROR');
  }
}

export class FigmaNotFoundError extends UIForgeError {
  constructor(resource: string, id: string) {
    super(`Figma ${resource} not found: ${id}`, 'FIGMA_NOT_FOUND', { resource, id });
  }
}

export class FigmaRateLimitError extends UIForgeError {
  constructor(retryAfter?: number) {
    super('Figma API rate limit exceeded', 'FIGMA_RATE_LIMIT', { retryAfter });
  }
}
