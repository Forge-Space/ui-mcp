import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { IGeneratedFile } from '../lib/types.js';
import { designContextStore } from '../lib/design-context.js';
import { GeneratorFactory } from '../lib/generators/generator-factory.js';

const inputSchema = {
  framework: z.enum(['react', 'nextjs', 'vue', 'angular', 'html', 'svelte']).describe('Frontend framework to scaffold'),
  styling: z.enum(['tailwindcss']).default('tailwindcss').describe('Styling framework'),
  architecture: z.enum(['flat', 'feature-based', 'atomic']).default('flat').describe('Project architecture pattern'),
  state_management: z
    .enum(['useState', 'zustand', 'pinia', 'signals', 'none'])
    .default('none')
    .describe('State management solution'),
  project_name: z.string().min(1).max(100).describe('Project name (used for directory and package.json)'),
};

export function registerScaffoldFullApplication(server: McpServer): void {
  server.tool(
    'scaffold_full_application',
    'Generate full project boilerplate for React, Next.js, Vue, Angular, Svelte, or HTML with Tailwind CSS and optional state management',
    inputSchema,
    ({ framework, styling: _styling, architecture, state_management, project_name }) => {
      const ctx = designContextStore.get();

      // Map state management to framework-specific options
      const mappedStateManagement =
        framework === 'svelte' ? (state_management === 'useState' ? 'stores' : 'none') : state_management;

      // Create generator and generate project
      const generator = GeneratorFactory.getInstance().createGenerator(framework);
      const files = generator.generateProject(project_name, architecture, mappedStateManagement, ctx);

      const summary = [
        `Scaffolded ${framework} project "${project_name}"`,
        `Files generated: ${files.length}`,
        `Architecture: ${architecture}`,
        `State management: ${state_management}`,
        '',
        'Files:',
        ...files.map((f: IGeneratedFile) => `  ${f.path}`),
      ].join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          {
            type: 'text',
            text: JSON.stringify({ files }, null, 2),
          },
        ],
      };
    }
  );
}
