# Mr. Sign and Print

Static public website for Mr. Sign and Print, a Vaughan sign, print, and design shop serving Vaughan, Concord, and the GTA.

The site focuses on service browsing, pricing guidance, direct phone/email contact, gallery browsing, and location discovery. It does not include online submissions, customer accounts, an admin portal, a database, or transactional email.

## Stack

- Next.js static export
- TypeScript
- React
- Tailwind CSS
- Lucide React
- Motion
- JSON-backed content package

## Workspace

| Path | Purpose |
|---|---|
| `apps/web/` | Static Next.js public website |
| `packages/content/` | JSON content and typed catalog helpers |
| `packages/content/content/site.json` | Business contact details, navigation, page copy |
| `packages/content/content/categories.json` | Top-level service category copy |
| `packages/content/content/services/` | One JSON file per service |
| `docs/` | Product, engineering, copy, decisions, and task records |

## Local Development

Install dependencies:

```bash
corepack pnpm install
```

Run the Next.js dev server:

```bash
corepack pnpm dev
```

Run with Docker Compose:

```bash
make dev
```

The default app URL is [http://localhost:3000](http://localhost:3000).

## Build

Create the static export:

```bash
corepack pnpm build
```

The exported site is written to:

```text
apps/web/out
```

Preview the static export:

```bash
corepack pnpm start
```

## Checks

```bash
corepack pnpm --recursive --if-present typecheck
corepack pnpm --recursive --if-present test
corepack pnpm --filter @mrsign/web lint
```

## Updating Content

Edit JSON files under `packages/content/content/`.

Service files live here:

```text
packages/content/content/services/signs/
packages/content/content/services/printing/
packages/content/content/services/design/
```

Each service file includes:

- Slug and category
- Name and display order
- Headline and descriptions
- Capabilities
- Pricing guidance
- Image reference
- SEO metadata
- Related services

After editing content, run:

```bash
corepack pnpm --filter @mrsign/content test
corepack pnpm --filter @mrsign/content typecheck
corepack pnpm build
```

## Environment

Only one environment variable is normally needed:

```bash
NEXT_PUBLIC_SITE_URL=https://mrsignandprint.net
```

For local Docker Compose, `APP_PORT` can also be set.
