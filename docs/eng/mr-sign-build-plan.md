# Mr. Sign and Print — Build Plan

## Notes

- This plan is organized by phase.
- All task statuses are set to **To Do** for now.
- **Comments** and **Updated date** are intentionally blank for initial planning.
- The **Task** column has been included so each task number has a clear description.
- MVP guardrails: no online payments, no customer accounts, no customer login, no file uploads, and no full e-commerce checkout.
- The current `frontend/` app is a Vite/React prototype and migration source. The production target is the Next.js app in `apps/web`; Phase 1 and Phase 2 explicitly cover the refactor path.

---

## Ad Hoc Tasks

| Task number      | Task                                           | Task status | Comments                                                                                                                                                                                                                  | Updated date |
| ---------------- | ---------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| AH-2026-05-06-01 | Update planned admin auth stack to Better Auth | Done        | Tech stack and build plan updated before implementation.                                                                                                                                                                  | 2026-05-06   |
| AH-2026-05-06-02 | Pin Phase 1 workspace dependency ranges        | Done        | Replaced `latest` dependency specifiers with lockfile-resolved versions after review.                                                                                                                                     | 2026-05-06   |
| AH-2026-05-06-03 | Add copyright to footer                        | Done        | Added dynamic year copyright notice to SiteFooter component.                                                                                                                                                              | 2026-05-06   |
| AH-2026-05-07-01 | Fix local Docker Compose environment startup   | Done        | Added ignored local `.env` from `.env.example` with generated development `BETTER_AUTH_SECRET`, refreshed the lockfile for `@mrsign/content`, and included the content workspace manifest in the Docker dependency layer. | 2026-05-07   |
| AH-2026-05-08-01 | Address home hero review comments              | Done        | Removed the hero contact strip and selected hero paragraph, restyled the home page with the supplied blue-grid/lime-accent hero pattern, and updated floating cards with clearer printing and signs links.                | 2026-05-08   |
| AH-2026-05-08-02 | Fix Dockerized frontend hot reload             | Done        | Updated the Docker Compose app service to use the development image target, bind-mounted source files, isolated dependency/cache volumes, and `next dev` so frontend changes appear without rebuilding every service.     | 2026-05-08   |
| AH-2026-05-08-03 | Improve hero card text contrast                | Done        | Changed the floating Printing and Signs hero card text to print yellow with a dark drop shadow so the links remain visible over the image tiles.                                                                          | 2026-05-08   |
| AH-2026-05-08-04 | Hide hero cards on narrow mobile               | Done        | Hid the floating Printing and Signs hero cards below the small-screen breakpoint to prevent crowding in narrow mobile viewports.                                                                                          | 2026-05-08   |
| AH-2026-05-08-05 | Set hero card text to black                    | Done        | Changed the floating Printing and Signs hero card title and meta text to ink charcoal.                                                                                                                                    | 2026-05-08   |
| AH-2026-05-08-06 | Fit hero headline on narrow mobile             | Done        | Reduced the mobile-only Signs and Printing headline sizes below the small-screen breakpoint so the hero text fits narrow viewports.                                                                                       | 2026-05-08   |
| AH-2026-05-08-07 | Update hero badge and card text                | Done        | Changed the circular hero badge copy to `Serving Since 2000` and restored floating card text to white.                                                                                                                    | 2026-05-08   |
| AH-2026-05-08-08 | Adjust shop process header layout              | Done        | Extended the process heading area and moved the explanatory copy directly below the section header.                                                                                                                       | 2026-05-08   |
| AH-2026-05-08-09 | Unify lime accent and product header layout    | Done        | Changed visible yellow app accents to the hero lime green and moved the popular services intro copy directly below its extended heading.                                                                                  | 2026-05-08   |
| AH-2026-05-08-10 | Simplify public navigation                     | Done        | Removed the duplicate Request Quote nav item, changed the desktop CTA to Request Quote, and grouped Order Online, Gallery, Location, and Contact under More across desktop and mobile navigation.                         | 2026-05-08   |
| AH-2026-05-08-11 | Refine navigation hover and mobile menu        | Done        | Flattened the mobile navigation menu and updated desktop blue-header hover states so nav buttons turn lime with black text while the Request Quote CTA turns red with white text.                                         | 2026-05-08   |
| AH-2026-05-08-12 | Set desktop nav hover text to black            | Done        | Changed blue-header desktop nav and More dropdown hover/focus text from ink charcoal to explicit black.                                                                                                                   | 2026-05-08   |
| AH-2026-05-09-01 | Fix button hover text contrast                 | Done        | Removed inline shared button text colors and added explicit hover and focus contrast classes so filled hover states keep readable text across navigation, CTAs, and service links.                                        | 2026-05-09   |
| AH-2026-05-09-02 | Fix filled button base text contrast           | Done        | Set shared CTA and service-card filled button text colors as explicit important utilities so lime buttons stay ink and black buttons stay white before hover.                                                             | 2026-05-09   |
| AH-2026-05-09-03 | Adjust desktop navigation button sizing        | Done        | Reduced the center desktop navigation pills and made the Request Quote CTA larger to match the requested navigation hierarchy.                                                                                            | 2026-05-09   |
| AH-2026-05-09-04 | UI modernization polish pass                   | Done        | Eliminated cards-inside-cards, reduced oversized headlines across all pages, tightened section padding, and flattened nested layouts for a more professional, cohesive design.                                            | 2026-05-09   |
| AH-2026-05-09-05 | Fix mobile card padding and flow arrows        | Done        | Reduced hero process card padding on mobile, added vertical flow arrows between stacked cards on mobile, and tightened section spacing for narrow viewports.                                                              | 2026-05-09   |
| AH-2026-05-09-06 | Remove redundant process and help sections     | Done        | Removed the home page simple shop process section and the shared category help-choosing section from service category pages.                                                                                              | 2026-05-09   |
| AH-2026-05-09-07 | Align category header descriptions             | Done        | Moved parent category grid descriptions below their section headers so Signs, Printing, and Design use the same left-aligned stacked intro layout.                                                                        | 2026-05-09   |
| AH-2026-05-09-08 | Stack shared page header descriptions          | Done        | Updated shared interior page headers so descriptions sit below the hero title and span the available content width responsively.                                                                                          | 2026-05-09   |
| AH-2026-05-09-09 | Tighten mobile quote process spacing           | Done        | Reduced narrow-screen side padding on the home process band and kept the Free quote chip close to the blue shop bubble.                                                                                                   | 2026-05-09   |
| AH-2026-05-09-10 | Overlap quote mini-card chips                  | Done        | Extended the blue shop mini-card and overlaid the Free quote chip on reserved right-side space so the labels connect without covering text.                                                                               | 2026-05-09   |
| AH-2026-05-09-11 | Address Phase 5 form review findings           | Done        | Added focused form validation tests, extracted request parsing, validated contact reasons, normalized public save errors, disabled pending submissions, and corrected the Phase 5 task summary.                           | 2026-05-09   |
| AH-2026-05-09-12 | Remove public Online Order flow                | Done        | Removed Online Order from public navigation and content, redirected `/order-online` to Request Quote, and updated product planning docs so quote/contact intake is the MVP direction.                                     | 2026-05-09   |
| AH-2026-05-09-13 | Address Phase 7 auth review findings           | Done        | Added controlled admin deactivation failures, serializable deactivation transaction handling, explicit login-link request throttling, accessible disabled deactivate reasons, and corrected Phase 7 verification docs.    | 2026-05-09   |
| AH-2026-05-09-14 | Address Phase 8 admin portal review findings   | Done        | Fixed DB-only public service rendering, edit-service server action wiring, old/new route revalidation, optimistic service toggles, and Phase 8 documentation.                                                             | 2026-05-09   |
| AH-2026-05-09-15 | Fix better-auth/cookies module resolution      | Done        | Added `pnpm install --frozen-lockfile` to the Dockerfile dev CMD so stale anonymous node_modules volumes don't shadow freshly installed dependencies after `package.json` changes.                                        | 2026-05-09   |
| AH-2026-05-09-16 | Admin portal UI modernization                  | Done        | Redesigned admin portal with dark sidebar navigation, visual dashboard (bar chart + donut), CSS-only charts, admin-table with pagination, iOS-style toggle switches, admin-card components, and status badges.            | 2026-05-09   |
| AH-2026-05-09-17 | Admin portal UI polish                         | Done        | Added brand logo to sidebar, white nav labels, removed signed-in text, full-width layout, 7-row scrollable dashboard cards, lime-green action buttons.                                                                    | 2026-05-09   |
| AH-2026-05-10-01 | Redesign admin login page                      | Done        | Removed AdminShell sidebar/topbar from login, replaced with centered card layout, Mr. Sign logo, magic-link-only form, and terms footer.                                                                                  | 2026-05-10   |
| AH-2026-05-10-02 | Fix missing logout button on admin users page  | Done        | Added missing `adminName` prop to `<AdminShell>` on the users page so the sidebar footer (avatar, name, logout button) renders.                                                                                           | 2026-05-10   |

