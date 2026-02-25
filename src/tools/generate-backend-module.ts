import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { searchBackendSnippets, initializeBackendRegistry } from '@forgespace/siza-gen';

export function registerGenerateBackendModule(server: McpServer): void {
  server.tool(
    'generate_backend_module',
    'Generate a complete backend feature module with routes, service layer, repository, types, and middleware following clean architecture patterns.',
    {
      module_name: z.string().describe('Name of the module (e.g., users, billing)'),
      operations: z.array(z.string()).describe('CRUD operations: list, create, update, delete, get'),
      framework: z.enum(['express', 'nextjs']).default('nextjs').describe('Target framework'),
      patterns: z
        .array(z.string())
        .optional()
        .describe('Architecture patterns: clean-architecture, repository, service-layer'),
      middleware: z.array(z.string()).optional().describe('Middleware: auth, validation, rate-limiting, caching'),
    },
    async ({ module_name, operations, framework, patterns, middleware }) => {
      try {
        await initializeBackendRegistry();

        const modulePascal = module_name.charAt(0).toUpperCase() + module_name.slice(1);
        const moduleKebab = module_name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

        const routeSnippets = searchBackendSnippets({
          category: 'api-route',
          tags: operations,
        });

        const archSnippets = (patterns ?? ['clean-architecture']).flatMap((p) =>
          searchBackendSnippets({
            category: 'architecture',
            tags: [p],
          })
        );

        const mwSnippets = (middleware ?? []).flatMap((m) =>
          searchBackendSnippets({
            category: 'middleware',
            tags: [m],
          })
        );

        const basePath = framework === 'nextjs' ? `src/app/api/${moduleKebab}` : `src/modules/${moduleKebab}`;

        const files: Array<{ path: string; code: string }> = [];

        const typesCode = [
          `export interface I${modulePascal} {`,
          '  id: string;',
          '  createdAt: Date;',
          '  updatedAt: Date;',
          '}',
          '',
          `export interface ICreate${modulePascal}Input {`,
          `  // Define creation fields for ${modulePascal}`,
          '}',
          '',
          `export interface IUpdate${modulePascal}Input {`,
          `  // Define update fields for ${modulePascal}`,
          '}',
        ].join('\n');
        files.push({ path: `${basePath}/types.ts`, code: typesCode });

        if (archSnippets.length > 0) {
          const serviceCode = archSnippets
            .map((s) => s.typescript.replace(/Resource/g, modulePascal).replace(/resource/g, module_name.toLowerCase()))
            .join('\n\n');
          files.push({
            path: `${basePath}/service.ts`,
            code: serviceCode,
          });
        }

        if (routeSnippets.length > 0) {
          const routeCode = routeSnippets
            .map((s) => s.typescript.replace(/Resource/g, modulePascal).replace(/resource/g, module_name.toLowerCase()))
            .join('\n\n');
          files.push({
            path: `${basePath}/route.ts`,
            code: routeCode,
          });
        }

        if (mwSnippets.length > 0) {
          const mwCode = mwSnippets.map((s) => s.typescript).join('\n\n');
          files.push({
            path: `${basePath}/middleware.ts`,
            code: mwCode,
          });
        }

        const allDeps = new Set<string>();
        for (const s of [...routeSnippets, ...archSnippets, ...mwSnippets]) {
          for (const dep of Object.keys(s.dependencies)) {
            allDeps.add(dep);
          }
        }

        const output = [
          `# Generated Module: ${modulePascal}`,
          `**Framework**: ${framework}`,
          `**Operations**: ${operations.join(', ')}`,
          `**Patterns**: ${(patterns ?? ['clean-architecture']).join(', ')}`,
          '',
          '## File Tree',
          ...files.map((f) => `- \`${f.path}\``),
          '',
          ...files.map((f) => `### \`${f.path}\`\n\`\`\`typescript\n${f.code}\n\`\`\``),
          '',
          '## Dependencies',
          `\`\`\`json\n${JSON.stringify(Object.fromEntries(Array.from(allDeps).map((d) => [d, 'latest'])), null, 2)}\n\`\`\``,
          '',
          `Generated ${files.length} files from ${routeSnippets.length} route, ${archSnippets.length} architecture, and ${mwSnippets.length} middleware patterns.`,
        ].join('\n');

        return {
          content: [{ type: 'text' as const, text: output }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Failed to generate backend module: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
