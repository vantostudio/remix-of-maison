import "server-only";

import { getProductBySlug } from "@/server/catalog";
import type { OrderRequestInput } from "@/lib/validation";

export interface OrderRequestResult {
  reference: string;
  subtotal: number;
  currency: "KES";
  receivedAt: string;
}

function reference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const noise = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KRS-${stamp}-${noise}`;
}

/**
 * Accepts an order request. Prices are recomputed from the catalog rather than
 * trusted from the client, so a tampered payload cannot change what is owed.
 *
 * Online payment is not live yet — this records the request and the concierge
 * team follows up. Swap the console sink for a datastore or email provider.
 */
export async function submitOrderRequest(
  input: OrderRequestInput,
): Promise<OrderRequestResult> {
  let subtotal = 0;

  for (const line of input.items) {
    const product = await getProductBySlug(line.slug);
    if (!product) {
      throw new OrderValidationError(`Unknown product: ${line.slug}`);
    }
    subtotal += product.price * line.quantity;
  }

  const result: OrderRequestResult = {
    reference: reference(),
    subtotal,
    currency: "KES",
    receivedAt: new Date().toISOString(),
  };

  console.info("[kairos] order request", {
    reference: result.reference,
    email: input.email,
    lines: input.items.length,
    subtotal: result.subtotal,
  });

  return result;
}

export class OrderValidationError extends Error {}
