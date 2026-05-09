import type { Metadata } from "next";

import { TextAreaField, TextField } from "@/components/forms/form-field";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { orderPage } from "@/lib/site";

export const metadata: Metadata = {
  title: orderPage.seo.title,
  description: orderPage.seo.description,
};

export default function OrderOnlinePage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={orderPage.eyebrow}
          title={orderPage.headline}
          description={orderPage.subheadline}
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div
            className="mx-auto grid max-w-[900px] gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8"
            aria-label="Order online form preview"
          >
            <p className="rounded-2xl bg-[#CCFF00] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#151515]">
              Online submission is coming soon. Call or email the shop with
              known sizes, quantities, materials, and deadline.
            </p>
            <TextField
              id="order-name"
              label="Name"
              placeholder="Business or contact name"
              readOnly
            />
            <TextField
              id="order-type"
              label="Order type"
              helperText="Payments and file uploads are intentionally excluded."
              placeholder="Reorder, print run, sign job, or design support"
              readOnly
            />
            <TextAreaField
              id="order-details"
              label="Order details"
              placeholder="Known quantities, sizes, materials, and deadline"
              readOnly
            />
          </div>
        </section>
        <CtaSection title="Need the team to confirm details before production?" />
      </main>
    </SiteShell>
  );
}
