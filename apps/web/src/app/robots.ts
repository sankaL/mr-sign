import type { MetadataRoute } from "next";

import { canonicalUrl, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: canonicalUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
