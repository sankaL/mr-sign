# 2026-05-21 Guarded Admin Delete

## Summary

- Added guarded admin deletion for customer requests and services.
- Requests can be permanently deleted with confirmation, cascading selected service links and notes through existing database relations.
- Services can be deleted only when unused by requests; referenced services return guidance to deactivate instead.
- Added delete audit log entries and admin UI actions on list and detail/edit screens.

## Edited Files

- `apps/web/src/app/actions/admin-requests.ts`
- `apps/web/src/app/actions/admin-services.ts`
- `apps/web/src/app/admin/(protected)/requests/page.tsx`
- `apps/web/src/app/admin/(protected)/requests/[requestCode]/page.tsx`
- `apps/web/src/app/admin/(protected)/services/[id]/page.tsx`
- `apps/web/src/components/admin/admin-delete-button.tsx`
- `apps/web/src/components/admin/delete-request-button.tsx`
- `apps/web/src/components/admin/delete-service-button.tsx`
- `apps/web/src/components/admin/services-table.tsx`
- `docs/eng/mr-sign-build-plan.md`
