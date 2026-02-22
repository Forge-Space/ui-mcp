# MCP Server AI Provider Patterns

## 🎯 Overview

AI provider patterns for MCP (Model Context Protocol) servers, providing unified
abstraction for multiple AI providers, intelligent failover, cost optimization,
and seamless integration with the Forge MCP ecosystem.

## 📋 Available Patterns

### Provider Abstraction

- **Unified Interface**: Common interface for all AI providers
- **Provider Registry**: Dynamic provider registration and discovery
- **Provider Configuration**: Centralized provider management
- **Provider Health Checking**: Monitor provider availability and performance
- **Provider Metrics**: Track provider usage and performance

### Multi-Provider Support

- **OpenAI Provider**: GPT models with full feature support
- **Anthropic Provider**: Claude models with advanced capabilities
- **Custom Provider**: Extensible framework for custom AI providers
- **Local Provider**: Support for local AI models and services
- **Hybrid Provider**: Combine multiple providers for optimal results

### Failover & Load Balancing

- **Automatic Failover**: Switch providers when one fails
- **Load Balancing**: Distribute requests across providers
- **Circuit Breaking**: Stop using failing providers temporarily
- **Retry Logic**: Intelligent retry strategies for transient failures
- **Performance-Based Routing**: Route to fastest responding providers

### Cost Optimization

- **Cost Tracking**: Monitor API costs per provider
- **Budget Management**: Set and enforce spending limits
- **Provider Selection**: Choose optimal provider based on cost/quality
- **Token Optimization**: Minimize token usage for cost efficiency
- **Usage Analytics**: Track and optimize usage patterns

## 🔧 Implementation Examples

### AI Provider Manager

