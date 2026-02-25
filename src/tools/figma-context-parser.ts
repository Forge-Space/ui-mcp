import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getFile, getFileNodes } from '../lib/figma-client.js';
import { extractTokensFromFigmaNode, mapTokensToTailwind, tokensToDesignContext } from '../lib/tailwind-mapper.js';
import { designContextStore } from '@forgespace/siza-gen';

const inputSchema = {
  file_key: z.string().describe('Figma file key (from the URL: figma.com/file/<file_key>/...)'),
  node_ids: z.array(z.string()).optional().describe('Specific node IDs to parse. If omitted, parses the entire file.'),
};

export function registerFigmaContextParser(server: McpServer): void {
  server.tool(
    'figma_context_parser',
    'Read Figma file nodes, extract design tokens, and map them to Tailwind CSS utilities. Updates the shared design context.',
    inputSchema,
    async ({ file_key, node_ids }) => {
      try {
        let nodes;

        if (node_ids && node_ids.length > 0) {
          const response = await getFileNodes(file_key, node_ids);
          nodes = Object.values(response.nodes).map((n) => n.document);
        } else {
          const file = await getFile(file_key);
          nodes = [file.document];
        }

        // Extract tokens from all nodes
        const allTokens = nodes.flatMap((node) => extractTokensFromFigmaNode(node));

        // Map to Tailwind
        const tailwindMappings = mapTokensToTailwind(allTokens);

        // Update design context
        const contextPatch = tokensToDesignContext(allTokens);
        designContextStore.update(contextPatch);

        // Extract component props info
        const componentProps = nodes
          .filter((n) => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET')
          .map((n) => ({
            name: n.name,
            type: n.type,
            id: n.id,
            childCount: n.children?.length ?? 0,
          }));

        const summary = [
          `Parsed Figma file: ${file_key}`,
          `Nodes analyzed: ${nodes.length}`,
          `Tokens extracted: ${allTokens.length}`,
          `Tailwind mappings: ${tailwindMappings.length}`,
          `Components found: ${componentProps.length}`,
          '',
          'Token categories:',
          `  Colors: ${allTokens.filter((t) => t.category === 'color').length}`,
          `  Typography: ${allTokens.filter((t) => t.category === 'typography').length}`,
          `  Spacing: ${allTokens.filter((t) => t.category === 'spacing').length}`,
          `  Border radius: ${allTokens.filter((t) => t.category === 'borderRadius').length}`,
        ].join('\n');

        return {
          content: [
            { type: 'text', text: summary },
            {
              type: 'text',
              text: JSON.stringify(
                {
                  designTokens: allTokens,
                  tailwindMapping: tailwindMappings,
                  componentProps,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error parsing Figma file: ${String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
