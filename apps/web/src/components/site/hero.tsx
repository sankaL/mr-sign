import { businessHours, homePage } from "@mrsign/content";
import {
  ArrowDown,
  ArrowRight,
  Clock,
  Mail,
  Phone,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { InteractiveTravelCard } from "@/components/ui/3d-card";
import { getPublicFeaturedServices } from "@/lib/public-services";
import { primaryActions, siteContact } from "@/lib/site";

import { GoogleMapEmbed } from "./google-map-embed";
import { FloatingMrSignHeroCards } from "./hero-motion";

const displayShadow = {
  textShadow:
    "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99, 9px 9px 0 #001A99, 10px 10px 0 #001A99, 11px 11px 0 #001A99, 12px 12px 0 #001A99, 13px 13px 0 #001A99, 14px 14px 0 #001A99",
  fontFamily: '"Arial Black", Impact, sans-serif',
};

const ArrowGreenLeft = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-full w-full overflow-visible stroke-current text-[#CCFF00]"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowGreenRight = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-full w-full overflow-visible stroke-current text-[#CCFF00]"
    fill="none"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

const ArrowBlack = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-full w-full overflow-visible stroke-current text-black"
    fill="none"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20,80 Q 40,20 80,40" />
    <path d="M60,20 L80,40 L50,60" />
  </svg>
);

const CircularBadge = () => (
  <Link
    href={primaryActions.quote.href}
    className="relative flex h-28 w-28 rotate-12 cursor-pointer items-center justify-center rounded-full border-[3px] border-black/5 bg-[#CCFF00] shadow-xl transition-transform hover:scale-105 md:h-36 md:w-36"
    aria-label="Request a free quote"
  >
    <div className="absolute inset-1 animate-[spin_10s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path
          id="quoteCirclePath"
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          fill="none"
        />
        <text
          className="text-[11px] font-black uppercase tracking-[0.18em]"
          fill="black"
        >
          <textPath href="#quoteCirclePath" startOffset="0%">
            SERVING SINCE 2000 - SERVING SINCE 2000 -
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="h-10 w-10 overflow-visible stroke-current text-black"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20,80 Q 40,50 30,30 T 80,20" />
        <path d="M60,10 L80,20 L70,40" />
      </svg>
    </div>
  </Link>
);

export async function HomeHero() {
  const featuredServices = await getPublicFeaturedServices();
  const weekdayHours = businessHours
    .filter((item) =>
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(
        item.day,
      ),
    )
    .at(0)?.hours;

  return (
    <>
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0038FF] font-sans text-white selection:bg-[#CCFF00] selection:text-black">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pb-32 pt-8 md:pb-48 md:pt-12">
          <div className="relative z-10 mx-auto mb-16 mt-4 flex w-full max-w-5xl flex-col items-center justify-center text-center">
            <div className="relative z-10 flex w-full flex-col items-center space-y-2 md:space-y-4">
              <div className="relative z-30 flex w-full justify-start pl-[10%] md:pl-[25%]">
                <h1
                  className="m-0 p-0 text-[4rem] font-black uppercase leading-[0.85] tracking-tighter text-[#CCFF00] sm:text-[clamp(4.5rem,12vw,160px)]"
                  style={displayShadow}
                >
                  Signs
                </h1>
              </div>

              <div className="relative z-20 flex w-full justify-center">
                <h1
                  className="m-0 p-0 text-[3.55rem] font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-[clamp(5rem,15vw,220px)]"
                  style={displayShadow}
                >
                  Printing
                </h1>
              </div>

              <div className="relative z-10 flex w-full justify-start pl-[15%] md:pl-[30%]">
                <h1
                  className="m-0 p-0 text-[clamp(4.5rem,12vw,160px)] font-black uppercase leading-[0.85] tracking-tighter text-white"
                  style={displayShadow}
                >
                  Design
                </h1>
              </div>
            </div>

            <FloatingMrSignHeroCards />

            <div className="pointer-events-none absolute bottom-[0%] left-[0%] z-20 h-24 w-24 md:left-[10%] md:h-32 md:w-32">
              <ArrowGreenLeft />
            </div>
            <div className="pointer-events-none absolute right-[0%] top-[5%] z-20 h-24 w-24 md:right-[10%] md:h-32 md:w-32">
              <ArrowGreenRight />
            </div>
            <div className="absolute bottom-[-10%] right-[0%] z-40 md:right-[15%]">
              <CircularBadge />
            </div>
          </div>

          <div className="relative z-20 max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#CCFF00]">
              {homePage.eyebrow}
            </p>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-white/70">
              Proudly serving Vaughan, Concord, and the Greater Toronto Area.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href={primaryActions.quote.href}>
                {primaryActions.quote.label}
              </ButtonLink>
              <ButtonLink
                href={primaryActions.services.href}
                variant="secondary"
              >
                Browse our services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-14 w-full rounded-t-[2rem] bg-white px-1.5 py-8 text-black shadow-[0_-20px_50px_rgba(0,0,0,0.2)] sm:px-4 md:rounded-t-[3.5rem] md:px-10 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-0 md:grid md:grid-cols-3 md:gap-8">
          <div className="relative flex flex-col items-center rounded-xl border border-gray-100 bg-[#F8F9FA] p-4 text-center md:h-64 md:rounded-[2rem] md:p-8">
            <h3 className="mb-1 text-base font-black uppercase leading-tight md:mb-2 md:text-2xl">
              Request
              <br />a quote
            </h3>
            <p className="mb-3 text-[10px] font-bold text-black/60 md:mb-auto md:text-xs">
              send project details for signs, print, or design
            </p>
            <div className="relative mt-2 flex w-full max-w-[260px] justify-center md:mt-6">
              <div className="relative z-10 flex w-[190px] items-center rounded-2xl bg-[#0038FF] p-2 pr-20 text-white shadow-lg">
                <div className="relative mr-3 h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/30 bg-[#D2B48C]">
                  <Image
                    src="/images/generated/home-hero.png"
                    alt=""
                    fill
                    sizes="2rem"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold leading-none">Mr. Sign</p>
                  <p className="mt-1 text-[8px] leading-none text-white/70">
                    Vaughan shop
                  </p>
                </div>
              </div>
              <div className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-xl bg-[#CCFF00] px-3 py-2 text-[10px] font-black text-black shadow-md">
                Free quote
              </div>
            </div>
            <div className="absolute -right-12 bottom-8 z-30 hidden h-16 w-16 md:block">
              <ArrowBlack />
            </div>
          </div>

          {/* Mobile flow arrow */}
          <div className="flex items-center justify-center py-1.5 md:hidden">
            <div className="rounded-full bg-[#0038FF] p-1.5 shadow-md">
              <ArrowDown className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="relative flex flex-col items-center rounded-xl border border-gray-100 bg-[#F8F9FA] p-4 text-center md:h-64 md:rounded-[2rem] md:p-8">
            <h3 className="mb-1 text-base font-black uppercase leading-tight md:mb-2 md:text-2xl">
              Choose
              <br />
              the right service
            </h3>
            <p className="mb-3 text-[10px] font-bold text-black/60 md:mb-auto md:text-xs">
              storefront signs, cards, banners, and artwork
            </p>
            <div className="relative mt-2 flex w-full justify-center md:mt-6">
              <div className="flex items-center rounded-full bg-[#0038FF] p-1.5 text-white shadow-lg">
                <div className="mr-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white">
                  3 core
                </div>
                <div className="px-4 text-xs font-bold">services</div>
              </div>
              <div className="absolute -bottom-6 right-1/3 z-20 rotate-12 rounded-full bg-[#CCFF00] p-2.5 shadow-lg">
                <ArrowRight className="h-4 w-4 text-black" strokeWidth={3} />
              </div>
            </div>
            <div className="absolute -right-12 bottom-8 z-30 hidden h-16 w-16 md:block">
              <ArrowBlack />
            </div>
          </div>

          {/* Mobile flow arrow */}
          <div className="flex items-center justify-center py-1.5 md:hidden">
            <div className="rounded-full bg-[#0038FF] p-1.5 shadow-md">
              <ArrowDown className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="relative flex flex-col items-center rounded-xl border border-gray-100 bg-[#F8F9FA] p-4 text-center md:h-64 md:rounded-[2rem] md:p-8">
            <h3 className="mb-1 text-base font-black uppercase leading-tight md:mb-2 md:text-2xl">
              Produce
              <br />
              and pick up
            </h3>
            <p className="mb-3 text-[10px] font-bold text-black/60 md:mb-auto md:text-xs">
              local production with fast follow-up
            </p>
            <div className="relative mt-2 flex w-full max-w-[200px] flex-col items-center rounded-[2rem] bg-[#CCFF00] px-6 py-3 text-black shadow-lg md:mt-6 md:py-4">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-wider">
                Serving since
              </p>
              <p className="text-xl font-black">2000</p>
              <div className="absolute -bottom-2 left-8 h-5 w-5 rotate-45 bg-[#CCFF00]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 text-[#151515] md:px-10 md:py-14 w-full">
        <div className="mx-auto w-full">
          <div className="flex flex-col items-center text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
              Popular services
            </p>
            <h2 className="mt-2 max-w-7xl text-2xl font-black uppercase leading-tight md:text-3xl">
              A few of the products we quote every day.
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-5 w-full">
            {featuredServices.map((service) => (
              <InteractiveTravelCard
                key={service.route}
                title={service.name}
                subtitle={service.shortDescription}
                imageUrl={service.image.path}
                actionText="View service"
                href={service.route}
                className="w-full max-w-[320px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#151515] px-5 py-10 text-white md:px-10 md:py-14">
        <div className="mx-auto grid max-w-[1152px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF00]">
              Come visit us
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
              Mr. Sign and Print in Vaughan.
            </h2>
            <div className="mt-5 grid gap-2.5 text-sm font-bold leading-6 text-white/75">
              <p className="flex gap-3">
                <Store className="mt-0.5 h-5 w-5 shrink-0 text-[#CCFF00]" />
                {siteContact.address}
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#CCFF00]" />
                {siteContact.phone} or {siteContact.secondaryPhone}
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#CCFF00]" />
                {siteContact.email}
              </p>
              <p className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#CCFF00]" />
                Monday to Friday: {weekdayHours}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={primaryActions.directions.href}>
                Get directions
              </ButtonLink>
              <ButtonLink href={siteContact.phoneHref} variant="secondary">
                Call now
              </ButtonLink>
            </div>
          </div>

          <GoogleMapEmbed
            title="Google map showing Mr. Sign and Print at 399 Four Valley Dr. Unit 3 in Vaughan"
            linkLabel="Open directions"
            className="min-h-64 border-white/14"
          />
        </div>
      </section>
    </>
  );
}
