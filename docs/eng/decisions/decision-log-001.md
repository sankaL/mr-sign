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
