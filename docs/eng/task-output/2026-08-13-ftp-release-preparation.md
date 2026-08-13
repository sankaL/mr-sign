# FTP Release Preparation

Date: 2026-08-13

## Summary

- Removed two ignored `.DS_Store` files from the public asset tree.
- Formatted the homepage hero with the repository Prettier configuration.
- Converted the ten referenced Design-service PNG images to quality-82 WebP with `cwebp` and updated their content references.
- Removed the ten superseded PNG files and seven confirmed-unreferenced large images.
- Retained PNG social previews, application icons, and favicon assets used for marketing, sharing, and application metadata.
- Reduced the public image footprint to approximately 13 MB with no image file larger than 1 MB.
- Preserved the `.ca` canonical configuration, `.com` alias redirect, legacy URL redirects, and FTP-friendly static route structure.

## Verification

- `corepack pnpm --recursive --if-present typecheck`
- `corepack pnpm --recursive --if-present test`
- `corepack pnpm --filter @mrsign/web lint`
- `corepack pnpm --recursive --if-present format:check`
- `corepack pnpm build`
- WebP decode checks for all ten converted Design images
- Export checks for `.htaccess`, canonical metadata, sitemap, robots, legacy redirects, and junk files

## Edited Files

- `README.md`
- `apps/web/next.config.ts`
- `apps/web/public/.htaccess`
- `apps/web/public/images/generated/`
- `apps/web/public/images/home-page/`
- `apps/web/src/components/site/hero.tsx`
- `apps/web/src/lib/seo.ts`
- `apps/web/src/lib/seo.test.ts`
- `packages/content/content/services/design/*.json`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/task-output/2026-08-13-ftp-release-preparation.md`
