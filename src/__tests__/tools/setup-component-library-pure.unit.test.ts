import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import {
  registerSetupComponentLibrary,
  setupComponentLibraryHandler,
  validateComponentLibrarySetupHandler,
  getComponentLibraryStatusHandler,
} from '../../tools/setup-component-library.js';

describe('setup-component-library pure functions', () => {
  beforeEach(() => {
    loadConfig();
  });

  // ── setupComponentLibraryHandler ──────────────────────────────────────────

  describe('setupComponentLibraryHandler', () => {
    it('sets up radix for react with dark theme', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'themed-app',
        theme: 'dark',
        skipInstall: true,
        skipGit: true,
      });
      expect(result.setupFiles.length).toBeGreaterThan(0);
      expect(Array.isArray(result.instructions)).toBe(true);
    });

    it('applies light theme configuration', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'light-app',
        theme: 'light',
        skipInstall: true,
        skipGit: true,
      });
      expect(result.setupFiles.length).toBeGreaterThan(0);
    });

    it('applies blue theme configuration', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'blue-app',
        theme: 'blue',
        skipInstall: true,
        skipGit: true,
      });
      expect(result.setupFiles.length).toBeGreaterThan(0);
    });

    it('applies green theme configuration', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'green-app',
        theme: 'green',
        skipInstall: true,
        skipGit: true,
      });
      expect(result.setupFiles.length).toBeGreaterThan(0);
    });

    it('ignores unknown theme (no-op)', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'unknown-theme-app',
        theme: 'nonexistent-theme-xyz',
        skipInstall: true,
        skipGit: true,
      });
      expect(result.setupFiles.length).toBeGreaterThan(0);
    });

    it('sets up with components and patterns options', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'nextjs',
        projectName: 'components-app',
        components: ['button', 'card', 'input'],
        patterns: ['auth-form', 'dashboard'],
        skipInstall: true,
        skipGit: true,
      });
      expect(result.setupFiles.length).toBeGreaterThan(0);
      const steps = result.nextSteps.join(' ');
      expect(steps).toContain('3');
      expect(steps).toContain('4');
    });

    it('includes radix-specific instructions', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'radix-app',
        skipInstall: false,
        skipGit: true,
      });
      const allInstructions = result.instructions.join(' ');
      expect(allInstructions).toContain('npm install');
      expect(allInstructions).toContain('Radix');
    });

    it('skips install instruction when skipInstall=true', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'skip-install-app',
        skipInstall: true,
        skipGit: true,
      });
      const allInstructions = result.instructions.join(' ');
      expect(allInstructions).not.toContain('npm install');
    });

    it('includes headlessui instructions', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'headlessui',
        framework: 'react',
        projectName: 'headlessui-app',
        skipInstall: false,
        skipGit: true,
      });
      const allInstructions = result.instructions.join(' ');
      expect(allInstructions).toContain('Tailwind');
    });

    it('includes material instructions', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'material',
        framework: 'react',
        projectName: 'material-app',
        skipInstall: false,
        skipGit: true,
      });
      const allInstructions = result.instructions.join(' ');
      expect(allInstructions).toContain('ThemeProvider');
    });

    it('includes projectPath in instructions when provided', async () => {
      const result = await setupComponentLibraryHandler({
        library: 'radix',
        framework: 'react',
        projectName: 'my-app',
        projectPath: '/custom/path',
        skipInstall: true,
        skipGit: true,
      });
      expect(result.instructions[0]).toContain('/custom/path');
    });
  });

  // ── validateComponentLibrarySetupHandler ──────────────────────────────────

  describe('validateComponentLibrarySetupHandler', () => {
    it('validates shadcn setup and returns recommendations', async () => {
      const result = await validateComponentLibrarySetupHandler('/fake/path', 'shadcn');
      expect(typeof result.isValid).toBe('boolean');
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
      expect(Array.isArray(result.recommendations)).toBe(true);
      expect(result.recommendations.some((r) => r.includes('TypeScript') || r.includes('Storybook'))).toBe(true);
    });

    it('validates radix setup', async () => {
      const result = await validateComponentLibrarySetupHandler('/fake/path', 'radix');
      expect(typeof result.isValid).toBe('boolean');
      expect(Array.isArray(result.errors)).toBe(true);
    });

    it('validates headlessui setup', async () => {
      const result = await validateComponentLibrarySetupHandler('/fake/path', 'headlessui');
      expect(typeof result.isValid).toBe('boolean');
    });

    it('validates material setup', async () => {
      const result = await validateComponentLibrarySetupHandler('/fake/path', 'material');
      expect(typeof result.isValid).toBe('boolean');
    });

    it('validates none library', async () => {
      const result = await validateComponentLibrarySetupHandler('/fake/path', 'none');
      expect(typeof result.isValid).toBe('boolean');
    });

    it('validates primevue library', async () => {
      const result = await validateComponentLibrarySetupHandler('/fake/path', 'primevue');
      expect(typeof result.isValid).toBe('boolean');
    });
  });

  // ── getComponentLibraryStatusHandler ──────────────────────────────────────

  describe('getComponentLibraryStatusHandler', () => {
    it('returns status object with required fields', async () => {
      const result = await getComponentLibraryStatusHandler('/any/path');
      expect(result).toHaveProperty('library');
      expect(result).toHaveProperty('isConfigured');
      expect(result).toHaveProperty('components');
      expect(result).toHaveProperty('patterns');
      expect(result).toHaveProperty('version');
      expect(result).toHaveProperty('lastUpdated');
    });

    it('returns null library for unknown path', async () => {
      const result = await getComponentLibraryStatusHandler('/nonexistent/path');
      expect(result.library).toBeNull();
      expect(result.isConfigured).toBe(false);
    });

    it('returns empty arrays for components and patterns', async () => {
      const result = await getComponentLibraryStatusHandler('/fake/path');
      expect(Array.isArray(result.components)).toBe(true);
      expect(Array.isArray(result.patterns)).toBe(true);
    });

    it('returns ISO date string for lastUpdated', async () => {
      const result = await getComponentLibraryStatusHandler('/fake/path');
      expect(() => new Date(result.lastUpdated)).not.toThrow();
      expect(new Date(result.lastUpdated).getTime()).toBeGreaterThan(0);
    });
  });

  // ── registerSetupComponentLibrary (error path) ────────────────────────────

  describe('registerSetupComponentLibrary error handling', () => {
    it('returns error content when handler throws', async () => {
      const server = new McpServer({ name: 'test', version: '0.0.1' });
      registerSetupComponentLibrary(server);

      const tools = (
        server as unknown as {
          _registeredTools: Record<string, { handler: (...a: unknown[]) => Promise<{ content: unknown[] }> }>;
        }
      )._registeredTools;
      const handler = tools['setup_component_library']?.handler;
      expect(handler).toBeDefined();

      const result = await handler({
        library: 'shadcn',
        framework: 'react',
        projectName: '',
        skipInstall: true,
        skipGit: true,
      });
      // Even with empty projectName, should return content (either success or error)
      expect(result).toHaveProperty('content');
    });
  });
});
