# MCP Server UI Generation Patterns

## 🎯 Overview

UI generation patterns for MCP (Model Context Protocol) servers, providing
AI-powered UI component generation, template management, and streaming
capabilities for the Forge ecosystem.

## 📋 Available Patterns

### UI Generation Engine

- **Component Generation**: AI-powered React/Next.js component creation
- **Template-Based Generation**: Structured template system for consistent
  output
- **Streaming Generation**: Real-time UI generation with progress updates
- **Context-Aware Generation**: Context-sensitive UI component creation

### AI Provider Integration

- **Multi-Provider Support**: OpenAI, Anthropic, and custom AI providers
- **Provider Abstraction**: Unified interface for different AI models
- **Fallback Mechanisms**: Graceful degradation when providers fail
- **Load Balancing**: Distribute requests across multiple providers

### Template Management

- **Template Versioning**: Version-controlled template management
- **Template Caching**: Intelligent template caching for performance
- **Template Validation**: Template syntax and structure validation
- **Dynamic Templates**: Runtime template modification and customization

### Streaming & Caching

- **Real-Time Streaming**: Progressive UI generation with updates
- **Response Caching**: Cache generated components for reuse
- **Progress Tracking**: Track generation progress and status
- **Error Handling**: Graceful error recovery and reporting

## 🔧 Implementation Examples

### UI Generation Engine

```typescript
// patterns/mcp-servers/ui-generation/ui-generation-engine.ts
import { EventEmitter } from 'events';

export interface UIComponentRequest {
  type: 'component' | 'page' | 'layout';
  framework: 'react' | 'nextjs' | 'vue';
  description: string;
  requirements?: string[];
  context?: Record<string, any>;
  template?: string;
}

export interface UIComponentResponse {
  id: string;
  type: string;
  framework: string;
  code: string;
  dependencies: string[];
  metadata: Record<string, any>;
  generatedAt: Date;
}

export class UIGenerationEngine extends EventEmitter {
  private aiProviders: Map<string, AIProvider> = new Map();
  private templateManager: TemplateManager;
  private cache: ComponentCache;

  constructor() {
    this.templateManager = new TemplateManager();
    this.cache = new ComponentCache();
    this.initializeProviders();
  }

  async generateComponent(
    request: UIComponentRequest
  ): Promise<UIComponentResponse> {
    const startTime = Date.now();
    const componentId = this.generateComponentId(request);

    try {
      // Check cache first
      const cached = await this.cache.get(request);
      if (cached) {
        this.emit('componentGenerated', cached);
        return cached;
      }

      // Generate component
      const response = await this.generateWithProvider(request);
      const component: UIComponentResponse = {
        id: componentId,
        type: request.type,
        framework: request.framework,
        code: response.code,
        dependencies: response.dependencies || [],
        metadata: {
          ...response.metadata,
          generationTime: Date.now() - startTime,
          provider: response.provider,
          template: request.template,
        },
        generatedAt: new Date(),
      };

      // Cache the result
      await this.cache.set(component);

      this.emit('componentGenerated', component);
      return component;
    } catch (error) {
      this.emit('generationError', { request, error });
      throw error;
    }
  }

  async generateComponentStreaming(
    request: UIComponentRequest
  ): Promise<AsyncIterable<UIComponentChunk>> {
    return this.generateStreamingWithProvider(request);
  }

  private async generateWithProvider(
    request: UIComponentRequest
  ): Promise<AIProviderResponse> {
    const provider = this.selectProvider(request);
    const template = await this.templateManager.getTemplate(
      request.framework,
      request.template
    );

    const prompt = this.buildPrompt(request, template);
    const response = await provider.generate(prompt);

    return response;
  }

  private async generateStreamingWithProvider(
    request: UIComponentRequest
  ): Promise<AsyncIterable<UIComponentChunk>> {
    const provider = this.selectProvider(request);
    const template = await this.templateManager.getTemplate(
      request.framework,
      request.template
    );
    const prompt = this.buildPrompt(request, template);

    return provider.generateStreaming(prompt);
  }

  private selectProvider(request: UIComponentRequest): AIProvider {
    // Provider selection logic based on request type and availability
    const availableProviders = Array.from(this.aiProviders.values()).filter(
      (provider) =>
        provider.isAvailable() && provider.supportsFramework(request.framework)
    );

    if (availableProviders.length === 0) {
      throw new Error('No available AI providers for this request');
    }

    // Select provider based on load balancing or priority
    return availableProviders[0];
  }

  private buildPrompt(request: UIComponentRequest, template: Template): string {
    return `
