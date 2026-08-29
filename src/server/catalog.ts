import "server-only";

import { collections } from "@/data/collections";
import { products } from "@/data/products";
import type {
  Collection,
  Product,
  ProductQuery,
  SortOption,
} from "@/types/catalog";

/**
 * Server-side catalog access.
 *
 * Everything is async so the storefront's call sites are already shaped for a
 * real datastore — swapping the in-memory arrays for a database or a headless
 * commerce API means changing this module and nothing above it.
 */

const sorters: Record<SortOption, (a: Product, b: Product) => number> = {
  featured: () => 0,
  newest: (a, b) => Number(Boolean(b.new)) - Number(Boolean(a.new)),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "name-asc": (a, b) => a.name.localeCompare(b.name),
};

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  return collections.find((collection) => collection.slug === slug) ?? null;
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  let result = [...products];

  if (query.collection) {
    result = result.filter((product) => product.collection === query.collection);
  }

  if (query.newOnly) {
    result = result.filter((product) => product.new);
  }

  return result.sort(sorters[query.sort ?? "featured"]);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getNewProducts(limit?: number): Promise<Product[]> {
  const fresh = products.filter((product) => product.new);
  const list = fresh.length > 0 ? fresh : products;
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export async function getRelatedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  const product = products.find((candidate) => candidate.id === productId);
  if (!product) return [];

  return products
    .filter(
      (candidate) =>
        candidate.collection === product.collection && candidate.id !== productId,
    )
    .slice(0, limit);
}

/** Every product slug — used to statically generate the detail routes. */
export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}
