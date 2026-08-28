import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Instagram, Compass, ShieldCheck, Waves } from "lucide-react";
import { useRef } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CollectionCard } from "@/components/CollectionCard";
import { collections, getNewProducts, products } from "@/data/products";
import { Button } from "@/components/ui/button";

const tickerWords = [
  "Swiss-Type Automatic",
  "Assembled in Mombasa",
  "300m Water Resistance",
  "Sapphire Crystal",
  "Five-Year Warranty",
  "Numbered Editions",
];

const stats = [
  { value: "41h", label: "Power Reserve", icon: Compass },
  { value: "300m", label: "Depth Rated", icon: Waves },
  { value: "05", label: "Year Warranty", icon: ShieldCheck },
];

const Index = () => {
  const newProducts = getNewProducts();
  const latestProducts = (newProducts.length >= 4 ? newProducts : products).slice(0, 4);
  const displayedCollections = collections.slice(0, 6);
  const signature = collections[0];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const wristShots = [
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80",
    "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80",
    "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&q=80",
    "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&q=80",
    "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&q=80",
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80",
  ];

  return (
    <Layout>
      {/* Hero — cinematic full viewport */}
      <section ref={heroRef} className="relative h-[100svh] -mt-16 md:-mt-20 overflow-hidden bg-onyx">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1920&q=80"
            alt="Kairos automatic watch resting on dark stone"
            className="w-full h-[120%] object-cover opacity-70 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/70 via-onyx/40 to-onyx" />
        </motion.div>

        {/* Corner reference marks */}
        <div className="absolute top-24 left-4 sm:left-6 lg:left-12 z-10 hidden sm:block">
          <p className="numerals text-[10px] text-primary/70">REF. 001 — MSA</p>
        </div>
        <div className="absolute top-24 right-4 sm:right-6 lg:right-12 z-10 hidden sm:block text-right">
          <p className="numerals text-[10px] text-white/40">04° 03′ S · 39° 40′ E</p>
        </div>

        <motion.div
          className="relative container-full h-full flex flex-col justify-end pb-20 md:pb-28 pt-16 md:pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[11px] font-semibold tracking-[0.35em] uppercase text-primary mb-6"
            >
              Mombasa, Kenya · Est. 2019
            </motion.p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-6 sm:mb-8 leading-[0.88] tracking-tight">
              The Right
              <br />
              <span className="italic font-normal text-primary">Moment</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed max-w-lg">
              Mechanical watches built on the Kenyan coast — sapphire, steel and
              self-winding calibres, assembled by hand and numbered one by one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
              >
                <Link to="/products">
                  Explore the Watches
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <Link to="/about">Inside the Atelier</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Wind Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-primary/70" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Ticker */}
      <section className="border-y border-border bg-panel py-4 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content gap-10 pr-10">
            {[...tickerWords, ...tickerWords, ...tickerWords, ...tickerWords].map((word, i) => (
              <span
                key={i}
                className="flex items-center gap-10 text-[10px] font-semibold tracking-[0.32em] uppercase text-muted-foreground whitespace-nowrap"
              >
                {word}
                <span className="w-1 h-1 rounded-full bg-primary/70" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Signature collection */}
      <section className="py-20 md:py-28">
        <div className="container-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="relative aspect-[4/5] overflow-hidden group bg-onyx"
            >
              <img
                src={signature.heroImage || signature.image}
                alt={`${signature.name} collection`}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent" />

              {/* Rotating seconds hand marker */}
              <div className="absolute bottom-6 right-6 w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center">
                <motion.span
                  className="block w-px h-6 bg-primary origin-bottom"
                  style={{ transformOrigin: "50% 100%" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <span className="absolute w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="md:py-12"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Signature Collection
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[0.95]">
                {signature.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                {signature.description}. Every rotor is regulated in five positions
                before it leaves the bench, so the watch keeps pace with your day
                and asks nothing in return.
              </p>
              <div className="rule-gold mb-8 max-w-md" />
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
              >
                <Link to={`/products?collection=${signature.slug}`}>
                  Shop {signature.name}
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New releases */}
      <section className="py-20 md:py-28 bg-panel">
        <div className="container-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                New Releases
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
                Fresh Off the Bench
              </h2>
            </motion.div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
            >
              All Watches
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
            {latestProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-14 text-center md:hidden">
            <Button
              asChild
              variant="outline"
              className="rounded-none px-8 py-5 text-sm tracking-[0.15em] uppercase"
            >
              <Link to="/products">View All Watches</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Calibre specs */}
      <section className="py-20 md:py-28 bg-guilloche border-y border-border">
        <div className="container-full">
          <div className="grid md:grid-cols-3 gap-10 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="text-center"
              >
                <stat.icon className="w-5 h-5 mx-auto mb-5 text-primary" />
                <p className="numerals text-4xl md:text-5xl text-foreground mb-3">
                  {stat.value}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-24 md:py-32">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Find Your Calibre
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Collections
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-7">
              <CollectionCard collection={displayedCollections[0]} index={0} variant="wide" />
            </div>
            <div className="md:col-span-5">
              <CollectionCard collection={displayedCollections[1]} index={1} />
            </div>
            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[2]} index={2} />
            </div>
            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[3]} index={3} />
            </div>
            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[4]} index={4} />
            </div>
            <div className="md:col-span-12">
              <CollectionCard collection={displayedCollections[5]} index={5} variant="wide" />
            </div>
          </div>
        </div>
      </section>

      {/* Atelier */}
      <section className="py-24 md:py-32 bg-panel">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-6">
              The Atelier
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.3] mb-8">
              Kairos is the hour that matters — not the one the clock keeps, but the
              one you <span className="italic text-primary">choose</span>.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Our bench sits a few streets from the old harbour in Mombasa Town. We
              case, regulate and test every watch there: seven days on the timing
              machine, salt-air exposure, then a number engraved on the caseback
              before it ships.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase"
            >
              <Link to="/about">
                Our Story
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Wrist shots */}
      <section className="py-20 md:py-28">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Worn By You
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              @kairoswatches
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Tag your wrist shot and we'll feature it — from Nyali beach to the
              Nairobi night shift.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {wristShots.map((image, index) => (
              <motion.a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative aspect-square overflow-hidden group cursor-pointer bg-onyx"
              >
                <img
                  src={image}
                  alt="Kairos watch worn on the wrist"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/50 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
