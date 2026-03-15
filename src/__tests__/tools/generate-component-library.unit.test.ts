import { loadConfig } from '@forgespace/siza-gen';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  generateComponentLibraryHandler,
  getAvailableComponentsHandler,
  getAvailableLibrariesHandler,
  registerGenerateComponentLibrary,
  type GenerateComponentLibraryInput,
} from '../../tools/generate-component-library.js';

describe('generate-component-library tool', () => {
  beforeAll(() => {
    loadConfig();
  });

  const baseInput: GenerateComponentLibraryInput = {
    componentType: 'button',
    library: 'shadcn',
    framework: 'react',
    includeTests: false,
    includeStories: false,
  };

  describe('generateComponentLibraryHandler', () => {
    it('generates a shadcn button component', async () => {
      const result = await generateComponentLibraryHandler(baseInput);

      expect(result.component).toBeDefined();
      expect(result.component.length).toBeGreaterThan(0);
      expect(result.dependencies).toBeDefined();
      expect(result.examples).toBeDefined();
      expect(result.setupInstructions).toBeDefined();
    });

    it('generates a radix button component', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'radix',
      });

      expect(result.component).toBeDefined();
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('generates a headlessui dialog component', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        componentType: 'dialog',
        library: 'headlessui',
      });

      expect(result.component).toBeDefined();
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('generates a material button component', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'material',
      });

      expect(result.component).toBeDefined();
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('filters out test files when includeTests is false', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        includeTests: false,
      });

      const testFiles = result.component.filter((f) => f.path.includes('.test.'));
      expect(testFiles).toHaveLength(0);
    });

    it('filters out story files when includeStories is false', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        includeStories: false,
      });

      const storyFiles = result.component.filter((f) => f.path.includes('.stories.'));
      expect(storyFiles).toHaveLength(0);
    });

    it('applies outputPath prefix when provided', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        outputPath: 'my-project/src/components',
      });

      result.component.forEach((file) => {
        expect(file.path).toMatch(/^my-project\/src\/components\//);
      });
    });

    it('handles none library gracefully', async () => {
      await expect(generateComponentLibraryHandler({ ...baseInput, library: 'none' })).resolves.toBeDefined();
    });

    it('throws for unknown library', async () => {
      await expect(
        generateComponentLibraryHandler({
          ...baseInput,
          library: 'unknown' as GenerateComponentLibraryInput['library'],
        })
      ).rejects.toThrow();
    });
  });

  describe('getAvailableComponentsHandler', () => {
    it('returns available shadcn components', async () => {
      const result = await getAvailableComponentsHandler('shadcn');

      expect(result.components).toBeDefined();
      expect(result.library).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it('returns available radix components', async () => {
      const result = await getAvailableComponentsHandler('radix');
      expect(result.components).toBeDefined();
    });

    it('returns available headlessui components', async () => {
      const result = await getAvailableComponentsHandler('headlessui');
      expect(result.components).toBeDefined();
    });

    it('returns available material components', async () => {
      const result = await getAvailableComponentsHandler('material');
      expect(result.components).toBeDefined();
    });
  });

  describe('getAvailableLibrariesHandler', () => {
    it('returns all available libraries', async () => {
      const result = await getAvailableLibrariesHandler();

      expect(result.libraries).toBeDefined();
      expect(result.libraries.length).toBeGreaterThan(0);
    });

    it('each library has required fields', async () => {
      const result = await getAvailableLibrariesHandler();

      result.libraries.forEach((lib) => {
        expect(lib).toHaveProperty('id');
        expect(lib).toHaveProperty('name');
        expect(lib).toHaveProperty('description');
        expect(lib).toHaveProperty('componentCount');
        expect(lib).toHaveProperty('patternCount');
      });
    });

    it('includes shadcn, radix, headlessui, material libraries', async () => {
      const result = await getAvailableLibrariesHandler();
      const ids = result.libraries.map((l) => l.id);

      expect(ids).toContain('shadcn');
      expect(ids).toContain('radix');
      expect(ids).toContain('headlessui');
      expect(ids).toContain('material');
    });
  });

  describe('theme and coverage branches', () => {
    it('applies dark theme to radix button', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'radix',
        theme: 'dark',
      });
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('applies light theme to shadcn card', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'shadcn',
        componentType: 'card',
        theme: 'light',
      });
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('applies blue theme to material button', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'material',
        componentType: 'button',
        theme: 'blue',
      });
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('applies green theme', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'radix',
        theme: 'green',
      });
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('ignores unknown theme gracefully', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'radix',
        theme: 'unknown-theme-xyz',
      });
      expect(result.component.length).toBeGreaterThan(0);
    });

    it('generates nextjs-specific setup instructions', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'radix',
        framework: 'nextjs',
      });
      const allInstructions = result.setupInstructions.join(' ');
      expect(allInstructions).toContain('client');
    });

    it('generates card usage examples for shadcn', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'shadcn',
        componentType: 'card',
      });
      expect(result.examples.length).toBeGreaterThan(0);
    });

    it('generates input usage examples for shadcn', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'shadcn',
        componentType: 'input',
      });
      expect(result.examples.length).toBeGreaterThan(0);
    });

    it('includes includeTests files when enabled', async () => {
      const result = await generateComponentLibraryHandler({
        ...baseInput,
        library: 'radix',
        includeTests: true,
        includeStories: true,
      });
      expect(Array.isArray(result.component)).toBe(true);
    });
  });

  describe('registerGenerateComponentLibrary', () => {
    it('registers 3 tools on MCP server', () => {
      const server = new McpServer({ name: 'test', version: '0.0.1' });
      expect(() => registerGenerateComponentLibrary(server)).not.toThrow();
      const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
      expect(tools['generate_component_library']).toBeDefined();
      expect(tools['get_available_components']).toBeDefined();
      expect(tools['get_available_libraries']).toBeDefined();
    });
  });
});
