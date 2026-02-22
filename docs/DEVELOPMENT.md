# UIForge MCP Development Guide

## 🏗️ Development Workflow

### Prerequisites

- Node.js 22+
- npm or yarn
- Git
- Docker (optional)
- Figma account (for design integration)

### Getting Started

1. **Clone Repository**

```bash
git clone https://github.com/LucasSantana-Dev/uiforge-mcp.git
cd uiforge-mcp
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up Environment**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run Tests**

```bash
npm test
```

5. **Start Development**

```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── index.ts                    # Server entry point
├── tools/                      # MCP tool implementations
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
│   ├── audit-accessibility.ts
│   ├── submit-feedback.ts
│   ├── analyze_design_image_for_training.ts
│   └── manage_training.ts
├── resources/                  # MCP resources
│   └── current-styles.ts       # application://current-styles
├── services/                   # Service layer
│   ├── design.service.ts
│   ├── figma.service.ts
│   ├── generation.service.ts
│   └── analysis.service.ts
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
│   ├── generators/             # Component generators
│   │   ├── base-generator.ts
│   │   ├── generator-factory.ts
│   │   ├── react-generator.ts
│   │   ├── vue-generator.ts
│   │   ├── angular-generator.ts
│   │   ├── svelte-generator.ts
│   │   └── html-generator.ts
│   ├── templates/              # Framework project templates
│   ├── design-references/      # Design system presets
│   ├── ml/                     # ML subsystem
│   ├── feedback/               # Feedback system
│   ├── utils/                  # Shared utilities
│   └── errors/                 # Custom error classes
└── __tests__/                  # Test suites
```

## 🔧 Development Commands

### Core Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm test                 # Run all tests
npm run test:coverage    # Run tests with coverage
npm run test:watch       # Run tests in watch mode
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
npm run validate         # Run all validation checks
```

### Docker Commands

```bash
npm run docker:build     # Build Docker image
npm run docker:run       # Run Docker container
npm run docker:dev       # Development with Docker
```

### Quality Commands

```bash
npm run test:security    # Run security tests
npm run test:integration # Run integration tests
npm run metrics           # Generate performance metrics
npm run docs              # Generate documentation
```

## 🧪 Testing Strategy

### Test Structure

- **Unit Tests**: Individual function and class testing
- **Integration Tests**: Tool and service integration
- **End-to-End Tests**: Complete workflow testing
- **Coverage**: Target 85%+ coverage

### Writing Tests

#### Unit Test Example

```typescript
import { describe, it, expect } from '@jest/globals';
import { toPascalCase } from '../lib/utils/string.utils.js';

describe('string.utils', () => {
  it('should convert to Pascal case', () => {
    expect(toPascalCase('hello-world')).toBe('HelloWorld');
    expect(toPascalCase('button_component')).toBe('ButtonComponent');
  });
});
```

#### Tool Test Example

```typescript
import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGenerateUiComponent } from '../generate-ui-component.js';

describe('generate-ui-component', () => {
  let testServer: McpServer;

  beforeEach(() => {
    testServer = new McpServer({ name: 'test', version: '1.0.0' });
  });

  it('should register the tool successfully', () => {
    expect(() => registerGenerateUiComponent(testServer)).not.toThrow();
  });
});
```

### Test Categories

#### 1. Tool Registration Tests

- Verify tools register without errors
- Check tool metadata (name, description)
- Validate input schemas

#### 2. Functionality Tests

- Test core functionality with various inputs
- Validate output formats
- Check error handling

#### 3. Integration Tests

- Test tool interactions
- Verify service integration
- Test end-to-end workflows

#### 4. Performance Tests

- Measure execution time
- Test memory usage
- Validate resource cleanup

### Running Tests

#### All Tests

```bash
npm test
```

#### Specific Test File

```bash
npm test -- tools/generate-ui-component.test.ts
```

#### Test Pattern

```bash
npm test -- --testNamePattern="should convert"
```

#### Coverage Report

```bash
npm run test:coverage
```

#### Watch Mode

```bash
npm run test:watch
```

## 🏗️ Architecture Patterns

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

### 2. Service Layer Pattern

Services encapsulate business logic:

```typescript
export class DesignService {
  constructor(
    private contextStore: DesignContextStore,
    private styleAuditor: StyleAuditor
  ) {}

  async updateFromUrl(url: string): Promise<void> {
    const design = await this.designExtractor.extract(url);
    this.contextStore.update(design);
  }
}
```

### 3. Generator Factory Pattern

Framework-specific generators:

```typescript
export class GeneratorFactory {
  static create(framework: Framework): IGenerator {
    switch (framework) {
      case 'react':
        return new ReactGenerator();
      case 'vue':
        return new VueGenerator();
      // ... other frameworks
    }
  }
}
```

### 4. Singleton Pattern

Design context store:

```typescript
class DesignContextStore {
  private static instance: DesignContextStore;

  static getInstance(): DesignContextStore {
    if (!DesignContextStore.instance) {
      DesignContextStore.instance = new DesignContextStore();
    }
    return DesignContextStore.instance;
  }
}
```

## 🔧 Adding New Tools

### 1. Create Tool File

```typescript
// src/tools/new-tool.ts
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const inputSchema = z.object({
  parameter1: z.string(),
  parameter2: z.number().optional(),
});

export function registerNewTool(server: McpServer): void {
  server.tool(
    'new_tool',
    'Description of what this tool does',
    inputSchema,
    async ({ parameter1, parameter2 }) => {
      // Implementation
      return {
        content: [
          {
            type: 'text',
            text: `Tool executed with ${parameter1}`,
          },
        ],
      };
    }
  );
}
```

### 2. Add Tests

