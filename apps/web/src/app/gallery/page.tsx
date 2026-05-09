import { getGalleryServices } from "@mrsign/content";
import type { Metadata } from "next";

import { ContentImage } from "@/components/site/content-image";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { galleryPage } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: galleryPage.seo.title,
  description: galleryPage.seo.description,
  openGraph: {
    title: galleryPage.seo.socialTitle,
    description: galleryPage.seo.socialDescription,
  },
};

export default function GalleryPage() {
  const galleryServices = getGalleryServices();

  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={galleryPage.eyebrow}
          title={galleryPage.headline}
          description={galleryPage.subheadline}
        />
        <section className="bg-[#FFFAF0] px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2 lg:grid-cols-4">
            {galleryServices.map((service, index) => (
              <Link
                key={service.route}
                href={service.route}
                className={
                  index === 0 || index === 5
                    ? "group grid overflow-hidden rounded-[2rem] border border-[#151515]/10 bg-white md:col-span-2"
                    : "group grid overflow-hidden rounded-[2rem] border border-[#151515]/10 bg-white"
                }
              >
                <ContentImage
                  asset={service.image}
                  className={
                    index === 0 || index === 5
                      ? "aspect-[16/10]"
                      : "aspect-[4/3]"
                  }
                  sizes={
                    index === 0 || index === 5
                      ? "(min-width: 1024px) 44vw, 100vw"
                      : "(min-width: 1024px) 22vw, 100vw"
                  }
                  imageClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#E51B23]">
                    {service.categorySlug}
                  </p>
                  <h2 className="mt-2 text-xl font-black uppercase leading-none">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#151515]/64">
                    {service.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <CtaSection title="See a service that matches your project?" />
      </main>
    </SiteShell>
  );
}
