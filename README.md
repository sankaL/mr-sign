# Mr. Sign and Print

Production repository for the Mr. Sign and Print website redesign MVP.

## App Structure

- `apps/web`: production Next.js app for the public website and admin portal.
- `frontend`: legacy Vite prototype and migration source only. Keep it available until Phase 2 visual parity is accepted, but do not treat it as a production app.
- `docs`: PRD, engineering plan, decision logs, and task output summaries.

## Local Setup

This repo uses pnpm through Corepack.

```sh
corepack prepare pnpm@10.33.4 --activate
corepack pnpm install
corepack pnpm dev
```

The production app runs from `apps/web`. By default, Next.js serves it at `http://localhost:3000`.

## Standard Commands

```sh
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm format:check
corepack pnpm build
```

Use `apps/web/.env.example` as the starting point for local environment variables.
