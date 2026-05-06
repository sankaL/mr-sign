# Mr. Sign and Print — Build Plan

## Notes

- This plan is organized by phase.
- All task statuses are set to **To Do** for now.
- **Comments** and **Updated date** are intentionally blank for initial planning.
- The **Task** column has been included so each task number has a clear description.
- MVP guardrails: no online payments, no customer accounts, no customer login, no file uploads, and no full e-commerce checkout.

---

## Phase 0 — Project Readiness and Final Inputs

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P0-01 | Confirm final branding direction, logo, and colour palette | To Do |  |  |
| P0-02 | Confirm final business phone number, email, address, and hours | To Do |  |  |
| P0-03 | Confirm whether fax should remain visible | To Do |  |  |
| P0-04 | Confirm whether Concord should be mentioned along with Vaughan and GTA | To Do |  |  |
| P0-05 | Confirm final list of services from the old website | To Do |  |  |
| P0-06 | Confirm final service descriptions | To Do |  |  |
| P0-07 | Confirm final pricing and quote-only services | To Do |  |  |
| P0-08 | Confirm whether portfolio/gallery is included in MVP | To Do |  |  |
| P0-09 | Collect approved service images, hero images, gallery images, and brand assets | To Do |  |  |
| P0-10 | Confirm launch admin users | To Do |  |  |
| P0-11 | Confirm Resend sender email/domain setup | To Do |  |  |
| P0-12 | Confirm MVP acceptance criteria and launch checklist with client | To Do |  |  |

---

## Phase 1 — Repository, Monorepo, and App Foundation

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P1-01 | Create or finalize GitHub repository | To Do |  |  |
| P1-02 | Set up pnpm workspace / monorepo structure | To Do |  |  |
| P1-03 | Create Next.js app using TypeScript | To Do |  |  |
| P1-04 | Configure app folder structure for public website and admin portal | To Do |  |  |
| P1-05 | Set up Tailwind CSS | To Do |  |  |
| P1-06 | Set up shared UI conventions for buttons, cards, forms, sections, and page layouts | To Do |  |  |
| P1-07 | Add Lucide React icon support | To Do |  |  |
| P1-08 | Add Motion / Framer Motion support where needed | To Do |  |  |
| P1-09 | Configure TypeScript, linting, and formatting | To Do |  |  |
| P1-10 | Create `.env.example` with required environment variables | To Do |  |  |
| P1-11 | Add basic README with local setup instructions | To Do |  |  |
| P1-12 | Create base route structure for public and admin pages | To Do |  |  |

---

## Phase 2 — Frontend Migration and Design System

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P2-01 | Review existing React/Vite frontend components | To Do |  |  |
| P2-02 | Identify reusable components to migrate into Next.js | To Do |  |  |
| P2-03 | Create global layout, navigation, and footer | To Do |  |  |
| P2-04 | Create responsive mobile navigation | To Do |  |  |
| P2-05 | Create reusable page header component | To Do |  |  |
| P2-06 | Create reusable service card component | To Do |  |  |
| P2-07 | Create reusable CTA section component | To Do |  |  |
| P2-08 | Create reusable form field components | To Do |  |  |
| P2-09 | Create reusable admin layout shell | To Do |  |  |
| P2-10 | Create loading, empty, and error states | To Do |  |  |
| P2-11 | Validate responsive layout patterns for mobile, tablet, desktop, and large desktop | To Do |  |  |

---

## Phase 3 — Database, Prisma, and Seed Data

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P3-01 | Set up Prisma package/configuration | To Do |  |  |
| P3-02 | Create PostgreSQL database connection configuration | To Do |  |  |
| P3-03 | Define Service Category model | To Do |  |  |
| P3-04 | Define Service model | To Do |  |  |
| P3-05 | Define Pricing model and pricing type options | To Do |  |  |
| P3-06 | Define Customer Request model for quote, order, and contact submissions | To Do |  |  |
| P3-07 | Define Request Service relationship model | To Do |  |  |
| P3-08 | Define Request Note model for internal admin notes | To Do |  |  |
| P3-09 | Define Admin User model | To Do |  |  |
| P3-10 | Define Auth.js / NextAuth database tables if required | To Do |  |  |
| P3-11 | Define optional Audit Log model | To Do |  |  |
| P3-12 | Create first database migration | To Do |  |  |
| P3-13 | Create seed script for Signs, Printing, and Design categories | To Do |  |  |
| P3-14 | Create seed script for all existing services from old website | To Do |  |  |
| P3-15 | Create request code generation logic for quote, order, and contact requests | To Do |  |  |
| P3-16 | Create script to create the first admin user | To Do |  |  |

---

