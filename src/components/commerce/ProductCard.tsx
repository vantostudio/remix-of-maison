"use client";

import Link from "next/link";
import { useState } from "react";

import { Media } from "@/components/media/Media";
import { QuickViewDialog } from "@/components/commerce/QuickViewDialog";
import { collections } from "@/data/collections";
import { accentFor } from "@/lib/accents";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "large";
}

const CARD_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

export const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const collection = collections.find((entry) => entry.id === product.collection);
  const accent = accentFor(product.collection);
  const hasSecondImage = product.images.length > 1;

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        {/* The photograph fills the card; nothing is layered over it. */}
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl bg-surface",
            variant === "large" ? "aspect-3/4" : "aspect-4/5",
          )}
        >
          <Media
            src={product.images[0]}
            alt={product.name}
            sizes={CARD_SIZES}
            className={cn(
              "transition-opacity duration-500",
              hasSecondImage && "group-hover:opacity-0",
            )}
          />
          {hasSecondImage && (
            <Media
              src={product.images[1]}
              alt={`${product.name} — alternate view`}
              sizes={CARD_SIZES}
              className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {product.new && (
            <span className="absolute top-4 left-4 rounded-lg bg-surface px-3 py-1 text-caption font-medium text-foreground">
              New
            </span>
          )}
        </div>
      </Link>

      <div className="pt-4">
        {collection && (
          <p className={cn("kicker", accent.label)}>{collection.name}</p>
        )}

        <h3 className="mt-1.5 text-subheading text-foreground">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="mt-2 flex items-baseline gap-3">
          <p className="text-body text-foreground numerals">
            {formatPrice(product.price)}
          </p>
          {/* Kept discoverable on touch, where there is no hover to reveal it. */}
          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            className="ml-auto text-body-sm text-link transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            Quick look
          </button>
        </div>
      </div>

      <QuickViewDialog
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </article>
  );
};
