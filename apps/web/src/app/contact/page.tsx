import type { Metadata } from "next";
import Link from "next/link";

import { CustomerRequestForm } from "@/components/forms/customer-request-form";
import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { getServiceSelectGroups } from "@/lib/customer-request-options";
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
        <section className="px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1060px] gap-8 lg:grid-cols-[320px_1fr]">
            {/* ── Contact sidebar ── */}
            <div className="grid content-start gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Get in touch
                </p>
                <h2 className="mt-2 text-lg font-black uppercase leading-tight">
                  Reach us directly
                </h2>
              </div>
              <div className="grid gap-2">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Link
                      key={method.label}
                      href={method.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors hover:bg-[#151515]/4 hover:text-[#1936D4]"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 text-[#E51B23]" />
                      {method.label}
                    </Link>
                  );
                })}
              </div>
              <div className="rounded-lg bg-[#151515]/4 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                  Visit
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#151515]/68">
                  {siteContact.address}
                </p>
              </div>
            </div>

            {/* ── Contact form ── */}
            <div className="rounded-2xl border border-[#151515]/8 bg-white p-6 md:p-8">
              <CustomerRequestForm
                kind="contact"
                serviceGroups={getServiceSelectGroups()}
              />
            </div>
          </div>
        </section>
        <CtaSection title="Need a quote instead of a general message?" />
      </main>
    </SiteShell>
  );
}
