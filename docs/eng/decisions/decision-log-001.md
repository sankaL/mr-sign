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
