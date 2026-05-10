"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X, LogOut } from "lucide-react";

import { adminLogout } from "@/app/actions/admin-logout";
import { adminNavigation } from "@/lib/site";
import { AdminBrandLogo } from "@/components/admin/admin-brand-logo";

type AdminSidebarProps = {
  adminName?: string | null;
  children: ReactNode;
};

export function AdminSidebarLayout({
  adminName,
  children,
}: AdminSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="px-5 pb-5 pt-5">
        <AdminBrandLogo />
        <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
          Admin portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-all ${
                active
                  ? "bg-[#CCFF00] font-semibold"
                  : "text-[#ffffffb3] font-normal hover:bg-white/10 hover:text-[#ffffff]"
              }`}
              style={active ? { color: "#000" } : undefined}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${active ? "" : "text-white/70 group-hover:text-white"}`}
                style={active ? { color: "#000" } : undefined}
                strokeWidth={2}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-4 py-4">
        {adminName ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-xs font-black text-[#151515]">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-semibold text-white">
                  {adminName}
                </p>
              </div>
            </div>
            <form action={adminLogout}>
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                title="Log out"
              >
                <LogOut className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );

  return (
    <div className="admin-layout">
      {/* Desktop sidebar */}
      <aside className="admin-sidebar hidden lg:flex lg:flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#151515] transition-transform duration-200 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
        {sidebarContent}
      </aside>

      {/* Main content area */}
      <div className="admin-content">
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 border-b border-[#151515]/8 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#151515]/10 text-[#151515]/70 transition-colors hover:bg-[#151515]/5"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
          <AdminBrandLogo />
        </div>
        {children}
      </div>
    </div>
  );
}
