# Todo

## 1. Create Seed Script for All Services
- [x] Create a seed script that seeds all services with pricing
- [x] Set all services to active by default
- [x] Check existing Prisma schema in `packages/db/` for service and pricing models

## 2. Investigate Admin Services Features
- [x] Find out what "services" features in the admin page means and what it actually does.
  - Paths: `apps/web/src/app/admin/(protected)/services/`
  - Components: `apps/web/src/components/admin/services-table.tsx`, `service-form.tsx`, `service-form-wizard.tsx`, `service-step-basics.tsx`, `service-step-pricing.tsx`, `service-step-visibility.tsx`, `service-status-toggle.tsx`

## 2. Fix UI for Request a Code & Contact
- [x] Review `apps/web/src/components/forms/customer-request-form.tsx` – shared form used by both `/request-quote` and `/contact`
- [x] Review `apps/web/src/app/contact/page.tsx` – contact page route
- [x] Review `apps/web/src/app/request-quote/page.tsx` – request quote page
- [x] Fix styling/layout issues – currently doesn't look great

## 3. Replace Native Dropdowns with React Dropdowns
- [x] `apps/web/src/components/forms/form-field.tsx` – `SelectField` component (native `<select>`)
- [x] `apps/web/src/components/admin/request-status-form.tsx` – native `<select>` for status updates
- [x] Check all other instances of native `<select>` in admin forms

## 4. Fix Input Form Alignment
- [x] Review `apps/web/src/components/forms/customer-request-form.tsx` – customer-facing form alignment
- [x] Review `apps/web/src/components/forms/form-field.tsx` – reusable form field alignment
- [x] Review `apps/web/src/components/admin/admin-request-form.tsx` – admin request form alignment
- [x] Review `apps/web/src/components/admin/service-form.tsx` – service form alignment
- [x] Review `apps/web/src/components/admin/service-step-basics.tsx` – step 1 alignment
- [x] Review `apps/web/src/components/admin/service-step-pricing.tsx` – step 2 alignment
- [x] Review `apps/web/src/components/admin/service-step-visibility.tsx` – step 3 alignment
- [x] Check all input forms for consistent alignment

## 5. Admin Delete Actions
- [ ] Delete a service – add delete button/confirmation to service detail page or table
- [ ] Delete a user – add delete button/confirmation to users page
- [ ] Delete a request – add delete button/confirmation to request detail page or table

## 6. Make Admin Settings Page Editable
- [ ] Review `apps/web/src/app/admin/(protected)/settings/page.tsx` – current settings page
- [ ] Determine what settings need to be editable (site config, contact info, etc.)
- [ ] Implement save/persist functionality

## 7. Add Google Map to Location Page and Home Page
- [ ] Add Google Map component to the location page
- [ ] Add Google Map component to the home page
- [ ] Set up Google Maps API key and configuration

## 8. Add Full-Width Monthly Requests Graph to Dashboard
- [x] `apps/web/src/app/admin/(protected)/page.tsx` – dashboard page
- [x] `apps/web/src/components/admin/dashboard-charts.tsx` – existing chart components
- [x] `apps/web/src/lib/admin/data.ts` – `getDashboardStats()` data function
- [x] Add a bar/line chart spanning full width showing requests per month for the current year
