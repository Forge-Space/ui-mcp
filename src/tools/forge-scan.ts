import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { scanProject, type ScanReport } from 'forge-ai-init';

export const forgeScanInputSchema = {
  directory: z.string().min(1, 'directory is required').describe('Absolute path to the project directory to scan'),
  max_files: z
    .number()
    .int()
    .positive()
    .optional()
    .default(500)
    .describe('Maximum number of files to scan (default: 500)'),
};

export const forgeScanSchema = z.object(forgeScanInputSchema);
export type ForgeScanParams = z.infer<typeof forgeScanSchema>;

export function buildForgeScanResponse(params: ForgeScanParams): {
  content: Array<{ type: 'text'; text: string }>;
} {
  let report: ScanReport;
  try {
    report = scanProject(params.directory, params.max_files);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text' as const, text: `Scan failed: ${msg}` }],
    };
  }

  const categories = report.summary.map((c) => `| ${c.category} | ${c.count} | ${c.critical} | ${c.high} |`).join('\n');

  const topFiles = report.topFiles
    .slice(0, 10)
    .map((f) => `| ${f.file} | ${f.count} | ${f.worst} |`)
    .join('\n');

  const criticalFindings = report.findings
    .filter((f) => f.severity === 'critical' || f.severity === 'high')
    .slice(0, 20)
    .map((f) => `- **${f.severity}** \`${f.rule}\` in \`${f.file}:${f.line}\`: ${f.message}`)
    .join('\n');

  const text = [
    `# Forge Scan Report`,
    ``,
    `**Score**: ${report.score}/100 (Grade: ${report.grade})`,
    `**Files scanned**: ${report.filesScanned}`,
    `**Total findings**: ${report.findings.length}`,
    ``,
    `## Categories`,
    `| Category | Findings | Critical | High |`,
    `|----------|----------|----------|------|`,
    categories,
    ``,
    `## Hotspot Files`,
    `| File | Findings | Worst |`,
    `|------|----------|-------|`,
    topFiles,
    criticalFindings ? `\n## Critical & High Findings\n${criticalFindings}` : '',
  ].join('\n');

  return { content: [{ type: 'text' as const, text }] };
}

export function registerForgeScan(server: McpServer): void {
  server.tool(
    'forge_scan',
    'Scan a project for code quality issues using forge-ai-init governance rules (25 rules, 10 categories). Returns score, grade, findings by category, and hotspot files.',
    forgeScanInputSchema,
    (params) => buildForgeScanResponse(params)
  );
}
