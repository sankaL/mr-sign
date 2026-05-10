import assert from "node:assert/strict";
import test from "node:test";

import type { PublicPricing, ServiceDetail } from "@mrsign/content";

import {
  pricingResetSeed,
  serviceResetSeed,
} from "../scripts/service-seed-reset.js";

const serviceFixture: ServiceDetail = {
  categorySlug: "signs",
  slug: "awnings",
  name: "Awnings",
  route: "/signs/awnings",
  eyebrow: "signs",
  headline: "Awnings",
  shortDescription: "Curated awning description.",
  body: ["First paragraph.", "Second paragraph."],
  capabilities: ["Capability"],
  pricing: {
    type: "STARTING_FROM",
    amountCents: 3500,
    currency: "CAD",
    unitLabel: "per sq ft",
    publicLabel: "Base service price",
  },
  image: {
    path: "/images/generated/signs-awnings.png",
    alt: "Awning over storefront.",
    prompt: "Awning image prompt.",
  },
  seo: {
    title: "Awning title",
    description: "Awning description",
  },
  related: [],
  displayOrder: 1,
};

test("serviceResetSeed returns canonical service fields for reseeding", () => {
  assert.deepEqual(serviceResetSeed(serviceFixture), {
    name: "Awnings",
    shortDescription: "Curated awning description.",
    description: "First paragraph.\n\nSecond paragraph.",
    imagePath: "/images/generated/signs-awnings.png",
    imageAlt: "Awning over storefront.",
    metaTitle: "Awning title",
    metaDescription: "Awning description",
    status: "ACTIVE",
    isFeatured: false,
  });
});

test("pricingResetSeed keeps starting prices and clears quote-only fields", () => {
  assert.deepEqual(pricingResetSeed(serviceFixture.pricing), {
    type: "STARTING_FROM",
    amountCents: 3500,
    currency: "CAD",
    unitLabel: "per sq ft",
    tieredDescription: null,
    publicLabel: "Base service price",
  });

  const quotePricing: PublicPricing = {
    type: "REQUEST_QUOTE",
    amountCents: 9999,
    currency: "CAD",
    unitLabel: "per hidden unit",
    tieredDescription: "Hidden legacy tiers",
    publicLabel: "Request a quote",
  };

  assert.deepEqual(pricingResetSeed(quotePricing), {
    type: "REQUEST_QUOTE",
    amountCents: null,
    currency: "CAD",
    unitLabel: null,
    tieredDescription: null,
    publicLabel: "Request a quote",
  });
});
