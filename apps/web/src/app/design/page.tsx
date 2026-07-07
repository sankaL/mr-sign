import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/ui/page-header";
import { buildCategoryMetadata } from "@/lib/seo";

const servicesMetadata = buildCategoryMetadata("services");
export const metadata: Metadata = {
  ...servicesMetadata,
  title: {
    absolute: "Services | Mr. Sign and Print",
  },
  description:
    "This old section now points customers to the Services page for sign maintenance and support.",
  alternates: {
    canonical: "/services",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DesignCompatibilityPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Services"
          title="This Section Has Moved to Services"
          description="This section has been replaced with sign maintenance and service information."
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
