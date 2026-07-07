import { Clock, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { GoogleMapEmbed } from "@/components/site/google-map-embed";
import { SiteShell } from "@/components/site/site-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { buildContentPageMetadata, buildLocalBusinessSchema } from "@/lib/seo";
import { businessHours, locationPage, siteContact } from "@/lib/site";

export const metadata = buildContentPageMetadata(locationPage);

const localBusinessSchema = buildLocalBusinessSchema();

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

        <section className="section-space bg-white">
          <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Address</p>
              <h2 className="section-title mt-3">{siteContact.address}</h2>
              <p className="body-copy mt-5">
                We serve {siteContact.serviceArea}. Call ahead for current
                pricing, pickup details, and production questions.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={siteContact.directionsUrl}>
                  Get directions
                </ButtonLink>
                <ButtonLink href={siteContact.phoneHref} variant="secondary">
                  Call now
                </ButtonLink>
              </div>

              <div className="mt-10 border-t border-[var(--line)] pt-8">
                <p className="eyebrow">Hours</p>
                <div className="mt-5 divide-y divide-[var(--line)]">
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <span className="text-xs font-extrabold uppercase tracking-[0.06em] text-[var(--ink)]">
                        {item.day}
                      </span>
                      <span className="text-right text-sm font-medium text-[var(--body-copy)]">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <GoogleMapEmbed
                title="Google map showing Mr. Sign and Print at 399 Four Valley Dr. Unit 3 in Vaughan"
                className="min-h-[28rem] rounded-[0.75rem]"
              />

              <div className="editorial-panel grid gap-4 p-5 sm:grid-cols-3">
                <Link
                  href={siteContact.phoneHref}
                  className="flex items-center gap-3 text-sm font-bold text-[var(--ink)] transition-colors hover:text-[var(--accent-amber)]"
                >
                  <Phone className="h-4 w-4" />
                  {siteContact.phone}
                </Link>
                <Link
                  href={siteContact.emailHref}
                  className="flex items-center gap-3 text-sm font-bold text-[var(--ink)] transition-colors hover:text-[var(--accent-amber)]"
                >
                  <Mail className="h-4 w-4" />
                  {siteContact.email}
                </Link>
                <p className="flex items-center gap-3 text-sm font-bold text-[var(--ink)]">
                  <Clock className="h-4 w-4" />
                  Mon–Fri, 9 AM–5 PM
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