## Phase 4 — Public Website Pages

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P4-01 | Build Home page | To Do |  |  |
| P4-02 | Build Signs category page | To Do |  |  |
| P4-03 | Build Printing category page | To Do |  |  |
| P4-04 | Build Design category page | To Do |  |  |
| P4-05 | Build dynamic service detail page template | To Do |  |  |
| P4-06 | Add service detail pages for all Signs services | To Do |  |  |
| P4-07 | Add service detail pages for all Printing services | To Do |  |  |
| P4-08 | Add service detail pages for all Design services | To Do |  |  |
| P4-09 | Add pricing display logic for exact price, starting from, tiered pricing, and request quote | To Do |  |  |
| P4-10 | Add related services section on service detail pages | To Do |  |  |
| P4-11 | Build Location page with address, hours, map/directions, and tap-to-call | To Do |  |  |
| P4-12 | Build Contact page | To Do |  |  |
| P4-13 | Build optional Gallery page if enough quality images are available | To Do |  |  |
| P4-14 | Add 404 / not found page | To Do |  |  |
| P4-15 | Confirm all public routes work on mobile and desktop | To Do |  |  |

---

## Phase 5 — Quote, Order, and Contact Forms

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P5-01 | Build Request Quote form UI | To Do |  |  |
| P5-02 | Build Order Online request form UI | To Do |  |  |
| P5-03 | Build Contact form UI | To Do |  |  |
| P5-04 | Add service category and service selection fields | To Do |  |  |
| P5-05 | Add contact information fields | To Do |  |  |
| P5-06 | Add project/order detail fields | To Do |  |  |
| P5-07 | Add form validation rules | To Do |  |  |
| P5-08 | Add form submission handling | To Do |  |  |
| P5-09 | Save quote requests to database | To Do |  |  |
| P5-10 | Save order requests to database | To Do |  |  |
| P5-11 | Save contact inquiries to database | To Do |  |  |
| P5-12 | Generate unique quote, order, and contact request codes | To Do |  |  |
| P5-13 | Show confirmation screen after successful submission | To Do |  |  |
| P5-14 | Add service-page CTA behavior to preselect service in forms where useful | To Do |  |  |
| P5-15 | Add basic spam protection such as hidden honeypot field | To Do |  |  |
| P5-16 | Confirm there is no payment flow and no file upload flow | To Do |  |  |

---

## Phase 6 — Email Notifications with Resend

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P6-01 | Set up Resend package/configuration | To Do |  |  |
| P6-02 | Configure sender email/domain | To Do |  |  |
| P6-03 | Create customer quote confirmation email template | To Do |  |  |
| P6-04 | Create admin quote notification email template | To Do |  |  |
| P6-05 | Create customer order request confirmation email template | To Do |  |  |
| P6-06 | Create admin order request notification email template | To Do |  |  |
| P6-07 | Create customer contact confirmation email template | To Do |  |  |
| P6-08 | Create admin contact notification email template | To Do |  |  |
| P6-09 | Send admin notifications to `order@mrsignandprint.net` | To Do |  |  |
| P6-10 | Include request code in email subject/body | To Do |  |  |
| P6-11 | Include customer and request details in admin emails | To Do |  |  |
| P6-12 | Test email delivery in development/staging | To Do |  |  |
| P6-13 | Test email delivery in production | To Do |  |  |

---

## Phase 7 — Admin Authentication and Admin Users

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P7-01 | Set up Auth.js / NextAuth | To Do |  |  |
| P7-02 | Configure passwordless magic-link login through Resend | To Do |  |  |
| P7-03 | Build admin login page | To Do |  |  |
| P7-04 | Protect all `/admin` routes | To Do |  |  |
| P7-05 | Create first admin user script | To Do |  |  |
| P7-06 | Configure admin session duration | To Do |  |  |
| P7-07 | Build admin users list page | To Do |  |  |
| P7-08 | Build add admin user flow | To Do |  |  |
| P7-09 | Build deactivate admin user flow | To Do |  |  |
| P7-10 | Prevent unauthorized users from accessing admin pages | To Do |  |  |
| P7-11 | Test login email flow | To Do |  |  |
| P7-12 | Test expired/invalid login link behavior | To Do |  |  |

---

