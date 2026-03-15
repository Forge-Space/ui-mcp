import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock execFileSync to avoid spawning forge-ai-init in handler tests
const mockExecFileSync = jest.fn<() => string>();

jest.unstable_mockModule('node:child_process', () => ({
  execFileSync: mockExecFileSync,
}));

const { registerAssessLegacy } = await import('../../tools/assess-legacy.js');
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

type ToolHandler = (
  args: Record<string, unknown>,
  extra: object
) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;

function getToolHandler(server: McpServer, toolName: string): ToolHandler | undefined {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: ToolHandler }> })._registeredTools;
  return tools?.[toolName]?.handler;
}

const mockReport = {
  overallScore: 72,
  overallGrade: 'C',
  migrationReadiness: 'Ready with effort',
  migrationStrategy: 'Incremental modernization',
  filesScanned: 150,
  categories: [
    { category: 'Dependencies', score: 80, grade: 'B', findings: 2 },
    { category: 'Architecture', score: 65, grade: 'D', findings: 4 },
  ],
  findings: [
    { severity: 'high', title: 'Outdated deps', file: 'package.json' },
    { severity: 'medium', title: 'Missing tests', file: 'src/app.ts', line: 1 },
  ],
};

describe('assess_legacy_codebase MCP handler', () => {
  let server: McpServer;

  beforeEach(() => {
    jest.clearAllMocks();
    mockExecFileSync.mockReturnValue(JSON.stringify(mockReport));
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerAssessLegacy(server)).not.toThrow();
  });

  it('registers as assess_legacy_codebase', () => {
    registerAssessLegacy(server);
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools?.['assess_legacy_codebase']).toBeDefined();
  });

  it('returns formatted summary with score and grade', async () => {
    registerAssessLegacy(server);
    const handler = getToolHandler(server, 'assess_legacy_codebase');
    if (!handler) return;

    const result = await handler({ project_dir: '/tmp/project' }, {});
    const text = result.content[0]!.text;
    expect(text).toContain('72/100');
    expect(text).toContain('(C)');
    expect(text).toContain('Ready with effort');
    expect(text).toContain('Incremental modernization');
  });

  it('includes categories in output', async () => {
    registerAssessLegacy(server);
    const handler = getToolHandler(server, 'assess_legacy_codebase');
    if (!handler) return;

    const result = await handler({ project_dir: '/tmp/project' }, {});
    const text = result.content[0]!.text;
    expect(text).toContain('Dependencies');
    expect(text).toContain('Architecture');
  });

  it('includes top findings with file references', async () => {
    registerAssessLegacy(server);
    const handler = getToolHandler(server, 'assess_legacy_codebase');
    if (!handler) return;

    const result = await handler({ project_dir: '/tmp/project' }, {});
    const text = result.content[0]!.text;
    expect(text).toContain('Outdated deps');
    expect(text).toContain('package.json');
  });

  it('includes raw JSON in code block', async () => {
    registerAssessLegacy(server);
    const handler = getToolHandler(server, 'assess_legacy_codebase');
    if (!handler) return;

    const result = await handler({ project_dir: '/tmp/project' }, {});
    const text = result.content[0]!.text;
    expect(text).toContain('```json');
    expect(text).toContain('"overallScore": 72');
  });

  it('returns isError: true when assessment fails', async () => {
    mockExecFileSync.mockImplementation(() => {
      throw new Error('Permission denied');
    });
    registerAssessLegacy(server);
    const handler = getToolHandler(server, 'assess_legacy_codebase');
    if (!handler) return;

    const result = await handler({ project_dir: '/nonexistent' }, {});
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toContain('Assessment failed');
    expect(result.content[0]!.text).toContain('Permission denied');
  });
});
