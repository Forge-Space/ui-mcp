# UIForge MCP Architecture

## Overview

UIForge MCP is a TypeScript-based Model Context Protocol server for AI-driven UI
generation. This document outlines the architectural patterns, design decisions,
and best practices.

## Directory Structure

```
src/
├── index.ts                    # Server entry point
├── tools/                      # MCP tool implementations (12 tools)
│   ├── scaffold-full-application.ts
│   ├── generate-ui-component.ts
│   ├── generate-prototype.ts
│   ├── generate-design-image.ts
│   ├── fetch-design-inspiration.ts
│   ├── analyze-design-references.ts
│   ├── figma-context-parser.ts
│   ├── figma-push-variables.ts
│   ├── image-to-component.ts
│   ├── generate-page-template.ts
│   ├── refine-component.ts
│   └── audit-accessibility.ts
├── resources/                  # MCP resources
│   └── current-styles.ts       # application://current-styles
├── lib/                        # Core business logic
│   ├── config.ts               # Configuration management
│   ├── logger.ts               # Logging with pino
│   ├── types.ts                # Shared TypeScript interfaces
│   ├── design-context.ts       # Design context singleton store
│   ├── style-audit.ts          # Tailwind/CSS parsing
│   ├── figma-client.ts         # Figma REST API client
│   ├── design-extractor.ts     # URL metadata extraction
│   ├── tailwind-mapper.ts      # Figma → Tailwind mapping
│   ├── image-renderer.ts       # Satori + resvg (SVG/PNG)
│   ├── image-analyzer.ts       # Image analysis with sharp
│   ├── prototype-builder.ts    # HTML prototype assembly
│   ├── browser-scraper.ts      # Playwright web scraping
│   ├── pattern-detector.ts     # Design pattern detection
│   ├── utils/                  # ✨ NEW: Shared utilities
│   │   ├── string.utils.ts     # String transformations
│   │   ├── jsx.utils.ts        # JSX/HTML conversions
│   │   └── index.ts            # Barrel export
│   ├── errors/                 # ✨ NEW: Custom error classes
│   │   ├── base.error.ts       # Base error types
│   │   ├── figma.error.ts      # Figma-specific errors
│   │   └── index.ts            # Barrel export
│   ├── design-references/      # Design system presets
│   │   ├── color-systems.ts
│   │   ├── font-pairings.ts
│   │   ├── spacing-layout.ts
│   │   ├── icon-references.ts
│   │   ├── animation-presets.ts
│   │   ├── layout-patterns.ts
│   │   ├── inspiration-sources.ts
│   │   ├── presets.ts
│   │   └── index.ts
│   └── templates/              # Framework project templates
│       ├── react.ts
│       ├── nextjs.ts
│       ├── vue.ts
│       ├── angular.ts
│       ├── html.ts
│       └── css-variables.ts
├── assets/                     # Static assets (fonts for satori)
└── __tests__/                  # Test suites (22 test suites, 236 tests)
```

## Architectural Patterns

### 1. Tool Registration Pattern

All tools follow a consistent registration pattern:

```typescript
export function registerToolName(server: McpServer): void {
  server.tool(
    'tool_name',
    'Tool description',
    inputSchema,
    async (params) => {
      // Implementation
      return { content: [...] };
    }
  );
}
```

**Benefits**:

- Consistent API surface
- Easy to add new tools
- Type-safe with Zod schemas
- Testable in isolation

### 2. Singleton Design Context Store

The `designContextStore` is a singleton that maintains design system state
across tool calls:

```typescript
class DesignContextStore {
  get(): IDesignContext;
  set(ctx: IDesignContext): void;
  update(partial: Partial<IDesignContext>): void;
  selectPreset(name: string): IDesignContext;
  reset(): void;
}
```

**Benefits**:

- Session-scoped state
- Deep merge for partial updates
- Preset system for quick setup
- Exposed via `application://current-styles` resource

### 3. Template Functions (Not Files)

Framework templates are TypeScript functions, not external template files:

```typescript
export function generateReactProject(name: string, ctx: IDesignContext): IGeneratedFile[] {
  return [
    { path: 'package.json', content: JSON.stringify({...}) },
    { path: 'src/App.tsx', content: `...` },
    // ...
  ];
}
```

**Benefits**:

- No template engine dependency
- Type-safe template logic
- Easy to test
- Dynamic content generation

### 4. Lazy Logger Initialization

Logger uses lazy initialization with safe fallbacks for tests:

```typescript
function initLogger(): Logger {
  let config;
  try {
    config = getConfig();
  } catch {
    // Fallback for tests
    config = { NODE_ENV: 'test', LOG_LEVEL: 'error' };
  }
  // ...
}
```

**Benefits**:

- Tests don't require config setup
- Production still validates config
- No module initialization order issues

## New Architectural Improvements

### 5. Shared Utilities Module ✨

Extracted common utility functions to reduce duplication:

**`src/lib/utils/string.utils.ts`**:

- `toPascalCase()`, `toKebabCase()`, `toCamelCase()`, `toSnakeCase()`
- `capitalize()`, `pluralize()`

**`src/lib/utils/jsx.utils.ts`**:

- `jsxToHtmlAttributes()` - className → class, etc.
- `reactEventsToHtml()` - onClick → onclick, etc.
- `jsxToHtml()` - Full JSX to HTML conversion

**Usage**:

