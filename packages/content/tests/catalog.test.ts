import assert from "node:assert/strict";
import test from "node:test";

import {
  getAllImageAssets,
  getCategory,
  getRelatedServices,
  serviceCategories,
  services,
} from "../src/index";

test("catalog exposes the MVP categories and services", () => {
  assert.equal(serviceCategories.length, 3);
  assert.equal(services.length, 42);
  assert.deepEqual(
    serviceCategories.map((category) => category.slug),
    ["signs", "printing", "design"],
  );
});

test("service routes are unique and category-scoped", () => {
  const routes = services.map((service) => service.route);
  assert.equal(new Set(routes).size, routes.length);
  assert.ok(services.some((service) => service.slug === "menu-boxes"));
  assert.equal(
    services.filter((service) => service.slug === "menu-boxes").length,
    2,
  );
});

test("all services have valid pricing and metadata", () => {
  const validPricingTypes = new Set([
    "EXACT_PRICE",
    "STARTING_FROM",
    "TIERED",
    "REQUEST_QUOTE",
  ]);

  for (const service of services) {
    assert.ok(getCategory(service.categorySlug));
    assert.ok(service.seo.title);
    assert.ok(service.seo.description);
    assert.ok(validPricingTypes.has(service.pricing.type));
    assert.ok(service.pricing.publicLabel);

    if (service.pricing.type === "TIERED") {
      assert.ok(service.pricing.tieredDescription);
    }

    if (
      service.pricing.type === "EXACT_PRICE" ||
      service.pricing.type === "STARTING_FROM"
    ) {
      assert.equal(typeof service.pricing.amountCents, "number");
    }
  }
});

test("related service references resolve", () => {
  for (const service of services) {
    assert.equal(
      getRelatedServices({
        categorySlug: service.categorySlug,
        serviceSlug: service.slug,
      }).length,
      service.related.length,
      service.route,
    );
  }
});

test("image asset references are complete", () => {
  const assets = getAllImageAssets();

  assert.equal(assets.length, 46);

  for (const asset of assets) {
    assert.match(asset.path, /^\/images\/generated\/[a-z0-9-]+\.png$/);
    assert.ok(asset.alt.length > 10);
    assert.ok(asset.prompt.length > 40);
  }
});
