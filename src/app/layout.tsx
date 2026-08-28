import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Jost,
} from "next/font/google";

import { SiteShell } from "@/components/layout/SiteShell";
import { AppProviders } from "@/components/providers/AppProviders";
import { getCollections } from "@/server/catalog";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-kairos-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-kairos-text",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Kairos — Mechanical Watches, Mombasa",
    template: "%s · Kairos",
  },
  description:
    "A mechanical watch shop in Mombasa Town, Kenya. Automatic, chronograph and dive references, chosen for a lifetime of wear.",
  applicationName: "Kairos",
  authors: [{ name: "Kairos" }],
  openGraph: {
    type: "website",
    siteName: "Kairos",
    title: "Kairos — Mechanical Watches, Mombasa",
    description:
      "A mechanical watch shop in Mombasa Town, Kenya.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairos — Mechanical Watches, Mombasa",
    description:
      "A mechanical watch shop in Mombasa Town, Kenya.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1013" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCollections();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProviders>
          <SiteShell collections={collections}>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
