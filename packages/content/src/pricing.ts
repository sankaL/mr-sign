import type { PublicPricing } from "./types";

const CAD = "CAD" as const;

export function requestQuote(sourceUrl?: string): PublicPricing {
  return {
    type: "REQUEST_QUOTE",
    currency: CAD,
    publicLabel: "Request Quote",
    sourceUrl,
  };
}

export function startingFrom(
  amountCents: number,
  publicLabel: string,
  sourceUrl?: string,
  unitLabel?: string,
): PublicPricing {
  return {
    type: "STARTING_FROM",
    amountCents,
    currency: CAD,
    unitLabel,
    publicLabel,
    sourceUrl,
  };
}

export function exactPrice(
  amountCents: number,
  publicLabel: string,
  sourceUrl?: string,
  unitLabel?: string,
): PublicPricing {
  return {
    type: "EXACT_PRICE",
    amountCents,
    currency: CAD,
    unitLabel,
    publicLabel,
    sourceUrl,
  };
}

export function tiered(
  publicLabel: string,
  tieredDescription: string,
  sourceUrl?: string,
): PublicPricing {
  return {
    type: "TIERED",
    currency: CAD,
    publicLabel,
    tieredDescription,
    sourceUrl,
  };
}

export function formatPricingLabel(pricing: PublicPricing) {
  return pricing.publicLabel;
}
