import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerGenerateApiRoute } from '../../tools/generate-api-route.js';

type ToolHandler = (
  args: Record<string, unknown>,
  extra: object
) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;

function getToolHandler(server: McpServer, toolName: string): ToolHandler | undefined {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: ToolHandler }> })._registeredTools;
  return tools?.[toolName]?.handler;
}

describe('generate_api_route tool', () => {
  let server: McpServer;

  beforeEach(() => {
    loadConfig();
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerGenerateApiRoute(server)).not.toThrow();
  });

  it('registers the correct tool name', () => {
    registerGenerateApiRoute(server);
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools?.['generate_api_route']).toBeDefined();
  });

  it('generates nextjs api route for rest-crud', async () => {
    registerGenerateApiRoute(server);
    const handler = getToolHandler(server, 'generate_api_route');
    if (!handler) return;
    const result = await handler({ route_type: 'rest-crud', resource_name: 'users', framework: 'nextjs' }, {});
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('users');
    expect(result.content[0].text).toContain('nextjs');
  });

  it('generates express route for auth type', async () => {
    registerGenerateApiRoute(server);
    const handler = getToolHandler(server, 'generate_api_route');
    if (!handler) return;
    const result = await handler({ route_type: 'auth', resource_name: 'session', framework: 'express' }, {});
    expect(result.content[0].text).toContain('session');
    expect(result.content[0].text).toContain('express');
  });

  it('handles webhook route type', async () => {
    registerGenerateApiRoute(server);
    const handler = getToolHandler(server, 'generate_api_route');
    if (!handler) return;
    const result = await handler({ route_type: 'webhook', resource_name: 'payments', framework: 'nextjs' }, {});
    expect(result.content[0].text.toLowerCase()).toContain('payments');
  });

  it('output contains nextjs route path for nextjs framework', async () => {
    registerGenerateApiRoute(server);
    const handler = getToolHandler(server, 'generate_api_route');
    if (!handler) return;
    const result = await handler({ route_type: 'rest-crud', resource_name: 'items', framework: 'nextjs' }, {});
    expect(result.content[0].text).toContain('src/app/api/items');
  });

  it('output contains express route path for express framework', async () => {
    registerGenerateApiRoute(server);
    const handler = getToolHandler(server, 'generate_api_route');
    if (!handler) return;
    const result = await handler({ route_type: 'rest-crud', resource_name: 'items', framework: 'express' }, {});
    expect(result.content[0].text).toContain('src/routes/items');
  });
});
