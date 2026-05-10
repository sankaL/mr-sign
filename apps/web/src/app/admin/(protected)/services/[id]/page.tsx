import { prisma } from "@mrsign/db/src/client";
import { notFound } from "next/navigation";

import { updateService } from "@/app/actions/admin-services";
import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { ServiceForm } from "@/components/admin/service-form";

type EditServicePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EditServicePageProps) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    select: { name: true },
  });
  return { title: service?.name ? `Edit ${service.name}` : "Edit Service" };
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const admin = await requireActiveAdminSession();
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: { id },
    include: { pricing: true },
  });

  if (!service) {
    notFound();
  }

  const categories = await prisma.serviceCategory.findMany({
    orderBy: { displayOrder: "asc" },
    select: { id: true, name: true },
  });

  const updateAction = updateService.bind(null, id);

  return (
    <AdminShell
      title={`Edit ${service.name}`}
      description="Update service details, pricing, and SEO."
      adminName={admin.name ?? undefined}
    >
      <ServiceForm
        action={updateAction}
        categories={categories}
        service={service}
        submitLabel="Save changes"
        initialState={{ status: "idle" }}
      />
    </AdminShell>
  );
}
