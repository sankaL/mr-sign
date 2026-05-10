"use client";

import { useActionState } from "react";

import {
  updateRequestStatus,
  type RequestStatusFormState,
} from "@/app/actions/admin-requests";

const statuses = [
  { value: "NEW", label: "New" },
  { value: "UNDER_REVIEW", label: "Under review" },
  { value: "QUOTE_SENT", label: "Quote sent" },
  { value: "AWAITING_CUSTOMER_APPROVAL", label: "Awaiting approval" },
  { value: "APPROVED", label: "Approved" },
  { value: "IN_PRODUCTION", label: "In production" },
  { value: "READY_FOR_PICKUP", label: "Ready for pickup" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

type RequestStatusFormProps = {
  requestCode: string;
  currentStatus: string;
};

const initialState: RequestStatusFormState = { status: "idle" };

export function RequestStatusForm({
  requestCode,
  currentStatus,
}: RequestStatusFormProps) {
  const [state, formAction, isPending] = useActionState(
    (_prev: RequestStatusFormState, formData: FormData) =>
      updateRequestStatus(requestCode, _prev, formData),
    initialState,
  );

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6"
    >
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
          Update status
        </p>
        <h2 className="mt-2 text-xl font-black uppercase leading-tight">
          Change request status
        </h2>
      </div>
      <select
        name="status"
        defaultValue={currentStatus}
        className="min-h-11 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors focus:border-[#1936D4]"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
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
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1936D4] px-6 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#151515]/35"
      >
        {isPending ? "Saving..." : "Update status"}
      </button>
    </form>
  );
}
