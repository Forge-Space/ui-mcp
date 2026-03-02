/**
 * MCP Tool: payments_refund
 *
 * Validates and processes refund requests for payments.
 * Inputs are validated with Zod; the tool returns a structured result (stub implementation).
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const paymentsRefundInputSchema = {
  payment_id: z.string().min(1, 'payment_id is required').describe('ID of the payment to refund'),
  amount: z
    .number()
    .int('amount must be an integer in minor units')
    .positive('amount must be positive')
    .describe('Refund amount in minor units (e.g. cents)'),
  reason: z.string().optional().describe('Optional reason for the refund'),
  currency: z
    .string()
    .regex(/^[A-Z]{3}$/, 'currency must be a 3-letter ISO 4217 code')
    .optional()
    .default('BRL')
    .describe('ISO 4217 currency code (default: BRL)'),
};

export const paymentsRefundSchema = z.object(paymentsRefundInputSchema);
export type PaymentsRefundParams = z.infer<typeof paymentsRefundSchema>;

export function buildPaymentsRefundResponse(params: PaymentsRefundParams): {
  content: Array<{ type: 'text'; text: string }>;
} {
  const { payment_id, amount, reason, currency } = params;
  const summary = [
    '✅ Refund request validated',
    `- **Payment ID**: ${payment_id}`,
    `- **Amount**: ${amount} (minor units)`,
    `- **Currency**: ${currency ?? 'BRL'}`,
    reason ? `- **Reason**: ${reason}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  return {
    content: [{ type: 'text' as const, text: summary }],
  };
}

export function registerPaymentsRefund(server: McpServer): void {
  server.tool(
    'payments_refund',
    'Request a refund for a payment. Validates payment_id, amount (positive integer minor units), optional reason and currency. Returns a structured confirmation (stub).',
    paymentsRefundInputSchema,
    (params) => buildPaymentsRefundResponse(params)
  );
}
