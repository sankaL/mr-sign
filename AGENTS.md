# Mr. Sign and Print Agent Rules

These rules apply repo-wide. If a deeper `AGENTS.md` exists in a touched subtree, follow the closest file as an add-on; if rules conflict, the deeper file wins.

## Reference Docs

Use the docs below as working references when the task needs product, stack, or delivery-plan context.

- `docs/mrsigns-prd.md`
- `docs/eng/mr-sign-tech-stack.md`
- `docs/eng/mr-sign-build-plan.md`
- `frontend/DESIGN.md` when changing frontend UI, styling, or interaction patterns

## Project Context

- Product: Mr. Sign and Print website redesign MVP.
- Current implementation: React/Vite frontend in `frontend/`.
- Planned direction: Next.js, TypeScript, Tailwind CSS, Lucide React, Motion / Framer Motion, Railway, Railway PostgreSQL, Prisma, Auth.js / NextAuth, Resend, and PostHog.
- MVP guardrails: no online payments, no customer accounts, no customer login, no customer file uploads, no admin image uploads, no inventory management, no CRM integration, and no full e-commerce checkout.

## Before Starting

- Resolve ambiguity with questions until you are at least 95% confident in the scope, inputs, and acceptance criteria. If the request is already clear enough to reach that threshold, proceed.
- Classify the task before editing:
  - **Small**: localized change with no major decision and no cross-area impact.
  - **Big**: multi-file or cross-area work, any architecture/process decision, or anything that changes the PRD, tech stack, or build plan in a meaningful way.

## Execution Rules

- Check for nested `AGENTS.md` files inany other folder you touch.
- Use repo paths exactly as they exist.
- For task summaries, use `docs/eng/task-output/`.
- For setup, dependency install, environment bring-up/down, build, lint, and standard workflows, prefer root `Makefile` targets and repo scripts when they exist. If no root workflow exists, use the nearest package scripts such as `frontend/package.json`.
- Keep changes minimal, safe, and aligned with the PRD, tech stack, and build plan.
- Preserve the existing Tailwind-based frontend direction unless a task explicitly changes the design system or migration plan.

## Frontend Component Reuse Rules

- When changing frontend UI, styling, or interactions, check existing shared components and `frontend/DESIGN.md` before creating a new pattern.
- Reuse or extend shared components for repeated UI surfaces such as tables, cards, dropdowns, search bars, filters, buttons, form fields, modals, navigation, loading states, empty states, and error states.
- Keep styling, spacing, interaction states, accessibility behavior, and responsive behavior consistent across repeated UI patterns. Centralize meaningful variants in shared components when the pattern is used in more than one place or is likely to recur.
- Do not force reuse when a component has a meaningfully different content structure, visual hierarchy, interaction model, or user context. Unique components are acceptable when they make the interface clearer.
- Avoid over-general components with excessive props just to share code. Prefer small composable primitives, focused shared components, and a limited set of named variants.

## Code Organization Rules

- Avoid "god files": do not let one file become responsible for unrelated concerns such as data access, validation, UI rendering, business rules, routing, and side effects at the same time.
- Prefer small, purpose-specific modules with clear ownership. Split code by responsibility into components, hooks, utilities, server actions, data access helpers, validation schemas, and configuration files as appropriate for the framework in use.
- Before adding substantial logic to an already large or mixed-responsibility file, check whether the new code belongs in a focused helper/module instead. As a practical signal, if a file is trending past roughly 300-500 lines or requires multiple unrelated section comments to navigate, consider extracting cohesive pieces before adding more.
- Keep orchestration files thin. Page, route, and entry files should compose focused modules and handle framework wiring, not contain most of the feature implementation.
- When refactoring away from a god file, preserve behavior first, extract one coherent responsibility at a time, and add or update focused tests around the moved behavior when risk warrants it.

## Testing Rules

- Do not add a test for every small change by default. Add or update tests intentionally when they reduce real risk, protect business-critical behavior, cover a non-obvious regression, or document behavior that would be costly to verify manually.
- Prefer the smallest useful test scope: unit tests for pure logic, validation, formatting, request-code generation, and other deterministic helpers; integration tests for database, email, auth, form submission, and cross-module behavior; end-to-end tests only for critical user/admin journeys and launch-blocking smoke coverage.
- Prefer updating an existing relevant test over adding a new parallel test file. Avoid duplicating coverage across unit, integration, and end-to-end layers unless the behavior is especially critical.
- For low-risk UI copy, styling-only, documentation, configuration, or mechanical refactor changes, do not add tests unless the change touches a fragile area or a prior regression.
- When skipping tests for a code change, be ready to state the reason briefly in the task summary or final response.

## Required Updates

- Update `docs/eng/mr-sign-build-plan.md` after **every** task. If the task is not already tracked, add it under `## Bugs` or `## Ad Hoc Tasks` using the same table shape as the rest of the build plan.
- If the PRD or tech stack changes, update the affected docs in the same task.
- **Small** tasks do not need a task summary file unless the user asks for one.
- **Big** tasks must add a dated summary file in `docs/eng/task-output/` named `YYYY-MM-DD-short-title.md` with the date, a concise summary, and the edited files.
- For major decisions, update the latest `docs/eng/decisions/decision-log-###.md`. If none exists, create `decision-log-001.md`. Keep each decision log file under 1000 lines; when the active file would exceed that limit, create the next numbered file and continue there.

## Response Rule

- End every response with `Confidence: NN%`, where `NN` is your best estimate of the accuracy and completeness of the work you just did.