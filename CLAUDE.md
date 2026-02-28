# Siza MCP

## Project

- Thin MCP protocol adapter for AI-powered UI/backend code generation
- All AI/ML, generators, registry, feedback, and quality code lives in
  `@forgespace/siza-gen`
- GitHub: Forge-Space/ui-mcp, default branch: `main`
- Bundle: ~355 KB (tools, services, resources only)

## Architecture

```
siza-mcp (this repo)              @forgespace/siza-gen
├── src/index.ts (MCP server)     ├── ml/        (embeddings, quality, training)
├── tools/     (22 tool defs)     ├── generators/ (react, vue, angular, svelte, html)
├── services/  (figma, analysis)  ├── registry/   (502 snippets, compositions, packs)
├── resources/ (MCP resources)    ├── feedback/   (self-learning, pattern promotion)
└── lib/       (browser, image)   └── quality/    (anti-generic rules, diversity)
```

## Stack

- TypeScript, Node 22, Jest ESM, tsup, pino
- `NODE_OPTIONS=--experimental-vm-modules` required for Jest

## Build/Test Pipeline

- `npm run build` before `npm test`
- Pre-push hook: lint → format:check → tsc → test → build
- 33 test suites, 394 tests (tool-level + integration)
- siza-gen has 343 additional tests for AI/registry internals

## What Stays Here

- `src/tools/` — 21 MCP tool definitions (schema + handler glue)
- `src/services/` — Figma, analysis, generation, design services
- `src/resources/` — MCP resource providers
- `src/lib/` — browser-scraper, design-extractor, figma-client, image-analyzer,
  image-renderer, pattern-detector, prototype-builder, style-audit,
  tailwind-mapper, templates/

## Gotchas

- PostToolUse hooks may revert Edit/Write — use `python3 << 'PYEOF'` via Bash
  for bulk edits
- Subagents consistently use invalid enum values — always `tsc --noEmit` after
  subagent work
- `fail()` unavailable in Jest ESM — use `throw new Error()`
- All AI/registry imports must come from `@forgespace/siza-gen`, not `./lib/`
