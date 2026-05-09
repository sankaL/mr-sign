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
    <section className="bg-[#FFFAF0] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1152px] gap-8 rounded-[2rem] bg-[#1936D4] p-6 text-white md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#CCFF00]">
            Request path
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-none md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/78">
            {description}
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3 sm:flex-row md:flex-col">
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
