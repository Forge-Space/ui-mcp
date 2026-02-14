import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerCurrentStylesResource } from './resources/current-styles.js';
import { registerScaffoldFullApplication } from './tools/scaffold-full-application.js';
import { registerGenerateUiComponent } from './tools/generate-ui-component.js';
import { registerGeneratePrototype } from './tools/generate-prototype.js';
import { registerGenerateDesignImage } from './tools/generate-design-image.js';
import { registerFetchDesignInspiration } from './tools/fetch-design-inspiration.js';
import { registerFigmaContextParser } from './tools/figma-context-parser.js';
import { registerFigmaPushVariables } from './tools/figma-push-variables.js';
import { registerAnalyzeDesignReferences } from './tools/analyze-design-references.js';

const server = new McpServer({
  name: 'uiforge',
  version: '0.1.0',
});

// Register resource
registerCurrentStylesResource(server);

// Register tools
registerScaffoldFullApplication(server);
registerGenerateUiComponent(server);
registerGeneratePrototype(server);
registerGenerateDesignImage(server);
registerFetchDesignInspiration(server);
registerFigmaContextParser(server);
registerFigmaPushVariables(server);
registerAnalyzeDesignReferences(server);

// Connect via stdio transport
const transport = new StdioServerTransport();

try {
  await server.connect(transport);
} catch (error) {
  console.error('Failed to start UIForge MCP server:', error);
  process.exit(1);
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
