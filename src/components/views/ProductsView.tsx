"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, SlidersHorizontal, X } from "lucide-react";

import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/button";
import { accentFor } from "@/lib/accents";
import { cn } from "@/lib/utils";
import type { Collection, Product, SortOption } from "@/types/catalog";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Alphabetical" },
];

interface ProductsViewProps {
  /** Already filtered and sorted by the server for the current search params. */
  products: Product[];
  collections: Collection[];
  currentCollection: Collection | null;
  activeCollection: string;
  activeSort: SortOption;
}

export const ProductsView = ({
  products,
  collections,
  currentCollection,
  activeCollection,
  activeSort,
}: ProductsViewProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);

  const accent = accentFor(currentCollection?.id);

  const pushParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleFilterChange = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === "all") params.delete("collection");
    else params.set("collection", slug);
    pushParams(params);
  };

  const handleSortChange = (value: SortOption) => {
    const params = new URLSearchParams(searchParams);
    if (value === "newest") params.delete("sort");
    else params.set("sort", value);
    pushParams(params);
    setSortOpen(false);
  };

  const hasFilters = activeCollection !== "all" || activeSort !== "newest";
  const activeSortLabel =
    sortOptions.find((option) => option.value === activeSort)?.label ?? "Newest";

  return (
    <>
      {/* ── Title band ──────────────────────────────────────────────────── */}
      <section className="band-surface pt-14 pb-10 md:pt-20 md:pb-12">
        <div className="container-page">
          <h1
            className={cn(
              "text-heading-lg font-semibold",
              currentCollection ? accent.text : "text-foreground",
            )}
          >
            {currentCollection ? `${currentCollection.name}.` : "All watches."}
          </h1>
          <p className="mt-4 text-body text-muted-foreground max-w-[46ch]">
            {currentCollection
              ? currentCollection.description
              : "Every reference on the shelf in Mombasa Town, from everyday automatics to numbered limited runs."}
          </p>
        </div>
      </section>

      {/* ── Filter rail: neutral pills, one hairline ───────────────────── */}
      <div className="sticky top-12 z-40 bg-surface/85 backdrop-blur-xl border-y border-hairline">
        <div className="container-page py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <button
                type="button"
                onClick={() => handleFilterChange("all")}
                className={cn(
                  "shrink-0 rounded-lg px-4 py-1.5 text-body-sm font-semibold transition-colors",
                  activeCollection === "all"
                    ? "bg-foreground text-on-foreground"
                    : "bg-control text-foreground hover:bg-control-hover",
                )}
              >
                All
              </button>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => handleFilterChange(collection.slug)}
                  className={cn(
                    "shrink-0 rounded-lg px-4 py-1.5 text-body-sm font-semibold transition-colors",
                    activeCollection === collection.slug
                      ? "bg-foreground text-on-foreground"
                      : "bg-control text-foreground hover:bg-control-hover",
                  )}
                >
                  {collection.name}
                </button>
              ))}
            </div>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                aria-expanded={sortOpen}
                className="flex items-center gap-2 rounded-lg border border-hairline px-4 py-1.5 text-body-sm text-foreground hover:bg-background transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{activeSortLabel}</span>
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-3xl border border-hairline bg-surface p-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSortChange(option.value)}
                      className="w-full flex items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-body-sm text-foreground hover:bg-background transition-colors"
                    >
                      {option.label}
                      {option.value === activeSort && (
                        <Check className="w-3.5 h-3.5 text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={() => pushParams(new URLSearchParams())}
                aria-label="Clear filters"
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-control text-foreground hover:bg-control-hover transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <section className="band band-base">
        <div className="container-page">
          <p className="text-body-sm text-subtle-foreground mb-8 numerals">
            {products.length} {products.length === 1 ? "watch" : "watches"}
          </p>

          {products.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-heading-sm font-semibold text-foreground">
                Nothing here yet.
              </h2>
              <p className="mt-3 text-body text-muted-foreground">
                Try another collection.
              </p>
              <div className="mt-8">
                <Button asChild variant="neutral">
                  <Link href="/products">See all watches</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