---

## Phase 0 — Project Readiness and Final Inputs

| Task number | Task                                                                           | Task status | Comments                                                                                                                            | Updated date |
| ----------- | ------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P0-01       | Confirm final branding direction, logo, and colour palette                     | Done        | Color palette and design branding documented in `docs/DESIGN.md`. Logos are being worked on.                                        | 2026-05-06   |
| P0-02       | Confirm final business phone number, email, address, and hours                 | Done        | Using existing information from the old website for now.                                                                            | 2026-05-06   |
| P0-03       | Confirm whether fax should remain visible                                      | Done        | Fax will remain visible for now.                                                                                                    | 2026-05-06   |
| P0-04       | Confirm whether Concord should be mentioned along with Vaughan and GTA         | Done        | Keep Concord along with Vaughan and GTA.                                                                                            | 2026-05-06   |
| P0-05       | Confirm final list of services from the old website                            | Done        | Keeping the same list of services from the old website.                                                                             | 2026-05-06   |
| P0-06       | Confirm final service descriptions                                             | Done        | Service descriptions will be in `docs/copy/` folder.                                                                                | 2026-05-06   |
| P0-07       | Confirm final pricing and quote-only services                                  | Done        | Get pricing from the old website; admin can change pricing in the admin panel.                                                      | 2026-05-06   |
| P0-08       | Confirm whether portfolio/gallery is included in MVP                           | Done        | Portfolio/gallery will use AI-generated images via OpenAI's image model during frontend build phase.                                | 2026-05-06   |
| P0-09       | Collect approved service images, hero images, gallery images, and brand assets | In Progress | Gallery images will be generated using OpenAI's image model during frontend development. Other brand assets pending.                | 2026-05-06   |
| P0-10       | Confirm launch admin users                                                     | To Do       | Pending decision on who the admin users will be.                                                                                    | 2026-05-06   |
| P0-11       | Confirm Resend sender email/domain setup                                       | In Progress | App now reads configurable Resend sender and admin recipient env vars; verified Resend domain/API key confirmation remains pending. | 2026-05-09   |
| P0-12       | Confirm MVP acceptance criteria and launch checklist with client               | Done        | MVP acceptance criteria confirmed.                                                                                                  | 2026-05-06   |

---

## Phase 1 — Repository, Monorepo, and App Foundation

