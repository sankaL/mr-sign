# Mr. Sign and Print - Build Plan

## Notes

- This plan is organized by phase.
- MVP guardrails: no online payments, no customer accounts, no customer login, no file uploads, no online customer submissions, no admin portal, no database, and no full e-commerce checkout.
- Current production target: static Next.js app in `apps/web` backed by JSON content in `packages/content/content/`.
- Public CTAs should point customers to phone, email, location, or service browsing.
- Historical ad hoc rows below are retained for audit trail. Superseded backend, admin, database, auth, and email work is no longer current MVP scope.

---

## Phase 0 - Inputs and Static Scope

| Task number | Task                                   | Task status | Comments                                                                                      | Updated date |
| ----------- | -------------------------------------- | ----------- | --------------------------------------------------------------------------------------------- | ------------ |
| P0-01       | Confirm public-only MVP scope          | Done        | Customer intake, admin, auth, database, and transactional email are removed from the MVP.     | 2026-06-23   |
| P0-02       | Confirm direct-contact conversion path | Done        | Customers should call, email, visit, or browse services instead of submitting a website form. | 2026-06-23   |
| P0-03       | Confirm content ownership model        | Done        | Human-editable JSON in `packages/content/content/` is the source of truth.                    | 2026-06-23   |

---

## Phase 1 - Static Content Foundation

| Task number | Task                      | Task status | Comments                                                                                                   | Updated date |
| ----------- | ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- | ------------ |
| P1-01       | Add site JSON content     | Done        | Added site-level business info, contact details, hours, actions, and SEO data.                             | 2026-06-23   |
| P1-02       | Add category JSON content | Done        | Added Signs, Printing, and Design category records.                                                        | 2026-06-23   |
| P1-03       | Add service JSON content  | Done        | Added one JSON service file per service under category folders.                                            | 2026-06-23   |
| P1-04       | Add typed content helpers | Done        | Static helpers expose categories, services, pricing, and site metadata to the app.                         | 2026-06-23   |
| P1-05       | Add JSON validation tests | Done        | Tests cover required fields, unique routes, related links, image paths, pricing, and removed CTA language. | 2026-06-23   |

---

## Phase 2 - Public Static Website

| Task number | Task                                               | Task status | Comments                                                                                        | Updated date |
| ----------- | -------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------- | ------------ |
| P2-01       | Convert service browsing to static content         | Done        | Public category and service pages read directly from `@mrsign/content`.                         | 2026-06-23   |
| P2-02       | Replace submission CTAs                            | Done        | Primary actions now call the shop, email the shop, visit location, or browse services.          | 2026-06-23   |
| P2-03       | Convert contact page to static direct-contact page | Done        | Removed customer submission form and kept phone, email, address, hours, and map.                | 2026-06-23   |
| P2-04       | Keep compatibility URLs static                     | Done        | `/request-quote` and `/order-online` point users to phone, email, and contact instead of forms. | 2026-06-23   |
| P2-05       | Update SEO, sitemap, robots, and schema            | Done        | Static routes and service metadata align with direct-contact conversion.                        | 2026-06-23   |

---

## Phase 3 - Backend Removal

| Task number | Task                        | Task status | Comments                                                                            | Updated date |
| ----------- | --------------------------- | ----------- | ----------------------------------------------------------------------------------- | ------------ |
| P3-01       | Remove admin portal code    | Done        | Deleted admin pages, components, actions, auth helpers, and admin-only tests.       | 2026-06-23   |
| P3-02       | Remove customer form code   | Done        | Deleted public request form components, validation, and server actions.             | 2026-06-23   |
| P3-03       | Remove database package     | Done        | Deleted `packages/db`, Prisma schema, migrations, seed scripts, and database tests. | 2026-06-23   |
| P3-04       | Remove email package        | Done        | Deleted `packages/email`, Resend email templates, and email tests.                  | 2026-06-23   |
| P3-05       | Remove API and proxy routes | Done        | Deleted auth, health, and proxy routes that depended on server runtime behavior.    | 2026-06-23   |

---

## Phase 4 - Tooling and Deployment

