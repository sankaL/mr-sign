import Link from "next/link";

import { contactMethods } from "@/lib/site";

import { BrandLogo } from "./logo";

export function SiteFooter() {
  const leftLinks = [
    { href: "/signs", label: "Signs" },
    { href: "/printing", label: "Printing" },
    { href: "/services", label: "Services" },
  ];
  const rightLinks = [
    { href: "/gallery", label: "Gallery" },
    { href: "/location", label: "Location" },
    { href: "/faqs", label: "FAQs" },
  ];

  return (
    <footer className="border-t border-[#151515]/10 bg-[#151515] px-5 py-12 text-white md:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-white/70">
            Providing signs, printing, manufacturing, and services across the
            GTA
          </p>
        </div>

        <div>
          <div className="mt-4 grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              {leftLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-bold text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="grid gap-2">
              {rightLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-bold text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.22em] text-[#CCFF00]">
            Contact
          </h2>
          <div className="mt-4 grid gap-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Link
                  key={method.label}
                  href={method.href}
                  className="flex items-center gap-2 text-sm font-bold text-white/75 transition-colors hover:text-white"
                >
                  <Icon className="h-4 w-4 text-[#E51B23]" />
                  {method.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1440px] border-t border-white/10 pt-6 text-center text-xs font-semibold text-white/50">
        &copy; {new Date().getFullYear()} Mr. Sign and Print. All rights
        reserved.
      </div>
    </footer>
  );
}
