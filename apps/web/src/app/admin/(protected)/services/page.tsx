import { prisma } from "@mrsign/db/src/client";
import Link from "next/link";
import { Plus } from "lucide-react";

import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { ServicesTable } from "@/components/admin/services-table";

export const metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const admin = await requireActiveAdminSession();
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      services: {
        orderBy: { displayOrder: "asc" },
        include: { pricing: true },
      },
    },
  });

  /* Flatten all services with their category type */
  const allServices = categories.flatMap((category) =>
    category.services.map((service) => ({
      id: service.id,
      name: service.name,
      slug: service.slug,
      typeName: category.name,
      pricingLabel: service.pricing?.type
        .replace(/_/g, " ")
        .toLowerCase() ?? null,
      status: (service.status ?? "DRAFT") as "DRAFT" | "ACTIVE" | "INACTIVE",
      isFeatured: service.isFeatured,
      displayOrder: service.displayOrder,
    })),
  );

  const typeOptions = categories.map((c) => c.name);

  const addServiceButton = (
    <Link
      href="/admin/services/new"
      className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#151515] px-4 text-sm font-semibold !text-white transition-colors hover:bg-[#3b82f6]"
    >
      <Plus className="h-4 w-4" strokeWidth={2} />
      Add service
    </Link>
  );

  return (
    <AdminShell
      title="Services"
      description="Manage services, pricing, and visibility across Signs, Printing, and Design."
      adminName={admin.name ?? undefined}
      actions={addServiceButton}
    >
      <ServicesTable services={allServices} typeOptions={typeOptions} />
    </AdminShell>
  );
}
