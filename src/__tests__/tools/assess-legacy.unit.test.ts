import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { handleAssessLegacy } from '../../tools/assess-legacy.js';

function makeTmpDir(): string {
  const dir = join(tmpdir(), `mcp-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

describe('assess_legacy_codebase tool', () => {
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
