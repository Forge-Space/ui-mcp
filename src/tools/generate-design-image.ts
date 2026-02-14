import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { renderSvg, renderPng } from '../lib/image-renderer.js';
import { designContextStore } from '../lib/design-context.js';
import type { IDesignContext, ImageType } from '../lib/types.js';

const inputSchema = {
  description: z.string().describe('What to render in the image (e.g., "Landing page with hero section and CTA")'),
  type: z.enum(['wireframe', 'mockup', 'component_preview']).describe('Type of image to generate'),
  width: z.number().int().min(100).max(4096).default(1200).describe('Image width in pixels'),
  height: z.number().int().min(100).max(4096).default(800).describe('Image height in pixels'),
  design_context: z.object({
    typography: z.any().optional(),
    colorPalette: z.any().optional(),
    spacing: z.any().optional(),
    borderRadius: z.any().optional(),
    shadows: z.any().optional(),
  }).optional().describe('Optional design context override'),
  output_format: z.enum(['svg', 'png']).default('svg').describe('Output image format'),
};

export function registerGenerateDesignImage(server: McpServer): void {
  server.tool(
    'generate_design_image',
    'Generate SVG or PNG mockup images of UI screens and components. Supports wireframe, mockup, and component preview modes.',
    inputSchema,
    async ({ description, type, width, height, design_context, output_format }) => {
      const ctx: IDesignContext | undefined = design_context
        ? ({ ...designContextStore.get(), ...design_context } as IDesignContext)
        : designContextStore.get();

      try {
        if (output_format === 'svg') {
          const svg = await renderSvg({
            description,
            type: type as ImageType,
            width,
            height,
            designContext: ctx,
          });

          return {
            content: [
              {
                type: 'text',
                text: `Generated ${type} SVG image (${width}×${height}): ${description}`,
              },
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    files: [
                      {
                        path: `${type}-${width}x${height}.svg`,
                        content: svg,
                        encoding: 'utf-8',
                      },
                    ],
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } else {
          const pngBuffer = await renderPng({
            description,
            type: type as ImageType,
            width,
            height,
            designContext: ctx,
          });

          const base64 = pngBuffer.toString('base64');

          return {
            content: [
              {
                type: 'text',
                text: `Generated ${type} PNG image (${width}×${height}): ${description}`,
              },
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    files: [
                      {
                        path: `${type}-${width}x${height}.png`,
                        content: base64,
                        encoding: 'base64',
                      },
                    ],
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error generating image: ${String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
