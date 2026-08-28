import { NextResponse } from "next/server";

import { orderRequestSchema } from "@/lib/validation";
import { OrderValidationError, submitOrderRequest } from "@/server/orders";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body" }, { status: 400 });
  }

  const parsed = orderRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order request", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const result = await submitOrderRequest(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof OrderValidationError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    console.error("[kairos] order request failed", error);
    return NextResponse.json(
      { error: "Could not record your request. Please try again." },
      { status: 500 },
    );
  }
}
