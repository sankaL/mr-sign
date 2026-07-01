import { homePage } from "@mrsign/content";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { primaryActions } from "@/lib/site";

const displayShadow = {
  textShadow:
    "1px 1px 0 #061437, 2px 2px 0 #061437, 3px 3px 0 #061437, 4px 4px 0 #061437, 5px 5px 0 #061437, 6px 6px 0 #061437, 7px 7px 0 #061437, 8px 8px 0 #061437, 9px 9px 0 #061437, 10px 10px 0 #061437, 11px 11px 0 #061437, 12px 12px 0 #061437",
  fontFamily: '"Arial Black", Impact, sans-serif',
};

const quoteEverydayProducts = [
  "Channel lettering",
  "Illuminated boxes",
  "Pylon signs",
  "Banners",
  "Vehicle lettering",
  "Sign maintenance",
  "Electrical repairs",
  "Large format printing",
];

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

const CircularBadge = () => (
  <Link
    href={primaryActions.contact.href}
    className="relative flex h-[clamp(4.75rem,8vw,7.5rem)] w-[clamp(4.75rem,8vw,7.5rem)] rotate-12 cursor-pointer items-center justify-center rounded-full border-[3px] border-black/5 bg-[#CCFF00] shadow-xl transition-transform hover:scale-105"
    aria-label="Contact Mr. Sign and Print"
  >
    <div className="absolute inset-1 animate-[spin_10s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path
          id="badgeCirclePath"
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          fill="none"
        />
        <text
          className="text-[12px] font-black uppercase tracking-[0.2em]"
          fill="black"
        >
          <textPath href="#badgeCirclePath" startOffset="0%">
            CONTACT US - CONTACT US - CONTACT US -
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xl font-black uppercase text-black">Go</span>
    </div>
  </Link>
);

export function HomeHero() {
  return (
    <>
      <section className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col overflow-hidden bg-[#0B1F55] font-sans text-white selection:bg-[#CCFF00] selection:text-black">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-14 md:px-10 md:py-20">
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#CCFF00]">
              {homePage.eyebrow}
            </p>
            <div className="mt-5 grid gap-4">
              <h1
                className="m-0 max-w-6xl p-0 text-[clamp(5.2rem,19vw,18rem)] font-black uppercase leading-[0.78] tracking-normal text-[#CCFF00]"
                style={displayShadow}
              >
                Signs
              </h1>
              <div className="grid gap-3 md:grid-cols-[auto_1fr] md:items-end md:gap-8">
                <p className="w-fit border-2 border-[#CCFF00] bg-white px-4 py-3 text-sm font-black uppercase leading-tight tracking-[0.18em] text-[#0B1F55] shadow-[8px_8px_0_#CCFF00]">
                  All In House
                  <br />
                  Manufacturing
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <p
                    className="text-[clamp(2.4rem,7vw,5.5rem)] font-black uppercase leading-none text-white"
                    style={displayShadow}
                  >
                    Printing
                  </p>
                  <p
                    className="text-[clamp(2.4rem,7vw,5.5rem)] font-black uppercase leading-none text-white"
                    style={displayShadow}
                  >
                    Services
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-white/78">
                Proudly Serving The Greater Toronto Area since 1998
              </p>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/78">
                {homePage.subheadline}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={primaryActions.call.href}>
                  {primaryActions.call.label}
                </ButtonLink>
                <ButtonLink
                  href={primaryActions.contact.href}
                  variant="secondary"
                >
                  Contact Us
                </ButtonLink>
              </div>
            </div>

            <div className="mt-8 flex justify-end md:absolute md:bottom-2 md:right-4 md:mt-0">
              <CircularBadge />
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-5 z-20 h-20 w-20 md:left-10 md:h-28 md:w-28">
            <ArrowGreenLeft />
          </div>
          <div className="pointer-events-none absolute right-5 top-16 z-20 h-20 w-20 md:right-10 md:top-20 md:h-28 md:w-28">
            <ArrowGreenRight />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFAF0] px-5 py-12 text-[#151515] md:px-10 md:py-16">
        <div className="mx-auto max-w-[1152px]">
          <div className="max-w-4xl">
            <h2 className="text-[clamp(2rem,4vw,3.75rem)] font-black uppercase leading-[0.95] tracking-normal">
              A Few of the Products and Services we Quote Everyday
            </h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quoteEverydayProducts.map((product) => (
              <div
                key={product}
                className="flex min-h-28 items-end rounded-2xl border border-[#151515]/10 bg-white p-4 shadow-[0_12px_30px_rgba(21,21,21,0.06)]"
              >
                <p className="text-xl font-black uppercase leading-none">
                  {product}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
