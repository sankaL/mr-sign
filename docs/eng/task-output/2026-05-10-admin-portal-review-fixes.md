# 2026-05-10 Admin Portal Review Fixes

## Summary

Addressed code review findings from the uncommitted admin portal work. The fixes cover service status migration safety, seeded catalog visibility, admin request validation, request filter hardening, service cache invalidation, publish behavior, and admin accessibility issues.

## Edited Files

- `apps/web/src/app/actions/admin-requests.ts`
- `apps/web/src/app/actions/admin-services.ts`
- `apps/web/src/app/globals.css`
- `apps/web/src/components/admin/admin-modal.tsx`
- `apps/web/src/components/admin/request-filters.tsx`
- `apps/web/src/components/admin/service-form-wizard.tsx`
- `apps/web/src/components/admin/sortable-link.tsx`
- `apps/web/src/components/forms/form-field.tsx`
- `apps/web/src/lib/admin/data.ts`
- `docs/eng/mr-sign-build-plan.md`
- `packages/db/prisma/migrations/0002_add_service_status/migration.sql`
- `packages/db/prisma/schema.prisma`
- `packages/db/scripts/seed.ts`

## Verification

- `corepack pnpm --filter @mrsign/web typecheck`
- `corepack pnpm --filter @mrsign/db typecheck`
- `corepack pnpm --filter @mrsign/web lint`
- `corepack pnpm --filter @mrsign/web build`
