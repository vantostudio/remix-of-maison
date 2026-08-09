import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-24 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 text-muted-foreground/30" />
            <h1 className="font-serif text-3xl md:text-4xl mb-4">No Favorites Yet</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Tap the heart on any piece to save it here for later.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
            >
              <Link to="/products">
                Explore Pieces
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-full py-6 border-b border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link to="/products" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">Favorites</span>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container-full">
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-12">
            <div>
              <h1 className="font-serif text-3xl md:text-5xl leading-tight">Favorites</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {items.length} saved {items.length === 1 ? "piece" : "pieces"}
              </p>
            </div>
            <button
              onClick={clearWishlist}
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16">
            {items.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Favorites;
