"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";

import { siteContact } from "@/lib/site";
import { cn } from "@/lib/utils";

type GoogleMapEmbedProps = {
  className?: string;
  linkLabel?: string;
  src?: string;
  title: string;
};

export function GoogleMapEmbed({
  className,
  linkLabel = "Open map",
  src = siteContact.mapsEmbedUrl,
  title,
}: GoogleMapEmbedProps) {
  const [showFallback, setShowFallback] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current === null) {
      return;
    }

    window.clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = null;
  }, []);

  useEffect(() => {
    clearFallbackTimer();

    fallbackTimerRef.current = window.setTimeout(() => {
      setShowFallback(true);
    }, 6000);

    return clearFallbackTimer;
  }, [clearFallbackTimer, src]);

  return (
    <div
      className={cn(
        "relative min-h-64 overflow-hidden rounded-[0.75rem] border border-[var(--line)] bg-[var(--soft)] shadow-[0_16px_40px_rgba(7,26,58,0.06)]",
        className,
      )}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        onLoad={() => {
          clearFallbackTimer();
          setShowFallback(false);
        }}
        onError={() => {
          clearFallbackTimer();
          setShowFallback(true);
        }}
      />
      {showFallback ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[var(--canvas)] px-6 text-center">
          <div className="max-w-sm">
            <MapPin className="mx-auto h-7 w-7 text-[var(--accent-amber)]" />
            <p className="font-display mt-3 text-base text-[var(--ink)]">
              Map preview unavailable
            </p>
            <p className="mt-2 text-sm font-medium leading-5 text-[var(--body-copy)]">
              Open Google Maps for directions to {siteContact.shortAddress}.
            </p>
          </div>
        </div>
      ) : null}
      <Link
        href={siteContact.directionsUrl}
        className="absolute bottom-4 left-4 z-20 inline-flex min-h-11 items-center gap-2 rounded-[0.45rem] bg-[var(--ink)] px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] !text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:!text-white active:translate-y-0"
      >
        {linkLabel}
        <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
