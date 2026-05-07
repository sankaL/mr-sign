import { SiteShell } from "@/components/site/site-shell";
import { TextAreaField, TextField } from "@/components/forms/form-field";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { StatePanel } from "@/components/ui/states";

export const metadata = {
  title: "Request Quote",
};

export default function RequestQuotePage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Request quote"
          title="Tell the shop what needs pricing."
          description="This Phase 2 shell establishes the visual form pattern. Actual validation, request codes, email, and database submission are scheduled for later phases."
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div
              className="grid gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8"
              aria-label="Request quote form preview"
            >
              <p className="rounded-2xl bg-[#FFF200] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#151515]">
                Preview only. Submission arrives in Phase 5.
              </p>
              <TextField
                id="quote-name"
                label="Name"
                helperText="Customer contact fields are visual-only in Phase 2."
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
