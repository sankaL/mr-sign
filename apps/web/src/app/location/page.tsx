import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { businessHours, locationPage, siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: locationPage.seo.title,
  description: locationPage.seo.description,
  openGraph: {
    title: locationPage.seo.socialTitle,
    description: locationPage.seo.socialDescription,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteContact.businessName,
  telephone: siteContact.phone,
  email: siteContact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteContact.streetAddress,
    addressLocality: siteContact.locality,
    addressRegion: siteContact.region,
    postalCode: siteContact.postalCode,
    addressCountry: siteContact.country,
  },
  openingHoursSpecification: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ].map((dayOfWeek) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek,
    opens: "09:00",
    closes: "17:00",
  })),
};

export default function LocationPage() {
  return (
    <SiteShell>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <PageHeader
          eyebrow={locationPage.eyebrow}
          title={locationPage.headline}
          description={locationPage.subheadline}
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="grid content-start gap-6">
              <section className="rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Address
                </p>
                <h2 className="mt-4 text-3xl font-black uppercase leading-none">
                  {siteContact.address}
                </h2>
                <p className="mt-5 text-sm font-semibold leading-6 text-[#151515]/65">
                  We serve {siteContact.serviceArea}. Call ahead for quote
                  timing, pickup details, and production questions.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={siteContact.directionsUrl}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1936D4] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98]"
                  >
                    Get directions
                    <Navigation className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                  <Link
                    href={siteContact.phoneHref}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#151515]/15 px-5 py-3 text-xs font-black uppercase tracking-wide text-[#151515] transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98]"
                  >
                    Call now
                    <Phone className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Hours
                </p>
                <div className="mt-5 grid gap-3">
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between gap-4 border-b border-[#151515]/10 pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-sm font-black uppercase tracking-wide">
                        {item.day}
                      </span>
                      <span className="text-right text-sm font-bold text-[#151515]/66">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid gap-6">
              <Link
                href={siteContact.directionsUrl}
                className="relative min-h-96 overflow-hidden rounded-[2rem] border border-[#151515]/10 bg-[#CCFF00] p-6 transition-transform hover:-translate-y-1 active:scale-[0.99]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#15151518_1px,transparent_1px),linear-gradient(to_bottom,#15151518_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                    <MapPin className="h-3.5 w-3.5" />
                    Vaughan
                  </span>
                  <div>
                    <p className="text-5xl font-black uppercase leading-none md:text-6xl">
                      Four Valley Dr.
                    </p>
                    <p className="mt-4 max-w-sm text-sm font-black uppercase leading-5 tracking-wide">
                      Unit 3, Vaughan, Ontario L4K 5X5.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#151515] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                    Open map
                    <Navigation className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>

              <div className="grid gap-3 rounded-[2rem] border border-[#151515]/10 bg-white p-6">
                <Link
                  href={siteContact.phoneHref}
                  className="flex items-center gap-3 text-sm font-black transition-colors hover:text-[#1936D4]"
                >
                  <Phone className="h-5 w-5 text-[#E51B23]" />
                  {siteContact.phone} or {siteContact.secondaryPhone}
                </Link>
                <Link
                  href={siteContact.emailHref}
                  className="flex items-center gap-3 text-sm font-black transition-colors hover:text-[#1936D4]"
                >
                  <Mail className="h-5 w-5 text-[#E51B23]" />
                  {siteContact.email}
                </Link>
                <p className="flex items-center gap-3 text-sm font-black">
                  <Clock className="h-5 w-5 text-[#E51B23]" />
                  Monday to Friday, 9:00 AM to 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>
        <CtaSection
          title="Planning a pickup or shop visit?"
          description={`Call ahead or get directions to ${siteContact.shortAddress}.`}
        />
      </main>
    </SiteShell>
  );
}
