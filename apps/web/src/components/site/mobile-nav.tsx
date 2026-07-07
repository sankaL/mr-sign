"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  primaryActions,
  primaryNavigation,
  secondaryNavigation,
} from "@/lib/site";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigationItems = [...primaryNavigation, ...secondaryNavigation];

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[0.45rem] border border-[var(--line)] text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white active:scale-[0.98]"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full border-b border-[var(--line)] bg-white p-5 text-[var(--ink)] shadow-[0_20px_45px_rgba(7,26,58,0.12)]">
          <div className="grid gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 border-b border-[var(--line)] px-2 py-3 text-sm font-bold transition-colors hover:text-[var(--accent-amber)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={primaryActions.call.href}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[0.45rem] bg-[var(--ink)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.06em] !text-white transition-transform hover:-translate-y-0.5 hover:!text-white active:translate-y-0"
            onClick={() => setIsOpen(false)}
          >
            {primaryActions.call.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
