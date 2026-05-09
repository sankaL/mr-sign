import { getCategory } from "@mrsign/content";
import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";

const category = getCategory("design");

export const metadata: Metadata = {
  title: category?.seo.title,
  description: category?.seo.description,
  openGraph: {
    title: category?.seo.socialTitle ?? category?.seo.title,
    description: category?.seo.socialDescription ?? category?.seo.description,
  },
};

export default function DesignPage() {
  return <CategoryPage categorySlug="design" />;
}
