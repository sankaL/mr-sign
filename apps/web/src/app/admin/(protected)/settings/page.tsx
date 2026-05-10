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
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Current session */}
        <div className="admin-card">
          <div className="admin-card-header">
            <p className="admin-card-title">Current session</p>
            <p className="admin-card-subtitle">Account</p>
          </div>
          <div className="admin-card-body">
            <dl className="grid gap-3">
              <SettingsRow label="Name" value={admin.name ?? "Admin"} />
              <SettingsRow label="Email" value={admin.email} />
            </dl>
          </div>
        </div>

        {/* Shop details */}
        <div className="admin-card">
          <div className="admin-card-header">
            <p className="admin-card-title">Shop details</p>
            <p className="admin-card-subtitle">Business</p>
          </div>
          <div className="admin-card-body">
            <dl className="grid gap-3">
              <SettingsRow label="Name" value={siteContact.businessName} />
              <SettingsRow label="Phone" value={siteContact.phone} />
              <SettingsRow label="Email" value={siteContact.email} />
              <SettingsRow label="Address" value={siteContact.address} />
            </dl>
          </div>
        </div>

        {/* Business hours */}
        <div className="admin-card lg:col-span-2">
          <div className="admin-card-header">
            <p className="admin-card-title">Business hours</p>
            <p className="admin-card-subtitle">Hours</p>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {businessHours.map((day) => (
                  <tr key={day.day}>
                    <td className="font-semibold">{day.day}</td>
                    <td className="text-[#151515]/65">{day.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <dt className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-[#151515]/40">
        {label}
      </dt>
      <dd className="text-sm text-[#151515]/80">{value}</dd>
    </div>
  );
}