| Task number | Task                                                                                                                  | Task status | Comments                                                                                             | Updated date |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------- | ------------ |
| P1-01       | Create or finalize GitHub repository                                                                                  | Done        | Existing GitHub remote `https://github.com/sankaL/mr-sign.git` confirmed.                            | 2026-05-06   |
| P1-02       | Add root package manager and workspace files such as `package.json`, `pnpm-workspace.yaml`, and root scripts          | Done        | Added pnpm workspace files and root scripts using Corepack pnpm.                                     | 2026-05-06   |
| P1-03       | Set up pnpm workspace / monorepo structure with `apps/web` and only the packages needed for MVP                       | Done        | Added `apps/web` as the production Next.js workspace app.                                            | 2026-05-06   |
| P1-04       | Create Next.js app using TypeScript in `apps/web`                                                                     | Done        | Added Next.js App Router scaffold with TypeScript.                                                   | 2026-05-06   |
| P1-05       | Configure app folder structure for public website and admin portal                                                    | Done        | Added base public and admin route folders.                                                           | 2026-05-06   |
| P1-06       | Set up Tailwind CSS in the Next.js app                                                                                | Done        | Added Tailwind CSS v4 via `@tailwindcss/postcss` and global CSS import.                              | 2026-05-06   |
| P1-07       | Configure TypeScript path aliases to support migrated component imports                                               | Done        | Configured `@/*` to resolve to `apps/web/src/*`.                                                     | 2026-05-06   |
| P1-08       | Add Lucide React icon support                                                                                         | Done        | Added `lucide-react` dependency.                                                                     | 2026-05-06   |
| P1-09       | Add Motion / Framer Motion support where needed                                                                       | Done        | Added `motion` dependency for future migrated animation components.                                  | 2026-05-06   |
| P1-10       | Configure TypeScript, linting, and formatting                                                                         | Done        | Added TypeScript, Next ESLint config, Prettier, and ignore rules for generated output.               | 2026-05-06   |
| P1-11       | Create `.env.example` with required environment variables                                                             | Done        | Added `apps/web/.env.example` for database, Better Auth, Resend, admin email, site URL, and PostHog. | 2026-05-06   |
| P1-12       | Add basic README with local setup instructions                                                                        | Done        | Updated root README with Corepack pnpm setup and standard commands.                                  | 2026-05-06   |
| P1-13       | Create base route structure for public and admin pages                                                                | Done        | Added base routes for public pages plus `/admin` and `/admin/login`.                                 | 2026-05-06   |
| P1-14       | Document expected retirement, archival, or temporary non-production status of legacy `frontend/` after Next.js parity | Done        | README documents `frontend/` as a non-production migration source until Phase 2 parity is accepted.  | 2026-05-06   |

---

## Phase 2 — Frontend Migration and Design System

| Task number | Task                                                                                                                                   | Task status | Comments                                                                                                                               | Updated date |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P2-01       | Audit existing `frontend/` Vite app structure, package dependencies, Tailwind/PostCSS config, path aliases, and `docs/DESIGN.md` rules | Done        | Vite app, prototype hero, Tailwind v4 setup, Motion usage, and design rules reviewed before migration.                                 | 2026-05-07   |
| P2-02       | Map Vite source files to Next.js App Router destinations in `apps/web`                                                                 | Done        | Prototype home route mapped to `apps/web/src/app/page.tsx` and shared components under `apps/web/src/components`.                      | 2026-05-07   |
| P2-03       | Migrate global CSS, reset styles, and base typography from `frontend/src/index.css`                                                    | Done        | Reset and base typography moved into `apps/web/src/app/globals.css` with project palette defaults.                                     | 2026-05-07   |
| P2-04       | Migrate Tailwind and PostCSS configuration into the Next.js app                                                                        | Done        | Kept existing Tailwind v4 `@tailwindcss/postcss` setup in `apps/web`; no Vite config copied.                                           | 2026-05-07   |
| P2-05       | Port the existing hero/prototype component from `frontend/components/ui/hero.tsx` into the Next.js component structure                 | Done        | Migrated the visual hero into server/client Next components with code-native graphic tiles.                                            | 2026-05-07   |
| P2-06       | Replace Vite entry files such as `index.html`, `src/main.tsx`, and `src/demo.tsx` with Next.js `layout.tsx` and page routes            | Done        | Public routes now render through App Router pages and shared shells.                                                                   | 2026-05-07   |
| P2-07       | Adapt migrated components for Next.js server/client component boundaries and add `use client` only where needed                        | Done        | Motion and mobile navigation are isolated as client components; page composition remains server-rendered.                              | 2026-05-07   |
| P2-08       | Review external image references and define static codebase-managed asset replacements before production                               | Done        | Production app uses no remote photo URLs; prototype images replaced with branded graphic panels.                                       | 2026-05-07   |
| P2-09       | Create global layout, navigation, and footer using the migrated design direction                                                       | Done        | Added shared site shell, navigation, logo, and footer.                                                                                 | 2026-05-07   |
| P2-10       | Create responsive mobile navigation                                                                                                    | Done        | Added menu-based mobile navigation with quote action and route links.                                                                  | 2026-05-07   |
| P2-11       | Create reusable page header component                                                                                                  | Done        | Added shared page header component for public route foundations.                                                                       | 2026-05-07   |
| P2-12       | Create reusable service card component                                                                                                 | Done        | Added service cards backed by shared category configuration.                                                                           | 2026-05-07   |
| P2-13       | Create reusable CTA section component                                                                                                  | Done        | Added reusable quote/call CTA section.                                                                                                 | 2026-05-07   |
| P2-14       | Create reusable form field components                                                                                                  | Done        | Added accessible text input and textarea primitives for future forms.                                                                  | 2026-05-07   |
| P2-15       | Create reusable admin layout shell                                                                                                     | Done        | Added static admin shell for future dashboard and auth pages.                                                                          | 2026-05-07   |
| P2-16       | Create loading, empty, and error states                                                                                                | Done        | Added reusable skeleton and state panels.                                                                                              | 2026-05-07   |
| P2-17       | Validate responsive layout patterns for mobile, tablet, desktop, and large desktop                                                     | In Progress | Typecheck, lint, format, production build, and desktop browser checks passed; dedicated mobile/tablet/large-desktop visual QA remains. | 2026-05-07   |
| P2-18       | Run side-by-side visual parity checks between the Vite prototype and the migrated Next.js home page                                    | In Progress | Migrated the prototype direction and replaced remote photos with graphic panels; final side-by-side parity signoff remains.            | 2026-05-07   |
| P2-19       | Remove or archive legacy `frontend/` after accepted parity, or clearly mark it as non-production if kept temporarily                   | Done        | Added `frontend/README.md` marking the Vite app as a non-production migration source.                                                  | 2026-05-07   |

---

## Phase 3 — Database, Prisma, and Seed Data

