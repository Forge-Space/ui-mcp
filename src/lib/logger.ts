import pino, { type Logger } from 'pino';
import { getConfig, configSchema, type Config } from './config.js';
import { ConfigNotInitializedError } from './errors/config.error.js';

let loggerInstance: Logger | null = null;

// Cache for console-based fallback loggers
const consoleFallbackCache = new Map<string, Logger>();

function initLogger(): Logger {
  if (loggerInstance) return loggerInstance;

  let config: Config;
  try {
    config = getConfig();
  } catch (err: unknown) {
    // Check if this is the expected "config not loaded" error using custom error class
    if (err instanceof ConfigNotInitializedError) {
      // Fallback for tests or when config not loaded
      // Use configSchema.parse() to ensure type safety and apply defaults
      config = configSchema.parse({
        NODE_ENV: 'test',
        LOG_LEVEL: 'error',
      });
    } else {
      // Unexpected error - log and rethrow
      console.error('Unexpected error in logger initialization:', err);
      throw err;
    }
  }

  const isDevelopment = config.NODE_ENV !== 'production';

  loggerInstance = pino({
    level: config.LOG_LEVEL,
    transport: isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  });

  return loggerInstance;
}

function createConsoleFallback(name?: string): Logger {
  // Use a cache key to avoid recreating the same fallback logger
  const cacheKey = name ?? 'default';
  const cached = consoleFallbackCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Build new fallback logger
  const prefix = name ? `[${name}]` : '';

  const fallback = {
    error: (...args: unknown[]) => console.error(prefix, ...args),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    info: (...args: unknown[]) => console.info(prefix, ...args),
    debug: (...args: unknown[]) => console.debug(prefix, ...args),
    fatal: (...args: unknown[]) => console.error(`${prefix} FATAL:`, ...args),
    trace: (...args: unknown[]) => console.debug(`${prefix} TRACE:`, ...args),
    silent: () => undefined,
    child: (bindings: Record<string, unknown>) => {
      const moduleName = typeof bindings.module === 'string' ? bindings.module : name;
      return createConsoleFallback(moduleName);
    },
    level: 'error',
  } as unknown as Logger;

  // Store in cache and return
  consoleFallbackCache.set(cacheKey, fallback);
  return fallback;
}

export const logger = new Proxy({} as Logger, {
  get(target, prop) {
    try {
      const instance = initLogger();
      return instance[prop as keyof Logger];
    } catch {
      // Silently fall back to console-based logger
      const fallback = createConsoleFallback();
      return fallback[prop as keyof Logger];
    }
  },
});

export function createLogger(name: string): Logger {
  try {
    return initLogger().child({ module: name });
  } catch (err) {
    // Fallback: return a console-based logger with the module name
    console.debug(`Failed to create logger for module '${name}', using console fallback:`, err);
    return createConsoleFallback(name);
  }
}

export function resetLogger(): void {
  loggerInstance = null;
  consoleFallbackCache.clear();
}
