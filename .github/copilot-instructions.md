## Land Plan — Copilot instructions

Be actionable and repository-specific. This file contains the minimal context an AI coding agent needs to be productive in the Land Plan monorepo.

- Repo layout (important places)
  - `apps/api` — Express + TypeScript backend using Prisma (SQLite by default). Key files:
    - `apps/api/src/index.ts` — REST endpoints (eg. `GET /api/plots`, `POST /api/tasks`).
    - `apps/api/src/lib/prisma.ts` — single PrismaClient export; reuse it (do not create multiple clients).
    - `apps/api/prisma/schema.prisma` — schema and enums (Role, Shade, TaskStatus) define the DB shape.
    - `apps/api/package.json` — dev scripts: `dev`, `prisma:migrate`, `prisma:generate`, `seed`.
  - `apps/web` — Vite + React (TypeScript) front-end. Key files:
    - `apps/web/package.json` — scripts: `dev`, `build` (`tsc -b && vite build`), `lint`, `preview`.
    - `apps/web/vite.config.ts` — basic Vite config (no proxy configured).
    - `apps/web/src` — React Router routes and components (e.g. `App.tsx`, `routes/*`).

- Quick dev workflows (how to run things here)
  - Install: prefer the workspace package manager (repo contains pnpm workspace files). At the repo root run your package manager (e.g. `pnpm install`).
  - API (backend):
    - Dev: `cd apps/api && pnpm dev` (runs `ts-node-dev --respawn --transpile-only src/index.ts`). This starts the server on port `4000` by default.
    - Migrations: `cd apps/api && pnpm run prisma:migrate` or use your workspace filter: `pnpm --filter api run prisma:migrate`.
    - Seed: `cd apps/api && pnpm run seed`.
  - Web (frontend):
    - Dev: `cd apps/web && pnpm dev` (Vite). By default Vite runs on another port (eg. 5173). The API has CORS enabled, so frontend can call `http://localhost:4000` or add a Vite proxy if you prefer same-origin.

- Data and environment
  - `apps/api` expects `DATABASE_URL` (Prisma). Default schema uses SQLite — look at `apps/api/prisma/schema.prisma` for model shapes.
  - When changing models: run `prisma:migrate` and `prisma:generate` then re-run the server.

- Coding patterns & conventions to follow
  - Reuse the exported `prisma` from `apps/api/src/lib/prisma.ts` across files; it's a singleton client.
  - API endpoints are thin Express handlers that directly use Prisma. Follow the style in `apps/api/src/index.ts` (simple checks, status codes, and JSON responses).
  - Front-end routes fetch from the REST endpoints (see `routes/*`). Prefer using TanStack Query (installed) for data fetching and caching.
  - State: the front-end uses `zustand` for local/global state — look for small, focused stores rather than large monolithic contexts.

- Integration notes / pitfalls
  - No Vite proxy present in `apps/web/vite.config.ts`. Either call the API with the full origin `http://localhost:4000` during dev, or add a proxy entry in the Vite config if you want same-origin paths.
  - The API enables CORS — so cross-origin calls from the dev server are acceptable.
  - Be careful with TypeScript `type` settings: `apps/api` is `commonjs`, `apps/web` is `module` (see each `package.json`). Keep imports/exports consistent per package.

- Examples (copyable) — use these when adding or testing endpoints
  - Fetch plots from the front-end: `fetch('http://localhost:4000/api/plots')` — see `apps/api/src/index.ts` for implementation.
  - Create a task (POST): `POST http://localhost:4000/api/tasks` with JSON `{ "title": "Water beds", "bedId": 1, "dueDate": "2025-11-10" }`.

If anything here is ambiguous, tell me which area you want expanded (dev workflow, API shapes, front-end data layer examples, or workspace tooling) and I will iterate.