| Task number | Task                                                                        | Task status | Comments                                                                                                                 | Updated date |
| ----------- | --------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ | ------------ |
| P3-01       | Set up Prisma package/configuration                                         | Done        | Added `packages/db` with Prisma 7 config, generated client setup, and root database scripts.                             | 2026-05-07   |
| P3-02       | Create PostgreSQL database connection configuration                         | Done        | Added Prisma PostgreSQL datasource configuration and runtime client wiring for `DATABASE_URL`.                           | 2026-05-07   |
| P3-03       | Define Service Category model                                               | Done        | Added controlled category model for Signs, Printing, and Design.                                                         | 2026-05-07   |
| P3-04       | Define Service model                                                        | Done        | Added service model with category relation, slugs, image path metadata, display order, active state, and featured state. | 2026-05-07   |
| P3-05       | Define Pricing model and pricing type options                               | Done        | Added pricing model and pricing type enum for exact, starting from, tiered, and request quote pricing.                   | 2026-05-07   |
| P3-06       | Define Customer Request model for quote, order, and contact submissions     | Done        | Added shared request model for quote, order, and contact intake fields.                                                  | 2026-05-07   |
| P3-07       | Define Request Service relationship model                                   | Done        | Added request-service join model for selected services on quote and order requests.                                      | 2026-05-07   |
| P3-08       | Define Request Note model for internal admin notes                          | Done        | Added internal note model with optional admin author relation.                                                           | 2026-05-07   |
| P3-09       | Define Admin User model                                                     | Done        | Added admin user model linked to Better Auth user records.                                                               | 2026-05-07   |
| P3-10       | Define Better Auth database tables if required                              | Done        | Added Better Auth core user, session, account, and verification tables.                                                  | 2026-05-07   |
| P3-11       | Define optional Audit Log model                                             | Done        | Added lightweight audit log model for future admin actions.                                                              | 2026-05-07   |
| P3-12       | Create first database migration                                             | Done        | Added initial SQL migration generated from the Prisma schema.                                                            | 2026-05-07   |
| P3-13       | Create seed script for Signs, Printing, and Design categories               | Done        | Added seed script for the three MVP service categories.                                                                  | 2026-05-07   |
| P3-14       | Create seed script for all existing services from old website               | Done        | Added seed data for 42 services from the product and copy docs, defaulting pricing to request quote.                     | 2026-05-07   |
| P3-15       | Create request code generation logic for quote, order, and contact requests | Done        | Added deterministic request-code formatting and transactional per-type yearly counters.                                  | 2026-05-07   |
| P3-16       | Create script to create the first admin user                                | Done        | Added first-admin upsert script using CLI args or environment variables.                                                 | 2026-05-07   |

---

## Phase 4 — Public Website Pages (make sure frontend follows copy and the initial pricing data is seeded from the old website and images are generated using openai image gen 2 using the description in the copy of page)

| Task number | Task                                                                                        | Task status | Comments                                                                                                                                           | Updated date |
| ----------- | ------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P4-01       | Build Home page                                                                             | Done        | Rebuilt the home page from the copy docs with hero, services overview, trust, process, featured services, location summary, and generated imagery. | 2026-05-08   |
| P4-02       | Build Signs category page                                                                   | Done        | Added catalog-driven Signs category page with generated hero image and service grid.                                                               | 2026-05-08   |
| P4-03       | Build Printing category page                                                                | Done        | Added catalog-driven Printing category page with generated hero image and service grid.                                                            | 2026-05-08   |
| P4-04       | Build Design category page                                                                  | Done        | Added catalog-driven Design category page with generated hero image and service grid.                                                              | 2026-05-08   |
| P4-05       | Build dynamic service detail page template                                                  | Done        | Added shared dynamic service detail template with SEO metadata, image, pricing, capabilities, CTAs, and related services.                          | 2026-05-08   |
| P4-06       | Add service detail pages for all Signs services                                             | Done        | Added static params for 20 Signs services from the shared content catalog.                                                                         | 2026-05-08   |
| P4-07       | Add service detail pages for all Printing services                                          | Done        | Added static params for 12 Printing services from the shared content catalog.                                                                      | 2026-05-08   |
| P4-08       | Add service detail pages for all Design services                                            | Done        | Added static params for 10 Design services from the shared content catalog.                                                                        | 2026-05-08   |
| P4-09       | Add pricing display logic for exact price, starting from, tiered pricing, and request quote | Done        | Added public pricing types, pricing summary UI, old-site source URLs, and seeded concise legacy pricing summaries.                                 | 2026-05-08   |
| P4-10       | Add related services section on service detail pages                                        | Done        | Added category-scoped related service references and validation for resolvable relations.                                                          | 2026-05-08   |
| P4-11       | Build Location page with address, hours, map/directions, and tap-to-call                    | Done        | Added address, tap-to-call, email, directions, confirmed hours, and LocalBusiness schema without geo coordinates.                                  | 2026-05-08   |
| P4-12       | Build Contact page                                                                          | Done        | Added static contact page with direct phone, email, location, and non-submitting Phase 5 preview fields.                                           | 2026-05-08   |
| P4-13       | Build optional Gallery page if enough quality images are available                          | Done        | Added gallery page reusing generated service imagery.                                                                                              | 2026-05-08   |
| P4-14       | Add 404 / not found page                                                                    | Done        | Added custom not-found page with service and contact routes.                                                                                       | 2026-05-08   |
| P4-15       | Confirm all public routes work on mobile and desktop                                        | Done        | Verified representative desktop and mobile routes in the in-app browser and ran typecheck, lint, build, and tests.                                 | 2026-05-08   |

---

## Phase 5 — Quote and Contact Forms

