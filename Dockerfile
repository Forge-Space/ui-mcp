# ── Build stage ──────────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# ── Runtime stage ────────────────────────────────────────────
FROM node:22-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends tini && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Bundle local fonts for offline rendering
# Copy to /app/assets/ since import.meta.url from dist/lib/ resolves to ../../assets/
COPY src/assets/ ./assets/

# Run as non-root
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup appuser && \
    chown -R appuser:appgroup /app
USER appuser

ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
