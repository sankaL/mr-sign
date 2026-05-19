import { CategoryPage } from "@/components/site/category-page";
import { buildCategoryMetadata } from "@/lib/seo";

export const metadata = buildCategoryMetadata("signs");

export default function SignsPage() {
  return <CategoryPage categorySlug="signs" />;
}
