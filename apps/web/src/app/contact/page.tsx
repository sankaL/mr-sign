import { SiteShell } from "@/components/site/site-shell";
import { TextAreaField, TextField } from "@/components/forms/form-field";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { contactMethods } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Contact"
          title="Reach the shop for quotes, orders, and questions."
          description="Phase 2 keeps this page static while shared form fields and contact surfaces are established for later submission handling."
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div className="grid content-start gap-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Link
                    key={method.label}
                    href={method.href}
                    className="flex min-h-16 items-center gap-3 rounded-2xl border border-[#151515]/10 bg-white px-5 py-4 text-sm font-black transition-colors hover:border-[#1936D4]"
                  >
                    <Icon className="h-5 w-5 text-[#E51B23]" />
                    {method.label}
                  </Link>
                );
              })}
            </div>
            <div
              className="grid gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8"
              aria-label="Contact form preview"
            >
              <p className="rounded-2xl bg-[#FFF200] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#151515]">
                Preview only. Submission arrives in Phase 5.
              </p>
              <TextField
                id="contact-name"
                label="Name"
                placeholder="Name"
                readOnly
              />
              <TextField
                id="contact-email"
                label="Email"
                type="email"
                placeholder="name@example.com"
                readOnly
              />
              <TextAreaField
                id="contact-message"
                label="Message"
                placeholder="How can the shop help?"
                readOnly
              />
            </div>
          </div>
        </section>
        <CtaSection title="Need a quote instead of a general message?" />
      </main>
    </SiteShell>
  );
}
