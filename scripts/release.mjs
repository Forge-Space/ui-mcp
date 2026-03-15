#!/usr/bin/env node
/**
 * Release automation for @forgespace/ui-mcp
 *
 * Usage:
 *   node scripts/release.mjs <version>          # e.g. 0.23.0
 *   node scripts/release.mjs patch              # auto-bump patch
 *   node scripts/release.mjs minor              # auto-bump minor
 *   node scripts/release.mjs major              # auto-bump major
 *   node scripts/release.mjs <version> --dry    # preview only
 *
 * What it does:
 *   1. Validates working tree is clean and on main
 *   2. Bumps version in package.json and server.json
 *   3. Promotes [Unreleased] in CHANGELOG.md → versioned section
 *   4. Commits + pushes a release branch
 *   5. Opens a PR, waits for CI (or uses --admin), merges
 *   6. Pulls main, tags, pushes tag → triggers publish.yml
 *   7. Waits for publish workflow to complete and reports result
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dry = process.argv.includes('--dry');

// ── helpers ──────────────────────────────────────────────────────────────────

function run(cmd, opts = {}) {
  if (dry) {
    console.log(`[dry] ${cmd}`);
    return '';
  }
  return execSync(cmd, { cwd: root, encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'], ...opts }).trim();
}

function readJson(file) {
  return JSON.parse(readFileSync(join(root, file), 'utf8'));
}

function writeJson(file, data) {
  writeFileSync(join(root, file), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function bumpVersion(current, increment) {
  const [major, minor, patch] = current.split('.').map(Number);
  if (increment === 'major') return `${major + 1}.0.0`;
  if (increment === 'minor') return `${major}.${minor + 1}.0`;
  if (increment === 'patch') return `${major}.${minor}.${patch + 1}`;
  return increment; // treat as exact version
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function step(msg) {
  console.log(`\n▶ ${msg}`);
}

function success(msg) {
  console.log(`  ✓ ${msg}`);
}

function warn(msg) {
  console.log(`  ⚠ ${msg}`);
}

// ── guards ────────────────────────────────────────────────────────────────────

step('Checking environment...');

const branch = execSync('git branch --show-current', { cwd: root, encoding: 'utf8' }).trim();
if (branch !== 'main' && !dry) {
  console.error(`Error: must run from main (currently on "${branch}")`);
  process.exit(1);
} else if (branch !== 'main' && dry) {
  warn(`Dry run: skipping branch check (on "${branch}")`);
}

const status = execSync('git status --short', { cwd: root, encoding: 'utf8' }).trim();
if (status && !dry) {
  console.error(`Error: working tree is dirty:\n${status}`);
  process.exit(1);
} else if (status && dry) {
  warn('Dry run: skipping dirty-tree check');
}

// Pull latest
run('git pull origin main --ff-only');
success('On clean main, pulled latest');

// ── version resolution ────────────────────────────────────────────────────────

const pkg = readJson('package.json');
const server = readJson('server.json');
const current = pkg.version;
const versionArg = process.argv[2];

if (!versionArg) {
  console.error('Usage: node scripts/release.mjs <version|patch|minor|major> [--dry] [--admin]');
  process.exit(1);
}

const next = bumpVersion(current, versionArg);

if (!/^\d+\.\d+\.\d+$/.test(next)) {
  console.error(`Invalid version: "${next}"`);
  process.exit(1);
}

step(`Releasing v${current} → v${next}${dry ? ' (DRY RUN)' : ''}...`);

// ── version bump ──────────────────────────────────────────────────────────────

step('Bumping versions...');

pkg.version = next;
if (dry) {
  console.log(`  [dry] package.json: ${current} → ${next}`);
} else {
  writeJson('package.json', pkg);
}

server.version = next;
if (server.packages) {
  server.packages = server.packages.map((p) => ({ ...p, version: next }));
}
if (dry) {
  console.log(`  [dry] server.json: ${current} → ${next}`);
} else {
  writeJson('server.json', server);
}

success(`package.json + server.json: ${current} → ${next}`);

// ── CHANGELOG ─────────────────────────────────────────────────────────────────

step('Updating CHANGELOG...');

const changelogPath = join(root, 'CHANGELOG.md');
let changelog = readFileSync(changelogPath, 'utf8');

const hasContent = !changelog.match(/## \[Unreleased\]\n\n## \[/);

if (!hasContent) {
  // No content under Unreleased — add a minimal entry
  changelog = changelog.replace(
    '## [Unreleased]',
    `## [Unreleased]\n\n## [${next}] - ${today()}\n\n### Changed\n\n- Version bump to ${next}\n`
  );
  warn('No [Unreleased] content found — added minimal entry');
} else {
  // Promote Unreleased → versioned section
  changelog = changelog.replace('## [Unreleased]', `## [Unreleased]\n\n## [${next}] - ${today()}`);
  success(`Promoted [Unreleased] → [${next}]`);
}

if (!dry) {
  writeFileSync(changelogPath, changelog, 'utf8');
}

// ── registry:check ────────────────────────────────────────────────────────────

step('Running registry:check...');
try {
  run('node scripts/registry-check.mjs');
  success('registry:check passed');
} catch {
  console.error('registry:check failed — aborting release');
  process.exit(1);
}

// ── branch + commit + push ────────────────────────────────────────────────────

const releaseBranch = `chore/release-v${next}`;
step(`Creating branch ${releaseBranch}...`);

run(`git checkout -b ${releaseBranch}`);
run(`git add package.json server.json CHANGELOG.md`);

// package-lock.json may also be bumped by npm version
try {
  const cached = execSync('git diff --cached --name-only', { cwd: root, encoding: 'utf8' });
  if (cached.includes('package-lock')) {
    run('git add package-lock.json');
  }
} catch {
  /* no lock file changed */
}