| Task number | Task                               | Task status | Comments                                                                               | Updated date |
| ----------- | ---------------------------------- | ----------- | -------------------------------------------------------------------------------------- | ------------ |
| P4-01       | Configure static export            | Done        | Next config uses `output: "export"` and unoptimized images for static hosting.         | 2026-06-23   |
| P4-02       | Simplify dependencies              | Done        | Removed backend, auth, email, charting, and form-only packages from the web app.       | 2026-06-23   |
| P4-03       | Simplify local scripts             | Done        | Root scripts now focus on static web dev, build, lint, typecheck, format, and tests.   | 2026-06-23   |
| P4-04       | Simplify Docker and Railway config | Done        | Removed database bootstrap, migration, auth secret, and email environment assumptions. | 2026-06-23   |
| P4-05       | Minimize environment files         | Done        | Public site URL is the only required public app setting.                               | 2026-06-23   |

---

## Phase 5 - Documentation and Launch Readiness

| Task number | Task                                 | Task status | Comments                                                                                    | Updated date |
| ----------- | ------------------------------------ | ----------- | ------------------------------------------------------------------------------------------- | ------------ |
| P5-01       | Update PRD                           | Done        | MVP scope now describes a static public site with direct-contact conversion.                | 2026-06-23   |
| P5-02       | Update technical stack docs          | Done        | Stack now describes static Next.js, TypeScript, Tailwind, Lucide, Motion, and JSON content. | 2026-06-23   |
| P5-03       | Update design, README, and copy docs | Done        | Docs now guide phone, email, location, gallery, and service browsing CTAs.                  | 2026-06-23   |
| P5-04       | Record architecture decision         | Done        | Decision log captures removal of backend/admin/request intake and adoption of JSON content. | 2026-06-23   |
| P5-05       | Add task output summary              | Done        | Added dated task summary with edited files, verification, and skipped-test notes.           | 2026-06-23   |

---

## Phase 6 - QA and Static Launch Checks

| Task number | Task                                | Task status | Comments                                                                                                                   | Updated date |
| ----------- | ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- | ------------ |
| P6-01       | Run dependency install check        | Done        | `corepack pnpm install --frozen-lockfile` passed after package removal.                                                    | 2026-06-23   |
| P6-02       | Run typecheck                       | Done        | `corepack pnpm --recursive --if-present typecheck` passed.                                                                 | 2026-06-23   |
| P6-03       | Run tests                           | Done        | `corepack pnpm --recursive --if-present test` passed.                                                                      | 2026-06-23   |
| P6-04       | Run web lint                        | Done        | `corepack pnpm --filter @mrsign/web lint` passed.                                                                          | 2026-06-23   |
| P6-05       | Run static build                    | Done        | `corepack pnpm --filter @mrsign/web build` generated 56 static pages.                                                      | 2026-06-23   |
| P6-06       | Smoke-check public routes           | Done        | Desktop and mobile checks passed for home, categories, service detail, gallery, location, contact, and compatibility URLs. | 2026-06-23   |
| P6-07       | Search for removed active-app terms | Done        | Active app/content/config sweep found no backend package, auth, email, Prisma, request-code, admin, or Request Quote text. | 2026-06-23   |

---

## Bugs

| Task number | Task | Task status | Comments | Updated date |
| ----------- | ---- | ----------- | -------- | ------------ |

---

## Ad Hoc Tasks

