import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter, JetBrains_Mono } from "next/font/google";

import { SiteShell } from "@/components/layout/SiteShell";
import { AppProviders } from "@/components/providers/AppProviders";
import { getCollections } from "@/server/catalog";
import "@/styles/globals.css";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
