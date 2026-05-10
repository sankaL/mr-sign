"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@mrsign/db/src/client";
import { Prisma } from "@mrsign/db/src/generated/prisma/client";

import { requireActiveAdminSession } from "@/lib/admin-session";
import { canDeactivateAdmin, validateAdminUserInput } from "@/lib/admin-users";

export type AdminUserFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: {
    email?: string;
    name?: string;
  };
};

const deactivateErrorMessages = {
  invalid: "That admin account could not be found.",
  inactive: "That admin account is already inactive.",
  self: "You cannot deactivate your own admin account.",
  last: "At least one active admin must remain.",
  retry: "Admin access changed at the same time. Please try again.",
} as const;

type DeactivateErrorCode = keyof typeof deactivateErrorMessages;

function adminUsersPathWithMessage(
  status: "success" | "error",
  message: string,
) {
  const params = new URLSearchParams({ status, message });

  return `/admin/users?${params.toString()}`;
}

function isSerializableConflict(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2034"
  );
}

function redirectDeactivateError(code: DeactivateErrorCode): never {
  redirect(adminUsersPathWithMessage("error", deactivateErrorMessages[code]));
}

export async function addAdminUser(
  _previousState: AdminUserFormState,
  formData: FormData,
): Promise<AdminUserFormState> {
  await requireActiveAdminSession();

  const parsed = validateAdminUserInput({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!parsed.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const name = parsed.data.name || "Admin";

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.upsert({
      where: { email: parsed.data.email },
      create: {
        id: randomUUID(),
        email: parsed.data.email,
        name,
        emailVerified: true,
      },
      update: {
        name,
        emailVerified: true,
      },
    });

    await tx.adminUser.upsert({
      where: { email: parsed.data.email },
      create: {
        email: parsed.data.email,
        name,
        userId: user.id,
        isActive: true,
      },
      update: {
        name,
        userId: user.id,
        isActive: true,
      },
    });
  });

  revalidatePath("/admin/users");

  return { status: "success", message: "Admin user is active." };
}

export async function deactivateAdminUser(formData: FormData) {
  const currentAdmin = await requireActiveAdminSession();
  const targetAdminId = String(formData.get("adminId") ?? "");

  if (!targetAdminId) {
    redirectDeactivateError("invalid");
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        const targetAdmin = await tx.adminUser.findUnique({
          where: { id: targetAdminId },
          select: { id: true, isActive: true, userId: true },
        });

        if (!targetAdmin) {
          throw new Error("DEACTIVATE_INVALID");
        }

        if (!targetAdmin.isActive) {
          throw new Error("DEACTIVATE_INACTIVE");
        }

        const activeAdminCount = await tx.adminUser.count({
          where: { isActive: true },
        });
        const permission = canDeactivateAdmin({
          targetAdminId,
          currentAdminId: currentAdmin.adminId,
          activeAdminCount,
        });

        if (!permission.ok) {
          throw new Error(
            targetAdminId === currentAdmin.adminId
              ? "DEACTIVATE_SELF"
              : "DEACTIVATE_LAST",
          );
        }

        await tx.adminUser.update({
          where: { id: targetAdmin.id },
          data: { isActive: false },
        });

        if (targetAdmin.userId) {
          await tx.session.deleteMany({
            where: { userId: targetAdmin.userId },
          });
        }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "DEACTIVATE_INVALID") {
        redirectDeactivateError("invalid");
      }

      if (error.message === "DEACTIVATE_INACTIVE") {
        redirectDeactivateError("inactive");
      }

      if (error.message === "DEACTIVATE_SELF") {
        redirectDeactivateError("self");
      }

      if (error.message === "DEACTIVATE_LAST") {
        redirectDeactivateError("last");
      }
    }

    if (isSerializableConflict(error)) {
      redirectDeactivateError("retry");
    }

    console.error("Admin deactivation failed", error);
    redirectDeactivateError("invalid");
  }

  revalidatePath("/admin/users");
  redirect(adminUsersPathWithMessage("success", "Admin user deactivated."));
}
