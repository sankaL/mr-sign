# 2026-05-09 Phase 6 Email Notifications

## Summary

Implemented Resend-backed quote and contact email notifications. Successful customer request submissions now trigger customer confirmations and admin notifications after the database save completes, while missing Resend configuration or send failures do not block the saved request confirmation shown to customers. Notification failures are isolated from database save failures, notification sends are awaited before returning, and accepted submissions have a basic per-window abuse throttle.

## Edited Files

- `Dockerfile`
- `apps/web/package.json`
- `apps/web/next.config.ts`
- `apps/web/src/app/actions/customer-requests.ts`
- `apps/web/src/app/order-online/page.tsx`
- `apps/web/src/components/forms/customer-request-form.tsx`
- `docs/eng/mr-sign-build-plan.md`
- `packages/email/package.json`
- `packages/email/src/customer-request-emails.ts`
- `packages/email/src/index.ts`
- `packages/email/tests/customer-request-emails.test.ts`
- `packages/email/tsconfig.json`
- `pnpm-lock.yaml`

## Notes

- No online payments, checkout, customer accounts, or file uploads were added.
- Real Resend delivery testing remains pending until `RESEND_API_KEY` and a verified sender/domain are configured.
