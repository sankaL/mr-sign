# Screenshot-Faithful Site Redesign

Date: 2026-07-01

## Summary

Rebuilt the visual system for every public page family to closely match the supplied editorial reference.

- Replaced the previous neon, red, yellow, pill-heavy, and oversized-uppercase styling with warm white, paper white, deep navy, cool gray, and restrained amber.
- Added Libre Baskerville and Manrope through `next/font`.
- Rebuilt the navigation, mobile menu, logo treatment, homepage, page headers, service cards, gallery, CTA, contact strip, and footer.
- Restyled category, service-detail, About, FAQs, Contact, Location, pricing-contact, compatibility, and 404 pages.
- Generated and integrated five new landing-page images for the facade hero, channel letters, vehicle graphics, printed materials, and sign maintenance.
- Added a typed home featured-image collection and asset-existence validation.
- Removed unused components associated with the old 3D, signage-panel, pricing, card, and state patterns.

## Edited Files

- `apps/web/src/app/`
- `apps/web/src/components/`
- `apps/web/public/images/generated/`
- `packages/content/content/site.json`
- `packages/content/src/`
- `packages/content/tests/catalog.test.ts`
- `docs/DESIGN.md`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/decisions/decision-log-001.md`

## Verification

Passed:

- `corepack pnpm --filter @mrsign/web typecheck`
- `corepack pnpm --filter @mrsign/content test`
- `corepack pnpm --filter @mrsign/web lint`
- `corepack pnpm --filter @mrsign/web build`, including all 74 static routes
- Desktop visual checks for home, category, service detail, gallery, and contact layouts
- Responsive checks at the requested desktop, tablet, mobile, and narrow-mobile breakpoints
- Route-family smoke checks for About, FAQs, Location, pricing contact, order compatibility, legacy Design compatibility, Printing, Services, and 404
- Mobile-menu behavior, active navigation, image rendering, map rendering, and horizontal-overflow checks
