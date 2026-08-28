"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 10,
  className,
}: QuantitySelectorProps) => (
  <div
    className={cn(
      "inline-flex items-center rounded-full bg-control text-foreground",
      className,
    )}
  >
    <button
      type="button"
      aria-label="Decrease quantity"
      onClick={() => quantity > min && onQuantityChange(quantity - 1)}
      disabled={quantity <= min}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-control-hover disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
    >
      <Minus className="w-3.5 h-3.5" />
    </button>
    <span className="w-8 text-center text-body-sm font-semibold numerals">
      {quantity}
    </span>
    <button
      type="button"
      aria-label="Increase quantity"
      onClick={() => quantity < max && onQuantityChange(quantity + 1)}
      disabled={quantity >= max}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-control-hover disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
    </button>
  </div>
);
