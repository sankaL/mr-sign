import { primaryActions, siteContact } from "@/lib/site";

import { ButtonLink } from "./button-link";

type CtaSectionProps = {
  title?: string;
  description?: string;
};

export function CtaSection({
  title = "Ready to price a sign, print job, or design request?",
  description = `Send the job details or call the shop. Mr. Sign and Print serves ${siteContact.serviceArea} from Vaughan.`,
}: CtaSectionProps) {
  return (
    <section className="bg-[#1936D4] px-5 py-12 text-white md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[1152px] gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF00]">
            Request path
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase leading-tight md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/78">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
          <ButtonLink href={primaryActions.quote.href}>
            {primaryActions.quote.label}
          </ButtonLink>
          <ButtonLink href={primaryActions.call.href} variant="secondary">
            {primaryActions.call.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
