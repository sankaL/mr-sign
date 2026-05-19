# 2026-05-19 Modernize Email Templates

## Summary

Redesigned the Mr. Sign and Print transactional email HTML so quote/contact confirmations, admin request notifications, and admin login links use a shared clean brand card layout with stronger hierarchy, red/blue accents, polished detail tables, CTA styling, and a compact contact footer.

Plain-text email content, exported APIs, Resend sending behavior, subjects, reply-to handling, and HTML escaping behavior were preserved.

## Edited Files

- `packages/email/src/email-html.ts`
- `packages/email/src/customer-request-emails.ts`
- `packages/email/src/admin-login-email.ts`
- `packages/email/tests/customer-request-emails.test.ts`
- `packages/email/tests/admin-login-email.test.ts`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/task-output/2026-05-19-modernize-email-templates.md`

## Verification

- `corepack pnpm --filter @mrsign/email test`
- `corepack pnpm --filter @mrsign/email typecheck`
- `corepack pnpm --filter @mrsign/email format:check`
