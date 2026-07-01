import { primaryActions } from "@/lib/site";

import { ButtonLink } from "./button-link";

type CtaSectionProps = {
  title?: string;
  description?: string;
};

export function CtaSection({
  title = "Ready to Price a Sign, Print Job, or Services?",
  description,
}: CtaSectionProps) {
  return (
    <section className="bg-[#0B1F55] px-5 py-12 text-white md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[1152px] gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF00]">
            Direct contact
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase leading-tight md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/78">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
          <ButtonLink href={primaryActions.call.href}>
            {primaryActions.call.label}
          </ButtonLink>
          <ButtonLink href={primaryActions.email.href} variant="secondary">
            {primaryActions.email.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
