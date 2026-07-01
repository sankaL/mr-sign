import { Factory, MapPin, Phone, Wrench } from "lucide-react";
import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { aboutPage, siteContact } from "@/lib/site";
import { buildContentPageMetadata } from "@/lib/seo";

export const metadata = buildContentPageMetadata(aboutPage);

const highlights = [
  {
    title: "Signs first",
    description:
      "The shop is focused on custom signage, illuminated signs, vehicle graphics, banners, wall graphics, and sign service work.",
    icon: Factory,
  },
  {
    title: "In-house manufacturing",
    description:
      "Production stays practical and local, with manufacturing and service support handled through the Vaughan shop.",
    icon: Wrench,
  },
  {
    title: "Across the GTA",
    description:
      "Mr. Sign and Print supports businesses throughout Vaughan and the Greater Toronto Area.",
    icon: MapPin,
  },
];

export default function AboutUsPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={aboutPage.eyebrow}
          title={aboutPage.headline}
          description={aboutPage.subheadline}
        />
        <section className="bg-[#FFFAF0] px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                Vaughan shop
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight md:text-3xl">
                Providing signs, printing, manufacturing, and services across
                the GTA.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-6 text-[#151515]/68">
                Customers can call, email, or visit the shop to talk through the
                product, size, material, timing, installation, and service
                details for their project.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={siteContact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98]"
                >
                  Call the shop
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-[#151515]/10 bg-white p-5"
                  >
                    <Icon
                      className="h-5 w-5 text-[#E51B23]"
                      strokeWidth={2.5}
                    />
                    <h3 className="mt-4 text-lg font-black uppercase leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#151515]/65">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <CtaSection title="Ready to Price a Sign, Print Job, or Services?" />
      </main>
    </SiteShell>
  );
}