## Phase 8 — Admin Portal Features

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P8-01 | Build admin dashboard | To Do |  |  |
| P8-02 | Show new quote requests, order requests, and contact messages on dashboard | To Do |  |  |
| P8-03 | Show recent submissions on dashboard | To Do |  |  |
| P8-04 | Show request counts by status | To Do |  |  |
| P8-05 | Show services missing pricing or marked as request quote | To Do |  |  |
| P8-06 | Build request list page | To Do |  |  |
| P8-07 | Add request search by request code | To Do |  |  |
| P8-08 | Add filters for request type and request status | To Do |  |  |
| P8-09 | Build request detail page | To Do |  |  |
| P8-10 | Add request status update flow | To Do |  |  |
| P8-11 | Add internal notes to requests | To Do |  |  |
| P8-12 | Build services list page | To Do |  |  |
| P8-13 | Build add/edit service pages | To Do |  |  |
| P8-14 | Add service active/inactive control | To Do |  |  |
| P8-15 | Add service display order control | To Do |  |  |
| P8-16 | Add featured service control | To Do |  |  |
| P8-17 | Add image path field for service images | To Do |  |  |
| P8-18 | Build pricing management flow | To Do |  |  |
| P8-19 | Add SEO fields for service pages | To Do |  |  |
| P8-20 | Build basic admin settings page | To Do |  |  |

---

## Phase 9 — Analytics with PostHog

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P9-01 | Set up PostHog package/configuration | To Do |  |  |
| P9-02 | Add page view tracking | To Do |  |  |
| P9-03 | Track category page views | To Do |  |  |
| P9-04 | Track service page views | To Do |  |  |
| P9-05 | Track CTA clicks such as Request Quote, Order Online, Browse Services, Call Now, and Get Directions | To Do |  |  |
| P9-06 | Track quote form started/submitted events | To Do |  |  |
| P9-07 | Track order form started/submitted events | To Do |  |  |
| P9-08 | Track contact form submitted event | To Do |  |  |
| P9-09 | Track admin login and key admin actions | To Do |  |  |
| P9-10 | Confirm no sensitive customer information is sent to PostHog | To Do |  |  |
| P9-11 | Verify analytics events in staging/production | To Do |  |  |

---

## Phase 10 — SEO, Social Sharing, and Web Assets

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P10-01 | Define SEO title and meta description format for main pages | To Do |  |  |
| P10-02 | Define SEO title and meta description format for service detail pages | To Do |  |  |
| P10-03 | Add SEO metadata to Home page | To Do |  |  |
| P10-04 | Add SEO metadata to Signs page | To Do |  |  |
| P10-05 | Add SEO metadata to Printing page | To Do |  |  |
| P10-06 | Add SEO metadata to Design page | To Do |  |  |
| P10-07 | Add SEO metadata to Request Quote page | To Do |  |  |
| P10-08 | Add SEO metadata to Order Online page | To Do |  |  |
| P10-09 | Add SEO metadata to Contact page | To Do |  |  |
| P10-10 | Add SEO metadata to Location page | To Do |  |  |
| P10-11 | Add dynamic SEO metadata for each service detail page | To Do |  |  |
| P10-12 | Add clean URLs and canonical URL handling | To Do |  |  |
| P10-13 | Create sitemap.xml | To Do |  |  |
| P10-14 | Create robots.txt | To Do |  |  |
| P10-15 | Add Local Business structured data | To Do |  |  |
| P10-16 | Add service-specific structured data where useful | To Do |  |  |
| P10-17 | Add Open Graph metadata for web sharing | To Do |  |  |
| P10-18 | Add Twitter/X card metadata for web sharing | To Do |  |  |
| P10-19 | Generate or create default social sharing image | To Do |  |  |
| P10-20 | Generate or create category social sharing images | To Do |  |  |
| P10-21 | Generate or create service page images where needed | To Do |  |  |
| P10-22 | Create favicon.ico | To Do |  |  |
| P10-23 | Create PNG favicons for browser tabs and search results | To Do |  |  |
| P10-24 | Create Apple touch icon for iPhone/iPad home screen save | To Do |  |  |
| P10-25 | Create Android/Chrome web app icons | To Do |  |  |
| P10-26 | Create web app manifest file | To Do |  |  |
| P10-27 | Confirm social preview works on common sharing platforms | To Do |  |  |
| P10-28 | Add alt text for all important images | To Do |  |  |
| P10-29 | Optimize image sizes and formats | To Do |  |  |
| P10-30 | Use text-based service content instead of image-only labels | To Do |  |  |
| P10-31 | Add internal links between related services | To Do |  |  |
| P10-32 | Add Vaughan and GTA wording naturally across key pages | To Do |  |  |
| P10-33 | Configure Google Search Console after launch | To Do |  |  |
| P10-34 | Submit sitemap in Google Search Console | To Do |  |  |
| P10-35 | Configure Bing Webmaster Tools after launch | To Do |  |  |
| P10-36 | Verify indexability after production deployment | To Do |  |  |
| P10-37 | Check metadata and social previews after custom domain is live | To Do |  |  |

---

