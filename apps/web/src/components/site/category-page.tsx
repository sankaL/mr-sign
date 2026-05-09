import {
  getCategory,
  getServicesByCategory,
  type CategorySlug,
} from "@mrsign/content";
import { ClipboardList, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/ui/cta-section";
import { primaryActions, siteContact } from "@/lib/site";

import { ContentImage } from "./content-image";
import { ServiceTeaserCard } from "./service-teaser-card";
import { SiteShell } from "./site-shell";

type CategoryPageProps = {
  categorySlug: CategorySlug;
};

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const services = getServicesByCategory(categorySlug);

  return (
    <SiteShell>
      <main>
        <section className="bg-[#1936D4] px-5 py-10 text-white md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF00]">
                {category.eyebrow}
              </p>
              <h1 className="mt-3 text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.92] tracking-tight">
                {category.headline}
              </h1>
              <p className="mt-4 max-w-[62ch] text-sm font-semibold leading-6 text-white/82 md:text-base md:leading-7">
                {category.subheadline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={primaryActions.quote.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98]"
                >
                  {primaryActions.quote.label}
                  <ClipboardList className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  href={siteContact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:!text-[#1936D4] focus-visible:bg-white focus-visible:!text-[#1936D4] active:scale-[0.98]"
                >
                  Call the shop
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            <ContentImage
              asset={category.image}
              priority
              className="aspect-[16/11] rounded-[2rem] border border-white/20 shadow-[0_24px_70px_rgba(13,31,143,0.28)]"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </section>

        <section className="bg-[#FFFAF0] px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-[1440px]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                {category.name}
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
                {category.gridHeading}
              </h2>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-[#151515]/66">
                {category.gridSubheading}
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceTeaserCard
                  key={service.route}
                  service={service}
                  prominent={Boolean(service.isFeatured) || index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        <CtaSection
          title={`Ready to price ${category.name.toLowerCase()} work?`}
        />
      </main>
    </SiteShell>
  );
}