${template.prompt}

Component Details:
- Type: ${request.type}
- Framework: ${request.framework}
- Description: ${request.description}
- Requirements: ${request.requirements?.join(', ') || 'None'}
- Context: ${JSON.stringify(request.context || {}, null, 2)}

Please generate a ${request.framework} ${request.type} that meets these requirements.
    `.trim();
  }

  private generateComponentId(request: UIComponentRequest): string {
    const timestamp = Date.now();
    const hash = Buffer.from(
      `${request.type}-${request.framework}-${request.description}`
    ).toString('base64');
    return `${request.type}-${request.framework}-${hash.substring(0, 8)}-${timestamp}`;
  }

  private initializeProviders(): void {
    // Initialize AI providers
    this.aiProviders.set('openai', new OpenAIProvider());
    this.aiProviders.set('anthropic', new AnthropicProvider());
    this.aiProviders.set('custom', new CustomProvider());
  }
}
```

### AI Provider Abstraction

````typescript
// patterns/mcp-servers/ui-generation/ai-provider.ts
export interface AIProvider {
  name: string;
  isAvailable(): boolean;
  supportsFramework(framework: string): boolean;
  generate(prompt: string): Promise<AIProviderResponse>;
  generateStreaming(prompt: string): Promise<AsyncIterable<AIProviderChunk>>;
}

export interface AIProviderResponse {
  code: string;
  dependencies?: string[];
  metadata?: Record<string, any>;
  provider: string;
}

export interface AIProviderChunk {
  content: string;
  done: boolean;
  metadata?: Record<string, any>;
}

export class OpenAIProvider implements AIProvider {
  name = 'openai';
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model = 'gpt-4') {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY!;
    this.model = model;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  supportsFramework(framework: string): boolean {
    return ['react', 'nextjs', 'vue'].includes(framework);
  }

  async generate(prompt: string): Promise<AIProviderResponse> {
    // Implementation for OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const code = this.extractCode(data.choices[0].message.content);

    return {
      code,
      provider: this.name,
      metadata: {
        model: this.model,
        usage: data.usage,
      },
    };
  }

  async generateStreaming(
    prompt: string
  ): Promise<AsyncIterable<AIProviderChunk>> {
    // Implementation for OpenAI streaming API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      }),
    });

    return this.parseStreamingResponse(response);
  }

  private extractCode(content: string): string {
    // Extract code from AI response
    const codeBlockMatch = content.match(
      /```(?:typescript|javascript|jsx|tsx)\n([\s\S]*?)\n```/
    );
    return codeBlockMatch ? codeBlockMatch[1] : content;
  }

  private async *parseStreamingResponse(
    response: Response
  ): AsyncIterable<AIProviderChunk> {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body reader available');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.choices?.[0]?.delta?.content) {
              yield {
                content: data.choices[0].delta.content,
                done: false,
              };
            }
          } catch (error) {
            // Ignore parsing errors for streaming data
          }
        }
      }
    }
  }
}
````

### Template Management

```typescript
// patterns/mcp-servers/ui-generation/template-manager.ts
export interface Template {
  id: string;
  name: string;
  framework: string;
  type: string;
  prompt: string;
  variables: TemplateVariable[];
  examples: TemplateExample[];
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object';
  required: boolean;
  description: string;
  defaultValue?: any;
}

export interface TemplateExample {
  name: string;
  description: string;
  variables: Record<string, any>;
  expectedOutput: string;
}

export class TemplateManager {
  private templates = new Map<string, Template>();
  private templateCache = new Map<string, Template>();

  constructor() {
    this.loadDefaultTemplates();
  }

  async getTemplate(framework: string, templateId?: string): Promise<Template> {
    const cacheKey = `${framework}-${templateId || 'default'}`;

    if (this.templateCache.has(cacheKey)) {
      return this.templateCache.get(cacheKey)!;
    }

    const template = this.templates.get(cacheKey);
    if (!template) {
      throw new Error(`Template not found: ${cacheKey}`);
    }

    this.templateCache.set(cacheKey, template);
    return template;
  }

  async createTemplate(
    template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Template> {
    const id = this.generateTemplateId(template.framework, template.type);
    const now = new Date();

    const newTemplate: Template = {
      ...template,
      id,
      createdAt: now,
      updatedAt: now,
    };

    this.templates.set(id, newTemplate);
    this.templateCache.clear(); // Clear cache when templates change

    return newTemplate;
  }

  async updateTemplate(
    id: string,
    updates: Partial<Template>
  ): Promise<Template> {
    const existing = this.templates.get(id);
    if (!existing) {
      throw new Error(`Template not found: ${id}`);
    }

    const updated: Template = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };

    this.templates.set(id, updated);
    this.templateCache.clear();

    return updated;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    const deleted = this.templates.delete(id);
    if (deleted) {
      this.templateCache.clear();
    }
    return deleted;
  }

  listTemplates(framework?: string, type?: string): Template[] {
    return Array.from(this.templates.values()).filter((template) => {
      if (framework && template.framework !== framework) return false;
      if (type && template.type !== type) return false;
      return true;
    });
  }

  private generateTemplateId(framework: string, type: string): string {
    const timestamp = Date.now();
    return `${framework}-${type}-${timestamp}`;
  }

  private loadDefaultTemplates(): void {
    // Load default templates for different frameworks
    this.templates.set('react-component-default', {
      id: 'react-component-default',
      name: 'React Component Default',
      framework: 'react',
      type: 'component',
      prompt: `Generate a React component that meets the following requirements:

