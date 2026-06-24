FROM node:24-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/content/package.json packages/content/package.json

RUN corepack pnpm install --frozen-lockfile

FROM deps AS builder

COPY . .

RUN corepack pnpm --filter @mrsign/web build

FROM deps AS dev

ENV NODE_ENV=development
ENV PORT=3000
ENV WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["sh", "-c", "CI=true corepack pnpm install --frozen-lockfile && corepack pnpm --filter @mrsign/web dev --hostname 0.0.0.0"]

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/web/out ./apps/web/out

EXPOSE 3000

CMD ["corepack", "pnpm", "--filter", "@mrsign/web", "start"]
