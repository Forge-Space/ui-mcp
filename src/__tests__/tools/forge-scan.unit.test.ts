import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockScanProject = jest.fn();

jest.unstable_mockModule('forge-ai-init', () => ({
  scanProject: mockScanProject,
}));

const { buildForgeScanResponse, registerForgeScan } = await import('../../tools/forge-scan.js');

describe('forge_scan tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns formatted scan report', () => {
    mockScanProject.mockReturnValue({
      score: 78,
      grade: 'C',
      filesScanned: 42,
      findings: [
        {
          rule: 'no-any',
          severity: 'high',
          file: 'src/index.ts',
          line: 10,
          message: 'Avoid using any',
        },
      ],
      summary: [
        { category: 'type-safety', count: 3, critical: 0, high: 1 },
        { category: 'security', count: 1, critical: 1, high: 0 },
      ],
      topFiles: [{ file: 'src/index.ts', count: 4, worst: 'critical' }],
    });

    const result = buildForgeScanResponse({
      directory: '/tmp/project',
      max_files: 500,
    });

    expect(result.content).toHaveLength(1);
    const text = result.content[0].text;
    expect(text).toContain('78/100');
    expect(text).toContain('Grade: C');
    expect(text).toContain('42');
    expect(text).toContain('type-safety');
    expect(text).toContain('security');
    expect(text).toContain('src/index.ts');
  });

  it('handles scan errors gracefully', () => {
    mockScanProject.mockImplementation(() => {
      throw new Error('Directory not found');
    });

    const result = buildForgeScanResponse({
      directory: '/nonexistent',
      max_files: 500,
    });

    expect(result.content[0].text).toContain('Scan failed');
    expect(result.content[0].text).toContain('Directory not found');
  });

  it('shows critical and high findings only', () => {
    mockScanProject.mockReturnValue({
      score: 60,
      grade: 'D',
      filesScanned: 10,
      findings: [
        {
          rule: 'sql-injection',
          severity: 'critical',
          file: 'api.ts',
          line: 5,
          message: 'Unsanitized input in SQL query',
        },
        {
          rule: 'console-log',
          severity: 'low',
          file: 'utils.ts',
          line: 20,
          message: 'Remove console.log',
        },
      ],
      summary: [],
      topFiles: [],
    });

    const result = buildForgeScanResponse({
      directory: '/tmp/project',
      max_files: 500,
    });

    const text = result.content[0].text;
    expect(text).toContain('sql-injection');
    expect(text).not.toContain('console-log');
  });

  it('registers forge_scan tool on MCP server', async () => {
    const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    expect(() => registerForgeScan(server)).not.toThrow();
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools['forge_scan']).toBeDefined();
  });

  it('shows no critical section when only low-severity findings exist', () => {
    mockScanProject.mockReturnValue({
      score: 85,
      grade: 'B',
      filesScanned: 20,
      findings: [{ rule: 'console-log', severity: 'low', file: 'utils.ts', line: 5, message: 'Remove console.log' }],
      summary: [],
      topFiles: [],
    });

    const result = buildForgeScanResponse({ directory: '/tmp/project', max_files: 500 });
    const text = result.content[0].text;
    expect(text).toContain('85/100');
    expect(text).not.toContain('Critical & High Findings');
  });
});
