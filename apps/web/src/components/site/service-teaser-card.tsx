import type { ServiceDetail } from "@mrsign/content";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ContentImage } from "./content-image";

type ServiceTeaserCardProps = {
  service: ServiceDetail;
  prominent?: boolean;
};

export function ServiceTeaserCard({
  service,
  prominent = false,
}: ServiceTeaserCardProps) {
  return (
    <Link
      href={service.route}
      className={
        prominent
          ? "group grid overflow-hidden rounded-[0.75rem] border border-[var(--line)] bg-white shadow-[0_16px_42px_rgba(7,26,58,0.055)] transition-all hover:-translate-y-1 hover:border-[var(--accent-amber)] md:grid-cols-[1.05fr_0.95fr] lg:col-span-2"
          : "group grid overflow-hidden rounded-[0.75rem] border border-[var(--line)] bg-white shadow-[0_16px_42px_rgba(7,26,58,0.045)] transition-all hover:-translate-y-1 hover:border-[var(--accent-amber)]"
      }
    >
      <ContentImage
        asset={service.image}
        className={prominent ? "min-h-72 md:min-h-full" : "aspect-[4/3]"}
        imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        sizes={
          prominent
            ? "(min-width: 1024px) 44vw, 100vw"
            : "(min-width: 1024px) 28vw, 100vw"
        }
      />
      <div className="flex min-h-full flex-col justify-between gap-6 p-5 md:p-6">
        <div>
          <p className="eyebrow">{service.eyebrow}</p>
          <h2 className="font-display mt-3 text-xl leading-tight tracking-[-0.025em] text-[var(--ink)] md:text-2xl">
            {service.name}
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-[var(--body-copy)]">
            {service.shortDescription}
          </p>
        </div>

        <span className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.07em] text-[var(--ink)] transition-colors group-hover:text-[var(--accent-amber)]">
          View service
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
