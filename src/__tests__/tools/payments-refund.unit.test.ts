import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerPaymentsRefund, paymentsRefundSchema } from '../../tools/payments-refund.js';

describe('payments_refund tool', () => {
  describe('Zod validation', () => {
    it('should accept valid refund params', () => {
      const valid = {
        payment_id: 'pay-abc-123',
        amount: 1000,
        reason: 'Customer request',
        currency: 'BRL',
      };
      const result = paymentsRefundSchema.safeParse(valid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.payment_id).toBe('pay-abc-123');
        expect(result.data.amount).toBe(1000);
        expect(result.data.currency).toBe('BRL');
      }
    });

    it('should apply default currency when omitted', () => {
      const input = { payment_id: 'pay-1', amount: 500 };
      const result = paymentsRefundSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.currency).toBe('BRL');
      }
    });

    it('should reject missing payment_id', () => {
      const invalid = { amount: 100 };
      const result = paymentsRefundSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject empty payment_id', () => {
      const invalid = { payment_id: '', amount: 100 };
      const result = paymentsRefundSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject non-positive amount', () => {
      const invalid = { payment_id: 'pay-1', amount: 0 };
      const result = paymentsRefundSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject negative amount', () => {
      const invalid = { payment_id: 'pay-1', amount: -100 };
      const result = paymentsRefundSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should reject invalid currency length', () => {
      const invalid = { payment_id: 'pay-1', amount: 100, currency: 'US' };
      const result = paymentsRefundSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should accept optional reason', () => {
      const valid = { payment_id: 'pay-1', amount: 200, reason: 'Duplicate charge' };
      const result = paymentsRefundSchema.safeParse(valid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.reason).toBe('Duplicate charge');
      }
    });
  });

  describe('registerPaymentsRefund', () => {
    it('should register without errors', () => {
      const server = new McpServer({ name: 'test', version: '1.0.0' });
      expect(() => registerPaymentsRefund(server)).not.toThrow();
    });
  });
});
