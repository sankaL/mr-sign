# Mr. Sign and Print — Tech Stack and Monorepo Recommendation

## 1. Purpose

This document summarizes the recommended technology stack and high-level monorepo structure for the Mr. Sign and Print website redesign MVP.

The MVP is a modern customer-facing website with a custom admin portal. It supports service browsing, quote requests, contact inquiries, admin service and pricing management, request tracking, email notifications, and basic user analytics.

The MVP does not include online payments, customer accounts, customer login, customer file uploads, admin image uploads, inventory management, CRM integration, or production workflow automation.

---

## 2. Confirmed Decisions

| Area | Decision |
|---|---|
| App architecture | Full-stack app |
| Framework | Next.js |
| Language | TypeScript |
| Existing frontend | React, Vite, Tailwind CSS, Lucide React, Motion / Framer Motion |
| Migration direction | Move from Vite to Next.js where needed |
| Admin portal | Custom admin portal |
| Hosting | Railway |
| Database | Dockerized PostgreSQL on Railway |
| ORM | Prisma |
| Authentication | Better Auth |
| Admin login | Passwordless magic-link login using Resend |
| Email service | Resend |
| Analytics | PostHog |
| Styling | Preserve the existing Tailwind-based frontend direction |
| Images | Codebase-managed static images |
| CMS | No broad CMS in MVP |
| Admin image uploads | Not included in MVP |
| Priority | Lowest monthly cost, fastest build, easiest maintenance |

---

## 2.1 Current Frontend Migration Position

The current `frontend/` app is a Vite, React, TypeScript, Tailwind CSS prototype. It should be treated as the migration source, not the production target.

The production app should live in `apps/web` as the Next.js application. The migration should reuse the existing visual direction, Tailwind styling approach, Lucide React icons, Motion / Framer Motion animations, and reusable React component work where it makes sense, but it should not keep Vite as a second production app.

The build plan must explicitly cover:

- Moving reusable components from `frontend/components` into the Next.js app structure.
- Replacing Vite entry files such as `index.html`, `src/main.tsx`, and `src/demo.tsx` with Next.js `layout.tsx` and page routes.
- Migrating global CSS, Tailwind/PostCSS configuration, path aliases, package dependencies, and static asset references.
- Reviewing client-only animation components for Next.js server/client component boundaries.
- Verifying visual and responsive parity before retiring or archiving the old `frontend/` folder.

After migration, `apps/web` should be the only production frontend unless a temporary exception is documented.

---

## 3. Recommended Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Full-stack framework | Next.js | Public website, admin portal, routing, SEO, form handling, backend logic |
| Language | TypeScript | Type safety across the app |
| UI | Existing React components | Preserve the current frontend work where possible |
| Styling | Tailwind CSS | Fast, responsive styling |
| Icons | Lucide React | Modern icon system already used by the frontend |
| Animation | Motion / Framer Motion | Keep existing animation approach |
| Hosting | Railway | Host the app and database as two services in one platform |
| Database | Dockerized PostgreSQL 17 on Railway | Store services, pricing, requests, admins, notes, and auth data |
| ORM | Prisma | Database schema, migrations, and type-safe database access |
| Auth | Better Auth | Admin authentication and session management |
| Email | Resend | Admin login links, customer confirmations, and admin notifications |
| Analytics | PostHog | Page views, CTA tracking, form funnel tracking, and service interest tracking |
| Images | Static assets in the codebase | Simple MVP image management without upload infrastructure |

---

## 4. Why This Stack Fits

## 4.1 Next.js

Next.js is the best fit because the product needs both public SEO-friendly pages and backend logic in one application.

It supports:

- Public service pages
- Service detail pages
- Quote, order, and contact forms
- SEO metadata
- Protected admin pages
- Backend form handling
- Railway deployment

This avoids maintaining a separate frontend and backend for a lightweight MVP.

---

## 4.2 Dockerized PostgreSQL on Railway

PostgreSQL 17 should run as a Dockerized Railway database service, not as a separate managed Railway PostgreSQL plugin service.

It will store:

- Service categories
- Services
- Pricing configuration
- Quote requests
- Order requests
- Contact messages
- Request statuses
- Internal notes
- Admin users
- Authentication/session data

Keeping the app and database as Railway services keeps infrastructure simple while matching the local Docker Compose topology. The Railway database service must use persistent storage by attaching a Railway volume at `/var/lib/postgresql/data`.

---

## 4.3 Prisma

Prisma should be used as the database access layer.

In simple terms, Prisma is what the app uses to communicate with PostgreSQL. It helps define the database structure, run database migrations, and safely read/write data from the Next.js app.

