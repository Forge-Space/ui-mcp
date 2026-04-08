import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf-8')) as {
  name: string;
  bin?: string | Record<string, string>;
  files?: string[];
};

function normalizeBin(bin: typeof pkg.bin, name: string): Array<[string, string]> {
  if (typeof bin === 'string') return [[name, bin]];
  if (bin && typeof bin === 'object') return Object.entries(bin);
  return [];
}

function pkgFilesCoversPath(files: string[], relPath: string): boolean {
  const clean = relPath.replace(/^\.\//, '');
  const top = clean.split('/')[0];
  return files.some((f) => {
    const c = f.replace(/\/$/, '').replace(/^\.\//, '');
    return c === top;
  });
}

describe('package.json bin entries', () => {
  const entries = normalizeBin(pkg.bin, pkg.name);
  const files: string[] = pkg.files ?? [];

  it('declares at least one bin entry', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it.each(entries)('bin "%s" -> "%s" exists on disk', (_name, rel) => {
    const abs = join(repoRoot, rel.replace(/^\.\//, ''));
    expect(existsSync(abs)).toBe(true);
  });

  it.each(entries)('bin "%s" -> "%s" starts with a node shebang', (_name, rel) => {
    const abs = join(repoRoot, rel.replace(/^\.\//, ''));
    if (!existsSync(abs)) return;
    const firstLine = readFileSync(abs, 'utf-8').split('\n', 1)[0] ?? '';
    expect(firstLine).toMatch(/^#!.*\bnode\b/);
  });

  it.each(entries)('bin "%s" -> "%s" lives under a directory in pkg.files', (_name, rel) => {
    expect(pkgFilesCoversPath(files, rel)).toBe(true);
  });
});
