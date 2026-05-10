# Admin Portal UI Modernization

**Date:** 2026-05-09  
**Task:** AH-2026-05-09-16  
**Type:** Big — multi-file UI redesign

## Summary

Redesigned the admin portal from a flat header-navigation layout into a modern sidebar-based workbench with visual dashboard charts, proper data tables with pagination, and consistent styling.

## Key Changes

- **Sidebar navigation**: Dark 260px fixed sidebar (desktop) / slide-over drawer (mobile) with lime-accent active page, avatar + logout
- **Dashboard charts**: CSS-only horizontal bar chart (status distribution), conic-gradient donut (request type split), redesigned stat cards
- **Data tables**: Shared `admin-table` CSS with sticky headers, zebra striping, hover states — used across dashboard, requests, services, users, settings
- **Pagination**: Server-side pagination (20/page) for requests list with page numbers and URL-driven state
- **Toggle switches**: iOS-style slide switches replacing pill buttons for service active/featured toggles
- **Admin cards**: Consistent `admin-card` component system with header/body sections
- **Status badges**: Color-coded badges for all 9 request statuses and 3 request types
- **Form styling**: Unified rounded-lg inputs, blue focus rings, and consistent button styling across all forms

## Files Edited

### New
- `apps/web/src/components/admin/admin-sidebar.tsx`
- `apps/web/src/components/admin/admin-topbar.tsx`
- `apps/web/src/components/admin/dashboard-charts.tsx`
- `apps/web/src/components/admin/admin-pagination.tsx`

### Rewritten
- `apps/web/src/components/admin/admin-shell.tsx`
- `apps/web/src/app/admin/(protected)/page.tsx`
- `apps/web/src/app/admin/(protected)/requests/page.tsx`
- `apps/web/src/app/admin/(protected)/requests/[requestCode]/page.tsx`
- `apps/web/src/app/admin/(protected)/services/page.tsx`
- `apps/web/src/app/admin/(protected)/users/page.tsx`
- `apps/web/src/app/admin/(protected)/settings/page.tsx`
- `apps/web/src/app/admin/login/page.tsx`
- `apps/web/src/components/admin/service-status-toggle.tsx`
- `apps/web/src/components/admin/request-filters.tsx`
- `apps/web/src/components/admin/service-form.tsx`
- `apps/web/src/components/admin/request-status-form.tsx`
- `apps/web/src/components/admin/request-note-form.tsx`
- `apps/web/src/components/admin/admin-user-form.tsx`
- `apps/web/src/components/admin/admin-login-form.tsx`
- `apps/web/src/components/forms/form-field.tsx`
- `apps/web/src/lib/admin/data.ts`

### Modified
- `apps/web/src/app/globals.css`
- `docs/eng/mr-sign-build-plan.md`
