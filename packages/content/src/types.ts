export type CategorySlug = "signs" | "printing" | "design";

export type PricingType =
  | "EXACT_PRICE"
  | "STARTING_FROM"
  | "TIERED"
  | "REQUEST_QUOTE";

export type PublicPricing = {
  type: PricingType;
  amountCents?: number;
  currency: "CAD";
  unitLabel?: string;
  publicLabel: string;
  tieredDescription?: string;
  sourceUrl?: string;
};

export type GeneratedImageAsset = {
  path: `/images/generated/${string}.png`;
  alt: string;
  prompt: string;
};

export type SeoContent = {
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
};

export type ServiceReference = {
  categorySlug: CategorySlug;
  serviceSlug: string;
};

export type ServiceDetail = {
  categorySlug: CategorySlug;
  slug: string;
  name: string;
  route: `/${CategorySlug}/${string}`;
  eyebrow: string;
  headline: string;
  shortDescription: string;
  body: string[];
  capabilities: string[];
  pricing: PublicPricing;
  image: GeneratedImageAsset;
  seo: SeoContent;
  related: ServiceReference[];
  isFeatured?: boolean;
  displayOrder: number;
};

export type ServiceCategory = {
  slug: CategorySlug;
  name: string;
  route: `/${CategorySlug}`;
  eyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
  gridHeading: string;
  gridSubheading: string;
  ctaCopy: string;
  seo: SeoContent;
  image: GeneratedImageAsset;
  displayOrder: number;
};

export type PageContent = {
  route: string;
  seo: SeoContent;
  eyebrow: string;
  headline: string;
  subheadline: string;
  image?: GeneratedImageAsset;
};