| Task number | Task                                                                     | Task status | Comments                                                                                                                                  | Updated date |
| ----------- | ------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P5-01       | Build Request Quote form UI                                              | Done        | Replaced quote preview with a live shared request form.                                                                                   | 2026-05-09   |
| P5-02       | Build Order Online request form UI                                       | Superseded  | Public Online Order was removed from MVP; `/order-online` now redirects to Request Quote while backend compatibility remains.             | 2026-05-09   |
| P5-03       | Build Contact form UI                                                    | Done        | Replaced contact preview with a live contact inquiry form.                                                                                | 2026-05-09   |
| P5-04       | Add service category and service selection fields                        | Done        | Added grouped service checkboxes from the shared content catalog.                                                                         | 2026-05-09   |
| P5-05       | Add contact information fields                                           | Done        | Added name, email, phone, company, and preferred contact fields.                                                                          | 2026-05-09   |
| P5-06       | Add project detail fields                                                | Done        | Added quantity, size, material, colour, artwork status, date, and detail fields for quote requests.                                       | 2026-05-09   |
| P5-07       | Add form validation rules                                                | Done        | Added server-side validation for required fields, email, phone preference, service selection, quantity, date, and message details.        | 2026-05-09   |
| P5-08       | Add form submission handling                                             | Done        | Added server action submission handling with typed success and error states.                                                              | 2026-05-09   |
| P5-09       | Save quote requests to database                                          | Done        | Quote requests now create customer request and selected service rows.                                                                     | 2026-05-09   |
| P5-10       | Save order requests to database                                          | Superseded  | Public order intake was removed from MVP; existing backend support remains only for compatibility.                                        | 2026-05-09   |
| P5-11       | Save contact inquiries to database                                       | Done        | Contact inquiries now create customer request rows without requiring services.                                                            | 2026-05-09   |
| P5-12       | Generate unique quote and contact request codes                          | Done        | Request codes are generated transactionally using the existing per-type yearly counter format; order codes remain only for compatibility. | 2026-05-09   |
| P5-13       | Show confirmation screen after successful submission                     | Done        | Added inline confirmation panels showing generated request codes.                                                                         | 2026-05-09   |
| P5-14       | Add service-page CTA behavior to preselect service in forms where useful | Done        | Service detail quote CTAs now pass category and service query params for form preselection.                                               | 2026-05-09   |
| P5-15       | Add basic spam protection such as hidden honeypot field                  | Done        | Added hidden `website` honeypot handling that accepts without database writes.                                                            | 2026-05-09   |
| P5-16       | Confirm there is no payment flow and no file upload flow                 | Done        | Form helper copy and fields avoid payment, checkout, account, and upload flows.                                                           | 2026-05-09   |

---

## Phase 6 — Email Notifications with Resend

| Task number | Task                                                                            | Task status | Comments                                                                                                                                                                        | Updated date |
| ----------- | ------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P6-01       | Set up Resend package/configuration                                             | Done        | Added `@mrsign/email` workspace package with Resend client wiring, safe no-key skip behavior, isolated post-save notification handling, and a basic public submission throttle. | 2026-05-09   |
| P6-02       | Configure sender email/domain                                                   | In Progress | Sender is configurable through `RESEND_FROM_EMAIL`; real sender/domain verification remains pending in Resend.                                                                  | 2026-05-09   |
| P6-03       | Create customer quote confirmation email template                               | Done        | Added branded customer quote confirmation subject, plain text, and HTML content.                                                                                                | 2026-05-09   |
| P6-04       | Create admin quote notification email template                                  | Done        | Added admin quote notification with customer, service, project, timing, and reply-to details.                                                                                   | 2026-05-09   |
| P6-05       | Create customer order request confirmation email template                       | Superseded  | Public order intake was removed from MVP.                                                                                                                                       | 2026-05-09   |
| P6-06       | Create admin order request notification email template                          | Superseded  | Public order intake was removed from MVP.                                                                                                                                       | 2026-05-09   |
| P6-07       | Create customer contact confirmation email template                             | Done        | Added branded customer contact confirmation subject, plain text, and HTML content.                                                                                              | 2026-05-09   |
| P6-08       | Create admin contact notification email template                                | Done        | Added admin contact notification with customer, contact reason, message, and reply-to details.                                                                                  | 2026-05-09   |
| P6-09       | make send and from e-mail address configuratble env variables for resend emails | Done        | Uses `RESEND_FROM_EMAIL` and `ADMIN_NOTIFICATION_EMAIL` with existing `.env.example` values.                                                                                    | 2026-05-09   |
| P6-10       | Include request code in email subject/body                                      | Done        | Request code appears in customer/admin subjects and message details.                                                                                                            | 2026-05-09   |
| P6-11       | Include customer and request details in admin emails                            | Done        | Admin templates include customer contact fields, selected services, request details, and submission time.                                                                       | 2026-05-09   |
| P6-12       | Test email delivery in development/staging                                      | To Do       | Automated template tests added; real Resend delivery test requires configured API key and verified sender/domain.                                                               | 2026-05-09   |
| P6-13       | Test email delivery in production                                               | To Do       |                                                                                                                                                                                 |              |

---

## Phase 7 — Admin Authentication and Admin Users

| Task number | Task                                                   | Task status | Comments                                                                                                                                                               | Updated date |
| ----------- | ------------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P7-01       | Set up Better Auth                                     | Done        | Added Better Auth config, Prisma adapter wiring, Next.js auth route, and admin session helpers.                                                                        | 2026-05-09   |
| P7-02       | Configure passwordless magic-link login through Resend | Done        | Added Better Auth magic-link plugin with active-admin allowlist checks, explicit login-link request throttling, and Resend-backed login email.                         | 2026-05-09   |
| P7-03       | Build admin login page                                 | Done        | Replaced the preview login page with a live server-action magic-link request form.                                                                                     | 2026-05-09   |
| P7-04       | Protect all `/admin` routes                            | Done        | Moved protected admin pages into an authenticated route group and added a cookie-based Next proxy redirect plus page-level active-admin validation.                    | 2026-05-09   |
| P7-05       | Create first admin user script                         | Done        | Existing `db:create-admin` script creates or reactivates the Better Auth user and linked AdminUser record.                                                             | 2026-05-09   |
| P7-06       | Configure admin session duration                       | Done        | Configured 14-day sessions with daily refresh and 5-minute session freshness.                                                                                          | 2026-05-09   |
| P7-07       | Build admin users list page                            | Done        | Added `/admin/users` with active/inactive admin listing and current-user state.                                                                                        | 2026-05-09   |
| P7-08       | Build add admin user flow                              | Done        | Added server-action admin creation/reactivation flow backed by Better Auth User and AdminUser records.                                                                 | 2026-05-09   |
| P7-09       | Build deactivate admin user flow                       | Done        | Added deactivate flow with self-deactivation and last-active-admin safeguards, serializable transaction handling, controlled failure messages, and session revocation. | 2026-05-09   |
| P7-10       | Prevent unauthorized users from accessing admin pages  | Done        | Active AdminUser validation is required for protected admin pages and actions; login requests use neutral unauthorized responses.                                      | 2026-05-09   |
| P7-11       | Test login email flow                                  | In Progress | Added deterministic email template tests; real Resend delivery still requires configured API key and verified sender/domain.                                           | 2026-05-09   |
| P7-12       | Test expired/invalid login link behavior               | Done        | Login page maps Better Auth invalid, expired, and attempts-exceeded errors to user-facing retry guidance.                                                              | 2026-05-09   |

