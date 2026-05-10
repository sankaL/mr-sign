"use client";

import { UserPlus } from "lucide-react";
import { useActionState } from "react";

import { addAdminUser } from "@/app/actions/admin-users";
import type { AdminUserFormState } from "@/app/actions/admin-users";
import { TextField } from "@/components/forms/form-field";

const initialState: AdminUserFormState = {
  status: "idle",
};

export function AdminUserForm() {
  const [state, formAction, isPending] = useActionState(
    addAdminUser,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6"
    >
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
          Add admin
        </p>
        <h2 className="mt-2 text-xl font-black uppercase leading-tight">
          Invite access by email
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          id="new-admin-email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={state.fieldErrors?.email}
          required
        />
        <TextField
          id="new-admin-name"
          name="name"
          label="Name"
          autoComplete="name"
          helperText="Optional. Defaults to Admin."
          error={state.fieldErrors?.name}
        />
      </div>
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
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-6 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#151515]/35 md:justify-self-start"
      >
        {isPending ? "Saving..." : "Add admin"}
        <UserPlus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </form>
  );
}
