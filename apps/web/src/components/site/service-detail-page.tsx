import {
  getCategory,
  getRelatedServices,
  getService,
  type CategorySlug,
} from "@mrsign/content";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/ui/cta-section";
import { primaryActions, siteContact } from "@/lib/site";

import { ContentImage } from "./content-image";
import { PricingSummary } from "./pricing-summary";
import { ServiceTeaserCard } from "./service-teaser-card";
import { SiteShell } from "./site-shell";

type ServiceDetailPageProps = {
  categorySlug: CategorySlug;
  serviceSlug: string;
};

export function ServiceDetailPage({
  categorySlug,
  serviceSlug,
}: ServiceDetailPageProps) {
  const category = getCategory(categorySlug);
  const service = getService(categorySlug, serviceSlug);

  if (!category || !service) {
    notFound();
  }

  const related = getRelatedServices({
    categorySlug: service.categorySlug,
    serviceSlug: service.slug,
  });

  return (
    <SiteShell>
      <main>
        <section className="bg-[#151515] px-5 py-6 text-white md:px-10 md:py-8">
          <div className="mx-auto max-w-[1440px]">
            <Link
              href={category.route}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white/70 transition-colors hover:text-[#CCFF00]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              Back to {category.name}
            </Link>
          </div>
        </section>

        <section className="bg-[#151515] px-5 pb-14 text-white md:px-10 md:pb-20">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#CCFF00]">
                {category.name}
              </p>
              <h1 className="mt-4 text-[clamp(3.1rem,7.5vw,7rem)] font-black uppercase leading-[0.88] tracking-tight">
                {service.headline}
              </h1>
              <p className="mt-6 max-w-[62ch] text-base font-semibold leading-7 text-white/78 md:text-lg">
                {service.shortDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={primaryActions.quote.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98]"
                >
                  Request a quote
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  href={siteContact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:!text-[#151515] focus-visible:bg-white focus-visible:!text-[#151515] active:scale-[0.98]"
                >
                  Call the shop
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            <ContentImage
              asset={service.image}
              priority
              className="aspect-[16/11] rounded-[2rem] border border-white/12 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </section>

        <section className="bg-[#FFFAF0] px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[1fr_0.76fr]">
            <article className="rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
                Service details
              </p>
              <div className="mt-5 grid gap-5">
                {service.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base font-semibold leading-7 text-[#151515]/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <div className="grid content-start gap-6">
              <PricingSummary pricing={service.pricing} />

              <section className="rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  What we handle
                </p>
                <ul className="mt-5 grid gap-3">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex gap-3 text-sm font-bold leading-6 text-[#151515]/72"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-[#151515]">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="bg-white px-5 py-14 md:px-10 md:py-20">
            <div className="mx-auto max-w-[1440px]">
              <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
                    Related services
                  </p>
                  <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">
                    Often quoted together
                  </h2>
                </div>
                <p className="max-w-3xl text-sm font-semibold leading-6 text-[#151515]/66 md:text-base md:leading-7">
                  These services are commonly part of the same sign, print, or
                  design conversation.
                </p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((relatedService) => (
                  <ServiceTeaserCard
                    key={relatedService.route}
                    service={relatedService}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <CtaSection title={`Ready to quote ${service.name.toLowerCase()}?`} />
      </main>
    </SiteShell>
  );
}
