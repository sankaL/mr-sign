import {
  getDashboardStats,
  getRecentRequests,
  getServicesNeedingAttention,
} from "@/lib/admin/data";
import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = { title: "Dashboard" };

function formatStatus(status: string) {
  return status.replace(/_/g, " ").toLowerCase();
}

export default async function AdminDashboardPage() {
  const admin = await requireActiveAdminSession();
  const stats = await getDashboardStats();
  const recent = await getRecentRequests();
  const attentionServices = await getServicesNeedingAttention();

  const quoteUrl = "/admin/requests?type=QUOTE&status=NEW";
  const contactUrl = "/admin/requests?type=CONTACT&status=NEW";

  return (
    <AdminShell
      title="Dashboard"
      description="Overview of new requests, recent activity, and services needing attention."
      adminName={admin.name ?? undefined}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <a
          href={quoteUrl}
          className="rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 transition-shadow hover:shadow-md md:p-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
            New quote requests
          </p>
          <p className="mt-2 text-4xl font-black text-[#151515]">
            {stats.newQuoteCount}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#151515]/55">
            Awaiting review
          </p>
        </a>

        <a
          href={contactUrl}
          className="rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 transition-shadow hover:shadow-md md:p-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
            New contact messages
          </p>
          <p className="mt-2 text-4xl font-black text-[#151515]">
            {stats.newContactCount}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#151515]/55">
            Awaiting review
          </p>
        </a>

        <div className="rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
            Total requests
          </p>
          <p className="mt-2 text-4xl font-black text-[#151515]">
            {stats.totalRequestCount}
          </p>
          <p className="mt-1 text-sm font-semibold text-[#151515]/55">
            All time
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              Recent submissions
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Last 10 requests
            </h2>
          </div>
          {recent.length === 0 ? (
            <div className="px-5 py-8 text-center md:px-6">
              <p className="text-sm font-semibold text-[#151515]/55">
                No requests yet.
              </p>
            </div>
          ) : (
            <div className="grid divide-y divide-[#151515]/10">
              {recent.map((request) => (
                <a
                  key={request.id}
                  href={`/admin/requests/${request.requestCode}`}
                  className="grid gap-1 px-5 py-3 transition-colors hover:bg-[#F3F4F6] md:px-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#151515]">
                      {request.type}
                    </span>
                    <span className="text-sm font-black text-[#151515]">
                      {request.requestCode}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#151515]/65">
                    {request.firstName} {request.lastName}
                  </p>
                  <p className="text-xs font-bold text-[#151515]/45">
                    {formatStatus(request.status)} ·{" "}
                    {new Date(request.submittedAt).toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              Services
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Request quote or missing pricing
            </h2>
          </div>
          {attentionServices.length === 0 ? (
            <div className="px-5 py-8 text-center md:px-6">
              <p className="text-sm font-semibold text-[#151515]/55">
                All services have pricing configured.
              </p>
            </div>
          ) : (
            <div className="grid divide-y divide-[#151515]/10">
              {attentionServices.map((service) => (
                <a
                  key={service.id}
                  href={`/admin/services/${service.id}`}
                  className="grid gap-1 px-5 py-3 transition-colors hover:bg-[#F3F4F6] md:px-6"
                >
                  <p className="text-sm font-black text-[#151515]">
                    {service.name}
                  </p>
                  <p className="text-xs font-bold text-[#151515]/45">
                    {service.categoryName} ·{" "}
                    {service.pricingType ?? "No pricing"}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {stats.statusCounts.length > 0 ? (
        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              Requests by status
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Status breakdown
            </h2>
          </div>
          <div className="grid gap-4 px-5 py-4 sm:grid-cols-2 md:grid-cols-3 md:px-6 lg:grid-cols-4">
            {stats.statusCounts.map((item) => (
              <a
                key={item.status}
                href={`/admin/requests?status=${item.status}`}
                className="flex items-center justify-between rounded-2xl border border-[#151515]/10 p-4 transition-colors hover:bg-[#F3F4F6]"
              >
                <span className="text-sm font-black uppercase">
                  {formatStatus(item.status)}
                </span>
                <span className="text-xl font-black text-[#1936D4]">
                  {item.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}
