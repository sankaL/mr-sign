import type { Metadata } from "next";
import Link from "next/link";

import { TextAreaField, TextField } from "@/components/forms/form-field";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { contactMethods, contactPage, siteContact } from "@/lib/site";

export const metadata: Metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
  openGraph: {
    title: contactPage.seo.socialTitle,
    description: contactPage.seo.socialDescription,
  },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={contactPage.eyebrow}
          title={contactPage.headline}
          description={contactPage.subheadline}
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div className="grid content-start gap-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Link
                    key={method.label}
                    href={method.href}
                    className="flex min-h-16 items-center gap-3 rounded-2xl border border-[#151515]/10 bg-white px-5 py-4 text-sm font-black transition-colors hover:border-[#1936D4] hover:text-[#1936D4]"
                  >
                    <Icon className="h-5 w-5 text-[#E51B23]" />
                    {method.label}
                  </Link>
                );
              })}
              <div className="rounded-2xl border border-[#151515]/10 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Visit
                </p>
                <p className="mt-3 text-sm font-bold leading-6 text-[#151515]/68">
                  {siteContact.address}
                </p>
              </div>
            </div>

            <div
              className="grid gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8"
              aria-label="Contact form preview"
            >
              <p className="rounded-2xl bg-[#CCFF00] px-4 py-3 text-xs font-black uppercase tracking-wide text-[#151515]">
                Online submission is coming soon. Call or email the shop for
                active requests.
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
