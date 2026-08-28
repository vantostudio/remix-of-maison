import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/products";

export const Footer = () => {
  return (
    <footer className="bg-onyx text-foreground border-t border-border">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="container-full py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Link
                to="/"
                className="font-serif text-3xl md:text-4xl tracking-[0.2em] uppercase text-foreground"
              >
                Kairos
              </Link>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
                Mechanical watches assembled by hand in Mombasa Town, Kenya.
              </p>
            </div>

            {/* Newsletter */}
            <div className="max-w-sm w-full">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                Release Notes
              </p>
              <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email address"
                  className="flex-1 h-12 px-4 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="h-12 px-5 text-sm font-medium bg-primary text-primary-foreground hover:bg-gold-light transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-full py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-5">
              Collections
            </h4>
            <ul className="space-y-3">
              {collections.slice(0, 6).map((collection) => (
                <li key={collection.id}>
                  <Link
                    to={`/products?collection=${collection.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  All Watches
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  The Atelier
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Saved Watches
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Your Bag
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-5">
              Service
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">Payment on Delivery</li>
              <li className="text-sm text-muted-foreground">Servicing &amp; Regulation</li>
              <li className="text-sm text-muted-foreground">Strap Changes</li>
              <li className="text-sm text-muted-foreground">5-Year Warranty</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-5">
              Visit Us
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground leading-relaxed">
                Kairos Atelier
                <br />
                Nkrumah Road, Mombasa Town
                <br />
                Mombasa, Kenya
              </li>
              <li>
                <a
                  href="tel:+254700123456"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 numerals"
                >
                  +254 700 123 456
                </a>
              </li>
              <li className="text-sm text-muted-foreground/70">Mon–Sat, 9am–6pm EAT</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-full py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60 text-center">
            © {new Date().getFullYear()} Kairos Watches. Mombasa, Kenya.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <span className="text-xs text-muted-foreground/50">Privacy Policy</span>
            <span className="text-xs text-muted-foreground/50">Terms of Service</span>
            <span className="text-xs text-muted-foreground/50">Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
