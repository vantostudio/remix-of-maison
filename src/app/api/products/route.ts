import { NextResponse } from "next/server";

import { productQuerySchema } from "@/lib/validation";
import { getProducts } from "@/server/catalog";

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const parsed = productQuerySchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const products = await getProducts(parsed.data);
  return NextResponse.json({ products, count: products.length });
}
