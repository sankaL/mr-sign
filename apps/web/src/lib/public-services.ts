import {
  getFeaturedServices,
  getService,
  getServicesByCategory,
  type CategorySlug,
} from "@mrsign/content";

export function getPublicServices(categorySlug: CategorySlug) {
  return getServicesByCategory(categorySlug);
}

export function getPublicService(
  categorySlug: CategorySlug,
  serviceSlug: string,
) {
  return getService(categorySlug, serviceSlug) ?? null;
}

export function getPublicFeaturedServices() {
  return getFeaturedServices();
}

export function getPublicStaticServiceParams(categorySlug: CategorySlug) {
  return getServicesByCategory(categorySlug).map((service) => ({
    serviceSlug: service.slug,
  }));
}
