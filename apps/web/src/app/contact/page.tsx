import Link from "next/link";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { GoogleMapEmbed } from "@/components/site/google-map-embed";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { businessHours, contactPage, siteContact } from "@/lib/site";
import { buildContentPageMetadata } from "@/lib/seo";

export const metadata = buildContentPageMetadata(contactPage);

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={contactPage.eyebrow}
          title={contactPage.headline}
          description={contactPage.subheadline}
        />
        <section className="px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid content-start gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Reach us directly
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
                  Call, email, or visit the Vaughan shop.
                </h2>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#151515]/66">
                  Share the service, size, quantity, timing, and artwork details
                  when you contact the shop so the team can guide the next step.
                </p>
              </div>

              <div className="grid gap-3">
                <Link
                  href={siteContact.phoneHref}
                  className="flex items-center gap-3 rounded-lg border border-[#151515]/10 bg-white px-4 py-3 text-sm font-black transition-colors hover:border-[#0B1F55] hover:text-[#0B1F55]"
                >
                  <Phone className="h-4 w-4 text-[#E51B23]" />
                  {siteContact.phone} or {siteContact.secondaryPhone}
                </Link>
                <Link
                  href={siteContact.emailHref}
                  className="flex items-center gap-3 rounded-lg border border-[#151515]/10 bg-white px-4 py-3 text-sm font-black transition-colors hover:border-[#0B1F55] hover:text-[#0B1F55]"
                >
                  <Mail className="h-4 w-4 text-[#E51B23]" />
                  {siteContact.email}
                </Link>
                <Link
                  href={siteContact.directionsUrl}
                  className="flex items-center gap-3 rounded-lg border border-[#151515]/10 bg-white px-4 py-3 text-sm font-black transition-colors hover:border-[#0B1F55] hover:text-[#0B1F55]"
                >
                  <Navigation className="h-4 w-4 text-[#E51B23]" />
                  Get directions
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              <GoogleMapEmbed
                title="Google map showing Mr. Sign and Print at 399 Four Valley Dr. Unit 3 in Vaughan"
                className="min-h-72"
              />

              <div className="grid gap-5 rounded-2xl border border-[#151515]/10 bg-white p-5 md:grid-cols-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                    Address
                  </p>
                  <p className="mt-3 flex gap-3 text-sm font-bold leading-6 text-[#151515]/70">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1F55]" />
                    {siteContact.address}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                    Hours
                  </p>
                  <div className="mt-3 grid gap-1.5">
                    {businessHours.map((item) => (
                      <p
                        key={item.day}
                        className="flex justify-between gap-4 text-xs font-bold text-[#151515]/68"
                      >
                        <span>{item.day}</span>
                        <span className="text-right">{item.hours}</span>
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-xs font-black text-[#151515]">
                    <Clock className="h-4 w-4 text-[#0B1F55]" />
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
