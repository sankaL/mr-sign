"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

import { useDropdownPosition } from "@/hooks/use-dropdown-position";

type SelectOption = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
  error?: boolean;
};

export function SelectDropdown({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder,
  name,
  id,
  required,
  className = "",
  error,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;
  const selectedOption = options.find((o) => o.value === selectedValue);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const { placement } = useDropdownPosition({
    open,
    triggerRef,
    panelRef,
    onClose: handleClose,
    align: "left",
  });

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
      }
    },
    [],
  );

  const selectOption = useCallback(
    (optionValue: string) => {
      if (!isControlled) setInternalValue(optionValue);
      onChange?.(optionValue);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [isControlled, onChange],
  );

  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent, optionValue: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectOption(optionValue);
      }
    },
    [selectOption],
  );

  const triggerBorder = error
    ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
    : "border-[#151515]/10 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10";

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className={[
          "flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm outline-none transition-colors",
          triggerBorder,
          !selectedOption ? "text-[#151515]/30" : "text-[#151515]",
          className,
        ].join(" ")}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="truncate text-left">
          {selectedOption ? selectedOption.label : placeholder ?? "Select…"}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 flex-shrink-0 text-[#151515]/35 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {name ? (
        <input type="hidden" name={name} value={selectedValue} required={required} />
      ) : null}

      {open
        ? createPortal(
            <div ref={panelRef}>
              <div
                role="listbox"
                className="fixed z-[9999] max-h-[280px] min-w-[120px] overflow-y-auto rounded-[10px] border border-[#151515]/10 bg-white p-1 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]"
                style={{
                  top: placement.top,
                  left: placement.left,
                  minWidth: placement.minWidth,
                }}
              >
                {options.length === 0 ? (
                  <p className="px-3 py-2 text-xs text-[#151515]/40">
                    No options available
                  </p>
                ) : (
                  options.map((option) => {
                    const isSelected = option.value === selectedValue;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={-1}
                        className={[
                          "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                          isSelected
                            ? "bg-[#3b82f6]/8 font-semibold text-[#3b82f6]"
                            : "text-[#151515] hover:bg-[#151515]/4",
                        ].join(" ")}
                        onClick={() => selectOption(option.value)}
                        onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                      >
                        {option.label}
                        {isSelected ? (
                          <Check className="h-4 w-4 flex-shrink-0" strokeWidth={3} />
                        ) : null}
                      </button>
                    );
                  })
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
