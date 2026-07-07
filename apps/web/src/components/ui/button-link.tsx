import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "accent" | "inverse";
};

const variants = {
  primary:
    "border-[var(--ink)] bg-[var(--ink)] !text-white hover:-translate-y-0.5 hover:!text-white",
  secondary:
    "border-[var(--line)] bg-transparent !text-[var(--ink)] hover:border-[var(--ink)] hover:bg-white hover:!text-[var(--ink)]",
  dark: "border-[var(--ink)] bg-[var(--ink)] !text-white hover:-translate-y-0.5 hover:!text-white",
  accent:
    "border-[var(--accent-amber)] bg-[var(--accent-amber)] !text-white hover:-translate-y-0.5 hover:brightness-95 hover:!text-white",
  inverse:
    "border-white/60 bg-transparent !text-white hover:border-white hover:bg-white hover:!text-[var(--ink)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.45rem] border px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.055em] transition-all active:translate-y-0 active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight
        className="h-3.5 w-3.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </Link>
  );
}
