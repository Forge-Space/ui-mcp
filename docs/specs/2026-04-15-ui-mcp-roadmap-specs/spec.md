---
status: proposed
created: 2026-04-15
owner: lucassantana
pr:
tags: roadmap,specs,mcp
---

# ui-mcp-roadmap-specs

## Goal
Make UIForge MCP roadmap work resumable through per-feature specs and generated roadmap state.

## Context
UIForge MCP changes often span server behavior, UI verification, and deployment checks. Specs keep those acceptance criteria durable.

## Approach
Seed one proposed spec for spec adoption, generate docs/roadmap.md, and require future multi-step MCP work to start from a spec.

## Verification
The roadmap lists this proposed spec and context-pack can retrieve it by repo and source type.
