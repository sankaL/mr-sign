import { CustomerRequestForm } from "@/components/forms/customer-request-form";
import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/ui/page-header";
import {
  getServiceSelectGroups,
  getValidatedRequestDefaults,
} from "@/lib/customer-request-options";
import { quotePage } from "@/lib/site";
import { buildContentPageMetadata } from "@/lib/seo";

export const metadata = buildContentPageMetadata(quotePage);

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
        <section className="mx-auto max-w-[880px] px-5 py-10 md:px-10 md:py-14">
          <CustomerRequestForm
            kind="quote"
            serviceGroups={getServiceSelectGroups()}
            defaults={defaults}
          />
        </section>
      </main>
    </SiteShell>
  );
}
