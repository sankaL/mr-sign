import type { ServiceDetail } from "@mrsign/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ContentImage } from "./content-image";
import { PricingSummary } from "./pricing-summary";

type ServiceTeaserCardProps = {
  service: ServiceDetail;
  prominent?: boolean;
};

export function ServiceTeaserCard({
  service,
  prominent = false,
}: ServiceTeaserCardProps) {
  return (
    <article
      className={
        prominent
          ? "grid overflow-hidden rounded-[2rem] border border-[#151515]/10 bg-white md:grid-cols-[0.9fr_1.1fr] lg:col-span-2"
          : "grid overflow-hidden rounded-[2rem] border border-[#151515]/10 bg-white"
      }
    >
      <ContentImage
        asset={service.image}
        className={prominent ? "min-h-72 md:min-h-full" : "aspect-[4/3]"}
        sizes={
          prominent
            ? "(min-width: 1024px) 44vw, 100vw"
            : "(min-width: 1024px) 28vw, 100vw"
        }
      />
      <div className="flex min-h-full flex-col justify-between gap-4 p-4 md:p-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E51B23]">
            {service.categorySlug}
          </p>
          <h2 className="mt-2 text-xl font-black uppercase leading-none md:text-2xl">
            {service.name}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#151515]/66">
            {service.shortDescription}
          </p>
        </div>

        <div className="grid gap-4">
          <PricingSummary pricing={service.pricing} compact />
          <Link
            href={service.route}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-black uppercase tracking-wide !text-white transition-colors hover:bg-[#1936D4] hover:!text-white focus-visible:bg-[#1936D4] focus-visible:!text-white active:scale-[0.98]"
          >
            View service
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}
