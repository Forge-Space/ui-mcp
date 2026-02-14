import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '../../lib/config.js';
import { registerRefineComponent } from '../../tools/refine-component.js';

describe('refine_component tool', () => {
  beforeAll(() => {
    loadConfig();
  });

  it('registers without errors', () => {
    const testServer = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerRefineComponent(testServer)).not.toThrow();
  });

  it('tool is properly exported and can be registered multiple times', () => {
    const server1 = new McpServer({ name: 'test1', version: '1.0.0' });
    const server2 = new McpServer({ name: 'test2', version: '1.0.0' });

    expect(() => {
      registerRefineComponent(server1);
      registerRefineComponent(server2);
    }).not.toThrow();
  });
});