```typescript
// src/__tests__/tools/new-tool.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerNewTool } from '../../tools/new-tool.js';

describe('new-tool', () => {
  let testServer: McpServer;

  beforeEach(() => {
    testServer = new McpServer({ name: 'test', version: '1.0.0' });
  });

  it('should register successfully', () => {
    expect(() => registerNewTool(testServer)).not.toThrow();
  });

  it('should execute with valid input', async () => {
    registerNewTool(testServer);
    // Test implementation
  });
});
```

### 3. Register Tool

```typescript
// src/index.ts
import { registerNewTool } from './tools/new-tool.js';

export async function createServer(): Promise<McpServer> {
  const server = new McpServer({
    name: 'uiforge-mcp',
    version: '1.0.0',
  });

  // Register other tools...
  registerNewTool(server);

  return server;
}
```

### 4. Update Documentation

- Add tool to README.md
- Update API documentation
- Add examples

## 🔧 Adding Framework Support

### 1. Create Generator

```typescript
// src/lib/generators/new-framework-generator.ts
import { BaseGenerator } from './base-generator.js';
import type { IGeneratedFile, IDesignContext } from '../types.js';

export class NewFrameworkGenerator extends BaseGenerator {
  generateComponent(
    componentType: string,
    props: Record<string, any>,
    designContext: IDesignContext
  ): IGeneratedFile[] {
    // Implementation
    return [
      {
        path: `components/${componentType}.new-framework`,
        content: 'Generated component code',
      },
    ];
  }
}
```

### 2. Register Generator

```typescript
// src/lib/generators/generator-factory.ts
import { NewFrameworkGenerator } from './new-framework-generator.js';

export class GeneratorFactory {
  static create(framework: Framework): IGenerator {
    switch (framework) {
      // ... existing cases
      case 'new-framework':
        return new NewFrameworkGenerator();
    }
  }
}
```

### 3. Add Template

```typescript
// src/lib/templates/new-framework.ts
export function generateNewFrameworkProject(
  name: string,
  designContext: IDesignContext
): IGeneratedFile[] {
  return [
    {
      path: 'package.json',
      content: JSON.stringify({
        name,
        dependencies: {
          'new-framework': '^1.0.0',
        },
      }),
    },
    // ... other files
  ];
}
```

### 4. Update Tests

Add tests for the new framework generator and templates.

## 🔄 Code Quality

### ESLint Configuration

```json
{
  "extends": ["@typescript-eslint/recommended", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error"
  }
}
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 🚀 Performance Optimization

### 1. Lazy Loading

```typescript
class LazyService {
  private _instance: Service | null = null;

  get instance(): Service {
    if (!this._instance) {
      this._instance = new Service();
    }
    return this._instance;
  }
}
```

### 2. Caching

```typescript
class CacheService {
  private cache = new Map<string, any>();

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, value: T, ttl = 300000): void {
    this.cache.set(key, value);
    setTimeout(() => this.cache.delete(key), ttl);
  }
}
```

### 3. Streaming

```typescript
import { Readable } from 'stream';

function createFileStream(files: IGeneratedFile[]): Readable {
  return new Readable({
    read() {
      files.forEach((file) => {
        this.push(file.content);
      });
      this.push(null);
    },
  });
}
```

## 🔒 Security Best Practices

### 1. Input Validation

```typescript
import { z } from 'zod';

const userInputSchema = z.object({
  url: z.string().url().max(2048),
  framework: z.enum(['react', 'vue', 'angular']),
});

export function validateInput(input: unknown) {
  return userInputSchema.parse(input);
}
```

### 2. Secret Management

```typescript
function getSecret(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
```

### 3. Sanitization

```typescript
import DOMPurify from 'dompurify';

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
```

## 🐛 Debugging

### 1. Logging

```typescript
import logger from '../lib/logger.js';

logger.info('Processing request', { requestId, userId });
logger.error('Processing failed', { error, requestId });
```

### 2. Error Handling

```typescript
try {
  const result = await processRequest(request);
  return result;
} catch (error) {
  logger.error('Request failed', { error, request });
  throw new ProcessingError('Failed to process request', { cause: error });
}
```

### 3. Debug Mode

```bash
DEBUG=uiforge:* npm run dev
```

## 📚 Documentation

### Code Documentation

````typescript
/**
 * Generates a UI component based on the specified parameters
 * @param componentType - Type of component to generate
 * @param framework - Target framework (react, vue, angular, etc.)
 * @param designContext - Design system context
 * @returns Generated files with paths and content
 * @example
 * ```typescript
 * const files = await generateComponent('button', 'react', designContext);
 * console.log(files[0].path); // 'components/Button.tsx'
 * ```
 */
export async function generateComponent(
  componentType: string,
  framework: Framework,
  designContext: IDesignContext
): Promise<IGeneratedFile[]> {
  // Implementation
}
````

### API Documentation

Generate API docs with TypeDoc:

```bash
npm run docs
```

## 🔄 Continuous Integration

### GitHub Actions Workflow

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-action@v5
```

### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test"
    }
  }
}
```

## 🚀 Deployment

### Build Process

```bash
npm run build
```

### Docker Deployment

```dockerfile
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY assets/ ./assets/

EXPOSE 8026
CMD ["node", "dist/index.js"]
```

### Environment Configuration

```bash
# Production
NODE_ENV=production
LOG_LEVEL=info

# Development
NODE_ENV=development
LOG_LEVEL=debug
```

---

**Need help?**

- Check [Architecture Documentation](./ARCHITECTURE.md)
- Review [API Reference](../README.md#api-reference)
- Join
  [Discussions](https://github.com/LucasSantana-Dev/uiforge-mcp/discussions)
