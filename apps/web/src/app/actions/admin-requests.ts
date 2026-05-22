"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@mrsign/db/src/client";

import { requireActiveAdminSession } from "@/lib/admin-session";
import {
  validateNoteBody,
  validateRequestStatus,
} from "@/lib/admin-request-validation";
import {
  parseAdminRequestForm,
  type AdminRequestFormState,
} from "./admin-request-validation";

export type RequestStatusFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function updateRequestStatus(
  requestCode: string,
  _previousState: RequestStatusFormState,
  formData: FormData,
): Promise<RequestStatusFormState> {
  const admin = await requireActiveAdminSession();
  const status = validateRequestStatus(
    String(formData.get("status") ?? ""),
  ) as import("@mrsign/db/src/generated/prisma/client").RequestStatus;

  if (!status) {
    return { status: "error", message: "Choose a valid status." };
  }

  const request = await prisma.customerRequest.findUnique({
    where: { requestCode },
    select: { id: true, status: true },
  });

  if (!request) {
    return { status: "error", message: "Request not found." };
  }

  if (request.status === status) {
    return { status: "idle" };
  }

  await prisma.$transaction([
    prisma.customerRequest.update({
      where: { id: request.id },
      data: { status },
    }),
    prisma.auditLog.create({
      data: {
        adminId: admin.adminId,
        requestId: request.id,
        action: "STATUS_CHANGE",
        entity: "CustomerRequest",
        entityId: request.id,
        metadata: { previousStatus: request.status, newStatus: status },
      },
    }),
  ]);

  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${requestCode}`);

  return { status: "success", message: "Status updated." };
}

export type RequestNoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type DeleteRequestResult = {
  status: "success" | "error";
  message?: string;
};

export async function deleteRequest(
  requestCode: string,
): Promise<DeleteRequestResult> {
  const admin = await requireActiveAdminSession();

  const request = await prisma.customerRequest.findUnique({
    where: { requestCode },
    select: {
      id: true,
      requestCode: true,
      type: true,
      status: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  if (!request) {
    return { status: "error", message: "Request not found." };
  }

  await prisma.$transaction([
    prisma.auditLog.create({
      data: {
        adminId: admin.adminId,
        requestId: request.id,
        action: "DELETE",
        entity: "CustomerRequest",
        entityId: request.id,
        metadata: {
          requestCode: request.requestCode,
          type: request.type,
          status: request.status,
          customerName: `${request.firstName} ${request.lastName}`,
          email: request.email,
        },
      },
    }),
    prisma.customerRequest.delete({
      where: { id: request.id },
    }),
  ]);

  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${requestCode}`);

  return { status: "success", message: "Request deleted." };
}

export async function addRequestNote(
  requestCode: string,
  _previousState: RequestNoteFormState,
  formData: FormData,
): Promise<RequestNoteFormState> {
  const admin = await requireActiveAdminSession();
  const body = validateNoteBody(String(formData.get("body") ?? ""));

  if (!body.ok) {
    return { status: "error", message: body.error };
  }

  const request = await prisma.customerRequest.findUnique({
    where: { requestCode },
    select: { id: true },
  });

  if (!request) {
    return { status: "error", message: "Request not found." };
  }

  await prisma.requestNote.create({
    data: {
      requestId: request.id,
      authorId: admin.adminId,
      body: body.body,
    },
  });

  revalidatePath("/admin/requests");
  revalidatePath(`/admin/requests/${requestCode}`);

  return { status: "success", message: "Note added." };
}

export async function createAdminRequest(
  _previousState: AdminRequestFormState,
  formData: FormData,
): Promise<AdminRequestFormState> {
  await requireActiveAdminSession();

  const parsed = parseAdminRequestForm(formData);

  if (!parsed.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const {
    requestType,
    firstName,
    lastName,
    email,
    phone,
    companyName,
    preferredContactMethod,
    selectedServices,
    quantity,
    desiredCompletionDate,
    projectDetails,
    artworkStatus,
    sizeDetails,
    materialDetails,
    colorPreferences,
  } = parsed.data;

  try {
    const [{ prisma }, { formatRequestCode }] = await Promise.all([
      import("@mrsign/db/src/client"),
      import("@mrsign/db/src/request-codes"),
    ]);

    const year = new Date().getFullYear();

    const request = await prisma.$transaction(async (tx) => {
      const counter = await tx.requestCodeCounter.upsert({
        where: {
          requestType_year: {
            requestType,
            year,
          },
        },
        create: {
          requestType,
          year,
          lastNumber: 1,
        },
        update: {
          lastNumber: { increment: 1 },
        },
      });

      const selectedServiceKeys = new Set(
        selectedServices.map(
          (service) => `${service.categorySlug}:${service.serviceSlug}`,
        ),
      );

      const serviceRows =
        selectedServices.length > 0
          ? await tx.service.findMany({
              where: {
                status: "ACTIVE",
                OR: selectedServices.map((service) => ({
                  slug: service.serviceSlug,
                  category: {
                    slug: service.categorySlug,
                    isActive: true,
                  },
                })),
              },
              select: { id: true },
            })
          : [];

      if (serviceRows.length !== selectedServiceKeys.size) {
        throw new Error("ADMIN_SELECTED_SERVICES_UNAVAILABLE");
      }

      return tx.customerRequest.create({
        data: {
          requestCode: formatRequestCode(requestType, year, counter.lastNumber),
          type: requestType,
          firstName,
          lastName,
          email,
          phone,
          companyName,
          preferredContactMethod,
          quantity,
          sizeDetails,
          materialDetails,
          colorPreferences,
          artworkStatus:
            artworkStatus as import("@mrsign/db/src/generated/prisma/client").ArtworkStatus,
          desiredCompletionDate,
          projectDetails,
          services: {
            create: serviceRows.map((service) => ({
              serviceId: service.id,
            })),
          },
        },
        select: {
          requestCode: true,
          submittedAt: true,
        },
      });
    });

    revalidatePath("/admin/requests");

    return {
      status: "success",
      message: "Request created.",
      requestCode: request.requestCode,
    };
  } catch (error) {
    console.error("Admin request creation failed", error);
    if (
      error instanceof Error &&
      error.message === "ADMIN_SELECTED_SERVICES_UNAVAILABLE"
    ) {
      return {
        status: "error",
        message: "One or more selected services are no longer available.",
        fieldErrors: {
          services: "Choose active services and try again.",
        },
      };
    }

    return {
      status: "error",
      message: "The request could not be saved. Please try again.",
    };
  }
}
