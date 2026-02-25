import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerCurrentStylesResource } from '../../resources/current-styles.js';
import { designContextStore } from '@forgespace/siza-gen';

describe('current-styles resource', () => {
  it('registers without errors', () => {
    const server = new McpServer({ name: 'test', version: '1.0.0' });
    expect(() => registerCurrentStylesResource(server)).not.toThrow();
  });

  it('design context store has all required fields', () => {
    designContextStore.reset();
    const ctx = designContextStore.get();

    expect(ctx.colorPalette).toBeDefined();
    expect(ctx.colorPalette.primary).toBeDefined();
    expect(ctx.typography).toBeDefined();
    expect(ctx.typography.fontFamily).toBeDefined();
    expect(ctx.spacing).toBeDefined();
    expect(ctx.spacing.unit).toBeGreaterThan(0);
  });
});
