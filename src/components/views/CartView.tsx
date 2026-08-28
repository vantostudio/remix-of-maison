"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { QuantitySelector } from "@/components/commerce/QuantitySelector";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";

export const CartView = () => {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="band-surface py-28 md:py-40">
        <div className="container-content text-center">
          <h1 className="text-heading-lg font-semibold text-foreground">
            Your bag is empty.
          </h1>
          <p className="mt-5 text-body text-muted-foreground max-w-[42ch] mx-auto">
            Every watch we stock is chosen by hand and checked before it ships.
            Find the one you will still be winding in twenty years.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/products">Shop all watches</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="band-surface py-14 md:py-20">
      <div className="container-page">
        <h1 className="text-heading-lg font-semibold text-foreground">
          Your bag.
        </h1>

        <div className="mt-10 grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* Lines */}
          <div className="lg:col-span-2">
            <ul>
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-5 py-6 border-b border-hairline first:pt-0"
                >
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0 overflow-hidden rounded-xl bg-background"
                  >
                    <Media
                      src={item.product.images[0]}
                      alt={item.product.name}
                      sizes="112px"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-subheading font-semibold text-foreground">
                      <Link href={`/products/${item.product.slug}`}>
                        {item.product.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-body-sm text-subtle-foreground line-clamp-1">
                      {item.product.description}
                    </p>
                    <p className="mt-2 text-body-sm text-foreground numerals">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(quantity) =>
                          updateQuantity(item.product.id, quantity)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remove ${item.product.name}`}
                        className="flex items-center gap-2 text-body-sm text-subtle-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 rounded-3xl bg-background p-6 md:p-7">
            <h2 className="text-subheading font-semibold text-foreground">
              Summary
            </h2>

            <dl className="mt-5 space-y-3">
              <div className="flex justify-between text-body-sm">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="text-foreground numerals">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-body-sm">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-foreground numerals">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </dd>
              </div>
            </dl>

            <div className="hairline my-5" />

            <div className="flex justify-between items-baseline">
              <span className="text-body font-semibold text-foreground">Total</span>
              <span className="text-heading-sm font-semibold text-foreground numerals">
                {formatPrice(total)}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Check out</Link>
              </Button>
              <Button asChild variant="neutral" size="lg" className="w-full">
                <Link href="/products">Continue shopping</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
