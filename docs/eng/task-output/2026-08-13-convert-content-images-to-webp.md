# Convert Active Content Images to WebP

Date: 2026-08-13

## Summary

- Converted the 54 active homepage, Signs, Printing, and Services content images from PNG to quality-82 WebP.
- Preserved every source image's pixel dimensions and verified that all WebP files decode successfully.
- Reduced the active content-image footprint from 125,696,960 bytes to 7,801,958 bytes, a 93.8 percent reduction.
- Updated JSON content paths and image asset types, then removed the 54 replaced PNG files.
- Kept social previews, application icons, the favicon, inactive Design assets, and other unused images in their existing formats.

## Verification

- `corepack pnpm test`
- `corepack pnpm typecheck`
- `corepack pnpm lint`
- `corepack pnpm build`
- Prettier check for the code and content files changed by this task
- WebP decode and source-dimension comparison for all 54 files
- HTTP 200 and `image/webp` checks for all 54 production-export assets
- Browser smoke checks of Home, Signs, Printing Invitations, and Sign Repairs pages

The repository-wide formatting check still reports pre-existing user changes in `apps/web/src/components/site/hero.tsx` and `docs/eng/mr-sign-build-plan.md`. This task did not reformat those existing changes.

## Edited Files

- `apps/web/public/images/generated/`: added 54 WebP files and removed their 54 PNG predecessors
- `packages/content/content/categories.json`
- `packages/content/content/site.json`
- `packages/content/content/services/printing/*.json`
- `packages/content/content/services/services/*.json`
- `packages/content/content/services/signs/*.json`
- `packages/content/src/types.ts`
- `packages/content/tests/catalog.test.ts`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/task-output/2026-08-13-convert-content-images-to-webp.md`
