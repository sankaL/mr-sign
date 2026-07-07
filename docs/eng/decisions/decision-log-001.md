# Decision Log 001

## 2026-05-06: Use Better Auth for admin authentication

Decision: Use Better Auth for the MVP admin authentication stack instead of Auth.js / NextAuth.

Rationale:

- The project is still pre-implementation, so changing the planned auth library has low migration cost.
- The MVP only needs admin authentication, protected admin routes, admin user management, and passwordless email login through Resend.
- Better Auth fits the planned Next.js, PostgreSQL, Prisma, and Resend stack while avoiding a later Auth.js to Better Auth migration.

Impact:

- The public customer experience remains unauthenticated.
- Phase 7 implementation should use Better Auth for admin login and session protection.
- Production environment planning should use Better Auth configuration variables.

## 2026-05-07: Use two Dockerized Railway services for app and database

Decision: Run the MVP as two Dockerized services locally and in Railway: one app service for the Next.js monorepo app and one PostgreSQL database service.

Rationale:

- The local development topology should match Railway as closely as practical.
- A dedicated Docker database service makes persistence, connection variables, and service ownership explicit.
- Docker Compose gives one-command local startup for the app and database without requiring developers to install PostgreSQL directly.

Impact:

- The app service must receive `DATABASE_URL` pointing at the PostgreSQL service.
- The Railway database service must attach a persistent volume mounted at `/var/lib/postgresql/data`.
- Database backups and volume monitoring become part of production operations.
- The project should not rely on a separate managed Railway PostgreSQL service unless this decision is revisited.

## 2026-05-08: Use built-in image generation and concise legacy pricing summaries for Phase 4

Decision: Use the built-in image generation tool for all Phase 4 public website images, store the selected finals in `apps/web/public/images/generated/`, and normalize old-site pricing into concise public summaries.

Rationale:

- The user requested the built-in image path rather than a CLI or API model-specific workflow.
- Phase 4 needs complete public-page image coverage, so the asset set includes one home hero, three category heroes, and one image for each of the 42 services.
- The old website contains a mix of exact prices, starting prices, dense tier tables, and services with no usable price. Concise summaries preserve useful legacy pricing without reproducing large tables in the public UI.
- Category-scoped service keys avoid slug ambiguity, including repeated slugs such as `menu-boxes`.

Impact:

- Generated images are project assets and are referenced through `next/image`.
- Seed data now uses the shared content catalog for categories, services, image metadata, SEO metadata, and public pricing.
- Services with unclear or missing legacy prices remain `REQUEST_QUOTE`.
- LocalBusiness schema omits geo coordinates until they are confirmed.

## 2026-05-09: Use Request Quote as the only public project intake flow

Decision: Remove Online Order as a separate public website flow for MVP. Customers should use Request Quote for project intake, and `/order-online` should redirect to `/request-quote`.

Rationale:

- The Online Order and Request Quote flows collected the same practical information.
- A single intake path reduces navigation friction and avoids implying checkout, payment, or confirmed production online.
- Existing backend order request support can remain for compatibility without being exposed on the public website.

Impact:

- Public navigation, footer links, and content exports should not include Online Order.
- Product and engineering plans should treat quote and contact submissions as the MVP customer request flows.
- No Prisma schema or request-code migration is required for this decision.

## 2026-05-09: Restrict admin magic links to active AdminUser records

Decision: Admin authentication uses Better Auth magic links, but access is controlled by the app-level `AdminUser` allowlist. Only active admins can receive login links, protected admin pages validate active admin status server-side, and deactivated admins have sessions revoked.

Rationale:

- Better Auth owns secure session and magic-link mechanics, while `AdminUser` remains the business-level access list for the custom admin portal.
- A neutral login response avoids revealing whether an email belongs to an admin.
- Page-level validation is required because cookie-only proxy checks are only an optimization and are not sufficient authorization.

Impact:

- Admin user management must create or reactivate both Better Auth `User` and `AdminUser` records.
- Deactivation must keep at least one active admin and prevent self-deactivation.
- Real login email delivery still depends on Resend production configuration.

## 2026-05-18: Use Railway config-as-code and an idempotent pre-deploy bootstrap

Decision: Production deployments should use a repo-level `railway.toml` and a Railway pre-deploy command that runs Prisma migrations, reseeds canonical service data, and ensures the first admin account exists.

Rationale:

