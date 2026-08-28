import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";
import { getCollections, getProductSlugs } from "@/server/catalog";

const siteUrl = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, collections] = await Promise.all([
    getProductSlugs(),
    getCollections(),
  ]);

  return [
    { url: siteUrl.toString(), changeFrequency: "weekly", priority: 1 },
    {
      url: new URL("/products", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...collections.map((collection) => ({
      url: new URL(
        `/products?collection=${encodeURIComponent(collection.slug)}`,
        siteUrl,
      ).toString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: new URL(`/products/${encodeURIComponent(slug)}`, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
