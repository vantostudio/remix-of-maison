import type { Collection } from "@/types/catalog";

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export const collections: Collection[] = [
  {
    id: "automatic",
    name: "Automatic",
    slug: "automatic",
    description: "Self-winding movements powered by the motion of your wrist",
    image: img("1523170335258-f5ed11844a49"),
    heroImage: img("1523170335258-f5ed11844a49", 1920),
  },
  {
    id: "chronograph",
    name: "Chronograph",
    slug: "chronograph",
    description: "Precision stopwatch complications for measured moments",
    image: img("1524592094714-0f0654e20314"),
    heroImage: img("1524592094714-0f0654e20314", 1920),
  },
  {
    id: "dive",
    name: "Dive",
    slug: "dive",
    description: "Built for the Indian Ocean — 300m of quiet confidence",
    image: img("1547996160-81dfa63595aa"),
    heroImage: img("1547996160-81dfa63595aa", 1920),
  },
  {
    id: "dress",
    name: "Dress",
    slug: "dress",
    description: "Slim cases and clean dials for evenings that matter",
    image: img("1522312346375-d1a52e2b99b3"),
    heroImage: img("1522312346375-d1a52e2b99b3", 1920),
  },
  {
    id: "field",
    name: "Field & Pilot",
    slug: "field",
    description: "Legible, rugged tool watches made for the open road",
    image: img("1434056886845-dac89ffe9b56"),
    heroImage: img("1434056886845-dac89ffe9b56", 1920),
  },
  {
    id: "skeleton",
    name: "Skeleton",
    slug: "skeleton",
    description: "Open-worked dials that reveal the beating heart within",
    image: img("1533139502658-0198f920d8e8"),
    heroImage: img("1533139502658-0198f920d8e8", 1920),
  },
  {
    id: "straps",
    name: "Straps & Accessories",
    slug: "straps",
    description: "Leather, sailcloth and steel — change the mood in seconds",
    image: img("1587836374828-4dbafa94cf0e"),
    heroImage: img("1587836374828-4dbafa94cf0e", 1920),
  },
  {
    id: "limited",
    name: "Limited Editions",
    slug: "limited",
    description: "Numbered runs, held in small quantities",
    image: img("1548171915-e79a380a2a4b"),
    heroImage: img("1548171915-e79a380a2a4b", 1920),
  },
];
