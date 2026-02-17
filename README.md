# UIForge MCP Server

MCP server for AI-driven UI generation — from code scaffolding to interactive
prototypes and design images. Scaffold frontend apps (React, Next.js, Vue,
Angular, vanilla HTML/CSS/JS + Tailwind/Shadcn), generate UI components with
style-aware context, convert screenshots to code, create page templates, audit
accessibility, iteratively refine components, create interactive HTML
prototypes, render SVG/PNG mockups, and integrate with Figma for bidirectional
design token flow.

Built on the
[Model Context Protocol TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk).

## Tools

| #   | Tool                        | Category | Description                                                                       |
| --- | --------------------------- | -------- | --------------------------------------------------------------------------------- |
| 1   | `scaffold_full_application` | Code     | Generate full project boilerplate (React/Next.js/Vue/Angular/HTML + Tailwind)     |
| 2   | `generate_ui_component`     | Code     | Create/iterate UI components with style audit + design context                    |
| 3   | `generate_prototype`        | Design   | Create interactive HTML prototype with screen flows and navigation                |
| 4   | `generate_design_image`     | Design   | Generate SVG/PNG mockup images of UI screens/components                           |
| 5   | `fetch_design_inspiration`  | Context  | Extract visual metadata (colors, typography, layout) from URLs                    |
| 6   | `analyze_design_references` | Context  | Analyze design references from URLs and images, detect common patterns            |
| 7   | `figma_context_parser`      | Context  | Read Figma file nodes, extract tokens, map to Tailwind                            |
| 8   | `figma_push_variables`      | Design   | Write design tokens back to Figma as Variables                                    |
| 9   | `image_to_component`        | Code     | Convert screenshot/mockup/wireframe image into framework-specific component code  |
| 10  | `generate_page_template`    | Code     | Generate pre-built page templates (landing, dashboard, auth, pricing, CRUD, etc.) |
| 11  | `refine_component`          | Code     | Iteratively improve existing components via natural language feedback             |
| 12  | `audit_accessibility`       | Quality  | Audit component code for WCAG 2.1 violations with fix suggestions                 |

## Resource

| URI                            | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| `application://current-styles` | Current `IDesignContext` as JSON — session-scoped style source of truth |

## Quick Start

### Option 1: Automated IDE Setup (Recommended)

```bash
# Run the automated setup script
./setup-ide.sh

# Edit environment variables
nano .env
```

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your values
# Add your FIGMA_ACCESS_TOKEN

# Build
npm run build

# Run (stdio transport)
node dist/index.js
```

## Development

```bash
# Watch mode
npm run dev

# Run tests
npm test

# Run tests in watch mode (only changed files)
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Clean build artifacts
npm run clean

# Validate all checks (lint, format, typecheck, test)
npm run validate

# Docker commands
npm run docker:build
npm run docker:run
```

## IDE Setup

### 🚀 Automated Setup

Run the automated setup script for complete IDE configuration:

```bash
./setup-ide.sh
```

This script:
- ✅ Creates `.env` from `.env.example`
- ✅ Installs VS Code extensions (if available)
- ✅ Installs Node.js dependencies
- ✅ Builds the project
- ✅ Tests environment variables

### 📚 Manual IDE Configuration

#### VS Code
- **Extensions**: TypeScript, ESLint, Prettier, REST Client
- **Debug Configuration**: `.vscode/launch.json` (auto-loads `.env`)
- **Tasks**: Build and start tasks configured
- **Settings**: Environment file auto-loading enabled

#### Cursor IDE
- **Environment**: `.cursorrules` configured for UIForge MCP
- **Auto-loading**: `.env` file automatically detected
- **Development**: Optimized for MCP server development

#### Windsurf IDE
- **Configuration**: `.windsurf/` directory with MCP development rules
- **Environment**: `.env` file automatically loaded
- **Integration**: Seamless MCP tool development

### 🔧 Environment Variables

Create `.env` file with your configuration:

```bash
# Required for Figma integration
FIGMA_ACCESS_TOKEN=your_figma_access_token_here

