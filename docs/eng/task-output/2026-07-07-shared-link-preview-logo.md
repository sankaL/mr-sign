# Shared-Link Preview Logo Fix

Date: 2026-07-07

## Summary

Fixed shared-link previews that displayed the obsolete square logo. The deployed Railway page referenced Open Graph assets on `mrsignandprint.net`, where the social image returned 404, causing sharing clients to fall back to the old favicon. Metadata now defaults to the active Railway hostname, social and icon URLs carry a cache version, and every favicon and app-icon variant uses the current warm-white, navy, and amber identity.

## Edited Files

- `apps/web/public/favicon.ico`
- `apps/web/public/apple-touch-icon.png`
- `apps/web/public/icon-16.png`
- `apps/web/public/icon-32.png`
- `apps/web/public/icon-48.png`
- `apps/web/public/icon-192.png`
- `apps/web/public/icon-512.png`
- `apps/web/public/icon-maskable-512.png`
- `apps/web/src/lib/seo.ts`
- `apps/web/src/lib/seo.test.ts`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/manifest.ts`
- `README.md`
- `docs/eng/mr-sign-build-plan.md`

## Asset Prompt

Built-in image generation used the current default social card as a style reference. The final prompt enlarged the exact `MR. SIGN` and `PRINT` wordmark to fill roughly 82 percent of the square while preserving a warm-white background, deep navy lettering and keyline, one amber rule, flat editorial styling, and safe edge clearance. The first, smaller variant was retained for the maskable icon to avoid operating-system crop damage.

## Verification

- Confirmed all PNG and ICO dimensions and visually inspected the 192, 32, and maskable variants.
- Passed `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm typecheck`, `corepack pnpm format:check`, and `corepack pnpm build`.
- Confirmed the static export uses the Railway canonical URL, a versioned Railway-hosted Open Graph image, and versioned icon links.
