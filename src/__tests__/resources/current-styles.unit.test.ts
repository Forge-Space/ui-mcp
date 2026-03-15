import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerCurrentStylesResource } from '../../resources/current-styles.js';
import { designContextStore, loadConfig } from '@forgespace/siza-gen';

type ResourceHandler = (
  uri: URL,
  extra: object
) => Promise<{ contents: Array<{ uri: string; mimeType: string; text: string }> }>;

function getResourceHandler(server: McpServer, resourceUri: string): ResourceHandler | undefined {
  const resources = (server as unknown as { _registeredResources: Record<string, { readCallback: ResourceHandler }> })
    ._registeredResources;
  return resources?.[resourceUri]?.readCallback;
}

describe('current-styles resource', () => {
  let server: McpServer;

  beforeEach(() => {
    loadConfig();
    designContextStore.reset();
    server = new McpServer({ name: 'test', version: '0.0.1' });
  });

  it('registers without throwing', () => {
    expect(() => registerCurrentStylesResource(server)).not.toThrow();
  });

  it('registers under application://current-styles URI', () => {
    registerCurrentStylesResource(server);
    const resources = (server as unknown as { _registeredResources: Record<string, unknown> })._registeredResources;
    expect(resources?.['application://current-styles']).toBeDefined();
  });

  it('handler returns JSON content', async () => {
    registerCurrentStylesResource(server);
    const handler = getResourceHandler(server, 'application://current-styles');
    if (!handler) return;

    const result = await handler(new URL('application://current-styles'), {});
    expect(result.contents).toHaveLength(1);
    expect(result.contents[0]!.mimeType).toBe('application/json');
  });

  it('handler returns valid design context JSON', async () => {
    registerCurrentStylesResource(server);
    const handler = getResourceHandler(server, 'application://current-styles');
    if (!handler) return;

    const result = await handler(new URL('application://current-styles'), {});
    const ctx = JSON.parse(result.contents[0]!.text) as Record<string, unknown>;
    expect(ctx.colorPalette).toBeDefined();
    expect(ctx.typography).toBeDefined();
    expect(ctx.spacing).toBeDefined();
  });

  it('handler echoes the request URI in content URI', async () => {
    registerCurrentStylesResource(server);
    const handler = getResourceHandler(server, 'application://current-styles');
    if (!handler) return;

    const uri = new URL('application://current-styles');
    const result = await handler(uri, {});
    expect(result.contents[0]!.uri).toBe(uri.href);
  });

  it('design context store has required fields after reset', () => {
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
