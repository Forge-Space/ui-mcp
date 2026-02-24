/**
 * Cross-repo knowledge sync — exports siza-mcp embeddings to JSONL
 * for import into mcp-gateway's knowledge base.
 *
 * Usage:
 *   npx tsx src/scripts/sync-knowledge.ts              # Full export
 *   npx tsx src/scripts/sync-knowledge.ts --dry-run    # Preview without writing
 *   npx tsx src/scripts/sync-knowledge.ts --since <ts>  # Incremental export
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import pino from 'pino';
import { getDatabase } from '../lib/design-references/database/store.js';

const logger = pino({ name: 'sync-knowledge' });

const SYNC_DIR = resolve(process.cwd(), '.uiforge', 'sync');
const EXPORT_FILE = join(SYNC_DIR, 'knowledge-export.jsonl');
const SYNC_META_FILE = join(SYNC_DIR, 'sync-meta.json');

interface SyncMeta {
  lastSyncTimestamp: number;
  lastExportCount: number;
  exportPath: string;
}

interface KnowledgeItem {
  id: string;
  type: string;
  text: string;
  vector: number[];
  dimensions: number;
  sourceType: string;
  createdAt: number;
  agentSpecific: string[];
}

function getSourceTypeToAgentMapping(sourceType: string): string[] {
  const mapping: Record<string, string[]> = {
    component: ['component-architect', 'style-recommender'],
    rule: ['accessibility-auditor', 'quality-scorer'],
    token: ['style-recommender', 'component-architect'],
    pattern: ['accessibility-auditor', 'prompt-enhancer'],
    example: ['component-architect', 'prompt-enhancer'],
    prompt: ['prompt-enhancer'],
    description: ['component-architect'],
  };
  return mapping[sourceType] ?? [];
}

function getSourceTypeToKnowledgeType(sourceType: string): string {
  const mapping: Record<string, string> = {
    component: 'component_pattern',
    rule: 'accessibility_rule',
    token: 'design_token',
    pattern: 'interaction_pattern',
    example: 'code_example',
    prompt: 'prompt_template',
    description: 'component_description',
  };
  return mapping[sourceType] ?? 'general';
}

function loadSyncMeta(): SyncMeta | null {
  if (!existsSync(SYNC_META_FILE)) return null;
  try {
    return JSON.parse(readFileSync(SYNC_META_FILE, 'utf-8'));
  } catch {
    return null;
  }
}

function saveSyncMeta(meta: SyncMeta): void {
  if (!existsSync(SYNC_DIR)) {
    mkdirSync(SYNC_DIR, { recursive: true });
  }
  writeFileSync(SYNC_META_FILE, JSON.stringify(meta, null, 2), 'utf-8');
}

function exportEmbeddings(
  sinceTimestamp?: number,
  dryRun: boolean = false
): {
  items: KnowledgeItem[];
  exportPath: string;
} {
  const db = getDatabase();

  const query = sinceTimestamp
    ? 'SELECT source_id, source_type, text, vector_blob, dimensions, created_at FROM embeddings WHERE created_at > ? ORDER BY created_at ASC'
    : 'SELECT source_id, source_type, text, vector_blob, dimensions, created_at FROM embeddings ORDER BY created_at ASC';

  const params = sinceTimestamp ? [sinceTimestamp] : [];
  const rows = db.prepare(query).all(...params) as Array<{
    source_id: string;
    source_type: string;
    text: string;
    vector_blob: Buffer;
    dimensions: number;
    created_at: number;
  }>;

  const items: KnowledgeItem[] = rows.map((row) => {
    const vector = Array.from(new Float32Array(row.vector_blob.buffer, row.vector_blob.byteOffset, row.dimensions));

    return {
      id: row.source_id,
      type: getSourceTypeToKnowledgeType(row.source_type),
      text: row.text,
      vector,
      dimensions: row.dimensions,
      sourceType: row.source_type,
      createdAt: row.created_at,
      agentSpecific: getSourceTypeToAgentMapping(row.source_type),
    };
  });

  if (!dryRun && items.length > 0) {
    if (!existsSync(SYNC_DIR)) {
      mkdirSync(SYNC_DIR, { recursive: true });
    }

    const lines = items.map((item) => JSON.stringify(item)).join('\n');
    writeFileSync(EXPORT_FILE, `${lines}\n`, 'utf-8');

    saveSyncMeta({
      lastSyncTimestamp: Date.now(),
      lastExportCount: items.length,
      exportPath: EXPORT_FILE,
    });

    logger.info({ count: items.length, path: EXPORT_FILE }, 'Knowledge exported');
  }

  return { items, exportPath: EXPORT_FILE };
}

function showSummary(items: KnowledgeItem[], dryRun: boolean): void {
  const byType = new Map<string, number>();
  const byAgent = new Map<string, number>();

  for (const item of items) {
    byType.set(item.type, (byType.get(item.type) ?? 0) + 1);
    for (const agent of item.agentSpecific) {
      byAgent.set(agent, (byAgent.get(agent) ?? 0) + 1);
    }
  }

  // eslint-disable-next-line no-console
  console.log(`\n${dryRun ? '🔍 Dry run' : '✅ Export'}: ${items.length} knowledge items\n`);

  // eslint-disable-next-line no-console
  console.log('By type:');
  for (const [type, count] of [...byType.entries()].sort((a, b) => b[1] - a[1])) {
    // eslint-disable-next-line no-console
    console.log(`  ${type.padEnd(25)} ${String(count).padStart(6)}`);
  }

  // eslint-disable-next-line no-console
  console.log('\nBy agent:');
  for (const [agent, count] of [...byAgent.entries()].sort((a, b) => b[1] - a[1])) {
    // eslint-disable-next-line no-console
    console.log(`  ${agent.padEnd(25)} ${String(count).padStart(6)}`);
  }

  const meta = loadSyncMeta();
  if (meta) {
    // eslint-disable-next-line no-console
    console.log(`\nLast sync: ${new Date(meta.lastSyncTimestamp).toISOString()}`);
    // eslint-disable-next-line no-console
    console.log(`Last export: ${meta.lastExportCount} items → ${meta.exportPath}`);
  }
  // eslint-disable-next-line no-console
  console.log();
}

function main(): void {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  let sinceTimestamp: number | undefined;
  const sinceIdx = args.indexOf('--since');
  if (sinceIdx >= 0 && args[sinceIdx + 1]) {
    sinceTimestamp = parseInt(args[sinceIdx + 1], 10);
    if (isNaN(sinceTimestamp)) {
      sinceTimestamp = new Date(args[sinceIdx + 1]).getTime();
    }
  } else {
    const meta = loadSyncMeta();
    if (meta && !args.includes('--full')) {
      sinceTimestamp = meta.lastSyncTimestamp;
      logger.info({ since: new Date(sinceTimestamp).toISOString() }, 'Incremental sync from last export');
    }
  }

  const { items } = exportEmbeddings(sinceTimestamp, dryRun);
  showSummary(items, dryRun);

  if (!dryRun && items.length > 0) {
    // eslint-disable-next-line no-console
    console.log(`Export written to: ${EXPORT_FILE}`);
    // eslint-disable-next-line no-console
    console.log('To import into mcp-gateway:');
    // eslint-disable-next-line no-console
    console.log(`  python tool_router/training/import_knowledge.py ${EXPORT_FILE}`);
  }
}

try {
  main();
} catch (err) {
  logger.error({ error: err }, 'Sync failed');
  process.exit(1);
}
