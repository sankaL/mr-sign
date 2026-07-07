import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { siteContact } from "@/lib/site";

import { BrandLogo } from "./logo";

const footerLinks = [
  { href: "/signs", label: "Signs" },
  { href: "/printing", label: "Printing" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const contactItems = [
    { icon: Phone, label: siteContact.phone, href: siteContact.phoneHref },
    { icon: Mail, label: siteContact.email, href: siteContact.emailHref },
    { icon: MapPin, label: siteContact.shortAddress, href: "/location" },
    {
      icon: Clock,
      label: "Monday to Friday, 9:00 AM to 5:00 PM",
      href: "/location",
    },
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-white text-[var(--ink)]">
      <div className="border-b border-[var(--line)]">
        <div className="site-container grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex min-h-20 items-center gap-3 bg-white px-5 py-4 text-xs font-semibold leading-5 text-[var(--body-copy)] transition-colors hover:text-[var(--accent-amber)]"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-[var(--ink)]"
                  strokeWidth={1.7}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="site-container grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-sm text-sm font-medium leading-6 text-[var(--body-copy)]">
            Providing signs, printing, manufacturing, and services across the
            GTA
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[var(--body-copy)] transition-colors hover:text-[var(--accent-amber)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-[var(--body-copy)]">
            <Link
              href={siteContact.phoneHref}
              className="hover:text-[var(--accent-amber)]"
            >
              {siteContact.phone}
            </Link>
            <Link
              href={siteContact.emailHref}
              className="hover:text-[var(--accent-amber)]"
            >
              {siteContact.email}
            </Link>
            <Link href="/location" className="hover:text-[var(--accent-amber)]">
              {siteContact.shortAddress}
            </Link>
          </div>
        </div>
      </div>

      <div className="site-container border-t border-[var(--line)] py-6 text-center text-[0.7rem] font-medium text-[var(--body-copy)]">
        &copy; {new Date().getFullYear()} Mr. Sign and Print. All rights
        reserved.
      </div>
    </footer>
  );
}
