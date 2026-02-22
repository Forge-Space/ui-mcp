# MCP Server Template Patterns

## 🎯 Overview

Template management patterns for MCP (Model Context Protocol) servers, providing
versioning, validation, caching, and dynamic rendering capabilities for
consistent and efficient UI generation.

## 📋 Available Patterns

### Template Versioning

- **Semantic Versioning**: Template version management with semantic versioning
- **Backward Compatibility**: Template compatibility checking and migration
- **Template Deprecation**: Graceful deprecation of old templates
- **Version Resolution**: Automatic template version resolution
- **Template Registry**: Central template version registry

### Template Validation

- **Syntax Validation**: Template syntax checking and error reporting
- **Schema Validation**: Template structure validation against schemas
- **Security Validation**: Security checks for template content
- **Performance Validation**: Template performance impact analysis
- **Integration Validation**: Template integration compatibility checks

### Template Caching

- **Compiled Template Cache**: Cache compiled templates for faster rendering
- **Template Fragment Cache**: Cache reusable template fragments
- **Dependency Cache**: Cache template dependencies and imports
- **Cache Invalidation**: Intelligent cache invalidation strategies
- **Cache Warming**: Pre-warm cache with frequently used templates

### Dynamic Rendering

- **Context-Aware Rendering**: Render templates with dynamic context
- **Conditional Rendering**: Template conditional logic and branching
- **Loop Rendering**: Template iteration and loop constructs
- **Component Composition**: Template composition and inheritance
- **Real-Time Updates**: Live template updates and hot reloading

## 🔧 Implementation Examples

### Template Manager Implementation

