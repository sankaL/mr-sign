import { AdminLoginForm } from "@/components/admin/admin-login-form";

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
    <div className="flex min-h-dvh items-center justify-center bg-[#f5f6f8] px-4">
      <div className="w-full max-w-sm">
        {error ? (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
        <AdminLoginForm />
      </div>
    </div>
  );
}
