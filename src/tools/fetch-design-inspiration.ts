import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { extractDesignFromUrl } from '../lib/design-extractor.js';
import { designContextStore } from '../lib/design-context.js';

const inputSchema = {
  url: z.string().url().describe('URL to extract design inspiration from'),
  extract_colors: z.boolean().default(true).describe('Extract color palette from the page'),
  extract_typography: z.boolean().default(true).describe('Extract typography information'),
};

export function registerFetchDesignInspiration(server: McpServer): void {
  server.tool(
    'fetch_design_inspiration',
    'Extract visual metadata (colors, typography, layout hints) from any URL to inform design decisions',
    inputSchema,
    async ({ url, extract_colors, extract_typography }) => {
      try {
        const result = await extractDesignFromUrl(url, {
          extractColors: extract_colors,
          extractTypography: extract_typography,
        });

        // Update design context with extracted data
        if (result.colors.length > 0) {
          const ctx = designContextStore.get();
          if (result.colors[0]) ctx.colorPalette.primary = result.colors[0];
          if (result.colors[1]) ctx.colorPalette.secondary = result.colors[1];
          if (result.colors[2]) ctx.colorPalette.accent = result.colors[2];
          designContextStore.set(ctx);
        }

        if (result.typography.fonts.length > 0) {
          const ctx = designContextStore.get();
          ctx.typography.fontFamily = `${result.typography.fonts[0]}, system-ui, sans-serif`;
          designContextStore.set(ctx);
        }

        const summary = [
          `Design inspiration extracted from: ${url}`,
          '',
          `Colors found: ${result.colors.length}`,
          ...(result.colors.length > 0 ? [`  ${result.colors.slice(0, 10).join(', ')}`] : []),
          '',
          `Fonts found: ${result.typography.fonts.length}`,
          ...(result.typography.fonts.length > 0 ? [`  ${result.typography.fonts.join(', ')}`] : []),
          '',
          `Font sizes found: ${result.typography.sizes.length}`,
          ...(result.typography.sizes.length > 0 ? [`  ${result.typography.sizes.join(', ')}`] : []),
          '',
          `Layout hints: ${result.layoutHints.length}`,
          ...result.layoutHints.map((h) => `  - ${h}`),
        ].join('\n');

        return {
          content: [
            { type: 'text', text: summary },
            {
              type: 'text',
              text: JSON.stringify(
                {
                  colors: result.colors,
                  typography: result.typography,
                  layoutHints: result.layoutHints,
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
              text: `Error extracting design from ${url}: ${String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
