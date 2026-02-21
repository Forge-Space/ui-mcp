import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { scrapePage, closeBrowser, normalizeColors } from '../lib/browser-scraper.js';
import { analyzeImage } from '../lib/image-analyzer.js';
import { detectCommonPatterns, buildSuggestedContext } from '../lib/pattern-detector.js';
import { designContextStore } from '../lib/design-context.js';
import { createLogger } from '../lib/logger.js';
import type { IScrapedPage, IImageAnalysis, IDesignAnalysisResult } from '../lib/types.js';

const logger = createLogger('analyze-design-references');

const inputSchema = {
  urls: z
    .array(z.string().url())
    .optional()
    .describe('URLs of websites to scrape for design references (screenshots + computed styles)'),
  images: z
    .array(
      z.object({
        data: z.string().describe('Base64-encoded image data'),
        mimeType: z.string().default('image/png').describe('MIME type of the image'),
        label: z.string().optional().describe('Optional label for this image reference'),
      })
    )
    .optional()
    .describe('Attached images to analyze as design references'),
  viewport: z
    .object({
      width: z.number().int().min(320).max(3840).default(1440),
      height: z.number().int().min(240).max(2160).default(900),
    })
    .optional()
    .describe('Browser viewport size for URL scraping'),
  update_context: z
    .boolean()
    .default(true)
    .describe('Whether to update the global design context with detected patterns'),
};

export function registerAnalyzeDesignReferences(server: McpServer): void {
  server.tool(
    'analyze_design_references',
    'Analyze design references from URLs (browser automation + screenshots) and/or attached images. ' +
      'Extracts colors, typography, layout patterns, and UI components. ' +
      'When multiple references are provided, identifies common patterns across all sources ' +
      'to prioritize consistent design decisions for UI/UX generation.',
    inputSchema,
    async ({ urls, images, viewport, update_context }) => {
      const warnings: string[] = [];
      const scrapedPages: IScrapedPage[] = [];
      const imageAnalyses: IImageAnalysis[] = [];
      const screenshots: Array<{ source: string; data: string }> = [];

      // --- Phase 1: Scrape URLs with browser automation ---
      if (urls && urls.length > 0) {
        const vp = viewport ?? { width: 1440, height: 900 };

        for (const url of urls) {
          try {
            const page = await scrapePage(url, {
              viewport: vp,
              takeScreenshot: true,
              waitMs: 2000,
            });
            scrapedPages.push(page);

            // Analyze the screenshot as an image too
            if (page.screenshot) {
              const imgAnalysis = await analyzeImage(page.screenshot, url);
              imageAnalyses.push(imgAnalysis);
              screenshots.push({
                source: url,
                data: page.screenshot.toString('base64'),
              });
            }
          } catch (error) {
            logger.error({ url, error }, 'Failed to scrape URL');
            warnings.push(`Failed to scrape ${url}: ${String(error)}`);
          }
        }

        // Close browser after all URLs are processed
        await closeBrowser();
      }

      // --- Phase 2: Analyze attached images ---
      if (images && images.length > 0) {
        for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
          const imageData = images[imageIndex];
          try {
            const buffer = Buffer.from(imageData.data, 'base64');
            const label = imageData.label ?? `image-${imageIndex + 1}`;
            const analysis = await analyzeImage(buffer, label);
            imageAnalyses.push(analysis);
          } catch (error) {
            const label = imageData.label ?? `image-${imageIndex + 1}`;
            logger.error({ label, error }, 'Failed to analyze image');
            warnings.push(`Failed to analyze image ${label}: ${String(error)}`);
          }
        }
      }

      if (scrapedPages.length === 0 && imageAnalyses.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'No references could be analyzed. Please provide at least one valid URL or image.',
            },
          ],
          isError: true,
        };
      }

      // --- Phase 3: Detect common patterns ---
      const commonPatterns = detectCommonPatterns({ scrapedPages, imageAnalyses });
      const suggestedContext = buildSuggestedContext(commonPatterns);

      // --- Phase 4: Update design context if requested ---
      if (update_context && Object.keys(suggestedContext).length > 0) {
        designContextStore.update(suggestedContext);
      }

      // --- Build result ---
      const references = [
        ...scrapedPages.map((page) => ({
          source: page.url,
          colors: normalizeColors(page.colors),
          fonts: page.fonts,
          layouts: page.layoutPatterns,
          components: page.componentTypes,
        })),
        ...imageAnalyses
          .filter((a) => !scrapedPages.some((page) => page.url === a.label))
          .map((a) => ({
            source: a.label,
            colors: a.dominantColors.map((c) => c.hex),
            fonts: [] as string[],
            layouts: a.layoutRegions.map((r) => r.role),
            components: a.detectedComponents,
          })),
      ];

      const result: IDesignAnalysisResult = {
        references,
        commonPatterns,
        suggestedContext,
        screenshots,
      };

      const summary = buildSummary(result, warnings, update_context);

      return {
        content: [
          { type: 'text', text: summary },
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}

function buildSummary(result: IDesignAnalysisResult, warnings: string[], contextUpdated: boolean): string {
  const lines: string[] = [];

  lines.push(`## Design Reference Analysis`);
  lines.push(`Analyzed ${result.references.length} reference(s)`);
  lines.push('');

  // Per-reference summary
  for (const ref of result.references) {
    lines.push(`### ${ref.source}`);
    if (ref.colors.length > 0) lines.push(`  Colors: ${ref.colors.slice(0, 6).join(', ')}`);
    if (ref.fonts.length > 0) lines.push(`  Fonts: ${ref.fonts.join(', ')}`);
    if (ref.layouts.length > 0) lines.push(`  Layouts: ${ref.layouts.join(', ')}`);
    if (ref.components.length > 0) lines.push(`  Components: ${ref.components.join(', ')}`);
    lines.push('');
  }

  // Common patterns
  if (result.commonPatterns.length > 0) {
    lines.push(`### Common Patterns (${result.commonPatterns.length} detected)`);
    const byCategory = new Map<string, typeof result.commonPatterns>();
    for (const p of result.commonPatterns) {
      if (!byCategory.has(p.category)) byCategory.set(p.category, []);
      byCategory.get(p.category)!.push(p);
    }
    for (const [category, patterns] of byCategory) {
      lines.push(
        `  **${category}**: ${patterns.map((p) => `${p.pattern} (${Math.round(p.confidence * 100)}%)`).join(', ')}`
      );
    }
    lines.push('');
  }

  if (contextUpdated) {
    lines.push('✅ Design context updated with detected patterns');
  }

  if (warnings.length > 0) {
    lines.push('');
    lines.push('### Warnings');
    for (const w of warnings) {
      lines.push(`  ⚠ ${w}`);
    }
  }

  return lines.join('\n');
}
