import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { ServiceCard } from "@/components/ui/service-card";
import { primaryActions, serviceCategories, siteContact } from "@/lib/site";

import { FloatingProductionTiles } from "./hero-motion";

const SHADOW_BLUE = "#0D1F8F";

const displayShadow = {
  textShadow: `1px 1px 0 ${SHADOW_BLUE}, 2px 2px 0 ${SHADOW_BLUE}, 3px 3px 0 ${SHADOW_BLUE}, 4px 4px 0 ${SHADOW_BLUE}, 5px 5px 0 ${SHADOW_BLUE}, 6px 6px 0 ${SHADOW_BLUE}, 7px 7px 0 ${SHADOW_BLUE}, 8px 8px 0 ${SHADOW_BLUE}, 9px 9px 0 ${SHADOW_BLUE}, 10px 10px 0 ${SHADOW_BLUE}, 11px 11px 0 ${SHADOW_BLUE}, 12px 12px 0 ${SHADOW_BLUE}`,
  fontFamily: '"Arial Black", Impact, sans-serif',
};

function ArrowYellowLeft() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full overflow-visible stroke-current text-[#FFF200]"
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
}

function ArrowYellowRight() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full overflow-visible stroke-current text-[#FFF200]"
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
}

function CircularBadge() {
  return (
    <Link
      href={primaryActions.quote.href}
      className="relative flex h-28 w-28 rotate-12 items-center justify-center rounded-full border-[3px] border-[#151515]/10 bg-[#FFF200] shadow-xl transition-transform hover:scale-105 md:h-36 md:w-36"
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
            fill="#151515"
          >
            <textPath href="#quoteCirclePath" startOffset="0%">
              FREE QUOTE - SAME DAY HELP - FREE QUOTE -
            </textPath>
          </text>
        </svg>
      </div>
      <Sparkles className="h-10 w-10 text-[#151515]" strokeWidth={3.25} />
    </Link>
  );
}

export function HomeHero() {
  return (
    <>
      <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#1936D4] text-white selection:bg-[#FFF200] selection:text-[#151515]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pb-28 pt-8 md:pb-40 md:pt-12">
          <div className="relative z-10 mx-auto mb-12 mt-4 flex w-full max-w-6xl flex-col items-center justify-center text-center md:mb-16">
            <div className="relative z-10 flex w-full flex-col items-center space-y-2 md:space-y-4">
              <div className="relative z-30 flex w-full justify-start pl-[4%] md:pl-[18%]">
                <h1
                  className="m-0 p-0 text-[clamp(3.75rem,11vw,150px)] font-black uppercase leading-[0.85] tracking-tight text-[#FFF200]"
                  style={displayShadow}
                >
                  Signs
                </h1>
              </div>
              <div className="relative z-20 flex w-full justify-center">
                <p
                  className="m-0 p-0 text-[clamp(4.2rem,13vw,190px)] font-black uppercase leading-[0.85] tracking-tight text-white"
                  style={displayShadow}
                >
                  Print
                </p>
              </div>
              <div className="relative z-10 flex w-full justify-start pl-[8%] md:pl-[29%]">
                <p
                  className="m-0 p-0 text-[clamp(3.4rem,10vw,140px)] font-black uppercase leading-[0.85] tracking-tight text-white"
                  style={displayShadow}
                >
                  Design
                </p>
              </div>
            </div>

            <FloatingProductionTiles />

            <div className="pointer-events-none absolute bottom-[2%] left-[0%] z-10 h-20 w-20 md:left-[10%] md:h-32 md:w-32">
              <ArrowYellowLeft />
            </div>
            <div className="pointer-events-none absolute right-[0%] top-[3%] z-10 h-20 w-20 md:right-[10%] md:h-32 md:w-32">
              <ArrowYellowRight />
            </div>
            <div className="absolute bottom-[-15%] right-[1%] z-30 md:right-[13%]">
              <CircularBadge />
            </div>
          </div>

          <div className="relative z-20 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primaryActions.quote.href}>
              {primaryActions.quote.label}
            </ButtonLink>
            <ButtonLink href={primaryActions.services.href} variant="secondary">
              {primaryActions.services.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="relative z-20 w-full rounded-t-[2.5rem] bg-[#FFFAF0] px-5 py-12 text-[#151515] shadow-[0_-20px_50px_rgba(0,0,0,0.18)] md:rounded-t-[3.5rem] md:px-10 md:py-16">
        <div className="mx-auto mb-8 grid max-w-[1152px] gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
              {siteContact.businessName}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-black uppercase leading-none md:text-5xl">
              Quote-ready shop support for signs, printing, and design.
            </h2>
          </div>
          <div className="grid gap-2 text-sm font-bold text-[#151515]/70">
            <Link
              href={siteContact.phoneHref}
              className="flex items-center gap-2 transition-colors hover:text-[#1936D4]"
            >
              <Phone className="h-4 w-4 text-[#E51B23]" />
              {siteContact.phone}
            </Link>
            <Link
              href={siteContact.emailHref}
              className="flex items-center gap-2 transition-colors hover:text-[#1936D4]"
            >
              <Mail className="h-4 w-4 text-[#E51B23]" />
              {siteContact.email}
            </Link>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#E51B23]" />
              {siteContact.shortAddress}
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1152px] gap-6">
          {serviceCategories.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
