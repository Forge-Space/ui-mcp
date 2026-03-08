import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { assessProject, detectStack, analyzeMigration } from 'forge-ai-init';

export const forgeMigrateInputSchema = {
  directory: z.string().min(1).describe('Absolute path to the project directory'),
  max_files: z.number().int().positive().optional().default(500).describe('Maximum files to scan (default: 500)'),
};

export const forgeMigrateSchema = z.object(forgeMigrateInputSchema);
export type ForgeMigrateParams = z.infer<typeof forgeMigrateSchema>;

export function buildForgeMigrateResponse(params: ForgeMigrateParams): {
  content: Array<{ type: 'text'; text: string }>;
} {
  try {
    const stack = detectStack(params.directory);
    const report = assessProject(params.directory, stack, params.max_files);
    const plan = analyzeMigration(params.directory, stack);

    const lines: string[] = [];
    lines.push(`# Migration Plan — ${report.overallGrade} (${report.overallScore}/100)`);
    lines.push('');
    lines.push(`**Readiness:** ${report.migrationReadiness}`);
    lines.push(`**Strategy:** ${plan.strategy.name}`);
    lines.push(`> ${plan.strategy.description}`);
    lines.push('');
    lines.push(`**Estimated Effort:** ${plan.estimatedEffort}`);
    lines.push('');

    lines.push('## Health Categories');
    lines.push('');
    for (const c of report.categories) {
      lines.push(`- **${c.category}**: ${c.score}/100 (${c.grade})`);
    }
    lines.push('');

    if (plan.phases.length > 0) {
      lines.push('## Migration Roadmap');
      lines.push('');
      for (const phase of plan.phases) {
        lines.push(`### ${phase.name}`);
        lines.push(`> ${phase.description}`);
        lines.push('');
        for (const task of phase.tasks) {
          lines.push(`- [ ] ${task}`);
        }
        lines.push('');
        lines.push(`**Quality Gate:** ${phase.gate}`);
        lines.push('');
      }
    }

    if (plan.dependencyRisks.length > 0) {
      lines.push('## Dependency Risks');
      lines.push('');
      for (const d of plan.dependencyRisks) {
        lines.push(`- **${d.name}** (${d.severity}): ${d.issue} → ${d.recommendation}`);
      }
      lines.push('');
    }

    if (plan.boundaries.length > 0) {
      lines.push('## Strangler Boundaries');
      lines.push('');
      for (const b of plan.boundaries.slice(0, 10)) {
        lines.push(`- **${b.module}** (${b.type}, ${b.complexity}): ${b.reason}`);
      }
      lines.push('');
    }

    if (plan.typingPlan.length > 0) {
      lines.push('## TypeScript Migration');
      lines.push('');
      for (const s of plan.typingPlan.slice(0, 10)) {
        lines.push(`- **${s.file}** (${s.priority}): ${s.reason}`);
      }
      lines.push('');
    }

    return {
      content: [{ type: 'text' as const, text: lines.join('\n') }],
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text' as const, text: `Migration analysis failed: ${msg}` }],
    };
  }
}

export function registerForgeMigrate(server: McpServer): void {
  server.tool(
    'forge_migrate',
    'Generate a full migration plan for a legacy project. Combines health assessment with strategy recommendation, strangler boundaries, TypeScript migration plan, dependency risks, and a phased roadmap with quality gates.',
    forgeMigrateInputSchema,
    (params) => buildForgeMigrateResponse(params)
  );
}
