import categoriesJson from "../../content/categories.json";
import type { JsonCategory, ServiceCategory } from "../types";

function imageFromJson(image: JsonCategory["image"]): ServiceCategory["image"] {
  return {
    path: image.src,
    alt: image.alt,
    prompt: image.prompt,
  };
}

function categoryFromJson(category: JsonCategory): ServiceCategory {
  return {
    ...category,
    image: imageFromJson(category.image),
  };
}

export const serviceCategories = (categoriesJson as JsonCategory[])
  .map(categoryFromJson)
  .sort((a, b) => a.displayOrder - b.displayOrder);
