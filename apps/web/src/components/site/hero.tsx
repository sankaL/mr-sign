import { Factory, MapPin, ShieldCheck, Timer } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { homePage, primaryActions } from "@/lib/site";

import { ContentImage } from "./content-image";

const credibility = [
  {
    icon: Timer,
    title: "Since 1998",
    detail: "Serving local businesses",
  },
  {
    icon: MapPin,
    title: "Vaughan, Ontario",
    detail: "Locally based",
  },
  {
    icon: Factory,
    title: "All In House",
    detail: "Manufacturing",
  },
  {
    icon: ShieldCheck,
    title: "Greater Toronto Area",
    detail: "Service area",
  },
];

export function HomeHero() {
  const heroImage = homePage.image;
  const [sportClips, copperBranch] = homePage.featuredImages;

  if (!heroImage || !sportClips || !copperBranch) {
    return null;
  }

  return (
    <section className="bg-[var(--canvas)] pb-12 pt-10 md:pb-16 md:pt-14 lg:pb-20 lg:pt-16">
      <div className="site-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-8">
        <div className="flex min-h-full flex-col justify-center lg:pb-4 lg:pt-12">
          <p className="eyebrow">{homePage.eyebrow}</p>
          <h1 className="display-title mt-5 max-w-[12ch]">
            Signs That Shape{" "}
            <span className="text-[var(--accent-amber)]">Attention.</span>
          </h1>
          <p className="body-copy mt-6 max-w-[57ch]">{homePage.subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primaryActions.call.href}>
              {primaryActions.call.label}
            </ButtonLink>
            <ButtonLink href={primaryActions.contact.href} variant="secondary">
              Contact Us
            </ButtonLink>
          </div>

          <div className="mt-11 grid grid-cols-2 border-y border-[var(--line)] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {credibility.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border-[var(--line)] px-3 py-5 first:pl-0 odd:border-r sm:border-r sm:last:border-r-0 lg:odd:border-r lg:even:border-r-0 xl:border-r xl:odd:border-r xl:last:border-r-0"
                >
                  <Icon
                    className="h-5 w-5 text-[var(--accent-amber)]"
                    strokeWidth={1.6}
                  />
                  <p className="mt-3 text-[0.68rem] font-extrabold leading-4 text-[var(--ink)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[0.62rem] font-medium leading-4 text-[var(--body-copy)]">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative pb-32 sm:pb-36">
          <ContentImage
            asset={heroImage}
            priority
            className="aspect-[1.2/1] rounded-[0.8rem] border border-[var(--line)] bg-white shadow-[0_24px_65px_rgba(7,26,58,0.13)] sm:aspect-[1.38/1]"
            imageClassName="h-full w-full object-cover object-center"
            sizes="(min-width: 1024px) 57vw, 100vw"
          />

          <div className="absolute inset-x-4 bottom-0 grid grid-cols-2 gap-3 sm:left-8 sm:right-auto sm:w-[82%] sm:gap-5 lg:left-7 lg:w-[88%] xl:left-10 xl:w-[82%]">
            {[
              {
                image: sportClips,
                title: "Sport Clips",
                detail: "Channel letters",
                href: "/signs/channel-letters",
              },
              {
                image: copperBranch,
                title: "Copper Branch",
                detail: "Illuminated round sign",
                href: "/signs/illuminated-boxes",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative aspect-square overflow-hidden rounded-[0.75rem] border-2 border-white bg-[var(--ink)] shadow-[0_20px_48px_rgba(7,26,58,0.24)] transition-transform hover:-translate-y-1"
              >
                <ContentImage
                  asset={card.image}
                  className="absolute inset-0 h-full w-full"
                  imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 24vw, 45vw"
                />
                <div className="absolute inset-x-0 bottom-0 flex min-h-[34%] items-end bg-[rgba(3,15,34,0.9)] px-4 py-4 text-white backdrop-blur-[2px] sm:px-5 sm:py-5">
                  <div>
                    <p className="font-display text-sm leading-tight sm:text-base">
                      {card.title}
                    </p>
                    <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-white/72 sm:text-[0.65rem]">
                      {card.detail}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
