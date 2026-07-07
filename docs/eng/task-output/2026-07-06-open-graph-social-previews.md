# Open Graph Social Previews

Date: 2026-07-06

## Summary

Replaced the obsolete neon social cards with four 1200 by 630 editorial previews using existing site photography. Centralized social image metadata, added complete Open Graph and Twitter descriptors, mapped service pages to their category cards, and aligned retired Design compatibility routes with Services.

## Edited Files

- `apps/web/public/social/default-social.png`
- `apps/web/public/social/signs-social.png`
- `apps/web/public/social/printing-social.png`
- `apps/web/public/social/services-social.png`
- `apps/web/public/social/design-social.png` (removed)
- `apps/web/src/lib/seo.ts`
- `apps/web/src/lib/seo.test.ts`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/design/page.tsx`
- `apps/web/src/app/design/[serviceSlug]/page.tsx`
- `docs/eng/mr-sign-build-plan.md`

## Verification

- Confirmed each social image is a 1200 by 630 RGB PNG.
- Visually checked exact text, safe cropping, and consistency with the current warm-white, navy, and amber theme.
- Added focused metadata tests for descriptors, category mapping, and route fallbacks.
- Passed `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm typecheck`, `corepack pnpm format:check`, and `corepack pnpm build`.
- Inspected exported HTML for Home, utility, category, service-detail, and compatibility routes.

## Asset Prompt Set

Built-in image generation used existing repository photography as locked reference material. Every prompt requested a 1200 by 630 split editorial card with warm white `#FCFBF8`, navy `#071A3A`, amber `#D48318`, Libre Baskerville-like display type, Manrope-like supporting type, the current wordmark, generous spacing, and no gradients, neon colors, retired Design references, or invented claims.

- Default: `home-reference-northfield-dental.png`, "VAUGHAN SIGN SHOP", and "Signs That Shape Attention."
- Signs: `home-editorial-channel-letters.png`, "CUSTOM SIGNS", and "Built for Your Business."
- Printing: `home-editorial-printing.png`, "PRINTING", and "Professional Printing."
- Services: `home-editorial-maintenance.png`, "SIGN MAINTENANCE", and "Maintenance and Repair Services."
