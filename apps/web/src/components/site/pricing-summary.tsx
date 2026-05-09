import type { PublicPricing } from "@mrsign/content";
import { BadgeDollarSign, ExternalLink } from "lucide-react";
import Link from "next/link";

type PricingSummaryProps = {
  pricing: PublicPricing;
  compact?: boolean;
};

function money(amountCents: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: amountCents % 100 === 0 ? 0 : 2,
  }).format(amountCents / 100);
}

function pricingTypeLabel(type: PublicPricing["type"]) {
  switch (type) {
    case "EXACT_PRICE":
      return "Exact legacy price";
    case "STARTING_FROM":
      return "Starting price";
    case "TIERED":
      return "Legacy tiers";
    case "REQUEST_QUOTE":
      return "Quoted by job";
  }
}

export function PricingSummary({
  pricing,
  compact = false,
}: PricingSummaryProps) {
  const amount =
    typeof pricing.amountCents === "number" ? money(pricing.amountCents) : null;

  return (
    <div
      className={
        compact
          ? "border-t border-[#151515]/10 pt-3"
          : "rounded-2xl border border-[#151515]/10 bg-white p-4 md:p-5"
      }
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-[#151515]">
          <BadgeDollarSign className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E51B23]">
            {pricingTypeLabel(pricing.type)}
          </p>
          <p className="mt-1 text-sm font-black leading-5 text-[#151515]">
            {amount
              ? `${amount} CAD - ${pricing.publicLabel}`
              : pricing.publicLabel}
          </p>
          {pricing.unitLabel ? (
            <p className="mt-1 text-xs font-bold text-[#151515]/55">
              Unit: {pricing.unitLabel}
            </p>
          ) : null}
        </div>
      </div>

      {!compact && pricing.tieredDescription ? (
        <p className="mt-4 text-sm font-semibold leading-6 text-[#151515]/68">
          {pricing.tieredDescription}
        </p>
      ) : null}

      {!compact && pricing.sourceUrl ? (
        <Link
          href={pricing.sourceUrl}
          className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1936D4] transition-colors hover:text-[#E51B23]"
          target="_blank"
          rel="noreferrer"
        >
          Legacy source
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
