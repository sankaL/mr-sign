"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SortableLinkProps = {
  label: string;
  field: string;
  currentSort: string;
  currentOrder: string;
  basePath: string;
};

export function SortableLink({
  label,
  field,
  currentSort,
  currentOrder,
  basePath,
}: SortableLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = currentSort === field;
  const nextOrder =
    isActive && currentOrder === "asc"
      ? "desc"
      : isActive && currentOrder === "desc"
        ? "asc"
        : "asc";

  const handleClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", field);
    params.set("order", nextOrder);
    params.delete("page");
    router.push(`${basePath}?${params.toString()}`);
  }, [router, searchParams, basePath, field, nextOrder]);

  return (
    <th className="sortable" data-sort={isActive ? currentOrder : undefined}>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1 text-left"
        aria-label={`Sort by ${label} ${nextOrder === "asc" ? "ascending" : "descending"}`}
      >
        {label}
        <span className="sort-indicator" aria-hidden="true">
          <span className="sort-arrow sort-arrow-up" />
          <span className="sort-arrow sort-arrow-down" />
        </span>
      </button>
    </th>
  );
}
