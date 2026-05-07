# 2026-05-07 Phase 2 Frontend Migration

## Summary

Implemented Phase 2 by migrating the Vite prototype direction into the
production Next.js app in `apps/web`. The app now has a shared site shell,
responsive navigation, footer, migrated home hero, route foundations, reusable
UI primitives, form field primitives, admin shell, and reusable state panels.

The production app uses branded code-native graphic panels instead of photo
assets or external image URLs. The legacy Vite `frontend/` folder remains as a
temporary non-production migration reference.

## Validation

- Passed `corepack pnpm --filter @mrsign/web exec tsc --noEmit --incremental false`.
- Passed `corepack pnpm --filter @mrsign/web exec eslint .`.
- Passed `corepack pnpm --filter @mrsign/web format:check`.
- Passed `corepack pnpm --filter @mrsign/web build`.
- Browser-checked the migrated home page and request quote route on the local dev server.
- Dedicated mobile/tablet/large-desktop screenshots and final side-by-side Vite parity signoff remain tracked in the build plan.

## Edited Files

- `README.md`
- `apps/web/src/app/*`
- `apps/web/src/components/*`
- `apps/web/src/lib/site.ts`
- `frontend/README.md`
- `docs/eng/mr-sign-build-plan.md`
