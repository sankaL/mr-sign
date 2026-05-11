"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectDropdownProps = {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  align?: "left" | "right";
};

export function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  align = "left",
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Close on click outside */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const toggle = useCallback(
    (value: string) => {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange],
  );

  const clearAll = useCallback(() => {
    onChange([]);
    setOpen(false);
  }, [onChange]);

  return (
    <div className="admin-multiselect" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        className="admin-multiselect-trigger"
        data-open={String(open)}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {label}
        {selected.length > 0 ? (
          <span className="admin-multiselect-count">{selected.length}</span>
        ) : null}
        <ChevronDown className="admin-multiselect-chevron" strokeWidth={2} />
      </button>

      {open ? (
        <div
          className="admin-multiselect-panel"
          role="listbox"
          style={align === "right" ? { left: "auto", right: 0 } : undefined}
        >
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className="admin-multiselect-option"
                onClick={() => toggle(option.value)}
              >
                <span
                  className="admin-multiselect-checkbox"
                  data-checked={String(isSelected)}
                >
                  {isSelected ? (
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  ) : null}
                </span>
                {option.label}
              </button>
            );
          })}
          {selected.length > 0 ? (
            <button
              type="button"
              className="admin-multiselect-clear"
              onClick={clearAll}
            >
              Clear all
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
