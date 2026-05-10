"use client";

import { UserPlus } from "lucide-react";
import { useActionState, useEffect } from "react";

import { addAdminUser } from "@/app/actions/admin-users";
import type { AdminUserFormState } from "@/app/actions/admin-users";
import { TextField } from "@/components/forms/form-field";

const initialState: AdminUserFormState = {
  status: "idle",
};

type AdminUserFormProps = {
  onSuccess?: () => void;
};

export function AdminUserForm({ onSuccess }: AdminUserFormProps) {
  const [state, formAction, isPending] = useActionState(
    addAdminUser,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success" && onSuccess) {
      onSuccess();
    }
  }, [state.status, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
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
          className={`rounded-lg px-4 py-3 text-sm font-semibold ${
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
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#151515] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40 md:justify-self-start"
      >
        {isPending ? "Saving…" : "Add admin"}
        <UserPlus className="h-4 w-4" strokeWidth={2} />
      </button>
    </form>
  );
}
