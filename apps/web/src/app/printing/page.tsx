import { CategoryPage } from "@/components/site/category-page";
import { buildCategoryMetadata } from "@/lib/seo";

export const metadata = buildCategoryMetadata("printing");

export default function PrintingPage() {
  return <CategoryPage categorySlug="printing" />;
}
