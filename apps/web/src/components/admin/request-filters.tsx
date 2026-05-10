"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const requestTypes = [
  { value: "", label: "All types" },
  { value: "QUOTE", label: "Quote" },
  { value: "ORDER", label: "Order" },
  { value: "CONTACT", label: "Contact" },
];

const requestStatuses = [
  { value: "", label: "All statuses" },
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

type RequestFiltersProps = {
  initialQ: string;
  initialType?: string;
  initialStatus?: string;
};

export function RequestFilters({
  initialQ,
  initialType,
  initialStatus,
}: RequestFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateFilters(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    startTransition(() => {
      router.replace(`/admin/requests?${params.toString()}`);
    });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
      <input
        type="text"
        name="q"
        placeholder="Search by request code"
        defaultValue={initialQ}
        onChange={(e) => updateFilters({ q: e.target.value })}
        className="min-h-11 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#1936D4]"
      />
      <select
        name="type"
        defaultValue={initialType ?? ""}
        onChange={(e) => updateFilters({ type: e.target.value })}
        className="min-h-11 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors focus:border-[#1936D4]"
      >
        {requestTypes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        name="status"
        defaultValue={initialStatus ?? ""}
        onChange={(e) => updateFilters({ status: e.target.value })}
        className="min-h-11 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors focus:border-[#1936D4]"
      >
        {requestStatuses.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isPending ? (
        <p className="text-xs font-bold text-[#151515]/45 sm:col-span-3">
          Updating...
        </p>
      ) : null}
    </div>
  );
}
