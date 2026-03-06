# ============================================================
# Next Chapter Travel — Production Dockerfile
# Builds both the Vite frontend and Express backend,
# then serves everything from a single Node.js process.
# ============================================================

# ── Stage 1: Build ───────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests first for layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDeps needed for build)
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build: Vite (client → dist/public) + esbuild (server → dist/index.js)
RUN pnpm run build

# ── Stage 2: Production image ────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Install pnpm for production install
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Render injects PORT automatically; default to 3000 for local runs
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
