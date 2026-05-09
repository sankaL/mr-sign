# 2026-05-09 Remove Public Online Order Flow

## Summary

Removed Online Order as a public website concept and made Request Quote the single project intake path for MVP. The `/order-online` route now redirects to `/request-quote`, while existing backend order request support remains for compatibility.

## Edited Files

- `packages/content/src/site.ts`
- `apps/web/src/lib/site.ts`
- `apps/web/src/app/order-online/page.tsx`
- `apps/web/src/components/forms/customer-request-form.tsx`
- `apps/web/src/app/actions/customer-request-validation.ts`
- `README.md`
- `docs/copy/01-home.md`
- `docs/copy/05-request-quote.md`
- `docs/copy/07-contact.md`
- `docs/copy/06-order-online.md`
- `docs/mrsigns-prd.md`
- `docs/eng/mr-sign-tech-stack.md`
- `docs/eng/mr-sign-build-plan.md`
- `docs/eng/decisions/decision-log-001.md`
