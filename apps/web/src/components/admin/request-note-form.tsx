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
        className="text-sm font-black uppercase tracking-wide"
      >
        Add a note
      </label>
      <textarea
        id="note-body"
        name="body"
        rows={3}
        required
        placeholder="Enter an internal note..."
        className="min-h-24 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#1936D4]"
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
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#151515]/35 md:justify-self-start"
      >
        {isPending ? "Saving..." : "Add note"}
      </button>
    </form>
  );
}
