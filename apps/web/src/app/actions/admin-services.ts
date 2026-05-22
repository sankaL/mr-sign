"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@mrsign/db/src/client";
import { Prisma } from "@mrsign/db/src/generated/prisma/client";

import { requireActiveAdminSession } from "@/lib/admin-session";
import {
  validateServiceInput,
  validateServiceDraftInput,
} from "@/lib/admin-service-validation";
import {
  deleteServiceWithAudit,
  type DeleteActionResult,
} from "@/lib/admin-delete";

export type ServiceFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  serviceId?: string;
};

function revalidateServicePaths(categorySlug: string, serviceSlug: string) {
  revalidatePath("/");
  revalidatePath("/admin/services");
  revalidatePath(`/${categorySlug}`);
  revalidatePath(`/${categorySlug}/${serviceSlug}`);
}

export async function createService(
  _previousState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  await requireActiveAdminSession();
  const intent = String(formData.get("intent") ?? "publish");

  const isDraft = intent === "draft";
  const parsed = isDraft
    ? validateServiceDraftInput(formData)
    : validateServiceInput(formData);

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

  revalidateServicePaths(service.category.slug, service.slug);
  revalidatePath(`/admin/services/${service.id}`);

  return {
    status: "success",
    message: isDraft ? "Draft saved." : "Service created.",
    serviceId: service.id,
  };
}

export async function updateService(
  serviceId: string,
  _previousState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  await requireActiveAdminSession();
  const intent = String(formData.get("intent") ?? "publish");

  const isDraft = intent === "draft";
  const parsed = isDraft
    ? validateServiceDraftInput(formData)
    : validateServiceInput(formData);

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

  revalidatePath("/");
  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${service.id}`);
  revalidatePath(`/${previousService.category.slug}`);
  revalidatePath(`/${previousService.category.slug}/${previousService.slug}`);
  revalidatePath(`/${service.category.slug}`);
  revalidatePath(`/${service.category.slug}/${service.slug}`);

  return {
    status: "success",
    message: isDraft ? "Draft saved." : "Service updated.",
    serviceId: service.id,
  };
}

export async function toggleServiceStatus(serviceId: string) {
  const admin = await requireActiveAdminSession();
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: {
      id: true,
      status: true,
      slug: true,
      category: { select: { slug: true } },
    },
  });

  if (!service) throw new Error("Service not found.");

  const nextStatus = service.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

  await prisma.service.update({
    where: { id: serviceId },
    data: { status: nextStatus },
  });

  await prisma.auditLog.create({
    data: {
      adminId: admin.adminId,
      action: "STATUS_CHANGE",
      entity: "Service",
      entityId: serviceId,
      metadata: { field: "status", value: nextStatus },
    },
  });

  revalidateServicePaths(service.category.slug, service.slug);

  return { status: nextStatus };
}

export async function publishService(serviceId: string) {
  const admin = await requireActiveAdminSession();
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: {
      id: true,
      status: true,
      slug: true,
      category: { select: { slug: true } },
    },
  });

  if (!service) throw new Error("Service not found.");
  if (service.status !== "DRAFT") return { status: service.status };

  await prisma.service.update({
    where: { id: serviceId },
    data: { status: "ACTIVE" },
  });

  await prisma.auditLog.create({
    data: {
      adminId: admin.adminId,
      action: "STATUS_CHANGE",
      entity: "Service",
      entityId: serviceId,
      metadata: { field: "status", value: "ACTIVE" },
    },
  });

  revalidateServicePaths(service.category.slug, service.slug);

  return { status: "ACTIVE" };
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

  revalidateServicePaths(service.category.slug, service.slug);

  return { isFeatured: !service.isFeatured };
}

export async function deleteService(
  serviceId: string,
): Promise<DeleteActionResult> {
  const admin = await requireActiveAdminSession();

  return deleteServiceWithAudit({
    serviceId,
    adminId: admin.adminId,
    findService: (id) =>
      prisma.service.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          category: { select: { slug: true, name: true } },
        },
      }),
    deleteService: async (service, adminId) => {
      await prisma.$transaction([
        prisma.auditLog.create({
          data: {
            adminId,
            action: "DELETE",
            entity: "Service",
            entityId: service.id,
            metadata: {
              name: service.name,
              slug: service.slug,
              status: service.status,
              category: service.category.name,
            },
          },
        }),
        prisma.service.delete({ where: { id: service.id } }),
      ]);
    },
    isHistoryConstraintError: (error) =>
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003",
    revalidate: (service) => {
      revalidateServicePaths(service.category.slug, service.slug);
      revalidatePath(`/admin/services/${service.id}`);
    },
  });
}
