import { randomUUID } from "node:crypto";

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

async function getOrCreateDevAdmin(): Promise<ActiveAdminSession | null> {
  const existing = await prisma.adminUser.findFirst({
    where: { isActive: true },
    select: { id: true, email: true, name: true },
    orderBy: { createdAt: "asc" },
  });

  if (existing) {
    return {
      userId: existing.id,
      email: existing.email,
      name: existing.name,
      adminId: existing.id,
    };
  }

  const user = await prisma.user.upsert({
    where: { email: "dev@mrsignandprint.net" },
    update: {},
    create: {
      id: randomUUID(),
      email: "dev@mrsignandprint.net",
      name: "Dev Admin",
      emailVerified: true,
    },
  });

  const admin = await prisma.adminUser.upsert({
    where: { email: "dev@mrsignandprint.net" },
    update: { isActive: true, userId: user.id },
    create: {
      email: "dev@mrsignandprint.net",
      name: "Dev Admin",
      isActive: true,
      userId: user.id,
    },
    select: { id: true, email: true, name: true },
  });

  return {
    userId: admin.id,
    email: admin.email,
    name: admin.name,
    adminId: admin.id,
  };
}

export async function getActiveAdminSession(): Promise<ActiveAdminSession | null> {
  if (process.env.NODE_ENV === "development") {
    return getOrCreateDevAdmin();
  }

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
