/**
 * Single source of truth for the things that appear in more than one place —
 * the shop's details and where to find it. Change them here, not in a view.
 */
export const site = {
  name: "Kairos",
  legalName: "Kairos Watches",
  tagline: "A mechanical watch shop on Nkrumah Road, Mombasa.",
  description:
    "A curated shop for mechanical watches — automatic, chronograph and dive references, sold from Mombasa Town, Kenya.",
  email: "hello@kairos.co.ke",
  phone: "+254 700 123 456",
  phoneHref: "tel:+254700123456",
  address: {
    line1: "Nkrumah Road, Mombasa Town",
    line2: "Mombasa, Kenya",
  },
  hours: "Mon–Sat, 9am–6pm EAT",
  payment: "M-Pesa, card, or payment on delivery.",
  social: {
    instagram: {
      label: "Instagram",
      handle: "@kairoswatches",
      href: "https://instagram.com/kairoswatches",
    },
    facebook: {
      label: "Facebook",
      handle: "Kairos Watches",
      href: "https://facebook.com/kairoswatches",
    },
  },
} as const;

export const socialLinks = [site.social.instagram, site.social.facebook];
