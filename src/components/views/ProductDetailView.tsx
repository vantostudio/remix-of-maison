"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

import { ProductCard } from "@/components/commerce/ProductCard";
import { QuantitySelector } from "@/components/commerce/QuantitySelector";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { accentFor } from "@/lib/accents";
import { formatPrice } from "@/lib/format";
import { FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { Collection, Product } from "@/types/catalog";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  collection: Collection | null;
}

export const ProductDetailView = ({
  product,
  relatedProducts,
  collection,
}: ProductDetailViewProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();
  const accent = accentFor(product.collection);

  const watchDetails = [
    { label: "Materials", value: product.materials },
    ...(product.dimensions
      ? [{ label: "Dimensions", value: product.dimensions }]
      : []),
  ];

  const serviceDetails = [
    {
      label: "Delivery & payment",
      // Derived from the pricing constants so the promise cannot drift from
      // what the bag actually charges.
      value: `Free countrywide over ${formatPrice(FREE_DELIVERY_THRESHOLD)}, otherwise ${formatPrice(STANDARD_DELIVERY)}. Payment on delivery available in Mombasa.`,
    },
    { label: "Returns", value: "14 days, unworn, in its original packaging." },
    { label: "Warranty", value: "Five years on the movement, handled at the shop." },
  ];

  const step = (delta: number) =>
    setImageIndex(
      (index) => (index + delta + product.images.length) % product.images.length,
    );

  const handleAdd = () => {
    addItem(product, quantity);
    toast({
      title: "Added to your bag",
      description: `${product.name} · ${quantity} × ${formatPrice(product.price)}`,
    });
  };

  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="bg-surface border-b border-hairline">
        <div className="container-page py-3">
          <nav className="flex items-center gap-2 text-caption text-subtle-foreground">
            <Link href="/products" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            <span>/</span>
            {collection && (
              <>
                <Link
                  href={`/products?collection=${collection.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {collection.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── The buy moment ─────────────────────────────────────────────── */}
      <section className="band-surface py-12 md:py-20">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Gallery */}
            <div>
              <div className="group relative aspect-square overflow-hidden rounded-3xl bg-background sm:aspect-4/5">
                <Media
                  src={product.images[imageIndex]}
                  alt={`${product.name} — view ${imageIndex + 1}`}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-foreground opacity-100 backdrop-blur transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                    >
                      <ChevronLeft className="size-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-foreground opacity-100 backdrop-blur transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                    >
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      className={cn(
                        "relative w-16 h-20 shrink-0 overflow-hidden rounded-xl transition-opacity",
                        index === imageIndex
                          ? "ring-2 ring-foreground"
                          : "opacity-50 hover:opacity-100",
                      )}
                    >
                      <Media src={image} alt="" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detail */}
            <div className="lg:pt-6">
              {collection && (
                <p className={cn("kicker", accent.label)}>{collection.name}</p>
              )}

              <h1 className="mt-3 max-w-[13ch] text-heading-lg font-medium text-foreground">
                {product.name}
              </h1>

              {/* Price + action stack: pure text next to the one blue pill. */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <p className="text-numeral font-medium text-foreground numerals">
                  {formatPrice(product.price)}
                </p>
              </div>

              <p className="mt-6 text-body text-muted-foreground max-w-[46ch]">
                {product.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
                <Button size="lg" onClick={handleAdd}>
                  <ShoppingBag className="size-4" aria-hidden="true" />
                  Add to bag
                </Button>
              </div>

              {/* The object itself stays scannable; service policies disclose on demand. */}
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
                {watchDetails.map((detail) => (
                  <div key={detail.label} className="bg-surface p-4 sm:p-5">
                    <dt className="text-caption font-medium uppercase tracking-[0.12em] text-subtle-foreground">
                      {detail.label}
                    </dt>
                    <dd className="mt-2 text-body-sm text-foreground">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 divide-y divide-hairline border-y border-hairline">
                {serviceDetails.map((detail) => (
                  <details key={detail.label} className="group">
                    <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-body-sm font-medium text-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                      {detail.label}
                      <ChevronDown
                        className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="max-w-[52ch] pb-4 pr-8 text-body-sm text-muted-foreground">
                      {detail.value}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related ────────────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="band band-base">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <h2 className="text-heading font-medium text-foreground">
                More from {collection?.name ?? "Kairos"}.
              </h2>
              <Button asChild variant="neutral" size="sm">
                <Link href="/products">See all</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
              {relatedProducts.map((related, index) => (
                <ProductCard key={related.id} product={related} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
