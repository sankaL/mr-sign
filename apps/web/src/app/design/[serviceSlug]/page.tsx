import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/ui/page-header";

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
  return {
    title: "Services | Mr. Sign and Print",
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
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#151515] hover:!text-white active:scale-[0.98]"
          >
            Browse services
          </Link>
        </PageHeader>
      </main>
    </SiteShell>
  );
}
