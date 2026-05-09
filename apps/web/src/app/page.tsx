import { HomeHero } from "@/components/site/hero";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/site-nav";
import { CtaSection } from "@/components/ui/cta-section";
import { homePage } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: homePage.seo.title,
  description: homePage.seo.description,
  openGraph: {
    title: homePage.seo.socialTitle,
    description: homePage.seo.socialDescription,
    images: homePage.image ? [{ url: homePage.image.path }] : undefined,
  },
};

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
