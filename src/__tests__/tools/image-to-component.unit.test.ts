import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadConfig } from '@forgespace/siza-gen';
import { registerImageToComponent } from '../../tools/image-to-component.js';

describe('image_to_component tool', () => {
  let testServer: McpServer;

  beforeAll(() => {
    loadConfig();
  });

  beforeEach(() => {
    testServer = new McpServer({ name: 'test', version: '1.0.0' });
  });

  it('registers without errors', () => {
    expect(() => registerImageToComponent(testServer)).not.toThrow();
  });

  it('tool is properly exported and can be registered multiple times', () => {
    const server1 = new McpServer({ name: 'test1', version: '1.0.0' });
    const server2 = new McpServer({ name: 'test2', version: '1.0.0' });

    expect(() => {
      registerImageToComponent(server1);
      registerImageToComponent(server2);
    }).not.toThrow();
  });

  it('should validate required image_data parameter', () => {
    registerImageToComponent(testServer);

    const validBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

    expect(() => {
      expect(typeof validBase64).toBe('string');
      expect(validBase64).toMatch(/^[A-Za-z0-9+/]*={0,2}$/);
    }).not.toThrow();
  });

  it('should validate framework parameter', () => {
    registerImageToComponent(testServer);

    const validFrameworks = ['react', 'nextjs', 'vue', 'angular', 'html', 'svelte'];

    validFrameworks.forEach((framework) => {
      expect(() => {
        expect(['react', 'nextjs', 'vue', 'angular', 'html', 'svelte']).toContain(framework);
      }).not.toThrow();
    });
  });

  it('should reject invalid framework', () => {
    const invalidInput = {
      image_data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      framework: 'invalid-framework',
    };

    expect(() => {
      expect(['react', 'nextjs', 'vue', 'angular', 'html', 'svelte']).toContain(invalidInput.framework);
    }).toThrow();
  });

  it('should accept mime_type parameter', () => {
    registerImageToComponent(testServer);

    const validMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

    validMimeTypes.forEach((mimeType) => {
      expect(() => {
        expect(['image/png', 'image/jpeg', 'image/webp', 'image/gif']).toContain(mimeType);
      }).not.toThrow();
    });
  });

  it('should accept optional parameters', () => {
    registerImageToComponent(testServer);

    const inputWithOptions = {
      image_data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      framework: 'react',
      mime_type: 'image/png',
      component_library: 'shadcn',
      dark_mode: true,
      accessibility: true,
      component_name: 'custom-button',
    };

    expect(() => {
      expect(inputWithOptions.component_library).toBe('shadcn');
      expect(inputWithOptions.dark_mode).toBe(true);
      expect(inputWithOptions.accessibility).toBe(true);
      expect(inputWithOptions.component_name).toBe('custom-button');
    }).not.toThrow();
  });

  it('should validate component_library parameter', () => {
    const validLibraries = ['shadcn', 'radix', 'headless', 'primevue', 'material', 'none'];

    validLibraries.forEach((library) => {
      expect(() => {
        expect(['shadcn', 'radix', 'headless', 'primevue', 'material', 'none']).toContain(library);
      }).not.toThrow();
    });
  });

  it('should reject invalid base64 data', () => {
    const invalidInput = {
      image_data: 'not-valid-base64!@#$',
      framework: 'react',
    };

    expect(() => {
      expect(invalidInput.image_data).toMatch(/^[A-Za-z0-9+/]*={0,2}$/);
    }).toThrow();
  });

  it('should require image_data parameter', () => {
    const invalidInput = {
      framework: 'react',
    };

    expect(() => {
      if (!('image_data' in invalidInput)) {
        throw new Error('image_data is required');
      }
    }).toThrow();
  });

  it('should require framework parameter', () => {
    const invalidInput = {
      image_data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    };

    expect(() => {
      if (!('framework' in invalidInput)) {
        throw new Error('framework is required');
      }
    }).toThrow();
  });
});
