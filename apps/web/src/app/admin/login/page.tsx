import { AdminShell } from "@/components/admin/admin-shell";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { StatePanel } from "@/components/ui/states";

export const metadata = {
  title: "Admin Login",
};

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  INVALID_TOKEN: "That login link is invalid. Request a new one.",
  EXPIRED_TOKEN: "That login link expired. Request a new one.",
  ATTEMPTS_EXCEEDED:
    "That login link can no longer be used. Request a new one.",
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const error = params?.error ? errorMessages[params.error] : null;

  return (
    <AdminShell
      title="Login"
      description="Request a secure one-time login link for the admin portal."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
        <div className="grid gap-4">
          {error ? (
            <p className="rounded-xl bg-[#E51B23]/10 px-4 py-3 text-sm font-black leading-5 text-[#E51B23]">
              {error}
            </p>
          ) : null}
          <AdminLoginForm />
        </div>
        <StatePanel kind="loading" />
      </div>
    </AdminShell>
  );
}
