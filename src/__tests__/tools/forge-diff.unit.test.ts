import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockAnalyzeDiff = jest.fn();

jest.unstable_mockModule('forge-ai-init', () => ({
  analyzeDiff: mockAnalyzeDiff,
}));

const { buildForgeDiffResponse, registerForgeDiff } = await import('../../tools/forge-diff.js');

describe('forge_diff tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns improved delta report', () => {
    mockAnalyzeDiff.mockReturnValue({
      changedFiles: ['src/api.ts', 'src/utils.ts'],
      beforeScore: 72,
      afterScore: 78,
      delta: 6,
      improved: true,
      newFindings: [],
      resolvedFindings: [
        {
          file: 'src/api.ts',
          rule: 'no-any',
          severity: 'high',
          message: 'Removed any usage',
        },
      ],
      summary: 'Quality improved by 6 points.',
    });

    const result = buildForgeDiffResponse({
      directory: '/tmp/project',
      staged: false,
    });

    const text = result.content[0].text;
    expect(text).toContain('72/100');
    expect(text).toContain('78/100');
    expect(text).toContain('+6');
    expect(text).toContain('clean diff');
    expect(text).toContain('Resolved');
    expect(text).toContain('no-any');
  });

  it('returns regression delta report', () => {
    mockAnalyzeDiff.mockReturnValue({
      changedFiles: ['src/handler.ts'],
      beforeScore: 80,
      afterScore: 74,
      delta: -6,
      improved: false,
      newFindings: [
        {
          file: 'src/handler.ts',
          rule: 'sql-injection',
          severity: 'critical',
          message: 'Unsanitized query parameter',
        },
      ],
      resolvedFindings: [],
      summary: 'Quality decreased by 6 points.',
    });

    const result = buildForgeDiffResponse({
      directory: '/tmp/project',
      base: 'main',
      staged: false,
    });

    const text = result.content[0].text;
    expect(text).toContain('-6');
    expect(text).toContain('sql-injection');
    expect(text).toContain('critical');
  });

  it('handles diff errors gracefully', () => {
    mockAnalyzeDiff.mockImplementation(() => {
      throw new Error('Not a git repository');
    });

    const result = buildForgeDiffResponse({
      directory: '/nonexistent',
      staged: false,
    });

    expect(result.content[0].text).toContain('Diff analysis failed');
    expect(result.content[0].text).toContain('Not a git repository');
  });

  it('passes options to analyzeDiff', () => {
    mockAnalyzeDiff.mockReturnValue({
      changedFiles: [],
      beforeScore: 80,
      afterScore: 80,
      delta: 0,
      improved: false,
      newFindings: [],
      resolvedFindings: [],
      summary: 'No changes.',
    });

    buildForgeDiffResponse({
      directory: '/tmp/project',
      base: 'develop',
      head: 'feature/x',
      staged: true,
    });

    expect(mockAnalyzeDiff).toHaveBeenCalledWith('/tmp/project', {
      base: 'develop',
      head: 'feature/x',
      staged: true,
    });
  });

  it('registers forge_diff tool on MCP server', async () => {
    const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    expect(() => registerForgeDiff(server)).not.toThrow();
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools['forge_diff']).toBeDefined();
  });

  it('shows neutral delta icon when score is unchanged', () => {
    mockAnalyzeDiff.mockReturnValue({
      changedFiles: [],
      beforeScore: 75,
      afterScore: 75,
      delta: 0,
      improved: false,
      newFindings: [],
      resolvedFindings: [],
      summary: 'No quality change.',
    });

    const result = buildForgeDiffResponse({ directory: '/tmp/project', staged: false });
    expect(result.content[0].text).toContain('75/100');
    expect(result.content[0].text).toContain('No quality change');
  });
});
