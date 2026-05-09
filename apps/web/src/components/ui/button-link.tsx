import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
};

const variants = {
  primary:
    "border-[#E51B23] bg-[#E51B23] !text-white hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white",
  secondary:
    "border-[#CCFF00] bg-[#CCFF00] !text-[#151515] hover:bg-white hover:!text-[#151515] focus-visible:bg-white focus-visible:!text-[#151515]",
  dark: "border-[#151515] bg-[#151515] !text-white hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white",
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
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-3 text-xs font-black uppercase tracking-wide transition-colors active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
