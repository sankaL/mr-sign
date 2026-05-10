"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@mrsign/db/src/client";

import { requireActiveAdminSession } from "@/lib/admin-session";
import {
  validateNoteBody,
  validateRequestStatus,
} from "@/lib/admin-request-validation";

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
