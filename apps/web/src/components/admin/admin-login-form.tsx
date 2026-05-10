"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";

import { requestAdminLoginLink } from "@/app/actions/admin-auth";
import type { AdminLoginFormState } from "@/app/actions/admin-auth";
import { AdminBrandLogo } from "@/components/admin/admin-brand-logo";

const initialState: AdminLoginFormState = {
  status: "idle",
};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(
    requestAdminLoginLink,
    initialState,
  );

  return (
    <div className="rounded-3xl bg-white px-6 py-10 pt-14 shadow-lg">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#151515]/40">
            Admin portal
          </p>
          <div className="scale-150">
            <AdminBrandLogo badgeBg="#f5f6f8" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-[#151515]">
            Welcome back!
          </h1>
          <p className="text-sm text-[#151515]/50">
            Sign in to access the admin portal.
          </p>
        </div>

        <form action={formAction} className="w-full space-y-4">
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email"
            required
            className="h-11 w-full rounded-xl border border-[#151515]/10 bg-white px-4 text-sm text-[#151515] outline-none transition-colors placeholder:text-[#151515]/30 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10"
          />
          {state.fieldErrors?.email ? (
            <p className="text-xs font-semibold text-red-600" aria-live="polite">
              {state.fieldErrors.email}
            </p>
          ) : null}
          {state.message ? (
            <p
              className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                state.status === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-700"
              }`}
              aria-live="polite"
            >
              {state.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#151515] text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "Sending…" : "Send me the magic link"}
            <Send className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>

        <p className="w-11/12 text-center text-xs text-[#151515]/40">
          You acknowledge that you read, and agree, to our{" "}
          <a href="#" className="underline hover:text-[#151515]">
            Terms of Service
          </a>{" "}
          and our{" "}
          <a href="#" className="underline hover:text-[#151515]">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
