import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@mrsign/db/src/client";

import { auth } from "@/lib/auth";

export type ActiveAdminSession = {
  userId: string;
  email: string;
  name: string | null;
  adminId: string;
};

export async function getActiveAdminSession(): Promise<ActiveAdminSession | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const admin = await prisma.adminUser.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      isActive: true,
    },
  });

  if (!admin?.isActive) {
    return null;
  }

  return {
    userId: session.user.id,
    email: admin.email,
    name: admin.name,
    adminId: admin.id,
  };
}

export async function requireActiveAdminSession() {
  const session = await getActiveAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
