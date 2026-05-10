# Phase 8 — Admin Portal Features

**Date:** 2026-05-09

## Summary

Implemented all 20 Phase 8 tasks: admin dashboard, request management, service management, pricing management, SEO fields, and settings. Also refactored public category and service detail pages to read from the database so admin changes are reflected on the public site. A follow-up review pass fixed DB-only public service rendering, edit-service server action wiring, old/new route revalidation, and optimistic service toggles.

## What Changed

### Admin Foundation

- **Admin shell updated** (`components/admin/admin-shell.tsx`)
  - Added expanded navigation: Dashboard, Requests, Services, Users, Settings
  - Added logout button using server action
  - Shows current admin name when authenticated
  - Removed "Phase 2 shell" placeholder label

- **Admin navigation** (`lib/site.ts`)
  - Updated `adminNavigation` array with new route items

- **Logout action** (`app/actions/admin-logout.ts`)
  - Server action that signs out via Better Auth and redirects to login

### Dashboard (P8-01 to P8-05)

- **Dashboard page** (`app/admin/(protected)/page.tsx`)
  - Replaced static placeholder with data-driven server component
  - Summary cards: new quote requests, new contact messages, total requests
  - Recent submissions table (last 10)
  - Services needing attention (REQUEST_QUOTE or missing pricing)
  - Status breakdown with count cards linking to filtered lists

- **Dashboard data layer** (`lib/admin/data.ts`)
  - `getDashboardStats()`: counts by type and status
  - `getRecentRequests()`: last N submissions
  - `getServicesNeedingAttention()`: services with pricing gaps

### Request Management (P8-06 to P8-11)

- **Request list page** (`app/admin/(protected)/requests/page.tsx`)
  - Table with code, type, customer, status, date
  - Search by request code (substring match)
  - Filters for type and status via URL params

- **Request filters** (`components/admin/request-filters.tsx`)
  - Client component with search input and dropdown filters
  - Uses `useTransition` for smooth URL updates

- **Request detail page** (`app/admin/(protected)/requests/[requestCode]/page.tsx`)
  - Full customer and project details
  - Selected services list
  - Internal notes with author and timestamp
  - Status update form

- **Request status form** (`components/admin/request-status-form.tsx`)
  - Dropdown with all RequestStatus enum values
  - Server action with audit log entry

- **Request note form** (`components/admin/request-note-form.tsx`)
  - Textarea for adding internal notes
  - Server action creates note with current admin as author

- **Request server actions** (`app/actions/admin-requests.ts`)
  - `updateRequestStatus()`: validates status, updates DB, creates audit log
  - `addRequestNote()`: validates body, creates note with author

- **Request validation** (`lib/admin-request-validation.ts`)
  - Status validation against RequestStatus enum
  - Note body validation (required, max 5000 chars)

### Service Management (P8-12 to P8-19)

- **Service list page** (`app/admin/(protected)/services/page.tsx`)
  - Services grouped by category
  - Columns: name, slug, pricing type, active, featured, order
  - Quick toggle for active and featured status
  - Link to edit page

- **Add service page** (`app/admin/(protected)/services/new/page.tsx`)
  - Form with all service fields, pricing, and SEO

- **Edit service page** (`app/admin/(protected)/services/[id]/page.tsx`)
  - Pre-filled form for existing services
  - Upserts pricing record on save
  - Uses a bound exported server action for the client form action

- **Service form** (`components/admin/service-form.tsx`)
  - Service fields: category, name, slug, description, image path, active, featured, display order
  - Pricing sub-form: type selector, amount, unit label, public label, tiered description
  - SEO sub-form: meta title, meta description

- **Service status toggle** (`components/admin/service-status-toggle.tsx`)
  - Client component with optimistic UI
  - Schedules optimistic state changes inside the transition path
  - Calls `toggleServiceActive` or `toggleServiceFeatured` server actions

- **Service server actions** (`app/actions/admin-services.ts`)
  - `createService()`: validates, creates service and pricing
  - `updateService()`: validates, updates service and pricing, and revalidates old and new public routes when slug/category values change
  - `toggleServiceActive()`: flips isActive with audit log
  - `toggleServiceFeatured()`: flips isFeatured
  - `deleteService()`: removes service

