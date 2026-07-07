# Remove retired sign services

Date: 2026-07-03

## Summary

Removed Changeable Letters, Vehicle Lettering, Plate Directory Board, and Vehicle Lettering and Wraps from the public catalog and supporting content. The published vehicle lettering route is no longer generated, and Home, Gallery, related-service links, SEO copy, the PRD, and copy references now use remaining services.

## Edited files

- `apps/web/src/components/site/home-sections.tsx`
- `apps/web/src/app/signs/[serviceSlug]/page.tsx`
- `packages/content/src/data/services.ts`
- `packages/content/content/categories.json`
- `packages/content/content/site.json`
- `packages/content/content/services/`
- `packages/content/tests/catalog.test.ts`
- `docs/mrsigns-prd.md`
- `docs/copy/`
- `docs/eng/mr-sign-build-plan.md`

## Verification

- Content tests
- Web typecheck
- Web lint
- Browser checks for Home, Signs, Gallery, and the retired route
