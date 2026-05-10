"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Loader2 } from "lucide-react";

import {
  updateRequestStatus,
  type RequestStatusFormState,
} from "@/app/actions/admin-requests";
import { useDropdownPosition } from "@/hooks/use-dropdown-position";

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

function statusBadgeClass(status: string) {
  return `badge badge-${status.toLowerCase().replace(/_/g, "-")}`;
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").toLowerCase();
}

type RequestStatusBadgeProps = {
  requestCode: string;
  currentStatus: string;
};

const initialState: RequestStatusFormState = { status: "idle" };

export function RequestStatusBadge({
  requestCode,
  currentStatus,
}: RequestStatusBadgeProps) {
  const requestCodeRef = useRef(requestCode);

  useEffect(() => {
    requestCodeRef.current = requestCode;
  }, [requestCode]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, formAction, isPending] = useActionState(
    async (_prev: RequestStatusFormState, formData: FormData) =>
      updateRequestStatus(requestCodeRef.current, _prev, formData),
    initialState,
  );

  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setFocusedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const { placement } = useDropdownPosition({
    open,
    triggerRef,
    panelRef,
    onClose: handleClose,
    align: "auto",
  });

  /* Focus the active option when it changes */
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const selectOption = useCallback(
    (optionValue: string) => {
      if (optionValue !== currentStatus && formRef.current) {
        const formData = new FormData(formRef.current);
        formData.set("status", optionValue);
        formAction(formData);
      }
      handleClose();
    },
    [currentStatus, formAction, handleClose],
  );

  const handleTriggerClick = useCallback(() => {
    setOpen((prev) => !prev);
    setFocusedIndex((prev) => (prev === -1 ? 0 : prev));
  }, []);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        handleOpen();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
        setFocusedIndex(statuses.length - 1);
      }
    },
    [handleOpen],
  );

  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectOption(statuses[index].value);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, statuses.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [selectOption],
  );

  return (
    <div className="relative inline-flex items-center gap-2">
      {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-[#151515]/40" />}
      <form action={formAction} ref={formRef} className="m-0 p-0">
        <input type="hidden" name="status" value={currentStatus} />
        <button
          ref={triggerRef}
          type="button"
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          className={`${statusBadgeClass(
            currentStatus,
          )} cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 border-0`}
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={isPending}
        >
          {formatStatus(currentStatus)}
          <ChevronDown
            className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
            strokeWidth={3}
          />
        </button>

        {open
          ? createPortal(
              <div ref={panelRef}>
                <div
                  role="listbox"
                  className="fixed z-[9999] max-h-[280px] overflow-y-auto rounded-[10px] border border-[#151515]/10 bg-white p-1 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]"
                  style={{
                    top: placement.top,
                    ...(placement.left !== undefined ? { left: placement.left } : {}),
                    ...(placement.right !== undefined ? { right: placement.right } : {}),
                    minWidth: placement.minWidth,
                  }}
                >
                  {statuses.map((option, index) => {
                    const isSelected = option.value === currentStatus;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={focusedIndex === index ? 0 : -1}
                        ref={(el) => {
                          optionRefs.current[index] = el;
                        }}
                        className={[
                          "flex w-full items-center justify-between gap-3 rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                          isSelected
                            ? "bg-[#3b82f6]/8 font-semibold text-[#3b82f6]"
                            : "text-[#151515] hover:bg-[#151515]/4",
                        ].join(" ")}
                        onClick={() => selectOption(option.value)}
                        onKeyDown={(e) => handleOptionKeyDown(e, index)}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`${statusBadgeClass(
                              option.value,
                            )} scale-90 origin-left`}
                          >
                            {formatStatus(option.value)}
                          </span>
                        </span>
                        {isSelected ? (
                          <Check
                            className="h-4 w-4 flex-shrink-0"
                            strokeWidth={3}
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>,
              document.body,
            )
          : null}
      </form>
    </div>
  );
}
