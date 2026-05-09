# 2026-05-08: Phase 4 Public Pages

## Summary

Implemented Phase 4 as a static, copy-driven public website layer for the Next.js app. Added a shared content catalog, seeded legacy pricing summaries from the old website, generated all required public imagery with the built-in image tool, and wired category, service, gallery, location, contact, and not-found pages.

## Key Changes

- Added `packages/content` with typed service categories, service details, SEO copy, pricing summaries, image metadata, route helpers, featured services, gallery services, and catalog validation tests.
- Updated `packages/db` seed logic to use the shared catalog for categories, services, image metadata, SEO metadata, and public pricing.
- Added 46 generated PNG assets under `apps/web/public/images/generated/`.
- Rebuilt `/`, `/signs`, `/printing`, `/design`, dynamic category-scoped service routes, `/location`, `/contact`, `/gallery`, `/request-quote`, `/order-online`, and custom not-found.
- Kept Phase 5 behavior out of scope: no live form submission, uploads, checkout, payment, customer accounts, or customer login.

## Verification

- `corepack pnpm --recursive --if-present typecheck`
- `corepack pnpm lint`
- `corepack pnpm build`
- `corepack pnpm test`
- Browser smoke check for desktop routes: `/`, `/signs`, `/signs/channel-letters`, `/printing/business-cards`, `/design/logos`, `/location`, `/contact`, `/gallery`, and `/missing-route`.
- Browser smoke check for mobile routes: `/`, `/signs`, `/signs/channel-letters`, `/location`, `/contact`, `/gallery`, and `/missing-route`.

Build and test commands needed escalation because Turbopack and `tsx` create local worker or IPC sockets blocked by the sandbox.

## Edited Files

- `apps/web`
- `apps/web/public/images/generated`
- `packages/content`
- `packages/db/scripts/seed.ts`
- `packages/db/tsconfig.json`
- `package.json`
- `pnpm-lock.yaml`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/decisions/decision-log-001.md`
