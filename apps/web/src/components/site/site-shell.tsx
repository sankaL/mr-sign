import type { ReactNode } from "react";

import { SiteFooter } from "./footer";
import { SiteNav } from "./site-nav";

type SiteShellProps = {
  children: ReactNode;
  navVariant?: "blue" | "light";
};

export function SiteShell({ children, navVariant = "light" }: SiteShellProps) {
  return (
    <div className="min-h-[100dvh] bg-[#FFFAF0] text-[#151515]">
      <SiteNav variant={navVariant} />
      {children}
      <SiteFooter />
    </div>
  );
}
