import type { Metadata } from "next";
import type { ReactNode } from "react";

import { assetUrl, metadataBase, siteUrl } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Mr. Sign and Print",
    template: "%s | Mr. Sign and Print",
  },
  description:
    "Signs, printing, manufacturing, and services for Vaughan and the GTA.",
  applicationName: "Mr. Sign and Print",
  authors: [{ name: "Mr. Sign and Print" }],
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Mr. Sign and Print",
    description:
      "Signs, printing, manufacturing, and services for Vaughan and the GTA.",
    url: siteUrl,
    siteName: "Mr. Sign and Print",
    images: [
      {
        url: assetUrl(),
        width: 1200,
        height: 630,
        alt: "Mr. Sign and Print custom signs, printing, and services in Vaughan",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Sign and Print",
    description:
      "Signs, printing, manufacturing, and services for Vaughan and the GTA.",
    images: [assetUrl()],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
