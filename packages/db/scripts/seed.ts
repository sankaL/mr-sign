import { getServicesByCategory, serviceCategories } from "@mrsign/content";

import { prisma } from "../src/client.js";
import { pricingResetSeed, serviceResetSeed } from "./service-seed-reset.js";

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
      const serviceData = serviceResetSeed(serviceSeed);
      const service = await prisma.service.upsert({
        where: {
          categoryId_slug: {
            categoryId: category.id,
            slug: serviceSeed.slug,
          },
        },
        create: {
          categoryId: category.id,
          slug: serviceSeed.slug,
          ...serviceData,
          displayOrder: serviceIndex + 1,
        },
        update: {
          ...serviceData,
          displayOrder: serviceIndex + 1,
        },
      });

      const pricingData = pricingResetSeed(serviceSeed.pricing);

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
