"use client";

import { motion } from "motion/react";

import { SignagePanel } from "@/components/ui/signage-panel";

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
