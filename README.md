# Siza MCP Server

AI-driven UI and backend code generation via Model Context Protocol. 21 tools, 5
frameworks, brand-aware — zero API keys required.

[![npm version](https://img.shields.io/npm/v/siza-mcp.svg)](https://www.npmjs.com/package/siza-mcp)
[![CI](https://img.shields.io/github/actions/workflow/status/Forge-Space/ui-mcp/ci.yml?label=CI)](https://github.com/Forge-Space/ui-mcp/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-82%25-brightgreen)](https://github.com/Forge-Space/ui-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.26.0-blue)](https://modelcontextprotocol.io)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-green)](https://nodejs.org/)

Part of the [Forge Space](https://github.com/Forge-Space) ecosystem.

![Siza Capabilities](assets/capabilities.png)

## Architecture

Siza MCP is a thin protocol adapter. All AI/generation logic lives in
[`@forgespace/siza-gen`](https://github.com/Forge-Space/siza-gen):

```
siza-mcp (~355 KB)                 @forgespace/siza-gen (~1.8 MB)
├── src/index.ts (MCP server)      ├── ml/        (embeddings, quality, training)
├── tools/     (22 tool defs)      ├── generators/ (react, vue, angular, svelte, html)
├── services/  (figma, analysis)   ├── registry/   (502 snippets, compositions, packs)
├── resources/ (MCP resources)     ├── feedback/   (self-learning, pattern promotion)
└── lib/       (browser, image)    └── quality/    (anti-generic rules, diversity)
```

## Quick Start

```bash
# NPX (instant)
npx -y siza-mcp@latest

# Global install
npm install -g siza-mcp && siza-mcp

# Docker
docker build -t siza-mcp . && docker run --rm -i siza-mcp
```

### IDE Integration

Add to your MCP configuration (Claude Code, Windsurf, Cursor, VS Code):

```json
{
  "mcpServers": {
    "siza-mcp": {
      "command": "npx",
      "args": ["-y", "siza-mcp@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Tools

| Tool                          | Category | Description                                                                                |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `scaffold_full_application`   | Code     | Full project boilerplate (React/Next.js/Vue/Angular/HTML + Tailwind)                       |
| `generate_ui_component`       | Code     | UI components with style audit, supports shadcn/ui, Radix, Headless UI, Material, PrimeVue |
| `generate_form`               | Code     | Production forms with Zod/Yup validation, multi-step flows, accessible markup              |
| `generate_page_template`      | Code     | Pre-built pages (landing, dashboard, auth, pricing, CRUD)                                  |
| `generate_prototype`          | Design   | Interactive HTML prototypes with navigation                                                |
| `generate_design_image`       | Design   | SVG/PNG mockups of UI screens                                                              |
| `image_to_component`          | Code     | Screenshot/wireframe to framework-specific component                                       |
| `refine_component`            | Code     | Improve components via natural language feedback                                           |
| `generate_api_route`          | Backend  | API routes with validation, auth, and error handling                                       |
| `generate_backend_module`     | Backend  | Full feature modules with routes, services, middleware                                     |
| `scaffold_backend`            | Backend  | Complete backend projects with auth, DB, monitoring                                        |
| `generate_from_template_pack` | Code     | Multi-page apps from curated packs (SaaS, Landing, AI Chat)                                |
| `figma_context_parser`        | Context  | Read Figma files, extract tokens, map to Tailwind                                          |
| `figma_push_variables`        | Design   | Write design tokens back to Figma                                                          |
| `fetch_design_inspiration`    | Context  | Extract visual metadata from URLs                                                          |
| `analyze_design_references`   | Context  | Analyze design references, detect patterns                                                 |
| `analyze_design_image`        | ML       | Analyze design images for training data                                                    |
| `analyze_component_library`   | Context  | Analyze component library patterns                                                         |
| `audit_accessibility`         | Quality  | WCAG 2.1 audit with fix suggestions                                                        |
| `submit_feedback`             | Quality  | Submit feedback to improve future output                                                   |
| `manage_training`             | ML       | Training data ingestion and fine-tuning                                                    |

## Framework & Library Support

| Library     | React             | Vue             | Angular           | Svelte             | HTML         |
| ----------- | ----------------- | --------------- | ----------------- | ------------------ | ------------ |
| shadcn/ui   | shadcn/ui         | shadcn-vue      | Tailwind          | bits-ui            | Tailwind     |
| Radix       | @radix-ui/react   | @radix-ui/vue   | Tailwind          | @radix-ui/svelte   | Tailwind     |
| Headless UI | @headlessui/react | @headlessui/vue | Tailwind          | @headlessui/svelte | Tailwind     |
| Material    | @mui/material     | Vuetify         | @angular/material | @smui/material     | Tailwind     |
| PrimeVue    | Headless UI       | primevue        | primeng           | Tailwind           | Tailwind     |
| none        | Tailwind CSS      | Tailwind CSS    | Tailwind CSS      | Tailwind CSS       | Tailwind CSS |

## Brand Identity Integration

All generation tools accept an optional `brand_identity` parameter — a JSON
string from [branding-mcp](https://github.com/Forge-Space/branding-mcp)'s
`generate_brand_identity` tool. When provided, brand colors, typography, and
spacing are injected into the design context.

## Environment Variables

| Variable             | Required             | Description                                                                     |
| -------------------- | -------------------- | ------------------------------------------------------------------------------- |
| `FIGMA_ACCESS_TOKEN` | Only for Figma tools | Token from [Figma Settings](https://www.figma.com/developers/api#access-tokens) |

## Development

```bash
npm install && npm run build
npm test                  # 437 tests, 35 suites
npm run validate          # lint + format + typecheck + test
```

## License

MIT
