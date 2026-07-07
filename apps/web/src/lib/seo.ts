import {
  businessHours,
  getCategory,
  siteContact,
  type CategorySlug,
  type PageContent,
  type SeoContent,
  type ServiceDetail,
} from "@mrsign/content";
import type { Metadata } from "next";

export const productionSiteUrl = "https://web-production-170be.up.railway.app";
export const socialAssetVersion = "20260707";
export type SocialImage = {
  path: `/social/${string}.png`;
  alt: string;
  width: 1200;
  height: 630;
  type: "image/png";
};

export const socialImages: Record<"default" | CategorySlug, SocialImage> = {
  default: {
    path: "/social/default-social.png",
    alt: "Mr. Sign and Print custom signs for businesses in Vaughan",
    width: 1200,
    height: 630,
    type: "image/png",
  },
  signs: {
    path: "/social/signs-social.png",
    alt: "Custom illuminated signs built by Mr. Sign and Print",
    width: 1200,
    height: 630,
    type: "image/png",
  },
  printing: {
    path: "/social/printing-social.png",
    alt: "Professional printed materials from Mr. Sign and Print",
    width: 1200,
    height: 630,
    type: "image/png",
  },
  services: {
    path: "/social/services-social.png",
    alt: "Sign maintenance and repair services from Mr. Sign and Print",
    width: 1200,
    height: 630,
    type: "image/png",
  },
};

export const defaultSocialImage = socialImages.default;
export const categorySocialImages: Record<CategorySlug, SocialImage> = {
  signs: socialImages.signs,
  printing: socialImages.printing,
  services: socialImages.services,
};

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl,
);

export const metadataBase = new URL(siteUrl);

type PageMetadataInput = {
  route: string;
  seo: SeoContent;
  image?: SocialImage;
};

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export function canonicalUrl(route = "/") {
  const pathname = route.startsWith("/") ? route : `/${route}`;
  return new URL(pathname, metadataBase).toString();
}

export function assetUrl(path: string = defaultSocialImage.path) {
  return new URL(path, metadataBase).toString();
}

export function socialAssetUrl(image: SocialImage = defaultSocialImage) {
  const url = new URL(image.path, metadataBase);
  url.searchParams.set("v", socialAssetVersion);
  return url.toString();
}

export function socialImageForRoute(route: string) {
  const categorySlug = (
    Object.keys(categorySocialImages) as CategorySlug[]
  ).find((slug) => route === `/${slug}` || route.startsWith(`/${slug}/`));

  return categorySlug ? categorySocialImages[categorySlug] : defaultSocialImage;
}

export function buildPageMetadata({
  route,
  seo,
  image,
}: PageMetadataInput): Metadata {
  const description = seo.description;
  const socialTitle = seo.socialTitle ?? seo.title;
  const socialDescription = seo.socialDescription ?? description;
  const imageDescriptor = image ?? defaultSocialImage;
  const socialImageUrl = socialAssetUrl(imageDescriptor);
  const canonical = canonicalUrl(route);

  return {
    title: {
      absolute: seo.title,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: canonical,
      siteName: siteContact.businessName,
      images: [
        {
          url: socialImageUrl,
          secureUrl: socialImageUrl,
          width: imageDescriptor.width,
          height: imageDescriptor.height,
          type: imageDescriptor.type,
          alt: imageDescriptor.alt,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [
        {
          url: socialImageUrl,
          secureUrl: socialImageUrl,
          width: imageDescriptor.width,
          height: imageDescriptor.height,
          type: imageDescriptor.type,
          alt: imageDescriptor.alt,
        },
      ],
    },
  };
}

export function buildContentPageMetadata(
  page: PageContent,
  image: SocialImage = defaultSocialImage,
) {
  return buildPageMetadata({
    route: page.route,
    seo: page.seo,
    image,
  });
}

export function buildCategoryMetadata(categorySlug: CategorySlug) {
  const category = getCategory(categorySlug);

  if (!category) {
    return buildPageMetadata({
      route: `/${categorySlug}`,
      seo: {
        title: `${categorySlug} | Mr. Sign and Print`,
        description:
          "Signs, printing, manufacturing, and services for Vaughan and the GTA.",
      },
    });
  }

  return buildPageMetadata({
    route: category.route,
    seo: category.seo,
    image: categorySocialImages[categorySlug],
  });
}

export function buildServiceMetadata(
  service: ServiceDetail | null,
  fallbackTitle: string,
  route: string,
) {
  if (!service) {
    return buildPageMetadata({
      route,
      seo: {
        title: `${fallbackTitle} | Mr. Sign and Print`,
        description:
          "Signs, printing, manufacturing, and services for Vaughan and the GTA.",
      },
      image: socialImageForRoute(route),
    });
  }

  return buildPageMetadata({
    route: service.route,
    seo: service.seo,
    image: categorySocialImages[service.categorySlug],
  });
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalUrl("/")}#local-business`,
    name: siteContact.businessName,
    url: canonicalUrl("/"),
    image: assetUrl(defaultSocialImage.path),
    telephone: siteContact.phone,
    email: siteContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.streetAddress,
      addressLocality: siteContact.locality,
      addressRegion: siteContact.region,
      postalCode: siteContact.postalCode,
      addressCountry: siteContact.country,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Vaughan",
      },
      {
        "@type": "AdministrativeArea",
        name: "Greater Toronto Area",
      },
    ],
    openingHoursSpecification: businessHours
      .filter((item) => item.hours === "9:00 AM to 5:00 PM")
      .map((item) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: item.day,
        opens: "09:00",
        closes: "17:00",
      })),
    sameAs: [siteContact.mapsUrl],
  };
}

export function buildServiceSchema(service: ServiceDetail) {
  const category = getCategory(service.categorySlug);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl(service.route)}#service`,
    name: service.name,
    description: service.seo.description,
    url: canonicalUrl(service.route),
    image: assetUrl(service.image.path),
    serviceType: category?.name ?? service.categorySlug,
    areaServed: "Vaughan and the Greater Toronto Area",
    provider: {
      "@id": `${canonicalUrl("/")}#local-business`,
      "@type": "LocalBusiness",
      name: siteContact.businessName,
      telephone: siteContact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteContact.streetAddress,
        addressLocality: siteContact.locality,
        addressRegion: siteContact.region,
        postalCode: siteContact.postalCode,
        addressCountry: siteContact.country,
      },
    },
  };
}
