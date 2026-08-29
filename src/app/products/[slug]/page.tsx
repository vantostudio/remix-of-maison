import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/views/ProductDetailView";
import {
  getCollections,
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from "@/server/catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · Kairos`,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, collections] = await Promise.all([
    getRelatedProducts(product.id),
    getCollections(),
  ]);

  const collection =
    collections.find((entry) => entry.id === product.collection) ?? null;

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
      collection={collection}
    />
  );
}