Prisma is recommended over Drizzle for this project because it is easier to understand, faster to build with, and well suited for a small business admin app.

---

## 4.4 Better Auth

Admin authentication should use Better Auth with passwordless magic-link login through Resend.

The account setup and login model should be:

- Developer manually creates the first admin for launch.
- Admin enters their email on the admin login page.
- Resend sends a secure login link.
- Admin clicks the link and gets access to the admin portal.
- The session remains active for a configured period, such as 14–30 days.
- Existing admins can add future admins from the admin portal.

This avoids password management, password resets, and unnecessary complexity.

---

## 4.5 Resend

Resend should be used for all outgoing emails.

Required emails:

| Event | Email Sent |
|---|---|
| Admin login | Magic-link login email |
| Quote request submitted | Customer confirmation and admin notification |
| Contact form submitted | Customer confirmation and admin notification |

Admin notifications should go to `order@mrsignandprint.net`.

---

## 4.6 PostHog

PostHog should be used for lightweight product analytics.

Recommended tracking areas:

| Area | Examples |
|---|---|
| Page views | Home, category pages, service pages, location page |
| Services | Service views, featured service clicks, category views |
| CTAs | Request quote, browse services, call now, directions |
| Forms | Quote form started/submitted, contact form submitted |
| Admin | Login, service updates, request status updates |

PostHog should not receive sensitive customer information.

Do not track:

- Customer names
- Emails
- Phone numbers
- Company names
- Project descriptions
- Notes or full form details

---

## 5. Data Model Overview

The database should support the following main entities:

| Entity | Purpose |
|---|---|
| Service Category | Top-level public categories: Signs, Printing, Design |
| Service | Individual services under each category |
| Pricing | Pricing type and public pricing display rules |
| Customer Request | Quote and contact submissions |
| Request Service | Services selected in a quote request |
| Request Note | Internal admin notes |
| Admin User | Admin users allowed to access the portal |
| Audit Log | Optional lightweight record of admin actions |

Top-level public categories should remain controlled in MVP. Admins can add new services under Signs, Printing, and Design, but should not add new public top-level categories in MVP.

---

## 6. Pricing Model

Pricing should support the pricing options from the PRD.

| Pricing Type | Public Display |
|---|---|
| Exact Price | Fixed visible price |
| Starting From | Starting price shown publicly |
| Tiered Pricing | Pricing varies by size, quantity, or option |
| Request Quote | No fixed public price shown |

Admins should be able to update pricing and mark services as quote-only.

---

## 7. Request Workflow

Quote requests and contact messages should use a simple admin workflow.

Recommended statuses:

| Status | Purpose |
|---|---|
| New | Request has been submitted |
| Under Review | Admin is reviewing the request |
| Quote Sent | Quote has been sent to the customer |
| Awaiting Customer Approval | Waiting for customer response |
| Approved | Customer approved the work |
| In Production | Work is being completed |
| Ready for Pickup | Order is ready |
| Completed | Request is complete |
| Cancelled | Request was cancelled |

This is enough for MVP. More detailed production workflow tracking should be avoided for launch.

---

## 8. Image and Asset Management

Admin image uploads should not be included in MVP.

Images should be stored in the codebase and referenced by relative path from the database.

Recommended image areas:

| Area | Purpose |
|---|---|
| Brand images | Logo, social share images, favicon |
| Hero images | Homepage and landing visuals |
| Service images | Images for Signs, Printing, and Design services |
| Gallery images | Optional gallery assets |

The admin portal can show the image path assigned to a service, but developers will manage the image files for launch.

---

## 9. Recommended Monorepo Structure

Keep the monorepo lightweight. Do not introduce unnecessary complexity.

Recommended structure:

```txt
mr-sign/
├── apps/
│   └── web/
├── packages/
│   ├── db/
│   ├── email/
│   ├── analytics/
│   ├── types/
│   └── config/
├── docs/
│   └── eng/
│       ├── mr-sign-tech-stack.md
│       ├── mr-sign-build-plan.md
│       ├── deployment.md
│       └── admin-workflows.md
├── scripts/
│   ├── seed-services.ts
│   └── create-first-admin.ts
├── .env.example
├── package.json
├── pnpm-workspace.yaml
├── railway.json
└── README.md
```

The existing `frontend/` folder should be considered a temporary migration input. It should be removed, archived, or clearly marked as non-production after the Next.js app reaches accepted parity.

---

## 10. Package Responsibilities