Component Type: {{type}}
Framework: React
Description: {{description}}
Requirements: {{requirements}}

Please follow these guidelines:
- Use TypeScript
- Include proper imports
- Use functional components with hooks
- Include PropTypes or TypeScript interfaces
- Add comments for complex logic
- Follow React best practices
- Include basic styling with CSS modules or styled-components

The component should be:
- Self-contained
- Reusable
- Well-documented
- Accessible
- Performant`,
      variables: [
        {
          name: 'type',
          type: 'string',
          required: true,
          description: 'Type of component (e.g., button, form, card)',
        },
        {
          name: 'description',
          type: 'string',
          required: true,
          description: 'Description of what the component should do',
        },
        {
          name: 'requirements',
          type: 'string',
          required: false,
          description: 'Specific requirements for the component',
        },
      ],
      examples: [
        {
          name: 'Button Component',
          description: 'A reusable button component with different variants',
          variables: {
            type: 'button',
            description: 'A button with primary and secondary variants',
            requirements: 'Should handle click events, show loading state',
          },
          expectedOutput:
            'React button component with variants and loading state',
        },
      ],
      version: '1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Add more default templates for Next.js, Vue, etc.
  }
}
```

### Component Caching

```typescript
// patterns/mcp-servers/ui-generation/component-cache.ts
export interface CacheEntry {
  component: UIComponentResponse;
  request: UIComponentRequest;
  createdAt: Date;
  expiresAt: Date;
  accessCount: number;
  lastAccessed: Date;
}

export class ComponentCache {
  private cache = new Map<string, CacheEntry>();
  private readonly defaultTTL: number = 30 * 60 * 1000; // 30 minutes
  private readonly maxEntries: number = 1000;

  async get(request: UIComponentRequest): Promise<UIComponentResponse | null> {
    const key = this.generateCacheKey(request);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (entry.expiresAt < new Date()) {
      this.cache.delete(key);
      return null;
    }

    // Update access tracking
    entry.accessCount++;
    entry.lastAccessed = new Date();

    return entry.component;
  }

  async set(
    component: UIComponentResponse,
    request: UIComponentRequest
  ): Promise<void> {
    const key = this.generateCacheKey(request);
    const ttl = this.calculateTTL(request);

    const entry: CacheEntry = {
      component,
      request,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + ttl),
      accessCount: 1,
      lastAccessed: new Date(),
    };

    this.cache.set(key, entry);
    this.enforceMaxSize();
  }

  async invalidate(request: UIComponentRequest): Promise<boolean> {
    const key = this.generateCacheKey(request);
    return this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  getStats(): {
    totalEntries: number;
    expiredEntries: number;
    averageAccessCount: number;
    oldestEntry: Date | null;
    newestEntry: Date | null;
  } {
    const entries = Array.from(this.cache.values());
    const now = new Date();
    const expiredEntries = entries.filter((entry) => entry.expiresAt < now);

    return {
      totalEntries: entries.length,
      expiredEntries: expiredEntries.length,
      averageAccessCount:
        entries.length > 0
          ? entries.reduce((sum, entry) => sum + entry.accessCount, 0) /
            entries.length
          : 0,
      oldestEntry:
        entries.length > 0
          ? new Date(Math.min(...entries.map((e) => e.createdAt.getTime())))
          : null,
      newestEntry:
        entries.length > 0
          ? new Date(Math.max(...entries.map((e) => e.createdAt.getTime())))
          : null,
    };
  }

  private generateCacheKey(request: UIComponentRequest): string {
    const keyData = {
      type: request.type,
      framework: request.framework,
      description: request.description,
      requirements: request.requirements,
      template: request.template,
    };

    return Buffer.from(JSON.stringify(keyData)).toString('base64');
  }

  private calculateTTL(request: UIComponentRequest): number {
    // Calculate TTL based on request characteristics
    let ttl = this.defaultTTL;

    // Shorter TTL for complex requests
    if (request.requirements && request.requirements.length > 5) {
      ttl = 15 * 60 * 1000; // 15 minutes
    }

    // Longer TTL for simple, common requests
    if (!request.requirements || request.requirements.length === 0) {
      ttl = 60 * 60 * 1000; // 1 hour
    }

    return ttl;
  }

  private enforceMaxSize(): void {
    if (this.cache.size <= this.maxEntries) {
      return;
    }

    // Remove least recently used entries
    const entries = Array.from(this.cache.entries()).sort(
      (a, b) => a[1].lastAccessed.getTime() - b[1].lastAccessed.getTime()
    );

    const toRemove = entries.slice(0, entries.length - this.maxEntries);
    toRemove.forEach(([key]) => this.cache.delete(key));
  }
}
```

