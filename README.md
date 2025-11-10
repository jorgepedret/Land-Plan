# Land Plan

A minimal full‑stack app to help growers plan plots, beds, plants, and day‑to‑day tasks. Built as a pragmatic scaffold you can extend for Grower, Worker, and Admin roles.

## Purpose

Land Plan streamlines small‑to‑mid farm operations:
- Organize plots and beds
- Track plants per bed
- View and check off tasks for today and this week
- Prepare for Admin‑level plant databases and cultivation practices

## Tech Stack

- Web: React 18, Vite, TypeScript, Tailwind CSS v4
- Routing/Data: React Router, React Query
- API: Node.js (Express)
- Database: Prisma ORM with SQLite in dev, Postgres optional in prod
- Monorepo: pnpm workspaces

## Repo Structure

```
apps/
    web/   # Vite React frontend
    api/   # Express + Prisma backend
```

## Prerequisites

- Node.js 18+ (20+ recommended)
- pnpm 9+
- Git
- Optional for prod: Docker or PM2, and Postgres if not using SQLite

## Quick Start (Local)

1) Install deps at the repo root

```
pnpm install
```

2) Backend: configure DB and migrate

```
cd apps/api

echo 'DATABASE_URL="file:./prisma/dev.db"' > .env

npx prisma generate

npx prisma migrate dev --name init

# Optional seed (if seed.ts exists):

# pnpm run seed

pnpm dev

# API runs at http://localhost:4000
```

3) Frontend: start Vite
```
cd ../web

# Ensure src/index.css contains:

# @import "tailwindcss";

pnpm dev

# Web runs at http://localhost:5173
```

4) Frontend → API URL (optional)
- If your API is not at http://localhost:4000, create apps/web/.env:
```

VITE_API_URL="http://localhost:4000"

```

## Environment Variables

apps/api/.env
```
DATABASE_URL="file:./prisma/dev.db"     # Dev (SQLite)

# DATABASE_URL="postgresql://USER:PASS@HOST:5432/landplan?schema=public"  # Prod (Postgres)

PORT=4000
```

apps/web/.env (optional)
```
VITE_API_URL="http://localhost:4000"
```

## Scripts

Root
```
pnpm --filter api dev
pnpm --filter web dev
```

API (apps/api/package.json)
```
dev                # ts-node-dev src/index.ts

prisma:migrate     # prisma migrate dev --name init

prisma:generate    # prisma generate

seed               # ts-node-dev prisma/seed.ts (if present)
```

Web (apps/web/package.json)
```
dev                # vite
build              # vite build
preview            # vite preview
```

## Deploying on Your Own Server

### Option A — Docker Compose (recommended)
- Services:
  - api: Node 20 image, env DATABASE_URL, exposes 4000
  - web: build with vite, serve dist via nginx on 80
  - postgres: optional, use in DATABASE_URL
- Steps:
```
docker compose up -d
```

### Option B — Bare VM with PM2 + Nginx
- API
  - Install Node + pnpm
  - cd apps/api
  - Set DATABASE_URL in .env
  - npx prisma generate && npx prisma migrate deploy
  - pm2 start src/index.ts --interpreter ./node_modules/.bin/ts-node --name landplan-api
- Web
  - cd apps/web && pnpm build
  - Serve ./dist via nginx:
    - root /path/to/apps/web/dist
    - try_files $uri /index.html

## Features (Current)

- Minimal dashboard shell (no sidebar variant available)
- Plots list and detail
- Beds detail with plants and tasks
- “Today” and “This week” tasks views

## Roadmap (Next)

- Worker read‑only dashboard with check‑off flow
- Admin “Plants Database” with cultivation practices
- Auth and multi‑tenant growers
- CSV import/export

## Troubleshooting

- Tailwind classes don’t apply
  - src/index.css must contain: `@import "tailwindcss";`
  - Ensure main.tsx imports the CSS, then restart Vite
- Prisma DATABASE_URL missing
  - apps/api/.env must exist and schema must use `url = env("DATABASE_URL")`
  - Run from apps/api or pass `--schema` path explicitly

## License

Land Plan Public Attribution License (custom)

Permissive use, modification, and distribution, with required attribution in code and in any deployed service.

See: ./LICENSE for details

## Acknowledgments

Built for farms, community food systems and home gardens.

## Contact and Collaboration

We’d love to know if you’re inspired by this, are using it, or want to collaborate. Email us at jorgepedret@gmail.com.