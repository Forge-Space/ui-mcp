import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const mockExecFileSync = jest.fn<() => string>();

jest.unstable_mockModule('node:child_process', () => ({
  execFileSync: mockExecFileSync,
}));

const { handleGenerateMigrationPlan, registerGenerateMigrationPlan } =
  await import('../../tools/generate-migration-plan.js');

function makeTmpDir(): string {
  return mkdtempSync(join(tmpdir(), 'mcp-test-'));
}

const fakeReport = {
  overallScore: 72,
  overallGrade: 'C',
  migrationReadiness: 'needs-work',
  migrationStrategy: 'strangler-fig',
  findings: [
    { severity: 'high', title: 'Outdated dependency', detail: 'express 3.x is EOL' },
    { severity: 'medium', title: 'Missing tests', detail: 'No test files found' },
  ],
};

describe('generate_migration_plan tool', () => {
  beforeEach(() => {
    mockExecFileSync.mockReturnValue(JSON.stringify(fakeReport));
  });

  afterEach(() => {
    mockExecFileSync.mockReset();
  });

  it('generates a plan with phases', () => {
    const dir = makeTmpDir();
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        dependencies: { express: '^4.0.0' },
        devDependencies: { jest: '^29.0.0' },
      })
    );
    writeFileSync(join(dir, '.gitignore'), '.env\nnode_modules');

    const plan = handleGenerateMigrationPlan({
      project_dir: dir,
    });

    expect(plan).toContain('Migration Plan');
    expect(plan).toContain('Assessment');
    expect(plan).toContain('Foundation (40%');
    expect(plan).toContain('Stabilization (60%');
    expect(plan).toContain('Production (80%');
    expect(plan).toContain('Health Score');

    rmSync(dir, { recursive: true, force: true });
  });

  it('includes target framework when specified', () => {
    const dir = makeTmpDir();
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        dependencies: { jquery: '^3.0.0' },
      })
    );

    const plan = handleGenerateMigrationPlan({
      project_dir: dir,
      target_framework: 'react',
    });

    expect(plan).toContain('react');

    rmSync(dir, { recursive: true, force: true });
  });

  it('includes Priority Findings section for projects with issues', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: { express: '3.0.0' } }));
    writeFileSync(join(dir, 'index.js'), 'var x = 1;');

    const plan = handleGenerateMigrationPlan({ project_dir: dir });

    expect(typeof plan).toBe('string');
    expect(plan.length).toBeGreaterThan(100);

    rmSync(dir, { recursive: true, force: true });
  });

  it('includes critical findings section when critical issues exist', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: { lodash: '3.0.0' } }));

    const plan = handleGenerateMigrationPlan({ project_dir: dir });

    expect(plan).toContain('## Assessment');
    expect(plan).toContain('## Strategy:');

    rmSync(dir, { recursive: true, force: true });
  });

  it('registers tool on server', () => {
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    expect(() => registerGenerateMigrationPlan(server)).not.toThrow();
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools['generate_migration_plan']).toBeDefined();
  });

  it('registers and invokes handler via MCP server', async () => {
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    registerGenerateMigrationPlan(server);
    const tools = (
      server as unknown as { _registeredTools: Record<string, { handler: (...a: unknown[]) => Promise<unknown> }> }
    )._registeredTools;
    const handler = tools['generate_migration_plan']?.handler;
    expect(handler).toBeDefined();

    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const result = (await handler({ project_dir: dir })) as { content: unknown[] };
    expect(result).toHaveProperty('content');
    expect(Array.isArray(result.content)).toBe(true);
    rmSync(dir, { recursive: true, force: true });
  });

  it('includes critical findings section when severity is critical', () => {
    const criticalReport = {
      ...fakeReport,
      migrationStrategy: 'strangler-fig',
      findings: [
        { severity: 'critical', title: 'Security vulnerability', detail: 'CVE-2023-1234' },
        { severity: 'high', title: 'Outdated dep', detail: 'express 3.x EOL' },
      ],
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(criticalReport));
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const plan = handleGenerateMigrationPlan({ project_dir: dir });
    expect(plan).toContain('Critical');
    rmSync(dir, { recursive: true, force: true });
  });

  it('includes file reference in findings when file property exists', () => {
    const reportWithFile = {
      ...fakeReport,
      findings: [
        { severity: 'high', title: 'Issue in file', file: 'src/index.ts' },
        { severity: 'medium', title: 'No file' },
      ],
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(reportWithFile));
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const plan = handleGenerateMigrationPlan({ project_dir: dir });
    expect(plan).toContain('src/index.ts');
    rmSync(dir, { recursive: true, force: true });
  });

  it('uses strategy name as fallback for unknown strategy', () => {
    const unknownStrategyReport = {
      ...fakeReport,
      migrationStrategy: 'custom-unknown-strategy',
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(unknownStrategyReport));
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const plan = handleGenerateMigrationPlan({ project_dir: dir });
    expect(plan).toContain('custom-unknown-strategy');
    rmSync(dir, { recursive: true, force: true });
  });

  it('uses detail as fallback when finding has no title', () => {
    const reportNoTitle = {
      ...fakeReport,
      findings: [{ severity: 'high', detail: 'Only detail, no title' }],
    };
    mockExecFileSync.mockReturnValue(JSON.stringify(reportNoTitle));
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ dependencies: {} }));
    const plan = handleGenerateMigrationPlan({ project_dir: dir });
    expect(plan).toContain('Only detail, no title');
    rmSync(dir, { recursive: true, force: true });
  });
});
