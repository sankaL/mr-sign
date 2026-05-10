"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
