import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const SHADOW_BLUE = "#0D1F8F";

const ArrowYellowLeft = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible stroke-current text-[#FFF200]" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowYellowRight = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible stroke-current text-[#FFF200]" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

const ArrowBlack = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible stroke-current text-black" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20,80 Q 40,20 80,40" />
    <path d="M60,20 L80,40 L50,60" />
  </svg>
);

const CircularBadge = () => (
  <a href="mailto:order@mrsignandprint.net" className="relative flex h-28 w-28 rotate-12 cursor-pointer items-center justify-center rounded-full border-[3px] border-black/10 bg-[#FFF200] shadow-xl transition-transform hover:scale-105 md:h-36 md:w-36">
    <div className="absolute inset-1 animate-[spin_10s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
        <text className="text-[11px] font-black uppercase tracking-[0.18em]" fill="black">
          <textPath href="#circlePath" startOffset="0%">
            FREE QUOTE • SAME DAY HELP • FREE QUOTE •
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Sparkles className="h-10 w-10 text-black" strokeWidth={3.5} />
    </div>
  </a>
);

const displayShadow = {
  textShadow: `1px 1px 0 ${SHADOW_BLUE}, 2px 2px 0 ${SHADOW_BLUE}, 3px 3px 0 ${SHADOW_BLUE}, 4px 4px 0 ${SHADOW_BLUE}, 5px 5px 0 ${SHADOW_BLUE}, 6px 6px 0 ${SHADOW_BLUE}, 7px 7px 0 ${SHADOW_BLUE}, 8px 8px 0 ${SHADOW_BLUE}, 9px 9px 0 ${SHADOW_BLUE}, 10px 10px 0 ${SHADOW_BLUE}, 11px 11px 0 ${SHADOW_BLUE}, 12px 12px 0 ${SHADOW_BLUE}, 13px 13px 0 ${SHADOW_BLUE}, 14px 14px 0 ${SHADOW_BLUE}`,
  fontFamily: '"Arial Black", Impact, sans-serif',
};

const workSamples = [
  {
    title: "Storefront Signs",
    body: "Channel letters, fascia signs, window graphics, and outdoor visibility for local businesses.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    label: "Built for street impact",
  },
  {
    title: "Print Runs",
    body: "Business cards, flyers, menus, banners, and sales material with tight turnaround.",
    image: "https://images.unsplash.com/photo-1585241936939-be4099591252?auto=format&fit=crop&w=600&q=80",
    label: "Ready for pickup",
  },
  {
    title: "Design Support",
    body: "Layout, prepress checks, production files, and sign-ready artwork when you need help fast.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80",
    label: "Proof before production",
  },
];

