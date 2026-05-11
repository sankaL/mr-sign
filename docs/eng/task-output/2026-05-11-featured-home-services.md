# Featured Home Services

Date: 2026-05-11

## Summary

Updated the home page popular services section so it uses the same DB-backed featured flag that admins control on services. Active featured services now populate the homepage, and the existing static featured list remains a fallback when no featured public services are available.

## Edited Files

- `apps/web/src/lib/public-services.ts`
- `apps/web/src/components/site/hero.tsx`
- `apps/web/src/app/actions/admin-services.ts`
- `docs/eng/mr-sign-build-plan.md`

## Verification

- Passed `corepack pnpm typecheck`
- Passed `corepack pnpm build`
- Confirmed the local Docker database currently returns active featured rows for the homepage list.
