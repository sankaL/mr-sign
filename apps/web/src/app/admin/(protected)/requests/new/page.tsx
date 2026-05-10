import { requireActiveAdminSession } from "@/lib/admin-session";
import { getServiceSelectGroups } from "@/lib/customer-request-options";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminRequestForm } from "@/components/admin/admin-request-form";

export const metadata = { title: "Add Request" };

export default async function AddRequestPage() {
  const admin = await requireActiveAdminSession();
  const serviceGroups = getServiceSelectGroups();

  return (
    <AdminShell
      title="Add Request"
      description="Create a manual quote, order, or contact request on behalf of a customer."
      adminName={admin.name ?? undefined}
    >
      <AdminRequestForm serviceGroups={serviceGroups} />
    </AdminShell>
  );
}