# Optional configuration
NODE_ENV=development
LOG_LEVEL=debug
```

**📖 Detailed Instructions**: See [IDE-SETUP.md](./IDE-SETUP.md) for comprehensive IDE configuration guide.

## Test Coverage

Current test coverage: **77.39%** (39 test suites, 550 tests)

- **Statements**: 77.39%
- **Branches**: 70.77%
- **Functions**: 78.72%
- **Lines**: 77.39%

Coverage thresholds are enforced via Jest configuration. All tests must pass and
maintain coverage levels before merging.

### Coverage Status

- ✅ **All 550 tests passing**
- ⚠️ **Coverage below threshold** (target: 84%)
- 📊 **39 test suites** covering all tools and core functionality
- 🎯 **Component library integration** fully tested
- ♿ **Accessibility features** comprehensively tested

## Docker

```bash
docker build -t uiforge-mcp .
docker run -i uiforge-mcp
```

## Environment Variables

| Variable             | Required             | Description                                       |
| -------------------- | -------------------- | ------------------------------------------------- |
| `FIGMA_ACCESS_TOKEN` | Only for Figma tools | Personal access token from Figma account settings |

## Figma Integration Status

### ✅ **Implemented Features**

- **`figma_context_parser`**: Read Figma files, extract design tokens, map to
  Tailwind CSS
- **`figma_push_variables`**: Write design tokens back to Figma as Variables
- **Bidirectional token flow**: UIForge ↔ Figma

### 🔧 **Setup Requirements**

1. Get Figma access token from
   [Figma Account Settings](https://www.figma.com/developers/api#access-tokens)
2. Set `FIGMA_ACCESS_TOKEN` environment variable
3. Use file key from Figma URL: `figma.com/file/<file_key>/...`

### 📋 **Usage Examples**

```bash
# Parse Figma design tokens
figma_context_parser(file_key="ABC123")

# Push variables to Figma
figma_push_variables(file_key="ABC123", variables=[...])
```

## Production Deployment

### 🚀 **Production Ready Features**

- ✅ **12 MCP tools** fully operational
- ✅ **Component library integration** (shadcn/ui, Radix UI, Headless UI,
  Material UI)
- ✅ **Accessibility compliance** (WCAG 2.1 AA/AAA)
- ✅ **Responsive design** generation
- ✅ **Zero-cost architecture** (self-hosted)

### 📦 **Docker Deployment**

```bash
# Build production image
docker build -t uiforge-mcp:latest .

# Run production server
docker run -d \
  --name uiforge-mcp \
  -p 8026:8026 \
  -e FIGMA_ACCESS_TOKEN=your_token_here \
  uiforge-mcp:latest
```

### 🔗 **Integration Examples**

- **mcp-gateway**: Add to your Docker Compose setup
- **Claude Desktop**: Connect via stdio transport
- **Custom MCP clients**: Use SSE or stdio transport

## Project Structure

```text
uiforge-mcp/
├── package.json
├── tsconfig.json
├── Dockerfile
├── src/
│   ├── index.ts                        # McpServer + stdio transport
│   ├── tools/
│   │   ├── scaffold-full-application.ts
│   │   ├── generate-ui-component.ts
│   │   ├── generate-prototype.ts
│   │   ├── generate-design-image.ts
│   │   ├── fetch-design-inspiration.ts
│   │   ├── analyze-design-references.ts
│   │   ├── figma-context-parser.ts
│   │   ├── figma-push-variables.ts
│   │   ├── image-to-component.ts
│   │   ├── generate-page-template.ts
│   │   ├── refine-component.ts
│   │   └── audit-accessibility.ts
│   ├── resources/
│   │   └── current-styles.ts
│   ├── lib/
│   │   ├── types.ts
│   │   ├── design-context.ts
│   │   ├── style-audit.ts
│   │   ├── figma-client.ts
│   │   ├── design-extractor.ts
│   │   ├── browser-scraper.ts
│   │   ├── image-analyzer.ts
│   │   ├── pattern-detector.ts
│   │   ├── tailwind-mapper.ts
│   │   ├── image-renderer.ts
│   │   ├── prototype-builder.ts
│   │   ├── design-references/
│   │   │   ├── index.ts
│   │   │   ├── font-pairings.ts
│   │   │   ├── color-systems.ts
│   │   │   ├── inspiration-sources.ts
│   │   │   └── ...
│   │   └── templates/
│   │       ├── react.ts
│   │       ├── nextjs.ts
│   │       ├── vue.ts
│   │       ├── angular.ts
│   │       ├── html.ts
│   │       └── prototype-shell.ts
│   └── __tests__/
│       ├── *.unit.test.ts              # Unit tests for lib modules
│       ├── *.integration.test.ts       # Integration tests
│       ├── tools/                      # Tool-specific tests
│       │   └── *.unit.test.ts
│       └── resources/                  # Resource tests
│           └── *.unit.test.ts
```

## mcp-gateway Integration

To add UIForge to your mcp-gateway Docker Compose setup:

1. **`docker-compose.yml`**: Add a `uiforge` service on port `8026`.
2. **`scripts/gateways.txt`**: Add `uiforge|http://uiforge:8026/sse|SSE`.
3. **`.env.example`**: Add `UIFORGE_PORT=8026` and `FIGMA_ACCESS_TOKEN=`.

## Architecture

- **Transport**: stdio (gateway wraps via `mcpgateway.translate` → SSE)
- **Templates**: Embedded TS template functions per framework
- **Image generation**: `satori` (JSX → SVG) + `@resvg/resvg-js` (SVG → PNG)
- **Style consistency**: In-memory `IDesignContext` store exposed via
  `application://current-styles`
- **Figma write-back**: Variables REST API for design tokens (only supported
  write path)

## License

MIT
