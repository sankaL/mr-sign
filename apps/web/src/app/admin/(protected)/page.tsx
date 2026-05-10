import { AdminShell } from "@/components/admin/admin-shell";
import { LoadingSkeleton, StatePanel } from "@/components/ui/states";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <AdminShell
      title="Dashboard"
      description="Admin authentication is active. Request, service, pricing, and dashboard workflows continue in Phase 8."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <StatePanel kind="empty" />
        <LoadingSkeleton />
      </div>
    </AdminShell>
  );
}
