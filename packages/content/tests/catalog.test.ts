import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import test from "node:test";

import {
  getAllImageAssets,
  getCategory,
  getRelatedServices,
  serviceCategories,
  services,
} from "../src/index";

const blockedPublicCopy = new RegExp(
  ["request q" + "uote", "request a q" + "uote", "request c" + "ode"].join("|"),
  "i",
);
const validPricingTypes = new Set([
  "fixed",
  "startingFrom",
  "tiered",
  "contactForPricing",
]);

function jsonFiles(directory: URL): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const url = new URL(`${entry}`, directory);
    const relative = url.pathname;

    if (statSync(url).isDirectory()) {
      return jsonFiles(new URL(`${entry}/`, directory));
    }

    return relative.endsWith(".json") ? [relative] : [];
  });
}

test("catalog exposes the MVP categories and services from JSON", () => {
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

test("all services have required fields, valid pricing, and metadata", () => {
  for (const service of services) {
    assert.ok(getCategory(service.categorySlug), service.route);
    assert.ok(service.slug, service.route);
    assert.ok(service.name, service.route);
    assert.equal(service.status, "published", service.route);
    assert.equal(typeof service.displayOrder, "number", service.route);
    assert.equal(typeof service.featured, "boolean", service.route);
    assert.ok(service.headline, service.route);
    assert.ok(service.shortDescription, service.route);
    assert.ok(service.body.length > 0, service.route);
    assert.ok(service.capabilities.length > 0, service.route);
    assert.ok(service.seo.title, service.route);
    assert.ok(service.seo.description, service.route);
    assert.ok(validPricingTypes.has(service.pricing.type), service.route);
    assert.ok(service.pricing.label, service.route);

    if (
      service.pricing.type === "fixed" ||
      service.pricing.type === "startingFrom"
    ) {
      assert.equal(typeof service.pricing.amountCents, "number");
      assert.ok(service.pricing.amountCents > 0);
    }

    if (service.pricing.type === "tiered") {
      assert.ok(service.pricing.description, service.route);
    }

    if (service.pricing.type === "contactForPricing") {
      assert.match(service.pricing.label, /contact/i, service.route);
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

test("JSON content avoids removed submission language", () => {
  const contentFiles = jsonFiles(new URL("../content/", import.meta.url));

  assert.ok(contentFiles.length > 40);

  for (const file of contentFiles) {
    const content = readFileSync(file, "utf8");
    assert.doesNotMatch(content, blockedPublicCopy, file);
  }
});
