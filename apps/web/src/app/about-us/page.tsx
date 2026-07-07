import { Factory, MapPin, Wrench } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { aboutPage } from "@/lib/site";
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
        <section className="section-space bg-white">
          <div className="site-container">
            <div className="grid overflow-hidden border-y border-[var(--line)] md:grid-cols-3">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group border-b border-[var(--line)] p-7 last:border-b-0 md:min-h-72 md:border-r md:border-b-0 md:p-9 md:last:border-r-0 lg:min-h-80 lg:p-11"
                  >
                    <div className="flex items-center justify-between gap-5">
                      <span className="text-[0.65rem] font-extrabold tracking-[0.16em] text-[var(--body-copy)]/60">
                        0{index + 1}
                      </span>
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] text-[var(--accent-amber)] transition-transform duration-200 group-hover:-translate-y-1">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                    </div>
                    <h3 className="font-display mt-12 max-w-[13ch] text-2xl leading-tight tracking-[-0.025em] text-[var(--ink)] lg:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[34ch] text-sm font-medium leading-7 text-[var(--body-copy)]">
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