- **Service validation** (`lib/admin-service-validation.ts`)
  - Validates all service fields with length limits
  - Pricing type validation with conditional amount validation
  - Auto-generates slug from name if empty

### Public Page DB Integration

- **Public services data layer** (`lib/public-services.ts`)
  - `getPublicServices()`: merges DB overrides with content catalog defaults and includes active DB-only services
  - `getPublicService()`: single service lookup with DB fallback, including DB-only detail pages
  - `getPublicStaticServiceParams()`: generates static params from DB or content catalog
  - Gracefully handles missing database (falls back to content catalog)

- **Category pages updated** (`components/site/category-page.tsx`)
  - Now async, reads services from DB with content catalog fallback
  - Respects `isActive` flag from admin

- **Service detail pages updated** (`components/site/service-detail-page.tsx`)
  - Now async, reads service from DB with content catalog fallback
  - DB pricing overrides content catalog pricing

- **Route pages updated**
  - Signs, Printing, Design service detail pages use DB-driven `generateStaticParams` and `generateMetadata`

### Settings (P8-20)

- **Settings page** (`app/admin/(protected)/settings/page.tsx`)
  - Current admin session info
  - Business contact details (read-only)
  - Business hours display (read-only)

### Infrastructure

- **Prisma client** (`packages/db/src/client.ts`)
  - Made client creation lazy using a Proxy
  - Prevents build-time failures when `DATABASE_URL` is not available
  - Client is only created when a property is actually accessed

## Files Changed

### New Files (20)

- `apps/web/src/app/actions/admin-logout.ts`
- `apps/web/src/app/actions/admin-requests.ts`
- `apps/web/src/app/actions/admin-services.ts`
- `apps/web/src/app/admin/(protected)/requests/page.tsx`
- `apps/web/src/app/admin/(protected)/requests/[requestCode]/page.tsx`
- `apps/web/src/app/admin/(protected)/services/page.tsx`
- `apps/web/src/app/admin/(protected)/services/new/page.tsx`
- `apps/web/src/app/admin/(protected)/services/[id]/page.tsx`
- `apps/web/src/app/admin/(protected)/settings/page.tsx`
- `apps/web/src/components/admin/request-filters.tsx`
- `apps/web/src/components/admin/request-status-form.tsx`
- `apps/web/src/components/admin/request-note-form.tsx`
- `apps/web/src/components/admin/service-form.tsx`
- `apps/web/src/components/admin/service-status-toggle.tsx`
- `apps/web/src/lib/admin/data.ts`
- `apps/web/src/lib/admin-request-validation.ts`
- `apps/web/src/lib/admin-service-validation.ts`
- `apps/web/src/lib/public-services.ts`

### Updated Files (9)

- `apps/web/src/lib/site.ts` — expanded admin navigation
- `apps/web/src/components/admin/admin-shell.tsx` — logout, admin name, updated nav
- `apps/web/src/app/admin/(protected)/page.tsx` — real dashboard
- `apps/web/src/app/admin/(protected)/layout.tsx` — `force-dynamic`
- `apps/web/src/app/signs/[serviceSlug]/page.tsx` — DB-driven static params
- `apps/web/src/app/printing/[serviceSlug]/page.tsx` — DB-driven static params
- `apps/web/src/app/design/[serviceSlug]/page.tsx` — DB-driven static params
- `apps/web/src/components/site/category-page.tsx` — async with DB services
- `apps/web/src/components/site/service-detail-page.tsx` — async with DB service
- `packages/db/src/client.ts` — lazy Prisma client via Proxy

## Verification

- TypeScript: zero errors
- ESLint: zero errors, zero warnings
- Prettier: all files formatted
- Tests: 5/5 passing
- Build: successful with all routes generated

## Notes

- Admin pages are marked `force-dynamic` since they require authentication and should never be statically cached.
- Public service detail pages use `generateStaticParams` with DB fallback to content catalog for build-time compatibility.
- The Prisma client is now lazily created via a Proxy to avoid build-time failures when `DATABASE_URL` is unavailable.
- No new dependencies were added; all work uses the existing stack.
