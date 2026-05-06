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

- Check for nested `AGENTS.md` files in `frontend/`, `docs/`, `tests/`, `scripts/`, and any other folder you touch.
- Use repo paths exactly as they exist.
- For task summaries, use `docs/eng/task-output/`.
- For setup, dependency install, environment bring-up/down, build, lint, and standard workflows, prefer root `Makefile` targets and repo scripts when they exist. If no root workflow exists, use the nearest package scripts such as `frontend/package.json`.
- Keep changes minimal, safe, and aligned with the PRD, tech stack, and build plan.
- Preserve the existing Tailwind-based frontend direction unless a task explicitly changes the design system or migration plan.

## Required Updates

- Update `docs/eng/mr-sign-build-plan.md` after **every** task. If the task is not already tracked, add it under `## Bugs` or `## Ad Hoc Tasks` using the same table shape as the rest of the build plan.
- If the PRD or tech stack changes, update the affected docs in the same task.
- **Small** tasks do not need a task summary file unless the user asks for one.
- **Big** tasks must add a dated summary file in `docs/eng/task-output/` named `YYYY-MM-DD-short-title.md` with the date, a concise summary, and the edited files.
- For major decisions, update the latest `docs/eng/decisions/decision-log-###.md`. If none exists, create `decision-log-001.md`. Keep each decision log file under 1000 lines; when the active file would exceed that limit, create the next numbered file and continue there.

## Response Rule

- End every response with `Confidence: NN%`, where `NN` is your best estimate of the accuracy and completeness of the work you just did.