---

## Phase 8 — Admin Portal Features

| Task number | Task                                                      | Task status | Comments                                                                                              | Updated date |
| ----------- | --------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| P8-01       | Build admin dashboard                                     | Done        | Dashboard with summary cards, recent submissions, status breakdown, and services needing attention.   | 2026-05-09   |
| P8-02       | Show new quote requests and contact messages on dashboard | Done        | Dashboard cards show new quote and contact counts with links to filtered request list.                | 2026-05-09   |
| P8-03       | Show recent submissions on dashboard                      | Done        | Recent submissions table shows last 10 requests with code, type, customer, status, and date.          | 2026-05-09   |
| P8-04       | Show request counts by status                             | Done        | Status breakdown section with count cards linking to filtered request list.                           | 2026-05-09   |
| P8-05       | Show services missing pricing or marked as request quote  | Done        | Services attention panel shows active services with REQUEST_QUOTE pricing or missing pricing.         | 2026-05-09   |
| P8-06       | Build request list page                                   | Done        | Request list with table, sort by submittedAt desc, 100 result limit.                                  | 2026-05-09   |
| P8-07       | Add request search by request code                        | Done        | Search input filters by request code substring match via URL params.                                  | 2026-05-09   |
| P8-08       | Add filters for request type and request status           | Done        | Dropdown filters for type (QUOTE/ORDER/CONTACT) and status via URL params.                            | 2026-05-09   |
| P8-09       | Build request detail page                                 | Done        | Full request details, selected services, internal notes, and status update form.                      | 2026-05-09   |
| P8-10       | Add request status update flow                            | Done        | Status dropdown with server action, audit log entry, and revalidation.                                | 2026-05-09   |
| P8-11       | Add internal notes to requests                            | Done        | Notes list with author and date, add note form with server action.                                    | 2026-05-09   |
| P8-12       | Build services list page                                  | Done        | Services grouped by category with active/featured toggles and edit links.                             | 2026-05-09   |
| P8-13       | Build add/edit service pages                              | Done        | Add and edit service forms with all fields including pricing and SEO.                                 | 2026-05-09   |
| P8-14       | Add service active/inactive control                       | Done        | Quick toggle on service list and checkbox in edit form.                                               | 2026-05-09   |
| P8-15       | Add service display order control                         | Done        | Numeric input in service form, ordered by displayOrder in lists.                                      | 2026-05-09   |
| P8-16       | Add featured service control                              | Done        | Quick toggle on service list and checkbox in edit form.                                               | 2026-05-09   |
| P8-17       | Add image path field for service images                   | Done        | Image path text field in service form.                                                                | 2026-05-09   |
| P8-18       | Build pricing management flow                             | Done        | Inline pricing sub-form with type selector, amount, unit label, tiered description, and public label. | 2026-05-09   |
| P8-19       | Add SEO fields for service pages                          | Done        | Meta title and meta description fields in service form.                                               | 2026-05-09   |
| P8-20       | Build basic admin settings page                           | Done        | Settings page showing current admin info, business details, and business hours.                       | 2026-05-09   |

---

## Phase 9 — Analytics with PostHog

| Task number | Task                                                                                  | Task status | Comments                                  | Updated date |
| ----------- | ------------------------------------------------------------------------------------- | ----------- | ----------------------------------------- | ------------ |
| P9-01       | Set up PostHog package/configuration                                                  | To Do       |                                           |              |
| P9-02       | Add page view tracking                                                                | To Do       |                                           |              |
| P9-03       | Track category page views                                                             | To Do       |                                           |              |
| P9-04       | Track service page views                                                              | To Do       |                                           |              |
| P9-05       | Track CTA clicks such as Request Quote, Browse Services, Call Now, and Get Directions | To Do       |                                           |              |
| P9-06       | Track quote form started/submitted events                                             | To Do       |                                           |              |
| P9-07       | Track order form started/submitted events                                             | Superseded  | Public order intake was removed from MVP. | 2026-05-09   |
| P9-08       | Track contact form submitted event                                                    | To Do       |                                           |              |
| P9-09       | Track admin login and key admin actions                                               | To Do       |                                           |              |
| P9-10       | Confirm no sensitive customer information is sent to PostHog                          | To Do       |                                           |              |
| P9-11       | Verify analytics events in staging/production                                         | To Do       |                                           |              |

---

## Phase 10 — SEO, Social Sharing, and Web Assets

