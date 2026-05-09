"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { SignagePanel } from "@/components/ui/signage-panel";

type FloatingShopCardProps = {
  className: string;
  delay?: number;
  duration: number;
  image: string;
  label: string;
  meta: string;
  rotate: string;
  href: string;
};

function FloatingShopCard({
  className,
  delay = 0,
  duration,
  image,
  label,
  meta,
  rotate,
  href,
}: FloatingShopCardProps) {
  return (
    <motion.div
      animate={{ y: [0, duration === 5 ? -15 : -20, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className={className}
    >
      <Link
        href={href}
        aria-label={`View ${label}`}
        className={`flex aspect-[3/3.5] w-40 flex-col items-center justify-center rounded-[2rem] border border-white/40 bg-white/20 p-5 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 md:w-52 ${rotate}`}
      >
        <div className="relative mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-[3px] border-white/50 bg-[#D2B48C] shadow-inner md:h-24 md:w-24">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 6rem, 4rem"
            className="object-cover"
          />
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-bold text-white md:text-lg">{label}</p>
          <p className="mt-1 text-[10px] font-semibold text-white md:text-xs">
            {meta}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function FloatingMrSignHeroCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block">
      <FloatingShopCard
        className="pointer-events-auto absolute bottom-[10%] left-[5%] z-30 md:left-[20%]"
        duration={5}
        href="/printing"
        image="/images/generated/printing-hero.png"
        label="Printing"
        meta="cards, flyers, posters"
        rotate="rotate-[-12deg]"
      />
      <FloatingShopCard
        className="pointer-events-auto absolute right-[5%] top-[15%] z-30 md:right-[22%]"
        delay={1}
        duration={6}
        href="/signs"
        image="/images/generated/signs-hero.png"
        label="Signs"
        meta="storefront, vehicle, banner"
        rotate="rotate-[12deg]"
      />
    </div>
  );
}

export function FloatingProductionTiles() {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full">
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-auto absolute bottom-[3%] left-[1%] z-20 md:left-[12%]"
      >
        <SignagePanel
          label="Rush Print"
          accent="yellow"
          className="aspect-[3/3.5] w-40 rotate-[-12deg] transition-transform duration-500 hover:rotate-0 md:w-52"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-auto absolute right-[1%] top-[11%] z-20 md:right-[13%]"
      >
        <SignagePanel
          label="Custom Signs"
          accent="red"
          className="aspect-[3/3.5] w-40 rotate-[12deg] transition-transform duration-500 hover:rotate-0 md:w-52"
        />
      </motion.div>
    </div>
  );
}
