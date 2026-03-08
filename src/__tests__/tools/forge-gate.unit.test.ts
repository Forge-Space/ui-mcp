import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockRunGate = jest.fn();

jest.unstable_mockModule('forge-ai-init', () => ({
  runGate: mockRunGate,
}));

const { buildForgeGateResponse } = await import('../../tools/forge-gate.js');

describe('forge_gate tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns passing gate result', () => {
    mockRunGate.mockReturnValue({
      passed: true,
      score: 85,
      grade: 'B',
      threshold: 60,
      phase: 'stabilization',
      violations: [],
      summary: 'All checks passed.',
    });

    const result = buildForgeGateResponse({ directory: '/tmp/project' });

    const text = result.content[0].text;
    expect(text).toContain('PASSED');
    expect(text).toContain('85/100');
    expect(text).toContain('Grade: B');
    expect(text).toContain('stabilization');
  });

  it('returns failing gate with blocking violations', () => {
    mockRunGate.mockReturnValue({
      passed: false,
      score: 45,
      grade: 'F',
      threshold: 60,
      phase: 'bootstrap',
      violations: [
        { rule: 'no-any', severity: 'high', count: 12, blocked: true },
        { rule: 'console-log', severity: 'low', count: 3, blocked: false },
      ],
      summary: 'Score below threshold.',
    });

    const result = buildForgeGateResponse({
      directory: '/tmp/project',
      threshold: 60,
    });

    const text = result.content[0].text;
    expect(text).toContain('FAILED');
    expect(text).toContain('45/100');
    expect(text).toContain('no-any');
    expect(text).not.toContain('console-log');
  });

  it('handles gate errors gracefully', () => {
    mockRunGate.mockImplementation(() => {
      throw new Error('Config parse error');
    });

    const result = buildForgeGateResponse({ directory: '/nonexistent' });

    expect(result.content[0].text).toContain('Gate failed');
    expect(result.content[0].text).toContain('Config parse error');
  });

  it('passes threshold and phase to runGate', () => {
    mockRunGate.mockReturnValue({
      passed: true,
      score: 90,
      grade: 'A',
      threshold: 75,
      phase: 'production',
      violations: [],
      summary: 'Excellent.',
    });

    buildForgeGateResponse({
      directory: '/tmp/project',
      threshold: 75,
      phase: 'production',
    });

    expect(mockRunGate).toHaveBeenCalledWith('/tmp/project', 'production', 75);
  });
});
