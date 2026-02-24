#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { loadConfig } from './lib/config.js';
import { registerCurrentStylesResource } from './resources/current-styles.js';
import { registerForgeContextResources } from './resources/forge-context.js';
import { registerScaffoldFullApplication } from './tools/scaffold-full-application.js';
import { registerGenerateUiComponent } from './tools/generate-ui-component.js';
import { registerGeneratePrototype } from './tools/generate-prototype.js';
import { registerGenerateDesignImage } from './tools/generate-design-image.js';
import { registerFetchDesignInspiration } from './tools/fetch-design-inspiration.js';
import { registerFigmaContextParser } from './tools/figma-context-parser.js';
import { registerFigmaPushVariables } from './tools/figma-push-variables.js';
import { registerAnalyzeDesignReferences } from './tools/analyze-design-references.js';
import { registerImageToComponent } from './tools/image-to-component.js';
import { registerGeneratePageTemplate } from './tools/generate-page-template.js';
import { registerRefineComponent } from './tools/refine-component.js';
import { registerAuditAccessibility } from './tools/audit-accessibility.js';
import { registerSubmitFeedback } from './tools/submit-feedback.js';
import { registerAnalyzeDesignImageForTraining } from './tools/analyze-design-image-for-training.js';
import { registerManageTraining } from './tools/manage-training.js';
import { registerAnalyzeComponentLibrary } from './tools/analyze-component-library.js';
import { registerForgeContextTools } from './tools/forge-context.js';
import { registerGenerateFromPack } from './tools/generate-from-pack.js';
import { closeDatabase } from './lib/design-references/database/store.js';
import { logger } from './lib/logger.js';

// Load and validate configuration
let config;
try {
  config = loadConfig();
} catch (error) {
  logger.error({ error }, 'Failed to load configuration:');
  process.exit(1);
}

logger.info({ config: { NODE_ENV: config.NODE_ENV, LOG_LEVEL: config.LOG_LEVEL } }, 'Configuration loaded');

const server = new McpServer({
  name: 'uiforge',
  version: '0.1.0',
});

// Register resources
registerCurrentStylesResource(server);
registerForgeContextResources(server);

// Register tools
registerScaffoldFullApplication(server);
registerGenerateUiComponent(server);
registerGeneratePrototype(server);
registerGenerateDesignImage(server);
registerFetchDesignInspiration(server);
registerFigmaContextParser(server);
registerFigmaPushVariables(server);
registerAnalyzeDesignReferences(server);
registerImageToComponent(server);
registerGeneratePageTemplate(server);
registerRefineComponent(server);
registerAuditAccessibility(server);
registerSubmitFeedback(server);
registerAnalyzeDesignImageForTraining(server);
registerManageTraining(server);
registerAnalyzeComponentLibrary(server);
registerGenerateFromPack(server);
try {
  registerForgeContextTools(server);
  logger.info('Forge context tools registered successfully');
} catch (error) {
  logger.error({ error }, 'Failed to register forge context tools');
}

logger.info('All tools and resources registered');

// Connect via stdio transport
const transport = new StdioServerTransport();

try {
  await server.connect(transport);
  logger.info('UIForge MCP server started successfully');
} catch (error) {
  logger.error({ error }, 'Failed to start UIForge MCP server');
  process.exit(1);
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  try {
    closeDatabase();
  } catch (err) {
    logger.error({ err }, 'Error closing database on SIGTERM');
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  try {
    closeDatabase();
  } catch (err) {
    logger.error({ err }, 'Error closing database on SIGINT');
  }
  process.exit(0);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, 'Unhandled Rejection');
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error({ error }, 'Uncaught Exception');
  try {
    closeDatabase();
  } catch (err) {
    logger.error({ err }, 'Error closing database on uncaughtException');
  }
  process.exit(1);
});
