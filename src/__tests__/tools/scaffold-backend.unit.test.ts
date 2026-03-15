import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerScaffoldBackend, scaffoldBackend } from '../../tools/scaffold-backend.js';

type ToolCallback = (
  args: Record<string, unknown>,
  extra: object
) => Promise<{ content: Array<{ type: string; text: string }> }>;

function getHandler(server: McpServer, toolName: string): ToolCallback | undefined {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: ToolCallback }> })._registeredTools;
  return tools?.[toolName]?.handler;
}

describe('scaffold_backend tool', () => {
  let server: McpServer;

  beforeEach(() => {
    loadConfig();
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerScaffoldBackend(server)).not.toThrow();
  });

  it('registers the correct tool name', () => {
    const registered: string[] = [];
    const original = server.tool.bind(server);
    server.tool = (...args: Parameters<typeof original>) => {
      registered.push(args[0] as string);
      return original(...args);
    };
    registerScaffoldBackend(server);
    expect(registered).toContain('scaffold_backend');
  });

  it('generates express project files', async () => {
    const result = await scaffoldBackend('my-api', 'express', ['api-docs']);
    expect(result.files.length).toBeGreaterThan(0);
    const paths = result.files.map((f) => f.path);
    expect(paths.some((p) => p.includes('package.json'))).toBe(true);
  });

  it('generates nextjs project files', async () => {
    const result = await scaffoldBackend('my-next-api', 'nextjs', ['api-docs']);
    expect(result.files.length).toBeGreaterThan(0);
    const packageFile = result.files.find((f) => f.path === 'package.json');
    expect(packageFile).toBeDefined();
    const pkg = JSON.parse(packageFile!.content) as { dependencies: Record<string, string> };
    expect(pkg.dependencies['next']).toBeDefined();
  });

  it('includes express dependency for express framework', async () => {
    const result = await scaffoldBackend('express-app', 'express', ['api-docs']);
    const packageFile = result.files.find((f) => f.path === 'package.json');
    expect(packageFile).toBeDefined();
    const pkg = JSON.parse(packageFile!.content) as { dependencies: Record<string, string> };
    expect(pkg.dependencies['express']).toBeDefined();
  });

  it('includes auth files when auth feature selected with jwt', async () => {
    const result = await scaffoldBackend('auth-api', 'express', ['auth'], undefined, 'jwt');
    expect(result.files.length).toBeGreaterThan(0);
    expect(result.dependencies['jsonwebtoken'] || result.files.some((f) => f.content.includes('jwt'))).toBeTruthy();
  });

  it('includes database files when database feature selected with prisma', async () => {
    const result = await scaffoldBackend('db-api', 'express', ['database'], 'prisma');
    expect(result.files.some((f) => f.path.includes('prisma') || f.content.includes('prisma'))).toBe(true);
  });

  it('includes setup steps in result', async () => {
    const result = await scaffoldBackend('my-service', 'express', ['api-docs']);
    expect(Array.isArray(result.setupSteps)).toBe(true);
    expect(result.setupSteps.length).toBeGreaterThan(0);
  });

  it('converts project name to kebab-case in package.json', async () => {
    const result = await scaffoldBackend('MyGreatAPI', 'express', ['api-docs']);
    const packageFile = result.files.find((f) => f.path === 'package.json');
    const pkg = JSON.parse(packageFile!.content) as { name: string };
    expect(pkg.name).toBe('my-great-api');
  });

  it('mcp tool returns error when auth feature selected without auth param', async () => {
    registerScaffoldBackend(server);
    const handler = getHandler(server, 'scaffold_backend');
    if (!handler) return;

    const result = await handler({ projectName: 'test', framework: 'express', features: ['auth'] }, {});
    expect(result.content[0].text).toContain('"auth" parameter is required');
  });

  it('mcp tool returns error when database feature selected without database param', async () => {
    registerScaffoldBackend(server);
    const handler = getHandler(server, 'scaffold_backend');
    if (!handler) return;

    const result = await handler({ projectName: 'test', framework: 'express', features: ['database'] }, {});
    expect(result.content[0].text).toContain('"database" parameter is required');
  });
});
