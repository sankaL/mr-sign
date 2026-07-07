import { HomeHero } from "@/components/site/hero";
import { HomeSections } from "@/components/site/home-sections";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/site-nav";
import { homePage } from "@/lib/site";
import { buildContentPageMetadata } from "@/lib/seo";

export const metadata = buildContentPageMetadata(homePage);

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--canvas)]">
      <SiteNav variant="light" />
      <main id="main-content">
        <HomeHero />
        <HomeSections />
      </main>
      <SiteFooter />
    </div>
  );
}
