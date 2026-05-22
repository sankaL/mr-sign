import Link from "next/link";
import { Plus } from "lucide-react";

import {
  getRequestsPage,
  type RequestSortField,
} from "@/lib/admin/data";
import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { DeleteRequestButton } from "@/components/admin/delete-request-button";
import { RequestFilters } from "@/components/admin/request-filters";
import { SortableLink } from "@/components/admin/sortable-link";

type RequestListPageProps = {
  searchParams?: Promise<{
    q?: string;
    type?: string;
    status?: string;
    sort?: string;
    order?: string;
    page?: string;
  }>;
};

const validSortFields: RequestSortField[] = [
  "submittedAt",
  "requestCode",
  "type",
  "status",
  "firstName",
];

const PER_PAGE = 20;

function statusBadgeClass(status: string) {
  return `badge badge-${status.toLowerCase().replace(/_/g, "-")}`;
}

function typeBadgeClass(type: string) {
  return `badge badge-${type.toLowerCase()}`;
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").toLowerCase();
}

export const metadata = { title: "Requests" };

export default async function AdminRequestsPage({
  searchParams,
}: RequestListPageProps) {
  const admin = await requireActiveAdminSession();
  const params = await searchParams;

  const query = params?.q?.trim() ?? "";

  /* Parse comma-separated multi-value filters */
  const typeFilter = params?.type
    ? params.type.split(",").filter(Boolean)
    : [];
  const statusFilter = params?.status
    ? params.status.split(",").filter(Boolean)
    : [];

  /* Parse sort */
  const sortField = validSortFields.includes(params?.sort as RequestSortField)
    ? (params?.sort as RequestSortField)
    : "submittedAt";
  const sortOrder =
    params?.order === "asc" || params?.order === "desc"
      ? params.order
      : "desc";

  const page = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);

  const { items: requests, totalCount } = await getRequestsPage(
    page,
    PER_PAGE,
    {
      q: query || undefined,
      type: typeFilter.length > 0 ? typeFilter : undefined,
      status: statusFilter.length > 0 ? statusFilter : undefined,
      sort: sortField,
      order: sortOrder,
    },
  );

  const addRequestButton = (
    <Link
      href="/admin/requests/new"
      className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#151515] px-4 text-sm font-semibold !text-white transition-colors hover:bg-[#3b82f6]"
    >
      <Plus className="h-4 w-4" strokeWidth={2} />
      Add request
    </Link>
  );

  return (
    <AdminShell
      title="Requests"
      description="Search, filter, and manage customer quote and contact requests."
      adminName={admin.name ?? undefined}
      actions={addRequestButton}
    >
      <div className="grid gap-5">
        <RequestFilters
          initialQ={query}
          initialTypes={typeFilter}
          initialStatuses={statusFilter}
        />

        <div className="admin-card">
          <div className="admin-card-header flex items-center justify-between">
            <div>
              <p className="admin-card-title">Customer requests</p>
              <p className="admin-card-subtitle">
                {totalCount} result{totalCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          {requests.length === 0 ? (
            <div className="admin-card-body py-8 text-center">
              <p className="text-sm text-[#151515]/45">
                No requests match the current filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <SortableLink
                      label="Code"
                      field="requestCode"
                      currentSort={sortField}
                      currentOrder={sortOrder}
                      basePath="/admin/requests"
                    />
                    <SortableLink
                      label="Type"
                      field="type"
                      currentSort={sortField}
                      currentOrder={sortOrder}
                      basePath="/admin/requests"
                    />
                    <SortableLink
                      label="Customer"
                      field="firstName"
                      currentSort={sortField}
                      currentOrder={sortOrder}
                      basePath="/admin/requests"
                    />
                    <SortableLink
                      label="Status"
                      field="status"
                      currentSort={sortField}
                      currentOrder={sortOrder}
                      basePath="/admin/requests"
                    />
                    <SortableLink
                      label="Date"
                      field="submittedAt"
                      currentSort={sortField}
                      currentOrder={sortOrder}
                      basePath="/admin/requests"
                    />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td className="font-semibold">{request.requestCode}</td>
                      <td>
                        <span className={typeBadgeClass(request.type)}>
                          {request.type}
                        </span>
                      </td>
                      <td>
                        <div>
                          <p className="font-medium text-[#151515]">
                            {request.firstName} {request.lastName}
                          </p>
                          <p className="mt-0.5 text-xs text-[#151515]/45">
                            {request.email}
                          </p>
                        </div>
                      </td>
                      <td>
                        <span className={statusBadgeClass(request.status)}>
                          {formatStatus(request.status)}
                        </span>
                      </td>
                      <td className="text-xs text-[#151515]/50">
                        {new Date(request.submittedAt).toLocaleDateString(
                          "en-CA",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/requests/${request.requestCode}`}
                            className="inline-flex h-8 items-center rounded-lg border border-[#151515]/10 px-3 text-xs font-semibold transition-colors hover:bg-[#151515] hover:!text-white"
                          >
                            View
                          </Link>
                          <DeleteRequestButton
                            requestCode={request.requestCode}
                            customerName={`${request.firstName} ${request.lastName}`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {totalCount > PER_PAGE ? (
            <div className="border-t border-[#151515]/6 px-5 py-4">
              <AdminPagination
                totalItems={totalCount}
                perPage={PER_PAGE}
                currentPage={page}
                basePath="/admin/requests"
              />
            </div>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
