import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerForgeContextResources(server: McpServer): void {
  // Register forge-patterns context resource
  server.resource(
    'forge-patterns-context',
    'mcp://forge-context/forge-patterns',
    {
      description: 'Core patterns and shared infrastructure for the Forge Space ecosystem',
      mimeType: 'text/markdown',
    },
    (uri) => {
      const placeholderContent = `# forge-patterns

Project context for forge-patterns will be available once @forgespace/core is fully integrated.

## Current Status
- Project: forge-patterns
- Integration: In Progress  
- Context Server: Being implemented

## Next Steps
1. Complete @forgespace/core package publishing
2. Implement context storage and retrieval
3. Add project-specific documentation
4. Enable real-time context updates

---
*This content is temporarily served from the UIForge MCP server until the core context server is fully integrated.*`;

      return Promise.resolve({
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/markdown',
            text: placeholderContent,
          },
        ],
      });
    }
  );

  // Register uiforge-webapp context resource
  server.resource(
    'uiforge-webapp-context',
    'mcp://forge-context/uiforge-webapp',
    {
      description: 'Zero-cost web application for AI-driven UI generation',
      mimeType: 'text/markdown',
    },
    (uri) => {
      const placeholderContent = `# UIForge WebApp

Project context for uiforge-webapp will be available once @forgespace/core is fully integrated.

## Current Status
- Project: uiforge-webapp
- Integration: In Progress
- Context Server: Being implemented

## Next Steps
1. Complete @forgespace/core package publishing
2. Implement context storage and retrieval
3. Add project-specific documentation
4. Enable real-time context updates

---
*This content is temporarily served from the UIForge MCP server until the core context server is fully integrated.*`;

      return Promise.resolve({
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/markdown',
            text: placeholderContent,
          },
        ],
      });
    }
  );

  // Register uiforge-mcp context resource
  server.resource(
    'uiforge-mcp-context',
    'mcp://forge-context/uiforge-mcp',
    {
      description: 'AI-driven UI generation via Model Context Protocol',
      mimeType: 'text/markdown',
    },
    (uri) => {
      const placeholderContent = `# UIForge MCP Server

Project context for uiforge-mcp will be available once @forgespace/core is fully integrated.

## Current Status
- Project: uiforge-mcp
- Integration: In Progress
- Context Server: Being implemented

## Next Steps
1. Complete @forgespace/core package publishing
2. Implement context storage and retrieval
3. Add project-specific documentation
4. Enable real-time context updates

---
*This content is temporarily served from the UIForge MCP server until the core context server is fully integrated.*`;

      return Promise.resolve({
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/markdown',
            text: placeholderContent,
          },
        ],
      });
    }
  );

  // Register mcp-gateway context resource
  server.resource(
    'mcp-gateway-context',
    'mcp://forge-context/mcp-gateway',
    {
      description: 'Central hub for MCP server management and routing',
      mimeType: 'text/markdown',
    },
    (uri) => {
      const placeholderContent = `# MCP Gateway

Project context for mcp-gateway will be available once @forgespace/core is fully integrated.

## Current Status
- Project: mcp-gateway
- Integration: In Progress
- Context Server: Being implemented

## Next Steps
1. Complete @forgespace/core package publishing
2. Implement context storage and retrieval
3. Add project-specific documentation
4. Enable real-time context updates

---
*This content is temporarily served from the UIForge MCP server until the core context server is fully integrated.*`;

      return Promise.resolve({
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/markdown',
            text: placeholderContent,
          },
        ],
      });
    }
  );
}
