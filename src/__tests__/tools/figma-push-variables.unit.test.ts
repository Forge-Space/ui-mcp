import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '../../lib/config.js';

let registerFigmaPushVariables: typeof import('../../tools/figma-push-variables.js').registerFigmaPushVariables;

describe('figma_push_variables tool', () => {
  beforeAll(async () => {
    loadConfig();
    const mod = await import('../../tools/figma-push-variables.js');
    registerFigmaPushVariables = mod.registerFigmaPushVariables;
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerFigmaPushVariables(server)).not.toThrow();
  });
});
