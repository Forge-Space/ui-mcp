/**
 * Services Module - Centralized service layer for UIForge MCP
 *
 * This module provides a clean, testable interface for all major operations:
 * - Design context management
 * - Figma API integration
 * - Code generation orchestration
 * - Image and pattern analysis
 *
 * All services are exported as both classes and singleton instances for flexibility.
 */

// Service exports
export { DesignService, designService } from './design.service.js';
export { FigmaService, figmaService } from './figma.service.js';
export { GenerationService, generationService } from './generation.service.js';
export { AnalysisService, analysisService } from './analysis.service.js';

import { DesignService, designService } from './design.service.js';
import { FigmaService, figmaService } from './figma.service.js';
import { GenerationService, generationService } from './generation.service.js';
import { AnalysisService, analysisService } from './analysis.service.js';

// Type exports for convenience
export type {
  IDesignContext,
  IGeneratedFile,
  Framework,
  Architecture,
  StateManagement,
  IFigmaDesignToken,
  ITailwindMapping,
} from '../lib/types.js';

/**
 * Service container for dependency injection
 * Useful for testing and custom configurations
 */
export class ServiceContainer {
  private static instance: ServiceContainer;

  private services: Map<string, any> = new Map();

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  /**
   * Register a service instance
   * @param name Service name
   * @param service Service instance
   */
  register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  /**
   * Get a service instance
   * @param name Service name
   * @returns Service instance or throws if not found
   */
  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service '${name}' not found in container`);
    }
    return service as T;
  }

  /**
   * Check if a service is registered
   * @param name Service name
   * @returns True if service exists
   */
  has(name: string): boolean {
    return this.services.has(name);
  }

  /**
   * Remove a service from the container
   * @param name Service name
   */
  remove(name: string): void {
    this.services.delete(name);
  }

  /**
   * Clear all services
   */
  clear(): void {
    this.services.clear();
  }

  /**
   * Get all registered service names
   * @returns Array of service names
   */
  getRegisteredServices(): string[] {
    return Array.from(this.services.keys());
  }
}

/**
 * Initialize default services in the container
 * Call this during application startup
 */
export function initializeServices(): ServiceContainer {
  const container = ServiceContainer.getInstance();

  // Register default singleton instances
  container.register('design', designService);
  container.register('figma', figmaService);
  container.register('generation', generationService);
  container.register('analysis', analysisService);

  return container;
}

/**
 * Get all services as a convenient object
 * @returns Object with all service instances
 */
export function getServices(): {
  design: DesignService;
  figma: FigmaService;
  generation: GenerationService;
  analysis: AnalysisService;
} {
  const container = ServiceContainer.getInstance();

  return {
    design: container.get<DesignService>('design'),
    figma: container.get<FigmaService>('figma'),
    generation: container.get<GenerationService>('generation'),
    analysis: container.get<AnalysisService>('analysis'),
  };
}
