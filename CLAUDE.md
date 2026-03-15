# Siza MCP

## Quick Reference

```bash
NODE_OPTIONS=--experimental-vm-modules npm run build
NODE_OPTIONS=--experimental-vm-modules npm test
npm run registry:check          # validate server.json ↔ package.json
npm run validate:all            # lint + format + tsc + test + build
```

## Project

- Thin MCP protocol adapter for AI-powered UI/backend code generation
- All AI/ML, generators, registry, feedback, and quality code lives in
  `@forgespace/siza-gen`
- GitHub: Forge-Space/ui-mcp, default branch: `main`
- npm: `@forgespace/ui-mcp`, binary: `forgespace-ui-mcp`
- Bundle: ~403 KB (tools, services, resources only)

## Architecture

```
@forgespace/ui-mcp (this repo)    @forgespace/siza-gen
├── src/index.ts (MCP server)     ├── ml/        (embeddings, quality, training)
├── tools/     (33 tool files)    ├── generators/ (react, vue, angular, svelte, html)
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
- 45 test suites, 529 tests (tool-level + integration)
- siza-gen has 343 additional tests for AI/registry internals

## Distribution

- `server.json` — MCP Registry metadata (io.github.forge-space/ui-mcp)
- `publish.yml` — tag-driven: push `v*` → npm publish + MCP Registry + GitHub release
- `mcp-registry-status.yml` — weekly tracking issue with npm/registry drift
- `registry:check` — pre-publish validation (server.json ↔ package.json alignment)

## What Stays Here

- `src/tools/` — 33 tool files (schema + handler glue)
- `src/services/` — Figma, analysis, generation, design services
- `src/resources/` — MCP resource providers
- `src/lib/` — browser-scraper, design-extractor, figma-client, image-analyzer,
  image-renderer, pattern-detector, prototype-builder, style-audit,
  tailwind-mapper, templates/
- `scripts/` — registry-check.mjs, mcp-registry-status.mjs

## Gotchas

- PostToolUse hooks may revert Edit/Write — use `python3 << 'PYEOF'` via Bash
  for bulk edits
- Subagents consistently use invalid enum values — always `tsc --noEmit` after
  subagent work
- `fail()` unavailable in Jest ESM — use `throw new Error()`
- All AI/registry imports must come from `@forgespace/siza-gen`, not `./lib/`
- MCP server version is dynamic (reads package.json via createRequire)
- When bumping version: update both `package.json` and `server.json`
