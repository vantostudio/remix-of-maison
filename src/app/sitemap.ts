import type { MetadataRoute } from "next";

import { getCollections, getProductSlugs } from "@/server/catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, collections] = await Promise.all([
    getProductSlugs(),
    getCollections(),
  ]);

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, changeFrequency: "weekly", priority: 0.9 },
    ...collections.map((collection) => ({
      url: `${siteUrl}/products?collection=${collection.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: `${siteUrl}/products/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
