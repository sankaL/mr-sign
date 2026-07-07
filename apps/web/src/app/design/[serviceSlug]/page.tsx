import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/ui/page-header";
import { buildCategoryMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

const legacyDesignServiceSlugs = [
  "electronic-signs",
  "engraving-plaque",
  "logos",
  "magnetic-fridge",
  "silk-screens",
  "t-shirts-caps",
  "taxi-roof-signs",
  "traffic-signs",
  "type-setting",
  "websites",
];

export async function generateStaticParams() {
  return legacyDesignServiceSlugs.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata(): Promise<Metadata> {
  const servicesMetadata = buildCategoryMetadata("services");

  return {
    ...servicesMetadata,
    title: {
      absolute: "Services | Mr. Sign and Print",
    },
    description:
      "This old service link now points customers to sign maintenance and services.",
    alternates: {
      canonical: "/services",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function DesignServiceCompatibilityPage({
  params,
}: ServicePageProps) {
  const { serviceSlug } = await params;

  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Services"
          title="This Service Link Has Moved"
          description={`The old ${serviceSlug.replaceAll("-", " ")} page is no longer part of the public catalog. Browse sign maintenance and service options instead.`}
        >
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center justify-center rounded-[0.45rem] bg-[var(--ink)] px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] !text-white transition-transform hover:-translate-y-0.5 hover:!text-white active:translate-y-0"
          >
            Browse services
          </Link>
        </PageHeader>
      </main>
    </SiteShell>
  );
}
