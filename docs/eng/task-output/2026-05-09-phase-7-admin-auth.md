# 2026-05-09 Phase 7 Admin Authentication

## Summary

- Implemented Better Auth admin authentication with Prisma-backed sessions and passwordless magic links sent through Resend.
- Added active-admin authorization, protected admin route handling, admin login, admin users list, add-admin flow, and deactivate-admin safeguards.
- Addressed review findings with explicit login-link throttling, serializable deactivate handling, and controlled deactivate failure messages.
- Added focused tests for admin-user validation/deactivation rules and the admin login email template.

## Edited Files

- `apps/web/package.json`
- `apps/web/src/app/actions/admin-auth.ts`
- `apps/web/src/app/actions/admin-users.ts`
- `apps/web/src/app/admin/(protected)/layout.tsx`
- `apps/web/src/app/admin/(protected)/page.tsx`
- `apps/web/src/app/admin/(protected)/users/page.tsx`
- `apps/web/src/app/admin/login/page.tsx`
- `apps/web/src/app/api/auth/[...all]/route.ts`
- `apps/web/src/components/admin/admin-login-form.tsx`
- `apps/web/src/components/admin/admin-user-form.tsx`
- `apps/web/src/lib/admin-session.ts`
- `apps/web/src/lib/admin-users.ts`
- `apps/web/src/lib/admin-users.test.ts`
- `apps/web/src/lib/auth.ts`
- `apps/web/src/lib/site.ts`
- `apps/web/src/proxy.ts`
- `packages/email/src/admin-login-email.ts`
- `packages/email/src/index.ts`
- `packages/email/tests/admin-login-email.test.ts`
- `pnpm-lock.yaml`
- `docs/eng/decisions/decision-log-001.md`
- `docs/eng/mr-sign-build-plan.md`

## Verification

- `corepack pnpm test` passed.
- `corepack pnpm typecheck` passed.
- `corepack pnpm lint` passed.
- `corepack pnpm --recursive --if-present format:check` passed.
- `DATABASE_URL="postgresql://mrsign:mrsign@localhost:5432/mr_sign" BETTER_AUTH_SECRET="verification-secret-at-least-32-characters" BETTER_AUTH_URL="http://localhost:3000" corepack pnpm build` passed.
