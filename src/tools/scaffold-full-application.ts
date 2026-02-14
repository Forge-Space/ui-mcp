import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { IGeneratedFile } from '../lib/types.js';
import { generateReactProject } from '../lib/templates/react.js';
import { generateNextjsProject } from '../lib/templates/nextjs.js';
import { generateVueProject } from '../lib/templates/vue.js';
import { generateAngularProject } from '../lib/templates/angular.js';

const inputSchema = {
  framework: z.enum(['react', 'nextjs', 'vue', 'angular']).describe('Frontend framework to scaffold'),
  styling: z.enum(['tailwindcss']).default('tailwindcss').describe('Styling framework'),
  architecture: z.enum(['flat', 'feature-based', 'atomic']).default('flat').describe('Project architecture pattern'),
  state_management: z.enum(['useState', 'zustand', 'pinia', 'signals', 'none']).default('none').describe('State management solution'),
  project_name: z.string().min(1).max(100).describe('Project name (used for directory and package.json)'),
};

export function registerScaffoldFullApplication(server: McpServer): void {
  server.tool(
    'scaffold_full_application',
    'Generate full project boilerplate for React, Next.js, Vue, or Angular with Tailwind CSS and optional state management',
    inputSchema,
    async ({ framework, styling: _styling, architecture, state_management, project_name }) => {
      let files: IGeneratedFile[];

      switch (framework) {
        case 'react':
          files = generateReactProject(project_name, architecture, state_management);
          break;
        case 'nextjs':
          files = generateNextjsProject(project_name, architecture, state_management);
          break;
        case 'vue':
          files = generateVueProject(project_name, architecture, state_management);
          break;
        case 'angular':
          files = generateAngularProject(project_name, architecture, state_management);
          break;
      }

      const summary = [
        `Scaffolded ${framework} project "${project_name}"`,
        `Files generated: ${files.length}`,
        `Architecture: ${architecture}`,
        `State management: ${state_management}`,
        '',
        'Files:',
        ...files.map((f) => `  ${f.path}`),
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
