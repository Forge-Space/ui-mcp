import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockAssessProject = jest.fn();
const mockDetectStack = jest.fn();

jest.unstable_mockModule('forge-ai-init', () => ({
  assessProject: mockAssessProject,
  detectStack: mockDetectStack,
}));

const { buildForgeAssessResponse } = await import('../../tools/forge-assess.js');

describe('forge_assess tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDetectStack.mockReturnValue({ language: 'typescript', framework: 'react' });
  });

  it('returns formatted health assessment', () => {
    mockAssessProject.mockReturnValue({
      overallScore: 72,
      overallGrade: 'C',
      migrationReadiness: 'Ready with effort',
      migrationStrategy: 'Incremental modernization',
      filesScanned: 150,
      categories: [
        { category: 'Dependencies', score: 80, grade: 'B', critical: 0, high: 2 },
        { category: 'Architecture', score: 65, grade: 'D', critical: 1, high: 3 },
      ],
      findings: [],
      summary: 'Project needs architectural improvements.',
    });

    const result = buildForgeAssessResponse({
      directory: '/tmp/project',
      max_files: 500,
    });

    expect(result.content).toHaveLength(1);
    const text = result.content[0].text;
    expect(text).toContain('Health Assessment');
    expect(text).toContain('72/100');
    expect(text).toContain('Ready with effort');
    expect(text).toContain('Incremental modernization');
    expect(text).toContain('150');
    expect(text).toContain('Dependencies');
    expect(text).toContain('Architecture');
  });

  it('shows critical issues when present', () => {
    mockAssessProject.mockReturnValue({
      overallScore: 45,
      overallGrade: 'F',
      migrationReadiness: 'Not ready',
      migrationStrategy: 'Rewrite',
      filesScanned: 30,
      categories: [],
      findings: [
        {
          severity: 'critical',
          title: 'No tests',
          detail: 'Zero test coverage detected',
          file: 'src/app.ts',
          line: 1,
        },
      ],
      summary: 'Critical issues found.',
    });

    const result = buildForgeAssessResponse({
      directory: '/tmp/legacy',
      max_files: 500,
    });

    const text = result.content[0].text;
    expect(text).toContain('Critical Issues');
    expect(text).toContain('No tests');
    expect(text).toContain('src/app.ts');
  });

  it('shows high-priority issues', () => {
    mockAssessProject.mockReturnValue({
      overallScore: 60,
      overallGrade: 'D',
      migrationReadiness: 'Ready with effort',
      migrationStrategy: 'Strangler fig',
      filesScanned: 50,
      categories: [],
      findings: [
        {
          severity: 'high',
          title: 'Outdated deps',
          detail: '15 packages behind major versions',
          file: 'package.json',
        },
      ],
      summary: 'Dependencies need updating.',
    });

    const result = buildForgeAssessResponse({
      directory: '/tmp/project',
      max_files: 500,
    });

    const text = result.content[0].text;
    expect(text).toContain('High-Priority Issues');
    expect(text).toContain('Outdated deps');
  });

  it('handles errors gracefully', () => {
    mockDetectStack.mockImplementation(() => {
      throw new Error('Not a project directory');
    });

    const result = buildForgeAssessResponse({
      directory: '/nonexistent',
      max_files: 500,
    });

    expect(result.content[0].text).toContain('Assessment failed');
    expect(result.content[0].text).toContain('Not a project directory');
  });
});