```typescript
// patterns/mcp-servers/ai-providers/ai-provider-manager.ts
import { EventEmitter } from 'events';

export interface AIProvider {
  name: string;
  type: ProviderType;
  isAvailable(): boolean;
  supportsModel(model: string): boolean;
  generate(
    prompt: string,
    options?: GenerateOptions
  ): Promise<GenerateResponse>;
  generateStreaming(
    prompt: string,
    options?: GenerateOptions
  ): Promise<AsyncIterable<GenerateChunk>>;
  estimateTokens(text: string): number;
  getCost(usage: TokenUsage): number;
  getMetrics(): ProviderMetrics;
}

export enum ProviderType {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  CUSTOM = 'custom',
  LOCAL = 'local',
  HYBRID = 'hybrid',
}

export interface GenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
  stream?: boolean;
}

export interface GenerateResponse {
  content: string;
  model: string;
  usage: TokenUsage;
  provider: string;
  metadata?: Record<string, any>;
}

export interface GenerateChunk {
  content: string;
  done: boolean;
  model: string;
  usage?: TokenUsage;
  provider: string;
  metadata?: Record<string, any>;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface ProviderMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  totalCost: number;
  totalTokens: number;
  lastUsed: Date;
  uptime: number;
}

export interface ProviderConfig {
  name: string;
  type: ProviderType;
  enabled: boolean;
  priority: number;
  weight: number;
  maxRequestsPerMinute?: number;
  maxTokensPerMinute?: number;
  costLimit?: number;
  apiKey?: string;
  endpoint?: string;
  models: ModelConfig[];
  healthCheck?: HealthCheckConfig;
}

export interface ModelConfig {
  name: string;
  displayName: string;
  maxTokens: number;
  costPerToken: number;
  supported: boolean;
  features: string[];
}

export interface HealthCheckConfig {
  enabled: boolean;
  interval: number;
  timeout: number;
  endpoint: string;
}

export class AIProviderManager extends EventEmitter {
  private providers = new Map<string, AIProvider>();
  private configs = new Map<string, ProviderConfig>();
  private loadBalancer: ProviderLoadBalancer;
  private circuitBreaker: CircuitBreaker;
  private costTracker: CostTracker;
  private metricsCollector: MetricsCollector;

  constructor() {
    super();
    this.loadBalancer = new ProviderLoadBalancer();
    this.circuitBreaker = new CircuitBreaker();
    this.costTracker = new CostTracker();
    this.metricsCollector = new MetricsCollector();
  }

  registerProvider(config: ProviderConfig): void {
    let provider: AIProvider;

    switch (config.type) {
      case ProviderType.OPENAI:
        provider = new OpenAIProvider(config);
        break;
      case ProviderType.ANTHROPIC:
        provider = new AnthropicProvider(config);
        break;
      case ProviderType.CUSTOM:
        provider = new CustomProvider(config);
        break;
      case ProviderType.LOCAL:
        provider = new LocalProvider(config);
        break;
      case ProviderType.HYBRID:
        provider = new HybridProvider(config);
        break;
      default:
        throw new Error(`Unsupported provider type: ${config.type}`);
    }

    this.providers.set(config.name, provider);
    this.configs.set(config.name, config);

    // Setup health checking
    if (config.healthCheck?.enabled) {
      this.setupHealthCheck(config.name, config.healthCheck);
    }

    this.emit('providerRegistered', config.name, provider);
  }

  unregisterProvider(providerName: string): boolean {
    const provider = this.providers.get(providerName);
    if (!provider) return false;

    this.providers.delete(providerName);
    this.configs.delete(providerName);

    this.emit('providerUnregistered', providerName);
    return true;
  }

  async generate(
    prompt: string,
    options?: GenerateOptions,
    preferredProvider?: string
  ): Promise<GenerateResponse> {
    const startTime = Date.now();

    try {
      // Select provider
      const provider = await this.selectProvider(
        options?.model,
        preferredProvider
      );

      if (!provider) {
        throw new Error('No available AI providers');
      }

      // Check circuit breaker
      if (this.circuitBreaker.isOpen(provider.name)) {
        throw new Error(`Provider ${provider.name} is circuit broken`);
      }

      // Check rate limits
      if (!this.checkRateLimits(provider.name)) {
        throw new Error(`Rate limit exceeded for provider ${provider.name}`);
      }

      // Generate response
      const response = await provider.generate(prompt, options);

      // Update metrics
      const duration = Date.now() - startTime;
      this.updateMetrics(provider.name, true, duration, response.usage);

      // Track costs
      const cost = provider.getCost(response.usage);
      this.costTracker.trackCost(provider.name, cost, response.usage);

      // Update circuit breaker
      this.circuitBreaker.recordSuccess(provider.name);

      this.emit('generationCompleted', provider.name, response, duration);

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Update metrics for failure
      if (preferredProvider) {
        this.updateMetrics(preferredProvider, false, duration);
        this.circuitBreaker.recordFailure(preferredProvider);
      }

      this.emit('generationFailed', preferredProvider, error, duration);

      throw error;
    }
  }

  async generateStreaming(
    prompt: string,
    options?: GenerateOptions,
    preferredProvider?: string
  ): Promise<AsyncIterable<GenerateChunk>> {
    const startTime = Date.now();

    try {
      // Select provider
      const provider = await this.selectProvider(
        options?.model,
        preferredProvider
      );

      if (!provider) {
        throw new Error('No available AI providers');
      }

      // Check circuit breaker
      if (this.circuitBreaker.isOpen(provider.name)) {
        throw new Error(`Provider ${provider.name} is circuit broken`);
      }

      // Check rate limits
      if (!this.checkRateLimits(provider.name)) {
        throw new Error(`Rate limit exceeded for provider ${provider.name}`);
      }

      // Generate streaming response
      const stream = provider.generateStreaming(prompt, options);

      // Wrap stream to track metrics
      return this.wrapStream(provider.name, stream, startTime);
    } catch (error) {
      const duration = Date.now() - startTime;

      if (preferredProvider) {
        this.updateMetrics(preferredProvider, false, duration);
        this.circuitBreaker.recordFailure(preferredProvider);
      }

      this.emit('generationFailed', preferredProvider, error, duration);

      throw error;
    }
  }

  private async selectProvider(
    model?: string,
    preferredProvider?: string
  ): Promise<AIProvider | null> {
    // If preferred provider is specified and available, use it
    if (preferredProvider) {
      const provider = this.providers.get(preferredProvider);
      if (
        provider &&
        provider.isAvailable() &&
        (!model || provider.supportsModel(model))
      ) {
        return provider;
      }
    }

    // Get available providers that support the model
    const availableProviders = Array.from(this.providers.values())
      .filter(
        (provider) =>
          provider.isAvailable() && (!model || provider.supportsModel(model))
      )
      .map((provider) => ({
        provider,
        config: this.configs.get(provider.name)!,
      }))
      .filter(({ config }) => config.enabled);

    if (availableProviders.length === 0) {
      return null;
    }

    // Use load balancer to select best provider
    const selected = this.loadBalancer.selectProvider(availableProviders);
    return selected.provider;
  }

  private async *wrapStream(
    providerName: string,
    stream: AsyncIterable<GenerateChunk>,
    startTime: number
  ): AsyncIterable<GenerateChunk> {
    let totalUsage: TokenUsage | undefined;
    let hasError = false;

    try {
      for await (const chunk of stream) {
        totalUsage = chunk.usage;
        yield chunk;
      }
    } catch (error) {
      hasError = true;
      const duration = Date.now() - startTime;
      this.updateMetrics(providerName, false, duration);
      this.circuitBreaker.recordFailure(providerName);
      throw error;
    }

    if (!hasError && totalUsage) {
      const duration = Date.now() - startTime;
      this.updateMetrics(providerName, true, duration, totalUsage);

      const provider = this.providers.get(providerName)!;
      const cost = provider.getCost(totalUsage);
      this.costTracker.trackCost(providerName, cost, totalUsage);

      this.circuitBreaker.recordSuccess(providerName);
    }
  }

  private checkRateLimits(providerName: string): boolean {
    const config = this.configs.get(providerName);
    if (!config) return false;

    // Check request rate limit
    if (config.maxRequestsPerMinute) {
      const metrics = this.metricsCollector.getProviderMetrics(providerName);
      const requestsPerMinute =
        this.metricsCollector.getRequestsPerMinute(providerName);

      if (requestsPerMinute >= config.maxRequestsPerMinute) {
        return false;
      }
    }

    // Check token rate limit
    if (config.maxTokensPerMinute) {
      const tokensPerMinute =
        this.metricsCollector.getTokensPerMinute(providerName);

      if (tokensPerMinute >= config.maxTokensPerMinute) {
        return false;
      }
    }

    // Check cost limit
    if (config.costLimit) {
      const currentCost = this.costTracker.getProviderCost(providerName);

      if (currentCost >= config.costLimit) {
        return false;
      }
    }

    return true;
  }

  private updateMetrics(
    providerName: string,
    success: boolean,
    duration: number,
    usage?: TokenUsage
  ): void {
    this.metricsCollector.recordRequest(providerName, success, duration, usage);
  }

  private setupHealthCheck(
    providerName: string,
    config: HealthCheckConfig
  ): void {
    const interval = setInterval(async () => {
      const provider = this.providers.get(providerName);
      if (!provider) return;

      try {
        const isHealthy = await this.checkProviderHealth(provider);

        if (!isHealthy) {
          this.emit('providerUnhealthy', providerName);
        }
      } catch (error) {
        this.emit('providerHealthCheckFailed', providerName, error);
      }
    }, config.interval);

    // Store interval for cleanup
    this.metricsCollector.setHealthCheckInterval(providerName, interval);
  }

  private async checkProviderHealth(provider: AIProvider): Promise<boolean> {
    // Simple health check - try to generate a minimal response
    try {
      await provider.generate('Hello', { maxTokens: 1 });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Public API methods
  getProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  getProviderConfig(providerName: string): ProviderConfig | null {
    return this.configs.get(providerName) || null;
  }

  getProviderMetrics(providerName: string): ProviderMetrics | null {
    return this.metricsCollector.getProviderMetrics(providerName);
  }

  getAvailableModels(model?: string): ModelConfig[] {
    const models: ModelConfig[] = [];

    for (const [name, provider] of this.providers.entries()) {
      if (!provider.isAvailable()) continue;

      const config = this.configs.get(name);
      if (!config || !config.enabled) continue;

      for (const modelConfig of config.models) {
        if (!modelConfig.supported) continue;
        if (model && modelConfig.name !== model) continue;

        models.push({
          ...modelConfig,
          provider: name,
        });
      }
    }

    return models;
  }

  getTotalCost(): number {
    return this.costTracker.getTotalCost();
  }

  getCostByProvider(): Record<string, number> {
    return this.costTracker.getCostByProvider();
  }

  getUsageStats(): UsageStats {
    return this.metricsCollector.getUsageStats();
  }

  async shutdown(): Promise<void> {
    // Clear health check intervals
    this.metricsCollector.clearAllHealthCheckIntervals();

    // Emit shutdown event
    this.emit('shutdown');
  }
}
```

