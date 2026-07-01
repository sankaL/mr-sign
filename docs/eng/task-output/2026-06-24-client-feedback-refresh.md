# Client Feedback Refresh

Date: 2026-06-24

## Summary

Implemented the client feedback refresh for the static public site.

- Made the home page sign-first, reduced Printing emphasis, added Services, changed the spinning badge to Contact Us, and updated the service-area tagline to 1998.
- Removed the home process flow and visit-us map section, then replaced Popular Services with the requested everyday quoted products and services list.
- Replaced the active public Design category with Services for sign maintenance while keeping hidden noindex compatibility pages for old Design URLs.
- Added About Us and FAQs pages, refreshed navigation and footer links, and removed visible public pricing surfaces from category and service-detail pages.
- Updated the Signs catalog with requested additions and removals, alphabetized the public Signs listing, and added sign maintenance services.
- Added project image assets for the new Services category and new service records.

## Edited Files

- `apps/web/src/app/`
- `apps/web/src/components/site/`
- `apps/web/src/components/ui/`
- `apps/web/src/lib/`
- `apps/web/public/images/generated/`
- `packages/content/content/`
- `packages/content/src/`
- `packages/content/tests/catalog.test.ts`
- `docs/DESIGN.md`
- `docs/mrsigns-prd.md`
- `docs/eng/mr-sign-tech-stack.md`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/decisions/decision-log-001.md`

## Verification

Passed:

- `corepack pnpm --recursive --if-present typecheck`
- `corepack pnpm --recursive --if-present test`
- `corepack pnpm --filter @mrsign/web lint`
- `corepack pnpm --filter @mrsign/web build`
- Exported output search for removed strings: `Request Quote`, `Popular services`, `Come visit us`, `Our Sign Services`, `Our Printing Services`, `View service`, and uppercase `Design`
- Desktop and mobile user-agent route smoke checks for `/`, `/signs`, `/printing`, `/services`, `/about-us`, `/faqs`, `/gallery`, `/location`, `/contact`, compatibility routes, and one service detail route per active category

Skipped:

- Browser screenshot smoke test because Playwright is not installed in the workspace and no browser screenshot connector was available in this run.
