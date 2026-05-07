import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://user:password@localhost:5432/mr_sign";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx scripts/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
