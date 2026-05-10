import { prisma } from "@mrsign/db/src/client";

import { deactivateAdminUser } from "@/app/actions/admin-users";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminUserForm } from "@/components/admin/admin-user-form";
import { requireActiveAdminSession } from "@/lib/admin-session";

export const metadata = {
  title: "Admin Users",
};

type AdminUsersPageProps = {
  searchParams?: Promise<{
    status?: string;
    message?: string;
  }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeZone: "America/Toronto",
  }).format(date);
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const currentAdmin = await requireActiveAdminSession();
  const params = await searchParams;
  const statusMessage = params?.message;
  const statusKind = params?.status === "success" ? "success" : "error";
  const admins = await prisma.adminUser.findMany({
    orderBy: [{ isActive: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
      isActive: true,
      createdAt: true,
    },
  });
  const activeAdminCount = admins.filter((admin) => admin.isActive).length;

  return (
    <AdminShell
      title="Admin Users"
      description="Manage who can request passwordless login links for the admin portal."
    >
      <div className="grid gap-6">
        {statusMessage ? (
          <p
            className={`rounded-xl px-4 py-3 text-sm font-black leading-5 ${
              statusKind === "success"
                ? "bg-[#CCFF00]/35 text-[#151515]"
                : "bg-[#E51B23]/10 text-[#E51B23]"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
        <AdminUserForm />
        <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              {activeAdminCount} active admin{activeAdminCount === 1 ? "" : "s"}
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Current access list
            </h2>
          </div>
          <div className="grid divide-y divide-[#151515]/10">
            {admins.map((admin) => {
              const isCurrent = admin.id === currentAdmin.adminId;
              const canDeactivate =
                admin.isActive && !isCurrent && activeAdminCount > 1;
              const deactivateDisabledReason = !admin.isActive
                ? "This admin is already inactive."
                : isCurrent
                  ? "You cannot deactivate your own admin account."
                  : activeAdminCount <= 1
                    ? "At least one active admin must remain."
                    : null;
              const deactivateReasonId = `deactivate-reason-${admin.id}`;

              return (
                <div
                  key={admin.id}
                  className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center md:px-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black uppercase leading-tight">
                        {admin.name || "Admin"}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${
                          admin.isActive
                            ? "bg-[#CCFF00] text-[#151515]"
                            : "bg-[#151515]/10 text-[#151515]/60"
                        }`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                      {isCurrent ? (
                        <span className="rounded-full bg-[#1936D4] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                          You
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#151515]/65">
                      {admin.email}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#151515]/45">
                      Added {formatDate(admin.createdAt)}
                    </p>
                  </div>
                  <form action={deactivateAdminUser}>
                    <input type="hidden" name="adminId" value={admin.id} />
                    <button
                      type="submit"
                      disabled={!canDeactivate}
                      aria-describedby={
                        deactivateDisabledReason
                          ? deactivateReasonId
                          : undefined
                      }
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#151515]/15 px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors hover:bg-[#E51B23] hover:!text-white focus-visible:bg-[#E51B23] focus-visible:!text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:border-[#151515]/10 disabled:text-[#151515]/30 disabled:hover:bg-transparent disabled:hover:!text-[#151515]/30"
                    >
                      Deactivate
                    </button>
                    {deactivateDisabledReason ? (
                      <p
                        id={deactivateReasonId}
                        className="mt-2 max-w-48 text-xs font-semibold leading-5 text-[#151515]/55"
                      >
                        {deactivateDisabledReason}
                      </p>
                    ) : null}
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
