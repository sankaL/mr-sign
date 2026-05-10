"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AdminPaginationProps = {
  totalItems: number;
  perPage: number;
  currentPage: number;
  /** Base URL path without query params, e.g. "/admin/requests" */
  basePath: string;
  onPageChange?: (page: number) => void;
};

export function AdminPagination({
  totalItems,
  perPage,
  currentPage,
  basePath,
  onPageChange,
}: AdminPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * perPage + 1;
  const end = Math.min(safePage * perPage, totalItems);

  if (totalItems <= perPage) return null;

  function goToPage(page: number) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage === safePage) return;

    if (onPageChange) {
      onPageChange(nextPage);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }
    const qs = params.toString();
    router.push(`${basePath}${qs ? `?${qs}` : ""}`);
  }

  /* Build page numbers to show */
  function getPageNumbers(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (safePage > 3) pages.push("...");
    const rangeStart = Math.max(2, safePage - 1);
    const rangeEnd = Math.min(totalPages - 1, safePage + 1);
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (safePage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  }

  return (
    <nav
      aria-label="Table pagination"
      className="flex flex-col items-center justify-between gap-3 sm:flex-row"
    >
      <p className="text-sm text-[#151515]/50">
        Showing{" "}
        <span className="font-semibold text-[#151515]">{start}</span>–
        <span className="font-semibold text-[#151515]">{end}</span> of{" "}
        <span className="font-semibold text-[#151515]">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage <= 1}
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#151515]/10 bg-white text-[#151515]/60 transition-colors hover:border-[#151515]/20 hover:bg-[#151515]/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#151515]/10 disabled:hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        </button>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-8 w-8 items-center justify-center text-sm text-[#151515]/40"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p)}
              aria-label={`Page ${p}`}
              aria-current={p === safePage ? "page" : undefined}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors ${
                p === safePage
                  ? "bg-[#151515] text-white shadow-sm"
                  : "text-[#151515]/70 hover:bg-[#151515]/5"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage >= totalPages}
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#151515]/10 bg-white text-[#151515]/60 transition-colors hover:border-[#151515]/20 hover:bg-[#151515]/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#151515]/10 disabled:hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </nav>
  );
}
