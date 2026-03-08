import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { assessProject, detectStack } from 'forge-ai-init';

export const forgeAssessInputSchema = {
  directory: z.string().min(1).describe('Absolute path to the project directory'),
  max_files: z.number().int().positive().optional().default(500).describe('Maximum files to scan (default: 500)'),
};

export const forgeAssessSchema = z.object(forgeAssessInputSchema);
export type ForgeAssessParams = z.infer<typeof forgeAssessSchema>;

export function buildForgeAssessResponse(params: ForgeAssessParams): {
  content: Array<{ type: 'text'; text: string }>;
} {
  try {
    const stack = detectStack(params.directory);
    const report = assessProject(params.directory, stack, params.max_files);

    const lines: string[] = [];
    lines.push(`# Health Assessment — ${report.overallGrade} (${report.overallScore}/100)`);
    lines.push('');
    lines.push(`**Migration Readiness:** ${report.migrationReadiness}`);
    lines.push(`**Strategy:** ${report.migrationStrategy}`);
    lines.push(`**Files Scanned:** ${report.filesScanned}`);
    lines.push('');

    lines.push('## Categories');
    lines.push('');
    lines.push('| Category | Score | Grade | Critical | High |');
    lines.push('|----------|------:|:-----:|:--------:|:----:|');
    for (const c of report.categories) {
      lines.push(`| ${c.category} | ${c.score} | ${c.grade} | ${c.critical} | ${c.high} |`);
    }
    lines.push('');

    const criticals = report.findings.filter((f) => f.severity === 'critical');
    const highs = report.findings.filter((f) => f.severity === 'high');

    if (criticals.length > 0) {
      lines.push('## Critical Issues');
      lines.push('');
      for (const f of criticals.slice(0, 10)) {
        const loc = f.file ? ` (${f.file}${f.line ? `:${f.line}` : ''})` : '';
        lines.push(`- **${f.title}**${loc}: ${f.detail}`);
      }
      lines.push('');
    }

    if (highs.length > 0) {
      lines.push('## High-Priority Issues');
      lines.push('');
      for (const h of highs.slice(0, 10)) {
        const loc = h.file ? ` (${h.file}${h.line ? `:${h.line}` : ''})` : '';
        lines.push(`- **${h.title}**${loc}: ${h.detail}`);
      }
      lines.push('');
    }

    lines.push(report.summary);

    return {
      content: [{ type: 'text' as const, text: lines.join('\n') }],
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text' as const, text: `Assessment failed: ${msg}` }],
    };
  }
}

export function registerForgeAssess(server: McpServer): void {
  server.tool(
    'forge_assess',
    'Run a full project health assessment across 5 categories (dependencies, architecture, security, quality, migration-readiness). Returns scores, grades, migration readiness, and prioritized findings.',
    forgeAssessInputSchema,
    (params) => buildForgeAssessResponse(params)
  );
}
