---
title: 'Docker for Developers: Beyond the Basics'
slug: docker-for-developers-advanced
translationKey: docker-avancado
date: '2024-03-10'
excerpt: >
  Advanced Docker techniques to improve development workflow, including
  multi-stage builds, Docker Compose and performance optimizations.
featuredImage:
  url: /images/img-placeholder.svg
  altText: Docker Advanced Techniques
  type: ImageBlock
seo:
  metaTitle: 'Advanced Docker for Developers: Complete Guide'
  metaDescription: >
    Learn advanced Docker techniques: multi-stage builds, optimizations,
    Docker Compose and best practices for development.
  metaTags: ['docker', 'devops', 'containers', 'development']
type: PostLayout
---

Docker has become essential in modern development, but many developers stay with the basics. In this post, I share advanced techniques I use daily to optimize workflows and improve efficiency.

## Multi-Stage Builds: The Game Changer

Multi-stage builds allow creating smaller and more secure images:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Result: 800MB → 150MB

## Advanced Docker Compose

### 1. Profiles for Different Environments

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis
    profiles: ["app"]

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    profiles: ["app", "db-only"]

  redis:
    image: redis:7-alpine
    profiles: ["app", "cache"]

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    profiles: ["production"]

volumes:
  postgres_data:
```

Usage:

```bash
# Development
docker-compose --profile app up

# Database only for testing
docker-compose --profile db-only up

# Production with proxy
docker-compose --profile production up
```

### 2. Override Files for Environments

```yaml
# docker-compose.override.yml (development)
version: '3.8'
services:
  app:
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

```yaml
# docker-compose.prod.yml (production)
version: '3.8'
services:
  app:
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

## Performance Optimizations

### 1. Smart Layer Caching

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy only package.json first (caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy code after
COPY . .

# Build only if code changed
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Optimized .dockerignore

```dockerignore
# Dependencies
node_modules
npm-debug.log

# Development files
.git
.gitignore
README.md
.env
.nyc_output
coverage
.npm

# Local build files
dist
build

# IDE files
.vscode
.idea
*.swp
*.swo

# Logs
logs
*.log

# Cache
.cache
.parcel-cache
```

## Development with Hot Reload

### Development Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

# Use nodemon in development
CMD ["nodemon", "--legacy-watch", "src/index.js"]
```

### Docker Compose with volumes:

```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules  # Anonymous volume for node_modules
    environment:
      - NODE_ENV=development
```

## Health Checks and Monitoring

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
```

### Implementing health endpoint:

```javascript
// src/health.js
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      database: checkDatabase(),
      redis: checkRedis(),
      memory: process.memoryUsage()
    }
  };

  res.status(200).json(healthcheck);
});
```

## BuildKit and Advanced Features

### 1. Parallel Builds

```dockerfile
# syntax=docker/dockerfile:1
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencies
RUN npm ci --only=production

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM dependencies AS final
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### 2. Cache Mounts

```dockerfile
# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

# Mount cache for npm
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

COPY . .
CMD ["npm", "start"]
```

## Security in Containers

### 1. Non-root User

```dockerfile
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY . .
RUN npm ci --only=production

# Change ownership of files
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Vulnerability Scanning

```bash
# Image scan
docker scan myapp:latest

# Using Trivy
trivy image myapp:latest

# CI/CD integration
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:latest
```

## Automation Scripts

### Makefile for Docker:

```makefile
.PHONY: build run test clean

IMAGE_NAME = myapp
VERSION = $(shell git rev-parse --short HEAD)

build:
	docker build -t $(IMAGE_NAME):$(VERSION) .
	docker tag $(IMAGE_NAME):$(VERSION) $(IMAGE_NAME):latest

run:
	docker-compose up -d

test:
	docker run --rm $(IMAGE_NAME):latest npm test

clean:
	docker system prune -f
	docker volume prune -f

push:
	docker push $(IMAGE_NAME):$(VERSION)
	docker push $(IMAGE_NAME):latest

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Debugging in Containers

### 1. Debug with Node.js

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install

# Expose debug port
EXPOSE 3000 9229

# Command with debug enabled
CMD ["node", "--inspect=0.0.0.0:9229", "src/index.js"]
```

### 2. Docker Compose for debug:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "9229:9229"  # Debug port
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

## Monitoring and Logs

### 1. Centralized Logging

```yaml
version: '3.8'
services:
  app:
    build: .
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  fluentd:
    image: fluent/fluentd:latest
    volumes:
      - ./fluent.conf:/fluentd/etc/fluent.conf
    depends_on:
      - elasticsearch
```

### 2. Metrics with Prometheus

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "9090:9090"  # Metrics

  prometheus:
    image: prom/prometheus
    ports:
      - "9091:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
```

## Conclusion

Docker offers much more than basic containerization. With these advanced techniques, you can:

- **Reduce image size** significantly
- **Speed up builds** with smart caching
- **Improve security** with proper practices
- **Automate workflows** for development and deployment
- **Monitor applications** effectively

The investment in learning these techniques pays off quickly in productivity and code quality.

---

*Want to discuss more about Docker and DevOps? Find me on [LinkedIn](https://www.linkedin.com/in/thiago-peraro/) or check my projects on [GitHub](https://github.com/tperaro).*
