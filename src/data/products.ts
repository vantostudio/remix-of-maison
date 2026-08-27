export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  heroImage?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  collection: string;
  price: number;
  description: string;
  longDescription: string;
  materials: string;
  dimensions?: string;
  images: string[];
  new?: boolean;
}

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
    description: "Numbered runs assembled in our Mombasa atelier",
    image: img("1548171915-e79a380a2a4b"),
    heroImage: img("1548171915-e79a380a2a4b", 1920),
  },
];

export const products: Product[] = [
  // Automatic
  {
    id: "pwani-automatic",
    name: "Pwani Automatic 39",
    slug: "pwani-automatic-39",
    collection: "automatic",
    price: 620,
    description: "A sunburst coral dial driven by a 41-hour automatic",
    longDescription:
      "The Pwani 39 is our everyday automatic — compact, warm and endlessly wearable. Its sunburst dial shifts from deep coral to soft bronze as the Mombasa light moves across it. Inside, a decorated automatic movement winds itself from the motion of your wrist and holds 41 hours of reserve when you set it down.",
    materials: "316L brushed steel case, sapphire crystal, calf leather strap",
    dimensions: "39mm case × 11.2mm thick · 20mm lugs",
    images: [img("1523170335258-f5ed11844a49"), img("1495856458515-0637185db551")],
  },
  {
    id: "kilindini-open-heart",
    name: "Kilindini Open Heart",
    slug: "kilindini-open-heart",
    collection: "automatic",
    price: 745,
    description: "An aperture at six reveals the balance wheel at work",
    longDescription:
      "Named for the deep-water harbour that built our city, the Kilindini pairs a matte anthracite dial with a small window at six o'clock — just enough to watch the balance wheel breathe. Applied indices are hand-set and lumed, and the exhibition caseback shows the full movement in motion.",
    materials: "316L steel, double-domed sapphire, exhibition caseback",
    dimensions: "40mm case × 12mm thick · 20mm lugs",
    images: [img("1594534475808-b18fc33b045e"), img("1509048191080-d2984bad6ae5")],
    new: true,
  },
  // Chronograph
  {
    id: "regatta-chronograph",
    name: "Regatta Chronograph",
    slug: "regatta-chronograph",
    collection: "chronograph",
    price: 890,
    description: "Panda dial, tachymeter bezel, three crisp registers",
    longDescription:
      "Built for people who count seconds. The Regatta runs a mechanical chronograph with a snap-crisp pusher feel, three sub-registers and a steel tachymeter bezel. The high-contrast panda dial stays readable at a glance, whether you are timing a lap or a dhow race off Fort Jesus.",
    materials: "Brushed and polished steel, sapphire crystal, steel bracelet",
    dimensions: "41mm case × 13.4mm thick · 20mm lugs",
    images: [img("1524592094714-0f0654e20314"), img("1533139143976-30918502365b")],
  },
  {
    id: "meridian-racing",
    name: "Meridian Racing Chrono",
    slug: "meridian-racing-chrono",
    collection: "chronograph",
    price: 960,
    description: "Racing dial with a perforated leather rally strap",
    longDescription:
      "The Meridian takes its cues from mid-century racing dials — recessed registers, a thin red central seconds hand and a minute track that runs right to the edge. The perforated rally strap is cut from full-grain leather and softens beautifully with wear.",
    materials: "Steel case, sapphire crystal, perforated rally leather",
    dimensions: "42mm case × 13.8mm thick · 22mm lugs",
    images: [img("1533139143976-30918502365b"), img("1524592094714-0f0654e20314")],
  },
  // Dive
  {
    id: "bahari-diver-300",
    name: "Bahari Diver 300",
    slug: "bahari-diver-300",
    collection: "dive",
    price: 780,
    description: "300m rated, ceramic bezel, ocean-blue gradient dial",
    longDescription:
      "Bahari means sea, and this one earns the name. Rated to 300 metres with a screw-down crown, a 120-click ceramic bezel and a gradient dial that fades from lagoon blue to midnight. Generous lume on every index keeps it legible far below the surface.",
    materials: "316L steel, ceramic bezel insert, Super-LumiNova, steel bracelet",
    dimensions: "42mm case × 13mm thick · 22mm lugs",
    images: [img("1547996160-81dfa63595aa"), img("1622434641406-a158123450f9")],
    new: true,
  },
  {
    id: "reef-skin-diver",
    name: "Reef Skin Diver",
    slug: "reef-skin-diver",
    collection: "dive",
    price: 540,
    description: "A slim vintage-cut diver on a tropic rubber strap",
    longDescription:
      "A skin diver in the old sense — thin enough to slip under a cuff, tough enough for the reef. Domed sapphire with a warm anti-reflective tint, faux-patina lume and a soft tropic rubber strap that dries in minutes.",
    materials: "Steel case, domed sapphire, tropic rubber strap",
    dimensions: "38mm case × 11.5mm thick · 20mm lugs",
    images: [img("1622434641406-a158123450f9"), img("1547996160-81dfa63595aa")],
  },
  // Dress
  {
    id: "swahili-slim",
    name: "Swahili Slim",
    slug: "swahili-slim",
    collection: "dress",
    price: 495,
    description: "6.8mm of quiet — an ivory dial and leaf hands",
    longDescription:
      "Our thinnest case yet. The Swahili Slim wears like a shirt cuff: an ivory lacquered dial, blued leaf hands and a printed railroad minute track. Nothing else. It is the watch we reach for when the occasion does the talking.",
    materials: "Polished steel, flat sapphire, Italian calf strap",
    dimensions: "38mm case × 6.8mm thick · 19mm lugs",
    images: [img("1522312346375-d1a52e2b99b3"), img("1526045431048-f857369baa09")],
  },
  {
    id: "nyali-gold-dress",
    name: "Nyali Gold Dress",
    slug: "nyali-gold-dress",
    collection: "dress",
    price: 690,
    description: "Champagne dial in warm gold-tone PVD",
    longDescription:
      "Warm gold-tone PVD over a polished steel case, paired with a champagne dial and slim applied batons. The Nyali is unapologetically dressy without tipping into flash — a piece for weddings, dinners and the golden hour along the beach road.",
    materials: "Gold-tone PVD steel, sapphire crystal, cognac leather",
    dimensions: "40mm case × 8.4mm thick · 20mm lugs",
    images: [img("1526045431048-f857369baa09"), img("1522312346375-d1a52e2b99b3")],
  },
  // Field & Pilot
  {
    id: "safari-field",
    name: "Safari Field 38",
    slug: "safari-field-38",
    collection: "field",
    price: 380,
    description: "Matte khaki dial with full 24-hour markings",
    longDescription:
      "Stripped to essentials: a matte khaki dial, sandblasted case and painted numerals with a 24-hour inner track. Fitted on a washed canvas strap that only gets better with dust and sun. The most honest watch we make.",
    materials: "Sandblasted steel, hardened mineral crystal, canvas strap",
    dimensions: "38mm case × 10.6mm thick · 20mm lugs",
    images: [img("1434056886845-dac89ffe9b56"), img("1508057198894-247b23fe5ade")],
  },
  {
    id: "aviator-gmt",
    name: "Aviator GMT",
    slug: "aviator-gmt",
    collection: "field",
    price: 820,
    description: "Second time zone with a 24-hour bidirectional bezel",
    longDescription:
      "For anyone keeping two clocks in their head. An independent GMT hand and a 24-hour bezel let you track home and away at once. Oversized crown, high-contrast markers and a fluted bezel edge you can turn with gloves on.",
    materials: "Steel case, anti-reflective sapphire, jubilee-style bracelet",
    dimensions: "41mm case × 12.4mm thick · 21mm lugs",
    images: [img("1508057198894-247b23fe5ade"), img("1434056886845-dac89ffe9b56")],
    new: true,
  },
  // Skeleton
  {
    id: "atelier-skeleton",
    name: "Atelier Skeleton",
    slug: "atelier-skeleton",
    collection: "skeleton",
    price: 1180,
    description: "A fully open-worked dial, hand-finished bridges",
    longDescription:
      "Our watchmakers spend two full days on each Atelier Skeleton, chamfering and brushing every bridge before assembly. The result is a dial that is barely a dial at all — just gears, springs and light. Best viewed slowly.",
    materials: "Steel case, sapphire front and back, alligator-grain leather",
    dimensions: "40mm case × 11.8mm thick · 20mm lugs",
    images: [img("1533139502658-0198f920d8e8"), img("1611591437281-460bfbe1220a")],
  },
  {
    id: "eclipse-skeleton-noir",
    name: "Eclipse Skeleton Noir",
    slug: "eclipse-skeleton-noir",
    collection: "skeleton",
    price: 1320,
    description: "Blackened movement under a smoked sapphire dial",
    longDescription:
      "The Eclipse hides in plain sight. A blackened, open-worked movement sits beneath a lightly smoked sapphire dial, so the mechanics appear and disappear as light moves across the wrist. Lumed hands keep it readable when the dial goes dark.",
    materials: "DLC-coated steel, smoked sapphire, rubber-backed leather",
    dimensions: "41mm case × 12.6mm thick · 22mm lugs",
    images: [img("1611591437281-460bfbe1220a"), img("1533139502658-0198f920d8e8")],
  },
  // Straps & Accessories
  {
    id: "sailcloth-strap",
    name: "Sailcloth Strap Set",
    slug: "sailcloth-strap-set",
    collection: "straps",
    price: 95,
    description: "Three quick-release straps in ocean tones",
    longDescription:
      "Water-resistant sailcloth over a soft rubber backing, with quick-release spring bars so you can change the mood without tools. The set includes navy, sand and slate, each with a brushed steel buckle.",
    materials: "Sailcloth, rubber backing, brushed steel buckle",
    dimensions: "Available in 20mm and 22mm",
    images: [img("1587836374828-4dbafa94cf0e"), img("1585123334904-845d60e97b29")],
  },
  {
    id: "travel-roll",
    name: "Leather Watch Roll",
    slug: "leather-watch-roll",
    collection: "straps",
    price: 140,
    description: "Carries three watches, made by hand in Old Town",
    longDescription:
      "Stitched by a leatherworker two streets from our workshop in Mombasa Old Town. Full-grain hide outside, suede-lined cushions inside, and a wrap tie that keeps three watches safe in a carry-on.",
    materials: "Full-grain leather, suede lining",
    dimensions: "Holds 3 watches · 26cm rolled",
    images: [img("1585123334904-845d60e97b29"), img("1587836374828-4dbafa94cf0e")],
  },
  // Limited Editions
  {
    id: "fort-jesus-limited",
    name: "Fort Jesus Limited",
    slug: "fort-jesus-limited",
    collection: "limited",
    price: 1450,
    description: "150 pieces, coral-stone textured dial, numbered caseback",
    longDescription:
      "A tribute to the coral-stone walls that have watched over our harbour for four centuries. The dial is textured to echo cut coral rag, the seconds hand is finished in oxidised copper, and each caseback is engraved with its number out of 150.",
    materials: "Steel case, textured stone-effect dial, engraved caseback",
    dimensions: "40mm case × 11.9mm thick · 20mm lugs",
    images: [img("1548171915-e79a380a2a4b"), img("1519861531473-9200262188bf")],
    new: true,
  },
  {
    id: "monsoon-moonphase",
    name: "Monsoon Moonphase",
    slug: "monsoon-moonphase",
    collection: "limited",
    price: 1690,
    description: "A moonphase tuned to the kaskazi and kusi seasons",
    longDescription:
      "Sailors on this coast have read the moon for centuries. The Monsoon carries an aventurine moonphase disc at twelve, hand-set indices and a deep midnight dial. Limited to 80 pieces, each delivered with a printed tide and monsoon almanac.",
    materials: "Steel case, aventurine moonphase disc, sapphire crystal",
    dimensions: "40mm case × 12.1mm thick · 20mm lugs",
    images: [img("1519861531473-9200262188bf"), img("1548171915-e79a380a2a4b")],
  },
];

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return products.filter((product) => product.collection === collectionSlug);
};

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.new);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((collection) => collection.slug === slug);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return products
    .filter((p) => p.collection === product.collection && p.id !== productId)
    .slice(0, limit);
};
