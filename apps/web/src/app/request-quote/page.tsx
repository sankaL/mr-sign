import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { pricingContactPage, siteContact } from "@/lib/site";
import { buildContentPageMetadata } from "@/lib/seo";

export const metadata = buildContentPageMetadata(pricingContactPage);

export default function PricingContactPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={pricingContactPage.eyebrow}
          title={pricingContactPage.headline}
          description={pricingContactPage.subheadline}
        />
        <section className="px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[900px] gap-5 rounded-2xl border border-[#151515]/10 bg-white p-6 md:p-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                What to include
              </p>
              <h2 className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
                Send the practical details by phone or email.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-6 text-[#151515]/66">
                Useful details include the service name, size, quantity,
                material, deadline, installation needs, and whether artwork is
                ready.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={siteContact.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#151515] hover:!text-white"
              >
                Call the shop
                <Phone className="h-4 w-4" />
              </Link>
              <Link
                href={siteContact.emailHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#151515]/15 px-5 py-3 text-xs font-black uppercase tracking-wide text-[#151515] transition-colors hover:bg-[#151515] hover:!text-white"
              >
                Email details
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        <CtaSection title="Prefer to browse services first?" />
      </main>
    </SiteShell>
  );
}
