# Mr. Sign and Print

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![Better Auth](https://img.shields.io/badge/Better_Auth-Authentication-orange?style=flat-square)](https://better-auth.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)

> **Your Neighbourhood Sign and Print Shop in Vaughan** 🎨
>
> From custom signs and banners to business cards and graphic design, Mr. Sign and Print has been helping local businesses stand out since 2000. Proudly serving Vaughan, Concord, Woodbridge, and the entire Greater Toronto Area.

---

## 🛠️ What We Do

We are a full-service sign, print, and design shop built for local businesses that need to be seen. No call centers, no delays: just fast quotes, quality materials, and work done right the first time.

### 🪧 Signs

From illuminated channel letters and awnings to vehicle lettering and coroplast lawn signs, we build and install custom signage that puts your business in front of the right people.

- ✨ **Channel Letters & Illuminated Boxes**
- 🎨 **Banners, Awnings & Coroplast**
- 🚗 **Vehicle Lettering & Magnetic Signs**
- 🏠 **Real Estate Signs & Lawn Signs**
- 🪟 **Window Lettering & Vinyl Cutting**
- 📋 **Sandwich Boards, Menu Boxes & Neon**
- ➕ And more

### 🖨️ Printing

Business cards, brochures, flyers, invitations, large-format prints, and more. We handle short and long runs for businesses and events of all sizes across the GTA.

- 💼 **Business Cards & Colour Business Cards**
- 📄 **Brochures, Flyers & Postcards**
- 📐 **Large Format Printing**
- 💌 **Invitations & Wedding Suites**
- 📝 **Invoice Books & Rubber Stamps**
- ➕ And more

### 🎨 Design

Need a logo, a website, or custom typesetting? Our in-house design services cover everything from silk screens and engraving to traffic signs and T-shirt graphics.

- 🎯 **Logo Design**
- 🌐 **Website Design**
- 👕 **Silk Screen & T-Shirt Graphics**
- 🏆 **Engraving & Plaques**
- 🚦 **Electronic Signs & Traffic Signs**
- ➕ And more

---

## 📋 How It Works

1. **📝 Submit Your Request:** Fill out our online quote form. Tell us about your project size, quantity, and timeline. No account needed.
2. **📞 We Follow Up:** Our team reviews your request and gets back to you by phone or email, usually within one business day.
3. **✅ We Make It Happen:** Once approved, we get to work and notify you when your order is ready for pickup.

---

## ⭐ Why Choose Mr. Sign and Print

| Benefit | Description |
| :--- | :--- |
| 🏆 **Over 20 Years in Business** | Trusted by Vaughan businesses since 2000 |
| 📍 **Locally Owned and Operated** | Located in Vaughan, easy to reach and fast to respond |
| ✨ **Quality You Can See** | Durable materials built to last indoors and outdoors |
| 💰 **Free Quotes, No Obligation** | Request a quote online for a quick follow up |

---

## 📞 Get in Touch

<div>
  <strong>Mr. Sign and Print</strong><br>
  399 Four Valley Dr., Unit 3<br>
  Vaughan, Ontario L4K 5X5
</div>

<div>
  <strong>📱 Phone:</strong> <a href="tel:4165129353">(416) 512-9353</a> or <a href="tel:9057618970">(905) 761-8970</a><br>
  <strong>📧 Email:</strong> <a href="mailto:order@mrsignandprint.net">order@mrsignandprint.net</a>
</div>

<div>
  <strong>🕒 Hours:</strong><br>
  Monday to Friday (confirm hours with us directly)<br>
  Saturday (By appointment)<br>
  Sunday (Closed)
</div>

<div style="margin-top: 12px;">

[![Request a Quote](https://img.shields.io/badge/Request_a_Quote-Get_Started-blue?style=for-the-badge)](https://mrsignandprint.net/request-quote)
[![Get Directions](https://img.shields.io/badge/Get_Directions-Navigate-red?style=for-the-badge)](https://maps.google.com/?q=399+Four+Valley+Dr+Unit+3+Vaughan+ON+L4K+5X5)

</div>

---

## 💻 Development

This repository contains the source code for the Mr. Sign and Print website.

### 📁 App Structure

| Directory | Purpose |
| :--- | :--- |
| `apps/web/` | Production Next.js app for the public website and admin portal |
| `frontend/` | Legacy Vite prototype and migration source |
| `docs/` | Product requirements, engineering plans, and decision logs |

### 🚀 Local Setup

This repository uses pnpm through Corepack.

For the Dockerized app and database setup:

```sh
cp .env.example .env
# Edit .env and replace BETTER_AUTH_SECRET before starting the app.
make dev
```

This starts the Next.js app at [http://localhost:3000](http://localhost:3000) and PostgreSQL at `localhost:5432`.

For direct pnpm development without Docker:

```sh
corepack prepare pnpm@10.33.4 --activate
corepack pnpm install
corepack pnpm dev
```

The production app runs from `apps/web`. By default, Next.js serves it at [http://localhost:3000](http://localhost:3000).

### ⚙️ Standard Commands

| Command | Description |
| :--- | :--- |
| `make dev` | Start app and database with Docker Compose |
| `make dev-down` | Stop Docker Compose services |
| `make db-migrate` | Run Prisma migrations against the Docker database |
| `make db-migrate-deploy` | Run deploy-safe Prisma migrations against the Docker database |
| `make db-seed` | Seed the Docker database |
| `corepack pnpm lint` | Run ESLint |
| `corepack pnpm typecheck` | Run TypeScript checks |
| `corepack pnpm format:check` | Check code formatting |
| `corepack pnpm build` | Build for production |

Use [`.env.example`](.env.example) for Docker Compose variables and [`apps/web/.env.example`](apps/web/.env.example) for app-only variables.

---

## 🛠️ Technology Stack

The application is built with a modern full-stack architecture tailored for fast rendering, easy maintenance, and scalability:

- **Framework:** [Next.js](https://nextjs.org) (App Router, React, TypeScript)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com), [Motion / Framer Motion](https://motion.dev), [Lucide React](https://lucide.dev)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org), [Prisma ORM](https://www.prisma.io)
- **Auth & Delivery:** [Better Auth](https://better-auth.com), [Resend](https://resend.com) (Magic-link login, transactional emails)
- **Analytics:** [PostHog](https://posthog.com) (Lightweight usage tracking)
- **Deployment:** [Railway](https://railway.app), [Docker](https://www.docker.com)

---

_Serving Vaughan and the Greater Toronto Area since 2000._
