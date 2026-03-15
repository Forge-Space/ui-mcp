import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerGenerateBackendModule } from '../../tools/generate-backend-module.js';

type ToolCallback = (
  args: Record<string, unknown>,
  extra: object
) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;

function getHandler(server: McpServer, toolName: string): ToolCallback | undefined {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: ToolCallback }> })._registeredTools;
  return tools?.[toolName]?.handler;
}

describe('generate_backend_module tool', () => {
  let server: McpServer;

  beforeEach(() => {
    loadConfig();
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerGenerateBackendModule(server)).not.toThrow();
  });

  it('registers the correct tool name', () => {
    const registered: string[] = [];
    const original = server.tool.bind(server);
    server.tool = (...args: Parameters<typeof original>) => {
      registered.push(args[0] as string);
      return original(...args);
    };
    registerGenerateBackendModule(server);
    expect(registered).toContain('generate_backend_module');
  });

  it('generates module with types file', async () => {
    registerGenerateBackendModule(server);
    const handler = getHandler(server, 'generate_backend_module');
    if (!handler) return;

    const result = await handler({ module_name: 'users', operations: ['list', 'create'], framework: 'nextjs' }, {});
    expect(result.content[0].type).toBe('text');
    const text = result.content[0].text;
    expect(text).toContain('Users');
    expect(text).toContain('types.ts');
  });

  it('uses nextjs base path for nextjs framework', async () => {
    registerGenerateBackendModule(server);
    const handler = getHandler(server, 'generate_backend_module');
    if (!handler) return;

    const result = await handler({ module_name: 'billing', operations: ['create'], framework: 'nextjs' }, {});
    const text = result.content[0].text;
    expect(text).toContain('src/app/api/billing');
  });

  it('uses express base path for express framework', async () => {
    registerGenerateBackendModule(server);
    const handler = getHandler(server, 'generate_backend_module');
    if (!handler) return;

    const result = await handler({ module_name: 'products', operations: ['list'], framework: 'express' }, {});
    const text = result.content[0].text;
    expect(text).toContain('src/modules/products');
  });

  it('converts camelCase module name to kebab-case path', async () => {
    registerGenerateBackendModule(server);
    const handler = getHandler(server, 'generate_backend_module');
    if (!handler) return;

    const result = await handler({ module_name: 'userProfile', operations: ['get'], framework: 'nextjs' }, {});
    const text = result.content[0].text;
    expect(text).toContain('user-profile');
  });

  it('handles middleware option', async () => {
    registerGenerateBackendModule(server);
    const handler = getHandler(server, 'generate_backend_module');
    if (!handler) return;

    const result = await handler(
      {
        module_name: 'orders',
        operations: ['list', 'create', 'update', 'delete'],
        framework: 'express',
        middleware: ['auth'],
      },
      {}
    );
    expect(result.content[0].text).toBeDefined();
    expect(result.content.length).toBeGreaterThan(0);
  });

  it('includes operation summary in output', async () => {
    registerGenerateBackendModule(server);
    const handler = getHandler(server, 'generate_backend_module');
    if (!handler) return;

    const result = await handler(
      { module_name: 'items', operations: ['list', 'create', 'delete'], framework: 'nextjs' },
      {}
    );
    const text = result.content[0].text;
    expect(text).toContain('list');
    expect(text).toContain('create');
    expect(text).toContain('delete');
  });
});
