import pino from 'pino';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

const isDebug = process.env.DEBUG === 'true' || process.env.DEBUG === '1' || process.env.VERBOSE === 'true';

export const debugLogger = pino(
  {
    name: 'uiforge-debug',
    level: isDebug ? 'debug' : 'silent',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.destination(2)
);

export function isVerbose(): boolean {
  return isDebug;
}

export function debugTiming(label: string): () => number {
  const start = performance.now();
  debugLogger.debug({ label }, 'start: %s', label);
  return () => {
    const ms = Math.round(performance.now() - start);
    debugLogger.debug({ label, ms }, 'done: %s (%dms)', label, ms);
    return ms;
  };
}

type ToolHandler<T> = (args: T) => Promise<CallToolResult>;

export function withDebug<T extends Record<string, unknown>>(
  toolName: string,
  handler: ToolHandler<T>
): ToolHandler<T> {
  if (!isDebug) return handler;

  return async (args: T) => {
    const start = performance.now();
    const paramKeys = Object.keys(args).filter((k) => args[k] !== undefined && args[k] !== '');
    debugLogger.debug({ tool: toolName, params: paramKeys }, '[%s] called with: %s', toolName, paramKeys.join(', '));

    const result = await handler(args);
    const ms = Math.round(performance.now() - start);

    const outputSize = JSON.stringify(result).length;
    debugLogger.debug(
      { tool: toolName, ms, outputSize, isError: result.isError },
      '[%s] completed in %dms (output: %d bytes)',
      toolName,
      ms,
      outputSize
    );

    return result;
  };
}
