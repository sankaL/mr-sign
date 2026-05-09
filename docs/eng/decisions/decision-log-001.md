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
