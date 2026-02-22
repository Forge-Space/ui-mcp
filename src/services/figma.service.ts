import type { IFigmaVariable } from '../lib/types.js';
import { createLogger } from '../lib/logger.js';
import {
  getFile,
  getFileNodes,
  getVariables,
  type FigmaFileResponse,
  type FigmaVariablesResponse,
  type FigmaNode,
  type FigmaComponent,
} from '../lib/figma-client.js';

const logger = createLogger('figma-service');

/**
 * Figma Service - Handles all Figma API operations
 * Provides a clean interface for Figma integration with proper error handling and logging
 */
export class FigmaService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env['FIGMA_ACCESS_TOKEN'] || '';
    if (!this.apiKey) {
      logger.warn('FIGMA_ACCESS_TOKEN not set - Figma operations will fail');
    }
  }

  /**
   * Check if Figma API is properly configured
   * @returns True if API key is available
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get file information and document structure
   * @param fileKey Figma file key
   * @returns File response with document and components
   */
  async getFile(fileKey: string): Promise<FigmaFileResponse> {
    this.ensureConfigured();

    logger.info(`Fetching Figma file: ${fileKey}`);
    const response = await getFile(fileKey);

    logger.info(
      `Successfully fetched file: ${response.name} with ${Object.keys(response.components || {}).length} components`
    );
    return response;
  }

  /**
   * Get specific nodes from a file
   * @param fileKey Figma file key
   * @param nodeIds Array of node IDs to fetch
   * @returns Object with node data
   */
  async getNodes(fileKey: string, nodeIds: string[]): Promise<Record<string, FigmaNode>> {
    this.ensureConfigured();

    logger.info(`Fetching ${nodeIds.length} nodes from file: ${fileKey}`);
    const response = await getFileNodes(fileKey, nodeIds);

    const nodes: Record<string, FigmaNode> = {};
    Object.entries(response.nodes).forEach(([id, node]) => {
      nodes[id] = node.document;
    });

    logger.info(`Successfully fetched ${Object.keys(nodes).length} nodes`);
    return nodes;
  }

  /**
   * Get variables from a file
   * @param fileKey Figma file key
   * @returns Variables response
   */
  async getVariables(fileKey: string): Promise<FigmaVariablesResponse> {
    this.ensureConfigured();

    logger.info(`Fetching variables from file: ${fileKey}`);
    const response = await getVariables(fileKey);

    logger.info(`Successfully fetched variables`);
    return response;
  }

  /**
   * Get components from a file
   * @param fileKey Figma file key
   * @returns Object with component data
   */
  async getComponents(fileKey: string): Promise<Record<string, FigmaComponent>> {
    this.ensureConfigured();

    logger.info(`Fetching components from file: ${fileKey}`);
    const response = await getFile(fileKey);

    logger.info(`Found ${Object.keys(response.components || {}).length} components`);
    return response.components || {};
  }

  /**
   * Extract design tokens from Figma variables
   * @param variables Array of Figma variables
   * @returns Design tokens object
   */
  extractDesignTokens(variables: IFigmaVariable[]): {
    colors: Record<string, string>;
    typography: Record<string, unknown>;
    spacing: Record<string, string>;
    effects: Record<string, unknown>;
  } {
    const tokens = {
      colors: {} as Record<string, string>,
      typography: {} as Record<string, unknown>,
      spacing: {} as Record<string, string>,
      effects: {} as Record<string, unknown>,
    };

    for (const variable of variables) {
      const { name, type, value } = variable;

      if (name) {
        const tokenName = name.replace(/[/\s]/g, '_').toLowerCase();

        if (type === 'COLOR' && typeof value === 'string') {
          tokens.colors[tokenName] = value;
        } else if (type === 'FLOAT' && typeof value === 'number') {
          // Could be spacing, font size, etc.
          if (name.toLowerCase().includes('spacing') || name.toLowerCase().includes('space')) {
            tokens.spacing[tokenName] = `${value}px`;
          } else if (name.toLowerCase().includes('font') || name.toLowerCase().includes('text')) {
            tokens.typography[tokenName] = {
              value,
              unit: 'px',
            };
          }
        } else if (type === 'STRING' && typeof value === 'string') {
          tokens.typography[tokenName] = {
            value,
            type: 'string',
          };
        }
      }
    }

    logger.info(
      `Extracted ${Object.keys(tokens.colors).length} colors, ${Object.keys(tokens.typography).length} typography tokens, ${Object.keys(tokens.spacing).length} spacing tokens, ${Object.keys(tokens.effects).length} effect tokens`
    );
    return tokens;
  }

  /**
   * Validate Figma file key format
   * @param fileKey File key to validate
   * @returns True if valid format
   */
  validateFileKey(fileKey: string): boolean {
    // Figma file keys are typically 22 characters long and contain only alphanumeric characters
    const figmaKeyRegex = /^[a-zA-Z0-9]{22,}$/;
    return figmaKeyRegex.test(fileKey);
  }

  /**
   * Get rate limit information
   * @returns Rate limit information
   */
  getRateLimitInfo(): { limit: number; remaining: number; resetTime: number } {
    // TODO: Implement real rate limit tracking from API response headers
    // This should track actual rate limit headers from Figma API responses
    // For now, return Figma free tier hourly limits as placeholder
    return {
      limit: 2000,
      remaining: 1999,
      resetTime: Date.now() + 3600000,
    };
  }

  private ensureConfigured(): void {
    if (!this.isConfigured()) {
      throw new Error('Figma service is not configured. Please set FIGMA_ACCESS_TOKEN environment variable.');
    }
  }
}

// Export singleton instance for backward compatibility
export const figmaService = new FigmaService();
