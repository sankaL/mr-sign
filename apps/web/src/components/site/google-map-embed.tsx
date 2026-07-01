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
        "relative min-h-64 overflow-hidden rounded-[2rem] border border-[#151515]/10 bg-[#E8F2FF] shadow-sm",
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
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#FFFAF0] px-6 text-center">
          <div className="max-w-sm">
            <MapPin className="mx-auto h-7 w-7 text-[#E51B23]" />
            <p className="mt-3 text-sm font-black uppercase tracking-wide text-[#151515]">
              Map preview unavailable
            </p>
            <p className="mt-2 text-sm font-semibold leading-5 text-[#151515]/70">
              Open Google Maps for directions to {siteContact.shortAddress}.
            </p>
          </div>
        </div>
      ) : null}
      <Link
        href={siteContact.directionsUrl}
        className="absolute bottom-4 left-4 z-20 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#151515] px-4 py-2 text-xs font-black uppercase tracking-wide !text-white shadow-lg transition-colors hover:bg-[#0B1F55] hover:!text-white focus-visible:bg-[#0B1F55] focus-visible:!text-white active:scale-[0.98]"
      >
        {linkLabel}
        <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
