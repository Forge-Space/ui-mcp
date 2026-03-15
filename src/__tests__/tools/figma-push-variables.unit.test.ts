import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockPostVariables = jest.fn<() => Promise<{ created: number; updated: number; collections: string[] }>>();

jest.unstable_mockModule('../../lib/figma-client.js', () => ({
  postVariables: mockPostVariables,
}));

const { registerFigmaPushVariables } = await import('../../tools/figma-push-variables.js');
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

type ToolHandler = (
  args: Record<string, unknown>,
  extra: object
) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;

function getToolHandler(server: McpServer, toolName: string): ToolHandler | undefined {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: ToolHandler }> })._registeredTools;
  return tools?.[toolName]?.handler;
}

describe('figma_push_variables tool', () => {
  let server: McpServer;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPostVariables.mockResolvedValue({ created: 2, updated: 1, collections: ['UIForge Tokens'] });
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerFigmaPushVariables(server)).not.toThrow();
  });

  it('registers as figma_push_variables', () => {
    registerFigmaPushVariables(server);
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools?.['figma_push_variables']).toBeDefined();
  });

  it('returns error when no variables provided', async () => {
    registerFigmaPushVariables(server);
    const handler = getToolHandler(server, 'figma_push_variables');
    if (!handler) return;
    const result = await handler({ file_key: 'abc123', variables: [] }, {});
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toContain('No variables provided');
  });

  it('calls postVariables with correct args', async () => {
    registerFigmaPushVariables(server);
    const handler = getToolHandler(server, 'figma_push_variables');
    if (!handler) return;
    const variables = [{ name: 'colors/primary', type: 'COLOR', value: '#7c3aed', collection: 'Brand' }];
    await handler({ file_key: 'abc123', variables }, {});
    expect(mockPostVariables).toHaveBeenCalledWith('abc123', variables, 'Brand');
  });

  it('uses UIForge Tokens as default collection', async () => {
    registerFigmaPushVariables(server);
    const handler = getToolHandler(server, 'figma_push_variables');
    if (!handler) return;
    const variables = [{ name: 'spacing/md', type: 'FLOAT', value: 16 }];
    await handler({ file_key: 'file1', variables }, {});
    expect(mockPostVariables).toHaveBeenCalledWith('file1', variables, 'UIForge Tokens');
  });

  it('returns success summary with variable count', async () => {
    registerFigmaPushVariables(server);
    const handler = getToolHandler(server, 'figma_push_variables');
    if (!handler) return;
    const variables = [
      { name: 'colors/primary', type: 'COLOR', value: '#7c3aed' },
      { name: 'spacing/md', type: 'FLOAT', value: 16 },
    ];
    const result = await handler({ file_key: 'abc123', variables }, {});
    expect(result.isError).toBeFalsy();
    expect(result.content[0]!.text).toContain('Pushed 2 variable(s)');
    expect(result.content[0]!.text).toContain('Created: 2');
    expect(result.content[0]!.text).toContain('Updated: 1');
  });

  it('includes raw JSON result in second content item', async () => {
    registerFigmaPushVariables(server);
    const handler = getToolHandler(server, 'figma_push_variables');
    if (!handler) return;
    const result = await handler({ file_key: 'f1', variables: [{ name: 'x', type: 'STRING', value: 'y' }] }, {});
    expect(result.content).toHaveLength(2);
    const json = JSON.parse(result.content[1]!.text) as { created: number };
    expect(json.created).toBe(2);
  });

  it('returns isError when postVariables throws', async () => {
    mockPostVariables.mockRejectedValue(new Error('Figma API error: 401 Unauthorized'));
    registerFigmaPushVariables(server);
    const handler = getToolHandler(server, 'figma_push_variables');
    if (!handler) return;
    const result = await handler({ file_key: 'f1', variables: [{ name: 'x', type: 'COLOR', value: '#ff0000' }] }, {});
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toContain('Error pushing variables');
    expect(result.content[0]!.text).toContain('401 Unauthorized');
  });
});
