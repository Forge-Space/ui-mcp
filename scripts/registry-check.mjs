#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);

function readJson(name) {
  return JSON.parse(readFileSync(new URL(name, root), 'utf8'));
}

function normalizeRepoUrl(url) {
  return url
    .replace(/^git\+/, '')
    .replace(/\.git$/, '')
    .replace(/\/$/, '');
}

function getPackPaths() {
  execFileSync('npm', ['run', 'build'], { cwd: rootPath, encoding: 'utf8' });
  const output = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd: rootPath,
    encoding: 'utf8',
  });
  const [pack] = JSON.parse(output);
  return pack.files.map((file) => file.path);
}

async function getPublishedVersions(name) {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
    headers: { accept: 'application/json' },
  });
  if (response.status === 404) {
    return {};
  }
  if (!response.ok) {
    throw new Error(`npm registry lookup failed with ${response.status}`);
  }
  const metadata = await response.json();
  return metadata.versions ?? {};
}

function collectFindings(pkg, server, packPaths, publishedVersions) {
  const errors = [];
  const warnings = [];
  const npmPackage = server.packages?.find((entry) => entry.registryType === 'npm');
  if (!pkg.mcpName) errors.push('package.json is missing mcpName.');
  if (server.name !== pkg.mcpName) errors.push('server.json name must match package.json mcpName.');
  if (server.version !== pkg.version) errors.push('server.json version must match package.json version.');
  if (!npmPackage) errors.push('server.json must include one npm package entry.');
  if (npmPackage?.identifier !== pkg.name) errors.push('server.json npm identifier must match package name.');
  if (npmPackage?.version !== pkg.version) errors.push('server.json npm version must match package version.');
  if (npmPackage?.transport?.type !== 'stdio') errors.push('server.json npm package transport must be stdio.');
  if (!Array.isArray(server.environmentVariables)) errors.push('server.json environmentVariables must be an array.');
  if (pkg.publishConfig?.access !== 'public') errors.push('package.json publishConfig.access must be public.');
  if (!pkg.files?.includes('server.json')) errors.push('package.json files must include server.json.');
  if (!packPaths.includes('server.json')) errors.push('npm pack --dry-run must include server.json.');
  if (!packPaths.some((item) => item.startsWith('dist/')))
    errors.push('npm pack --dry-run must include built dist artifacts.');
  if (!packPaths.includes('README.md')) errors.push('npm pack --dry-run must include README.md.');
  if (normalizeRepoUrl(pkg.repository.url) !== normalizeRepoUrl(server.repository.url)) {
    errors.push('package.json repository.url must match server.json repository.url.');
  }
  if (publishedVersions[pkg.version]) {
    warnings.push(`npm already has published version ${pkg.version}; bump before the next release tag.`);
  }
  // MCP Registry enforces description <= 100 chars
  if (server.description && server.description.length > 100) {
    errors.push(`server.json description is ${server.description.length} chars (max 100 for MCP Registry).`);
  }
  return { errors, warnings };
}

async function main() {
  const pkg = readJson('package.json');
  const server = readJson('server.json');
  const packPaths = getPackPaths();
  const publishedVersions = await getPublishedVersions(pkg.name);
  const { errors, warnings } = collectFindings(pkg, server, packPaths, publishedVersions);
  if (errors.length > 0) {
    console.error('Registry check failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Registry check passed for ${pkg.name}@${pkg.version}`);
  for (const warning of warnings) console.log(`Warning: ${warning}`);
}

await main();