```typescript
import { toPascalCase, jsxToHtml } from '../lib/utils/index.js';
```

### 6. Custom Error Classes ✨

Structured error handling with custom error types:

**`src/lib/errors/base.error.ts`**:

- `UIForgeError` - Base error with code and details
- `ValidationError`, `ConfigurationError`, `GenerationError`

**`src/lib/errors/figma.error.ts`**:

- `FigmaAuthError`, `FigmaNotFoundError`, `FigmaRateLimitError`

**Usage**:

```typescript
import { FigmaAuthError, ValidationError } from '../lib/errors/index.js';

if (!token) {
  throw new FigmaAuthError();
}
```

## Recommended Future Improvements

### 7. Service Layer Architecture (High Priority)

**Problem**: Tools directly import multiple lib modules, creating tight
coupling.

**Solution**: Introduce service layer:

```typescript
src/services/
├── design.service.ts       # Design context operations
├── figma.service.ts        # Figma API operations
├── generation.service.ts   # Code generation logic
└── analysis.service.ts     # Image/pattern analysis
```

**Example**:

```typescript
class DesignService {
  constructor(
    private contextStore: DesignContextStore,
    private styleAuditor: StyleAuditor,
    private designExtractor: DesignExtractor
  ) {}

  async updateFromUrl(url: string): Promise<void> {
    const design = await this.designExtractor.extract(url);
    this.contextStore.update(design);
  }
}
```

**Benefits**:

- Dependency injection for testing
- Single responsibility
- Reusable business logic
- Reduced tool complexity

### 8. Component Generator Factory (High Priority)

**Problem**: Large switch statements for framework-specific generation.

**Solution**: Factory pattern with abstract base:

```typescript
src/lib/generators/
├── base.generator.ts           # Abstract base
├── react.generator.ts
├── vue.generator.ts
├── angular.generator.ts
├── svelte.generator.ts
├── html.generator.ts
└── factory.ts                  # Generator factory

// Usage
const generator = GeneratorFactory.create(framework);
const files = generator.generateComponent(type, ctx, props);
```

**Benefits**:

- Open/closed principle
- Easy to add new frameworks
- Testable in isolation
- Reduced cyclomatic complexity

### 9. Configuration Service (Medium Priority)

**Problem**: Config is global singleton, hard to test with different configs.

**Solution**: Config service with builder pattern:

```typescript
class ConfigService {
  private config: Config;

  static builder(): ConfigBuilder {
    return new ConfigBuilder();
  }

  get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }
}

// Tests
const config = ConfigService.builder()
  .withNodeEnv('test')
  .withLogLevel('error')
  .build();
```

### 10. Template Registry (Low Priority)

**Problem**: Templates imported individually in tools.

**Solution**: Template registry for dynamic loading:

```typescript
class TemplateRegistry {
  private templates = new Map<Framework, TemplateGenerator>();

  register(framework: Framework, generator: TemplateGenerator): void;
  get(framework: Framework): TemplateGenerator;
}
```

## Testing Strategy

- **Unit tests**: 22 test suites, 236 tests (100% pass rate)
- **Test framework**: Jest with ts-jest (ESM preset)
- **Coverage target**: 85%
- **Test patterns**:
  - Tool registration tests
  - Template generation tests
  - Integration tests for full pipeline
  - Utility function tests

## Performance Considerations

1. **Lazy loading**: Logger and config use lazy initialization
2. **Singleton pattern**: Design context store prevents redundant state
3. **Streaming**: Large file generation could benefit from streaming
4. **Caching**: Consider caching Figma API responses
5. **Parallel processing**: Image analysis could use worker threads

## Security Considerations

1. **Environment variables**: Sensitive tokens (FIGMA_ACCESS_TOKEN) from env
2. **Input validation**: All tool inputs validated with Zod schemas
3. **Error messages**: Avoid leaking sensitive info in error messages
4. **Rate limiting**: Respect Figma API rate limits
5. **Sanitization**: HTML/CSS output should be sanitized

## Deployment

- **Transport**: stdio (wrapped by mcp-gateway via SSE)
- **Container**: Docker with Node 22 slim
- **Build**: `tsc` → `node dist/index.js`
- **Port**: 8026 (in mcp-gateway)
- **Health check**: Process uptime monitoring

## Dependencies

**Production**:

- `@modelcontextprotocol/sdk` - MCP TypeScript SDK
- `zod` - Schema validation
- `pino` - Structured logging
- `satori` + `@resvg/resvg-js` - SVG/PNG rendering
- `sharp` - Image analysis
- `playwright` - Browser automation

**Development**:

- `typescript` - Type checking
- `jest` + `ts-jest` - Testing
- `eslint` - Linting
- `@types/*` - Type definitions

## Contributing Guidelines

1. **New tools**: Follow registration pattern, add tests
2. **New frameworks**: Add template function, update types
3. **Breaking changes**: Update CHANGELOG.md, bump version
4. **Code style**: Run `npm run lint` before commit
5. **Tests**: Maintain 85%+ coverage
6. **Documentation**: Update README.md and this file

## Version History

- **v0.1.0**: Initial release (7 tools)
- **v0.2.0**: Added 5 new tools (image-to-component, page templates, refine,
  audit, analyze)
- **v0.2.1**: Added Svelte/HTML support, component library param
- **v0.3.0** (planned): Service layer, generator factory, enhanced error
  handling
