"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { useRouter } from "next/navigation";

/**
 * Props for the InteractiveTravelCard component.
 */
export interface InteractiveTravelCardProps {
  /** The main title for the card, e.g., "Sapa Valley" */
  title: string;
  /** A subtitle or location, e.g., "Vietnam" */
  subtitle: string;
  /** The URL for the background image. */
  imageUrl: string;
  /** Legacy action text retained for existing call sites. */
  actionText: string;
  /** The destination URL for the card link. */
  href: string;
  /** Callback function when the primary action button is clicked. */
  onActionClick?: () => void;
  /** Optional additional class names for custom styling. */
  className?: string;
}

/**
 * A responsive and theme-adaptive travel card with a 3D tilt effect on hover.
 */
export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, href, onActionClick, className },
    ref
  ) => {
    const router = useRouter();

    // --- 3D Tilt Animation Logic ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseXVal = e.clientX - left;
      const mouseYVal = e.clientY - top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const handleActionClick = () => {
      if (onActionClick) {
        onActionClick();
      } else {
        router.push(href);
      }
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleActionClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-[27rem] w-full cursor-pointer rounded-[1.75rem] border border-[#151515]/10 bg-white p-3 shadow-[0_24px_70px_rgba(21,21,21,0.16)]",
          className
        )}
      >
        <div
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-3 grid h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] grid-rows-[1fr_auto] overflow-hidden rounded-[1.25rem] border border-white/45 shadow-[0_18px_45px_rgba(21,21,21,0.24)]"
        >
          <Image
            src={imageUrl}
            alt={`${title}, ${subtitle}`}
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,32,0.74)_0%,rgba(12,18,32,0.26)_42%,rgba(12,18,32,0.88)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.28),transparent_44%)]" />

          <div className="relative flex h-full flex-col p-4 text-white">
            <div className="min-w-0 pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.58)]">
              <motion.h2
                style={{ transform: "translateZ(50px)" }}
                className="text-balance text-2xl font-black leading-none tracking-normal text-white md:text-[1.7rem]"
              >
                {title}
              </motion.h2>
              <motion.p
                style={{ transform: "translateZ(40px)" }}
                className="mt-2 w-full text-sm font-semibold leading-5 text-white/86"
              >
                {subtitle}
              </motion.p>
            </div>
            <motion.a
              href={href}
              onClick={(event) => event.stopPropagation()}
              whileHover={{ scale: 1.1, rotate: "2.5deg" }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Learn more about ${title}`}
              style={{ transform: "translateZ(60px)" }}
              className="absolute bottom-4 right-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/22 backdrop-blur-md ring-1 ring-inset ring-white/45 transition-colors hover:bg-white/34"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";
