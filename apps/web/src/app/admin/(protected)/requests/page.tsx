import { prisma } from "@mrsign/db/src/client";

import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { RequestFilters } from "@/components/admin/request-filters";

type RequestListPageProps = {
  searchParams?: Promise<{
    q?: string;
    type?: string;
    status?: string;
  }>;
};

const requestTypes = ["QUOTE", "ORDER", "CONTACT"] as const;
const requestStatuses = [
  "NEW",
  "UNDER_REVIEW",
  "QUOTE_SENT",
  "AWAITING_CUSTOMER_APPROVAL",
  "APPROVED",
  "IN_PRODUCTION",
  "READY_FOR_PICKUP",
  "COMPLETED",
  "CANCELLED",
] as const;

export const metadata = { title: "Requests" };

export default async function AdminRequestsPage({
  searchParams,
}: RequestListPageProps) {
  const admin = await requireActiveAdminSession();
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";
  const typeFilter = requestTypes.includes(
    params?.type as (typeof requestTypes)[number],
  )
    ? (params?.type as (typeof requestTypes)[number])
    : undefined;
  const statusFilter = requestStatuses.includes(
    params?.status as (typeof requestStatuses)[number],
  )
    ? (params?.status as (typeof requestStatuses)[number])
    : undefined;

  const requests = await prisma.customerRequest.findMany({
    where: {
      ...(query
        ? { requestCode: { contains: query, mode: "insensitive" } }
        : {}),
      ...(typeFilter ? { type: typeFilter } : {}),
      ...(statusFilter ? { status: statusFilter } : {}),
    },
    orderBy: { submittedAt: "desc" },
    take: 100,
    select: {
      id: true,
      requestCode: true,
      type: true,
      status: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      submittedAt: true,
    },
  });

  return (
    <AdminShell
      title="Requests"
      description="Search, filter, and manage customer quote and contact requests."
      adminName={admin.name ?? undefined}
    >
      <div className="grid gap-6">
        <RequestFilters
          initialQ={query}
          initialType={typeFilter}
          initialStatus={statusFilter}
        />

        <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              {requests.length} result{requests.length === 1 ? "" : "s"}
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Customer requests
            </h2>
          </div>
          {requests.length === 0 ? (
            <div className="px-5 py-8 text-center md:px-6">
              <p className="text-sm font-semibold text-[#151515]/55">
                No requests match the current filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#151515]/10 text-[10px] font-black uppercase tracking-[0.22em] text-[#151515]/55">
                    <th className="px-5 py-3 md:px-6">Code</th>
                    <th className="px-5 py-3 md:px-6">Type</th>
                    <th className="px-5 py-3 md:px-6">Customer</th>
                    <th className="px-5 py-3 md:px-6">Status</th>
                    <th className="px-5 py-3 md:px-6">Date</th>
                    <th className="px-5 py-3 md:px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#151515]/10">
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="transition-colors hover:bg-[#F3F4F6]"
                    >
                      <td className="px-5 py-3 text-sm font-black text-[#151515] md:px-6">
                        {request.requestCode}
                      </td>
                      <td className="px-5 py-3 md:px-6">
                        <span className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#151515]">
                          {request.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm font-semibold text-[#151515]/65 md:px-6">
                        {request.firstName} {request.lastName}
                        <br />
                        <span className="text-xs font-bold text-[#151515]/45">
                          {request.email}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs font-black uppercase text-[#151515] md:px-6">
                        {request.status.replace(/_/g, " ").toLowerCase()}
                      </td>
                      <td className="px-5 py-3 text-xs font-bold text-[#151515]/45 md:px-6">
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
                      <td className="px-5 py-3 md:px-6">
                        <a
                          href={`/admin/requests/${request.requestCode}`}
                          className="inline-flex min-h-9 items-center rounded-full border border-[#151515]/15 px-3 py-1 text-xs font-black uppercase tracking-wide transition-colors hover:bg-[#1936D4] hover:!text-white hover:border-[#1936D4] focus-visible:bg-[#1936D4] focus-visible:!text-white focus-visible:border-[#1936D4]"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
