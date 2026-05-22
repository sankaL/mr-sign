"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { AdminModal } from "@/components/admin/admin-modal";

type DeleteActionResult = {
  status: "success" | "error";
  message?: string;
};

type AdminDeleteButtonProps = {
  action: () => Promise<DeleteActionResult>;
  title: string;
  description: string;
  confirmLabel: string;
  triggerLabel?: string;
  ariaLabel?: string;
  successRedirectTo?: string;
  variant?: "row" | "header";
};

export function AdminDeleteButton({
  action,
  title,
  description,
  confirmLabel,
  triggerLabel = "Delete",
  ariaLabel,
  successRedirectTo,
  variant = "row",
}: AdminDeleteButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setMessage(null);

    startTransition(async () => {
      const result = await action();

      if (result.status === "error") {
        setMessage(result.message ?? "This item could not be deleted.");
        return;
      }

      setIsOpen(false);
      if (successRedirectTo) {
        router.push(successRedirectTo);
        return;
      }

      router.refresh();
    });
  }

  const triggerClass =
    variant === "header"
      ? "inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 px-4 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
      : "inline-flex h-8 items-center justify-center rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage(null);
          setIsOpen(true);
        }}
        className={triggerClass}
        aria-label={ariaLabel ?? triggerLabel}
      >
        <Trash2 className="h-4 w-4" strokeWidth={2} />
        <span className={variant === "row" ? "sr-only sm:not-sr-only" : ""}>
          {triggerLabel}
        </span>
      </button>

      <AdminModal
        isOpen={isOpen}
        onClose={() => {
          if (!isPending) setIsOpen(false);
        }}
        title={title}
        subtitle="This action cannot be undone."
      >
        <div className="grid gap-5">
          <p className="text-sm leading-6 text-[#151515]/65">{description}</p>

          {message ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {message}
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[#151515]/10 px-4 text-sm font-semibold text-[#151515]/65 transition-colors hover:bg-[#151515]/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              ) : (
                <Trash2 className="h-4 w-4" strokeWidth={2} />
              )}
              {confirmLabel}
            </button>
          </div>
        </div>
      </AdminModal>
    </>
  );
}
