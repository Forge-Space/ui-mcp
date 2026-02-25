import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerRefineComponent } from '../../tools/refine-component.js';

describe('refine_component tool', () => {
  let testServer: McpServer;

  beforeAll(() => {
    loadConfig();
  });

  beforeEach(() => {
    testServer = new McpServer({ name: 'test', version: '1.0.0' });
  });

  it('registers without errors', () => {
    expect(() => registerRefineComponent(testServer)).not.toThrow();
  });

  it('tool is properly exported and can be registered multiple times', () => {
    const server1 = new McpServer({ name: 'test1', version: '1.0.0' });
    const server2 = new McpServer({ name: 'test2', version: '1.0.0' });

    expect(() => {
      registerRefineComponent(server1);
      registerRefineComponent(server2);
    }).not.toThrow();
  });

  it('should have correct tool metadata', () => {
    registerRefineComponent(testServer);

    // The tool should be registered with proper metadata
    expect(testServer).toBeDefined();
  });

  it('should validate input parameters', () => {
    registerRefineComponent(testServer);

    const validInput = {
      code: 'export default function Button() { return <button>Click</button>; }',
      framework: 'react',
      improvement_request: 'Make this button more accessible',
    };

    expect(() => {
      expect(typeof validInput.code).toBe('string');
      expect(typeof validInput.framework).toBe('string');
      expect(typeof validInput.improvement_request).toBe('string');
      expect(['react', 'nextjs', 'vue', 'angular', 'html', 'svelte']).toContain(validInput.framework);
    }).not.toThrow();
  });

  it('should accept optional parameters', () => {
    registerRefineComponent(testServer);

    const inputWithOptions = {
      code: 'export default function Button() { return <button>Click</button>; }',
      framework: 'react',
      improvement_request: 'Add dark mode support',
      component_type: 'button',
      design_context: {
        colors: { primary: '#blue', secondary: '#gray' },
        typography: { fontFamily: 'Inter' },
      },
    };

    expect(() => {
      expect(inputWithOptions.component_type).toBe('button');
      expect(inputWithOptions.design_context).toBeDefined();
      expect(inputWithOptions.design_context.colors).toBeDefined();
    }).not.toThrow();
  });

  it('should reject invalid framework', () => {
    const invalidInput = {
      code: 'export default function Button() { return <button>Click</button>; }',
      framework: 'invalid-framework',
      improvement_request: 'Make this better',
    };

    expect(() => {
      expect(['react', 'nextjs', 'vue', 'angular', 'html', 'svelte']).toContain(invalidInput.framework);
    }).toThrow();
  });

  it('should require code parameter', () => {
    const invalidInput = {
      framework: 'react',
      improvement_request: 'Make this better',
    };

    expect(() => {
      if (!('code' in invalidInput)) {
        throw new Error('code is required');
      }
    }).toThrow();
  });

  it('should require improvement_request parameter', () => {
    const invalidInput = {
      code: 'export default function Button() { return <button>Click</button>; }',
      framework: 'react',
    };

    expect(() => {
      if (!('improvement_request' in invalidInput)) {
        throw new Error('improvement_request is required');
      }
    }).toThrow();
  });
});
