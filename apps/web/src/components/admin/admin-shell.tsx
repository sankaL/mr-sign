import type { ReactNode } from "react";
import Link from "next/link";

import { adminLogout } from "@/app/actions/admin-logout";
import { adminNavigation, siteContact } from "@/lib/site";

type AdminShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  adminName?: string | null;
};

export function AdminShell({
  title,
  description,
  children,
  adminName,
}: AdminShellProps) {
  return (
    <div className="min-h-[100dvh] bg-[#F3F4F6] text-[#151515]">
      <header className="border-b border-[#151515]/10 bg-[#151515] px-5 py-4 text-white md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#CCFF00]">
              Admin portal
            </p>
            <h1 className="mt-2 text-2xl font-black uppercase leading-none">
              {siteContact.businessName}
            </h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:!text-[#151515] focus-visible:bg-white focus-visible:!text-[#151515] active:scale-[0.98]"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            {adminName ? (
              <form action={adminLogout}>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E51B23] bg-[#E51B23] px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:!text-[#E51B23] focus-visible:bg-white focus-visible:!text-[#E51B23] active:scale-[0.98]"
                >
                  Log out
                </button>
              </form>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="px-5 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-[1152px]">
          <div className="mb-8">
            {adminName ? (
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1936D4]">
                Signed in as {adminName}
              </p>
            ) : null}
            <h2 className="mt-3 text-4xl font-black uppercase leading-none md:text-6xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#151515]/65">
              {description}
            </p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
