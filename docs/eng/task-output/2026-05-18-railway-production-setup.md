# 2026-05-18 Railway Production Setup

## Summary

- Added Railway production deployment support for the `apps/web` Next.js app.
- Connected Railway to the GitHub repository for branch-based production deploys from `main`.
- Added an idempotent database bootstrap path so production deploys can run Prisma migrations, reseed canonical service data, and ensure the first admin account exists.
- Generated a Railway public domain and configured production environment variables for site URLs, auth, database connectivity, and first-admin bootstrap.

## Edited Files

- `.env.example`
- `.gitignore`
- `apps/web/.env.example`
- `apps/web/src/app/api/health/route.ts`
- `docs/eng/decisions/decision-log-001.md`
- `docs/eng/mr-sign-build-plan.md`
- `package.json`
- `railway.toml`
