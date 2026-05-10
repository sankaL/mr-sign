-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE');

-- AlterTable: Add status column with default DRAFT
ALTER TABLE "services" ADD COLUMN "status" "ServiceStatus" NOT NULL DEFAULT 'DRAFT';

-- Migrate existing data: isActive=true -> ACTIVE, isActive=false -> INACTIVE
UPDATE "services" SET "status" = 'ACTIVE' WHERE "isActive" = true;
UPDATE "services" SET "status" = 'INACTIVE' WHERE "isActive" = false;

-- Keep legacy isActive for rolling deploy compatibility. A later contract
-- migration can drop it once no deployed app code reads the old column.

-- CreateIndex
CREATE INDEX "services_status_idx" ON "services"("status");
