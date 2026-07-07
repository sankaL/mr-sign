import type { Metadata } from "next";
import { Libre_Baskerville, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { assetUrl, defaultSocialImage, metadataBase, siteUrl } from "@/lib/seo";

import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const defaultSocialImageUrl = assetUrl(defaultSocialImage.path);

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
        url: defaultSocialImageUrl,
        secureUrl: defaultSocialImageUrl,
        width: defaultSocialImage.width,
        height: defaultSocialImage.height,
        type: defaultSocialImage.type,
        alt: defaultSocialImage.alt,
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
    images: [
      {
        url: defaultSocialImageUrl,
        secureUrl: defaultSocialImageUrl,
        width: defaultSocialImage.width,
        height: defaultSocialImage.height,
        type: defaultSocialImage.type,
        alt: defaultSocialImage.alt,
      },
    ],
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
      <body
        className={`${sans.variable} ${serif.variable}`}
        suppressHydrationWarning
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
