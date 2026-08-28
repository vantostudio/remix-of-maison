import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge resolves conflicts by grouping utilities, and it only knows
 * Tailwind's stock scales. Our theme renames both the font-size scale
 * (`text-body`, `text-heading`…) and the colour palette (`text-on-accent`,
 * `text-tint-dive`…), so out of the box it reads them as one `text-*` group
 * and silently drops whichever came first — a size would eat a colour, or the
 * reverse. Declaring both groups keeps them independent.
 */
const FONT_SIZES = [
  "caption",
  "body-sm",
  "body",
  "body-lg",
  "subheading",
  "numeral",
  "heading-sm",
  "heading",
  "heading-lg",
  "display",
] as const;

const COLORS = [
  "background",
  "surface",
  "surface-sunk",
  "foreground",
  "muted-foreground",
  "subtle-foreground",
  "hairline",
  "control",
  "control-hover",
  "accent",
  "accent-hover",
  "on-accent",
  "on-foreground",
  "brass",
  "link",
  "destructive",
  "on-destructive",
  "tint-automatic",
  "tint-chronograph",
  "tint-dive",
  "tint-field",
  "tint-skeleton",
  "tint-limited",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
      "text-color": [{ text: [...COLORS] }],
      "bg-color": [{ bg: [...COLORS] }],
      "border-color": [{ border: [...COLORS] }],
      "ring-color": [{ ring: [...COLORS] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
