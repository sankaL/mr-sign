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
        <section className="section-space bg-white">
          <div className="site-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="section-title mt-3">
                Talk to the shop for current pricing and timing.
              </h2>
              <div className="mt-6 grid gap-3">
                <Link
                  href={siteContact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-[0.45rem] bg-[var(--ink)] px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] !text-white transition-transform hover:-translate-y-0.5 hover:!text-white"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                  {siteContact.phone}
                </Link>
                <Link
                  href={siteContact.emailHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-[0.45rem] border border-[var(--line)] px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
                >
                  <Mail className="h-4 w-4" strokeWidth={2.5} />
                  {siteContact.email}
                </Link>
              </div>
            </div>

            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {faqs.map((item) => (
                <article
                  key={item.question}
                  className="grid gap-3 py-6 md:grid-cols-[0.8fr_1.2fr] md:gap-8"
                >
                  <h3 className="font-display text-base leading-snug text-[var(--ink)]">
                    {item.question}
                  </h3>
                  <p className="text-sm font-medium leading-6 text-[var(--body-copy)]">
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
