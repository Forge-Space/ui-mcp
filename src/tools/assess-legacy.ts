import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { execFileSync } from 'node:child_process';
import pino from 'pino';

const logger = pino({ name: 'assess-legacy' }, pino.destination(2));

const inputSchema = {
  project_dir: z.string().describe('Absolute path to the project directory to assess'),
};

export function handleAssessLegacy(params: z.infer<z.ZodObject<typeof inputSchema>>): Record<string, unknown> {
  const result = execFileSync('npx', ['forge-ai-init', 'assess', '--json', '--dir', params.project_dir], {
    encoding: 'utf-8',
    timeout: 60000,
  });
  return JSON.parse(result) as Record<string, unknown>;
}

export function registerAssessLegacy(server: McpServer): void {
  server.tool(
    'assess_legacy_codebase',
    'Assess a legacy codebase for migration readiness. ' +
      'Analyzes dependencies, architecture, security, ' +
      'quality, and migration readiness. Returns health ' +
      'score (0-100), grade (A-F), migration strategy, ' +
      'and detailed findings.',
    inputSchema,
    async (params) => {
      try {
        const report = handleAssessLegacy(params);
        const r = report as {
          overallScore?: number;
          overallGrade?: string;
          migrationReadiness?: string;
          migrationStrategy?: string;
          categories?: Array<{
            category: string;
            score: number;
            grade: string;
            findings: number;
          }>;
          findings?: Array<{
            severity: string;
            title: string;
            file?: string;
            line?: number;
          }>;
        };

        const summary = [
          `# Migration Assessment: ${r.overallScore}/100 (${r.overallGrade})`,
          `Readiness: ${r.migrationReadiness}`,
          `Strategy: ${r.migrationStrategy}`,
          '',
          '## Categories',
          ...(r.categories ?? []).map(
            (c) => `- **${c.category}**: ${c.score}/100 ` + `(${c.grade}) — ${c.findings} findings`
          ),
          '',
          '## Top Findings',
          ...(r.findings ?? [])
            .slice(0, 15)
            .map((f) => `- [${f.severity}] ${f.title}${f.file ? ` (${f.file}${f.line ? `:${f.line}` : ''})` : ''}`),
        ].join('\n');

        return {
          content: [
            {
              type: 'text' as const,
              text: `${summary}\n\n\`\`\`json\n${JSON.stringify(report, null, 2)}\n\`\`\``,
            },
          ],
        };
      } catch (err) {
        logger.error({ err }, 'Assessment failed');
        return {
          content: [
            {
              type: 'text' as const,
              text: `Assessment failed: ${String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