| Task number | Task                                                                  | Task status | Comments                                    | Updated date |
| ----------- | --------------------------------------------------------------------- | ----------- | ------------------------------------------- | ------------ |
| P10-01      | Define SEO title and meta description format for main pages           | To Do       |                                             |              |
| P10-02      | Define SEO title and meta description format for service detail pages | To Do       |                                             |              |
| P10-03      | Add SEO metadata to Home page                                         | To Do       |                                             |              |
| P10-04      | Add SEO metadata to Signs page                                        | To Do       |                                             |              |
| P10-05      | Add SEO metadata to Printing page                                     | To Do       |                                             |              |
| P10-06      | Add SEO metadata to Design page                                       | To Do       |                                             |              |
| P10-07      | Add SEO metadata to Request Quote page                                | To Do       |                                             |              |
| P10-08      | Add SEO metadata to Order Online page                                 | Superseded  | `/order-online` redirects to Request Quote. | 2026-05-09   |
| P10-09      | Add SEO metadata to Contact page                                      | To Do       |                                             |              |
| P10-10      | Add SEO metadata to Location page                                     | To Do       |                                             |              |
| P10-11      | Add dynamic SEO metadata for each service detail page                 | To Do       |                                             |              |
| P10-12      | Add clean URLs and canonical URL handling                             | To Do       |                                             |              |
| P10-13      | Create sitemap.xml                                                    | To Do       |                                             |              |
| P10-14      | Create robots.txt                                                     | To Do       |                                             |              |
| P10-15      | Add Local Business structured data                                    | To Do       |                                             |              |
| P10-16      | Add service-specific structured data where useful                     | To Do       |                                             |              |
| P10-17      | Add Open Graph metadata for web sharing                               | To Do       |                                             |              |
| P10-18      | Add Twitter/X card metadata for web sharing                           | To Do       |                                             |              |
| P10-19      | Generate or create default social sharing image                       | To Do       |                                             |              |
| P10-20      | Generate or create category social sharing images                     | To Do       |                                             |              |
| P10-21      | Generate or create service page images where needed                   | To Do       |                                             |              |
| P10-22      | Create favicon.ico                                                    | To Do       |                                             |              |
| P10-23      | Create PNG favicons for browser tabs and search results               | To Do       |                                             |              |
| P10-24      | Create Apple touch icon for iPhone/iPad home screen save              | To Do       |                                             |              |
| P10-25      | Create Android/Chrome web app icons                                   | To Do       |                                             |              |
| P10-26      | Create web app manifest file                                          | To Do       |                                             |              |
| P10-27      | Confirm social preview works on common sharing platforms              | To Do       |                                             |              |
| P10-28      | Add alt text for all important images                                 | To Do       |                                             |              |
| P10-29      | Optimize image sizes and formats                                      | To Do       |                                             |              |
| P10-30      | Use text-based service content instead of image-only labels           | To Do       |                                             |              |
| P10-31      | Add internal links between related services                           | To Do       |                                             |              |
| P10-32      | Add Vaughan and GTA wording naturally across key pages                | To Do       |                                             |              |
| P10-33      | Configure Google Search Console after launch                          | To Do       |                                             |              |
| P10-34      | Submit sitemap in Google Search Console                               | To Do       |                                             |              |
| P10-35      | Configure Bing Webmaster Tools after launch                           | To Do       |                                             |              |
| P10-36      | Verify indexability after production deployment                       | To Do       |                                             |              |
| P10-37      | Check metadata and social previews after custom domain is live        | To Do       |                                             |              |

---

## Phase 11 — Railway Deployment and Production Configuration

| Task number | Task                                                                          | Task status | Comments                                                                          | Updated date |
| ----------- | ----------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------- | ------------ |
| P11-01      | Create Railway project                                                        | To Do       |                                                                                   |              |
| P11-02      | Connect GitHub repository to Railway                                          | To Do       |                                                                                   |              |
| P11-03      | Add Railway Docker PostgreSQL service with persistent volume                  | To Do       | Mount the Railway volume at `/var/lib/postgresql/data`.                           | 2026-05-07   |
| P11-04      | Configure production environment variables                                    | To Do       |                                                                                   |              |
| P11-05      | Configure app-to-database connection variables                                | To Do       | App service should connect to the Docker database service through `DATABASE_URL`. | 2026-05-07   |
| P11-06      | Configure Better Auth production variables                                    | To Do       |                                                                                   |              |
| P11-07      | Configure Resend API key and sender email                                     | To Do       |                                                                                   |              |
| P11-08      | Configure admin notification email                                            | To Do       |                                                                                   |              |
| P11-09      | Configure PostHog project key and host                                        | To Do       |                                                                                   |              |
| P11-10      | Add `railway.json` if needed                                                  | To Do       | Prefer the root Dockerfile unless Railway config-as-code is needed later.         | 2026-05-07   |
| P11-11      | Configure Railway app service to build from the root Dockerfile               | To Do       | The Dockerfile builds and starts the `apps/web` monorepo app.                     | 2026-05-07   |
| P11-12      | Run Prisma migrations against the Docker PostgreSQL service during deployment | To Do       |                                                                                   | 2026-05-07   |
| P11-13      | Seed production service categories and services                               | To Do       |                                                                                   |              |
| P11-14      | Create first production admin user                                            | To Do       |                                                                                   |              |
| P11-15      | Deploy Next.js app to Railway                                                 | To Do       |                                                                                   |              |
| P11-16      | Add custom domain                                                             | To Do       |                                                                                   |              |
| P11-17      | Configure DNS records                                                         | To Do       |                                                                                   |              |
| P11-18      | Verify HTTPS/SSL                                                              | To Do       |                                                                                   |              |
| P11-19      | Verify public website routes in production                                    | To Do       |                                                                                   |              |
| P11-20      | Verify admin portal routes in production                                      | To Do       |                                                                                   |              |
| P11-21      | Verify production email sending                                               | To Do       |                                                                                   |              |
| P11-22      | Verify production analytics tracking                                          | To Do       |                                                                                   |              |
| P11-23      | Document deployment and rollback steps                                        | To Do       |                                                                                   |              |

---

## Phase 12 — QA, UAT, and Launch Readiness

| Task number | Task                                                                         | Task status | Comments                                  | Updated date |
| ----------- | ---------------------------------------------------------------------------- | ----------- | ----------------------------------------- | ------------ |
| P12-01      | Test Home page on mobile, tablet, desktop, and large desktop                 | To Do       |                                           |              |
| P12-02      | Test Signs page and all Signs service pages                                  | To Do       |                                           |              |
| P12-03      | Test Printing page and all Printing service pages                            | To Do       |                                           |              |
| P12-04      | Test Design page and all Design service pages                                | To Do       |                                           |              |
| P12-05      | Test Location page and tap-to-call behavior                                  | To Do       |                                           |              |
| P12-06      | Test Contact page and form submission                                        | To Do       |                                           |              |
| P12-07      | Test quote request submission                                                | To Do       |                                           |              |
| P12-08      | Test order request submission                                                | Superseded  | Public order intake was removed from MVP. | 2026-05-09   |
| P12-09      | Test customer confirmation emails                                            | To Do       |                                           |              |
| P12-10      | Test admin notification emails                                               | To Do       |                                           |              |
| P12-11      | Test request code generation                                                 | To Do       |                                           |              |
| P12-12      | Test admin login                                                             | To Do       |                                           |              |
| P12-13      | Test admin user management                                                   | To Do       |                                           |              |
| P12-14      | Test service management                                                      | To Do       |                                           |              |
| P12-15      | Test pricing management                                                      | To Do       |                                           |              |
| P12-16      | Test request management                                                      | To Do       |                                           |              |
| P12-17      | Test request status updates                                                  | To Do       |                                           |              |
| P12-18      | Test internal notes                                                          | To Do       |                                           |              |
| P12-19      | Test that no payment flow exists                                             | To Do       |                                           |              |
| P12-20      | Test that no file upload flow exists                                         | To Do       |                                           |              |
| P12-21      | Run basic accessibility checks                                               | To Do       |                                           |              |
| P12-22      | Run performance check / Lighthouse review                                    | To Do       |                                           |              |
| P12-23      | Validate SEO metadata on all public pages                                    | To Do       |                                           |              |
| P12-24      | Validate social sharing previews                                             | To Do       |                                           |              |
| P12-25      | Validate sitemap and robots.txt                                              | To Do       |                                           |              |
| P12-26      | Validate analytics events                                                    | To Do       |                                           |              |
| P12-27      | Complete client UAT review                                                   | To Do       |                                           |              |
| P12-28      | Fix launch-blocking issues                                                   | To Do       |                                           |              |
| P12-29      | Final production smoke test                                                  | To Do       |                                           |              |
| P12-30      | Launch website                                                               | To Do       |                                           |              |
| P12-31      | Confirm legacy `frontend/` is not part of the production build or deployment | To Do       |                                           |              |

