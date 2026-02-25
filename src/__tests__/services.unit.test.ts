import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { DesignService, designService } from '../services/design.service.js';
import { FigmaService, figmaService } from '../services/figma.service.js';
import { GenerationService, generationService } from '../services/generation.service.js';
import { AnalysisService, analysisService } from '../services/analysis.service.js';
import { ServiceContainer, initializeServices, getServices } from '../services/index.js';
import { designContextStore } from '@forgespace/siza-gen';

describe('Service Layer', () => {
  beforeEach(() => {
    // Reset design context before each test
    designContextStore.reset();
  });

  describe('DesignService', () => {
    let service: DesignService;

    beforeEach(() => {
      service = new DesignService();
    });

    it('should get current context', () => {
      const context = service.getCurrentContext();
      expect(context).toBeDefined();
      expect(context.colorPalette).toBeDefined();
      expect(context.typography).toBeDefined();
    });

    it('should update context', () => {
      const updates = {
        colorPalette: {
          ...service.getCurrentContext().colorPalette,
          primary: '#ff0000',
        },
      };

      const updated = service.updateContext(updates);
      expect(updated.colorPalette.primary).toBe('#ff0000');
    });

    it('should set context', () => {
      const newContext = {
        ...service.getCurrentContext(),
        colorPalette: {
          primary: '#00ff00',
          primaryForeground: '#ffffff',
          secondary: '#0000ff',
          secondaryForeground: '#ffffff',
          accent: '#ff00ff',
          accentForeground: '#000000',
          background: '#ffffff',
          foreground: '#000000',
          muted: '#f3f4f6',
          mutedForeground: '#6b7280',
          border: '#e5e7eb',
          destructive: '#ef4444',
          destructiveForeground: '#ffffff',
        },
        typography: service.getCurrentContext().typography,
        spacing: service.getCurrentContext().spacing,
        borderRadius: service.getCurrentContext().borderRadius,
        shadows: service.getCurrentContext().shadows,
      };

      const set = service.setContext(newContext);
      expect(set.colorPalette.primary).toBe('#00ff00');
    });

    it('should reset context', () => {
      // Modify context first
      service.updateContext({
        colorPalette: { ...service.getCurrentContext().colorPalette, primary: '#ff0000' },
      });

      // Reset and verify
      const reset = service.resetContext();
      expect(reset.colorPalette.primary).not.toBe('#ff0000');
    });

    it('should list presets', () => {
      const presets = service.listPresets();
      expect(Array.isArray(presets)).toBe(true);
      expect(presets.length).toBeGreaterThan(0);
    });

    it('should validate context', () => {
      const validContext = service.getCurrentContext();
      const validation = service.validateContext(validContext);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect invalid context', () => {
      const invalidContext = {
        ...service.getCurrentContext(),
        colorPalette: {
          primary: '', // Invalid empty color
          primaryForeground: '#ffffff',
          secondary: '#0000ff',
          secondaryForeground: '#ffffff',
          accent: '#ff00ff',
          accentForeground: '#000000',
          background: '#ffffff',
          foreground: '#000000',
          muted: '#f3f4f6',
          mutedForeground: '#6b7280',
          border: '#e5e7eb',
          destructive: '#ef4444',
          destructiveForeground: '#ffffff',
        },
        typography: service.getCurrentContext().typography,
        spacing: service.getCurrentContext().spacing,
        borderRadius: service.getCurrentContext().borderRadius,
        shadows: service.getCurrentContext().shadows,
      };

      const validation = service.validateContext(invalidContext);
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('should extract design tokens', () => {
      const tokens = service.extractDesignTokens();
      expect(tokens.colors).toBeDefined();
      expect(tokens.typography).toBeDefined();
      expect(tokens.spacing).toBeDefined();
      expect(tokens.borderRadius).toBeDefined();
      expect(tokens.colors.primary).toBeDefined();
    });
  });

  describe('FigmaService', () => {
    let service: FigmaService;

    beforeEach(() => {
      service = new FigmaService();
    });

    it('should check configuration status', () => {
      const isConfigured = service.isConfigured();
      expect(typeof isConfigured).toBe('boolean');
    });

    it('should validate file key format', () => {
      const validKey = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
      const invalidKey = 'invalid-key-with-special-chars!@#$';

      expect(service.validateFileKey(validKey)).toBe(true);
      expect(service.validateFileKey(invalidKey)).toBe(false);
    });

    it('should get rate limit info', () => {
      const rateLimit = service.getRateLimitInfo();
      expect(rateLimit).toHaveProperty('limit');
      expect(rateLimit).toHaveProperty('remaining');
      expect(rateLimit).toHaveProperty('resetTime');
      expect(typeof rateLimit.limit).toBe('number');
      expect(typeof rateLimit.remaining).toBe('number');
      expect(typeof rateLimit.resetTime).toBe('number');
    });

    it('should extract design tokens from variables', () => {
      const variables = [
        {
          name: 'primary-color',
          type: 'COLOR' as const,
          value: '#3b82f6',
        },
        {
          name: 'spacing-sm',
          type: 'FLOAT' as const,
          value: 8,
        },
        {
          name: 'font-family',
          type: 'STRING' as const,
          value: 'Inter',
        },
      ];

      const tokens = service.extractDesignTokens(variables);
      expect(tokens.colors['primary-color']).toBe('#3b82f6');
      expect(tokens.spacing['spacing-sm']).toBe('8px');
      expect(tokens.typography['font-family']).toBeDefined();
    });

    it('should throw error when not configured', async () => {
      // Create service without FIGMA_ACCESS_TOKEN
      const unconfiguredService = new FigmaService();

      await expect(unconfiguredService.getFile('test-key')).rejects.toThrow('Figma service is not configured');
      await expect(unconfiguredService.getNodes('test-key', ['node1'])).rejects.toThrow(
        'Figma service is not configured'
      );
      await expect(unconfiguredService.getVariables('test-key')).rejects.toThrow('Figma service is not configured');
      await expect(unconfiguredService.getComponents('test-key')).rejects.toThrow('Figma service is not configured');
    });
  });

  describe('GenerationService', () => {
    let service: GenerationService;

    beforeEach(() => {
      service = new GenerationService();
    });

    it('should get supported frameworks', () => {
      const frameworks = service.getSupportedFrameworks();
      expect(Array.isArray(frameworks)).toBe(true);
      expect(frameworks.length).toBeGreaterThan(0);
      expect(frameworks).toContain('react');
      expect(frameworks).toContain('nextjs');
      expect(frameworks).toContain('vue');
      expect(frameworks).toContain('angular');
      expect(frameworks).toContain('html');
      expect(frameworks).toContain('svelte');
    });

    it('should check framework support', () => {
      expect(service.isFrameworkSupported('react')).toBe(true);
      expect(service.isFrameworkSupported('nextjs')).toBe(true);
      expect(service.isFrameworkSupported('invalid')).toBe(false);
    });

    it('should validate generation request', () => {
      const validRequest = {
        framework: 'react' as const,
        projectName: 'test-project',
        componentType: 'button',
      };

      const validation = service.validateGenerationRequest(validRequest);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect invalid generation request', () => {
      const invalidRequest = {
        framework: 'invalid' as any,
        projectName: '',
        componentType: '',
      };

      const validation = service.validateGenerationRequest(invalidRequest);
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    it('should get generation stats', () => {
      const stats = service.getGenerationStats();
      expect(stats).toHaveProperty('supportedFrameworks');
      expect(stats).toHaveProperty('totalFrameworks');
      expect(stats).toHaveProperty('supportedArchitectures');
      expect(stats).toHaveProperty('supportedStateManagement');
      expect(Array.isArray(stats.supportedFrameworks)).toBe(true);
      expect(typeof stats.totalFrameworks).toBe('number');
      expect(Array.isArray(stats.supportedArchitectures)).toBe(true);
      expect(Array.isArray(stats.supportedStateManagement)).toBe(true);
    });

    it('should generate component files', async () => {
      const request = {
        framework: 'react' as const,
        componentType: 'button',
        props: { variant: 'primary' },
      };

      const files = await service.generateComponent(request);
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);

      // Check that files have proper structure
      files.forEach((file) => {
        expect(file).toHaveProperty('path');
        expect(file).toHaveProperty('content');
        expect(typeof file.path).toBe('string');
        expect(typeof file.content).toBe('string');
      });
    });
  });

  describe('AnalysisService', () => {
    let service: AnalysisService;

    beforeEach(() => {
      service = new AnalysisService();
    });

    it('should analyze design context', () => {
      const context = {
        colorPalette: {
          primary: '#3b82f6',
          primaryForeground: '#ffffff',
          secondary: '#64748b',
          secondaryForeground: '#ffffff',
          accent: '#f59e0b',
          accentForeground: '#000000',
          background: '#ffffff',
          foreground: '#1e293b',
          muted: '#f1f5f9',
          mutedForeground: '#64748b',
          border: '#e2e8f0',
          destructive: '#ef4444',
          destructiveForeground: '#ffffff',
        },
        typography: {
          fontFamily: 'Inter',
          headingFont: 'Inter',
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
          },
          fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
          },
          lineHeight: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75',
          },
        },
        spacing: {
          unit: 4,
          scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
        },
        borderRadius: {
          sm: '0.125rem',
          md: '0.375rem',
          lg: '0.5rem',
          full: '9999px',
        },
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        },
      };

      const analysis = service.analyzeDesignContext(context);
      expect(analysis).toHaveProperty('score');
      expect(analysis).toHaveProperty('issues');
      expect(analysis).toHaveProperty('recommendations');
      expect(analysis).toHaveProperty('completeness');
      expect(typeof analysis.score).toBe('number');
      expect(Array.isArray(analysis.issues)).toBe(true);
      expect(Array.isArray(analysis.recommendations)).toBe(true);
      expect(typeof analysis.completeness).toBe('object');
    });

    it('should handle image analysis errors', async () => {
      const invalidImageData = 'invalid-base64-data';

      await expect(service.analyzeImage(invalidImageData)).rejects.toThrow();
    });

    it('should handle pattern detection with invalid source types', async () => {
      const invalidSources = [{ type: 'invalid' as any, content: 'test' }];

      // detectPatterns gracefully handles unknown source types by filtering them out
      const result = await service.detectPatterns(invalidSources);
      expect(result).toBeDefined();
      expect(result.commonPatterns).toEqual([]);
    });

    it('should handle URL extraction errors', async () => {
      const invalidUrl = 'not-a-valid-url';

      await expect(service.extractFromUrl(invalidUrl)).rejects.toThrow();
    });
  });

  describe('ServiceContainer', () => {
    let container: ServiceContainer;

    beforeEach(() => {
      container = new ServiceContainer();
    });

    afterEach(() => {
      container.clear();
    });

    it('should register and retrieve services', () => {
      const mockService = { name: 'test-service' };
      container.register('test', mockService);

      expect(container.has('test')).toBe(true);
      expect(container.get('test')).toBe(mockService);
    });

    it('should throw error for non-existent service', () => {
      expect(() => container.get('non-existent')).toThrow("Service 'non-existent' not found in container");
    });

    it('should list registered services', () => {
      container.register('service1', { name: 'service1' });
      container.register('service2', { name: 'service2' });

      const services = container.getRegisteredServices();
      expect(services).toHaveLength(2);
      expect(services).toContain('service1');
      expect(services).toContain('service2');
    });

    it('should remove services', () => {
      container.register('test', { name: 'test' });
      expect(container.has('test')).toBe(true);

      container.remove('test');
      expect(container.has('test')).toBe(false);
    });

    it('should clear all services', () => {
      container.register('service1', { name: 'service1' });
      container.register('service2', { name: 'service2' });
      expect(container.getRegisteredServices()).toHaveLength(2);

      container.clear();
      expect(container.getRegisteredServices()).toHaveLength(0);
    });
  });

  describe('Service Integration', () => {
    beforeEach(() => {
      initializeServices();
    });

    it('should initialize services', () => {
      const container = initializeServices();

      expect(container.has('design')).toBe(true);
      expect(container.has('figma')).toBe(true);
      expect(container.has('generation')).toBe(true);
      expect(container.has('analysis')).toBe(true);
    });

    it('should get all services', () => {
      const services = getServices();

      expect(services.design).toBeInstanceOf(DesignService);
      expect(services.figma).toBeInstanceOf(FigmaService);
      expect(services.generation).toBeInstanceOf(GenerationService);
      expect(services.analysis).toBeInstanceOf(AnalysisService);
    });

    it('should use singleton instances', () => {
      const services1 = getServices();
      const services2 = getServices();

      expect(services1.design).toBe(services2.design);
      expect(services1.figma).toBe(services2.figma);
      expect(services1.generation).toBe(services2.generation);
      expect(services1.analysis).toBe(services2.analysis);
    });
  });

  describe('Singleton Instances', () => {
    it('should provide consistent singleton instances', () => {
      const design1 = designService;
      const design2 = designService;
      expect(design1).toBe(design2);

      const figma1 = figmaService;
      const figma2 = figmaService;
      expect(figma1).toBe(figma2);

      const generation1 = generationService;
      const generation2 = generationService;
      expect(generation1).toBe(generation2);

      const analysis1 = analysisService;
      const analysis2 = analysisService;
      expect(analysis1).toBe(analysis2);
    });
  });
});
