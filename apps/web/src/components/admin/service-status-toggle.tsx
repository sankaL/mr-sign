"use client";

import { useOptimistic, useTransition } from "react";

import {
  toggleServiceStatus,
  toggleServiceFeatured,
} from "@/app/actions/admin-services";

type ServiceStatusToggleProps = {
  serviceId: string;
  field: "status" | "featured";
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
        if (field === "status") {
          await toggleServiceStatus(serviceId);
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
      data-on={String(optimisticValue)}
      className="admin-toggle"
      aria-label={`${field} toggle`}
    />
  );
}
