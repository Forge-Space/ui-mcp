import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '../../lib/config.js';

let registerAnalyzeDesignReferences: typeof import('../../tools/analyze-design-references.js').registerAnalyzeDesignReferences;

describe('analyze_design_references tool', () => {
  beforeAll(async () => {
    loadConfig();
    const mod = await import('../../tools/analyze-design-references.js');
    registerAnalyzeDesignReferences = mod.registerAnalyzeDesignReferences;
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerAnalyzeDesignReferences(server)).not.toThrow();
  });
});
