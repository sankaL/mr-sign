import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://user:password@localhost:5432/mr_sign";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "DOTENV_CONFIG_QUIET=true DOTENV_CONFIG_PATH=../../.env tsx -r dotenv/config scripts/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
