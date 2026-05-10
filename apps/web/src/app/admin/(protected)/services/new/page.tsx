import { prisma } from "@mrsign/db/src/client";

import { createService } from "@/app/actions/admin-services";
import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { ServiceFormWizard } from "@/components/admin/service-form-wizard";

export const metadata = { title: "Add Service" };

export default async function AddServicePage() {
  const admin = await requireActiveAdminSession();
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { displayOrder: "asc" },
    select: { id: true, name: true },
  });

  return (
    <AdminShell
      title="Add Service"
      description="Create a new service with pricing and SEO details."
      adminName={admin.name ?? undefined}
    >
      <ServiceFormWizard
        action={createService}
        categories={categories}
      />
    </AdminShell>
  );
}
