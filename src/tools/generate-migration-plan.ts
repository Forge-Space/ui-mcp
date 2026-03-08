import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { execFileSync } from 'node:child_process';
import pino from 'pino';

const logger = pino({ name: 'generate-migration-plan' }, pino.destination(2));

const inputSchema = {
  project_dir: z.string().describe('Absolute path to the project directory'),
  target_framework: z.string().optional().describe('Target framework to migrate to'),
};

interface MigrationPhase {
  name: string;
  threshold: number;
  focus: string[];
  tasks: string[];
}

function migrationPhases(): MigrationPhase[] {
  return [
    {
      name: 'Assessment',
      threshold: 0,
      focus: ['inventory', 'risk-analysis'],
      tasks: [
        'Run migration assessment to baseline health score',
        'Identify critical modules by business value',
        'Document current architecture in ADR-0001',
        'Create dependency inventory',
      ],
    },
    {
      name: 'Foundation (40% quality gate)',
      threshold: 40,
      focus: ['security', 'testing'],
      tasks: [
        'Fix critical security vulnerabilities',
        'Add characterization tests for top 5 modules',
        'Set up CI pipeline with lint + test + audit',
        'Add .env protection and secret scanning',
        'Enable type checking on new files',
      ],
    },
    {
      name: 'Stabilization (60% quality gate)',
      threshold: 60,
      focus: ['quality', 'architecture'],
      tasks: [
        'Enable linting and formatting across codebase',
        'Add type annotations to modified files',
        'Increase test coverage to 50%+',
        'Extract shared utilities from duplicated code',
        'Document migration decisions in ADRs',
      ],
    },
    {
      name: 'Production (80% quality gate)',
      threshold: 80,
      focus: ['performance', 'reliability'],
      tasks: [
        'Achieve 80%+ test coverage on migrated modules',
        'Add performance monitoring and alerting',
        'Complete dependency modernization',
        'Remove deprecated APIs and dead code',
        'Run full governance audit — target A/B grade',
      ],
    },
  ];
}

function strategyDescription(strategy: string): string {
  const descriptions: Record<string, string> = {
    'strangler-fig':
      'Wrap legacy system, build new modules alongside, ' + 'redirect traffic incrementally, retire old code',
    'branch-by-abstraction':
      'Introduce abstraction layer over legacy code, ' + 'implement new version behind abstraction, switch',
    'parallel-run': 'Run old and new systems simultaneously, ' + 'compare outputs, switch when confident',
  };
  return descriptions[strategy] ?? strategy;
}

export function handleGenerateMigrationPlan(params: z.infer<z.ZodObject<typeof inputSchema>>): string {
  const result = execFileSync('npx', ['forge-ai-init', 'assess', '--json', '--dir', params.project_dir], {
    encoding: 'utf-8',
    timeout: 60000,
  });
  const report = JSON.parse(result) as {
    overallScore: number;
    overallGrade: string;
    migrationReadiness: string;
    migrationStrategy: string;
    findings: Array<{
      severity: string;
      title?: string;
      detail?: string;
      file?: string;
    }>;
  };

  const strategy = report.migrationStrategy;
  const phases = migrationPhases();

  let plan = '# Migration Plan\n\n';
  plan += '## Current State\n';
  plan += `- Health Score: ${report.overallScore}/100 `;
  plan += `(${report.overallGrade})\n`;
  plan += `- Readiness: ${report.migrationReadiness}\n`;
  if (params.target_framework) {
    plan += `- Target: ${params.target_framework}\n`;
  }
  plan += '\n';

  plan += `## Strategy: ${strategy.replace(/-/g, ' ')}\n\n`;
  plan += `${strategyDescription(strategy)}\n\n`;

  for (const phase of phases) {
    plan += `## ${phase.name}\n\n`;
    if (phase.threshold > 0) {
      plan += `**Quality Gate:** ${phase.threshold}% `;
      plan += 'minimum score\n';
      plan += `**Focus:** ${phase.focus.join(', ')}\n\n`;
    }
    plan += '**Tasks:**\n';
    for (const task of phase.tasks) {
      plan += `- [ ] ${task}\n`;
    }
    plan += '\n';
  }

  const criticals = report.findings.filter((f) => f.severity === 'critical');
  const highs = report.findings.filter((f) => f.severity === 'high');

  if (criticals.length > 0 || highs.length > 0) {
    plan += '## Priority Findings\n\n';
    if (criticals.length > 0) {
      plan += '### Critical (fix immediately)\n';
      for (const f of criticals) {
        const msg = f.title ?? f.detail ?? '';
        plan += `- ${msg}`;
        if (f.file) plan += ` (${f.file})`;
        plan += '\n';
      }
      plan += '\n';
    }
    if (highs.length > 0) {
      plan += '### High (fix in Foundation phase)\n';
      for (const f of highs.slice(0, 10)) {
        const msg = f.title ?? f.detail ?? '';
        plan += `- ${msg}`;
        if (f.file) plan += ` (${f.file})`;
        plan += '\n';
      }
      plan += '\n';
    }
  }

  return plan;
}

export function registerGenerateMigrationPlan(server: McpServer): void {
  server.tool(
    'generate_migration_plan',
    'Generate a phased migration plan for a legacy ' +
      'codebase. Runs assessment, detects strategy, and ' +
      'produces a roadmap with quality gates ' +
      '(40% -> 60% -> 80%).',
    inputSchema,
    async (params) => {
      try {
        const plan = handleGenerateMigrationPlan(params);
        return {
          content: [{ type: 'text' as const, text: plan }],
        };
      } catch (err) {
        logger.error({ err }, 'Migration plan generation failed');
        return {
          content: [
            {
              type: 'text' as const,
              text: `Plan generation failed: ${String(err)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
