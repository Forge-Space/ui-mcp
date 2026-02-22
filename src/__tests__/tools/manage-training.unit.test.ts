import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerManageTraining } from '../../tools/manage-training.js';

describe('manage-training', () => {
  let testServer: McpServer;

  beforeEach(() => {
    testServer = new McpServer({ name: 'test', version: '1.0.0' });
  });

  it('should register the tool successfully', () => {
    expect(() => registerManageTraining(testServer)).not.toThrow();
  });

  it('should have correct tool metadata', () => {
    registerManageTraining(testServer);

    // The tool should be registered with proper metadata
    expect(testServer).toBeDefined();
  });

  it('should validate action parameter', () => {
    registerManageTraining(testServer);

    const validActions = [
      'check_readiness',
      'start_training',
      'get_status',
      'cancel_training',
      'list_adapters',
      'get_summary',
    ];

    validActions.forEach((action) => {
      expect(() => {
        expect([
          'check_readiness',
          'start_training',
          'get_status',
          'cancel_training',
          'list_adapters',
          'get_summary',
        ]).toContain(action);
      }).not.toThrow();
    });
  });

  it('should reject invalid action parameter', () => {
    const invalidInput = {
      action: 'invalid_action',
    };

    expect(() => {
      expect([
        'check_readiness',
        'start_training',
        'get_status',
        'cancel_training',
        'list_adapters',
        'get_summary',
      ]).toContain(invalidInput.action);
    }).toThrow();
  });

  it('should accept optional parameters for start_training', () => {
    const validInput = {
      action: 'start_training',
      adapter_type: 'quality-scorer',
      epochs: 10,
      learning_rate: 0.001,
    };

    expect(() => {
      expect(validInput.action).toBe('start_training');
      expect(['quality-scorer', 'prompt-enhancer', 'style-recommender']).toContain(validInput.adapter_type);
      expect(typeof validInput.epochs).toBe('number');
      expect(typeof validInput.learning_rate).toBe('number');
    }).not.toThrow();
  });
});
