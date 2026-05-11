import {
  getCategory,
  getFeaturedServices,
  getService,
  getServicesByCategory,
  serviceCategories,
  type CategorySlug,
  type GeneratedImageAsset,
  type PublicPricing,
  type ServiceDetail,
} from "@mrsign/content";

type DbService = {
  slug: string;
  status: string;
  name: string;
  shortDescription: string;
  description?: string | null;
  imagePath: string | null;
  isFeatured: boolean;
  displayOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  pricing: {
    type: string;
    amountCents: number | null;
    currency: string;
    unitLabel: string | null;
    tieredDescription: string | null;
    publicLabel: string | null;
  } | null;
};

function mergePricing(
  contentPricing: PublicPricing,
  dbPricing: {
    type: string;
    amountCents: number | null;
    currency: string;
    unitLabel: string | null;
    tieredDescription: string | null;
    publicLabel: string | null;
  } | null,
): PublicPricing {
  if (!dbPricing) return contentPricing;

  return {
    type: dbPricing.type as PublicPricing["type"],
    amountCents: dbPricing.amountCents ?? undefined,
    currency: (dbPricing.currency as "CAD") || "CAD",
    unitLabel: dbPricing.unitLabel ?? undefined,
    publicLabel: dbPricing.publicLabel ?? contentPricing.publicLabel,
    tieredDescription:
      dbPricing.tieredDescription ?? contentPricing.tieredDescription,
    sourceUrl: contentPricing.sourceUrl,
  };
}

function defaultPricing(dbPricing: DbService["pricing"]): PublicPricing {
  return {
    type: (dbPricing?.type as PublicPricing["type"]) ?? "REQUEST_QUOTE",
    amountCents: dbPricing?.amountCents ?? undefined,
    currency: (dbPricing?.currency as "CAD") || "CAD",
    unitLabel: dbPricing?.unitLabel ?? undefined,
    publicLabel:
      dbPricing?.publicLabel ??
      "Request a quote for pricing for this specific service.",
    tieredDescription: dbPricing?.tieredDescription ?? undefined,
  };
}

function mergeService(
  categorySlug: CategorySlug,
  contentService: ServiceDetail,
  dbService: DbService | undefined,
): ServiceDetail | null {
  if (dbService && dbService.status && dbService.status !== "ACTIVE")
    return null;

  const name = dbService?.name || contentService.name;
  const slug = dbService?.slug || contentService.slug;

  return {
    ...contentService,
    name,
    slug,
    route: `/${categorySlug}/${slug}`,
    headline: name,
    shortDescription:
      dbService?.shortDescription || contentService.shortDescription,
    body: dbService?.description
      ? [dbService.description]
      : contentService.body,
    pricing: mergePricing(contentService.pricing, dbService?.pricing ?? null),
    isFeatured: dbService?.isFeatured ?? contentService.isFeatured ?? false,
    displayOrder: dbService?.displayOrder ?? contentService.displayOrder,
    image: {
      ...contentService.image,
      path:
        (dbService?.imagePath as `/images/generated/${string}.png`) ||
        contentService.image.path,
    },
    seo: {
      title: dbService?.metaTitle || contentService.seo.title,
      description: dbService?.metaDescription || contentService.seo.description,
      socialTitle: dbService?.metaTitle || contentService.seo.socialTitle,
      socialDescription:
        dbService?.metaDescription || contentService.seo.socialDescription,
    },
  };
}

