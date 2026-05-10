"use client";

import { useActionState } from "react";

import {
  addRequestNote,
  type RequestNoteFormState,
} from "@/app/actions/admin-requests";

type RequestNoteFormProps = {
  requestCode: string;
};

const initialState: RequestNoteFormState = { status: "idle" };

export function RequestNoteForm({ requestCode }: RequestNoteFormProps) {
  const [state, formAction, isPending] = useActionState(
    (_prev: RequestNoteFormState, formData: FormData) =>
      addRequestNote(requestCode, _prev, formData),
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-3">
      <label
        htmlFor="note-body"
        className="text-xs font-semibold uppercase tracking-wide text-[#151515]/50"
      >
        Add a note
      </label>
      <textarea
        id="note-body"
        name="body"
        rows={3}
        required
        placeholder="Enter an internal note…"
        className="min-h-20 rounded-lg border border-[#151515]/10 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#151515]/30 focus:border-[#3b82f6]"
      />
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
        className="inline-flex h-9 items-center justify-center rounded-lg bg-[#151515] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40 md:justify-self-start"
      >
        {isPending ? "Saving…" : "Add note"}
      </button>
    </form>
  );
}
