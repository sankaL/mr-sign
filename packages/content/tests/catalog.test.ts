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
  const validPricingTypes = new Set(["STARTING_FROM", "REQUEST_QUOTE"]);

  for (const service of services) {
    assert.ok(getCategory(service.categorySlug));
    assert.ok(service.seo.title);
    assert.ok(service.seo.description);
    assert.ok(validPricingTypes.has(service.pricing.type));
    assert.ok(service.pricing.publicLabel);

    if (service.pricing.type === "STARTING_FROM") {
      assert.equal(typeof service.pricing.amountCents, "number");
      assert.ok(service.pricing.unitLabel);
      assert.equal(service.pricing.tieredDescription, undefined);
    }

    if (service.pricing.type === "REQUEST_QUOTE") {
      assert.equal(service.pricing.amountCents, undefined);
      assert.equal(service.pricing.tieredDescription, undefined);
    }
    assert.doesNotMatch(service.pricing.publicLabel, /legacy/i);
  }
});

test("normalized service content overrides legacy copy and pricing", () => {
  const awnings = services.find(
    (service) => service.categorySlug === "signs" && service.slug === "awnings",
  );

  assert.ok(awnings);
  assert.equal(
    awnings.shortDescription,
    "Custom awnings that work as storefront signs, shaped to fit your entrance and carry your brand clearly.",
  );
  assert.deepEqual(awnings.capabilities.slice(0, 2), [
    "Metal skeletons shaped for the storefront entrance",
    "Vinyl awning skins with branded lettering",
  ]);
  assert.equal(awnings.pricing.type, "STARTING_FROM");
  assert.equal(awnings.pricing.publicLabel, "Base service price");
  assert.equal(awnings.pricing.amountCents, 3500);
  assert.equal(awnings.pricing.unitLabel, "per sq ft");
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
