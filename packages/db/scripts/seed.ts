import { prisma } from "../src/client.js";
import { seedCategories } from "./seed-data.js";

async function main() {
  for (const [categoryIndex, categorySeed] of seedCategories.entries()) {
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

    for (const [serviceIndex, serviceSeed] of categorySeed.services.entries()) {
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
          imageAlt: serviceSeed.imageAlt,
          displayOrder: serviceIndex + 1,
        },
        update: {
          name: serviceSeed.name,
          shortDescription: serviceSeed.shortDescription,
          imageAlt: serviceSeed.imageAlt,
          displayOrder: serviceIndex + 1,
        },
      });

      await prisma.pricing.upsert({
        where: { serviceId: service.id },
        create: {
          serviceId: service.id,
          type: "REQUEST_QUOTE",
          publicLabel: "Request Quote",
        },
        update: {},
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
