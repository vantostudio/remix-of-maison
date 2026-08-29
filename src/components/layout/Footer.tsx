import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

import { site, socialLinks } from "@/lib/site";
import type { Collection } from "@/types/catalog";

interface FooterProps {
  collections: Collection[];
}

const socialIcons = { Instagram, Facebook } as const;

export const Footer = ({ collections }: FooterProps) => {
  const columns = [
    {
      heading: "Collections",
      items: collections.slice(0, 6).map((collection) => ({
        label: collection.name,
        href: `/products?collection=${collection.slug}`,
      })),
    },
    {
      heading: "Shop",
      items: [
        { label: "All Watches", href: "/products" },
        { label: "Your Bag", href: "/cart" },
        { label: "Contact", href: `mailto:${site.email}` },
      ],
    },
  ];

  return (
    <footer className="bg-background">
      <div className="rule-lume" />
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-8 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4 lg:pr-10">
            <Link
              href="/"
              className="font-serif text-subheading tracking-[0.16em] uppercase text-foreground"
            >
              {site.name}
            </Link>
            <p className="mt-3 text-body-sm text-subtle-foreground max-w-[15rem]">
              {site.tagline}
            </p>

            <div className="flex gap-2 mt-6">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${social.label}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-control text-foreground hover:bg-control-hover transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((column, index) => (
            <div
              key={column.heading}
              className={index === 0 ? "col-span-1 lg:col-span-3" : "col-span-1 lg:col-span-2"}
            >
              <h4 className="kicker mb-4">{column.heading}</h4>
              <ul className="space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-3 rounded-2xl bg-surface p-5 sm:p-6">
            <h4 className="kicker mb-4">Visit</h4>
            <address className="not-italic text-body-sm text-muted-foreground leading-relaxed">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>
            <a
              href={site.phoneHref}
              className="mt-2.5 block text-body-sm text-muted-foreground hover:text-foreground transition-colors numerals"
            >
              {site.phone}
            </a>
            <p className="mt-2.5 text-body-sm text-subtle-foreground">{site.hours}</p>

            <div className="hairline my-4" />
            <p className="kicker mb-1.5">Payment</p>
            <p className="text-body-sm text-muted-foreground">{site.payment}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-caption text-subtle-foreground">
            © {new Date().getFullYear()} {site.legalName}. Mombasa, Kenya.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Warranty"].map((item) => (
              <span key={item} className="text-caption text-subtle-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
