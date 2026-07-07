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
    <section className="bg-[var(--canvas)] px-5 py-6 md:px-10 md:py-8">
      <div className="mx-auto grid max-w-[1280px] gap-7 rounded-[0.65rem] bg-[var(--ink)] px-6 py-9 text-white shadow-[0_18px_50px_rgba(7,26,58,0.18)] md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-10">
        <div>
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-amber)]">
            Direct contact
          </p>
          <h2 className="font-display mt-3 text-2xl font-normal leading-tight tracking-[-0.03em] md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/72">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
          <ButtonLink href={primaryActions.call.href} variant="accent">
            {primaryActions.call.label}
          </ButtonLink>
          <ButtonLink href={primaryActions.email.href} variant="inverse">
            {primaryActions.email.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
