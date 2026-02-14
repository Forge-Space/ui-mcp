import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { postVariables } from '../lib/figma-client.js';
import type { IFigmaVariable } from '../lib/types.js';

const inputSchema = {
  file_key: z.string().describe('Figma file key to push variables to'),
  variables: z
    .array(
      z.object({
        name: z.string().describe('Variable name (e.g., "colors/primary", "spacing/md")'),
        type: z.enum(['COLOR', 'FLOAT', 'STRING']).describe('Variable type'),
        value: z.union([z.string(), z.number()]).describe('Variable value (hex color string, number, or string)'),
        collection: z.string().optional().describe('Variable collection name'),
      })
    )
    .describe('Array of variables to create or update'),
};

export function registerFigmaPushVariables(server: McpServer): void {
  server.tool(
    'figma_push_variables',
    'Write design tokens back to Figma as Variables via the Figma REST API. Creates or updates variable collections.',
    inputSchema,
    async ({ file_key, variables }) => {
      // Early return if no variables provided
      if (!variables || variables.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'No variables provided. Please provide at least one variable to push to Figma.',
            },
          ],
          isError: true,
        };
      }

      try {
        const collectionName = variables[0]?.collection ?? 'UIForge Tokens';

        const result = await postVariables(file_key, variables as IFigmaVariable[], collectionName);

        const summary = [
          `Pushed ${variables.length} variable(s) to Figma file: ${file_key}`,
          `Created: ${result.created}`,
          `Updated: ${result.updated}`,
          `Collections: ${result.collections.join(', ')}`,
          '',
          'Variables:',
          ...variables.map((v) => `  - ${v.name} (${v.type}): ${v.value}`),
        ].join('\n');

        return {
          content: [
            { type: 'text', text: summary },
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error pushing variables to Figma: ${String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
