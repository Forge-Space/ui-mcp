/**
 * MCP Tool: submit_feedback
 *
 * Allows users/AI clients to provide explicit feedback on generated components.
 * This feeds into the self-learning system to improve future generations.
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getDatabase, getFeedbackStats, recordExplicitFeedback } from '@forgespace/siza-gen';

/**
 * Register the submit_feedback MCP tool.
 * Allows users to provide explicit feedback on generated components for self-learning.
 *
 * @param server - MCP server instance
 */
export function registerSubmitFeedback(server: McpServer): void {
  server.tool(
    'submit_feedback',
    'Submit feedback on a previously generated UI component or page template. This helps UIForge learn your preferences and improve future generations.',
    {
      generation_id: z.string().describe('The ID of the generation to provide feedback for'),
      rating: z.number().min(1).max(10).int().describe('Rating from 1 (poor) to 10 (excellent)'),
      feedback_type: z
        .enum(['explicit', 'implicit'])
        .describe('Type of feedback: explicit (user-provided) or implicit (behavior-based)'),
      comments: z.string().optional().describe('Optional detailed feedback comments'),
      issues: z.array(z.string()).optional().describe('List of identified issues in the generated component'),
      strengths: z.array(z.string()).optional().describe('List of identified strengths in the generated component'),
      component_type: z.string().optional().describe('Type of component (e.g., button, form, layout)'),
      framework: z.string().optional().describe('Target framework (e.g., react, vue, svelte)'),
    },
    ({ generation_id, rating, feedback_type, comments, issues, strengths, component_type, framework }) => {
      try {
        const db = getDatabase();

        // Convert numeric rating to positive/negative for compatibility
        const sentiment = rating >= 7 ? 'positive' : 'negative';
        const feedback = recordExplicitFeedback(generation_id, sentiment, db, comments);
        const stats = getFeedbackStats(db);

        const summary = [
          `✅ Feedback recorded for generation \`${generation_id}\``,
          `- **Rating**: ${rating}/10 ${sentiment === 'positive' ? '👍' : sentiment === 'negative' ? '👎' : '�'} ${sentiment}`,
          `- **Type**: ${feedback_type}`,
          `- **Score**: ${feedback.score > 0 ? '+' : ''}${feedback.score}`,
          comments ? `- **Comments**: ${comments}` : '',
          issues?.length ? `- **Issues**: ${issues.join(', ')}` : '',
          strengths?.length ? `- **Strengths**: ${strengths.join(', ')}` : '',
          component_type ? `- **Component**: ${component_type}` : '',
          framework ? `- **Framework**: ${framework}` : '',
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
