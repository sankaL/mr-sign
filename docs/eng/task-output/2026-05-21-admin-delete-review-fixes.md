# 2026-05-21 Admin Delete Review Fixes

## Summary

- Added structured error handling for request delete lookup and transaction failures.
- Changed delete confirmation navigation so `router.refresh()` only runs when staying on the same route.
- Extracted guarded delete behavior into a focused helper and added unit coverage for success, not found, generic failures, and service request-history constraints.

## Edited Files

- `apps/web/src/app/actions/admin-requests.ts`
- `apps/web/src/app/actions/admin-services.ts`
- `apps/web/src/components/admin/admin-delete-button.tsx`
- `apps/web/src/lib/admin-delete.ts`
- `apps/web/src/lib/admin-delete.test.ts`
- `docs/eng/mr-sign-build-plan.md`
