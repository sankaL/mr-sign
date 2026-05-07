export const metadata = {
  title: "Signs",
};

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCard } from "@/components/ui/service-card";
import { serviceCategories } from "@/lib/site";

export default function SignsPage() {
  const service = serviceCategories.find((item) => item.href === "/signs")!;

  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Signs"
          title="Storefront visibility, banners, boards, and lettering."
          description="A Phase 2 category foundation for sign services. Detailed service pages and database-backed pricing arrive in later phases."
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1152px]">
            <ServiceCard service={service} />
          </div>
        </section>
        <CtaSection title="Need a sign job quoted for Vaughan or the GTA?" />
      </main>
    </SiteShell>
  );
}
