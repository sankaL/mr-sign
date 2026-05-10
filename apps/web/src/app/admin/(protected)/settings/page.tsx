import { requireActiveAdminSession } from "@/lib/admin-session";
import { siteContact, businessHours } from "@/lib/site";

import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const admin = await requireActiveAdminSession();

  return (
    <AdminShell
      title="Settings"
      description="Admin portal settings and business information."
      adminName={admin.name ?? undefined}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              Account
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Current session
            </h2>
          </div>
          <div className="grid gap-4 px-5 py-5 md:px-6">
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
                Name
              </dt>
              <dd className="text-sm font-semibold text-[#151515]/85">
                {admin.name ?? "Admin"}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
                Email
              </dt>
              <dd className="text-sm font-semibold text-[#151515]/85">
                {admin.email}
              </dd>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              Business
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Shop details
            </h2>
          </div>
          <div className="grid gap-4 px-5 py-5 md:px-6">
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
                Name
              </dt>
              <dd className="text-sm font-semibold text-[#151515]/85">
                {siteContact.businessName}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
                Phone
              </dt>
              <dd className="text-sm font-semibold text-[#151515]/85">
                {siteContact.phone}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
                Email
              </dt>
              <dd className="text-sm font-semibold text-[#151515]/85">
                {siteContact.email}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
              <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
                Address
              </dt>
              <dd className="text-sm font-semibold text-[#151515]/85">
                {siteContact.address}
              </dd>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white lg:col-span-2">
          <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
              Hours
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Business hours
            </h2>
          </div>
          <div className="grid divide-y divide-[#151515]/10 px-5 md:px-6">
            {businessHours.map((day) => (
              <div
                key={day.day}
                className="grid gap-1 py-3 sm:grid-cols-[140px_1fr]"
              >
                <dt className="text-xs font-black uppercase tracking-wide text-[#151515]/45">
                  {day.day}
                </dt>
                <dd className="text-sm font-semibold text-[#151515]/85">
                  {day.hours}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
