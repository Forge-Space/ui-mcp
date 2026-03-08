import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { handleGenerateMigrationPlan } from '../../tools/generate-migration-plan.js';

function makeTmpDir(): string {
  const dir = join(tmpdir(), `mcp-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

describe('generate_migration_plan tool', () => {
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
});
