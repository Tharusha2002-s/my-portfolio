# ==========================================
# Stage 1: Build stage (compile TypeScript & Prisma)
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install openssl for Prisma query engine
RUN apk add --no-cache openssl

# Install dependencies based on package-lock.json
COPY package*.json ./
RUN npm ci

# Copy Prisma schema and generate Prisma Client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy application source code and tsconfig
COPY tsconfig.json ./
COPY src ./src/

# Compile TypeScript to JavaScript in /dist
RUN npm run build

# ==========================================
# Stage 2: Production runtime stage
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Install openssl required for Prisma on Alpine Linux
RUN apk add --no-cache openssl wget

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma schema and generate client for production runtime
COPY prisma ./prisma/
RUN npx prisma generate

# Copy compiled JavaScript output from the builder stage
COPY --from=builder /app/dist ./dist

# Create and switch to non-root user for security
USER node

# Expose API port
EXPOSE 5001

# Healthcheck to verify the server is responding to HTTP requests
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

# Start the Node.js production server
CMD ["node", "dist/server.js"]