## Phase 11 — Railway Deployment and Production Configuration

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P11-01 | Create Railway project | To Do |  |  |
| P11-02 | Connect GitHub repository to Railway | To Do |  |  |
| P11-03 | Add Railway PostgreSQL service | To Do |  |  |
| P11-04 | Configure production environment variables | To Do |  |  |
| P11-05 | Configure database connection variables | To Do |  |  |
| P11-06 | Configure Auth.js / NextAuth production variables | To Do |  |  |
| P11-07 | Configure Resend API key and sender email | To Do |  |  |
| P11-08 | Configure admin notification email | To Do |  |  |
| P11-09 | Configure PostHog project key and host | To Do |  |  |
| P11-10 | Add `railway.json` if needed | To Do |  |  |
| P11-11 | Configure build and start commands | To Do |  |  |
| P11-12 | Run Prisma migrations during deployment | To Do |  |  |
| P11-13 | Seed production service categories and services | To Do |  |  |
| P11-14 | Create first production admin user | To Do |  |  |
| P11-15 | Deploy Next.js app to Railway | To Do |  |  |
| P11-16 | Add custom domain | To Do |  |  |
| P11-17 | Configure DNS records | To Do |  |  |
| P11-18 | Verify HTTPS/SSL | To Do |  |  |
| P11-19 | Verify public website routes in production | To Do |  |  |
| P11-20 | Verify admin portal routes in production | To Do |  |  |
| P11-21 | Verify production email sending | To Do |  |  |
| P11-22 | Verify production analytics tracking | To Do |  |  |
| P11-23 | Document deployment and rollback steps | To Do |  |  |

---

## Phase 12 — QA, UAT, and Launch Readiness

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P12-01 | Test Home page on mobile, tablet, desktop, and large desktop | To Do |  |  |
| P12-02 | Test Signs page and all Signs service pages | To Do |  |  |
| P12-03 | Test Printing page and all Printing service pages | To Do |  |  |
| P12-04 | Test Design page and all Design service pages | To Do |  |  |
| P12-05 | Test Location page and tap-to-call behavior | To Do |  |  |
| P12-06 | Test Contact page and form submission | To Do |  |  |
| P12-07 | Test quote request submission | To Do |  |  |
| P12-08 | Test order request submission | To Do |  |  |
| P12-09 | Test customer confirmation emails | To Do |  |  |
| P12-10 | Test admin notification emails | To Do |  |  |
| P12-11 | Test request code generation | To Do |  |  |
| P12-12 | Test admin login | To Do |  |  |
| P12-13 | Test admin user management | To Do |  |  |
| P12-14 | Test service management | To Do |  |  |
| P12-15 | Test pricing management | To Do |  |  |
| P12-16 | Test request management | To Do |  |  |
| P12-17 | Test request status updates | To Do |  |  |
| P12-18 | Test internal notes | To Do |  |  |
| P12-19 | Test that no payment flow exists | To Do |  |  |
| P12-20 | Test that no file upload flow exists | To Do |  |  |
| P12-21 | Run basic accessibility checks | To Do |  |  |
| P12-22 | Run performance check / Lighthouse review | To Do |  |  |
| P12-23 | Validate SEO metadata on all public pages | To Do |  |  |
| P12-24 | Validate social sharing previews | To Do |  |  |
| P12-25 | Validate sitemap and robots.txt | To Do |  |  |
| P12-26 | Validate analytics events | To Do |  |  |
| P12-27 | Complete client UAT review | To Do |  |  |
| P12-28 | Fix launch-blocking issues | To Do |  |  |
| P12-29 | Final production smoke test | To Do |  |  |
| P12-30 | Launch website | To Do |  |  |

---

## Phase 13 — Post-Launch SEO and Monitoring

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| P13-01 | Submit sitemap to Google Search Console | To Do |  |  |
| P13-02 | Submit sitemap to Bing Webmaster Tools | To Do |  |  |
| P13-03 | Inspect key URLs for indexing | To Do |  |  |
| P13-04 | Check Google search result appearance for branded queries | To Do |  |  |
| P13-05 | Review crawl/indexing issues | To Do |  |  |
| P13-06 | Review top landing pages and service interest in PostHog | To Do |  |  |
| P13-07 | Review quote/order/contact conversion events | To Do |  |  |
| P13-08 | Check form submission logs for errors | To Do |  |  |
| P13-09 | Check Railway deployment and runtime logs | To Do |  |  |
| P13-10 | Check Resend delivery logs | To Do |  |  |
| P13-11 | Review mobile performance after launch | To Do |  |  |
| P13-12 | Identify first SEO/content improvement backlog items | To Do |  |  |

---

## Bugs

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|

---

## Ad Hoc Tasks

| Task number | Task | Task status | Comments | Updated date |
|---|---|---|---|---|
| AHT-001 | Update root `AGENTS.md` to match the Mr. Sign and Print repository | Done | Replaced copied Wonder Jira references with Mr. Sign and Print docs, paths, stack context, and workflow rules. | 2026-05-05 |
