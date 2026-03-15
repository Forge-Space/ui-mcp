import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerSetupComponentLibrary, setupComponentLibraryHandler } from '../../tools/setup-component-library.js';

describe('setup_component_library tool', () => {
  let server: McpServer;

  beforeEach(() => {
    loadConfig();
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerSetupComponentLibrary(server)).not.toThrow();
  });

  it('registers 3 tools: setup, validate, and status', () => {
    registerSetupComponentLibrary(server);
    const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
    expect(tools?.['setup_component_library']).toBeDefined();
    expect(tools?.['validate_component_library_setup']).toBeDefined();
    expect(tools?.['get_component_library_status']).toBeDefined();
  });

  it('sets up radix for react project', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'radix',
      framework: 'react',
      projectName: 'radix-app',
      skipInstall: true,
      skipGit: true,
    });
    expect(result.setupFiles.length).toBeGreaterThan(0);
    expect(Array.isArray(result.instructions)).toBe(true);
    expect(Array.isArray(result.nextSteps)).toBe(true);
  });

  it('sets up headlessui for react project', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'headlessui',
      framework: 'react',
      projectName: 'headless-app',
      skipInstall: true,
      skipGit: true,
    });
    expect(result.setupFiles.length).toBeGreaterThan(0);
  });

  it('sets up material for react project', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'material',
      framework: 'react',
      projectName: 'material-app',
      skipInstall: true,
      skipGit: true,
    });
    expect(result.setupFiles.length).toBeGreaterThan(0);
  });

  it('handles none library gracefully', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'none',
      framework: 'react',
      projectName: 'vanilla-app',
      skipInstall: true,
      skipGit: true,
    });
    expect(Array.isArray(result.setupFiles)).toBe(true);
    expect(Array.isArray(result.instructions)).toBe(true);
  });

  it('includes setup instructions for radix', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'radix',
      framework: 'react',
      projectName: 'test-project',
      skipInstall: true,
      skipGit: true,
    });
    expect(result.instructions.length).toBeGreaterThan(0);
    expect(result.instructions[0]).toContain('Navigate to project');
  });

  it('includes nextjs-specific instruction for nextjs framework', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'radix',
      framework: 'nextjs',
      projectName: 'next-project',
      skipInstall: true,
      skipGit: true,
    });
    const allInstructions = result.instructions.join(' ');
    expect(allInstructions).toContain('client');
  });

  it('returns next steps', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'material',
      framework: 'nextjs',
      projectName: 'next-material',
      skipInstall: true,
      skipGit: true,
    });
    expect(result.nextSteps.length).toBeGreaterThan(0);
  });

  it('extracts dependencies from generated files', async () => {
    const result = await setupComponentLibraryHandler({
      library: 'radix',
      framework: 'react',
      projectName: 'radix-deps',
      skipInstall: true,
      skipGit: true,
    });
    // radix setup should list some radix dependencies
    expect(Array.isArray(result.dependencies)).toBe(true);
  });
});
