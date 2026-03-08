import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { assessProject, type AssessmentContext, type AssessmentReport } from '@forgespace/core';
import pino from 'pino';

const logger = pino({ name: 'assess-legacy' }, pino.destination(2));

const inputSchema = {
  project_dir: z.string().describe('Absolute path to the project directory'),
  language: z.string().optional().describe('Primary language'),
  framework: z.string().optional().describe('Primary framework'),
  test_framework: z.string().optional().describe('Test framework in use'),
  has_linting: z.boolean().optional().describe('Whether linting is configured'),
  has_type_checking: z.boolean().optional().describe('Whether type checking is configured'),
  has_ci: z.boolean().optional().describe('Whether CI is configured'),
  max_files: z.number().optional().describe('Max files to scan (default 500)'),
};

type Params = z.infer<z.ZodObject<typeof inputSchema>>;

export function handleAssessLegacy(params: Params): AssessmentReport {
  const ctx: AssessmentContext = { dir: params.project_dir };
  if (params.language) ctx.language = params.language;
  if (params.framework) ctx.framework = params.framework;
  if (params.test_framework) ctx.testFramework = params.test_framework;
  if (params.has_linting) ctx.hasLinting = params.has_linting;
  if (params.has_type_checking) ctx.hasTypeChecking = params.has_type_checking;
  if (params.has_ci) ctx.hasCi = params.has_ci;

  return assessProject(ctx, params.max_files ?? 500);
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

        const summary = [
          `# Migration Assessment: ${report.overallScore}/100 (${report.grade})`,
          `Readiness: ${report.readiness}`,
          `Strategy: ${report.strategy}`,
          '',
          '## Categories',
          ...report.categories.map(
            (c) => `- **${c.category}**: ${c.score}/100 ` + `(${c.grade}) \u2014 ${c.findings.length} findings`
          ),
          '',
          '## Top Findings',
          ...report.findings
            .slice(0, 15)
            .map((f) => `- [${f.severity}] ${f.message}${f.file ? ` (${f.file}${f.line ? `:${f.line}` : ''})` : ''}`),
        ].join('\n');

        return {
          content: [
            {
              type: 'text' as const,
              text: `${summary}\n\n` + `\`\`\`json\n${JSON.stringify(report, null, 2)}\n\`\`\``,
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
