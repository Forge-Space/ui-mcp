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

// Connect via stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
