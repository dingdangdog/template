# GT Finance 3 AI Collaboration Guide

## Purpose

This file defines the default development rules for AI tools working in this repository.
When an AI agent modifies code, it should read and follow this file first.

## Project Snapshot

- Stack: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Pinia, Prisma, PostgreSQL.
- App structure:
  - `app/`: frontend pages, layouts, stores, middleware, composables, shared utilities.
  - `server/`: Nitro server APIs, middleware, server utilities, Prisma access.
  - `prisma/`: schema and generated client output.
  - `docs/`: chronological change records and project documents.

## Core Principles

- Prefer small, local, incremental changes over broad rewrites.
- Follow existing project structure and naming before introducing new patterns.
- Keep frontend and backend responsibilities clear.
- Preserve TypeScript type safety; avoid `any` unless there is no practical alternative.
- Do not modify generated files unless the task explicitly requires regeneration.

## Required Workflow For AI Agents

1. Read the relevant code before editing.
2. Reuse existing utilities, stores, middleware, and response formats when possible.
3. Keep changes scoped to the user request.
4. After every code change, add a new chronological document under `docs/`.

## Documentation Rule

- Every code modification must add one new document in `./docs`.
- File names must start with a sortable numeric prefix, for example:
  - `0001-xxx.md`
  - `0002-xxx.md`
- The document should briefly record:
  - change background
  - affected files
  - main implementation points
  - follow-up notes or risks

## Frontend Conventions

- Use `script setup` with TypeScript in Vue SFCs.
- Prefer composition-style logic and keep page components thin.
- Shared state belongs in Pinia stores under `app/stores/`.
- Shared client utilities belong in `app/utils/`.
- Route-level auth control should use existing middleware such as:
  - `app/middleware/auth.ts`
  - `app/middleware/admin.ts`
- Reuse existing layout structure before creating a new layout.
- Styling should prefer Tailwind utility classes and existing theme tokens like:
  - `bg-background`
  - `text-foreground`
  - `border-border`

## Backend Conventions

- Server endpoints should live under `server/api/`.
- Reuse the existing unified response envelope from `server/utils/result.ts`.
- Existing response structure is:
  - `c`: status code
  - `m`: message
  - `d`: data
- Auth-related APIs and protected routes should align with current middleware rules in `server/middleware/auth.ts`.
- Database access should go through `server/lib/prisma.ts`.

## Data And Prisma Conventions

- Treat `prisma/generated/` as generated output; do not hand-edit it.
- Schema changes should be made in `prisma/schema.prisma`.
- New database-related logic should keep model names, field names, and API payloads consistent.
- Do not manually create `migrations` files or folders. Developers should run Prisma migration commands themselves to generate migration artifacts.
- Prefer convention-based relations over hard database foreign key constraints when designing tables.
- In Prisma schema design, avoid introducing strong foreign key constraints just to express relationships. Use agreed naming and field conventions to keep table operations more flexible.

## Existing Project Constraints

- The project already includes login, logout, user info, admin route protection, and theme management. Extend these flows instead of rebuilding them.
- Some files contain garbled Chinese text caused by encoding issues. Do not mass-rewrite text encoding unless the task is specifically to fix encoding.
- There is an existing type inconsistency risk between Prisma `User.id` and `app/utils/model.ts` `UserInfo.id`. Check related code carefully before extending user models.
- `package.json` currently contains suspicious version string characters in some dependency values. Avoid unrelated dependency churn unless the task is package maintenance.

## File Placement Rules

- New pages: `app/pages/`
- New reusable UI components: `app/components/`
- New stores: `app/stores/`
- New composables: `app/composables/`
- New frontend utilities/types: `app/utils/`
- New server endpoints: `server/api/`
- New server-only helpers: `server/utils/` or `server/lib/`

## Change Safety Rules

- Do not rename or move files unless necessary for the task.
- Do not replace the existing API envelope format.
- Do not bypass auth middleware for protected routes.
- Do not commit secrets, tokens, or filled `.env` values into source files or docs.

## Preferred Output Style For AI Changes

- Keep code readable and minimal.
- Add comments only where logic is genuinely non-obvious.
- When introducing a new convention, document it in the matching `docs/` record.
