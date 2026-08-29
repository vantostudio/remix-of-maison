"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CartIcon } from "@/components/commerce/CartIcon";
import { accentFor } from "@/lib/accents";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/catalog";

interface HeaderProps {
  collections: Collection[];
}

/**
 * White fill, one hairline underneath, 12px labels. The nav bar itself is
 * square — the pill radius belongs to the utility controls inside it.
 */
export const Header = ({ collections }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-hairline">
      <nav className="container-page">
        <div className="flex items-center justify-between h-12">
          <Link
            href="/"
            className="font-serif text-subheading tracking-[0.16em] uppercase text-foreground"
          >
            {site.name}
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                type="button"
                onClick={() => setShopOpen((open) => !open)}
                className="text-caption text-foreground hover:text-accent transition-colors py-3"
              >
                Collections
              </button>

              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[22rem] bg-surface border border-hairline rounded-3xl p-3"
                  >
                    <ul>
                      {collections.map((collection) => {
                        const accent = accentFor(collection.id);
                        return (
                          <li key={collection.id}>
                            <Link
                              href={`/products?collection=${collection.slug}`}
                              onClick={() => setShopOpen(false)}
                              className="flex items-baseline justify-between gap-4 rounded-md px-4 py-2.5 hover:bg-background transition-colors"
                            >
                              <span className="text-body-sm text-foreground">
                                {collection.name}
                              </span>
                              <span className={cn("text-caption", accent.label)}>
                                ↗
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/products"
              className="text-caption text-foreground hover:text-accent transition-colors"
            >
              Shop All
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <CartIcon />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-background transition-colors"
            >
              {menuOpen ? (
                <X className="w-4 h-4 text-foreground" />
              ) : (
                <Menu className="w-4 h-4 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="md:hidden overflow-hidden border-t border-hairline"
            >
              <div className="py-4">
                <p className="kicker mb-2">Collections</p>
                <ul className="mb-4">
                  {collections.map((collection) => (
                    <li key={collection.id}>
                      <Link
                        href={`/products?collection=${collection.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2.5 text-subheading text-foreground"
                      >
                        {collection.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="hairline mb-4" />
                {[
                  { href: "/products", label: "Shop All" },
                  { href: "/cart", label: "Your Bag" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 text-subheading text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
