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

export interface CartItem {
  product: Product;
  quantity: number;
}

export const SORT_OPTIONS = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "name-asc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export interface ProductQuery {
  collection?: string;
  sort?: SortOption;
  newOnly?: boolean;
}
