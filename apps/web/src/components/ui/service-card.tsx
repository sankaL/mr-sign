import Link from "next/link";

import type { ServiceCategory } from "@/lib/site";

import { SignagePanel } from "./signage-panel";

type ServiceCardProps = {
  service: ServiceCategory;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="grid gap-5 rounded-[2rem] border border-[#151515]/10 bg-white p-5 md:grid-cols-[0.8fr_1.2fr] md:p-6">
      <SignagePanel
        label={service.label}
        accent={service.accent}
        className="min-h-56"
      />
      <div className="flex flex-col justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1936D4] text-white">
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E51B23]">
              {service.eyebrow}
            </p>
          </div>
          <h2 className="mt-5 text-2xl font-black uppercase leading-none md:text-4xl">
            {service.title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-sm font-semibold leading-6 text-[#151515]/65">
            {service.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.samples.map((sample) => (
              <span
                key={sample}
                className="rounded-full border border-[#151515]/10 bg-[#FFFAF0] px-3 py-1 text-[11px] font-black uppercase tracking-wide"
              >
                {sample}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={service.href}
          className="inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-[#151515] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98]"
        >
          {service.cta}
        </Link>
      </div>
    </article>
  );
}
