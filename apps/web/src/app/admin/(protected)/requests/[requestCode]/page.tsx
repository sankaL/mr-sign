import { prisma } from "@mrsign/db/src/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { RequestNoteForm } from "@/components/admin/request-note-form";
import { RequestStatusBadge } from "@/components/admin/request-status-badge";

type RequestDetailPageProps = {
  params: Promise<{ requestCode: string }>;
};

function typeBadgeClass(type: string) {
  return `badge badge-${type.toLowerCase()}`;
}

export async function generateMetadata({ params }: RequestDetailPageProps) {
  const { requestCode } = await params;
  return { title: `Request ${requestCode}` };
}

export default async function AdminRequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const admin = await requireActiveAdminSession();
  const { requestCode } = await params;

  const request = await prisma.customerRequest.findUnique({
    where: { requestCode },
    include: {
      services: {
        include: {
          service: {
            select: { name: true, category: { select: { name: true } } },
          },
        },
      },
      notes: {
        include: {
          author: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!request) {
    return (
      <AdminShell
        title="Request Not Found"
        description="The requested customer request does not exist."
        adminName={admin.name ?? undefined}
      >
        <div className="admin-card">
          <div className="admin-card-body py-8 text-center">
            <p className="text-sm text-[#151515]/55">
              No request found with code{" "}
              <strong className="text-[#151515]">{requestCode}</strong>.
            </p>
            <Link
              href="/admin/requests"
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-[#151515] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6]"
            >
              Back to requests
            </Link>
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title={request.requestCode}
      description={`${request.type} request from ${request.firstName} ${request.lastName}`}
      adminName={admin.name ?? undefined}
    >
      {/* Back link */}
      <div className="mb-5">
        <Link
          href="/admin/requests"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#151515]/50 transition-colors hover:text-[#151515]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to requests
        </Link>
      </div>

      <div className="grid gap-5">
          {/* Request details */}
          <div className="admin-card">
            <div className="admin-card-header flex items-center justify-between">
              <p className="admin-card-title">Request details</p>
              <div className="flex items-center gap-2">
                <span className={typeBadgeClass(request.type)}>
                  {request.type}
                </span>
                <RequestStatusBadge
                  requestCode={request.requestCode}
                  currentStatus={request.status}
                />
              </div>
            </div>
            <div className="admin-card-body">
              <dl className="grid gap-3">
                <DetailRow
                  label="Name"
                  value={`${request.firstName} ${request.lastName}`}
                />
                <DetailRow label="Email" value={request.email} />
                {request.phone ? (
                  <DetailRow label="Phone" value={request.phone} />
                ) : null}
                {request.companyName ? (
                  <DetailRow label="Company" value={request.companyName} />
                ) : null}
                {request.preferredContactMethod ? (
                  <DetailRow
                    label="Preferred contact"
                    value={request.preferredContactMethod}
                  />
                ) : null}
                {request.reasonForContact ? (
                  <DetailRow label="Reason" value={request.reasonForContact} />
                ) : null}
                {request.quantity ? (
                  <DetailRow
                    label="Quantity"
                    value={String(request.quantity)}
                  />
                ) : null}
                {request.sizeDetails ? (
                  <DetailRow label="Size" value={request.sizeDetails} />
                ) : null}
                {request.materialDetails ? (
                  <DetailRow
                    label="Material"
                    value={request.materialDetails}
                  />
                ) : null}
                {request.colorPreferences ? (
                  <DetailRow
                    label="Colour"
                    value={request.colorPreferences}
                  />
                ) : null}
                {request.artworkStatus ? (
                  <DetailRow
                    label="Artwork"
                    value={request.artworkStatus
                      .replace(/_/g, " ")
                      .toLowerCase()}
                  />
                ) : null}
                {request.desiredCompletionDate ? (
                  <DetailRow
                    label="Desired date"
                    value={new Date(
                      request.desiredCompletionDate,
                    ).toLocaleDateString("en-CA")}
                  />
                ) : null}
                <DetailRow
                  label="Project details"
                  value={request.projectDetails}
                />
                <DetailRow
                  label="Submitted"
                  value={new Date(request.submittedAt).toLocaleString("en-CA")}
                />
              </dl>
            </div>
          </div>

          {/* Selected services */}
          {request.services.length > 0 ? (
            <div className="admin-card">
              <div className="admin-card-header">
                <p className="admin-card-title">Selected services</p>
                <p className="admin-card-subtitle">
                  {request.services.length} service
                  {request.services.length === 1 ? "" : "s"} requested
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {request.services.map((rs) => (
                      <tr key={rs.id}>
                        <td className="font-semibold">{rs.service.name}</td>
                        <td className="text-[#151515]/55">
                          {rs.service.category.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* Internal notes */}
          <div className="admin-card">
            <div className="admin-card-header">
              <p className="admin-card-title">Internal notes</p>
              <p className="admin-card-subtitle">
                {request.notes.length} note
                {request.notes.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="admin-card-body">
              <RequestNoteForm requestCode={request.requestCode} />
            </div>
            {request.notes.length > 0 ? (
              <div className="border-t border-[#151515]/6">
                {request.notes.map((note) => (
                  <div
                    key={note.id}
                    className="border-b border-[#151515]/6 px-5 py-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#151515] text-[10px] font-bold text-white">
                        {(note.author?.name ?? "A").charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold">
                        {note.author?.name ?? "Admin"}
                      </span>
                      <span className="text-xs text-[#151515]/40">
                        {new Date(note.createdAt).toLocaleString("en-CA")}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap pl-8 text-sm text-[#151515]/65">
                      {note.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
    </AdminShell>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <dt className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-[#151515]/40">
        {label}
      </dt>
      <dd className="text-sm text-[#151515]/80">{value}</dd>
    </div>
  );
}