function serviceFromDb(
  categorySlug: CategorySlug,
  category: NonNullable<ReturnType<typeof getCategory>>,
  dbService: DbService,
): ServiceDetail | null {
  if (dbService.status && dbService.status !== "ACTIVE") return null;

  const image: GeneratedImageAsset = dbService.imagePath
    ? {
        path: dbService.imagePath as `/images/generated/${string}.png`,
        alt: dbService.name,
        prompt: `Product-style service image for ${dbService.name}.`,
      }
    : category.image;

  return {
    categorySlug,
    slug: dbService.slug,
    name: dbService.name,
    route: `/${categorySlug}/${dbService.slug}`,
    eyebrow: category.name,
    headline: dbService.name,
    shortDescription: dbService.shortDescription,
    body: [dbService.description || dbService.shortDescription],
    capabilities: [
      "Custom quote",
      "Material guidance",
      "Local production support",
    ],
    pricing: defaultPricing(dbService.pricing),
    image,
    seo: {
      title: dbService.metaTitle || dbService.name,
      description: dbService.metaDescription || dbService.shortDescription,
    },
    related: [],
    isFeatured: dbService.isFeatured,
    displayOrder: dbService.displayOrder,
  };
}

export async function getPublicServices(
  categorySlug: CategorySlug,
): Promise<ServiceDetail[]> {
  const contentServices = getServicesByCategory(categorySlug);
  const category = getCategory(categorySlug);

  if (!category) return [];

  let dbServices: DbService[] = [];

  try {
    const { prisma } = await import("@mrsign/db/src/client");
    dbServices = await prisma.service.findMany({
      where: {
        category: { slug: categorySlug },
      },
      include: { pricing: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    // Database unavailable; use content catalog only
  }

  const dbMap = new Map(dbServices.map((s) => [s.slug, s]));

  const contentSlugs = new Set(contentServices.map((service) => service.slug));
  const merged = contentServices
    .map((contentService) =>
      mergeService(
        categorySlug,
        contentService,
        dbMap.get(contentService.slug),
      ),
    )
    .filter((service): service is ServiceDetail => service !== null);
  const dbOnly = dbServices
    .filter((service) => !contentSlugs.has(service.slug))
    .map((service) => serviceFromDb(categorySlug, category, service))
    .filter((service): service is ServiceDetail => service !== null);

  return [...merged, ...dbOnly].sort(
    (a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name),
  );
}

export async function getPublicService(
  categorySlug: CategorySlug,
  serviceSlug: string,
): Promise<ServiceDetail | null> {
  const contentService = getService(categorySlug, serviceSlug);
  const category = getCategory(categorySlug);

  if (!category) return null;

  let dbService: DbService | null = null;

  try {
    const { prisma } = await import("@mrsign/db/src/client");
    dbService = await prisma.service.findFirst({
      where: {
        slug: serviceSlug,
        category: { slug: categorySlug },
      },
      include: { pricing: true, category: true },
    });
  } catch {
    // Database unavailable; use content catalog only
  }

  if (contentService) {
    return mergeService(categorySlug, contentService, dbService ?? undefined);
  }

  return dbService ? serviceFromDb(categorySlug, category, dbService) : null;
}

export async function getPublicFeaturedServices(): Promise<ServiceDetail[]> {
  const publicServices = await Promise.all(
    serviceCategories.map((category) => getPublicServices(category.slug)),
  );
  const featured = publicServices
    .flat()
    .filter((service) => Boolean(service.isFeatured))
    .sort(
      (a, b) =>
        a.categorySlug.localeCompare(b.categorySlug) ||
        a.displayOrder - b.displayOrder ||
        a.name.localeCompare(b.name),
    );

  if (featured.length > 0) {
    return featured;
  }

  return getFeaturedServices();
}

export async function getPublicStaticServiceParams(categorySlug: CategorySlug) {
  const contentParams = getServicesByCategory(categorySlug).map((s) => ({
    serviceSlug: s.slug,
  }));

  try {
    const { prisma } = await import("@mrsign/db/src/client");
    const services = await prisma.service.findMany({
      where: {
        category: { slug: categorySlug },
        status: "ACTIVE",
      },
      select: { slug: true },
    });

    const slugs = new Set(contentParams.map((param) => param.serviceSlug));
    services.forEach((service) => slugs.add(service.slug));

    return Array.from(slugs).map((serviceSlug) => ({ serviceSlug }));
  } catch {
    // Database unavailable during build; fall back to content catalog
  }

  return contentParams;
}
