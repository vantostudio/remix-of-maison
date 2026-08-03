import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Product, collections } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface QuickViewDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewDialog = ({ product, open, onOpenChange }: QuickViewDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem } = useCart();
  const { addItem: addWish, removeItem: removeWish, isInWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setImageIndex(0);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const collection = collections.find((c) => c.id === product.collection);
  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addItem(product, quantity);
    toast({
      title: "Added to bag",
      description: `${product.name} × ${quantity}`,
    });
    onOpenChange(false);
  };

  const step = (dir: number) => {
    setImageIndex((i) => (i + dir + product.images.length) % product.images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 rounded-none max-w-[calc(100vw-2rem)] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative bg-muted/50 aspect-[4/5] sm:aspect-auto sm:min-h-[480px]">
            <img
              src={product.images[imageIndex]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 backdrop-blur-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 backdrop-blur-md"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Details */}
          <div className="p-5 sm:p-8 flex flex-col">
            {collection && (
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">
                {collection.name}
              </p>
            )}
            <h2 className="font-serif text-2xl sm:text-3xl leading-tight mb-2">
              {product.name}
            </h2>
            <p className="text-lg font-medium mb-4">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-4">
              {product.description}
            </p>
            {product.materials && (
              <p className="text-xs text-muted-foreground/70 mb-6">
                {product.materials}
              </p>
            )}

            <div className="mt-auto space-y-3">
              <div className="flex items-center gap-3">
                <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle wishlist"
                  onClick={() => (inWishlist ? removeWish(product.id) : addWish(product))}
                  className="h-11 w-11 rounded-none border border-border"
                >
                  <Heart
                    className={cn("w-4 h-4", inWishlist && "fill-primary text-primary")}
                  />
                </Button>
              </div>
              <Button
                onClick={handleAdd}
                className="w-full rounded-none py-6 text-xs tracking-[0.2em] uppercase"
              >
                Add to Bag
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-none py-6 text-xs tracking-[0.2em] uppercase"
                onClick={() => onOpenChange(false)}
              >
                <Link to={`/product/${product.slug}`}>
                  View Full Details
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
