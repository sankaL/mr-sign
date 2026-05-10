import type { ReactNode } from "react";

import { requireActiveAdminSession } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

type AdminProtectedLayoutProps = {
  children: ReactNode;
};

export default async function AdminProtectedLayout({
  children,
}: AdminProtectedLayoutProps) {
  await requireActiveAdminSession();

  return children;
}
