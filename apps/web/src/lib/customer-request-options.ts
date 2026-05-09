import {
  getCategory,
  getService,
  getServicesByCategory,
  serviceCategories,
  type CategorySlug,
} from "@mrsign/content";

import type {
  CustomerRequestDefaults,
  ServiceSelectGroup,
} from "@/components/forms/customer-request-types";

function isCategorySlug(value: string | undefined): value is CategorySlug {
  return value === "signs" || value === "printing" || value === "design";
}

export function serviceOptionValue(categorySlug: string, serviceSlug: string) {
  return `${categorySlug}:${serviceSlug}`;
}

export function getServiceSelectGroups(): ServiceSelectGroup[] {
  return serviceCategories.map((category) => ({
    label: category.name,
    options: getServicesByCategory(category.slug).map((service) => ({
      label: service.name,
      value: serviceOptionValue(category.slug, service.slug),
    })),
  }));
}

export function getValidatedRequestDefaults(
  category: string | undefined,
  service: string | undefined,
): CustomerRequestDefaults {
  if (!isCategorySlug(category) || !service) {
    return {};
  }

  const matchedCategory = getCategory(category);
  const matchedService = getService(category, service);

  if (!matchedCategory || !matchedService) {
    return {};
  }

  return {
    category: matchedCategory.slug,
    service: serviceOptionValue(matchedCategory.slug, matchedService.slug),
  };
}