run(`git commit -m "chore: release v${next}"`);
run(`git push -u origin ${releaseBranch}`);
success(`Pushed ${releaseBranch}`);

// ── PR ────────────────────────────────────────────────────────────────────────

step('Creating PR...');
const prBody = `Version bump to v${next}. Tagging after merge triggers the publish pipeline (npm + MCP Registry + GitHub Release).`;
const prUrl = run(`gh pr create --repo Forge-Space/ui-mcp --title "chore: release v${next}" --body "${prBody}"`);
success(`PR: ${prUrl}`);

// Extract PR number
const prNum = prUrl.match(/\/pull\/(\d+)/)?.[1];
if (!prNum) {
  warn('Could not extract PR number — merge manually then tag');
  process.exit(0);
}

// ── merge ─────────────────────────────────────────────────────────────────────

step('Merging PR...');
// Brief pause for GitHub to register the PR
run('sleep 8');
run(`gh pr merge ${prNum} --repo Forge-Space/ui-mcp --squash --admin`);
success(`Merged PR #${prNum}`);

// ── tag + push ────────────────────────────────────────────────────────────────

step('Tagging release...');
run('git checkout main');
run('git pull origin main --ff-only');
run(`git tag -a v${next} -m "Release v${next}"`);
run(`git push origin v${next}`);
success(`Tagged and pushed v${next} — publish pipeline triggered`);

// Clean up local release branch
try {
  run(`git branch -d ${releaseBranch}`);
} catch {
  /* ignore */
}

// ── monitor publish ───────────────────────────────────────────────────────────

step('Waiting for publish pipeline...');
const maxWait = 300; // 5 minutes
const interval = 15;
let elapsed = 0;
let runId = '';

// Wait for the workflow run to appear
while (elapsed < 30) {
  try {
    const runs = JSON.parse(
      execSync(
        `gh run list --workflow=publish.yml --repo Forge-Space/ui-mcp --limit 1 --json databaseId,status,headBranch`,
        { cwd: root, encoding: 'utf8' }
      )
    );
    if (runs[0]?.headBranch === `v${next}` || runs[0]?.headBranch === 'main') {
      runId = String(runs[0].databaseId);
      break;
    }
  } catch {
    /* retry */
  }
  execSync(`sleep ${interval}`);
  elapsed += interval;
}

if (!runId) {
  warn('Could not find publish run — check GitHub Actions manually');
  process.exit(0);
}

success(`Publish run ID: ${runId}`);

while (elapsed < maxWait) {
  execSync(`sleep ${interval}`);
  elapsed += interval;

  try {
    const view = execSync(`gh run view ${runId} --repo Forge-Space/ui-mcp --json status,conclusion,jobs`, {
      cwd: root,
      encoding: 'utf8',
    });
    const { status, conclusion, jobs } = JSON.parse(view);

    const jobSummary = (jobs || [])
      .map((j) => `${j.conclusion === 'success' ? '✓' : j.conclusion === 'failure' ? '✗' : '…'} ${j.name}`)
      .join('  ');
    process.stdout.write(`\r  [${elapsed}s] ${status} — ${jobSummary}    `);

    if (status === 'completed') {
      console.log('');
      if (conclusion === 'success') {
        success(`Publish pipeline succeeded!`);
        console.log(`\n🎉 v${next} released to npm + MCP Registry + GitHub Releases`);
      } else {
        console.error(
          `\n✗ Publish pipeline ${conclusion} — check: gh run view ${runId} --repo Forge-Space/ui-mcp --log-failed`
        );
        process.exit(1);
      }
      break;
    }
  } catch {
    /* retry */
  }
}

if (elapsed >= maxWait) {
  warn(
    `Timeout waiting for publish pipeline — check manually: gh run list --workflow=publish.yml --repo Forge-Space/ui-mcp`
  );
}
