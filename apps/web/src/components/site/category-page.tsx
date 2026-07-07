import { getCategory, type CategorySlug } from "@mrsign/content";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/ui/cta-section";
import { getPublicServices } from "@/lib/public-services";

import { ContentImage } from "./content-image";
import { ServiceTeaserCard } from "./service-teaser-card";
import { SiteShell } from "./site-shell";

type CategoryPageProps = {
  categorySlug: CategorySlug;
};

export async function CategoryPage({ categorySlug }: CategoryPageProps) {
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const services = await getPublicServices(categorySlug);
  const isSignsCategory = categorySlug === "signs";

  return (
    <SiteShell>
      <main>
        <section className="border-b border-[var(--line)] bg-[var(--canvas)] py-14 md:py-20">
          <div className="site-container grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="eyebrow">{category.eyebrow}</p>
              <h1 className="display-title mt-4">{category.headline}</h1>
              <p className="body-copy mt-6 max-w-[60ch]">
                {category.subheadline}
              </p>
              {!isSignsCategory &&
              categorySlug !== "services" &&
              category.description ? (
                <p className="mt-4 max-w-[60ch] text-sm font-medium leading-7 text-[var(--body-copy)]/80">
                  {category.description}
                </p>
              ) : null}
            </div>

            <ContentImage
              asset={category.image}
              priority
              className="aspect-[16/10] rounded-[0.8rem] border border-[var(--line)] bg-white shadow-[0_24px_65px_rgba(7,26,58,0.1)]"
              imageClassName="h-full w-full object-cover"
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="site-container">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceTeaserCard
                  key={service.route}
                  service={service}
                  prominent={service.featured || index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        <CtaSection title={category.ctaCopy} />
      </main>
    </SiteShell>
  );
}
