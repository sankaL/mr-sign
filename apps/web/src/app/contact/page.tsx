import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import Link from "next/link";

import { GoogleMapEmbed } from "@/components/site/google-map-embed";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { buildContentPageMetadata } from "@/lib/seo";
import { businessHours, contactPage, siteContact } from "@/lib/site";

export const metadata = buildContentPageMetadata(contactPage);

const contactLinks = [
  {
    icon: Phone,
    eyebrow: "Phone",
    label: `${siteContact.phone} or ${siteContact.secondaryPhone}`,
    href: siteContact.phoneHref,
  },
  {
    icon: Mail,
    eyebrow: "Email",
    label: siteContact.email,
    href: siteContact.emailHref,
  },
  {
    icon: Navigation,
    eyebrow: "Visit",
    label: "Get directions",
    href: siteContact.directionsUrl,
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={contactPage.eyebrow}
          title={contactPage.headline}
          description={contactPage.subheadline}
        />

        <section className="section-space bg-white">
          <div className="site-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <aside className="self-start">
              <div className="pb-7">
                <p className="eyebrow">Direct contact</p>
                <h2 className="font-display mt-3 max-w-[12ch] text-3xl leading-tight tracking-[-0.035em] text-[var(--ink)]">
                  Call, email, or come by.
                </h2>
              </div>
              <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {contactLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex min-h-24 items-center gap-4 py-5 text-[var(--ink)] transition-colors hover:text-[var(--accent-amber)]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--accent-amber)] transition-transform duration-200 group-hover:-translate-y-0.5">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[var(--body-copy)]/65">
                          {item.eyebrow}
                        </span>
                        <span className="mt-1 block text-sm font-bold leading-6">
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </aside>

            <div className="grid gap-5">
              <GoogleMapEmbed
                title="Google map showing Mr. Sign and Print at 399 Four Valley Dr. Unit 3 in Vaughan"
                className="min-h-80 rounded-[0.75rem]"
              />

              <div className="editorial-panel grid gap-7 p-6 md:grid-cols-2 md:p-8">
                <div>
                  <p className="eyebrow">Address</p>
                  <p className="mt-4 flex gap-3 text-sm font-semibold leading-6 text-[var(--body-copy)]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink)]" />
                    {siteContact.address}
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Hours</p>
                  <div className="mt-4 grid gap-2">
                    {businessHours.map((item) => (
                      <p
                        key={item.day}
                        className="flex justify-between gap-4 text-xs font-semibold text-[var(--body-copy)]"
                      >
                        <span>{item.day}</span>
                        <span className="text-right">{item.hours}</span>
                      </p>
                    ))}
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
                    <Clock className="h-4 w-4" />
                    Call ahead for holiday hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CtaSection title="Ready to talk through a project?" />
      </main>
    </SiteShell>
  );
}
