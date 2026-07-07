# Mr. Sign and Print Static Website Tech Stack

## 1. Purpose

This document summarizes the current technology stack for the Mr. Sign and Print website redesign MVP after the product scope was simplified to a static public website.

The MVP supports service browsing, direct phone/email contact, location discovery, gallery browsing, SEO metadata, and repository-managed JSON content. Public pages do not show pricing amounts. It does not include online submissions, an admin portal, authentication, a database, or transactional email.

## 2. Confirmed Decisions

| Area                | Decision                                    |
| ------------------- | ------------------------------------------- |
| App architecture    | Static public website                       |
| Framework           | Next.js static export                       |
| Language            | TypeScript                                  |
| UI                  | React components                            |
| Styling             | Tailwind CSS                                |
| Icons               | Lucide React                                |
| Animation           | Motion                                      |
| Content source      | JSON files in `packages/content/content/`   |
| Images              | Static assets in `apps/web/public/`         |
| Hosting             | Static Docker/Railway-compatible deployment |
| Database            | Not used                                    |
| Authentication      | Not used                                    |
| Transactional email | Not used                                    |
| Online forms        | Not used                                    |
| Analytics           | Not required for MVP unless added later     |

## 3. Current Monorepo Structure

| Path                                         | Purpose                                                      |
| -------------------------------------------- | ------------------------------------------------------------ |
| `apps/web`                                   | Static Next.js public website                                |
| `packages/content`                           | JSON-backed service, category, site, and SEO content helpers |
| `packages/content/content/site.json`         | Contact details, navigation, primary actions, and page copy  |
| `packages/content/content/categories.json`   | Top-level category content                                   |
| `packages/content/content/services/*/*.json` | One editable JSON file per service                           |
| `docs`                                       | Product, engineering, copy, decisions, and task records      |

## 4. Runtime Model

The site is generated at build time with `next build` and `output: "export"`.

Build-time behavior:

- Import JSON content from `@mrsign/content`.
- Generate static category and service pages.
- Generate SEO metadata and service schema from JSON content.
- Write static output to `apps/web/out`.

Runtime behavior:

- Serve static files.
- No server actions.
- No API routes.
- No database connection.
- No authentication.
- No form persistence.

## 5. Content Update Workflow

To update service content:

1. Edit the relevant JSON file in `packages/content/content/services/`.
2. Run content tests and typecheck.
3. Build the static site.
4. Review the changed page visually.
5. Commit the JSON and generated code changes.

The content package validates:

- Required service fields
- Unique service routes
- Valid category references
- Valid related service references
- Valid image paths
- Valid pricing types
- Removed online-submission language

## 6. Public Routes

| Route                     | Purpose                                                   |
| ------------------------- | --------------------------------------------------------- |
| `/`                       | Home page                                                 |
| `/signs`                  | Signs category page                                       |
| `/signs/[serviceSlug]`    | Signs service detail page                                 |
| `/printing`               | Printing category page                                    |
| `/printing/[serviceSlug]` | Printing service detail page                              |
| `/services`               | Sign maintenance and services category page               |
| `/services/[serviceSlug]` | Services detail page                                      |
| `/about-us`               | Static company and service-area page                      |
| `/faqs`                   | Static frequently asked questions page                    |
| `/gallery`                | Visual service gallery                                    |
| `/location`               | Address, hours, map, and directions                       |
| `/contact`                | Phone, email, address, hours, and direct-contact guidance |
| `/design`                 | Hidden noindex compatibility page that points to Services |
| `/design/[serviceSlug]`   | Hidden noindex compatibility pages that point to Services |

## 7. Removed Stack Elements

The following are intentionally removed from MVP:

- PostgreSQL
- Prisma
- Better Auth
- Resend
- Admin dashboard
- Admin service editor
- Stored customer requests
- Request status management
- Generated request codes
- Online quote/contact forms
- Database seeding and migrations

These can be reconsidered later only if the business explicitly wants online intake or staff-managed content editing.
