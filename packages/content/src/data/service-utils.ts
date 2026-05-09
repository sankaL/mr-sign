import type {
  CategorySlug,
  PublicPricing,
  ServiceDetail,
  ServiceReference,
} from "../types";

type ServiceInput = {
  categorySlug: CategorySlug;
  slug: string;
  name: string;
  displayOrder: number;
  shortDescription: string;
  headline: string;
  body?: string[];
  capabilities: string[];
  pricing: PublicPricing;
  imageAlt: string;
  imagePrompt: string;
  metaTitle: string;
  metaDescription: string;
  related: ServiceReference[];
  isFeatured?: boolean;
};

export function service(input: ServiceInput): ServiceDetail {
  const body = input.body ?? [
    input.shortDescription,
    `Mr. Sign and Print supports ${input.name.toLowerCase()} work for businesses, organizations, and events across Vaughan, Concord, and the GTA.`,
  ];

  return {
    categorySlug: input.categorySlug,
    slug: input.slug,
    name: input.name,
    route: `/${input.categorySlug}/${input.slug}`,
    eyebrow: input.categorySlug,
    headline: input.headline,
    shortDescription: input.shortDescription,
    body,
    capabilities: input.capabilities,
    pricing: input.pricing,
    image: {
      path: `/images/generated/${input.categorySlug}-${input.slug}.png`,
      alt: input.imageAlt,
      prompt: `${input.imagePrompt} Authentic sign-and-print shop visual, professional lighting, practical production detail, no readable text, no logos, no watermarks.`,
    },
    seo: {
      title: input.metaTitle,
      description: input.metaDescription,
    },
    related: input.related,
    isFeatured: input.isFeatured,
    displayOrder: input.displayOrder,
  };
}

export const ref = (
  categorySlug: CategorySlug,
  serviceSlug: string,
): ServiceReference => ({
  categorySlug,
  serviceSlug,
});