| Task number | Task                                                               | Task status | Comments                                                                                                                                                                                                                                    | Updated date |
| ----------- | ------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| AHT-001     | Update root `AGENTS.md` to match the Mr. Sign and Print repository | Done        | Replaced copied Wonder Jira references with Mr. Sign and Print docs, paths, stack context, and workflow rules.                                                                                                                              | 2026-05-05   |
| AHT-002     | Review tech stack and build plan for frontend migration coverage   | Done        | Confirmed the proposed stack fits the MVP and added explicit Vite `frontend/` to Next.js `apps/web` migration tasks.                                                                                                                        | 2026-05-06   |
| AHT-003     | Add code organization rule to avoid god files                      | Done        | Added root `AGENTS.md` guidance for splitting large mixed-responsibility files into focused modules, keeping orchestration files thin, and refactoring incrementally.                                                                       | 2026-05-06   |
| AHT-004     | Add intentional testing guidance to root `AGENTS.md`               | Done        | Added testing rules that favor risk-based coverage, the smallest useful test scope, and restraint for low-risk copy, styling, docs, and mechanical changes.                                                                                 | 2026-05-06   |
| AHT-005     | Add frontend shared component reuse guidance to root `AGENTS.md`   | Done        | Added rules to reuse shared UI patterns for repeated tables, cards, dropdowns, search bars, states, and form controls while allowing unique components when the design context warrants it.                                                 | 2026-05-06   |
| AHT-006     | Update Phase 0 build plan with confirmed decisions                 | Done        | Updated branding, contact info, services, pricing, gallery approach, and MVP confirmation status. Created `docs/copy/` folder for page copy and service descriptions.                                                                       | 2026-05-06   |
| AHT-007     | Dockerize local and Railway app/database services                  | Done        | Added root Dockerfile, Docker Compose, Makefile, local env defaults, and updated Railway deployment docs for a Docker PostgreSQL service with persistent volume.                                                                            | 2026-05-07   |
| AHT-008     | Address Dockerization code review findings                         | Done        | Bound local PostgreSQL to loopback, rejected placeholder auth secrets at container startup, exposed deploy-safe migrations, and corrected Docker environment/task summary docs.                                                             | 2026-05-07   |
| AHT-009     | Improve visual appearance of dashboard stat cards                  | Done        | Updated `StatCard` to accept and render Lucide icons in a rounded container with a tinted background matching the accent color.                                                                                                             | 2026-05-10   |
| AHT-010     | Admin table sort, multi-select filters, combined services table    | Done        | Combined three service category tables into one with Type column, added reusable MultiSelectDropdown for filters, sortable column headers on all tables, search on services, fixed request search, moved Add Service CTA to page header.    | 2026-05-10   |
| AHT-011     | Add pagination to admin tables                                     | Done        | Added polished bottom pagination to Requests, Services, and Users tables, including local service pagination and server-side users pagination.                                                                                              | 2026-05-10   |
| AHT-012     | Multi-step service form with draft saving                          | Done        | Replaced single-page service form with 3-step wizard (Basics, Pricing, Visibility), added ServiceStatus enum (DRAFT/ACTIVE/INACTIVE) to schema, draft save on any step, publish on final step, updated all isActive references to status.   | 2026-05-10   |
| AHT-013     | Admin manual request creation                                      | Done        | Added /admin/requests/new page with full request form (type, contact, services, details), createAdminRequest server action with request code generation, Add Request button on requests list page.                                          | 2026-05-10   |
| AHT-014     | Address admin portal code review findings                          | Done        | Fixed service status seed/migration rollout issues, request service validation, request filter validation, service route revalidation, service publish status, modal/select/sort accessibility, and URL search state sync.                  | 2026-05-10   |
| AHT-015     | Redesign request-quote and contact page UI                         | Done        | Flattened cards-inside-cards layout, replaced native selects with custom React dropdowns, added tabbed service selector with search/filter and selected chips, simplified contact page layout.                                              | 2026-05-10   |
| AHT-016     | Interactive request status badge                                   | Done        | Replaced the static request status badge with an interactive custom React dropdown that auto-saves status changes, removing the separate status update sidebar card.                                                                        | 2026-05-10   |
| AHT-017     | Update home page floating card images                              | Done        | Replaced generated placeholder images with proper print and sign images on the home page floating cards.                                                                                                                                    | 2026-05-10   |
| AHT-018     | Fix gallery card typography alignment                              | Done        | Changed gallery page card layout from `group grid` to `group flex flex-col` so that text content stays top-aligned beneath the image instead of stretching out vertical whitespace inside the grid item container.                          | 2026-05-10   |
| AHT-019     | Integrate accordion image gallery style                            | Done        | Integrated the user-provided accordion image gallery component into the gallery page, chunking the 12 services into rows of 4 for a responsive, interactive hover effect that links to the service pages.                                   | 2026-05-10   |
| AHT-020     | Integrate 3D travel card component for popular services            | Done        | Added the user-provided `InteractiveTravelCard` component to the home page's "Popular services" section, dynamically linking to actual featured services with a 3D hover effect.                                                            | 2026-05-10   |
| AHT-021     | Normalize service copy and starting pricing                        | Done        | Added curated service content overrides from crawled pricing docs, normalized public service pricing to starting-from or request-quote behavior, flattened pricing UI, and updated seed reset helpers.                                      | 2026-05-10   |
| AHT-022     | Address service pricing review findings                            | Done        | Restored public rendering for all supported pricing types, aligned Prisma seed config with root `.env` loading, cleaned pricing docs punctuation, corrected the task summary, and added focused content and seed-reset tests.               | 2026-05-10   |
| AHT-023     | Drive home popular services from featured flag                     | Done        | Updated home page popular services to use DB-backed active featured services, with fallback to the static list when no featured services are available, and revalidate the homepage when featured status or service edits change.           | 2026-05-11   |
| AHT-024     | Fix edge dropdown cutoff issues                                    | Done        | Fixed custom dropdown positioning to use document element client width to prevent scrollbar overlap, and aligned chart and filter dropdowns to the end/right edge so they don't overflow small screens.                                     | 2026-05-10   |
| AHT-025     | Fix admin sidebar navigation text contrast                         | Done        | Updated unselected menu items to use full white text for maximum visibility on dark backgrounds in the admin sidebar.                                                                                                                       | 2026-05-11   |
| AHT-026     | Fix admin request filter keyboard regressions                      | Done        | Removed search input remounting during URL filter updates and added Escape key dismissal with focus return for the request filter multi-select dropdowns.                                                                                   | 2026-05-11   |
| AHT-027     | Make public navigation sticky                                      | Done        | Updated the shared site navigation header to use fixed positioning with a measured spacer so it remains pinned across public pages without a hardcoded height dependency.                                                                   | 2026-05-11   |
| AHT-028     | Render live Google Maps embeds on public location panels           | Done        | Replaced the home and Location page placeholder map panels with a reusable Google Maps iframe embed using the shared business address, preserved directions links, and removed the Location page blue map border override.                  | 2026-05-11   |
| AHT-029     | Address map embed and public card review findings                  | Done        | Added a Google Maps fallback state, prevented duplicate 3D card navigation events, switched the card image to Next Image, and replaced the sticky-nav hardcoded spacer with a measured fixed-header spacer.                                 | 2026-05-11   |
| AHT-030     | Improve Location page contact panel styling                        | Done        | Reworked the Location page contact panel into an open shop-desk contact strip with larger type, stronger dividers, and clear phone, email, and hours rows without nested cards.                                                             | 2026-05-11   |
| AHT-031     | Restore original Location page contact panel                       | Done        | Reverted the Location page contact details beneath the map to the original simple bordered contact block with phone, email, and weekday hours.                                                                                              | 2026-05-11   |
| AHT-032     | Fix local dev database host configuration                          | Done        | Changed local `DATABASE_URL` defaults to `localhost` for host-run Next.js and Prisma commands while keeping Docker Compose app containers wired to the internal `db` service hostname.                                                      | 2026-05-21   |
| AHT-033     | Add guarded admin deletion for requests and services               | Done        | Added confirmation-driven hard delete for requests, guarded service deletion that blocks services with request history, delete audit logs, and admin table/detail actions.                                                                  | 2026-05-21   |
| AHT-034     | Address guarded admin deletion review findings                     | Done        | Added structured request delete failure handling, removed misleading refresh after redirect, and covered guarded delete helper behavior with focused unit tests.                                                                            | 2026-05-21   |
| AHT-035     | Dynamic port conflict resolution in dev environment                | Done        | Created scripts/dev.sh to dynamically detect and resolve port conflicts for DB_PORT and APP_PORT on the host, automatically updating the local .env and DATABASE_URL variables, and integrated it into the dev target in the root Makefile. | 2026-06-23   |
| AHT-036     | Fix local admin database bootstrap                                 | Done        | Applied pending Prisma migrations to the Docker Postgres database so admin tables, including `admin_users`, exist for the local Next.js admin route.                                                                                        | 2026-06-23   |
| AHT-037     | Convert app to static JSON content site                            | Done        | Removed online submission, admin, auth, database, Prisma, and Resend flows; moved service content to JSON files; updated public CTAs to direct phone/email contact; simplified static export tooling and docs.                              | 2026-06-23   |
| AHT-038     | Apply client feedback content and navigation refresh               | Done        | Made Signs the primary home-page focus, replaced public Design with Services/sign maintenance, added About Us and FAQs, removed visible public pricing surfaces, updated service catalog content, and refreshed footer/navigation copy.     | 2026-06-24   |