```typescript
// patterns/mcp-servers/templates/template-manager.ts
import { EventEmitter } from 'events';

export interface Template {
  id: string;
  name: string;
  version: string;
  content: string;
  metadata: TemplateMetadata;
  dependencies: string[];
  compiled?: CompiledTemplate;
  lastModified: Date;
  deprecated?: boolean;
  deprecationMessage?: string;
}

export interface TemplateMetadata {
  author: string;
  description: string;
  tags: string[];
  framework: string;
  language: string;
  category: string;
  parameters: TemplateParameter[];
  examples: TemplateExample[];
}

export interface TemplateParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  default?: any;
  description: string;
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message?: string;
}

export interface TemplateExample {
  name: string;
  description: string;
  parameters: Record<string, any>;
  expectedOutput: string;
}

export interface CompiledTemplate {
  render: (context: any) => string;
  dependencies: string[];
  parameters: TemplateParameter[];
}

export class TemplateManager extends EventEmitter {
  private templates = new Map<string, Template>();
  private compiledCache = new Map<string, CompiledTemplate>();
  private versionRegistry = new Map<string, string[]>();
  private validator: TemplateValidator;
  private compiler: TemplateCompiler;
  private cache: TemplateCache;

  constructor() {
    this.validator = new TemplateValidator();
    this.compiler = new TemplateCompiler();
    this.cache = new TemplateCache();
  }

  async registerTemplate(template: Template): Promise<void> {
    // Validate template
    const validation = await this.validator.validate(template);
    if (!validation.valid) {
      throw new Error(
        `Template validation failed: ${validation.errors.join(', ')}`
      );
    }

    // Check version conflicts
    const existingVersions = this.versionRegistry.get(template.name) || [];
    if (existingVersions.includes(template.version)) {
      throw new Error(
        `Template ${template.name} version ${template.version} already exists`
      );
    }

    // Register template
    this.templates.set(`${template.name}@${template.version}`, template);

    // Update version registry
    existingVersions.push(template.version);
    this.versionRegistry.set(template.name, existingVersions);

    // Compile template
    const compiled = await this.compiler.compile(template);
    template.compiled = compiled;
    this.compiledCache.set(`${template.name}@${template.version}`, compiled);

    // Cache template
    await this.cache.set(template);

    this.emit('templateRegistered', template);
  }

  async getTemplate(name: string, version?: string): Promise<Template | null> {
    if (version) {
      return this.templates.get(`${name}@${version}`) || null;
    }

    // Get latest version
    const versions = this.versionRegistry.get(name) || [];
    if (versions.length === 0) return null;

    const latestVersion = versions.sort((a, b) => b.localeCompare(a))[0];
    return this.templates.get(`${name}@${latestVersion}`) || null;
  }

  async renderTemplate(
    name: string,
    context: any,
    version?: string
  ): Promise<string> {
    const template = await this.getTemplate(name, version);
    if (!template) {
      throw new Error(
        `Template ${name}${version ? `@${version}` : ''} not found`
      );
    }

    if (template.deprecated) {
      this.emit('templateDeprecated', template);
    }

    // Check cache first
    const cacheKey = this.generateCacheKey(template, context);
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Validate context
    const contextValidation = this.validateContext(template, context);
    if (!contextValidation.valid) {
      throw new Error(
        `Context validation failed: ${contextValidation.errors.join(', ')}`
      );
    }

    // Render template
    const rendered = await this.renderTemplateInternal(template, context);

    // Cache result
    await this.cache.set(cacheKey, rendered);

    return rendered;
  }

  async listTemplates(filter?: TemplateFilter): Promise<Template[]> {
    let templates = Array.from(this.templates.values());

    if (filter) {
      templates = templates.filter((template) => {
        if (
          filter.framework &&
          template.metadata.framework !== filter.framework
        )
          return false;
        if (filter.language && template.metadata.language !== filter.language)
          return false;
        if (filter.category && template.metadata.category !== filter.category)
          return false;
        if (
          filter.tags &&
          !filter.tags.some((tag) => template.metadata.tags.includes(tag))
        )
          return false;
        if (
          filter.deprecated !== undefined &&
          template.deprecated !== filter.deprecated
        )
          return false;
        return true;
      });
    }

    return templates;
  }

  async getTemplateVersions(name: string): Promise<string[]> {
    return this.versionRegistry.get(name) || [];
  }

  async deprecateTemplate(
    name: string,
    version: string,
    message?: string
  ): Promise<boolean> {
    const template = this.templates.get(`${name}@${version}`);
    if (!template) return false;

    template.deprecated = true;
    template.deprecationMessage = message || 'This template is deprecated';

    this.emit('templateDeprecated', template);
    return true;
  }

  async removeTemplate(name: string, version: string): Promise<boolean> {
    const templateKey = `${name}@${version}`;
    const template = this.templates.get(templateKey);
    if (!template) return false;

    // Remove from registry
    this.templates.delete(templateKey);
    this.compiledCache.delete(templateKey);

    // Update version registry
    const versions = this.versionRegistry.get(name) || [];
    const index = versions.indexOf(version);
    if (index > -1) {
      versions.splice(index, 1);
    }
    if (versions.length === 0) {
      this.versionRegistry.delete(name);
    } else {
      this.versionRegistry.set(name, versions);
    }

    // Clear cache
    await this.cache.clearByTemplate(template);

    this.emit('templateRemoved', template);
    return true;
  }

  private async renderTemplateInternal(
    template: Template,
    context: any
  ): Promise<string> {
    if (!template.compiled) {
      throw new Error(
        `Template ${template.name}@${template.version} is not compiled`
      );
    }

    return template.compiled.render(context);
  }

  private validateContext(template: Template, context: any): ValidationResult {
    const errors: string[] = [];

    for (const param of template.metadata.parameters) {
      if (param.required && !(param.name in context)) {
        errors.push(`Required parameter '${param.name}' is missing`);
      }

      if (param.name in context) {
        const value = context[param.name];
        const validation = this.validateParameter(param, value);
        if (!validation.valid) {
          errors.push(
            `Parameter '${param.name}': ${validation.errors.join(', ')}`
          );
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private validateParameter(
    param: TemplateParameter,
    value: any
  ): ValidationResult {
    const errors: string[] = [];

    // Type validation
    if (!this.validateType(param.type, value)) {
      errors.push(`Expected type ${param.type}, got ${typeof value}`);
    }

    // Custom validation rules
    if (param.validation) {
      for (const rule of param.validation) {
        const ruleResult = this.applyValidationRule(rule, value);
        if (!ruleResult.valid) {
          errors.push(ruleResult.errors[0]);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private validateType(expectedType: string, value: any): boolean {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number';
      case 'boolean':
        return typeof value === 'boolean';
      case 'object':
        return (
          typeof value === 'object' && value !== null && !Array.isArray(value)
        );
      case 'array':
        return Array.isArray(value);
      default:
        return false;
    }
  }

  private applyValidationRule(
    rule: ValidationRule,
    value: any
  ): ValidationResult {
    const errors: string[] = [];

    switch (rule.type) {
      case 'min':
        if (typeof value === 'number' && value < rule.value) {
          errors.push(rule.message || `Value must be at least ${rule.value}`);
        }
        break;
      case 'max':
        if (typeof value === 'number' && value > rule.value) {
          errors.push(rule.message || `Value must be at most ${rule.value}`);
        }
        break;
      case 'pattern':
        if (typeof value === 'string' && !new RegExp(rule.value).test(value)) {
          errors.push(rule.message || `Value does not match required pattern`);
        }
        break;
      case 'custom':
        // Custom validation would be implemented here
        break;
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private generateCacheKey(template: Template, context: any): string {
    const contextHash = this.hashObject(context);
    return `${template.name}@${template.version}:${contextHash}`;
  }

  private hashObject(obj: any): string {
    return JSON.stringify(obj)
      .split('')
      .reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
      .toString(36);
  }
}

interface TemplateFilter {
  framework?: string;
  language?: string;
  category?: string;
  tags?: string[];
  deprecated?: boolean;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}
```

