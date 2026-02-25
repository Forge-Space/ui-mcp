import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { initializeBackendRegistry, searchBackendSnippets, type BackendCategory } from '@forgespace/siza-gen';

export function registerGenerateApiRoute(server: McpServer): void {
  server.tool(
    'generate_api_route',
    'Generate a production-ready API route with validation, authentication, and error handling based on best-practice backend patterns.',
    {
      route_type: z
        .enum(['rest-crud', 'rest-advanced', 'auth', 'webhook', 'file', 'realtime'])
        .describe('Type of API route to generate'),
      resource_name: z.string().describe('Name of the resource (e.g., users, products)'),
      framework: z.enum(['express', 'nextjs']).default('nextjs').describe('Target framework'),
      features: z
        .array(z.string())
        .optional()
        .describe('Additional features: validation, auth, rate-limiting, caching'),
    },
    async ({ route_type, resource_name, framework, features }) => {
      try {
        await initializeBackendRegistry();

        const categoryMap: Record<string, BackendCategory> = {
          'rest-crud': 'api-route',
          'rest-advanced': 'api-route',
          auth: 'api-route',
          webhook: 'api-route',
          file: 'api-route',
          realtime: 'api-route',
        };

        const routeSnippets = searchBackendSnippets({
          category: categoryMap[route_type],
          tags: [route_type],
        });

        const middlewareSnippets = (features ?? []).flatMap((feat) =>
          searchBackendSnippets({
            category: 'middleware',
            tags: [feat],
          })
        );

        const resourcePascal = resource_name.charAt(0).toUpperCase() + resource_name.slice(1);
        const resourceKebab = resource_name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

        const routeCode = routeSnippets
          .map((s) =>
            s.typescript.replace(/Resource/g, resourcePascal).replace(/resource/g, resource_name.toLowerCase())
          )
          .join('\n\n');

        const middlewareCode = middlewareSnippets.map((s) => s.typescript).join('\n\n');

        const routePath =
          framework === 'nextjs' ? `src/app/api/${resourceKebab}/route.ts` : `src/routes/${resourceKebab}.ts`;

        const allDeps = new Set<string>();
        for (const s of [...routeSnippets, ...middlewareSnippets]) {
          for (const dep of Object.keys(s.dependencies)) {
            allDeps.add(dep);
          }
        }

        const output = [
          `# Generated API Route: ${resource_name}`,
          `**Framework**: ${framework}`,
          `**Type**: ${route_type}`,
          `**Path**: \`${routePath}\``,
          '',
          '## Route Code',
          '```typescript',
          routeCode || '// No matching route patterns found',
          '```',
          '',
          middlewareCode ? ['## Middleware', '```typescript', middlewareCode, '```'].join('\n') : '',
          '',
          '## Dependencies',
          `\`\`\`json\n${JSON.stringify(Object.fromEntries(Array.from(allDeps).map((d) => [d, 'latest'])), null, 2)}\n\`\`\``,
          '',
          `Found ${routeSnippets.length} route pattern(s) and ${middlewareSnippets.length} middleware pattern(s).`,
        ]
          .filter(Boolean)
          .join('\n');

        return {
          content: [{ type: 'text' as const, text: output }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Failed to generate API route: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
