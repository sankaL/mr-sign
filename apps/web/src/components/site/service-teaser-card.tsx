import type { ServiceDetail } from "@mrsign/content";

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
          <h2 className="text-xl font-black uppercase leading-none md:text-2xl">
            {service.name}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#151515]/66">
            {service.shortDescription}
          </p>
        </div>

        {service.capabilities.length > 0 ? (
          <ul className="grid gap-2 border-t border-[#151515]/10 pt-4">
            {service.capabilities.slice(0, 3).map((capability) => (
              <li
                key={capability}
                className="text-xs font-black uppercase leading-5 tracking-wide text-[#151515]/58"
              >
                {capability}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
