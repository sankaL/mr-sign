import { AdminShell } from "@/components/admin/admin-shell";
import { LoadingSkeleton, StatePanel } from "@/components/ui/states";

export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <AdminShell
      title="Dashboard"
      description="Static admin layout foundation for future request, service, pricing, and auth workflows."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <StatePanel kind="empty" />
        <LoadingSkeleton />
      </div>
    </AdminShell>
  );
}
