import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';

let registerFigmaContextParser: typeof import('../../tools/figma-context-parser.js').registerFigmaContextParser;

describe('figma_context_parser tool', () => {
  beforeAll(async () => {
    loadConfig();
    const mod = await import('../../tools/figma-context-parser.js');
    registerFigmaContextParser = mod.registerFigmaContextParser;
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerFigmaContextParser(server)).not.toThrow();
  });
});
