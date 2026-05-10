# Todo

## 1. Investigate Admin Services Features
- [ ] Find out what "services" features in the admin page means and what it actually does.
  - Paths: `apps/web/src/app/admin/(protected)/services/`
  - Components: `apps/web/src/components/admin/services-table.tsx`, `service-form.tsx`, `service-form-wizard.tsx`, `service-step-basics.tsx`, `service-step-pricing.tsx`, `service-step-visibility.tsx`, `service-status-toggle.tsx`

## 2. Fix UI for Request a Code & Contact
- [ ] Review `apps/web/src/components/forms/customer-request-form.tsx` – shared form used by both `/request-quote` and `/contact`
- [ ] Review `apps/web/src/app/contact/page.tsx` – contact page route
- [ ] Review `apps/web/src/app/request-quote/page.tsx` – request quote page
- [ ] Fix styling/layout issues – currently doesn't look great

## 3. Replace Native Dropdowns with React Dropdowns
- [ ] `apps/web/src/components/forms/form-field.tsx` – `SelectField` component (native `<select>`)
- [ ] `apps/web/src/components/admin/request-status-form.tsx` – native `<select>` for status updates
- [ ] Check all other instances of native `<select>` in admin forms

## 4. Fix Input Form Alignment
- [ ] Review `apps/web/src/components/forms/customer-request-form.tsx` – customer-facing form alignment
- [ ] Review `apps/web/src/components/forms/form-field.tsx` – reusable form field alignment
- [ ] Review `apps/web/src/components/admin/admin-request-form.tsx` – admin request form alignment
- [ ] Review `apps/web/src/components/admin/service-form.tsx` – service form alignment
- [ ] Review `apps/web/src/components/admin/service-step-basics.tsx` – step 1 alignment
- [ ] Review `apps/web/src/components/admin/service-step-pricing.tsx` – step 2 alignment
- [ ] Review `apps/web/src/components/admin/service-step-visibility.tsx` – step 3 alignment
- [ ] Check all input forms for consistent alignment

## 5. Make Admin Settings Page Editable
- [ ] Review `apps/web/src/app/admin/(protected)/settings/page.tsx` – current settings page
- [ ] Determine what settings need to be editable (site config, contact info, etc.)
- [ ] Implement save/persist functionality

## 6. Add Full-Width Monthly Requests Graph to Dashboard
- [ ] `apps/web/src/app/admin/(protected)/page.tsx` – dashboard page
- [ ] `apps/web/src/components/admin/dashboard-charts.tsx` – existing chart components
- [ ] `apps/web/src/lib/admin/data.ts` – `getDashboardStats()` data function
- [ ] Add a bar/line chart spanning full width showing requests per month for the current year
