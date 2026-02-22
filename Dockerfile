# syntax=docker/dockerfile:1

# ── Build stage ──────────────────────────────────────────────
FROM node:24-alpine@sha256:4f696fbf39f383c1e486030ba6b289a5d9af541642fc78ab197e584a113b9c03 AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Use BuildKit cache mount for npm
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm install --ignore-scripts --legacy-peer-deps

# Copy source files
COPY tsconfig.json ./
COPY src/ ./src/

# Build application
RUN npm run build

# ── Runtime stage ────────────────────────────────────────────
FROM node:24-alpine@sha256:4f696fbf39f383c1e486030ba6b289a5d9af541642fc78ab197e584a113b9c03

# Install tini for proper signal handling
RUN apk add --no-cache tini

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json* ./

# Install production dependencies with cache
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm install --omit=dev --ignore-scripts --legacy-peer-deps && \
    npm cache clean --force

# Copy build output and assets
COPY --from=builder /app/dist ./dist
COPY src/assets/ ./assets/

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "process.exit(0)" || exit 1

# Labels
LABEL org.opencontainers.image.title="UIForge MCP"
LABEL org.opencontainers.image.description="MCP server for AI-driven UI generation"
LABEL org.opencontainers.image.version="0.1.0"
LABEL org.opencontainers.image.source="https://github.com/yourusername/uiforge-mcp"

ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
