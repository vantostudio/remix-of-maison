"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/useCart";

export const CartIcon = () => {
  const itemCount = useCart((state) => state.getItemCount());

  return (
    <Link
      href="/cart"
      aria-label={itemCount > 0 ? `Your bag, ${itemCount} items` : "Your bag"}
      className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-background transition-colors"
    >
      <ShoppingBag className="w-4 h-4 text-foreground" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-accent text-on-accent text-[10px] font-semibold flex items-center justify-center numerals">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
};
