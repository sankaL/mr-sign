import {
  Flag,
  Lightbulb,
  PanelsTopLeft,
  Printer,
  Store,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { getService } from "@mrsign/content";

import { ButtonLink } from "@/components/ui/button-link";
import { aboutPage, galleryPage, homePage, primaryActions } from "@/lib/site";

import { ContentImage } from "./content-image";

const quotedServices = [
  {
    label: "Channel lettering",
    href: "/signs/channel-letters",
    icon: Lightbulb,
  },
  {
    label: "Illuminated boxes",
    href: "/signs/illuminated-boxes",
    icon: PanelsTopLeft,
  },
  { label: "Pylon signs", href: "/signs/pylon-signs", icon: Store },
  { label: "Banners", href: "/signs/banner", icon: Flag },
  {
    label: "Coroplast signs",
    href: "/signs/coroplast",
    icon: PanelsTopLeft,
  },
  { label: "Sign maintenance", href: "/services", icon: Wrench },
  {
    label: "Electrical repairs",
    href: "/services/electrical-troubleshooting",
    icon: Lightbulb,
  },
  {
    label: "Large format printing",
    href: "/printing/large-format-printing",
    icon: Printer,
  },
];

export function HomeSections() {
  const projectImages = homePage.featuredImages;
  const projects = [
    {
      service: getService("signs", "channel-letters"),
      image: projectImages[0],
    },
    {
      service: getService("signs", "illuminated-boxes"),
      image: projectImages[1],
    },
    {
      service: getService("printing", "business-cards"),
      image: projectImages[2],
    },
    {
      service: getService("services", "sign-repairs"),
      image: projectImages[3],
    },
  ].filter(
    (
      project,
    ): project is {
      service: NonNullable<typeof project.service>;
      image: NonNullable<typeof project.image>;
    } => Boolean(project.service && project.image),
  );

  return (
    <>
      <section className="border-y border-[var(--line)] bg-white section-space">
        <div className="site-container">
          <div className="text-center">
            <p className="eyebrow">Signs, printing, and services</p>
            <h2 className="section-title mx-auto mt-3 max-w-[24ch]">
              A Few of the Products and Services we Quote Everyday
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
            {quotedServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.label}
                  href={service.href}
                  className="group flex min-h-40 flex-col items-center justify-center rounded-[0.65rem] border border-[var(--line)] bg-white px-3 py-5 text-center shadow-[0_12px_30px_rgba(7,26,58,0.035)] transition-all hover:-translate-y-1 hover:border-[var(--accent-amber)]"
                >
                  <Icon
                    className="h-8 w-8 text-[var(--ink)]"
                    strokeWidth={1.45}
                  />
                  <span className="mt-5 text-xs font-bold leading-5 text-[var(--ink)] group-hover:text-[var(--accent-amber)]">
                    {service.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--canvas)]">
        <div className="site-container">
          <div className="grid gap-6 md:grid-cols-[0.72fr_1.28fr] md:items-end">
            <div>
              <p className="eyebrow">{galleryPage.eyebrow}</p>
              <h2 className="section-title mt-3 max-w-[14ch]">
                {galleryPage.headline}
              </h2>
            </div>
            <p className="body-copy max-w-[62ch] md:justify-self-end">
              {galleryPage.subheadline}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <Link
                key={project.service.route}
                href={project.service.route}
                className="group overflow-hidden rounded-[0.65rem] border border-[var(--line)] bg-white shadow-[0_16px_40px_rgba(7,26,58,0.055)] transition-transform hover:-translate-y-1"
              >
                <ContentImage
                  asset={project.image}
                  className="aspect-[1.15/1]"
                  imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="p-4">
                  <h3 className="font-display text-base leading-snug text-[var(--ink)]">
                    {project.service.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-[var(--body-copy)]">
                    {project.service.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ButtonLink href="/gallery" variant="secondary">
              Gallery
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white py-14 md:py-18">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">{aboutPage.eyebrow}</p>
            <h2 className="section-title mt-3">{aboutPage.headline}</h2>
            <p className="body-copy mt-4 max-w-[58ch]">
              {aboutPage.subheadline}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[0.65rem] border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
            {[
              ["Since 1998", "Years of experience"],
              ["Vaughan", "Local shop"],
              ["In-house", "Manufacturing"],
              ["GTA", "Service area"],
            ].map(([value, label]) => (
              <div key={value} className="bg-white p-5 text-center">
                <p className="font-display text-xl text-[var(--ink)]">
                  {value}
                </p>
                <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[var(--body-copy)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--canvas)] py-6 md:py-8">
        <div className="site-container grid gap-6 rounded-[0.65rem] bg-[var(--ink)] px-6 py-9 text-white md:grid-cols-[1fr_auto] md:items-center md:px-10">
          <div>
            <p className="eyebrow">Direct contact</p>
            <h2 className="font-display mt-3 text-2xl tracking-[-0.03em] md:text-3xl">
              Ready to Price a Sign, Print Job, or Services?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryActions.call.href} variant="accent">
              {primaryActions.call.label}
            </ButtonLink>
            <ButtonLink
              href={primaryActions.email.href}
              variant="secondary"
              className="border-white/28 !text-white hover:border-white hover:bg-white hover:!text-[var(--ink)]"
            >
              {primaryActions.email.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
