import type { ReactNode } from "react";

import { SiteFooter } from "./footer";
import { SiteNav } from "./site-nav";

type SiteShellProps = {
  children: ReactNode;
  navVariant?: "blue" | "light";
};

export function SiteShell({ children, navVariant = "light" }: SiteShellProps) {
  return (
    <div className="min-h-[100dvh] bg-[var(--canvas)] text-[var(--ink)]">
      <SiteNav variant={navVariant} />
      <div id="main-content">{children}</div>
      <SiteFooter />
    </div>
  );
}
