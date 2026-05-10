"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@mrsign/db/src/client";

import { requireActiveAdminSession } from "@/lib/admin-session";
import { validateServiceInput } from "@/lib/admin-service-validation";

export type ServiceFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function createService(
  _previousState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  await requireActiveAdminSession();
  const parsed = validateServiceInput(formData);

  if (!parsed.ok) {
    return {
      status: "error",
      message: parsed.message,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const existing = await prisma.service.findFirst({
    where: {
      OR: [{ slug: parsed.data.slug }, { name: parsed.data.name }],
      categoryId: parsed.data.categoryId,
    },
    select: { id: true },
  });

  if (existing) {
    return {
      status: "error",
      message:
        "A service with this name or slug already exists in this category.",
    };
  }

  const service = await prisma.service.create({
    data: {
      ...parsed.data,
      pricing: {
        create: {
          type: parsed.pricing.type,
          amountCents: parsed.pricing.amountCents,
          currency: parsed.pricing.currency,
          unitLabel: parsed.pricing.unitLabel,
          tieredDescription: parsed.pricing.tieredDescription,
          publicLabel: parsed.pricing.publicLabel,
        },
      },
    },
    select: {
      id: true,
      slug: true,
      category: { select: { slug: true } },
    },
  });

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${service.id}`);
  revalidatePath(`/${service.category.slug}`);

  return {
    status: "success",
    message: "Service created.",
  };
}

export async function updateService(
  serviceId: string,
  _previousState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  await requireActiveAdminSession();
  const parsed = validateServiceInput(formData);

  if (!parsed.ok) {
    return {
      status: "error",
      message: parsed.message,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const existing = await prisma.service.findFirst({
    where: {
      OR: [{ slug: parsed.data.slug }, { name: parsed.data.name }],
      categoryId: parsed.data.categoryId,
      NOT: { id: serviceId },
    },
    select: { id: true },
  });

  if (existing) {
    return {
      status: "error",
      message:
        "Another service with this name or slug already exists in this category.",
    };
  }

  const previousService = await prisma.service.findUnique({
    where: { id: serviceId },
    select: {
      slug: true,
      category: { select: { slug: true } },
    },
  });

  if (!previousService) {
    return {
      status: "error",
      message: "Service not found.",
    };
  }

  const service = await prisma.service.update({
    where: { id: serviceId },
    data: {
      ...parsed.data,
      pricing: {
        upsert: {
          create: {
            type: parsed.pricing.type,
            amountCents: parsed.pricing.amountCents,
            currency: parsed.pricing.currency,
            unitLabel: parsed.pricing.unitLabel,
            tieredDescription: parsed.pricing.tieredDescription,
            publicLabel: parsed.pricing.publicLabel,
          },
          update: {
            type: parsed.pricing.type,
            amountCents: parsed.pricing.amountCents,
            currency: parsed.pricing.currency,
            unitLabel: parsed.pricing.unitLabel,
            tieredDescription: parsed.pricing.tieredDescription,
            publicLabel: parsed.pricing.publicLabel,
          },
        },
      },
    },
    select: {
      id: true,
      slug: true,
      category: { select: { slug: true } },
    },
  });

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${service.id}`);
  revalidatePath(`/${previousService.category.slug}`);
  revalidatePath(`/${previousService.category.slug}/${previousService.slug}`);
  revalidatePath(`/${service.category.slug}`);
  revalidatePath(`/${service.category.slug}/${service.slug}`);

  return {
    status: "success",
    message: "Service updated.",
  };
}

export async function toggleServiceActive(serviceId: string) {
  const admin = await requireActiveAdminSession();
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: {
      id: true,
      isActive: true,
      slug: true,
      category: { select: { slug: true } },
    },
  });

  if (!service) throw new Error("Service not found.");

  await prisma.service.update({
    where: { id: serviceId },
    data: { isActive: !service.isActive },
  });

  await prisma.auditLog.create({
    data: {
      adminId: admin.adminId,
      action: "STATUS_CHANGE",
      entity: "Service",
      entityId: serviceId,
      metadata: { field: "isActive", value: !service.isActive },
    },
  });

  revalidatePath("/admin/services");
  revalidatePath(`/${service.category.slug}`);

  return { isActive: !service.isActive };
}

export async function toggleServiceFeatured(serviceId: string) {
  await requireActiveAdminSession();
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: {
      id: true,
      isFeatured: true,
      slug: true,
      category: { select: { slug: true } },
    },
  });

  if (!service) throw new Error("Service not found.");

  await prisma.service.update({
    where: { id: serviceId },
    data: { isFeatured: !service.isFeatured },
  });

  revalidatePath("/admin/services");
  revalidatePath(`/${service.category.slug}`);

  return { isFeatured: !service.isFeatured };
}

export async function deleteService(serviceId: string) {
  await requireActiveAdminSession();
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { id: true, category: { select: { slug: true } } },
  });

  if (!service) throw new Error("Service not found.");

  await prisma.service.delete({ where: { id: serviceId } });

  revalidatePath("/admin/services");
  revalidatePath(`/${service.category.slug}`);
}
