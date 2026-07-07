"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { publicNavigation } from "@/lib/site";

import { BrandLogo } from "./logo";
import { MobileNav } from "./mobile-nav";

type SiteNavProps = {
  variant?: "blue" | "light";
};

export function SiteNav({ variant = "light" }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <header
      data-variant={variant}
      className="sticky inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-white/95 text-[var(--ink)] backdrop-blur-xl"
    >
      <nav className="site-container relative flex min-h-[5.25rem] items-center justify-between gap-4 py-3">
        <BrandLogo />

        <div className="hidden items-center gap-7 lg:flex">
          {publicNavigation.map((item) => {
            const isCurrent =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className="relative inline-flex min-h-11 items-center text-[0.72rem] font-bold tracking-[-0.01em] text-[var(--ink)] transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--accent-amber)] after:transition-transform hover:text-[var(--accent-amber)] hover:after:scale-x-100 aria-[current=page]:text-[var(--accent-amber)] aria-[current=page]:after:scale-x-100"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-[0.45rem] bg-[var(--ink)] px-5 py-2.5 text-[0.66rem] font-extrabold uppercase tracking-[0.06em] !text-white transition-transform hover:-translate-y-0.5 hover:!text-white active:translate-y-0 sm:inline-flex"
          >
            Project pricing
          </Link>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
