import type { Metadata } from "next";

import { ProductsView } from "@/components/views/ProductsView";
import { getCollectionBySlug, getCollections, getProducts } from "@/server/catalog";
import { SORT_OPTIONS, type SortOption } from "@/types/catalog";

export const metadata: Metadata = {
  title: "All Watches",
  description:
    "Every Kairos reference — automatic, chronograph and dive — filterable by collection and price.",
};

function parseSort(value: string | undefined): SortOption {
  return SORT_OPTIONS.includes(value as SortOption)
    ? (value as SortOption)
    : "newest";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const activeCollection = params.collection ?? "all";
  const activeSort = parseSort(params.sort);

  const currentCollection =
    activeCollection !== "all" ? await getCollectionBySlug(activeCollection) : null;

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({
      collection: currentCollection?.id,
      sort: activeSort,
    }),
  ]);

  return (
    <ProductsView
      products={products}
      collections={collections}
      currentCollection={currentCollection}
      activeCollection={activeCollection}
      activeSort={activeSort}
    />
  );
}
