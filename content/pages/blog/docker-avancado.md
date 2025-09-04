---
title: 'Docker para Desenvolvedores: Além do Básico'
slug: docker-para-desenvolvedores-avancado
date: '2024-03-10'
excerpt: >
  Técnicas avançadas de Docker para melhorar o workflow de desenvolvimento, 
  incluindo multi-stage builds, Docker Compose e otimizações de performance.
featuredImage:
  url: /images/img-placeholder.svg
  altText: Docker Advanced Techniques
  type: ImageBlock
seo:
  metaTitle: 'Docker Avançado para Desenvolvedores: Guia Completo'
  metaDescription: >
    Aprenda técnicas avançadas de Docker: multi-stage builds, otimizações, 
    Docker Compose e melhores práticas para desenvolvimento.
  metaTags: ['docker', 'devops', 'containers', 'desenvolvimento']
type: PostLayout
---

Docker se tornou essencial no desenvolvimento moderno, mas muitos desenvolvedores ficam apenas no básico. Neste post, compartilho técnicas avançadas que uso no dia a dia para otimizar workflows e melhorar a eficiência.

## Multi-Stage Builds: O Game Changer

Multi-stage builds permitem criar imagens menores e mais seguras:

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

# Copiar apenas dependências de produção
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Resultado: 800MB → 150MB

## Docker Compose Avançado

### 1. Profiles para Diferentes Ambientes

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

Uso:

```bash
# Desenvolvimento
docker-compose --profile app up

# Apenas banco para testes
docker-compose --profile db-only up

# Produção com proxy
docker-compose --profile production up
```

### 2. Override Files para Ambientes

```yaml
# docker-compose.override.yml (desenvolvimento)
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
# docker-compose.prod.yml (produção)
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

## Otimizações de Performance

### 1. Layer Caching Inteligente

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar apenas package.json primeiro (caching)
COPY package*.json ./
RUN npm ci --only=production

# Copiar código depois
COPY . .

# Build apenas se código mudou
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 2. .dockerignore Otimizado

```dockerignore
# Dependências
node_modules
npm-debug.log

# Arquivos de desenvolvimento
.git
.gitignore
README.md
.env
.nyc_output
coverage
.npm

# Arquivos de build local
dist
build

# Arquivos de IDE
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

## Desenvolvimento com Hot Reload

### Dockerfile para desenvolvimento:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalar nodemon globalmente
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

# Usar nodemon em desenvolvimento
CMD ["nodemon", "--legacy-watch", "src/index.js"]
```

### Docker Compose com volumes:

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
      - /app/node_modules  # Volume anônimo para node_modules
    environment:
      - NODE_ENV=development
```

## Health Checks e Monitoring

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

### Implementando endpoint de health:

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

## BuildKit e Advanced Features

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

# Mount cache para npm
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

COPY . .
CMD ["npm", "start"]
```

## Segurança em Containers

### 1. Non-root User

```dockerfile
FROM node:18-alpine

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY . .
RUN npm ci --only=production

# Mudar ownership dos arquivos
RUN chown -R nextjs:nodejs /app

# Mudar para usuário não-root
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Scan de Vulnerabilidades

```bash
# Scan de imagem
docker scan myapp:latest

# Usando Trivy
trivy image myapp:latest

# Integração com CI/CD
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:latest
```

## Scripts de Automação

### Makefile para Docker:

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

## Debugging em Containers

### 1. Debug com Node.js

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install

# Expor porta de debug
EXPOSE 3000 9229

# Comando com debug habilitado
CMD ["node", "--inspect=0.0.0.0:9229", "src/index.js"]
```

### 2. Docker Compose para debug:

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

## Monitoramento e Logs

### 1. Centralizando Logs

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

### 2. Métricas com Prometheus

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "9090:9090"  # Métricas

  prometheus:
    image: prom/prometheus
    ports:
      - "9091:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
```

## Conclusão

Docker oferece muito mais do que containerização básica. Com essas técnicas avançadas, você pode:

- **Reduzir tamanho** das imagens significativamente
- **Acelerar builds** com caching inteligente
- **Melhorar segurança** com práticas adequadas
- **Automatizar workflows** de desenvolvimento e deploy
- **Monitorar aplicações** efetivamente

O investimento em aprender essas técnicas se paga rapidamente em produtividade e qualidade do código.

---

*Quer discutir mais sobre Docker e DevOps? Me encontre no [LinkedIn](https://www.linkedin.com/in/thiago-peraro/) ou confira meus projetos no [GitHub](https://github.com/tperaro).*
