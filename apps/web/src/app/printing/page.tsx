export const metadata = {
  title: "Printing",
};

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCard } from "@/components/ui/service-card";
import { serviceCategories } from "@/lib/site";

export default function PrintingPage() {
  const service = serviceCategories.find((item) => item.href === "/printing")!;

  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Printing"
          title="Cards, flyers, brochures, menus, and wide-format output."
          description="A Phase 2 category foundation for print services. Request forms and pricing logic will be connected in later phases."
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1152px]">
            <ServiceCard service={service} />
          </div>
        </section>
        <CtaSection title="Need print materials prepared for pickup?" />
      </main>
    </SiteShell>
  );
}
