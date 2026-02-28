import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  GeneratorFactory,
  composePageFromTemplate,
  createLogger,
  designContextStore,
  findBestComposition,
  getDatabase,
  initializeRegistry,
  recordGeneration,
  scoreQuality,
  type IGeneratedFile,
  type IGeneration,
  type IndustryTag,
  type MoodTag,
  type PageTemplateType,
  type VisualStyleId,
} from '@forgespace/siza-gen';
import { wrapReact, wrapVue, wrapAngular, wrapSvelte, wrapHtml } from './generate-page-template.js';
import { withBrandContext } from '../lib/brand-context.js';

const logger = createLogger('scaffold-full-application');

const ARCH_PAGES: Record<string, PageTemplateType[]> = {
  flat: ['landing'],
  'feature-based': ['landing', 'dashboard', 'settings', 'auth_login'],
  atomic: ['landing', 'dashboard', 'settings', 'auth_login', 'pricing'],
};

const inputSchema = {
  framework: z.enum(['react', 'nextjs', 'vue', 'angular', 'html', 'svelte']).describe('Frontend framework to scaffold'),
  styling: z.enum(['tailwindcss']).default('tailwindcss').describe('Styling framework'),
  architecture: z.enum(['flat', 'feature-based', 'atomic']).default('flat').describe('Project architecture pattern'),
  state_management: z
    .enum(['useState', 'zustand', 'pinia', 'signals', 'none'])
    .default('none')
    .describe('State management solution'),
  project_name: z.string().min(1).max(100).describe('Project name (used for directory and package.json)'),
  mood: z
    .enum([
      'bold',
      'calm',
      'playful',
      'professional',
      'premium',
      'energetic',
      'minimal',
      'editorial',
      'futuristic',
      'warm',
      'corporate',
      'creative',
    ])
    .optional()
    .describe('Design mood/personality for composed pages'),
  industry: z
    .enum([
      'saas',
      'fintech',
      'ecommerce',
      'healthcare',
      'education',
      'startup',
      'agency',
      'media',
      'devtools',
      'general',
    ])
    .optional()
    .describe('Target industry for composed pages'),
  visual_style: z
    .enum([
      'glassmorphism',
      'neubrutalism',
      'soft-depth',
      'bento-grid',
      'gradient-mesh',
      'dark-premium',
      'minimal-editorial',
      'linear-modern',
      'retro-playful',
      'corporate-trust',
    ])
    .optional()
    .describe('Visual style for composed pages'),
  brand_identity: z
    .string()
    .optional()
    .describe('JSON string from branding-mcp generate_brand_identity. Overrides design context with brand tokens.'),
};

export function registerScaffoldFullApplication(server: McpServer): void {
  server.tool(
    'scaffold_full_application',
    'Generate full project boilerplate with ML-composed pages for React, Next.js, Vue, Angular, Svelte, or HTML with Tailwind CSS and optional state management',
    inputSchema,
    async ({
      framework,
      styling: _styling,
      architecture,
      state_management,
      project_name,
      mood,
      industry,
      visual_style,
      brand_identity,
    }) => {
      return withBrandContext(brand_identity, async () => {
        initializeRegistry();
        const ctx = designContextStore.get();

        const mappedStateManagement =
          framework === 'svelte' ? (state_management === 'useState' ? 'stores' : 'none') : state_management;

        const generator = GeneratorFactory.getInstance().createGenerator(framework);
        const files = generator.generateProject(project_name, architecture, mappedStateManagement, ctx);

        const pageTypes = ARCH_PAGES[architecture] ?? ARCH_PAGES['flat'];
        const composedPages: IGeneratedFile[] = [];
        const useML = !!(mood || industry || visual_style);

        for (const pageType of pageTypes) {
          let pageFiles: IGeneratedFile[] | null = null;

          if (useML) {
            try {
              const comp = findBestComposition(pageType, {
                mood: mood ? [mood as MoodTag] : undefined,
                industry: industry ? [industry as IndustryTag] : undefined,
                visualStyle: visual_style as VisualStyleId | undefined,
              });
              if (comp) {
                const result = composePageFromTemplate(comp.id, {
                  mood: mood ? [mood as MoodTag] : undefined,
                  industry: industry ? [industry as IndustryTag] : undefined,
                  visualStyle: visual_style as VisualStyleId | undefined,
                });
                if (result) {
                  const quality = await scoreQuality(pageType, result.jsx, {
                    componentType: pageType,
                  });
                  if (quality.score >= 5) {
                    pageFiles = wrapForFramework(pageType, result.jsx, framework, ctx);
                    logger.info(
                      { pageType, score: quality.score, compositionId: comp.id },
                      'Scaffold: composed page from ML'
                    );
                  }
                }
              }
            } catch (err) {
              logger.warn({ err, pageType }, 'Scaffold: composition failed');
            }
          }

          if (pageFiles) {
            composedPages.push(...pageFiles);

            try {
              const db = getDatabase();
              const gen: IGeneration = {
                id: `gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                tool: 'generate_page_template',
                params: {
                  template: pageType,
                  framework,
                  ...(mood && { mood }),
                  ...(industry && { industry }),
                  ...(visual_style && { visual_style }),
                },
                componentType: pageType,
                framework,
                outputHash: '',
                timestamp: Date.now(),
                sessionId: `session-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
                mood,
                industry,
                style: visual_style,
              };
              recordGeneration(gen, pageFiles[0]?.content || '', db, pageType);
            } catch (err) {
              logger.warn({ error: err }, 'Scaffold: recording failed');
            }
          }
        }

        const allFiles = [...files, ...composedPages];

        const summary = [
          `Scaffolded ${framework} project "${project_name}"`,
          `Files generated: ${allFiles.length} (${files.length} infra + ${composedPages.length} composed pages)`,
          `Architecture: ${architecture}`,
          `State management: ${state_management}`,
          composedPages.length > 0 ? `ML-composed pages: ${composedPages.map((f) => f.path).join(', ')}` : '',
          '',
          'Files:',
          ...allFiles.map((f: IGeneratedFile) => `  ${f.path}`),
        ]
          .filter(Boolean)
          .join('\n');

        return {
          content: [
            { type: 'text', text: summary },
            {
              type: 'text',
              text: JSON.stringify({ files: allFiles }, null, 2),
            },
          ],
        };
      });
    }
  );
}

function wrapForFramework(
  template: string,
  body: string,
  framework: string,
  ctx: ReturnType<typeof designContextStore.get>
): IGeneratedFile[] {
  switch (framework) {
    case 'react':
    case 'nextjs':
      return wrapReact(template, body, framework === 'nextjs');
    case 'vue':
      return wrapVue(template, body);
    case 'angular':
      return wrapAngular(template, body);
    case 'svelte':
      return wrapSvelte(template, body);
    case 'html':
      return wrapHtml(template, body, ctx, false, template);
    default:
      return wrapReact(template, body, false);
  }
}