### OpenAI Provider Implementation

```typescript
// patterns/mcp-servers/ai-providers/openai-provider.ts
export class OpenAIProvider implements AIProvider {
  name: string;
  type = ProviderType.OPENAI;
  private apiKey: string;
  private endpoint: string;
  private models: Map<string, ModelConfig>;
  private metrics: ProviderMetrics;

  constructor(config: ProviderConfig) {
    this.name = config.name;
    this.apiKey = config.apiKey!;
    this.endpoint = config.endpoint || 'https://api.openai.com/v1';
    this.models = new Map();
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      totalCost: 0,
      totalTokens: 0,
      lastUsed: new Date(),
      uptime: 0,
    };

    // Initialize models
    for (const modelConfig of config.models) {
      this.models.set(modelConfig.name, modelConfig);
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  supportsModel(model: string): boolean {
    const modelConfig = this.models.get(model);
    return modelConfig?.supported || false;
  }

  async generate(
    prompt: string,
    options?: GenerateOptions
  ): Promise<GenerateResponse> {
    const startTime = Date.now();
    this.metrics.totalRequests++;

    try {
      const model = options?.model || 'gpt-4';
      const modelConfig = this.models.get(model);

      if (!modelConfig) {
        throw new Error(`Model ${model} not supported`);
      }

      const response = await fetch(`${this.endpoint}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: options?.temperature || 0.7,
          max_tokens: options?.maxTokens || modelConfig.maxTokens,
          top_p: options?.topP,
          frequency_penalty: options?.frequencyPenalty,
          presence_penalty: options?.presencePenalty,
          stop: options?.stop,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `OpenAI API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const usage = this.parseUsage(data.usage);

      this.metrics.successfulRequests++;
      this.metrics.totalTokens += usage.totalTokens;
      this.metrics.lastUsed = new Date();
      this.metrics.averageResponseTime = this.updateAverageResponseTime(
        Date.now() - startTime
      );

      return {
        content,
        model,
        usage,
        provider: this.name,
        metadata: {
          finishReason: data.choices[0].finish_reason,
          promptTokens: usage.promptTokens,
          completionTokens: usage.completionTokens,
        },
      };
    } catch (error) {
      this.metrics.failedRequests++;
      throw error;
    }
  }

  async generateStreaming(
    prompt: string,
    options?: GenerateOptions
  ): Promise<AsyncIterable<GenerateChunk>> {
    const model = options?.model || 'gpt-4';
    const modelConfig = this.models.get(model);

    if (!modelConfig) {
      throw new Error(`Model ${model} not supported`);
    }

    const response = await fetch(`${this.endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || modelConfig.maxTokens,
        top_p: options?.topP,
        frequency_penalty: options?.frequencyPenalty,
        presence_penalty: options?.presencePenalty,
        stop: options?.stop,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`
      );
    }

    return this.parseStreamingResponse(response, model);
  }

  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  getCost(usage: TokenUsage): number {
    // Calculate cost based on token usage
    let totalCost = 0;

    for (const [modelName, modelConfig] of this.models.entries()) {
      // This is simplified - in reality you'd need to know which model was used
      totalCost += usage.totalTokens * modelConfig.costPerToken;
    }

    return totalCost;
  }

  getMetrics(): ProviderMetrics {
    return { ...this.metrics };
  }

  private parseUsage(usage: any): TokenUsage {
    return {
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
    };
  }

  private async *parseStreamingResponse(
    response: Response,
    model: string
  ): AsyncIterable<GenerateChunk> {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body reader available');

    const decoder = new TextDecoder();
    let buffer = '';
    let totalUsage: TokenUsage | undefined;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          if (data === '[DONE]') {
            yield {
              content: '',
              done: true,
              model,
              usage: totalUsage,
              provider: this.name,
            };
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';

            if (parsed.usage) {
              totalUsage = this.parseUsage(parsed.usage);
            }

            yield {
              content,
              done: false,
              model,
              provider: this.name,
              metadata: {
                finishReason: parsed.choices?.[0]?.finish_reason,
              },
            };
          } catch (error) {
            // Ignore parsing errors for streaming data
          }
        }
      }
    }
  }

  private updateAverageResponseTime(newTime: number): number {
    if (this.metrics.totalRequests === 0) return newTime;

    const totalRequests = this.metrics.totalRequests;
    const currentAverage = this.metrics.averageResponseTime;

    return (currentAverage * (totalRequests - 1) + newTime) / totalRequests;
  }
}
```

### Load Balancer Implementation

```typescript
// patterns/mcp-servers/ai-providers/load-balancer.ts
export interface ProviderInstance {
  provider: AIProvider;
  config: ProviderConfig;
}

export class ProviderLoadBalancer {
  selectProvider(providers: ProviderInstance[]): ProviderInstance {
    if (providers.length === 0) {
      throw new Error('No providers available');
    }

    if (providers.length === 1) {
      return providers[0];
    }

    // Sort by priority and weight
    const sortedProviders = providers.sort((a, b) => {
      // First by priority (higher priority first)
      if (b.config.priority !== a.config.priority) {
        return b.config.priority - a.config.priority;
      }

      // Then by weight (higher weight first)
      return b.config.weight - a.config.weight;
    });

    // Use weighted selection for providers with same priority
    const topPriority = sortedProviders[0].config.priority;
    const samePriorityProviders = sortedProviders.filter(
      (p) => p.config.priority === topPriority
    );

    if (samePriorityProviders.length === 1) {
      return samePriorityProviders[0];
    }

    // Weighted random selection
    const totalWeight = samePriorityProviders.reduce(
      (sum, p) => sum + p.config.weight,
      0
    );
    let random = Math.random() * totalWeight;

    for (const provider of samePriorityProviders) {
      random -= provider.config.weight;
      if (random <= 0) {
        return provider;
      }
    }

    return samePriorityProviders[samePriorityProviders.length - 1];
  }
}
```

### Circuit Breaker Implementation

```typescript
// patterns/mcp-servers/ai-providers/circuit-breaker.ts
export interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  nextAttempt: number;
}

export class CircuitBreaker {
  private states = new Map<string, CircuitBreakerState>();
  private readonly failureThreshold = 5;
  private readonly recoveryTimeout = 60000; // 1 minute
  private readonly halfOpenMaxCalls = 3;

  isOpen(providerName: string): boolean {
    const state = this.states.get(providerName);
    if (!state) return false;

    const now = Date.now();

    switch (state.state) {
      case 'CLOSED':
        return false;

      case 'OPEN':
        if (now >= state.nextAttempt) {
          state.state = 'HALF_OPEN';
          state.failures = 0;
          return false;
        }
        return true;

      case 'HALF_OPEN':
        return false;

      default:
        return false;
    }
  }

  recordSuccess(providerName: string): void {
    const state = this.states.get(providerName);
    if (!state) return;

    if (state.state === 'HALF_OPEN') {
      state.state = 'CLOSED';
      state.failures = 0;
    }
  }

  recordFailure(providerName: string): void {
    let state = this.states.get(providerName);

    if (!state) {
      state = {
        failures: 0,
        lastFailureTime: 0,
        state: 'CLOSED',
        nextAttempt: 0,
      };
      this.states.set(providerName, state);
    }

    state.failures++;
    state.lastFailureTime = Date.now();

    if (
      state.state === 'HALF_OPEN' ||
      state.failures >= this.failureThreshold
    ) {
      state.state = 'OPEN';
      state.nextAttempt = Date.now() + this.recoveryTimeout;
    }
  }

  getState(providerName: string): CircuitBreakerState | null {
    return this.states.get(providerName) || null;
  }

  reset(providerName: string): void {
    this.states.delete(providerName);
  }
}
```

## 🚀 Quick Start

### Basic AI Provider Setup

```typescript
// Setup AI providers for your MCP server
import {
  AIProviderManager,
  ProviderType,
} from './patterns/mcp-servers/ai-providers/ai-provider-manager';

const providerManager = new AIProviderManager();

// Register OpenAI provider
providerManager.registerProvider({
  name: 'openai-primary',
  type: ProviderType.OPENAI,
  enabled: true,
  priority: 1,
  weight: 3,
  maxRequestsPerMinute: 60,
  maxTokensPerMinute: 90000,
  costLimit: 100, // $100 per month
  apiKey: process.env.OPENAI_API_KEY!,
  models: [
    {
      name: 'gpt-4',
      displayName: 'GPT-4',
      maxTokens: 8192,
      costPerToken: 0.00003,
      supported: true,
      features: ['chat', 'completion', 'streaming'],
    },
    {
      name: 'gpt-3.5-turbo',
      displayName: 'GPT-3.5 Turbo',
      maxTokens: 4096,
      costPerToken: 0.000002,
      supported: true,
      features: ['chat', 'completion', 'streaming'],
    },
  ],
  healthCheck: {
    enabled: true,
    interval: 30000,
    timeout: 5000,
    endpoint: '/models',
  },
});

// Register Anthropic provider
providerManager.registerProvider({
  name: 'anthropic-backup',
  type: ProviderType.ANTHROPIC,
  enabled: true,
  priority: 2,
  weight: 1,
  maxRequestsPerMinute: 50,
  maxTokensPerMinute: 100000,
  costLimit: 50, // $50 per month
  apiKey: process.env.ANTHROPIC_API_KEY!,
  models: [
    {
      name: 'claude-3-opus',
      displayName: 'Claude 3 Opus',
      maxTokens: 4096,
      costPerToken: 0.000015,
      supported: true,
      features: ['chat', 'streaming'],
    },
  ],
});
```

### Generate AI Response

```typescript
// Generate response with automatic provider selection
const response = await providerManager.generate(
  'Generate a React button component with loading state',
  {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
  }
);

console.log('Generated content:', response.content);
console.log('Provider used:', response.provider);
console.log('Tokens used:', response.usage);
console.log('Cost:', providerManager.getCostByProvider()[response.provider]);
```

### Streaming Generation

```typescript
// Generate streaming response
const stream = await providerManager.generateStreaming(
  'Create a complete React form component',
  {
    model: 'gpt-4',
    temperature: 0.5,
    maxTokens: 2000,
  }
);

for await (const chunk of stream) {
  process.stdout.write(chunk.content);

  if (chunk.done) {
    console.log('\nGeneration completed!');
    console.log('Total tokens:', chunk.usage?.totalTokens);
  }
}
```

## 📊 Performance Benefits

### Multi-Provider Reliability

- **Automatic Failover**: Switch providers when one fails
- **Circuit Breaking**: Stop using failing providers temporarily
- **Health Monitoring**: Continuous provider health checking
- **Load Balancing**: Distribute requests across providers

### Cost Optimization

- **Cost Tracking**: Monitor API costs per provider
- **Budget Management**: Enforce spending limits
- **Provider Selection**: Choose optimal provider based on cost/quality
- **Usage Analytics**: Track and optimize usage patterns

### Performance Optimization

- **Intelligent Routing**: Route to fastest responding providers
- **Rate Limiting**: Prevent API rate limit violations
- **Token Optimization**: Minimize token usage
- **Caching**: Cache responses when appropriate

## 🔧 Integration Examples

### MCP Server Integration

```typescript
// Integrate with MCP UI generation server
export class MCPUIGenerationServer {
  private providerManager: AIProviderManager;

  constructor() {
    this.providerManager = new AIProviderManager();
    this.setupProviders();
  }

  async handleGenerateComponent(request: MCPRequest): Promise<MCPResponse> {
    try {
      const response = await this.providerManager.generate(
        request.params.description,
        {
          model: request.params.model || 'gpt-4',
          temperature: 0.7,
          maxTokens: 2000,
        },
        request.params.preferredProvider
      );

      return {
        success: true,
        data: {
          component: response.content,
          provider: response.provider,
          usage: response.usage,
          cost: this.providerManager.getCostByProvider()[response.provider],
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

### Cost Monitoring

```typescript
// Monitor AI costs
setInterval(() => {
  const totalCost = providerManager.getTotalCost();
  const costsByProvider = providerManager.getCostByProvider();
  const usageStats = providerManager.getUsageStats();

  console.log('AI Provider Cost Report:');
  console.log(`Total Cost: $${totalCost.toFixed(2)}`);

  for (const [provider, cost] of Object.entries(costsByProvider)) {
    console.log(`  ${provider}: $${cost.toFixed(2)}`);
  }

  console.log(`Total Requests: ${usageStats.totalRequests}`);
  console.log(`Success Rate: ${(usageStats.successRate * 100).toFixed(1)}%`);
  console.log(
    `Average Response Time: ${usageStats.averageResponseTime.toFixed(0)}ms`
  );
}, 60000); // Every minute
```

This AI provider pattern provides a robust, cost-optimized foundation for
AI-powered MCP services with automatic failover, load balancing, and
comprehensive cost tracking! 🚀
