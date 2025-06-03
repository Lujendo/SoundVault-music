# Multi-stage build for production optimization

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Setup backend
FROM node:18-alpine AS backend-setup
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Stage 3: Production image
FROM node:18-alpine AS production
WORKDIR /app

# Install PostgreSQL client for database operations
RUN apk add --no-cache postgresql-client

# Copy backend files
COPY --from=backend-setup /app/backend/node_modules ./backend/node_modules
COPY backend ./backend

# Copy frontend build
COPY --from=frontend-builder /app/dist ./frontend/dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S soundvault -u 1001

# Create necessary directories
RUN mkdir -p /app/uploads && chown -R soundvault:nodejs /app

# Switch to non-root user
USER soundvault

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node backend/src/scripts/healthcheck.js

# Start the application
CMD ["node", "backend/src/server.js"]
