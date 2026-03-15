# Forge Space Strategic Positioning (updated 2026-03-15)

## Identity

- **What**: The Open Full-Stack AI Workspace
- **Tagline**: "Generate. Integrate. Ship."
- **Problem**: Nobody owns the full-stack integration layer between AI code
  generation and production deployment

## siza-mcp (ui-mcp) Role

- Specialized MCP server for UI generation, template management, and design
  context (33 tool files)
- npm: @forgespace/ui-mcp, MCP Registry: io.github.forge-space/ui-mcp
- Core of the AI component generation pipeline: brand context (branding-mcp) →
  UI generation (ui-mcp) → routing (mcp-gateway) → web app (siza)

## Differentiation

1. **MCP-Native Architecture** — composable tools, swap AI providers, chain tools
2. **Low Cost, Generous Free Tier** — scalable infrastructure, high free-tier limits
3. **Privacy-First BYOK** — client-side AES-256, we cannot read user keys
4. **Self-Hostable** — Docker, MIT, full infrastructure control

## Ecosystem (6 repos)

| Repo         | GitHub                   | Role                                          |
| ------------ | ------------------------ | --------------------------------------------- |
| siza         | Forge-Space/siza         | Web app + API (Next.js, Cloudflare Workers)   |
| core         | Forge-Space/core         | Shared patterns, MCP context, security        |
| mcp-gateway  | Forge-Space/mcp-gateway  | MCP aggregation, routing, auth                |
| ui-mcp       | Forge-Space/ui-mcp       | UI generation MCP server (33 tool files)      |
| siza-gen     | Forge-Space/siza-gen     | AI generation library (ML, registry, quality) |
| branding-mcp | Forge-Space/branding-mcp | Brand identity MCP server (7 tools)           |

## Distribution

- npm + MCP Registry (tag-driven publish.yml)
- Weekly registry status tracking via GitHub Issues automation
- Binary: forgespace-ui-mcp (npx @forgespace/ui-mcp)

## Pricing

- Free ($0, 10 gen/month, BYOK unlimited), Pro ($19, 500 gen), Team ($49, 5
  seats), Enterprise (custom)

## Revenue Streams

1. SaaS subscriptions (Stripe integrated)
2. Template marketplace (70/30 creator split)
3. Managed MCP Gateway ($25/user/month)
4. Enterprise consulting

## Community: shadcn/ui + Supabase hybrid model

- Phase 1: Discord, CONTRIBUTING.md, good first issues, public roadmap
- Phase 2: MCP server directory, template marketplace, monthly calls
- Phase 3: Framework partnerships, university programs, enterprise pilots
