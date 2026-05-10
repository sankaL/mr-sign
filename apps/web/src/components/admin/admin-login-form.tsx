"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";

import { requestAdminLoginLink } from "@/app/actions/admin-auth";
import type { AdminLoginFormState } from "@/app/actions/admin-auth";
import { TextField } from "@/components/forms/form-field";

const initialState: AdminLoginFormState = {
  status: "idle",
};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(
    requestAdminLoginLink,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="grid content-start gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8"
    >
      <div>
        <p className="rounded-2xl bg-[#CCFF00] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#151515]">
          Passwordless admin access
        </p>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#151515]/65">
          Enter an active admin email. We will send a one-time login link.
        </p>
      </div>
      <TextField
        id="admin-email"
        name="email"
        label="Admin email"
        type="email"
        autoComplete="email"
        helperText="The link expires quickly and can only be used once."
        placeholder="admin@example.com"
        error={state.fieldErrors?.email}
        required
      />
      {state.message ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-black leading-5 ${
            state.status === "success"
              ? "bg-[#CCFF00]/35 text-[#151515]"
              : "bg-[#E51B23]/10 text-[#E51B23]"
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E51B23] px-6 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#151515]/35"
      >
        {isPending ? "Sending..." : "Send login link"}
        <Send className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </form>
  );
}
