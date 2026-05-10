import type { PublicPricing, ServiceDetail } from "@mrsign/content";

export function serviceResetSeed(service: ServiceDetail) {
  return {
    name: service.name,
    shortDescription: service.shortDescription,
    description: service.body.join("\n\n"),
    imagePath: service.image.path,
    imageAlt: service.image.alt,
    metaTitle: service.seo.title,
    metaDescription: service.seo.description,
    status: "ACTIVE" as const,
    isFeatured: service.isFeatured ?? false,
  };
}

export function pricingResetSeed(pricing: PublicPricing) {
  return {
    type: pricing.type,
    amountCents:
      pricing.type === "STARTING_FROM" ? (pricing.amountCents ?? null) : null,
    currency: pricing.currency,
    unitLabel:
      pricing.type === "STARTING_FROM" ? (pricing.unitLabel ?? null) : null,
    tieredDescription: null,
    publicLabel: pricing.publicLabel,
  };
}
