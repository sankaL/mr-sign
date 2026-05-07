export const metadata = {
  title: "Design",
};

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCard } from "@/components/ui/service-card";
import { serviceCategories } from "@/lib/site";

export default function DesignPage() {
  const service = serviceCategories.find((item) => item.href === "/design")!;

  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Design"
          title="Artwork support before signs and print jobs move ahead."
          description="A Phase 2 design-service foundation. Later phases add service detail pages, validation, and request submission."
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1152px]">
            <ServiceCard service={service} />
          </div>
        </section>
        <CtaSection title="Need production-ready design help?" />
      </main>
    </SiteShell>
  );
}
