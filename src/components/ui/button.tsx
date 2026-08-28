"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Two archetypes carry the whole site: a filled pill for the purchase moment,
 * and a neutral pill for everything else. They share geometry exactly and
 * differ only in fill, so the one blue button on a page is always the answer
 * to "what am I meant to do here?".
 *
 * No shadows, no gradients, no borders on the filled variants.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold " +
    "transition-colors duration-200 outline-hidden " +
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-40 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** The buy moment. The only lume-filled control on a page. */
        primary: "bg-accent text-on-accent hover:bg-accent-hover",
        /** Its quiet cousin: same geometry, no lume. */
        neutral: "bg-control text-foreground hover:bg-control-hover",
        /** Hairline only, for tertiary affordances. */
        outline: "border border-hairline text-foreground hover:bg-surface-sunk",
        /** Chromeless — used inside dense controls. */
        ghost: "text-foreground hover:bg-surface-sunk",
        /** In-flow link styling for anchors that must look like text. */
        link: "text-link underline underline-offset-[3px] decoration-1 hover:opacity-80",
        destructive: "bg-destructive text-on-destructive hover:opacity-90",
      },
      size: {
        sm: "h-9 rounded-lg px-4 text-body-sm",
        default: "h-11 rounded-xl px-5 text-body",
        lg: "h-12 rounded-xl px-7 text-body",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
