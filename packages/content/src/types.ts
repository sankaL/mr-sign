export type CategorySlug = "signs" | "printing" | "design";

export type PricingType =
  | "fixed"
  | "startingFrom"
  | "tiered"
  | "contactForPricing";

type BasePricing = {
  type: PricingType;
  currency: "CAD";
  label: string;
  sourceUrl?: string;
};

export type FixedPricing = BasePricing & {
  type: "fixed";
  amountCents: number;
  unitLabel?: string;
};

export type StartingFromPricing = BasePricing & {
  type: "startingFrom";
  amountCents: number;
  unitLabel?: string;
};

export type TieredPricing = BasePricing & {
  type: "tiered";
  description?: string;
};

export type ContactForPricing = BasePricing & {
  type: "contactForPricing";
  notes?: string;
};

export type PublicPricing =
  | FixedPricing
  | StartingFromPricing
  | TieredPricing
  | ContactForPricing;

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

export type ServiceStatus = "published" | "draft";

export type JsonImageAsset = {
  src: `/images/generated/${string}.png`;
  alt: string;
  prompt: string;
};

export type JsonService = {
  categorySlug: CategorySlug;
  slug: string;
  name: string;
  status: ServiceStatus;
  displayOrder: number;
  featured: boolean;
  headline: string;
  shortDescription: string;
  body: string[];
  capabilities: string[];
  pricing: PublicPricing;
  image: JsonImageAsset;
  seo: SeoContent;
  related: ServiceReference[];
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
  status: ServiceStatus;
  featured: boolean;
  displayOrder: number;
};

export type JsonCategory = {
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
  image: JsonImageAsset;
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

export type SiteContact = {
  businessName: string;
  phone: string;
  phoneHref: string;
  secondaryPhone: string;
  secondaryPhoneHref: string;
  fax: string;
  email: string;
  emailHref: string;
  address: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  shortAddress: string;
  serviceArea: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  directionsUrl: string;
};

export type BusinessHour = {
  day: string;
  hours: string;
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type SiteAction = {
  href: string;
  label: string;
};
