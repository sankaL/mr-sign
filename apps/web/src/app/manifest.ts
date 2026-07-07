import type { MetadataRoute } from "next";

import { socialAssetVersion } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mr. Sign and Print",
    short_name: "Mr. Sign",
    description:
      "Custom signs, printing, manufacturing, and services in Vaughan.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FCFBF8",
    theme_color: "#071A3A",
    icons: [
      {
        src: `/icon-192.png?v=${socialAssetVersion}`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/icon-512.png?v=${socialAssetVersion}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/icon-maskable-512.png?v=${socialAssetVersion}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
