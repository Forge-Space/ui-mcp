import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerForgeContextTools } from '../../tools/forge-context.js';

type SyncCallback = (
  args: Record<string, unknown>,
  extra: object
) => {
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
};

function getHandler(server: McpServer, toolName: string): SyncCallback | undefined {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: SyncCallback }> })._registeredTools;
  return tools?.[toolName]?.handler;
}

describe('forge context tools', () => {
  let server: McpServer;

  beforeEach(() => {
    loadConfig();
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerForgeContextTools(server)).not.toThrow();
  });

  it('registers get_project_context, update_project_context, and list_projects', () => {
    const registered: string[] = [];
    const original = server.tool.bind(server);
    server.tool = (...args: Parameters<typeof original>) => {
      registered.push(args[0] as string);
      return original(...args);
    };
    registerForgeContextTools(server);
    expect(registered).toContain('get_project_context');
    expect(registered).toContain('update_project_context');
    expect(registered).toContain('list_projects');
  });

  it('get_project_context returns project name in content', () => {
    registerForgeContextTools(server);
    const handler = getHandler(server, 'get_project_context');
    if (!handler) return;

    const result = handler({ project: 'uiforge-mcp' }, {});
    expect(result.content[0].text).toContain('uiforge-mcp');
  });

  it('get_project_context includes integration status note', () => {
    registerForgeContextTools(server);
    const handler = getHandler(server, 'get_project_context');
    if (!handler) return;

    const result = handler({ project: 'forge-patterns' }, {});
    expect(result.content[0].text).toContain('forge-patterns');
    expect(result.content[0].type).toBe('text');
  });

  it('update_project_context returns confirmation with project name', () => {
    registerForgeContextTools(server);
    const handler = getHandler(server, 'update_project_context');
    if (!handler) return;

    const result = handler(
      {
        project: 'my-project',
        title: 'My Project',
        description: 'A test project',
        content: '# My Project\nSome content here.',
      },
      {}
    );
    expect(result.content[0].text).toContain('my-project');
  });

  it('update_project_context includes content length', () => {
    registerForgeContextTools(server);
    const handler = getHandler(server, 'update_project_context');
    if (!handler) return;

    const testContent = 'x'.repeat(100);
    const result = handler(
      {
        project: 'test',
        title: 'Test',
        description: 'desc',
        content: testContent,
      },
      {}
    );
    expect(result.content[0].text).toContain('100');
  });

  it('list_projects returns known project slugs', () => {
    registerForgeContextTools(server);
    const handler = getHandler(server, 'list_projects');
    if (!handler) return;

    const result = handler({}, {});
    expect(result.content[0].text).toContain('forge-patterns');
    expect(result.content[0].text).toContain('uiforge-mcp');
    expect(result.content[0].text).toContain('mcp-gateway');
  });

  it('list_projects response type is text', () => {
    registerForgeContextTools(server);
    const handler = getHandler(server, 'list_projects');
    if (!handler) return;

    const result = handler({}, {});
    expect(result.content[0].type).toBe('text');
  });
});
