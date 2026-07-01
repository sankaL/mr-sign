import { getCategory, type CategorySlug } from "@mrsign/content";
import { notFound } from "next/navigation";

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

  return (
    <SiteShell>
      <main>
        <section className="bg-[#0B1F55] px-5 py-10 text-white md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-[clamp(2.35rem,5vw,4.5rem)] font-black uppercase leading-[0.92] tracking-normal">
                {category.headline}
              </h1>
              <p className="mt-4 max-w-[62ch] text-sm font-semibold leading-6 text-white/82 md:text-base md:leading-7">
                {category.subheadline}
              </p>
              <p className="mt-3 max-w-[62ch] text-xs font-semibold leading-5 text-white/62 md:text-sm md:leading-6">
                {category.description}
              </p>
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
              <h2 className="max-w-4xl text-[clamp(2rem,4vw,3.35rem)] font-black uppercase leading-[0.95] tracking-normal">
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
                  prominent={service.featured || index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
