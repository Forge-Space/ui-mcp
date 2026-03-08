import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { runGate, type GateResult } from 'forge-ai-init';

export const forgeGateInputSchema = {
  directory: z.string().min(1, 'directory is required').describe('Absolute path to the project directory'),
  threshold: z.number().int().min(0).max(100).optional().describe('Minimum score to pass (overrides .forgerc.json)'),
  phase: z.string().optional().describe('Governance phase: bootstrap, stabilization, production, or enterprise'),
};

export const forgeGateSchema = z.object(forgeGateInputSchema);
export type ForgeGateParams = z.infer<typeof forgeGateSchema>;

export function buildForgeGateResponse(params: ForgeGateParams): {
  content: Array<{ type: 'text'; text: string }>;
} {
  let result: GateResult;
  try {
    result = runGate(params.directory, params.phase, params.threshold);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: 'text' as const, text: `Gate failed: ${msg}` }],
    };
  }

  const status = result.passed ? 'PASSED' : 'FAILED';
  const icon = result.passed ? '✅' : '❌';

  const violations = result.violations
    .filter((v) => v.blocked)
    .map((v) => `| ${v.rule} | ${v.severity} | ${v.count} | ${v.blocked ? 'Yes' : 'No'} |`)
    .join('\n');

  const text = [
    `# ${icon} Quality Gate ${status}`,
    ``,
    `**Score**: ${result.score}/100 (Grade: ${result.grade})`,
    `**Threshold**: ${result.threshold}`,
    `**Phase**: ${result.phase}`,
    ``,
    result.summary,
    violations
      ? `\n## Blocking Violations\n| Rule | Severity | Count | Blocked |\n|------|----------|-------|---------|\n${violations}`
      : '',
  ].join('\n');

  return { content: [{ type: 'text' as const, text }] };
}

export function registerForgeGate(server: McpServer): void {
  server.tool(
    'forge_gate',
    'Run a quality gate check on a project. Returns pass/fail status, score, grade, and blocking violations. Configurable threshold and governance phase.',
    forgeGateInputSchema,
    (params) => buildForgeGateResponse(params)
  );
}
