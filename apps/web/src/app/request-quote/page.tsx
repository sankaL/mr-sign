import type { Metadata } from "next";

import { TextAreaField, TextField } from "@/components/forms/form-field";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { StatePanel } from "@/components/ui/states";
import { quotePage } from "@/lib/site";

export const metadata: Metadata = {
  title: quotePage.seo.title,
  description: quotePage.seo.description,
};

export default function RequestQuotePage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={quotePage.eyebrow}
          title={quotePage.headline}
          description={quotePage.subheadline}
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div
              className="grid gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8"
              aria-label="Request quote form preview"
            >
              <p className="rounded-2xl bg-[#CCFF00] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#151515]">
                Online submission is coming soon. Call or email the shop with
                these details for active quote requests.
              </p>
              <TextField
                id="quote-name"
                label="Name"
                helperText="Business or contact name."
                placeholder="Business or contact name"
                readOnly
              />
              <TextField
                id="quote-service"
                label="Service"
                placeholder="Signs, printing, or design"
                readOnly
              />
              <TextAreaField
                id="quote-details"
                label="Job details"
                helperText="No uploads are included in the MVP."
                placeholder="Size, quantity, deadline, and notes"
                readOnly
              />
            </div>
            <div className="grid content-start gap-5">
              <StatePanel kind="empty" />
              <StatePanel kind="error" />
            </div>
          </div>
        </section>
        <CtaSection title="Prefer to speak with the shop first?" />
      </main>
    </SiteShell>
  );
}
