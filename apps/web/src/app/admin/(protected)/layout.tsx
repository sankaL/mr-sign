import type { ReactNode } from "react";

import { requireActiveAdminSession } from "@/lib/admin-session";

type AdminProtectedLayoutProps = {
  children: ReactNode;
};

export default async function AdminProtectedLayout({
  children,
}: AdminProtectedLayoutProps) {
  await requireActiveAdminSession();

  return children;
}
