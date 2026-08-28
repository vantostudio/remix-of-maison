import type { Metadata } from "next";

import { CartView } from "@/components/views/CartView";

export const metadata: Metadata = {
  title: "Shopping Bag",
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
