import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import pino from 'pino';
import {
  checkTrainingReadiness,
  startTrainingJob,
  getLatestJobStatus,
  cancelTrainingJob,
  getTrainingSummary,
  type AdapterType,
} from '../lib/ml/index.js';
import { listAdapters, getModelPath, type ModelId } from '../lib/ml/model-manager.js';
import { getDatabase } from '../lib/design-references/database/store.js';

const logger = pino({ name: 'manage-training' });

const inputSchema = {
  action: z
    .enum(['check_readiness', 'start_training', 'get_status', 'cancel_training', 'list_adapters', 'get_summary'])
    .describe('Action to perform on the training system'),
  adapter_name: z
    .string()
    .optional()
    .describe('Name of the adapter: quality-scorer, prompt-enhancer, or style-recommender'),
};

/**
 * Register the manage_training MCP tool.
 * Provides ML training job management for the UIForge sidecar model.
 *
 * @param server - MCP server instance
 */
export function registerManageTraining(server: McpServer): void {
  server.tool(
    'manage_training',
    'Manage ML training jobs for the UIForge sidecar model. Actions: check_readiness (verify training prerequisites), start_training (begin LoRA fine-tuning), get_status (check job progress), cancel_training (stop running job), list_adapters (show available adapters), get_summary (get training statistics).',
    inputSchema,
    ({ action, adapter_name }) => {
      try {
        switch (action) {
          case 'check_readiness': {
            if (!adapter_name) {
              throw new Error('adapter_name is required for check_readiness action');
            }
            const validAdapters: AdapterType[] = ['quality-scorer', 'prompt-enhancer', 'style-recommender'];
            if (!validAdapters.includes(adapter_name as AdapterType)) {
              throw new Error(`Invalid adapter_name: ${adapter_name}. Must be one of: ${validAdapters.join(', ')}`);
            }
            const db = getDatabase();
            const readiness = checkTrainingReadiness(adapter_name as AdapterType, 'qwen2.5-0.5b' as ModelId, db);
            const summary = [
              '🔍 Training Readiness Check',
              `Adapter: ${adapter_name}`,
              `Ready: ${readiness.ready ? '✅' : '❌'}`,
              readiness.ready ? '' : `\nIssues:\n${readiness.issues.map((i) => `  • ${i}`).join('\n')}`,
            ]
              .filter(Boolean)
              .join('\n');

            return {
              content: [
                { type: 'text', text: summary },
                { type: 'text', text: JSON.stringify(readiness, null, 2) },
              ],
            };
          }

          case 'start_training': {
            if (!adapter_name) {
              throw new Error('adapter_name is required for start_training action');
            }

            const db = getDatabase();
            const job = startTrainingJob(adapter_name as AdapterType, 'qwen2.5-0.5b' as ModelId, db);
            const summary = [
              '🚀 Training Job Started',
              `Job ID: ${job.jobId}`,
              `Adapter: ${adapter_name}`,
              `Status: ${job.status}`,
              `Started: ${new Date(job.status.startedAt ?? Date.now()).toLocaleString()}`,
              `Progress: ${job.status.progress}%`,
              '\n💡 Use get_status action to check progress',
            ].join('\n');

            return {
              content: [
                { type: 'text', text: summary },
                { type: 'text', text: JSON.stringify(job, null, 2) },
              ],
            };
          }

          case 'get_status': {
            if (!adapter_name) {
              throw new Error('adapter_name is required for get_status action');
            }

            const db = getDatabase();
            const status = getLatestJobStatus(adapter_name as AdapterType, db);
            if (!status) {
              throw new Error(`No training job found for adapter: ${adapter_name}`);
            }
            const summary = [
              '📊 Training Job Status',
              `Adapter: ${adapter_name}`,
              `Status: ${status.status}`,
              `Progress: ${status.progress}%`,
              status.error ? `\n❌ Error: ${status.error}` : '',
              status.status === 'complete'
                ? `\n✅ Completed at ${new Date(status.completedAt ?? Date.now()).toLocaleString()}`
                : '',
            ]
              .filter(Boolean)
              .join('\n');

            return {
              content: [
                { type: 'text', text: summary },
                { type: 'text', text: JSON.stringify(status, null, 2) },
              ],
            };
          }

          case 'cancel_training': {
            if (!adapter_name) {
              throw new Error('adapter_name is required for cancel_training action');
            }

            const db = getDatabase();
            const result = cancelTrainingJob(adapter_name as AdapterType, db);
            const summary = result
              ? `✅ Training job for ${adapter_name} cancelled successfully`
              : `❌ No active training job found for ${adapter_name}`;

            return {
              content: [
                { type: 'text', text: summary },
                { type: 'text', text: JSON.stringify(result, null, 2) },
              ],
            };
          }

          case 'list_adapters': {
            const adapters = listAdapters();
            const summary = [
              '📦 Available LoRA Adapters',
              `Total: ${adapters.length}`,
              '',
              ...adapters.map(
                (a) => `• ${a.adapter} (${(a.sizeBytes / 1024 / 1024).toFixed(2)} MB) - ${a.available ? '✅' : '❌'}`
              ),
            ].join('\n');

            return {
              content: [
                { type: 'text', text: summary },
                { type: 'text', text: JSON.stringify(adapters, null, 2) },
              ],
            };
          }

          case 'get_summary': {
            const db = getDatabase();
            const summary = getTrainingSummary(db);
            const summaryText = [
              '📈 Training System Summary',
              `Total jobs: ${summary.jobs.length}`,
              `Active: ${summary.activeCount}`,
              `Model path: ${getModelPath('qwen2.5-0.5b')}`,
              `Jobs: ${summary.jobs.length} total`,
              '',
              'Data Readiness:',
              ...Object.entries(summary.dataReadiness).map(
                ([adapter, info]) =>
                  `  • ${adapter}: ${info.ready ? '✅' : '❌'} (${info.count}/${info.required} samples)`
              ),
            ].join('\n');

            return {
              content: [
                { type: 'text', text: summaryText },
                { type: 'text', text: JSON.stringify(summary, null, 2) },
              ],
            };
          }

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        logger.error({ error, action }, 'manage_training tool error');
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
