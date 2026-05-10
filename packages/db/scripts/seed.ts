import { getServicesByCategory, serviceCategories } from "@mrsign/content";

import { prisma } from "../src/client.js";
import type { PublicPricing } from "@mrsign/content";

function pricingSeed(pricing: PublicPricing) {
  return {
    type: pricing.type,
    amountCents: pricing.amountCents ?? null,
    currency: pricing.currency,
    unitLabel: pricing.unitLabel ?? null,
    tieredDescription: pricing.tieredDescription ?? null,
    publicLabel: pricing.publicLabel,
  };
}

async function main() {
  for (const [categoryIndex, categorySeed] of serviceCategories.entries()) {
    const category = await prisma.serviceCategory.upsert({
      where: { slug: categorySeed.slug },
      create: {
        name: categorySeed.name,
        slug: categorySeed.slug,
        description: categorySeed.description,
        displayOrder: categoryIndex + 1,
      },
      update: {
        name: categorySeed.name,
        description: categorySeed.description,
        displayOrder: categoryIndex + 1,
      },
    });

    const categoryServices = getServicesByCategory(categorySeed.slug);

    for (const [serviceIndex, serviceSeed] of categoryServices.entries()) {
      const service = await prisma.service.upsert({
        where: {
          categoryId_slug: {
            categoryId: category.id,
            slug: serviceSeed.slug,
          },
        },
        create: {
          categoryId: category.id,
          name: serviceSeed.name,
          slug: serviceSeed.slug,
          shortDescription: serviceSeed.shortDescription,
          description: serviceSeed.body.join("\n\n"),
          imagePath: serviceSeed.image.path,
          imageAlt: serviceSeed.image.alt,
          metaTitle: serviceSeed.seo.title,
          metaDescription: serviceSeed.seo.description,
          status: "ACTIVE",
          isFeatured: serviceSeed.isFeatured ?? false,
          displayOrder: serviceIndex + 1,
        },
        update: {
          name: serviceSeed.name,
          shortDescription: serviceSeed.shortDescription,
          description: serviceSeed.body.join("\n\n"),
          imagePath: serviceSeed.image.path,
          imageAlt: serviceSeed.image.alt,
          metaTitle: serviceSeed.seo.title,
          metaDescription: serviceSeed.seo.description,
          status: "ACTIVE",
          isFeatured: serviceSeed.isFeatured ?? false,
          displayOrder: serviceIndex + 1,
        },
      });

      const pricingData = pricingSeed(serviceSeed.pricing);

      await prisma.pricing.upsert({
        where: { serviceId: service.id },
        create: {
          serviceId: service.id,
          ...pricingData,
        },
        update: pricingData,
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
