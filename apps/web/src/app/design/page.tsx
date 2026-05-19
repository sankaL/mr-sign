import { CategoryPage } from "@/components/site/category-page";
import { buildCategoryMetadata } from "@/lib/seo";

export const metadata = buildCategoryMetadata("design");

export default function DesignPage() {
  return <CategoryPage categorySlug="design" />;
}
