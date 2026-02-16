/**
 * MCP Tool: submit_feedback
 *
 * Allows users/AI clients to provide explicit feedback on generated components.
 * This feeds into the self-learning system to improve future generations.
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getDatabase } from '../lib/design-references/database/store.js';
import { recordExplicitFeedback, getFeedbackStats } from '../lib/feedback/feedback-tracker.js';

export function registerSubmitFeedback(server: McpServer): void {
  server.tool(
    'submit_feedback',
    'Submit feedback on a previously generated UI component or page template. This helps UIForge learn your preferences and improve future generations.',
    {
      generation_id: z
        .string()
        .describe('The ID of the generation to provide feedback for'),
      rating: z
        .enum(['positive', 'negative'])
        .describe('Whether the generated output was acceptable (positive) or not (negative)'),
      comment: z
        .string()
        .optional()
        .describe('Optional comment explaining why the output was good or bad'),
    },
    async ({ generation_id, rating, comment }) => {
      try {
        const db = getDatabase();
        const feedback = recordExplicitFeedback(generation_id, rating, db, comment);
        const stats = getFeedbackStats(db);

        const summary = [
          `✅ Feedback recorded for generation \`${generation_id}\``,
          `- **Rating**: ${rating === 'positive' ? '👍 Positive' : '👎 Negative'}`,
          `- **Score**: ${feedback.score > 0 ? '+' : ''}${feedback.score}`,
          comment ? `- **Comment**: ${comment}` : '',
          '',
          '📊 **Feedback Stats**',
          `- Total feedback: ${stats.total}`,
          `- Positive: ${stats.positive} | Negative: ${stats.negative} | Neutral: ${stats.neutral}`,
          `- Average score: ${stats.avgScore.toFixed(2)}`,
        ]
          .filter(Boolean)
          .join('\n');

        // Training readiness indicators
        const readiness: string[] = [];
        if (stats.total >= 100) {
          readiness.push('🟢 Quality Scorer training ready (100+ feedback points)');
        } else {
          readiness.push(`🔵 Quality Scorer: ${stats.total}/100 feedback points`);
        }
        if (stats.total >= 200) {
          readiness.push('🟢 Prompt Enhancer training ready (200+ feedback points)');
        }
        if (stats.total >= 300) {
          readiness.push('🟢 Style Recommender training ready (300+ feedback points)');
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: `${summary}\n\n🤖 **Training Readiness**\n${readiness.join('\n')}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `❌ Failed to record feedback: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
