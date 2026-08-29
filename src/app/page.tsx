import { HomeView } from "@/components/views/HomeView";
import { getCollections, getNewProducts } from "@/server/catalog";

export default async function HomePage() {
  const [collections, latestProducts] = await Promise.all([
    getCollections(),
    getNewProducts(4),
  ]);

  return <HomeView collections={collections} latestProducts={latestProducts} />;
}
