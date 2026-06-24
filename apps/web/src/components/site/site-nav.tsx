"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  primaryActions,
  primaryNavigation,
  secondaryNavigation,
} from "@/lib/site";

import { BrandLogo } from "./logo";
import { MobileNav } from "./mobile-nav";

type SiteNavProps = {
  variant?: "blue" | "light";
};

export function SiteNav({ variant = "blue" }: SiteNavProps) {
  const isBlue = variant === "blue";
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const updateHeaderHeight = () => {
      setHeaderHeight(header.getBoundingClientRect().height);
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={
          isBlue
            ? "fixed inset-x-0 top-0 z-50 bg-[#1936D4] text-white"
            : "fixed inset-x-0 top-0 z-50 border-b border-[#151515]/10 bg-[#FFFAF0] text-[#151515]"
        }
      >
        <nav className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-5 md:px-10">
          <BrandLogo />

          <div className="hidden items-center gap-2 md:flex">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isBlue
                    ? "inline-flex min-h-9 items-center rounded-full border border-white/30 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:!text-[#151515] focus-visible:border-[#CCFF00] focus-visible:bg-[#CCFF00] focus-visible:!text-[#151515] active:scale-[0.98]"
                    : "inline-flex min-h-9 items-center rounded-full border border-[#151515]/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#151515] transition-colors hover:border-[#1936D4] hover:bg-[#1936D4] hover:!text-white focus-visible:border-[#1936D4] focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98]"
                }
              >
                {item.label}
              </Link>
            ))}
            <details className="group relative">
              <summary
                className={
                  isBlue
                    ? "inline-flex min-h-9 cursor-pointer list-none items-center gap-1 rounded-full border border-white/30 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:!text-[#151515] focus-visible:border-[#CCFF00] focus-visible:bg-[#CCFF00] focus-visible:!text-[#151515] active:scale-[0.98] [&::-webkit-details-marker]:hidden"
                    : "inline-flex min-h-9 cursor-pointer list-none items-center gap-1 rounded-full border border-[#151515]/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#151515] transition-colors hover:border-[#1936D4] hover:bg-[#1936D4] hover:!text-white focus-visible:border-[#1936D4] focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98] [&::-webkit-details-marker]:hidden"
                }
                aria-haspopup="true"
              >
                More
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
              </summary>
              <div className="absolute left-0 top-full z-40 min-w-48 pt-3">
                <div
                  className={
                    isBlue
                      ? "grid gap-1 rounded-[1.25rem] border border-white/20 bg-[#1028A8]/95 p-2 text-white shadow-[0_18px_40px_rgba(13,31,143,0.35)] backdrop-blur"
                      : "grid gap-1 rounded-[1.25rem] border border-[#151515]/10 bg-[#FFFAF0]/95 p-2 text-[#151515] shadow-[0_18px_40px_rgba(21,21,21,0.14)] backdrop-blur"
                  }
                >
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        isBlue
                          ? "rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-[#CCFF00] hover:!text-[#151515] focus-visible:bg-[#CCFF00] focus-visible:!text-[#151515]"
                          : "rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white"
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={primaryActions.call.href}
              className={
                isBlue
                  ? "hidden min-h-12 items-center rounded-full border border-white px-6 py-2.5 text-xs font-black uppercase tracking-wide text-white transition-colors hover:border-[#E51B23] hover:bg-[#E51B23] hover:!text-white focus-visible:border-[#E51B23] focus-visible:bg-[#E51B23] focus-visible:!text-white active:scale-[0.98] sm:inline-flex"
                  : "hidden min-h-12 items-center rounded-full border border-[#1936D4] px-6 py-2.5 text-xs font-black uppercase tracking-wide text-[#1936D4] transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98] sm:inline-flex"
              }
            >
              {primaryActions.call.label}
            </Link>
            <MobileNav variant={variant} />
          </div>
        </nav>
      </header>
      <div style={{ height: headerHeight }} aria-hidden="true" />
    </>
  );
}
