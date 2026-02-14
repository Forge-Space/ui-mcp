import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { buildPrototype } from '../lib/prototype-builder.js';
import { designContextStore } from '../lib/design-context.js';
import type { IScreenElement, ITransition, IDesignContext } from '../lib/types.js';

const screenElementSchema: z.ZodType<IScreenElement> = z.object({
  id: z.string(),
  type: z.enum(['heading', 'text', 'button', 'input', 'image', 'card', 'nav', 'list', 'container', 'icon', 'divider']),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  children: z.lazy(() => z.array(screenElementSchema)).optional(),
  styles: z.record(z.string()).optional(),
  action: z.string().optional(),
});

const transitionSchema = z.object({
  from: z.string(),
  to: z.string(),
  trigger: z.enum(['click', 'tap', 'hover', 'auto']),
  animation: z.enum(['fade', 'slide-left', 'slide-right', 'slide-up', 'none']).optional(),
  targetElement: z.string().optional(),
});

const designContextSchema = z.object({
  typography: z.any().optional(),
  colorPalette: z.any().optional(),
  spacing: z.any().optional(),
  borderRadius: z.any().optional(),
  shadows: z.any().optional(),
}).optional();

const inputSchema = {
  screens: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      elements: z.array(screenElementSchema),
    })
  ).describe('Array of screens with their elements'),
  navigation_flow: z.array(transitionSchema).describe('Navigation flow between screens'),
  design_context: designContextSchema.describe('Optional design context override'),
  output_format: z.enum(['html', 'html_bundle']).default('html').describe('Output format'),
};

export function registerGeneratePrototype(server: McpServer): void {
  server.tool(
    'generate_prototype',
    'Create interactive HTML prototypes with screen flows, navigation, and transitions. Output is a standalone HTML file.',
    inputSchema,
    async ({ screens, navigation_flow, design_context, output_format: _output_format }) => {
      const ctx: IDesignContext | undefined = design_context
        ? { ...designContextStore.get(), ...design_context } as IDesignContext
        : undefined;

      const html = buildPrototype({
        screens: screens as Array<{ name: string; description?: string; elements: IScreenElement[] }>,
        navigationFlow: navigation_flow as ITransition[],
        designContext: ctx,
      });

      const files = [
        {
          path: 'prototype.html',
          content: html,
        },
      ];

      const summary = [
        `Generated interactive prototype with ${screens.length} screen(s)`,
        `Navigation flows: ${navigation_flow.length}`,
        `Output: prototype.html (${html.length} bytes)`,
        '',
        'Screens:',
        ...screens.map((s) => `  - ${s.name}${s.description ? `: ${s.description}` : ''}`),
      ].join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          {
            type: 'text',
            text: JSON.stringify({ files, screenCount: screens.length }, null, 2),
          },
        ],
      };
    }
  );
}
