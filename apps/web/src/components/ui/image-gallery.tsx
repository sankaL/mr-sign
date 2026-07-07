import type { ServiceDetail } from "@mrsign/content";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ContentImage } from "@/components/site/content-image";

interface ImageGalleryProps {
  services: ServiceDetail[];
}

export function ImageGallery({ services }: ImageGalleryProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Link
          key={service.route}
          href={service.route}
          className={`group overflow-hidden rounded-[0.7rem] border border-[var(--line)] bg-white shadow-[0_16px_40px_rgba(7,26,58,0.045)] transition-all hover:-translate-y-1 hover:border-[var(--accent-amber)] ${
            index % 7 === 0 ? "lg:col-span-2" : ""
          }`}
        >
          <ContentImage
            asset={service.image}
            priority={index === 0}
            className={index % 7 === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}
            imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            sizes={
              index % 7 === 0
                ? "(min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
          />
          <div className="flex items-end justify-between gap-4 p-5">
            <div>
              <p className="eyebrow">{service.categorySlug}</p>
              <h2 className="font-display mt-2 text-lg leading-tight text-[var(--ink)]">
                {service.name}
              </h2>
            </div>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-[var(--accent-amber)]"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
