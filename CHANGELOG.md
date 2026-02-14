# Changelog

## 0.1.0 (2026-02-14)

### Added

- **Server**: MCP server `uiforge` v0.1.0 with stdio transport
- **Tool `scaffold_full_application`**: Generate full project boilerplate for React, Next.js, Vue, and Angular with Tailwind CSS, Shadcn/ui, and optional state management (Zustand, Pinia, Signals)
- **Tool `generate_ui_component`**: Create UI components with style audit integration and design context awareness (button, card, form, navbar, hero, modal, etc.)
- **Tool `generate_prototype`**: Create interactive HTML prototypes with screen flows, navigation transitions (fade, slide), and embedded design tokens
- **Tool `generate_design_image`**: Generate SVG/PNG mockup images via satori + resvg (wireframe, mockup, component preview modes)
- **Tool `fetch_design_inspiration`**: Extract colors, typography, and layout hints from any URL
- **Tool `figma_context_parser`**: Read Figma file nodes, extract design tokens, map to Tailwind CSS utilities
- **Tool `figma_push_variables`**: Write design tokens back to Figma as Variables via the REST API
- **Resource `application://current-styles`**: Session-scoped IDesignContext as JSON
- **Lib**: Style audit (Tailwind config + CSS variable parsing), design extractor, Figma client, Tailwind mapper, image renderer, prototype builder
- **Templates**: React + Vite + Shadcn/ui, Next.js App Router + Shadcn/ui, Vue 3 + Pinia, Angular standalone + Signals
- **Tests**: 71 unit tests across 6 test files
- **Docker**: Multi-stage Dockerfile for production builds
