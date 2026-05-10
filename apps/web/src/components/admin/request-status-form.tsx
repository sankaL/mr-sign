"use client";

import { useActionState } from "react";

import {
  updateRequestStatus,
  type RequestStatusFormState,
} from "@/app/actions/admin-requests";
import { SelectDropdown } from "@/components/forms/select-dropdown";

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
    <form action={formAction} className="admin-card">
      <div className="admin-card-header">
        <p className="admin-card-title">Update status</p>
        <p className="admin-card-subtitle">Change the request workflow stage</p>
      </div>
      <div className="admin-card-body grid gap-4">
        <SelectDropdown
          name="status"
          options={statuses}
          defaultValue={currentStatus}
          className="w-full"
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
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#151515] text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? "Saving…" : "Update status"}
        </button>
      </div>
    </form>
  );
}
