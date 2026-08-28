import Link from "next/link";

import { Media } from "@/components/media/Media";
import { accentFor } from "@/lib/accents";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/catalog";

interface CollectionCardProps {
  collection: Collection;
  /** Grid placement — the parent decides how much room this card gets. */
  className?: string;
  /**
   * Feature tile: instead of a fixed ratio the image stretches to fill a cell
   * that spans two rows, so its bottom edge lines up with the pair of standard
   * cards beside it. Below `lg` it falls back to a normal ratio.
   */
  feature?: boolean;
  /** Image ratio, which changes with how wide the card's cell is. */
  mediaClassName?: string;
  sizes?: string;
}

export const CollectionCard = ({
  collection,
  className,
  feature = false,
  mediaClassName = "aspect-3/4",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: CollectionCardProps) => {
  const accent = accentFor(collection.id);

  return (
    <article className={cn("group", feature && "lg:h-full", className)}>
      <Link
        href={`/products?collection=${collection.slug}`}
        className={cn("block", feature && "lg:flex lg:flex-col lg:h-full")}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-surface-sunk",
            feature
              ? "aspect-16/9 sm:aspect-4/3 lg:aspect-auto lg:flex-1 lg:min-h-[22rem]"
              : mediaClassName,
          )}
        >
          <Media
            src={collection.image}
            alt={collection.name}
            sizes={sizes}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="pt-4">
          <h3 className={cn("text-heading-sm", accent.text)}>
            {collection.name}
          </h3>
          <p className="mt-1.5 text-body-sm text-muted-foreground max-w-[34ch]">
            {collection.description}
          </p>
        </div>
      </Link>
    </article>
  );
};
