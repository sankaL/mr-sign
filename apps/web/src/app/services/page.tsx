import { CategoryPage } from "@/components/site/category-page";
import { buildCategoryMetadata } from "@/lib/seo";

export const metadata = buildCategoryMetadata("services");

export default function ServicesPage() {
  return <CategoryPage categorySlug="services" />;
}
