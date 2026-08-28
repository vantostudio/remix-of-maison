/**
 * Each collection carries its own tint, used at word level only — never as a
 * fill, a border or a background. A headline stays monochrome except for the
 * one word that says which kind of watch you are looking at.
 *
 * Every tint is declared twice in the theme, once per colour scheme, so it
 * stays legible whether the page is limestone or ocean.
 *
 * Class strings are written out in full because Tailwind resolves utilities at
 * build time and cannot see an interpolated name.
 */
export interface Accent {
  /** Colours the tinted word in a headline. */
  text: string;
  /** Colours a small kicker or metadata label. */
  label: string;
}

const UNTINTED: Accent = { text: "text-foreground", label: "text-subtle-foreground" };

const accents: Record<string, Accent> = {
  automatic: { text: "text-tint-automatic", label: "text-tint-automatic" },
  chronograph: { text: "text-tint-chronograph", label: "text-tint-chronograph" },
  dive: { text: "text-tint-dive", label: "text-tint-dive" },
  field: { text: "text-link", label: "text-link" },
  skeleton: { text: "text-tint-skeleton", label: "text-tint-skeleton" },
  limited: { text: "text-tint-limited", label: "text-tint-limited" },
  // Dress and Straps stay untinted — restraint is part of the system.
  dress: UNTINTED,
  straps: UNTINTED,
};

export function accentFor(collectionId: string | undefined): Accent {
  return (collectionId && accents[collectionId]) || UNTINTED;
}
