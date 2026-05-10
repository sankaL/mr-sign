import type { ReactNode } from "react";

import { AdminSidebarLayout } from "@/components/admin/admin-sidebar";
import { AdminTopBar } from "@/components/admin/admin-topbar";

type AdminShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  adminName?: string | null;
  actions?: ReactNode;
};

export function AdminShell({
  title,
  description,
  children,
  adminName,
  actions,
}: AdminShellProps) {
  return (
    <AdminSidebarLayout adminName={adminName}>
      <AdminTopBar title={title} description={description} actions={actions} />
      <main className="px-5 py-6 lg:px-8 lg:py-8">{children}</main>
    </AdminSidebarLayout>
  );
}
