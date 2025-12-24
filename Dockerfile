# Multi-stage build for RUSTBORNE

# Stage 1: Build bot
FROM node:18-alpine as bot-builder
WORKDIR /app/bot
COPY bot/package*.json ./
RUN npm ci
COPY bot/src ./src
COPY bot/tsconfig.json ./
RUN npm run build

# Stage 2: Build frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/tsconfig*.json ./
COPY frontend/vite.config.ts ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
RUN npm run build

# Stage 3: Production runtime
FROM node:18-alpine
WORKDIR /app

# Copy bot
COPY bot/package*.json ./bot/
COPY --from=bot-builder /app/bot/dist ./bot/dist
RUN cd bot && npm ci --omit=dev

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist ./frontend/public

# Copy shared config
COPY shared ./shared

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start bot
CMD ["node", "bot/dist/index.js"]
