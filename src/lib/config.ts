import { z } from 'zod';
import { ConfigNotInitializedError } from './errors/config.error.js';

export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  FIGMA_ACCESS_TOKEN: z.string().optional(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Config = z.infer<typeof configSchema>;

let config: Config | null = null;

export function loadConfig(): Config {
  if (config) return config;

  const result = configSchema.safeParse(process.env);

  if (!result.success) {
    const errorMessage = `Configuration validation failed: ${JSON.stringify(result.error.format(), null, 2)}`;
    throw new Error(errorMessage);
  }

  config = result.data;
  return config;
}

export function getConfig(): Config {
  if (!config) {
    throw new ConfigNotInitializedError();
  }
  return config;
}

/**
 * Safely parse JSON with fallback to empty object on error.
 * Used for parsing JSON fields from database to avoid crashes on malformed data.
 */
export function safeJSONParse<T = any>(jsonString: string | null | undefined): T {
  if (!jsonString) return {} as T;
  try {
    return JSON.parse(jsonString) as T;
  } catch (err) {
    console.error('Failed to parse JSON, returning empty object:', err);
    return {} as T;
  }
}
