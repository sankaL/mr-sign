"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useTransition } from "react";
import { Search } from "lucide-react";

import { MultiSelectDropdown } from "@/components/admin/multi-select-dropdown";

const requestTypes = [
  { value: "QUOTE", label: "Quote" },
  { value: "ORDER", label: "Order" },
  { value: "CONTACT", label: "Contact" },
];

const requestStatuses = [
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
  initialTypes: string[];
  initialStatuses: string[];
};

export function RequestFilters({
  initialQ,
  initialTypes,
  initialStatuses,
}: RequestFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchInputRef.current && searchInputRef.current.value !== initialQ) {
      searchInputRef.current.value = initialQ;
    }
  }, [initialQ]);

  const updateFilters = useCallback(
    (updates: Record<string, string | string[]>) => {
      const params = new URLSearchParams(searchParams.toString());
      /* Reset to page 1 when filters change */
      params.delete("page");

      Object.entries(updates).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(","));
          } else {
            params.delete(key);
          }
        } else if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        router.replace(`/admin/requests?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition],
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search input with icon */}
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#151515]/35"
          strokeWidth={2}
        />
        <input
          ref={searchInputRef}
          type="text"
          name="q"
          placeholder="Search by code, name, or email…"
          defaultValue={initialQ}
          onChange={(e) => {
            const nextValue = e.target.value;
            updateFilters({ q: nextValue });
          }}
          className="h-10 w-full rounded-lg border border-[#151515]/10 bg-white pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10"
        />
      </div>

      {/* Multi-select type filter */}
      <MultiSelectDropdown
        label="Type"
        options={requestTypes}
        selected={initialTypes}
        onChange={(values) => updateFilters({ type: values })}
      />

      {/* Multi-select status filter */}
      <MultiSelectDropdown
        label="Status"
        options={requestStatuses}
        selected={initialStatuses}
        onChange={(values) => updateFilters({ status: values })}
        align="right"
      />

      {isPending ? (
        <p className="text-xs text-[#151515]/40">Updating…</p>
      ) : null}
    </div>
  );
}