| Area | Responsibility |
|---|---|
| `apps/web` | Main Next.js app, public website, admin portal, routing, forms, auth wiring, SEO, static assets |
| `packages/db` | Prisma schema, database migrations, database client, seed data |
| `packages/email` | Resend setup and email templates |
| `packages/analytics` | PostHog setup, event names, safe tracking helpers |
| `packages/types` | Shared TypeScript types for services, pricing, requests, and users |
| `packages/config` | Shared TypeScript, ESLint, and formatting configuration |
| `docs` | Project documentation |
| `scripts` | Utility scripts such as seeding services and creating the first admin |

If setup speed becomes more important than package separation, `packages/config` and `packages/types` can be skipped at launch.

---

## 11. Public Website Routes

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/signs` | Signs category page |
| `/signs/[slug]` | Individual sign service page |
| `/printing` | Printing category page |
| `/printing/[slug]` | Individual printing service page |
| `/design` | Design category page |
| `/design/[slug]` | Individual design service page |
| `/request-quote` | Quote request form |
| `/contact` | Contact form |
| `/location` | Business location and hours |
| `/gallery` | Optional gallery page |

---

## 12. Admin Portal Routes

| Route | Purpose |
|---|---|
| `/admin/login` | Admin login page |
| `/admin` | Admin dashboard |
| `/admin/requests` | Request list |
| `/admin/requests/[requestCode]` | Request detail page |
| `/admin/services` | Service management |
| `/admin/services/new` | Add new service |
| `/admin/services/[id]` | Edit service |
| `/admin/pricing` | Pricing management |
| `/admin/users` | Admin user management |
| `/admin/settings` | Basic admin settings |

---

## 13. Environment Configuration

Production environment variables should be managed in Railway.

Required environment groups:

| Group | Purpose |
|---|---|
| App URL | Used by auth, emails, and redirects |
| Database | Docker PostgreSQL service connection |
| Auth | Better Auth secret and URL settings |
| Resend | Email sending API key and sender email |
| Admin email | Admin notification recipient |
| PostHog | Public analytics key and host |
| Feature flags | Optional flags such as enabling or disabling gallery |

---

## 14. Railway Deployment

Recommended Railway setup:

| Railway Service | Purpose |
|---|---|
| App service | Dockerized Next.js application |
| Docker database service | PostgreSQL database with a Railway volume mounted at `/var/lib/postgresql/data` |

Recommended deployment flow:

1. Push code to GitHub.
2. Connect the repo to Railway.
3. Create an app service from the repository Dockerfile.
4. Create a Docker database service from the official PostgreSQL image.
5. Attach a Railway volume to the database service at `/var/lib/postgresql/data`.
6. Configure app and database environment variables.
7. Run Prisma migrations against the Docker database service.
8. Deploy the Next.js app service.
9. Add the custom domain.
10. Verify Resend sender/domain setup.
11. Verify PostHog tracking.

Local development should use the same two-service shape through Docker Compose: one app container and one PostgreSQL container with a named Docker volume.

---

## 15. Initial Build Sequence

| Phase | Focus |
|---|---|
| 1 | Set up monorepo, root scripts, and Next.js app foundation |
| 2 | Refactor/migrate the existing `frontend/` Vite prototype into `apps/web`, including components, CSS, Tailwind config, aliases, assets, and visual parity checks |
| 3 | Add Prisma, database schema, and seed service categories/services |
| 4 | Build public pages and service detail pages |
| 5 | Build quote, order, and contact forms |
| 6 | Add Resend email confirmations and admin notifications |
| 7 | Add Better Auth admin login and protected admin routes |
| 8 | Build admin dashboard, request management, service management, and pricing management |
| 9 | Add admin user management |
| 10 | Add PostHog analytics |
| 11 | Complete mobile QA, form QA, email QA, auth QA, and SEO checks |

---

## 16. MVP Guardrails

Avoid adding the following in MVP:

- Online payments
- Customer accounts
- Customer login
- Customer file uploads
- Admin image upload management
- Full CMS editing
- CRM integration
- Live chat
- Quote PDF generation
- Invoice generation
- Advanced quote calculators
- Internal production workflow management
- SMS notifications

These can be added later if the business needs them.

---

## 17. Final Recommendation

The recommended MVP stack is:

| Area | Recommended Choice |
|---|---|
| Framework | Next.js |
| Language | TypeScript |
| UI | Existing React components |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Animation | Motion / Framer Motion |
| Hosting | Railway |
| Database | Dockerized PostgreSQL on Railway |
| ORM | Prisma |
| Auth | Better Auth |
| Login | Resend magic links |
| Email | Resend |
| Analytics | PostHog |
| Images | Codebase-managed static images |
| Monorepo | pnpm workspaces |

This stack gives the project a strong balance of speed, low monthly cost, maintainability, and future flexibility without overbuilding the MVP.
