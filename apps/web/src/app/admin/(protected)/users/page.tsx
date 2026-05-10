import { prisma } from "@mrsign/db/src/client";

import { deactivateAdminUser } from "@/app/actions/admin-users";
import { AddAdminButton } from "@/components/admin/add-admin-button";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminShell } from "@/components/admin/admin-shell";
import { SortableLink } from "@/components/admin/sortable-link";
import { requireActiveAdminSession } from "@/lib/admin-session";

export const metadata = {
  title: "Admin Users",
};

type AdminUsersPageProps = {
  searchParams?: Promise<{
    status?: string;
    message?: string;
    sort?: string;
    order?: string;
    page?: string;
  }>;
};

const validSortFields = ["name", "email", "isActive", "createdAt"];
const PER_PAGE = 20;

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

  /* Parse sort */
  const sortField = validSortFields.includes(params?.sort ?? "")
    ? params!.sort!
    : "createdAt";
  const sortOrder =
    params?.order === "asc" || params?.order === "desc"
      ? params.order
      : "asc";
  const page = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);

  const orderBy: Record<string, string>[] =
    sortField === "isActive"
      ? [{ isActive: sortOrder }, { createdAt: "asc" }]
      : [{ [sortField]: sortOrder }];

  const [admins, totalAdminCount, activeAdminCount] = await Promise.all([
    prisma.adminUser.findMany({
      orderBy,
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.adminUser.count(),
    prisma.adminUser.count({ where: { isActive: true } }),
  ]);

  const addAdminButton = <AddAdminButton />;

  return (
    <AdminShell
      title="Admin Users"
      description="Manage who can request passwordless login links for the admin portal."
      adminName={currentAdmin.name ?? undefined}
      actions={addAdminButton}
    >
      <div className="grid gap-5">
        {statusMessage ? (
          <p
            className={`rounded-lg px-4 py-3 text-sm font-semibold ${
              statusKind === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-700"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}

        <div className="admin-card">
          <div className="admin-card-header">
            <p className="admin-card-title">Current access list</p>
            <p className="admin-card-subtitle">
              {activeAdminCount} active admin
              {activeAdminCount === 1 ? "" : "s"} of {totalAdminCount} total
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <SortableLink
                    label="Admin"
                    field="name"
                    currentSort={sortField}
                    currentOrder={sortOrder}
                    basePath="/admin/users"
                  />
                  <SortableLink
                    label="Email"
                    field="email"
                    currentSort={sortField}
                    currentOrder={sortOrder}
                    basePath="/admin/users"
                  />
                  <SortableLink
                    label="Status"
                    field="isActive"
                    currentSort={sortField}
                    currentOrder={sortOrder}
                    basePath="/admin/users"
                  />
                  <SortableLink
                    label="Added"
                    field="createdAt"
                    currentSort={sortField}
                    currentOrder={sortOrder}
                    basePath="/admin/users"
                  />
                  <th />
                </tr>
              </thead>
              <tbody>
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
                    <tr key={admin.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                              admin.isActive ? "bg-[#151515]" : "bg-[#d1d5db]"
                            }`}
                          >
                            {(admin.name || "A").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold">
                              {admin.name || "Admin"}
                            </p>
                            {isCurrent ? (
                              <span className="badge badge-new mt-0.5">
                                You
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="text-sm text-[#151515]/60">
                        {admin.email}
                      </td>
                      <td>
                        <span
                          className={`badge ${admin.isActive ? "badge-approved" : "badge-cancelled"}`}
                        >
                          {admin.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-xs text-[#151515]/45">
                        {formatDate(admin.createdAt)}
                      </td>
                      <td>
                        <form action={deactivateAdminUser}>
                          <input
                            type="hidden"
                            name="adminId"
                            value={admin.id}
                          />
                          <button
                            type="submit"
                            disabled={!canDeactivate}
                            aria-describedby={
                              deactivateDisabledReason
                                ? deactivateReasonId
                                : undefined
                            }
                            className="inline-flex h-8 items-center rounded-lg border border-[#151515]/10 px-3 text-xs font-semibold transition-colors hover:bg-red-600 hover:text-white hover:border-red-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-[#151515]/10"
                          >
                            Deactivate
                          </button>
                          {deactivateDisabledReason ? (
                            <p
                              id={deactivateReasonId}
                              className="sr-only"
                            >
                              {deactivateDisabledReason}
                            </p>
                          ) : null}
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {totalAdminCount > PER_PAGE ? (
            <div className="border-t border-[#151515]/6 px-5 py-4">
              <AdminPagination
                totalItems={totalAdminCount}
                perPage={PER_PAGE}
                currentPage={page}
                basePath="/admin/users"
              />
            </div>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
