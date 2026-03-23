---
title: "Dockerizing My Local Development Environment"
description: "How I standardized my Laravel and React development workflow using Docker, and why you should consider doing the same."
pubDate: 2025-01-10
category: "devops"
draft: false
---

# Dockerizing My Local Development Environment

For years, I managed my development environment manually - installing PHP, MySQL, Node.js versions directly on my machine. It worked until it didn't. "Works on my machine" became an all-too-familiar phrase. Here's how Docker changed my workflow.

## The Problem with Manual Setup

Last year, I was working on three different Laravel projects simultaneously:
- Project A: Laravel 9, PHP 8.1, MySQL 5.7
- Project B: Laravel 10, PHP 8.2, MySQL 8.0
- Project C: Laravel 11, PHP 8.3, PostgreSQL 14

Switching between them was a nightmare. PHP version managers helped, but database versions and other dependencies were still painful.

## My Current Docker Setup

I now use Docker Compose for all projects. Here's a typical `docker compose.yml` for my Laravel projects:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - .:/var/www/html
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=local
      - DB_HOST=db
    depends_on:
      - db
      - redis

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3306:3306"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  frontend:
    image: node:20-alpine
    working_dir: /app
    volumes:
      - ./frontend:/app
    command: npm run dev
    ports:
      - "3000:3000"

volumes:
  db_data:
```

## The Benefits

### 1. Consistency Across Teams

New team member onboarding is now:
```bash
git clone <repo>
cd project
docker compose up -d
```

No more "install PHP, then MySQL, then Redis, then..."

### 2. Isolation

Each project runs in its own container with exact versions it needs. No conflicts, no surprises.

### 3. Production Parity

My local environment now closely mirrors production. I caught a bug last month that only appeared in MySQL 8.0's strict mode - something I would have missed with my old setup.

## Frontend Development with Docker

For React/Vue projects, I use a multi-stage Dockerfile:

```dockerfile
# Development stage
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production runtime (nginx)
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## Common Commands I Use

Created some handy aliases in my `.zshrc`:

```bash
alias dcu="docker compose up -d"
alias dcd="docker compose down"
alias dcr="docker compose restart"
alias dce="docker compose exec app"
alias dcl="docker compose logs -f"
```

Running artisan commands:
```bash
docker compose exec app php artisan migrate
docker compose exec app php artisan tinker
```

## The Learning Curve

Docker isn't without its challenges:
- **Volume permissions** on Linux/Mac can be tricky
- **Performance** on macOS used to be painful (Docker Desktop has improved)
- **Debugging** inside containers requires setup

But the benefits far outweigh the initial learning investment.

## My Recommendation

If you're still managing local dependencies manually, give Docker a try. Start with a simple `docker compose.yml` for your next project. You might struggle for the first few days, but you'll thank yourself later.

Have you Dockerized your dev environment? What challenges did you face?