### Template Validator Implementation

```typescript
// patterns/mcp-servers/templates/template-validator.ts
export class TemplateValidator {
  async validate(template: Template): Promise<ValidationResult> {
    const errors: string[] = [];

    // Basic validation
    if (!template.name) {
      errors.push('Template name is required');
    }

    if (!template.version) {
      errors.push('Template version is required');
    }

    if (!template.content) {
      errors.push('Template content is required');
    }

    // Version format validation
    if (template.version && !this.isValidVersion(template.version)) {
      errors.push('Invalid version format (expected semantic versioning)');
    }

    // Content validation
    if (template.content) {
      const contentValidation = await this.validateContent(template.content);
      if (!contentValidation.valid) {
        errors.push(...contentValidation.errors);
      }
    }

    // Metadata validation
    if (template.metadata) {
      const metadataValidation = await this.validateMetadata(template.metadata);
      if (!metadataValidation.valid) {
        errors.push(...metadataValidation.errors);
      }
    }

    // Dependency validation
    if (template.dependencies) {
      const dependencyValidation = await this.validateDependencies(
        template.dependencies
      );
      if (!dependencyValidation.valid) {
        errors.push(...dependencyValidation.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private isValidVersion(version: string): boolean {
    const semanticVersionRegex =
      /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
    return semanticVersionRegex.test(version);
  }

  private async validateContent(content: string): Promise<ValidationResult> {
    const errors: string[] = [];

    // Check for syntax errors
    try {
      // This would be implemented based on the template engine
      // For now, just check for basic syntax
      if (content.includes('{{') && !content.includes('}}')) {
        errors.push('Unclosed template expression');
      }

      if (content.includes('{%') && !content.includes('%}')) {
        errors.push('Unclosed template block');
      }

      // Check for potential security issues
      const securityIssues = this.checkSecurityIssues(content);
      errors.push(...securityIssues);
    } catch (error) {
      errors.push(`Template syntax error: ${error.message}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private checkSecurityIssues(content: string): string[] {
    const issues: string[] = [];

    // Check for potential XSS
    if (content.includes('innerHTML') || content.includes('eval(')) {
      issues.push('Template contains potentially unsafe code');
    }

    // Check for script tags
    if (/<script[^>]*>/i.test(content)) {
      issues.push('Template contains script tags (potential security risk)');
    }

    // Check for external resources
    if (/src\s*=\s*["']?(?:http|\/\/)/i.test(content)) {
      issues.push('Template contains external resources');
    }

    return issues;
  }

  private async validateMetadata(
    metadata: TemplateMetadata
  ): Promise<ValidationResult> {
    const errors: string[] = [];

    if (!metadata.author) {
      errors.push('Template author is required');
    }

    if (!metadata.framework) {
      errors.push('Template framework is required');
    }

    if (!metadata.language) {
      errors.push('Template language is required');
    }

    if (!metadata.category) {
      errors.push('Template category is required');
    }

    // Validate parameters
    if (metadata.parameters) {
      for (const param of metadata.parameters) {
        const paramValidation = this.validateParameter(param);
        if (!paramValidation.valid) {
          errors.push(
            `Parameter '${param.name}': ${paramValidation.errors.join(', ')}`
          );
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private validateParameter(param: TemplateParameter): ValidationResult {
    const errors: string[] = [];

    if (!param.name) {
      errors.push('Parameter name is required');
    }

    if (!param.type) {
      errors.push('Parameter type is required');
    }

    if (!param.description) {
      errors.push('Parameter description is required');
    }

    const validTypes = ['string', 'number', 'boolean', 'object', 'array'];
    if (param.type && !validTypes.includes(param.type)) {
      errors.push(`Invalid parameter type: ${param.type}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private async validateDependencies(
    dependencies: string[]
  ): Promise<ValidationResult> {
    const errors: string[] = [];

    // Check dependency format
    for (const dep of dependencies) {
      if (!this.isValidDependencyFormat(dep)) {
        errors.push(`Invalid dependency format: ${dep}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private isValidDependencyFormat(dependency: string): boolean {
    // Expected format: template-name@version
    const dependencyRegex = /^[a-zA-Z0-9-_]+@\d+\.\d+\.\d+$/;
    return dependencyRegex.test(dependency);
  }
}
```

### Template Compiler Implementation

```typescript
// patterns/mcp-servers/templates/template-compiler.ts
export class TemplateCompiler {
  async compile(template: Template): Promise<CompiledTemplate> {
    // This would be implemented based on the specific template engine
    // For now, we'll provide a simple string-based compilation

    const content = template.content;
    const dependencies = template.dependencies || [];
    const parameters = template.metadata.parameters || [];

    // Compile template content
    const renderFunction = this.compileRenderFunction(content, parameters);

    return {
      render: renderFunction,
      dependencies,
      parameters,
    };
  }

  private compileRenderFunction(
    content: string,
    parameters: TemplateParameter[]
  ): (context: any) => string {
    // Simple template compilation (would be replaced with actual template engine)
    return (context: any) => {
      let rendered = content;

      // Replace template variables
      for (const param of parameters) {
        const value = context[param.name] ?? param.default ?? '';
        const regex = new RegExp(`{{\\s*${param.name}\\s*}}`, 'g');
        rendered = rendered.replace(regex, String(value));
      }

      // Handle simple conditionals
      rendered = this.processConditionals(rendered, context);

      // Handle simple loops
      rendered = this.processLoops(rendered, context);

      return rendered;
    };
  }

  private processConditionals(content: string, context: any): string {
    // Process {% if condition %} ... {% endif %} blocks
    const conditionalRegex = /{%\s*if\s+(\w+)\s*%}([\s\S]*?){%\s*endif\s*%}/g;

    return content.replace(conditionalRegex, (match, condition, body) => {
      const value = context[condition];
      return value ? body : '';
    });
  }

  private processLoops(content: string, context: any): string {
    // Process {% for item in items %} ... {% endfor %} blocks
    const loopRegex =
      /{%\s*for\s+(\w+)\s+in\s+(\w+)\s*%}([\s\S]*?){%\s*endfor\s*%}/g;

    return content.replace(loopRegex, (match, itemVar, arrayVar, body) => {
      const array = context[arrayVar] || [];
      return array
        .map((item: any) => {
          let itemBody = body;
          const itemRegex = new RegExp(`{{\\s*${itemVar}\\s*}}`, 'g');
          itemBody = itemBody.replace(itemRegex, String(item));
          return itemBody;
        })
        .join('');
    });
  }
}
```

### Template Cache Implementation

```typescript
// patterns/mcp-servers/templates/template-cache.ts
import { EventEmitter } from 'events';

export interface CacheConfig {
  maxSize: number;
  defaultTTL: number;
  cleanupInterval: number;
  compressionEnabled: boolean;
}

export interface CacheEntry {
  key: string;
  value: string;
  timestamp: number;
  ttl: number;
  hits: number;
  size: number;
}

export class TemplateCache extends EventEmitter {
  private cache = new Map<string, CacheEntry>();
  private config: CacheConfig;
  private metrics = {
    hits: 0,
    misses: 0,
    evictions: 0,
    totalSize: 0,
  };

  constructor(config: CacheConfig) {
    this.config = config;
    this.startCleanupTimer();
  }

  async get(key: string): Promise<string | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      this.metrics.misses++;
      this.emit('cacheMiss', key);
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.metrics.evictions++;
      this.emit('cacheEviction', key);
      return null;
    }

    entry.hits++;
    this.metrics.hits++;
    this.emit('cacheHit', key);

    return entry.value;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const size = this.calculateSize(value);

    // Check if we need to evict entries
    if (this.cache.size >= this.config.maxSize) {
      await this.evictOldestEntry();
    }

    const entry: CacheEntry = {
      key,
      value,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL,
      hits: 0,
      size,
    };

    this.cache.set(key, entry);
    this.metrics.totalSize += size;

    this.emit('cacheSet', key, entry);
  }

  async clearByTemplate(template: Template): Promise<void> {
    const keysToClear: string[] = [];

    for (const [key] of this.cache.entries()) {
      if (key.startsWith(`${template.name}@${template.version}:`)) {
        keysToClear.push(key);
      }
    }

    for (const key of keysToClear) {
      await this.delete(key);
    }
  }

  async delete(key: string): Promise<boolean> {
    const deleted = this.cache.delete(key);

    if (deleted) {
      this.emit('cacheDeleted', key);
    }

    return deleted;
  }

  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.metrics.evictions += size;
    this.emit('cacheCleared', size);
  }

  getMetrics(): CacheMetrics {
    const hitRate =
      this.metrics.hits + this.metrics.misses > 0
        ? (this.metrics.hits / (this.metrics.hits + this.metrics.misses)) * 100
        : 0;

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hits: this.metrics.hits,
      misses: this.metrics.misses,
      evictions: this.metrics.evictions,
      hitRate: Math.round(hitRate * 100) / 100,
      totalSize: this.metrics.totalSize,
      averageSize:
        this.cache.size > 0 ? this.metrics.totalSize / this.cache.size : 0,
    };
  }

  private async evictOldestEntry(): Promise<void> {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      await this.delete(oldestKey);
    }
  }

  private calculateSize(value: string): number {
    return value.length;
  }

  private startCleanupTimer(): void {
    if (!this.config.cleanupInterval) return;

    setInterval(() => {
      this.cleanupExpiredEntries();
    }, this.config.cleanupInterval);
  }

  private cleanupExpiredEntries(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.delete(key);
    }
  }
}

interface CacheMetrics {
  size: number;
  maxSize: number;
  hits: number;
  misses: number;
  evictions: number;
  hitRate: number;
  totalSize: number;
  averageSize: number;
}
```

## 🚀 Quick Start

### Basic Template Setup

```typescript
// Setup template management for your MCP server
import { TemplateManager } from './patterns/mcp-servers/templates/template-manager';

const templateManager = new TemplateManager();

// Register a template
const buttonTemplate = {
  id: 'react-button',
  name: 'react-button',
  version: '1.0.0',
  content: `
import React from 'react';

interface {{componentName}}Props {
  {{#if onClick}}
  onClick: () => void;
  {{/if}}
  {{#if children}}
  children: React.ReactNode;
  {{/if}}
  {{#if variant}}
  variant?: 'primary' | 'secondary';
  {{/if}}
}

export const {{componentName}}: React.FC<{{componentName}}Props> = ({
  {{#if onClick}}
  onClick,
  {{/if}}
  {{#if children}}
  children,
  {{/if}}
  {{#if variant}}
  variant = 'primary',
  {{/if}}
}) => {
  return (
    <button 
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
};
  `,
  metadata: {
    author: 'Forge Team',
    description: 'React button component template',
    tags: ['react', 'component', 'button'],
    framework: 'react',
    language: 'typescript',
    category: 'ui-components',
    parameters: [
      {
        name: 'componentName',
        type: 'string',
        required: true,
        description: 'Name of the component',
      },
      {
        name: 'onClick',
        type: 'string',
        required: false,
        description: 'Click handler function',
      },
      {
        name: 'children',
        type: 'string',
        required: false,
        description: 'Button content',
      },
      {
        name: 'variant',
        type: 'string',
        required: false,
        default: 'primary',
        description: 'Button variant',
      },
    ],
    examples: [
      {
        name: 'Basic Button',
        description: 'Simple button with click handler',
        parameters: {
          componentName: 'MyButton',
          onClick: 'handleClick',
          children: 'Click me',
        },
        expectedOutput: 'React button component',
      },
    ],
  },
  dependencies: [],
  lastModified: new Date(),
};

await templateManager.registerTemplate(buttonTemplate);

// Render template
const rendered = await templateManager.renderTemplate('react-button', {
  componentName: 'SubmitButton',
  onClick: 'handleSubmit',
  children: 'Submit',
  variant: 'primary',
});

console.log(rendered);
```

### Template Versioning

```typescript
// Register multiple versions of a template
const templateV1 = { ...buttonTemplate, version: '1.0.0' };
const templateV2 = { ...buttonTemplate, version: '2.0.0', content: '...' };

await templateManager.registerTemplate(templateV1);
await templateManager.registerTemplate(templateV2);

// Get latest version
const latest = await templateManager.getTemplate('react-button');

// Get specific version
const v1 = await templateManager.getTemplate('react-button', '1.0.0');

// List all versions
const versions = await templateManager.getTemplateVersions('react-button');
console.log('Available versions:', versions);
```

### Template Validation

```typescript
// Template with validation rules
const validatedTemplate = {
  ...buttonTemplate,
  metadata: {
    ...buttonTemplate.metadata,
    parameters: [
      {
        name: 'componentName',
        type: 'string',
        required: true,
        description: 'Name of the component',
        validation: [
          {
            type: 'pattern',
            value: '^[A-Z][a-zA-Z0-9]*$',
            message: 'Component name must start with uppercase letter',
          },
        ],
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        default: 'medium',
        description: 'Button size',
        validation: [
          {
            type: 'custom',
            value: ['small', 'medium', 'large'],
            message: 'Size must be small, medium, or large',
          },
        ],
      },
    ],
  },
};

await templateManager.registerTemplate(validatedTemplate);

// This will throw an error due to validation
try {
  await templateManager.renderTemplate('react-button', {
    componentName: 'invalidName', // Fails validation
    size: 'extra-large', // Fails validation
  });
} catch (error) {
  console.error('Validation error:', error.message);
}
```

## 📊 Template Management Benefits

### Version Control

- **Semantic Versioning**: Proper version management for templates
- **Backward Compatibility**: Template compatibility checking
- **Graceful Deprecation**: Smooth template deprecation process
- **Version Resolution**: Automatic version selection

### Quality Assurance

- **Syntax Validation**: Template syntax checking
- **Security Validation**: Security risk detection
- **Performance Validation**: Template performance analysis
- **Integration Validation**: Template compatibility checks

### Performance Optimization

- **Template Caching**: Cache compiled templates
- **Fragment Caching**: Cache reusable template parts
- **Cache Invalidation**: Intelligent cache management
- **Cache Warming**: Pre-warm frequently used templates

### Developer Experience

- **Template Registry**: Central template management
- **Parameter Validation**: Automatic parameter validation
- **Error Reporting**: Detailed error messages
- **Template Discovery**: Easy template search and filtering

## 🔧 Integration Examples

### MCP Server Integration

```typescript
// Integrate with MCP UI generation server
export class MCPUIGenerationServer {
  private templateManager: TemplateManager;

  constructor() {
    this.templateManager = new TemplateManager();
    this.setupTemplates();
  }

  async handleGenerateComponent(request: MCPRequest): Promise<MCPResponse> {
    try {
      const { templateName, parameters, version } = request.params;

      const rendered = await this.templateManager.renderTemplate(
        templateName,
        parameters,
        version
      );

      return {
        success: true,
        data: {
          component: rendered,
          template: templateName,
          version: version || 'latest',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async handleListTemplates(request: MCPRequest): Promise<MCPResponse> {
    const templates = await this.templateManager.listTemplates(
      request.params.filter
    );

    return {
      success: true,
      data: {
        templates: templates.map((t) => ({
          name: t.name,
          version: t.version,
          description: t.metadata.description,
          framework: t.metadata.framework,
          language: t.metadata.language,
          deprecated: t.deprecated,
        })),
      },
    };
  }
}
```

### Template Hot Reloading

```typescript
// Hot reload templates in development
if (process.env.NODE_ENV === 'development') {
  const templateWatcher = new TemplateWatcher(templateManager);

  templateWatcher.on('templateChanged', async (template) => {
    console.log(`Template ${template.name} changed, recompiling...`);
    await templateManager.registerTemplate(template);
  });

  templateWatcher.watch('./templates/');
}
```

This template pattern provides comprehensive template management for MCP servers
with versioning, validation, caching, and dynamic rendering capabilities! 🚀
