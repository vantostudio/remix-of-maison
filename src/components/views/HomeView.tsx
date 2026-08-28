"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Instagram } from "lucide-react";

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
  const signature = collections[0];
  const signatureAccent = accentFor(signature?.id);

  return (
    <>
      {/* ── Hero: one immersive product stage, no canvas or heavy 3D ──── */}
      <section className="hero-stage">
        <div className="hero-stage__media">
          <div className="relative size-full">
            <Media
              src={heroImage}
              alt="A mechanical watch with an open-worked dial"
              sizes="100vw"
              priority
              className="hero-stage__image"
            />
          </div>
        </div>
        <div className="hero-stage__scrim" aria-hidden="true" />

        <div className="container-page relative z-10 flex min-h-[calc(100svh-3rem)] flex-col justify-between py-6 sm:py-8 lg:py-10">
          <div className="flex items-center justify-between gap-6 text-white/70">
            <p className="text-caption font-medium uppercase tracking-[0.16em]">
              Kairos · Mombasa
            </p>
            <p className="hidden text-caption uppercase tracking-[0.16em] sm:block">
              Mechanical watches · Since 2024
            </p>
          </div>

          <div className="grid items-end gap-8 pb-2 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 lg:pb-4">
            <div className="max-w-[52rem]">
              <p className="mb-4 text-caption font-medium uppercase tracking-[0.16em] text-white/70 sm:mb-5">
                Made for the moment
              </p>
              <h1 className="max-w-[10ch] font-serif text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.055em] text-white">
                Time, worn <span className="italic font-normal">well.</span>
              </h1>

              <p className="mt-5 max-w-[38rem] text-body text-white/75 sm:mt-7 sm:text-body-lg">
                Mechanical watches selected in Mombasa for the days that matter
                — and every day after.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#151515] hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-[#0a0a09]"
                >
                  <Link href="/products">
                    Explore the collection
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link
                  href="/products"
                  className="inline-flex min-h-11 items-center px-2 text-body-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  View new arrivals
                </Link>
              </div>
            </div>

            {hero && (
              <Link
                href={`/products/${hero.slug}`}
                className="hero-product-card group"
                aria-label={`View ${hero.name}, ${formatPrice(hero.price)}`}
              >
                <span className="text-caption font-medium uppercase tracking-[0.14em] text-white/60">
                  New arrival · 01
                </span>
                <span className="mt-3 flex items-start justify-between gap-5">
                  <span>
                    <span className="block font-serif text-heading-sm leading-tight text-white">
                      {hero.name}
                    </span>
                    <span className="numerals mt-2 block text-body-sm text-white/70">
                      {formatPrice(hero.price)}
                    </span>
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <ArrowDown className="size-4" />
          <span>Discover</span>
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
