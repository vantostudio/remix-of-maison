"use client";

import Link from "next/link";
import { useState } from "react";

import { QuantitySelector } from "@/components/commerce/QuantitySelector";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { collections } from "@/data/collections";
import { useCart } from "@/hooks/useCart";
import { accentFor } from "@/lib/accents";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";

interface QuickViewDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewDialog = ({
  product,
  open,
  onOpenChange,
}: QuickViewDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const collection = collections.find((entry) => entry.id === product.collection);
  const accent = accentFor(product.collection);

  // Reset while rendering rather than in an effect, so React never commits a
  // stale frame when the dialog reopens.
  const [lastOpened, setLastOpened] = useState<string | null>(null);
  const openedKey = open ? product.id : null;
  if (openedKey !== lastOpened) {
    setLastOpened(openedKey);
    if (openedKey !== null) {
      setQuantity(1);
      setAdded(false);
    }
  }

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 overflow-hidden rounded-3xl border-hairline max-w-[calc(100vw-2rem)] sm:max-w-2xl">
        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-4/5 sm:aspect-auto sm:h-[26rem] bg-background">
            <Media
              src={product.images[0]}
              alt={product.name}
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>

          <div className="p-6 md:p-7 flex flex-col">
            {collection && (
              <p className={cn("kicker", accent.label)}>{collection.name}</p>
            )}

            <DialogTitle className="mt-2 text-heading-sm font-semibold text-foreground text-left">
              {product.name}
            </DialogTitle>

            <p className="mt-3 text-body-sm text-muted-foreground line-clamp-3">
              {product.description}
            </p>

            <p className="mt-4 text-subheading font-semibold text-foreground numerals">
              {formatPrice(product.price)}
            </p>

            <div className="mt-auto pt-6 space-y-3">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
              />

              <Button onClick={handleAdd} className="w-full">
                {added ? "Added to bag" : "Add to bag"}
              </Button>

              <Button asChild variant="neutral" className="w-full">
                <Link href={`/products/${product.slug}`}>View full details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
