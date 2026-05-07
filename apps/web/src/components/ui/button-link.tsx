import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import Link from "next/link";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
};

const variants = {
  primary: "border-[#E51B23] bg-[#E51B23] hover:bg-[#151515]",
  secondary: "border-[#FFF200] bg-[#FFF200] hover:bg-white",
  dark: "border-[#151515] bg-[#151515] hover:bg-[#1936D4]",
};

const variantStyles: Record<
  NonNullable<ButtonLinkProps["variant"]>,
  CSSProperties
> = {
  primary: { color: "#FFFFFF" },
  secondary: { color: "#151515" },
  dark: { color: "#FFFFFF" },
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  style,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-3 text-xs font-black uppercase tracking-wide transition-colors active:scale-[0.98] ${variants[variant]} ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </Link>
  );
}
