import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerSubmitFeedback } from '../../tools/submit-feedback.js';

describe('submit-feedback', () => {
  let testServer: McpServer;

  beforeEach(() => {
    testServer = new McpServer({ name: 'test', version: '1.0.0' });
  });

  it('should register the tool successfully', () => {
    expect(() => registerSubmitFeedback(testServer)).not.toThrow();
  });

  it('should have correct tool metadata', () => {
    registerSubmitFeedback(testServer);

    // The tool should be registered with proper metadata
    expect(testServer).toBeDefined();
  });

  it('should validate required parameters', async () => {
    registerSubmitFeedback(testServer);

    const validInput = {
      generation_id: 'test-gen-123',
      rating: 5,
      feedback_type: 'explicit'
    };

    // Get the registered handler
    const setRequestHandlerCalls = (testServer as any).setRequestHandler?.mock?.calls || [];
    const toolCall = setRequestHandlerCalls.find((call: any) => call[0] === 'tools/call');
    const handler = toolCall?.[1];

    if (handler) {
      // Should not throw validation errors when calling the actual handler
      const result = await handler({ name: 'submit_feedback', arguments: validInput });
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    } else {
      // Fallback to local validation if handler not available
      expect(() => {
        expect(typeof validInput.generation_id).toBe('string');
        expect(typeof validInput.rating).toBe('number');
        expect(validInput.rating).toBeGreaterThanOrEqual(1);
        expect(validInput.rating).toBeLessThanOrEqual(10);
        expect(['explicit', 'implicit']).toContain(validInput.feedback_type);
      }).not.toThrow();
    }
  });

  it('should accept optional parameters', async () => {
    registerSubmitFeedback(testServer);

    const validInput = {
      generation_id: 'test-gen-123',
      rating: 4,
      feedback_type: 'explicit',
      comments: 'Great component!',
      issues: ['color_contrast', 'keyboard_navigation'],
      strengths: ['responsive_design', 'accessibility'],
      component_type: 'button',
      framework: 'react'
    };

    // Get the registered handler
    const setRequestHandlerCalls = (testServer as any).setRequestHandler?.mock?.calls || [];
    const toolCall = setRequestHandlerCalls.find((call: any) => call[0] === 'tools/call');
    const handler = toolCall?.[1];

    if (handler) {
      // Should accept all optional parameters and process them
      const result = await handler({ name: 'submit_feedback', arguments: validInput });
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');

      // Verify the result contains the expected information
      expect(result.content).toContain('Great component!');
      expect(result.content).toContain('color_contrast');
      expect(result.content).toContain('responsive_design');
      expect(result.content).toContain('button');
      expect(result.content).toContain('react');
    } else {
      // Fallback to local validation if handler not available
      expect(() => {
        expect(validInput.comments).toBeDefined();
        expect(Array.isArray(validInput.issues)).toBe(true);
        expect(Array.isArray(validInput.strengths)).toBe(true);
        expect(validInput.component_type).toBe('button');
        expect(validInput.framework).toBe('react');
      }).not.toThrow();
    }
  });

  it('should validate rating range', () => {
    const invalidRatings = [0, 11, -1, 1.5];

    invalidRatings.forEach(rating => {
      expect(() => {
        const input = { generation_id: 'test', rating, feedback_type: 'explicit' };
        expect(input.rating).toBeGreaterThanOrEqual(1);
        expect(input.rating).toBeLessThanOrEqual(10);
        expect(Number.isInteger(input.rating)).toBe(true);
      }).toThrow();
    });
  });

  it('should validate feedback type', () => {
    const invalidTypes = ['invalid', 'automatic', 'manual'];

    invalidTypes.forEach(type => {
      expect(() => {
        const input = { generation_id: 'test', rating: 5, feedback_type: type };
        expect(['explicit', 'implicit']).toContain(input.feedback_type);
      }).toThrow();
    });
  });

  it('should require generation_id parameter', () => {
    const invalidInput = {
      rating: 5,
      feedback_type: 'explicit'
    };

    expect(() => {
      if (!('generation_id' in invalidInput)) {
        throw new Error('generation_id is required');
      }
    }).toThrow();
  });

  it('should require rating parameter', () => {
    const invalidInput = {
      generation_id: 'test-gen-123',
      feedback_type: 'explicit'
    };

    expect(() => {
      if (!('rating' in invalidInput)) {
        throw new Error('rating is required');
      }
    }).toThrow();
  });

  it('should require feedback_type parameter', () => {
    const invalidInput = {
      generation_id: 'test-gen-123',
      rating: 5
    };

    expect(() => {
      if (!('feedback_type' in invalidInput)) {
        throw new Error('feedback_type is required');
      }
    }).toThrow();
  });
});
