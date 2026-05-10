import Link from "next/link";

import {
  getDashboardStats,
  getRecentRequests,
  getRequestTrends,
  getServicesNeedingAttention,
} from "@/lib/admin/data";
import { requireActiveAdminSession } from "@/lib/admin-session";

import { FileText, Inbox, Users, ArrowRight, Pencil } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import {
  StatCard,
  StatusBarChart,
  TypeDonut,
} from "@/components/admin/dashboard-charts";
import { RequestTrendChart } from "@/components/admin/request-trend-chart";
import { AnimatedSection } from "@/components/admin/animated-section";

export const metadata = { title: "Dashboard" };

function statusBadgeClass(status: string) {
  return `badge badge-${status.toLowerCase().replace(/_/g, "-")}`;
}

function typeBadgeClass(type: string) {
  return `badge badge-${type.toLowerCase()}`;
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").toLowerCase();
}

export default async function AdminDashboardPage() {
  const admin = await requireActiveAdminSession();
  const stats = await getDashboardStats();
  const recent = await getRecentRequests();
  const attentionServices = await getServicesNeedingAttention();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const trends = await getRequestTrends(oneYearAgo);

  const quoteUrl = "/admin/requests?type=QUOTE&status=NEW";
  const contactUrl = "/admin/requests?type=CONTACT&status=NEW";

  return (
    <AdminShell
      title="Dashboard"
      description="Overview of new requests, recent activity, and services needing attention."
      adminName={admin.name ?? undefined}
    >
      {/* ── Stat cards ───────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="New quotes"
          value={stats.newQuoteCount}
          subtitle="Awaiting review"
          href={quoteUrl}
          accentColor="#3b82f6"
          icon={<FileText className="h-5 w-5" />}
          delay={0}
        />
        <StatCard
          label="New contacts"
          value={stats.newContactCount}
          subtitle="Awaiting review"
          href={contactUrl}
          accentColor="#ec4899"
          icon={<Users className="h-5 w-5" />}
          delay={0.08}
        />
        <StatCard
          label="Total requests"
          value={stats.totalRequestCount}
          subtitle="All time"
          accentColor="#8b5cf6"
          icon={<Inbox className="h-5 w-5" />}
          delay={0.16}
        />
      </div>

      {/* ── Request trend ─────────────────────── */}
      <AnimatedSection delay={0.2} className="mt-8">
        <RequestTrendChart data={trends} />
      </AnimatedSection>

      {/* ── Charts ───────────────────────────── */}
      <AnimatedSection delay={0.28} className="mt-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <StatusBarChart data={stats.statusCounts} />
          <TypeDonut data={stats.typeCounts} />
        </div>
      </AnimatedSection>

      {/* ── Recent submissions + Attention ───── */}
      <AnimatedSection delay={0.36} className="mt-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* Recent submissions */}
          <div className="admin-card">
            <div className="admin-card-header flex items-start justify-between">
              <div>
                <p className="admin-card-title">Recent submissions</p>
                <p className="admin-card-subtitle">Last 10 requests</p>
              </div>
              <Link
                href="/admin/requests"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#151515]/8 bg-white px-3 py-1.5 text-xs font-bold text-[#151515]/70 transition-all hover:border-[#151515]/15 hover:bg-[#151515]/[0.03] hover:text-[#151515]"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {recent.length === 0 ? (
              <div className="admin-card-body py-10 text-center">
                <p className="text-sm text-[#151515]/40">No requests yet.</p>
              </div>
            ) : (
              <div className="overflow-y-auto" style={{ maxHeight: "336px" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((request) => (
                      <tr key={request.id}>
                        <td>
                          <Link
                            href={`/admin/requests/${request.requestCode}`}
                            className="font-semibold text-[#3b82f6] transition-colors hover:text-[#2563eb]"
                          >
                            {request.requestCode}
                          </Link>
                        </td>
                        <td>
                          <span className={typeBadgeClass(request.type)}>
                            {request.type}
                          </span>
                        </td>
                        <td className="text-[#151515]/65">
                          {request.firstName} {request.lastName}
                        </td>
                        <td>
                          <span className={statusBadgeClass(request.status)}>
                            {formatStatus(request.status)}
                          </span>
                        </td>
                        <td className="text-xs text-[#151515]/40">
                          {new Date(request.submittedAt).toLocaleDateString(
                            "en-CA",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Services needing attention */}
          <div className="admin-card">
            <div className="admin-card-header flex items-start justify-between">
              <div>
                <p className="admin-card-title">Services needing attention</p>
                <p className="admin-card-subtitle">
                  Missing pricing or request-quote only
                </p>
              </div>
              <Link
                href="/admin/services"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#151515]/8 bg-white px-3 py-1.5 text-xs font-bold text-[#151515]/70 transition-all hover:border-[#151515]/15 hover:bg-[#151515]/[0.03] hover:text-[#151515]"
              >
                Manage
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {attentionServices.length === 0 ? (
              <div className="admin-card-body py-10 text-center">
                <p className="text-sm text-[#151515]/40">
                  All services have pricing configured.
                </p>
              </div>
            ) : (
              <div className="overflow-y-auto" style={{ maxHeight: "336px" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Category</th>
                      <th>Pricing</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {attentionServices.map((service) => (
                      <tr key={service.id}>
                        <td className="font-semibold">{service.name}</td>
                        <td className="text-[#151515]/55">
                          {service.categoryName}
                        </td>
                        <td>
                          <span className="badge badge-under-review">
                            {service.pricingType}
                          </span>
                        </td>
                        <td>
                          <Link
                            href={`/admin/services/${service.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3b82f6] transition-colors hover:text-[#2563eb]"
                          >
                            <Pencil className="h-3 w-3" />
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </AdminShell>
  );
}
