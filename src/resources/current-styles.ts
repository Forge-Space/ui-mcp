import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { designContextStore } from '../lib/design-context.js';

export function registerCurrentStylesResource(server: McpServer): void {
  server.resource(
    'current-styles',
    'application://current-styles',
    {
      description: 'Current design context with typography, colors, spacing, and other style tokens',
      mimeType: 'application/json',
    },
    async (uri) => {
      const context = designContextStore.get();
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(context, null, 2),
          },
        ],
      };
    }
  );
}
