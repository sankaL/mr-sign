"use client";

import { useOptimistic, useTransition } from "react";

import {
  toggleServiceActive,
  toggleServiceFeatured,
} from "@/app/actions/admin-services";

type ServiceStatusToggleProps = {
  serviceId: string;
  field: "active" | "featured";
  value: boolean;
};

export function ServiceStatusToggle({
  serviceId,
  field,
  value,
}: ServiceStatusToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticValue, setOptimisticValue] = useOptimistic(value);

  async function handleToggle() {
    const nextValue = !optimisticValue;

    startTransition(async () => {
      setOptimisticValue(nextValue);
      try {
        if (field === "active") {
          await toggleServiceActive(serviceId);
        } else {
          await toggleServiceFeatured(serviceId);
        }
      } catch {
        setOptimisticValue(value);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`inline-flex min-h-8 items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide transition-colors ${
        optimisticValue
          ? "bg-[#CCFF00] text-[#151515]"
          : "bg-[#151515]/10 text-[#151515]/55"
      } disabled:opacity-60`}
    >
      {optimisticValue ? "Yes" : "No"}
    </button>
  );
}