export const Component = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#1936D4] font-sans selection:bg-[#FFF200] selection:text-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <nav className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 md:py-8">
        <a href="#" className="flex items-center gap-1" aria-label="Mr. Sign and Print home">
          <div className="relative rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-xs font-black tracking-tight text-black shadow-sm md:text-sm">
            MR. SIGN
            <div className="absolute -bottom-1.5 left-0 h-3 w-3 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
          </div>
          <div className="rounded-full border-[1.5px] border-white bg-[#FFF200] px-3 py-1.5 text-xs font-black text-black shadow-sm md:text-sm">
            PRINT
          </div>
        </a>

        <div className="hidden items-center space-x-2 md:flex">
          {["Signs", "Printing", "Design", "Location"].map((item) => (
            <a key={item} href="#" className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10">
              {item}
            </a>
          ))}
        </div>

        <a href="tel:14165129353" className="rounded-full border border-white px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#1936D4] md:px-6 md:text-sm">
          Call for quote
        </a>
      </nav>

      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pb-32 pt-8 md:pb-48 md:pt-12">
        <div className="relative z-10 mx-auto mb-16 mt-4 flex w-full max-w-6xl flex-col items-center justify-center text-center">
          <div className="relative z-10 flex w-full flex-col items-center space-y-2 md:space-y-4">
            <div className="relative z-30 flex w-full justify-start pl-[8%] md:pl-[18%]">
              <h1 className="m-0 p-0 text-[clamp(4rem,11vw,150px)] font-black uppercase leading-[0.85] tracking-tight text-[#FFF200]" style={displayShadow}>
                SIGNS
              </h1>
            </div>

            <div className="relative z-20 flex w-full justify-center">
              <h1 className="m-0 p-0 text-[clamp(4.5rem,13vw,200px)] font-black uppercase leading-[0.85] tracking-tight text-white" style={displayShadow}>
                PRINT
              </h1>
            </div>

            <div className="relative z-10 flex w-full justify-start pl-[12%] md:pl-[29%]">
              <h1 className="m-0 p-0 text-[clamp(3.8rem,10vw,145px)] font-black uppercase leading-[0.85] tracking-tight text-white" style={displayShadow}>
                DESIGN
              </h1>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 h-full w-full">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-auto absolute bottom-[4%] left-[2%] z-30 md:left-[14%]">
              <div className="flex aspect-[3/3.5] w-40 rotate-[-12deg] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/40 bg-white/20 p-4 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 md:w-52">
                <img src="https://images.unsplash.com/photo-1560853968-963a0fd04c22?auto=format&fit=crop&w=500&q=80" alt="Printed business cards and materials" className="absolute inset-0 h-full w-full object-cover opacity-85" />
                <div className="relative rounded-2xl bg-black/55 p-3 text-left text-white backdrop-blur-sm">
                  <p className="text-sm font-black md:text-lg">Rush print jobs</p>
                  <p className="mt-1 text-[10px] font-semibold text-white/85 md:text-xs">Flyers, cards, menus, posters</p>
                </div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="pointer-events-auto absolute right-[2%] top-[12%] z-30 md:right-[15%]">
              <div className="flex aspect-[3/3.5] w-40 rotate-[12deg] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/40 bg-white/20 p-4 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 md:w-52">
                <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=500&q=80" alt="Bright storefront signage" className="absolute inset-0 h-full w-full object-cover opacity-85" />
                <div className="relative rounded-2xl bg-black/55 p-3 text-left text-white backdrop-blur-sm">
                  <p className="text-sm font-black md:text-lg">Custom signs</p>
                  <p className="mt-1 text-[10px] font-semibold text-white/85 md:text-xs">Built for Vaughan and the GTA</p>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-[0%] left-[0%] z-20 h-24 w-24 md:left-[10%] md:h-32 md:w-32">
              <ArrowYellowLeft />
            </div>

            <div className="absolute right-[0%] top-[5%] z-20 h-24 w-24 md:right-[10%] md:h-32 md:w-32">
              <ArrowYellowRight />
            </div>

            <div className="pointer-events-auto absolute bottom-[-16%] right-[2%] z-40 md:right-[13%]">
              <CircularBadge />
            </div>
          </div>
        </div>
      </main>

      <section className="relative z-20 mt-auto w-full rounded-t-[2.5rem] bg-[#FFFAF0] px-6 py-12 text-black shadow-[0_-20px_50px_rgba(0,0,0,0.2)] md:rounded-t-[3.5rem] md:px-10 md:py-16">
        <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">Mr. Sign and Print</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-black uppercase leading-none md:text-5xl">Quote-ready shop support for signs, printing, and design.</h2>
          </div>
          <div className="grid gap-2 text-sm font-bold text-black/70">
            <a href="tel:14165129353" className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#E51B23]" /> (416) 512-9353</a>
            <a href="mailto:order@mrsignandprint.net" className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#E51B23]" /> order@mrsignandprint.net</a>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#E51B23]" /> 399 Four Valley Dr. Unit 3, Vaughan</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {workSamples.map((item, index) => (
            <article key={item.title} className="relative flex h-72 flex-col justify-between overflow-hidden rounded-[2rem] border border-black/10 bg-white p-6 text-left">
              <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18" />
              <div className="relative">
                <span className="rounded-full bg-[#FFF200] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">{item.label}</span>
                <h3 className="mt-5 text-2xl font-black uppercase leading-none">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-black/65">{item.body}</p>
              </div>
              <a href="mailto:order@mrsignandprint.net" className="relative inline-flex w-fit rounded-full bg-[#1936D4] px-5 py-2 text-xs font-black uppercase text-white transition-colors hover:bg-[#E51B23]">
                Request quote
              </a>
              {index < 2 ? (
                <div className="absolute -right-12 bottom-8 z-30 hidden h-16 w-16 md:block">
                  <ArrowBlack />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
