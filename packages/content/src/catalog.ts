import { serviceCategories } from "./data/categories";
import { featuredServiceRefs, services } from "./data/services";
import { homePage } from "./site";
import type { CategorySlug, ServiceDetail, ServiceReference } from "./types";

export { serviceCategories, services };

export function getCategory(categorySlug: CategorySlug) {
  return serviceCategories.find((category) => category.slug === categorySlug);
}

export function getServicesByCategory(categorySlug: CategorySlug) {
  return services
    .filter((service) => service.categorySlug === categorySlug)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getService(categorySlug: CategorySlug, serviceSlug: string) {
  return services.find(
    (service) =>
      service.categorySlug === categorySlug && service.slug === serviceSlug,
  );
}

export function getServiceByRef(reference: ServiceReference) {
  return getService(reference.categorySlug, reference.serviceSlug);
}

function isServiceDetail(
  service: ServiceDetail | undefined,
): service is ServiceDetail {
  return Boolean(service);
}

export function getRelatedServices(reference: ServiceReference) {
  const service = getServiceByRef(reference);

  if (!service) {
    return [];
  }

  return service.related
    .map((related) => getServiceByRef(related))
    .filter(isServiceDetail);
}

export function getFeaturedServices() {
  return featuredServiceRefs
    .map((reference) => getServiceByRef(reference))
    .filter(isServiceDetail);
}

export function getGalleryServices() {
  return [
    ...getFeaturedServices(),
    getService("signs", "awnings"),
    getService("signs", "sandwich-boards"),
    getService("printing", "brochures"),
    getService("printing", "large-format-printing"),
    getService("design", "logos"),
    getService("design", "silk-screens"),
    getService("design", "websites"),
    getService("signs", "window-lettering"),
  ].filter(isServiceDetail);
}

export function getServiceRoute(reference: ServiceReference) {
  return `/${reference.categorySlug}/${reference.serviceSlug}` as const;
}

export function getAllImageAssets() {
  return [
    ...(homePage.image ? [homePage.image] : []),
    ...serviceCategories.map((category) => category.image),
    ...services.map((service) => service.image),
  ];
}

export function getStaticServiceParams() {
  return serviceCategories.flatMap((category) =>
    getServicesByCategory(category.slug).map((service) => ({
      categorySlug: category.slug,
      serviceSlug: service.slug,
    })),
  );
}
