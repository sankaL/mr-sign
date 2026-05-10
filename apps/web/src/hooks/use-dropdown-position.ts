"use client";

import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";

type Placement = {
  top: number;
  left?: number;
  right?: number;
  minWidth: number;
};

type UseDropdownPositionOptions = {
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  onClose?: () => void;
  align?: "left" | "auto";
};

export function useDropdownPosition({
  open,
  triggerRef,
  panelRef,
  onClose,
  align = "left",
}: UseDropdownPositionOptions) {
  const [placement, setPlacement] = useState<Placement>({
    top: 0,
    left: 0,
    minWidth: 0,
  });

  const recalc = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const minWidth = Math.max(rect.width, 210);
    const windowWidth = window.innerWidth;

    if (align === "auto" && rect.left + minWidth > windowWidth - 10) {
      setPlacement({
        top: rect.bottom + 4,
        right: windowWidth - rect.right,
        minWidth,
      });
    } else {
      setPlacement({
        top: rect.bottom + 4,
        left: rect.left,
        minWidth: align === "left" ? rect.width : minWidth,
      });
    }
  }, [triggerRef, align]);

  /* Reposition on scroll/resize while open */
  useEffect(() => {
    if (!open) return;
    recalc();
    window.addEventListener("scroll", recalc, true);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("scroll", recalc, true);
      window.removeEventListener("resize", recalc);
    };
  }, [open, recalc]);

  /* Close on click outside */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      onClose?.();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, triggerRef, panelRef, onClose]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return { placement, recalc };
}