---

## Phase 13 — Post-Launch SEO and Monitoring

| Task number | Task                                                      | Task status | Comments | Updated date |
| ----------- | --------------------------------------------------------- | ----------- | -------- | ------------ |
| P13-01      | Submit sitemap to Google Search Console                   | To Do       |          |              |
| P13-02      | Submit sitemap to Bing Webmaster Tools                    | To Do       |          |              |
| P13-03      | Inspect key URLs for indexing                             | To Do       |          |              |
| P13-04      | Check Google search result appearance for branded queries | To Do       |          |              |
| P13-05      | Review crawl/indexing issues                              | To Do       |          |              |
| P13-06      | Review top landing pages and service interest in PostHog  | To Do       |          |              |
| P13-07      | Review quote/contact conversion events                    | To Do       |          |              |
| P13-08      | Check form submission logs for errors                     | To Do       |          |              |
| P13-09      | Check Railway deployment and runtime logs                 | To Do       |          |              |
| P13-10      | Check Resend delivery logs                                | To Do       |          |              |
| P13-11      | Review mobile performance after launch                    | To Do       |          |              |
| P13-12      | Identify first SEO/content improvement backlog items      | To Do       |          |              |

---

## Bugs

| Task number | Task | Task status | Comments | Updated date |
| ----------- | ---- | ----------- | -------- | ------------ |

---

## Ad Hoc Tasks

| Task number | Task                                                               | Task status | Comments                                                                                                                                                                                                                                  | Updated date |
| ----------- | ------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| AHT-001     | Update root `AGENTS.md` to match the Mr. Sign and Print repository | Done        | Replaced copied Wonder Jira references with Mr. Sign and Print docs, paths, stack context, and workflow rules.                                                                                                                            | 2026-05-05   |
| AHT-002     | Review tech stack and build plan for frontend migration coverage   | Done        | Confirmed the proposed stack fits the MVP and added explicit Vite `frontend/` to Next.js `apps/web` migration tasks.                                                                                                                      | 2026-05-06   |
| AHT-003     | Add code organization rule to avoid god files                      | Done        | Added root `AGENTS.md` guidance for splitting large mixed-responsibility files into focused modules, keeping orchestration files thin, and refactoring incrementally.                                                                     | 2026-05-06   |
| AHT-004     | Add intentional testing guidance to root `AGENTS.md`               | Done        | Added testing rules that favor risk-based coverage, the smallest useful test scope, and restraint for low-risk copy, styling, docs, and mechanical changes.                                                                               | 2026-05-06   |
| AHT-005     | Add frontend shared component reuse guidance to root `AGENTS.md`   | Done        | Added rules to reuse shared UI patterns for repeated tables, cards, dropdowns, search bars, states, and form controls while allowing unique components when the design context warrants it.                                               | 2026-05-06   |
| AHT-006     | Update Phase 0 build plan with confirmed decisions                 | Done        | Updated branding, contact info, services, pricing, gallery approach, and MVP confirmation status. Created `docs/copy/` folder for page copy and service descriptions.                                                                     | 2026-05-06   |
| AHT-007     | Dockerize local and Railway app/database services                  | Done        | Added root Dockerfile, Docker Compose, Makefile, local env defaults, and updated Railway deployment docs for a Docker PostgreSQL service with persistent volume.                                                                          | 2026-05-07   |
| AHT-008     | Address Dockerization code review findings                         | Done        | Bound local PostgreSQL to loopback, rejected placeholder auth secrets at container startup, exposed deploy-safe migrations, and corrected Docker environment/task summary docs.                                                           | 2026-05-07   |
| AHT-009     | Improve visual appearance of dashboard stat cards                  | Done        | Updated `StatCard` to accept and render Lucide icons in a rounded container with a tinted background matching the accent color.                                                                                                           | 2026-05-10   |
| AHT-010     | Admin table sort, multi-select filters, combined services table    | Done        | Combined three service category tables into one with Type column, added reusable MultiSelectDropdown for filters, sortable column headers on all tables, search on services, fixed request search, moved Add Service CTA to page header.  | 2026-05-10   |
| AHT-011     | Add pagination to admin tables                                     | Done        | Added polished bottom pagination to Requests, Services, and Users tables, including local service pagination and server-side users pagination.                                                                                            | 2026-05-10   |
| AHT-012     | Multi-step service form with draft saving                          | Done        | Replaced single-page service form with 3-step wizard (Basics, Pricing, Visibility), added ServiceStatus enum (DRAFT/ACTIVE/INACTIVE) to schema, draft save on any step, publish on final step, updated all isActive references to status. | 2026-05-10   |
| AHT-013     | Admin manual request creation                                      | Done        | Added /admin/requests/new page with full request form (type, contact, services, details), createAdminRequest server action with request code generation, Add Request button on requests list page.                                        | 2026-05-10   |
| AHT-014     | Address admin portal code review findings                          | Done        | Fixed service status seed/migration rollout issues, request service validation, request filter validation, service route revalidation, service publish status, modal/select/sort accessibility, and URL search state sync.                | 2026-05-10   |
