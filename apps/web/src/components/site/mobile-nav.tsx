"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  primaryActions,
  primaryNavigation,
  secondaryNavigation,
} from "@/lib/site";

type MobileNavProps = {
  variant?: "blue" | "light";
};

export function MobileNav({ variant = "blue" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isBlue = variant === "blue";
  const navigationItems = [...primaryNavigation, ...secondaryNavigation];

  const closeNavigation = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        className={
          isBlue
            ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 active:scale-[0.98]"
            : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#151515]/20 text-[#151515] transition-colors hover:bg-[#151515]/5 active:scale-[0.98]"
        }
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <div
          className={
            isBlue
              ? "absolute left-4 right-4 top-[4.75rem] rounded-[1.75rem] border border-white/20 bg-[#1028A8]/95 p-4 text-white shadow-[0_18px_40px_rgba(13,31,143,0.35)] backdrop-blur"
              : "absolute left-4 right-4 top-[4.75rem] rounded-[1.75rem] border border-[#151515]/10 bg-[#FFFAF0]/95 p-4 text-[#151515] shadow-[0_18px_40px_rgba(21,21,21,0.14)] backdrop-blur"
          }
        >
          <div className="grid gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isBlue
                    ? "min-h-11 rounded-full px-4 py-3 text-sm font-black uppercase tracking-wide transition-colors hover:bg-white hover:!text-[#1936D4] focus-visible:bg-white focus-visible:!text-[#1936D4]"
                    : "min-h-11 rounded-full px-4 py-3 text-sm font-black uppercase tracking-wide transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white"
                }
                onClick={closeNavigation}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={primaryActions.quote.href}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#E51B23] px-5 py-3 text-sm font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#C9455A] hover:!text-white focus-visible:bg-[#C9455A] focus-visible:!text-white active:scale-[0.98]"
            onClick={closeNavigation}
          >
            {primaryActions.quote.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
