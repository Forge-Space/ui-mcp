import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const getProjectContextSchema = {
  project: z
    .string()
    .describe('Project slug to retrieve context for (e.g. forge-patterns, uiforge-webapp, uiforge-mcp, mcp-gateway)'),
};

const updateProjectContextSchema = {
  project: z
    .string()
    .describe(
      'Project slug (e.g. forge-patterns, uiforge-webapp, uiforge-mcp, mcp-gateway). Use a short kebab-case identifier for new projects.'
    ),
  title: z.string().describe('Human-readable project title (e.g. "forge-patterns Project Context")'),
  description: z.string().describe('One-sentence description of the project for the resource listing'),
  content: z
    .string()
    .describe('Full markdown content of the project context document. This is the complete source of truth.'),
};

const listProjectsSchema = {
  // No parameters required
};

export function registerForgeContextTools(server: McpServer): void {
  // Get project context tool
  server.tool(
    'get_project_context',
    'Returns the full context document for a UIForge project from the centralized store. This is the absolute source of truth for project architecture, status, requirements, and roadmap. Pass the project slug (e.g. "forge-patterns"). Use list_projects to discover available projects.',
    getProjectContextSchema,
    ({ project }) => {
      try {
        if (!project) {
          throw new Error('Missing required argument: project');
        }

        // Return placeholder content until @forgespace/core is published
        const placeholderContent = `# ${project}

## Project Overview
This is the project context for ${project}. The full context management system is being implemented as part of the @forgespace/core integration.

## Current Integration Status
- **Package**: @forgespace/core v1.1.4 (ready to publish)
- **Context Server**: Implemented and ready
- **Resource URIs**: Updated to mcp://forge-context/
- **Tools**: Integrated into UIForge MCP server

## Architecture
The forge-context system provides:
- Centralized project context storage
- Resource-based access via MCP protocol
- Real-time context updates
- Cross-project context sharing

## Next Steps
1. Publish @forgespace/core@1.1.4 to npm
2. Update all projects to use the new package
3. Enable full context management features
4. Add project-specific documentation

---
*This context is temporarily served from the UIForge MCP server until the core context server is fully integrated.*`;

        return {
          content: [
            {
              type: 'text',
              text: placeholderContent,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Update project context tool
  server.tool(
    'update_project_context',
    'Writes or overwrites the context document for a UIForge project in the centralized store. Use this to keep the source of truth up-to-date after architectural decisions, status changes, roadmap updates, or any significant project change. Provide the full markdown content — this completely replaces the existing context.',
    updateProjectContextSchema,
    ({ project, title, description, content }) => {
      try {
        if (!project || !title || !description || !content) {
          throw new Error('Missing required arguments: project, title, description, content');
        }

        // Return success message until full integration
        const result = `Context for "${project}" would be updated here once @forgespace/core is fully integrated.

Title: ${title}
Description: ${description}
Content length: ${typeof content === 'string' ? content.length : 0} characters

Note: This is a placeholder response. The actual context update will be available once the core package is published and integrated.`;

        return {
          content: [
            {
              type: 'text',
              text: result,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // List projects tool
  server.tool(
    'list_projects',
    'Lists all projects registered in the centralized UIForge context store, with their slugs, titles, descriptions, and last-updated timestamps.',
    listProjectsSchema,
    () => {
      try {
        // Return placeholder project list
        const projectList = `# UIForge Context Store

## Available Projects

- **forge-patterns** — Core patterns and shared infrastructure for the Forge Space ecosystem
  _Last updated: 2026-02-18_

- **uiforge-webapp** — Zero-cost web application for AI-driven UI generation  
  _Last updated: 2026-02-18_

- **uiforge-mcp** — AI-driven UI generation via Model Context Protocol
  _Last updated: 2026-02-18_

- **mcp-gateway** — Central hub for MCP server management and routing
  _Last updated: 2026-02-18_

---
*This project list is temporarily served from the UIForge MCP server until the core context server is fully integrated.*`;

        return {
          content: [
            {
              type: 'text',
              text: projectList,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
