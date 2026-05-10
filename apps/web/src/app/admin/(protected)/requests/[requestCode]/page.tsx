import { prisma } from "@mrsign/db/src/client";
import Link from "next/link";

import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { RequestNoteForm } from "@/components/admin/request-note-form";
import { RequestStatusForm } from "@/components/admin/request-status-form";

type RequestDetailPageProps = {
  params: Promise<{ requestCode: string }>;
};

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
        <div className="rounded-[1.75rem] border border-[#151515]/10 bg-white p-6">
          <p className="text-sm font-semibold text-[#151515]/55">
            No request found with code{" "}
            <strong className="text-[#151515]">{requestCode}</strong>.
          </p>
          <Link
            href="/admin/requests"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1936D4] px-6 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] active:scale-[0.98]"
          >
            Back to requests
          </Link>
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
      <div className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
        <div className="grid gap-6">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
            <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
                Request details
              </p>
            </div>
            <div className="grid gap-4 px-5 py-5 md:px-6">
              <DetailRow label="Type" value={request.type} />
              <DetailRow
                label="Status"
                value={request.status.replace(/_/g, " ").toLowerCase()}
              />
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
                <DetailRow label="Quantity" value={String(request.quantity)} />
              ) : null}
              {request.sizeDetails ? (
                <DetailRow label="Size" value={request.sizeDetails} />
              ) : null}
              {request.materialDetails ? (
                <DetailRow label="Material" value={request.materialDetails} />
              ) : null}
              {request.colorPreferences ? (
                <DetailRow label="Colour" value={request.colorPreferences} />
              ) : null}
              {request.artworkStatus ? (
                <DetailRow
                  label="Artwork"
                  value={request.artworkStatus.replace(/_/g, " ").toLowerCase()}
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
            </div>
          </div>

          {request.services.length > 0 ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
              <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
                  Selected services
                </p>
              </div>
              <div className="grid divide-y divide-[#151515]/10 px-5 md:px-6">
                {request.services.map((rs) => (
                  <div key={rs.id} className="py-3">
                    <p className="text-sm font-black text-[#151515]">
                      {rs.service.name}
                    </p>
                    <p className="text-xs font-bold text-[#151515]/45">
                      {rs.service.category.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
            <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
                Internal notes
              </p>
            </div>
            <div className="px-5 py-5 md:px-6">
              <RequestNoteForm requestCode={request.requestCode} />
            </div>
            {request.notes.length > 0 ? (
              <div className="grid divide-y divide-[#151515]/10 border-t border-[#151515]/10">
                {request.notes.map((note) => (
                  <div key={note.id} className="px-5 py-4 md:px-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-black text-[#151515]">
                        {note.author?.name ?? "Admin"}
                      </span>
                      <span className="text-xs font-bold text-[#151515]/45">
                        {new Date(note.createdAt).toLocaleString("en-CA")}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm font-semibold text-[#151515]/65">
                      {note.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6">
          <RequestStatusForm
            requestCode={request.requestCode}
            currentStatus={request.status}
          />
        </div>
      </div>
    </AdminShell>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:items-start">
      <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-[#151515]/85">{value}</dd>
    </div>
  );
}
