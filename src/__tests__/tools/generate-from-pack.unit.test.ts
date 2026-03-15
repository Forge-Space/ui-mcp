import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig, getAllPacks, initializeRegistry } from '@forgespace/siza-gen';
import { registerGenerateFromPack } from '../../tools/generate-from-pack.js';

type ToolHandler = (
  args: Record<string, unknown>,
  extra: object
) => Promise<{ content: Array<{ type: string; text: string }> }>;

function getToolHandler(server: McpServer, toolName: string): ToolHandler | undefined {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: ToolHandler }> })._registeredTools;
  return tools?.[toolName]?.handler;
}

describe('generate_from_template_pack tool', () => {
  let server: McpServer;

  beforeEach(() => {
    loadConfig();
    initializeRegistry();
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerGenerateFromPack(server)).not.toThrow();
  });

  it('registers the correct tool name', () => {
    registerGenerateFromPack(server);
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools?.['generate_from_template_pack']).toBeDefined();
  });

  it('siza-gen exposes at least one template pack', () => {
    const packs = getAllPacks();
    expect(Array.isArray(packs)).toBe(true);
    expect(packs.length).toBeGreaterThan(0);
  });

  it('returns error for unknown pack_id listing available packs', async () => {
    registerGenerateFromPack(server);
    const handler = getToolHandler(server, 'generate_from_template_pack');
    if (!handler) return;
    const result = await handler({ pack_id: 'nonexistent-pack-xyz', framework: 'react', project_name: 'MyApp' }, {});
    expect(result.content[0].text).toContain('not found');
    expect(result.content[0].text).toContain('Available packs');
  });

  it('generates files for a valid pack id', async () => {
    registerGenerateFromPack(server);
    const handler = getToolHandler(server, 'generate_from_template_pack');
    if (!handler) return;
    const packs = getAllPacks();
    if (packs.length === 0) return;
    const result = await handler({ pack_id: packs[0].id, framework: 'react', project_name: 'TestProject' }, {});
    const output = JSON.parse(result.content[0].text) as { packName: string; files: unknown[] };
    expect(output.packName).toBe(packs[0].name);
    expect(Array.isArray(output.files)).toBe(true);
    expect(output.files.length).toBeGreaterThan(0);
  });

  it('generates nextjs files with app/ path prefix', async () => {
    registerGenerateFromPack(server);
    const handler = getToolHandler(server, 'generate_from_template_pack');
    if (!handler) return;
    const packs = getAllPacks();
    if (packs.length === 0) return;
    const result = await handler({ pack_id: packs[0].id, framework: 'nextjs', project_name: 'NextApp' }, {});
    const output = JSON.parse(result.content[0].text) as { files: Array<{ path: string }> };
    expect(output.files.some((f) => f.path.startsWith('app/'))).toBe(true);
  });

  it('includes theme info in generated output', async () => {
    registerGenerateFromPack(server);
    const handler = getToolHandler(server, 'generate_from_template_pack');
    if (!handler) return;
    const packs = getAllPacks();
    if (packs.length === 0) return;
    const result = await handler({ pack_id: packs[0].id, framework: 'react', project_name: 'Themed' }, {});
    const output = JSON.parse(result.content[0].text) as { theme: Record<string, unknown> };
    expect(output.theme).toBeDefined();
    expect(output.theme.colorSystemId).toBeDefined();
  });

  it('output includes instructions string', async () => {
    registerGenerateFromPack(server);
    const handler = getToolHandler(server, 'generate_from_template_pack');
    if (!handler) return;
    const packs = getAllPacks();
    if (packs.length === 0) return;
    const result = await handler({ pack_id: packs[0].id, framework: 'vue', project_name: 'VueApp' }, {});
    const output = JSON.parse(result.content[0].text) as { instructions: string };
    expect(typeof output.instructions).toBe('string');
  });
});
