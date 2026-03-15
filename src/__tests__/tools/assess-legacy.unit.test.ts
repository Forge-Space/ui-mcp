import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const mockExecFileSync = jest.fn<() => string>();

jest.unstable_mockModule('node:child_process', () => ({
  execFileSync: mockExecFileSync,
}));

const { handleAssessLegacy, registerAssessLegacy } = await import('../../tools/assess-legacy.js');

function makeTmpDir(): string {
  const dir = join(tmpdir(), `mcp-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

const fakeReport = {
  overallScore: 72,
  overallGrade: 'B',
  migrationReadiness: 'needs-work',
  migrationStrategy: 'strangler-fig',
  categories: [
    { category: 'dependencies', score: 80, grade: 'B', findings: 2 },
    { category: 'security', score: 65, grade: 'C', findings: 3 },
  ],
  findings: [
    { severity: 'warning', title: 'Legacy dependency: jquery', detail: 'Legacy package detected' },
    { severity: 'info', title: 'Missing tests', detail: 'No test files found' },
  ],
};

describe('assess_legacy_codebase tool', () => {
  beforeEach(() => {
    mockExecFileSync.mockReturnValue(JSON.stringify(fakeReport));
  });

  afterEach(() => {
    mockExecFileSync.mockReset();
  });

  it('returns a valid assessment report', () => {
    const dir = makeTmpDir();
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        dependencies: { express: '^4.0.0' },
        devDependencies: { jest: '^29.0.0' },
      })
    );
    writeFileSync(join(dir, '.gitignore'), '.env\nnode_modules');

    const report = handleAssessLegacy({
      project_dir: dir,
    }) as Record<string, unknown>;

    expect(report.overallScore).toBeGreaterThanOrEqual(0);
    expect(report.overallScore).toBeLessThanOrEqual(100);
    expect(report.categories).toBeDefined();
    expect(['A', 'B', 'C', 'D', 'F']).toContain(report.overallGrade);
    expect(['ready', 'needs-work', 'high-risk']).toContain(report.migrationReadiness);

    rmSync(dir, { recursive: true, force: true });
  });

  it('detects legacy packages', () => {
    const legacyReport = {
      ...fakeReport,
      findings: [
        { severity: 'warning', title: 'Legacy dependency: jquery', detail: 'Legacy package detected' },
        { severity: 'warning', title: 'Legacy dependency: moment', detail: 'Legacy package detected' },
      ],
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(legacyReport));

    const dir = makeTmpDir();
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        dependencies: {
          jquery: '^3.0.0',
          moment: '^2.0.0',
        },
      })
    );

    const report = handleAssessLegacy({
      project_dir: dir,
    }) as Record<string, unknown>;
    const findings = report.findings as Array<{
      title?: string;
      detail?: string;
    }>;

    const legacyFindings = findings.filter(
      (f) =>
        (f.title ?? '').includes('Legacy') ||
        (f.detail ?? '').includes('Legacy') ||
        (f.title ?? '').includes('legacy') ||
        (f.detail ?? '').includes('legacy')
    );
    expect(legacyFindings.length).toBeGreaterThanOrEqual(1);

    rmSync(dir, { recursive: true, force: true });
  });

  it('formats findings with file and line number', () => {
    const reportWithFile = {
      ...fakeReport,
      findings: [
        { severity: 'warning', title: 'Issue in file', file: 'src/index.ts', line: 42 },
        { severity: 'info', title: 'Issue without line', file: 'src/utils.ts' },
      ],
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(reportWithFile));
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const report = handleAssessLegacy({ project_dir: dir }) as Record<string, unknown>;
    expect(report.findings).toBeDefined();
    rmSync(dir, { recursive: true, force: true });
  });

  it('handles report with no categories', () => {
    const reportNoCategories = {
      overallScore: 50,
      overallGrade: 'C',
      migrationReadiness: 'needs-work',
      migrationStrategy: 'strangler-fig',
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(reportNoCategories));
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const report = handleAssessLegacy({ project_dir: dir }) as Record<string, unknown>;
    expect(report.overallScore).toBe(50);
    rmSync(dir, { recursive: true, force: true });
  });

  it('registers tool on server', () => {
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    expect(() => registerAssessLegacy(server)).not.toThrow();
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools['assess_legacy_codebase']).toBeDefined();
  });

  it('registers and invokes handler with findings containing file and line', async () => {
    const reportWithFileLine = {
      overallScore: 60,
      overallGrade: 'C',
      migrationReadiness: 'needs-work',
      migrationStrategy: 'strangler-fig',
      categories: [{ category: 'code-quality', score: 60, grade: 'C', findings: 1 }],
      findings: [
        { severity: 'high', title: 'Bad pattern', file: 'src/app.ts', line: 10 },
        { severity: 'medium', title: 'No file here' },
      ],
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(reportWithFileLine));
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    registerAssessLegacy(server);
    const tools = (
      server as unknown as { _registeredTools: Record<string, { handler: (...a: unknown[]) => Promise<unknown> }> }
    )._registeredTools;
    const handler = tools['assess_legacy_codebase']?.handler;
    expect(handler).toBeDefined();
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const result = (await handler({ project_dir: dir })) as { content: Array<{ text: string }> };
    expect(result).toHaveProperty('content');
    expect(result.content[0].text).toContain('src/app.ts:10');
    expect(result.content[0].text).toContain('No file here');
    rmSync(dir, { recursive: true, force: true });
  });

  it('handles handler error gracefully', async () => {
    mockExecFileSync.mockImplementation(() => {
      throw new Error('CLI failed');
    });
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    registerAssessLegacy(server);
    const tools = (
      server as unknown as { _registeredTools: Record<string, { handler: (...a: unknown[]) => Promise<unknown> }> }
    )._registeredTools;
    const handler = tools['assess_legacy_codebase']?.handler;
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const result = (await handler({ project_dir: dir })) as { isError: boolean; content: Array<{ text: string }> };
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Assessment failed');
    rmSync(dir, { recursive: true, force: true });
  });
});
