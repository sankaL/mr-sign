import type { Metadata } from "next";

import { CustomerRequestForm } from "@/components/forms/customer-request-form";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import {
  getServiceSelectGroups,
  getValidatedRequestDefaults,
} from "@/lib/customer-request-options";
import { quotePage } from "@/lib/site";

export const metadata: Metadata = {
  title: quotePage.seo.title,
  description: quotePage.seo.description,
};

type RequestQuotePageProps = {
  searchParams: Promise<{
    category?: string;
    service?: string;
  }>;
};

export default async function RequestQuotePage({
  searchParams,
}: RequestQuotePageProps) {
  const { category, service } = await searchParams;
  const defaults = getValidatedRequestDefaults(category, service);

  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={quotePage.eyebrow}
          title={quotePage.headline}
          description={quotePage.subheadline}
        />
        <section className="px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-[1152px]">
            <CustomerRequestForm
              kind="quote"
              serviceGroups={getServiceSelectGroups()}
              defaults={defaults}
            />
          </div>
        </section>
        <CtaSection title="Prefer to speak with the shop first?" />
      </main>
    </SiteShell>
  );
}