## 🚀 Quick Start

### Basic UI Generation Setup

```typescript
// Setup UI generation in your MCP server
import { UIGenerationEngine } from './patterns/mcp-servers/ui-generation/ui-generation-engine';

const uiEngine = new UIGenerationEngine();

// Generate a React component
const component = await uiEngine.generateComponent({
  type: 'component',
  framework: 'react',
  description: 'A reusable button component with loading state',
  requirements: ['handle click events', 'show loading state', 'accessible'],
});

console.log('Generated component:', component.code);
```

### Streaming Generation

```typescript
// Generate component with streaming updates
const stream = uiEngine.generateComponentStreaming({
  type: 'page',
  framework: 'nextjs',
  description: 'A dashboard page with charts and data visualization',
});

for await (const chunk of stream) {
  console.log('Chunk:', chunk.content);
  if (chunk.done) {
    console.log('Generation completed!');
  }
}
```

## 📊 Performance Optimization

### Caching Strategy

- **Request Caching**: Cache frequently requested components
- **Template Caching**: Cache parsed templates for reuse
- **Provider Caching**: Cache AI provider responses
- **Memory Management**: Enforce cache size limits

### Streaming Benefits

- **Progressive Updates**: Real-time generation feedback
- **Large Component Support**: Handle complex components efficiently
- **Error Recovery**: Partial generation with error handling
- **User Experience**: Better perceived performance

### Load Balancing

- **Provider Distribution**: Distribute requests across AI providers
- **Failover Support**: Graceful degradation when providers fail
- **Performance Monitoring**: Track provider performance metrics
- **Cost Optimization**: Optimize provider usage based on cost

## 🔧 Integration Examples

### MCP Server Integration

```typescript
// Integrate UI generation with MCP server
export class MCPUIServer {
  private uiEngine: UIGenerationEngine;

  constructor() {
    this.uiEngine = new UIGenerationEngine();
  }

  async handleGenerateComponent(request: MCPRequest): Promise<MCPResponse> {
    try {
      const component = await this.uiEngine.generateComponent(request.params);

      return {
        success: true,
        data: {
          componentId: component.id,
          code: component.code,
          dependencies: component.dependencies,
          metadata: component.metadata,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
```

### Template Customization

```typescript
// Create custom templates for specific use cases
const customTemplate = await templateManager.createTemplate({
  name: 'E-commerce Product Card',
  framework: 'react',
  type: 'component',
  prompt:
    'Generate an e-commerce product card with image, title, price, and add to cart functionality...',
  variables: [
    { name: 'currency', type: 'string', required: false, defaultValue: 'USD' },
    {
      name: 'showRating',
      type: 'boolean',
      required: false,
      defaultValue: true,
    },
  ],
});
```

This UI generation pattern provides a powerful, flexible foundation for
AI-powered UI component generation in the Forge MCP ecosystem! 🚀
