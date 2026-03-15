import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockAssessProject = jest.fn();
const mockDetectStack = jest.fn();
const mockAnalyzeMigration = jest.fn();

jest.unstable_mockModule('forge-ai-init', () => ({
  assessProject: mockAssessProject,
  detectStack: mockDetectStack,
  analyzeMigration: mockAnalyzeMigration,
}));

const { buildForgeMigrateResponse, registerForgeMigrate } = await import('../../tools/forge-migrate.js');

describe('forge_migrate tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDetectStack.mockReturnValue({ language: 'javascript', framework: 'express' });
    mockAssessProject.mockReturnValue({
      overallScore: 55,
      overallGrade: 'D',
      migrationReadiness: 'Ready with effort',
      categories: [
        { category: 'Dependencies', score: 60, grade: 'D' },
        { category: 'Security', score: 50, grade: 'F' },
      ],
    });
  });

  it('returns full migration plan', () => {
    mockAnalyzeMigration.mockReturnValue({
      strategy: { name: 'Strangler Fig', description: 'Gradually replace modules' },
      estimatedEffort: '3-6 months',
      phases: [
        {
          name: 'Phase 1: Foundation',
          description: 'Set up TypeScript and testing',
          tasks: ['Add tsconfig.json', 'Install Jest'],
          gate: 'All new files in TypeScript',
        },
      ],
      dependencyRisks: [
        {
          name: 'lodash',
          severity: 'medium',
          issue: 'Full bundle imported',
          recommendation: 'Use lodash-es or individual imports',
        },
      ],
      boundaries: [
        {
          module: 'auth',
          type: 'service',
          complexity: 'high',
          reason: 'Tightly coupled to session store',
        },
      ],
      typingPlan: [
        {
          file: 'src/api/routes.js',
          priority: 'high',
          reason: 'Entry point with most consumers',
        },
      ],
    });

    const result = buildForgeMigrateResponse({
      directory: '/tmp/legacy-app',
      max_files: 500,
    });

    expect(result.content).toHaveLength(1);
    const text = result.content[0].text;
    expect(text).toContain('Migration Plan');
    expect(text).toContain('55/100');
    expect(text).toContain('Strangler Fig');
    expect(text).toContain('Gradually replace modules');
    expect(text).toContain('3-6 months');
    expect(text).toContain('Phase 1: Foundation');
    expect(text).toContain('Add tsconfig.json');
    expect(text).toContain('Quality Gate');
    expect(text).toContain('lodash');
    expect(text).toContain('auth');
    expect(text).toContain('src/api/routes.js');
  });

  it('shows health categories with scores', () => {
    mockAnalyzeMigration.mockReturnValue({
      strategy: { name: 'Big Bang', description: 'Full rewrite' },
      estimatedEffort: '6-12 months',
      phases: [],
      dependencyRisks: [],
      boundaries: [],
      typingPlan: [],
    });

    const result = buildForgeMigrateResponse({
      directory: '/tmp/project',
      max_files: 500,
    });

    const text = result.content[0].text;
    expect(text).toContain('Dependencies');
    expect(text).toContain('60/100');
    expect(text).toContain('Security');
    expect(text).toContain('50/100');
  });

  it('omits empty sections', () => {
    mockAnalyzeMigration.mockReturnValue({
      strategy: { name: 'Incremental', description: 'Step by step' },
      estimatedEffort: '1-3 months',
      phases: [],
      dependencyRisks: [],
      boundaries: [],
      typingPlan: [],
    });

    const result = buildForgeMigrateResponse({
      directory: '/tmp/clean-project',
      max_files: 500,
    });

    const text = result.content[0].text;
    expect(text).not.toContain('Dependency Risks');
    expect(text).not.toContain('Strangler Boundaries');
    expect(text).not.toContain('TypeScript Migration');
  });

  it('limits boundaries and typing plan to 10 items', () => {
    const boundaries = Array.from({ length: 15 }, (_, i) => ({
      module: `module-${i}`,
      type: 'service',
      complexity: 'medium',
      reason: `Reason ${i}`,
    }));
    const typingPlan = Array.from({ length: 15 }, (_, i) => ({
      file: `src/file-${i}.js`,
      priority: 'medium',
      reason: `Typing reason ${i}`,
    }));

    mockAnalyzeMigration.mockReturnValue({
      strategy: { name: 'Strangler Fig', description: 'Gradual' },
      estimatedEffort: '6 months',
      phases: [],
      dependencyRisks: [],
      boundaries,
      typingPlan,
    });

    const result = buildForgeMigrateResponse({
      directory: '/tmp/big-project',
      max_files: 500,
    });

    const text = result.content[0].text;
    expect(text).toContain('module-9');
    expect(text).not.toContain('module-10');
    expect(text).toContain('file-9');
    expect(text).not.toContain('file-10');
  });

  it('handles errors gracefully', () => {
    mockDetectStack.mockImplementation(() => {
      throw new Error('Cannot read directory');
    });

    const result = buildForgeMigrateResponse({
      directory: '/nonexistent',
      max_files: 500,
    });

    expect(result.content[0].text).toContain('Migration analysis failed');
    expect(result.content[0].text).toContain('Cannot read directory');
  });

  it('registers forge_migrate tool on MCP server', async () => {
    const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');
    const server = new McpServer({ name: 'test', version: '0.0.1' });
    expect(() => registerForgeMigrate(server)).not.toThrow();
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools['forge_migrate']).toBeDefined();
  });
});
