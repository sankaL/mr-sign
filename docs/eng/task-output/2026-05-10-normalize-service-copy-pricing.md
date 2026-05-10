# Normalize Service Copy and Pricing

Date: 2026-05-10

## Summary

Normalized the public service content baseline so service pages use curated legacy-derived descriptions without exposing old pricing tables or legacy wording. Public pricing now resolves to either one starting price with one unit reference, or request-quote copy when there is no reliable primary base price.

## Edited Files

- `packages/content/src/data/normalized-service-content.ts`
- `packages/content/src/data/service-utils.ts`
- `packages/content/src/pricing.ts`
- `packages/content/tests/catalog.test.ts`
- `packages/db/scripts/service-seed-reset.ts`
- `packages/db/scripts/seed.ts`
- `packages/db/scripts/seed-requests.ts`
- `packages/db/prisma.config.ts`
- `packages/db/package.json`
- `packages/db/tests/service-seed-reset.test.ts`
- `apps/web/src/components/site/pricing-summary.tsx`
- `apps/web/src/lib/public-services.ts`
- `docs/copy/pricing/design.md`
- `docs/copy/pricing/printing.md`
- `docs/copy/pricing/signs.md`
- `docs/eng/mr-sign-build-plan.md`

## Verification

- Passed `corepack pnpm --filter @mrsign/content test`
- Passed `corepack pnpm --filter @mrsign/db test`
- Passed `corepack pnpm typecheck`
- Passed `corepack pnpm build`
- Confirmed catalog output contains 31 `STARTING_FROM` services and 11 `REQUEST_QUOTE` services.
- Confirmed representative catalog values for awnings, coroplast, window lettering, business cards, large format printing, logos, and menu boxes.

## Notes

`pnpm db:seed` now loads the root `.env`, but the configured database host was not reachable from this shell, so the seed could not be applied to a live database during this task. The seed helpers and catalog output were verified statically.
