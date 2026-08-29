"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

export interface MediaProps {
  src: string;
  alt: string;
  /** Classes applied to the image itself — transforms, opacity, filters. */
  className?: string;
  /**
   * How wide the image actually renders, per breakpoint. Next uses this to pick
   * a srcset entry, so a wrong value costs bandwidth. Default assumes full-bleed.
   */
  sizes?: string;
  /** Set on above-the-fold images only — it opts them out of lazy loading. */
  priority?: boolean;
  quality?: number;
}

/**
 * Every photograph on the storefront is remote and fills a box its container has
 * already sized. `Media` encodes exactly that — `fill` plus `object-cover` — so
 * call sites decide only the frame and whatever motion sits on top.
 *
 * `fill` needs a positioned ancestor. Use `MediaFrame`, or put `relative` on the
 * parent yourself.
 */
export function Media({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  quality,
}: MediaProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("object-cover", className)}
    />
  );
}

export interface MediaFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * The positioned, clipped box `Media` expects. Exists mostly so the `relative`
 * that `fill` depends on can never be forgotten at a call site.
 */
export function MediaFrame({ className, children, ...props }: MediaFrameProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}
