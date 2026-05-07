import { HomeHero } from "@/components/site/hero";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/site-nav";
import { CtaSection } from "@/components/ui/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-[#1936D4]">
      <SiteNav variant="blue" />
      <main>
        <HomeHero />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
