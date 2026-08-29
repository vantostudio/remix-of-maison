"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
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
      {/* Relative wrapper, so the quick-look control is a sibling of the link
          rather than a button nested inside an anchor. */}
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
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

        {/* Quick look lives on the image so it costs the card no vertical space:
            always available on touch, revealed on hover where there is a cursor. */}
        <button
          type="button"
          onClick={() => setQuickViewOpen(true)}
          aria-label={`Quick look at ${product.name}`}
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-surface/90 text-foreground shadow-sm backdrop-blur-sm transition-opacity duration-300 hover:bg-surface md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
          <Eye className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="pt-4">
        {collection && (
          <p className={cn("kicker", accent.label)}>{collection.name}</p>
        )}

        <h3 className="mt-1.5 text-subheading text-foreground">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="mt-2 text-body text-foreground numerals">
          {formatPrice(product.price)}
        </p>
      </div>

      <QuickViewDialog
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </article>
  );
};
