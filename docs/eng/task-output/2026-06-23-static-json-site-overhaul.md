# Static JSON Site Overhaul

Date: 2026-06-23

## Summary

- Converted the app direction from full-stack request/admin management to a static public website.
- Removed online customer submission flows, admin routes, authentication, database packages, Prisma, Resend email package, and related tooling.
- Added JSON-backed service, category, and site content under `packages/content/content/`.
- Updated public CTAs around phone, email, location, services, and current-pricing guidance.
- Simplified Docker, Railway, env examples, and package scripts for static export.

## Edited Files

- `apps/web`
- `packages/content`
- `package.json`
- `pnpm-lock.yaml`
- `Dockerfile`
- `docker-compose.yml`
- `Makefile`
- `railway.toml`
- `.env.example`
- `.gitignore`
- `README.md`
- `docs/mrsigns-prd.md`
- `docs/DESIGN.md`
- `docs/eng/mr-sign-tech-stack.md`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/decisions/decision-log-001.md`

## Verification

- `corepack pnpm install --frozen-lockfile`
- `corepack pnpm --recursive --if-present typecheck`
- `corepack pnpm --recursive --if-present test`
- `corepack pnpm --filter @mrsign/web lint`
- `corepack pnpm --filter @mrsign/web build`
- Browser smoke checks passed for Home, Signs, Printing, Design, `/signs/banner`, Gallery, Location, Contact, `/request-quote`, and `/order-online` at desktop and mobile widths.
- Active app/content/config search found no removed backend package, auth, email, Prisma, request-code, admin, or `Request Quote` text.

## Notes

- Old `/request-quote` and `/order-online` routes remain as static compatibility pages without submission forms.
- Historical build-plan ad hoc rows remain for audit trail, but the active phase plan now records the static-site direction.
