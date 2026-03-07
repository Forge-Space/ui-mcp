import { describe, it, expect, afterEach, jest } from '@jest/globals';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

describe('debug module', () => {
  const origEnv = process.env;

  afterEach(() => {
    process.env = origEnv;
    jest.resetModules();
  });

  async function loadModule(envDebug?: string) {
    jest.resetModules();
    if (envDebug !== undefined) {
      process.env = { ...origEnv, DEBUG: envDebug };
    } else {
      const { DEBUG: _, VERBOSE: __, ...rest } = origEnv;
      process.env = rest;
    }
    return import('../../lib/debug.js');
  }

  it('isVerbose returns true when DEBUG=true', async () => {
    const { isVerbose } = await loadModule('true');
    expect(isVerbose()).toBe(true);
  });

  it('isVerbose returns false when DEBUG not set', async () => {
    const { isVerbose } = await loadModule();
    expect(isVerbose()).toBe(false);
  });

  it('debugTiming returns elapsed ms', async () => {
    const { debugTiming } = await loadModule('true');
    const end = debugTiming('test-op');
    const ms = end();
    expect(typeof ms).toBe('number');
    expect(ms).toBeGreaterThanOrEqual(0);
  });

  it('withDebug passes through handler when debug off', async () => {
    const { withDebug } = await loadModule();
    const handler = (async () => ({
      content: [{ type: 'text' as const, text: 'ok' }],
    })) as () => Promise<CallToolResult>;

    const wrapped = withDebug('test_tool', handler);
    expect(wrapped).toBe(handler);
  });

  it('withDebug wraps handler when debug on', async () => {
    const { withDebug } = await loadModule('true');
    const result: CallToolResult = {
      content: [{ type: 'text', text: 'ok' }],
    };
    const calls: unknown[] = [];
    const handler = async (args: Record<string, unknown>) => {
      calls.push(args);
      return result;
    };

    const wrapped = withDebug('test_tool', handler);
    expect(wrapped).not.toBe(handler);

    const out = await wrapped({ component_type: 'button', framework: 'react' });
    expect(out).toEqual(result);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual({ component_type: 'button', framework: 'react' });
  });
});
