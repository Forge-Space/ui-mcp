#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);

function readJson(name) {
  return JSON.parse(readFileSync(new URL(name, root), 'utf8'));
}

function parseArgs(argv) {
  const outputIndex = argv.indexOf('--output-dir');
  if (outputIndex === -1 || !argv[outputIndex + 1]) {
    return { outputDir: path.join(rootPath, 'artifacts', 'mcp-registry-status') };
  }
  return { outputDir: path.resolve(argv[outputIndex + 1]) };
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.json();
}

function normalizeRepoUrl(url = '') {
  return url
    .replace(/^git\+/, '')
    .replace(/\.git$/, '')
    .replace(/\/$/, '');
}

function pickRegistryEntry(results, server) {
  return (
    results.servers?.find((item) => item.server?.name === server.name) ??
    results.servers?.find(
      (item) => normalizeRepoUrl(item.server?.repository?.url) === normalizeRepoUrl(server.repository?.url)
    ) ??
    null
  );
}

function buildActionItems(pkg, npmVersion, registryVersion, registryEntry) {
  if (!npmVersion || npmVersion !== pkg.version) {
    return [`Publish ${pkg.name}@${pkg.version} to npm from tag v${pkg.version}.`];
  }
  if (!registryEntry) return [`Publish ${pkg.mcpName} to the MCP Registry after npm is live.`];
  if (registryVersion !== pkg.version)
    return [`Republish MCP Registry metadata so ${pkg.mcpName} reports ${pkg.version}.`];
  return ['No action required. Package and MCP Registry metadata are aligned.'];
}

function buildReport(pkg, server, status) {
  const lines = [
    '# MCP Registry Status',
    '',
    `- Generated: ${status.generatedAt}`,
    `- Package: [${pkg.name}](https://www.npmjs.com/package/${encodeURIComponent(pkg.name)})`,
    `- Server: \`${server.name}\``,
    '',
    '## Snapshot',
    '',
    `- Expected release version: \`${pkg.version}\``,
    `- npm latest version: \`${status.npm.latestVersion ?? 'not published'}\``,
    `- MCP Registry version: \`${status.registry.version ?? 'missing'}\``,
    `- Registry status: \`${status.registry.publishStatus ?? 'missing'}\``,
    '',
    '## Action Items',
    '',
    ...status.actionItems.map((item) => `- ${item}`),
  ];
  return `${lines.join('\n')}\n`;
}

async function main() {
  const { outputDir } = parseArgs(process.argv);
  const pkg = readJson('package.json');
  const server = readJson('server.json');
  const npmMetadata = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`).catch(() => null);
  const registryResults = await fetchJson(
    `https://registry.modelcontextprotocol.io/v0.1/servers?search=${encodeURIComponent(server.name)}`
  ).catch(() => ({ servers: [] }));
  const registryEntry = pickRegistryEntry(registryResults, server);
  const registryVersion = registryEntry?.server?.version ?? null;
  const publishStatus = registryEntry?._meta?.['io.modelcontextprotocol.registry/official']?.status ?? null;
  const report = {
    generatedAt: new Date().toISOString(),
    package: pkg.name,
    expectedVersion: pkg.version,
    npm: {
      latestVersion: npmMetadata?.['dist-tags']?.latest ?? null,
      packageUrl: `https://www.npmjs.com/package/${encodeURIComponent(pkg.name)}`,
    },
    registry: {
      version: registryVersion,
      publishStatus,
      searchUrl: `https://registry.modelcontextprotocol.io/v0.1/servers?search=${encodeURIComponent(server.name)}`,
      recordUrl: registryEntry?.server?.repository?.url ?? null,
    },
  };
  report.actionItems = buildActionItems(pkg, report.npm.latestVersion, registryVersion, registryEntry);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(path.join(outputDir, 'report.md'), buildReport(pkg, server, report));
  console.log(path.join(outputDir, 'report.md'));
}

await main();
