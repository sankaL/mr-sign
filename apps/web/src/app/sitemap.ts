import {
  getCategory,
  serviceCategories,
  type CategorySlug,
} from "@mrsign/content";
import type { MetadataRoute } from "next";

import { getPublicServices } from "@/lib/public-services";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const mainRoutes = [
  "/",
  "/signs",
  "/printing",
  "/design",
  "/gallery",
  "/location",
  "/contact",
] as const;

const routePriority = new Map<string, number>([
  ["/", 1],
  ["/signs", 0.9],
  ["/printing", 0.9],
  ["/design", 0.9],
  ["/gallery", 0.65],
  ["/location", 0.8],
  ["/contact", 0.8],
]);

function sitemapEntry(route: string): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: routePriority.get(route) ?? 0.7,
  };
}

function getServiceRoutes(categorySlug: CategorySlug) {
  const category = getCategory(categorySlug);
  if (!category) return [];

  const services = getPublicServices(categorySlug);
  return services.map((service) => service.route);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = serviceCategories
    .map((category) => getServiceRoutes(category.slug))
    .flat();

  const routes = Array.from(new Set([...mainRoutes, ...serviceRoutes]));

  return routes.map(sitemapEntry);
}
