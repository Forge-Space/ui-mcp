import pino, { type Logger } from 'pino';

let loggerInstance: Logger | null = null;

// Cache for console-based fallback loggers
const consoleFallbackCache = new Map<string, Logger>();

function initLogger(): Logger {
  if (loggerInstance) return loggerInstance;

  // Create a simple config from environment variables to avoid circular dependency
  const config = {
    NODE_ENV: process.env.NODE_ENV ?? 'production',
    FIGMA_ACCESS_TOKEN: process.env.FIGMA_ACCESS_TOKEN,
    LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
  };

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
    // eslint-disable-next-line no-console
    error: (...args: unknown[]) => console.error(prefix, ...args),
    // eslint-disable-next-line no-console
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    // eslint-disable-next-line no-console
    info: (...args: unknown[]) => console.info(prefix, ...args),
    // eslint-disable-next-line no-console
    debug: (...args: unknown[]) => console.debug(prefix, ...args),
    // eslint-disable-next-line no-console
    fatal: (...args: unknown[]) => console.error(`${prefix} FATAL:`, ...args),
    // eslint-disable-next-line no-console
    trace: (...args: unknown[]) => console.debug(`${prefix} TRACE:`, ...args),
    silent: (): void => undefined,
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
    // eslint-disable-next-line no-console
    console.debug(`Failed to create logger for module '${name}', using console fallback:`, err);
    return createConsoleFallback(name);
  }
}

export function resetLogger(): void {
  loggerInstance = null;
  consoleFallbackCache.clear();
}
