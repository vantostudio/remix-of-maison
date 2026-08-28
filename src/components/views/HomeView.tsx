"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

import { CollectionCard } from "@/components/commerce/CollectionCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/button";
import { accentFor } from "@/lib/accents";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Collection, Product } from "@/types/catalog";

interface HomeViewProps {
  collections: Collection[];
  latestProducts: Product[];
}

const heroImage =
  "https://images.unsplash.com/photo-1657235895095-e043ce2ebf41?w=1600&q=80";

const wristShots = [
  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
  "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80",
  "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&q=80",
  "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&q=80",
  "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&q=80",
  "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80",
];

export const HomeView = ({ collections, latestProducts }: HomeViewProps) => {
  const hero = latestProducts[0];
  const heroAccent = accentFor(hero?.collection);
  const signature = collections[0];
  const signatureAccent = accentFor(signature?.id);

  return (
    <>
      {/* ── Hero: product on white, headline left, one blue pill ────────── */}
      <section className="band-surface pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="container-content">
          <p className="kicker text-center">Kairos · Mombasa</p>

          <div className="relative mt-8 md:mt-12 mx-auto aspect-4/3 md:aspect-video max-w-[900px] overflow-hidden rounded-3xl bg-background">
            <Media
              src={heroImage}
              alt="A mechanical watch with an open-worked dial"
              sizes="(min-width: 1024px) 900px, 100vw"
              priority
            />
          </div>

          <div className="mt-12 md:mt-16">
            <h1 className="text-heading-lg font-semibold text-foreground max-w-[20ch]">
              The right watch.
              <br />
              The right <span className={heroAccent.text}>moment</span>.
            </h1>

            <p className="mt-5 text-body text-muted-foreground max-w-[46ch]">
              A considered selection of mechanical watches — automatic,
              chronograph and dive references, chosen one at a time and sold
              from a shop on Nkrumah Road.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/products">Shop all watches</Link>
              </Button>
              {hero && (
                <p className="text-body-sm text-subtle-foreground">
                  New in ·{" "}
                  <Link href={`/products/${hero.slug}`} className="link-inline">
                    {hero.name}
                  </Link>{" "}
                  <span className="numerals text-foreground">
                    {formatPrice(hero.price)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── New this season ─────────────────────────────────────────────── */}
      <section className="band band-base">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="text-heading font-semibold text-foreground">
              New this season.
            </h2>
            <Button asChild variant="neutral" size="sm">
              <Link href="/products">See all</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
            {latestProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature collection: image left, text right ────────────────── */}
      {signature && (
        <section className="band band-surface">
          <div className="container-page">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-background">
                <Media
                  src={signature.heroImage || signature.image}
                  alt={`${signature.name} collection`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div>
                <p className="kicker">Signature collection</p>
                <h2
                  className={cn(
                    "mt-3 text-heading-lg font-semibold",
                    signatureAccent.text,
                  )}
                >
                  {signature.name}.
                </h2>
                <p className="mt-5 text-body text-muted-foreground max-w-[42ch]">
                  {signature.description}. Each one is checked on the timing
                  machine before it leaves the shop, so it keeps pace from the
                  day you put it on.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link href={`/products?collection=${signature.slug}`}>
                      Shop {signature.name}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Collections: an editorial mosaic rather than a uniform grid ── */}
      <section className="band band-base">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="text-heading">Find your kind of watch.</h2>
            <Button asChild variant="neutral" size="sm">
              <Link href="/products">Browse everything</Link>
            </Button>
          </div>

          {/*
            The mosaic starts at the smallest screen rather than waiting for a
            breakpoint: two columns on a phone, with the feature tile and one
            mid-row card running full width so the rhythm is visible there too.
            At `lg` the feature grows into a two-row tile beside a stacked pair.
          */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {collections.slice(0, 6).map((collection, index) => {
              const feature = index === 0;
              const wideOnPhone = index === 3;

              return (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  feature={feature}
                  className={cn(
                    feature && "col-span-2 lg:row-span-2",
                    wideOnPhone && "col-span-2 lg:col-span-1",
                  )}
                  mediaClassName={cn(
                    wideOnPhone ? "aspect-16/9 lg:aspect-3/4" : "aspect-3/4",
                  )}
                  sizes={
                    feature || wideOnPhone
                      ? "(min-width: 1024px) 66vw, 100vw"
                      : "(min-width: 1024px) 33vw, 50vw"
                  }
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Worn by you ─────────────────────────────────────────────────── */}
      <section className="band band-surface">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="kicker">Worn by you</p>
              <h2 className="mt-3 text-heading font-semibold text-foreground">
                {site.social.instagram.handle}
              </h2>
            </div>
            <Button asChild variant="neutral" size="sm">
              <a
                href={site.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" />
                Follow
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {wristShots.map((image, index) => (
              <a
                key={index}
                href={site.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-xl bg-background group"
              >
                <Media
                  src={image}
                  alt="A Kairos watch worn on the wrist"
                  sizes="(min-width: 768px) 16vw, 33vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
