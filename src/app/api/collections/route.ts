import { NextResponse } from "next/server";

import { getCollections } from "@/server/catalog";

export async function GET() {
  const collections = await getCollections();
  return NextResponse.json({ collections });
}
