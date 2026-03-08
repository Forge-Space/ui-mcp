import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { assessProject, detectStrategy, type AssessmentContext, type AssessmentReport } from '@forgespace/core';
import pino from 'pino';

const logger = pino({ name: 'generate-migration-plan' }, pino.destination(2));

const inputSchema = {
  project_dir: z.string().describe('Absolute path to the project directory'),
  language: z.string().optional().describe('Primary language'),
  framework: z.string().optional().describe('Primary framework'),
  test_framework: z.string().optional().describe('Test framework in use'),
  has_linting: z.boolean().optional().describe('Whether linting is configured'),
  has_type_checking: z.boolean().optional().describe('Whether type checking is configured'),
  has_ci: z.boolean().optional().describe('Whether CI is configured'),
  target_framework: z.string().optional().describe('Target framework to migrate to'),
  max_files: z.number().optional().describe('Max files to scan (default 500)'),
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
        'Run full governance audit \u2014 target A/B grade',
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

type Params = z.infer<z.ZodObject<typeof inputSchema>>;

function buildContext(params: Params): AssessmentContext {
  const ctx: AssessmentContext = { dir: params.project_dir };
  if (params.language) ctx.language = params.language;
  if (params.framework) ctx.framework = params.framework;
  if (params.test_framework) ctx.testFramework = params.test_framework;
  if (params.has_linting) ctx.hasLinting = params.has_linting;
  if (params.has_type_checking) ctx.hasTypeChecking = params.has_type_checking;
  if (params.has_ci) ctx.hasCi = params.has_ci;
  return ctx;
}

export function handleGenerateMigrationPlan(params: Params): string {
  const ctx = buildContext(params);
  const report: AssessmentReport = assessProject(ctx, params.max_files ?? 500);
  const strategy = detectStrategy(ctx);

  const phases = migrationPhases();

  let plan = '# Migration Plan\n\n';
  plan += '## Current State\n';
  plan += `- Health Score: ${report.overallScore}/100 `;
  plan += `(${report.grade})\n`;
  plan += `- Readiness: ${report.readiness}\n`;
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
        plan += `- ${f.message}`;
        if (f.file) plan += ` (${f.file})`;
        plan += '\n';
      }
      plan += '\n';
    }
    if (highs.length > 0) {
      plan += '### High (fix in Foundation phase)\n';
      for (const f of highs.slice(0, 10)) {
        plan += `- ${f.message}`;
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
      '(40% \u2192 60% \u2192 80%).',
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
