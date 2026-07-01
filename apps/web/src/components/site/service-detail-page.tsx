import {
  getCategory,
  getRelatedServices,
  type CategorySlug,
} from "@mrsign/content";
import { ArrowLeft, Check, FileText, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/ui/cta-section";
import { getPublicService } from "@/lib/public-services";
import { buildServiceSchema } from "@/lib/seo";
import { siteContact } from "@/lib/site";

import { ContentImage } from "./content-image";
import { ServiceTeaserCard } from "./service-teaser-card";
import { SiteShell } from "./site-shell";

type ServiceDetailPageProps = {
  categorySlug: CategorySlug;
  serviceSlug: string;
};

export async function ServiceDetailPage({
  categorySlug,
  serviceSlug,
}: ServiceDetailPageProps) {
  const category = getCategory(categorySlug);
  const service = await getPublicService(categorySlug, serviceSlug);

  if (!category || !service) {
    notFound();
  }

  const related = getRelatedServices({
    categorySlug: service.categorySlug,
    serviceSlug: service.slug,
  });
  const serviceSchema = buildServiceSchema(service);

  return (
    <SiteShell>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
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

        <section className="bg-[#151515] px-5 pb-10 text-white md:px-10 md:pb-14">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF00]">
                {category.name}
              </p>
              <h1 className="mt-3 text-[clamp(2.1rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight">
                {service.headline}
              </h1>
              <p className="mt-4 max-w-[62ch] text-sm font-semibold leading-6 text-white/78 md:text-base md:leading-7">
                {service.shortDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={siteContact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0B1F55] hover:!text-white focus-visible:bg-[#0B1F55] focus-visible:!text-white active:scale-[0.98]"
                >
                  Call the shop
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  href={siteContact.emailHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:!text-[#151515] focus-visible:bg-white focus-visible:!text-[#151515] active:scale-[0.98]"
                >
                  Email details
                  <Mail className="h-4 w-4" strokeWidth={2.5} />
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

        <section className="bg-[#FFFAF0] px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1152px]">
            {/* Section header */}
            <div className="mb-10 flex items-center gap-3 md:mb-14">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B1F55] text-white">
                <FileText className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                Service details
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
              {/* Body text */}
              <div>
                <div className="grid gap-5">
                  {service.body.map((paragraph, i) => (
                    <p
                      key={paragraph}
                      className={
                        i === 0
                          ? "border-l-2 border-[#CCFF00] pl-5 text-base font-semibold leading-7 text-[#151515]/80 md:text-[1.05rem]"
                          : "text-sm font-semibold leading-7 text-[#151515]/60 md:text-base"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {service.capabilities.length > 0 && (
                  <div className="mt-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                      What we handle
                    </p>
                    <ul className="mt-5 grid gap-3">
                      {service.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#151515]/75"
                        >
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-[#151515] shadow-[0_0_0_3px_rgba(204,255,0,0.18)]">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <aside className="rounded-2xl border border-[#151515]/10 bg-white p-6 md:p-8 lg:sticky lg:top-8 lg:self-start">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Contact the shop
                </p>
                <h2 className="mt-3 text-2xl font-black uppercase leading-tight">
                  Call or email for current details.
                </h2>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#151515]/66">
                  Share the product or service, size, quantity, material,
                  timing, and location details so the team can guide the next
                  step.
                </p>
                <div className="mt-6 grid gap-3">
                  <Link
                    href={siteContact.phoneHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#151515] hover:!text-white active:scale-[0.98]"
                  >
                    Call the shop
                    <Phone className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                  <Link
                    href={siteContact.emailHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#151515]/15 px-5 py-3 text-xs font-black uppercase tracking-wide text-[#151515] transition-colors hover:bg-[#151515] hover:!text-white active:scale-[0.98]"
                  >
                    Email details
                    <Mail className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="bg-white px-5 py-10 md:px-10 md:py-14">
            <div className="mx-auto max-w-[1440px]">
              <div className="max-w-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Related services
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
                  Often paired together
                </h2>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#151515]/66">
                  These services are commonly part of the same sign, print, or
                  service conversation.
                </p>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

        <CtaSection />
      </main>
    </SiteShell>
  );
}
