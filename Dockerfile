FROM node:24-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN corepack enable
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/content/package.json packages/content/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/email/package.json packages/email/package.json

RUN corepack pnpm install --frozen-lockfile

FROM deps AS builder

COPY . .

RUN corepack pnpm db:generate
RUN corepack pnpm --filter @mrsign/web build

FROM deps AS dev

ENV NODE_ENV=development
ENV PORT=3000
ENV WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["sh", "-c", "if [ -z \"$BETTER_AUTH_SECRET\" ] || [ \"$BETTER_AUTH_SECRET\" = \"replace-with-a-secure-secret\" ]; then echo 'BETTER_AUTH_SECRET must be set to a non-placeholder value.' >&2; exit 1; fi; corepack pnpm install --frozen-lockfile && corepack pnpm db:generate && corepack pnpm --filter @mrsign/web dev --hostname 0.0.0.0"]

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web ./apps/web
COPY --from=builder /app/packages ./packages

EXPOSE 3000

CMD ["sh", "-c", "if [ -z \"$BETTER_AUTH_SECRET\" ] || [ \"$BETTER_AUTH_SECRET\" = \"replace-with-a-secure-secret\" ]; then echo 'BETTER_AUTH_SECRET must be set to a non-placeholder value.' >&2; exit 1; fi; corepack pnpm --filter @mrsign/web start"]
