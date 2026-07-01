import { Mail, Phone } from "lucide-react";
import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/ui/page-header";
import { faqsPage, siteContact } from "@/lib/site";
import { buildContentPageMetadata } from "@/lib/seo";

export const metadata = buildContentPageMetadata(faqsPage);

const faqs = [
  {
    question: "What does Mr. Sign and Print focus on?",
    answer:
      "Signs are the main focus, including custom signage, illuminated signs, banners, vehicle graphics, indoor graphics, pylon signs, and sign maintenance.",
  },
  {
    question: "Do you handle printing?",
    answer:
      "Yes. Printing is available for business cards, posters, flyers, brochures, large format work, and related print jobs.",
  },
  {
    question: "How do I get a price?",
    answer:
      "Call or email the shop with the product or service, size, quantity, material, timing, and any artwork details.",
  },
  {
    question: "Can you service an existing sign?",
    answer:
      "Yes. Services include sign repairs, LED and lighting replacement, electrical troubleshooting, sign cleaning, vinyl replacement, and emergency sign service.",
  },
  {
    question: "Where is the shop?",
    answer:
      "Mr. Sign and Print is located at 399 Four Valley Dr. Unit 3 in Vaughan and serves the Greater Toronto Area.",
  },
  {
    question: "Can I submit an order online?",
    answer:
      "No. The current website is direct-contact only, so customers should call, email, or visit the shop.",
  },
];

export default function FaqsPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow={faqsPage.eyebrow}
          title={faqsPage.headline}
          description={faqsPage.subheadline}
        />
        <section className="bg-[#FFFAF0] px-5 py-10 md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1152px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
                Contact
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight md:text-3xl">
                Talk to the shop for current pricing and timing.
              </h2>
              <div className="mt-6 grid gap-3">
                <Link
                  href={siteContact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E51B23] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#151515] hover:!text-white"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                  {siteContact.phone}
                </Link>
                <Link
                  href={siteContact.emailHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#151515]/15 px-5 py-3 text-xs font-black uppercase tracking-wide text-[#151515] transition-colors hover:bg-[#151515] hover:!text-white"
                >
                  <Mail className="h-4 w-4" strokeWidth={2.5} />
                  {siteContact.email}
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border border-[#151515]/10 bg-white p-5"
                >
                  <h3 className="text-base font-black uppercase leading-tight">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#151515]/66">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
