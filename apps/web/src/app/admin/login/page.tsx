import { AdminShell } from "@/components/admin/admin-shell";
import { TextField } from "@/components/forms/form-field";
import { StatePanel } from "@/components/ui/states";

export const metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <AdminShell
      title="Login"
      description="Passwordless admin login is planned for the Better Auth and Resend phase. This page establishes the frontend shell only."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
        <div
          className="grid content-start gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8"
          aria-label="Admin login form preview"
        >
          <p className="rounded-2xl bg-[#CCFF00] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#151515]">
            Preview only. Magic-link login arrives in Phase 7.
          </p>
          <TextField
            id="admin-email"
            label="Admin email"
            type="email"
            helperText="Magic-link delivery is implemented in a later phase."
            placeholder="admin@example.com"
            readOnly
          />
        </div>
        <StatePanel kind="loading" />
      </div>
    </AdminShell>
  );
}
