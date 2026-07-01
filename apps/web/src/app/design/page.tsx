import type { Metadata } from "next";
import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Services | Mr. Sign and Print",
  description:
    "This old section now points customers to the Services page for sign maintenance and support.",
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
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#151515] hover:!text-white active:scale-[0.98]"
          >
            Browse services
          </Link>
        </PageHeader>
      </main>
    </SiteShell>
  );
}
