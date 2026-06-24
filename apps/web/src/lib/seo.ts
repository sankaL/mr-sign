import {
  businessHours,
  getCategory,
  siteContact,
  type CategorySlug,
  type GeneratedImageAsset,
  type PageContent,
  type SeoContent,
  type ServiceDetail,
} from "@mrsign/content";
import type { Metadata } from "next";

export const productionSiteUrl = "https://mrsignandprint.net";
export const defaultSocialImage = "/social/default-social.png";
export const categorySocialImages: Record<CategorySlug, string> = {
  signs: "/social/signs-social.png",
  printing: "/social/printing-social.png",
  design: "/social/design-social.png",
};

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl,
);

export const metadataBase = new URL(siteUrl);

type PageMetadataInput = {
  route: string;
  seo: SeoContent;
  image?: GeneratedImageAsset | string;
};

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export function canonicalUrl(route = "/") {
  const pathname = route.startsWith("/") ? route : `/${route}`;
  return new URL(pathname, metadataBase).toString();
}

export function assetUrl(path = defaultSocialImage) {
  return new URL(path, metadataBase).toString();
}

function imagePath(image?: GeneratedImageAsset | string) {
  if (!image) return defaultSocialImage;
  return typeof image === "string" ? image : image.path;
}

export function buildPageMetadata({
  route,
  seo,
  image,
}: PageMetadataInput): Metadata {
  const description = seo.description;
  const socialTitle = seo.socialTitle ?? seo.title;
  const socialDescription = seo.socialDescription ?? description;
  const socialImage = assetUrl(imagePath(image));
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
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
  };
}

export function buildContentPageMetadata(
  page: PageContent,
  image?: GeneratedImageAsset | string,
) {
  return buildPageMetadata({
    route: page.route,
    seo: page.seo,
    image: image ?? page.image,
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
          "Signs, printing, and design services for Vaughan and the GTA.",
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
          "Signs, printing, and design services for Vaughan and the GTA.",
      },
    });
  }

  return buildPageMetadata({
    route: service.route,
    seo: service.seo,
    image: service.image,
  });
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalUrl("/")}#local-business`,
    name: siteContact.businessName,
    url: canonicalUrl("/"),
    image: assetUrl(defaultSocialImage),
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
    offers: {
      "@type": "Offer",
      priceCurrency: service.pricing.currency,
      availability: "https://schema.org/InStock",
      url: canonicalUrl("/contact"),
      description: service.pricing.label,
    },
  };
}
