import { strict as assert } from "node:assert";
import test from "node:test";

import { getService, homePage } from "@mrsign/content";
import type { Metadata } from "next";

import {
  buildCategoryMetadata,
  buildContentPageMetadata,
  buildServiceMetadata,
  defaultSocialImage,
  socialImageForRoute,
} from "./seo";

const productionSiteUrl = "https://web-production-170be.up.railway.app";
const socialAssetVersion = "?v=20260707";

type ImageDescriptor = {
  url: string;
  secureUrl: string;
  alt: string;
  type: string;
  width: number;
  height: number;
};

function getOpenGraph(metadata: Metadata) {
  assert.ok(metadata.openGraph);
  return metadata.openGraph;
}

function getTwitter(metadata: Metadata) {
  assert.ok(metadata.twitter);
  return metadata.twitter;
}

function firstImage(images: unknown) {
  assert.ok(Array.isArray(images));
  assert.equal(images.length, 1);
  assert.equal(typeof images[0], "object");
  return images[0] as ImageDescriptor;
}

test("content metadata emits complete Open Graph and Twitter image descriptors", () => {
  const metadata = buildContentPageMetadata(homePage);
  const openGraph = getOpenGraph(metadata);
  const twitter = getTwitter(metadata);
  const openGraphImage = firstImage(openGraph.images);
  const twitterImage = firstImage(twitter.images);

  assert.equal(openGraph.title, homePage.seo.socialTitle);
  assert.equal((openGraph as { type?: string }).type, "website");
  assert.equal(openGraph.url, `${productionSiteUrl}/`);
  assert.equal(openGraph.siteName, "Mr. Sign and Print");
  assert.equal(openGraph.locale, "en_CA");
  assert.deepEqual(openGraphImage, {
    url: `${productionSiteUrl}/social/default-social.png${socialAssetVersion}`,
    secureUrl: `${productionSiteUrl}/social/default-social.png${socialAssetVersion}`,
    alt: defaultSocialImage.alt,
    type: "image/png",
    width: 1200,
    height: 630,
  });
  assert.equal((twitter as { card?: string }).card, "summary_large_image");
  assert.deepEqual(twitterImage, openGraphImage);
});

test("category and service metadata use their matching social cards", () => {
  const categoryMetadata = buildCategoryMetadata("signs");
  const categoryImage = firstImage(getOpenGraph(categoryMetadata).images);
  const service = getService("printing", "brochures");

  assert.ok(service);

  const serviceMetadata = buildServiceMetadata(
    service,
    "Printing Service",
    service.route,
  );
  const serviceImage = firstImage(getOpenGraph(serviceMetadata).images);

  assert.equal(
    categoryImage.url,
    `${productionSiteUrl}/social/signs-social.png${socialAssetVersion}`,
  );
  assert.equal(
    serviceImage.url,
    `${productionSiteUrl}/social/printing-social.png${socialAssetVersion}`,
  );
  assert.equal(
    getOpenGraph(serviceMetadata).url,
    `${productionSiteUrl}${service.route}`,
  );
});

test("route-based fallbacks retain category-specific previews", () => {
  const metadata = buildServiceMetadata(
    null,
    "Sign Service",
    "/services/unknown-service",
  );
  const image = firstImage(getOpenGraph(metadata).images);

  assert.equal(
    image.url,
    `${productionSiteUrl}/social/services-social.png${socialAssetVersion}`,
  );
  assert.equal(socialImageForRoute("/about-us"), defaultSocialImage);
  assert.equal(
    socialImageForRoute("/signs/channel-letters").path,
    "/social/signs-social.png",
  );
});
