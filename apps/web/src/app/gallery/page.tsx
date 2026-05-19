import { getGalleryServices } from "@mrsign/content";

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { ImageGallery } from "@/components/ui/image-gallery";
import { PageHeader } from "@/components/ui/page-header";
import { galleryPage } from "@/lib/site";
import { buildContentPageMetadata } from "@/lib/seo";

export const metadata = buildContentPageMetadata(galleryPage);

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
        <section className="bg-[#FFFAF0] px-5 py-10 md:px-5 md:py-14 flex justify-center">
          <div className="w-full">
            <ImageGallery services={galleryServices} />
          </div>
        </section>
        <CtaSection title="See a service that matches your project?" />
      </main>
    </SiteShell>
  );
}
