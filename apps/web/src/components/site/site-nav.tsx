import Link from "next/link";

import { primaryActions, publicNavigation } from "@/lib/site";

import { BrandLogo } from "./logo";
import { MobileNav } from "./mobile-nav";

type SiteNavProps = {
  variant?: "blue" | "light";
};

export function SiteNav({ variant = "blue" }: SiteNavProps) {
  const isBlue = variant === "blue";

  return (
    <header
      className={
        isBlue
          ? "relative z-30 bg-[#1936D4] text-white"
          : "relative z-30 border-b border-[#151515]/10 bg-[#FFFAF0] text-[#151515]"
      }
    >
      <nav className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-5 md:px-10">
        <BrandLogo />

        <div className="hidden items-center gap-2 md:flex">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isBlue
                  ? "rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#1936D4] active:scale-[0.98]"
                  : "rounded-full border border-[#151515]/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#151515] transition-colors hover:bg-[#1936D4] hover:text-white active:scale-[0.98]"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={primaryActions.call.href}
            className={
              isBlue
                ? "hidden min-h-11 items-center rounded-full border border-white px-5 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#1936D4] active:scale-[0.98] sm:inline-flex"
                : "hidden min-h-11 items-center rounded-full border border-[#1936D4] px-5 py-2 text-xs font-black uppercase tracking-wide text-[#1936D4] transition-colors hover:bg-[#1936D4] hover:text-white active:scale-[0.98] sm:inline-flex"
            }
          >
            {primaryActions.call.label}
          </Link>
          <MobileNav variant={variant} />
        </div>
      </nav>
    </header>
  );
}