- The production deployment path should be reproducible from GitHub without relying on one-off dashboard-only settings.
- Railway health checks need an explicit application endpoint so deployments can fail fast when the app does not start correctly.
- Database migrations, service-catalog reseeding, and first-admin creation are safe to run on every deploy because the existing scripts are idempotent.
- GitHub autodeploys on `main` are safer when deployment behavior lives in version-controlled code alongside the app.

Impact:

- Railway production uses the root `Dockerfile` plus `railway.toml` rather than ad hoc per-service commands.
- The web service must define `FIRST_ADMIN_EMAIL`, `FIRST_ADMIN_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`, and database/email variables in Railway.
- Every successful deploy can recreate missing base catalog data and reactivate the configured first admin without manual shell access.

## 2026-06-23: Replace full-stack intake/admin architecture with static JSON content

Decision: The MVP should be a static public website backed by repository-managed JSON content. Online customer submissions, request codes, admin portal features, authentication, database storage, Prisma, and Resend transactional emails are removed from the implementation.

Rationale:

- The customer does not want website visitors to submit online quote requests.
- Without online intake, the admin portal no longer provides enough value to justify auth, database, email, and request-management infrastructure.
- Service and pricing content changes are expected to be rare enough that JSON files in the repo are simpler and safer than a custom admin UI.
- A static site lowers hosting cost, reduces operational risk, and keeps the public experience fast.

Impact:

- `packages/content/content/` is the canonical source for service, category, site, image, pricing, and SEO content.
- Public CTAs route to phone, email, services, location, and contact pages.
- `/request-quote` and `/order-online` remain only as static compatibility pages without submission forms.
- Railway deploys no longer run migrations or database bootstrap commands.
- Prior full-stack, auth, database, and admin decisions are superseded for the MVP.

## 2026-06-24: Replace public Design category with Services and remove public pricing amounts

Decision: The public site should use Signs, Printing, and Services as its active top-level service categories. Services is focused on sign maintenance, including repairs, LED and lighting replacement, electrical troubleshooting, cleaning, vinyl and graphic replacement, and emergency sign service. Public pages should not show pricing amounts.

Rationale:

- Client feedback clarified that signs are almost all of the business and that Design should not be promoted as a public category.
- Sign maintenance is a clearer public category for the requested service work.
- Customers should contact the shop directly for current pricing because project price depends on size, material, quantity, timing, access, and service needs.

Impact:

- `/services` and `/services/[serviceSlug]` are active public routes.
- `/design` and `/design/[serviceSlug]` remain hidden noindex compatibility routes that point users to Services.
- Signs, Printing, and service detail pages render descriptions and contact paths instead of public pricing summaries.
- JSON content may retain internal pricing fields for future reference, but public UI and service schema do not expose pricing amounts.

## 2026-07-01: Replace the signage-board visual identity with an editorial reference system

Decision: The supplied July 2026 reference image is the primary visual source of truth for the public site. All public routes use a warm-white, paper-white, deep-navy, cool-gray, and muted-amber system with editorial serif headings, restrained radii, fine borders, generous spacing, and image-led composition.

Rationale:

- The client requested close visual fidelity to the supplied minimal professional template.
- A shared editorial system lets the static page families remain consistent across all generated routes.
- The previous neon, red, yellow, pill-heavy, and oversized-uppercase direction conflicts with the approved reference.
- A dedicated generated homepage image suite provides coherent architectural, vehicle, print, and maintenance imagery without third-party branding.

Impact:

- `docs/DESIGN.md` now defines the editorial system and supersedes the prior signage-board styling guidance.
- The shared navigation, page headers, cards, CTA, contact strip, footer, category template, service-detail template, gallery, and utility pages use the new visual language.
- Home content exposes a typed featured-image collection and catalog tests validate all referenced files.
- Copy, routes, static architecture, SEO, and direct-contact guardrails remain unchanged.

## 2026-07-03: Remove project pricing compatibility routes

Decision: Remove the `/request-quote` and `/order-online` compatibility pages. The navigation's Project Pricing button now links directly to `/contact`.

Rationale:

- The dedicated pricing page duplicates the direct-contact guidance already provided by the Contact page.
- A direct Contact link gives visitors one clear destination for pricing questions.

Impact:

- `/request-quote` and `/order-online` are no longer generated public routes.
- Project Pricing remains as navigation CTA copy but opens the Contact page.
- Pricing compatibility content and its standalone copy guide are removed.
