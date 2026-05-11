import type { PublicPricing } from "@mrsign/content";
import { BadgeDollarSign } from "lucide-react";

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
      return "Price";
    case "STARTING_FROM":
      return "Starting from";
    case "TIERED":
      return "Pricing tiers";
    case "REQUEST_QUOTE":
      return "Pricing by quote";
  }
}

function quoteLabel(pricing: PublicPricing) {
  return pricing.type === "REQUEST_QUOTE" &&
    !/legacy/i.test(pricing.publicLabel)
    ? pricing.publicLabel
    : "Request a quote for pricing for this specific service.";
}

export function PricingSummary({
  pricing,
  compact = false,
}: PricingSummaryProps) {
  const amount =
    typeof pricing.amountCents === "number" ? money(pricing.amountCents) : null;
  const hasDisplayAmount =
    (pricing.type === "EXACT_PRICE" || pricing.type === "STARTING_FROM") &&
    amount;
  const shouldShowUnit = hasDisplayAmount && pricing.unitLabel;
  const shouldShowVariablePricingNote =
    pricing.type === "STARTING_FROM" && !compact;
  const shouldShowTieredDescription =
    pricing.type === "TIERED" && pricing.tieredDescription && !compact;

  return (
    <div
      className={
        compact
          ? "border-t border-[#151515]/10 pt-3"
          : "py-0"
      }
    >
      <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-[#151515]">
          <BadgeDollarSign className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E51B23]">
            {pricingTypeLabel(pricing.type)}
          </p>
          {hasDisplayAmount ? (
            <p
              className={
                compact
                  ? "mt-1 text-base font-black leading-5 tracking-tight text-[#151515]"
                  : "mt-1 text-[1.7rem] font-black leading-none tracking-tight text-[#151515]"
              }
            >
              {amount}
            </p>
          ) : (
            <p className="mt-1 text-sm font-black leading-5 text-[#151515]">
              {pricing.type === "TIERED"
                ? pricing.publicLabel
                : quoteLabel(pricing)}
            </p>
          )}
          {shouldShowUnit ? (
            <p className="mt-1 text-xs font-bold text-[#151515]/55">
              Unit: {pricing.unitLabel}
            </p>
          ) : null}
          {shouldShowVariablePricingNote ? (
            <p className="mt-2 max-w-[42ch] text-sm font-semibold leading-6 text-[#151515]/62">
              Final pricing depends on size, material, quantity, artwork, and
              installation needs.
            </p>
          ) : null}
          {shouldShowTieredDescription ? (
            <p className="mt-2 max-w-[42ch] text-sm font-semibold leading-6 text-[#151515]/62">
              {pricing.tieredDescription}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
