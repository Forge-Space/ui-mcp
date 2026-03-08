import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { analyzeDiff, type DiffResult } from 'forge-ai-init';

export const forgeDiffInputSchema = {
  directory: z.string().min(1, 'directory is required').describe('Absolute path to the git repository'),
  base: z.string().optional().describe('Base branch or commit to compare against (default: main)'),
  head: z.string().optional().describe('Head branch or commit (default: HEAD)'),
  staged: z.boolean().optional().default(false).describe('Analyze staged changes only'),
};

export const forgeDiffSchema = z.object(forgeDiffInputSchema);
export type ForgeDiffParams = z.infer<typeof forgeDiffSchema>;

export function buildForgeDiffResponse(params: ForgeDiffParams): {
  content: Array<{ type: 'text'; text: string }>;
} {
  let result: DiffResult;
  try {
    result = analyzeDiff(params.directory, {
      base: params.base,
      head: params.head,
      staged: params.staged,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text' as const, text: `Diff analysis failed: ${msg}` }],
    };
  }

  const icon = result.improved ? '📈' : result.delta === 0 ? '➡️' : '📉';

  const newFindings = result.newFindings
    .slice(0, 15)
    .map((f) => `- **${f.severity}** \`${f.rule}\` in \`${f.file}\`: ${f.message}`)
    .join('\n');

  const resolved = result.resolvedFindings
    .slice(0, 10)
    .map((f) => `- ~~${f.severity}~~ \`${f.rule}\` in \`${f.file}\`: ${f.message}`)
    .join('\n');

  const text = [
    `# ${icon} Quality Delta Report`,
    ``,
    `**Before**: ${result.beforeScore}/100 → **After**: ${result.afterScore}/100`,
    `**Delta**: ${result.delta >= 0 ? '+' : ''}${result.delta}`,
    `**Changed files**: ${result.changedFiles.length}`,
    ``,
    result.summary,
    newFindings
      ? `\n## New Findings (${result.newFindings.length})\n${newFindings}`
      : '\n## New Findings\nNone — clean diff!',
    resolved ? `\n## Resolved Findings (${result.resolvedFindings.length})\n${resolved}` : '',
  ].join('\n');

  return { content: [{ type: 'text' as const, text }] };
}

export function registerForgeDiff(server: McpServer): void {
  server.tool(
    'forge_diff',
    'Analyze quality delta between two git refs. Shows score change, new findings introduced, and resolved findings. Useful for PR quality checks.',
    forgeDiffInputSchema,
    (params) => buildForgeDiffResponse(params)
  );
}
