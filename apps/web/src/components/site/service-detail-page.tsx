import {
  getCategory,
  getRelatedServices,
  type CategorySlug,
} from "@mrsign/content";
import { ArrowLeft, Check, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <section className="border-b border-[var(--line)] bg-[var(--canvas)] py-8 md:py-12">
          <div className="site-container">
            <Link
              href={category.route}
              className="inline-flex min-h-11 items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.07em] text-[var(--body-copy)] transition-colors hover:text-[var(--accent-amber)]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
              Back to {category.name}
            </Link>

            <div className="mt-7 grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
              <div className="max-w-3xl">
                <p className="eyebrow">{category.name}</p>
                <h1 className="display-title mt-4">{service.headline}</h1>
                <p className="body-copy mt-6 max-w-[60ch]">
                  {service.shortDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={siteContact.phoneHref}>
                    Call the shop
                  </ButtonLink>
                  <ButtonLink href={siteContact.emailHref} variant="secondary">
                    Email details
                  </ButtonLink>
                </div>
              </div>

              <ContentImage
                asset={service.image}
                priority
                className="aspect-[16/10] rounded-[0.8rem] border border-[var(--line)] bg-white shadow-[0_24px_65px_rgba(7,26,58,0.1)]"
                imageClassName="h-full w-full object-cover"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="site-container grid gap-14 lg:grid-cols-[1fr_0.68fr] lg:gap-20">
            <article>
              <p className="eyebrow">Service details</p>
              <div className="mt-6 grid gap-5">
                {service.body.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={
                      index === 0
                        ? "font-display border-l-2 border-[var(--accent-amber)] pl-5 text-xl leading-8 text-[var(--ink)]"
                        : "body-copy text-base"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {service.capabilities.length > 0 ? (
                <div className="mt-12 border-t border-[var(--line)] pt-9">
                  <p className="eyebrow">What we handle</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex items-start gap-3 text-sm font-semibold leading-6 text-[var(--body-copy)]"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--accent-amber)] text-[var(--accent-amber)]">
                          <Check className="h-3 w-3" strokeWidth={2.4} />
                        </span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>

            <aside className="editorial-panel h-fit p-6 lg:sticky lg:top-28 md:p-8">
              <p className="eyebrow">Contact the shop</p>
              <h2 className="font-display mt-3 text-2xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
                Call or email for current details.
              </h2>
              <p className="body-copy mt-4">
                Share the product or service, size, quantity, material, timing,
                and location details so the team can guide the next step.
              </p>
              <div className="mt-7 grid gap-3">
                <Link
                  href={siteContact.phoneHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.45rem] bg-[var(--ink)] px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] !text-white transition-transform hover:-translate-y-0.5 hover:!text-white"
                >
                  Call the shop
                  <Phone className="h-4 w-4" />
                </Link>
                <Link
                  href={siteContact.emailHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.45rem] border border-[var(--line)] px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
                >
                  Email details
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="section-space border-t border-[var(--line)] bg-[var(--canvas)]">
            <div className="site-container">
              <p className="eyebrow">Related services</p>
              <h2 className="section-title mt-3">Often paired together</h2>
              <p className="body-copy mt-4 max-w-3xl">
                These services are commonly part of the same sign, print, or
                service conversation.
              </p>
              <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
