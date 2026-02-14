import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '../../lib/config.js';
import { registerImageToComponent } from '../../tools/image-to-component.js';

describe('image_to_component tool', () => {
  beforeAll(() => {
    loadConfig();
  });

  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerImageToComponent(server)).not.toThrow();
  });

  it('tool is properly exported and can be registered multiple times', () => {
    const server1 = new McpServer({ name: 'test1', version: '1.0.0' });
    const server2 = new McpServer({ name: 'test2', version: '1.0.0' });

    expect(() => {
      registerImageToComponent(server1);
      registerImageToComponent(server2);
    }).not.toThrow();
  });
});
