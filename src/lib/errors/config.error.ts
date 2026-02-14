/**
 * Error thrown when configuration is not initialized
 */
export class ConfigNotInitializedError extends Error {
  constructor(message: string = 'Config not initialized. Call loadConfig() first.') {
    super(message);
    this.name = 'ConfigNotInitializedError';

    // Only capture stack trace if available (V8-specific feature)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ConfigNotInitializedError);
    }
  }
}
