import type { MetadataRoute } from "next";

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
    background_color: "#FFFAF0",
    theme_color: "#0B1F55",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
