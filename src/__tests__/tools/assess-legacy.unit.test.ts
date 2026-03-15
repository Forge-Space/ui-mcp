import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const mockExecFileSync = jest.fn<() => string>();

jest.unstable_mockModule('node:child_process', () => ({
  execFileSync: mockExecFileSync,
}));

const { handleAssessLegacy } = await import('../../tools/assess-legacy.js');

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
});
