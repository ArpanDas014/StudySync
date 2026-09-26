# ==========================================
# Multi-Stage Production Dockerfile
# Service: @studysync/server
# ==========================================

# --- Stage 1: Build & Compile TypeScript ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions and TypeScript config
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies required for tsc build)
RUN npm ci

# Copy TypeScript source code
COPY src/ ./src/

# Compile TypeScript to JavaScript in /app/dist
RUN npm run build


# --- Stage 2: Production Runner ---
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled JavaScript output from builder stage
COPY --from=builder /app/dist ./dist

# Use unprivileged 'node' user for security
USER node

# Expose default listening port
EXPOSE 3001

# Start the Fastify production server
CMD ["node", "dist/server.js"]
