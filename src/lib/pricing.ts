/**
 * Delivery rules, in Kenyan shillings. Kept here rather than inline in the bag
 * and the checkout, which previously carried the same two magic numbers and
 * could drift apart.
 */
export const FREE_DELIVERY_THRESHOLD = 8_000;
export const STANDARD_DELIVERY = 500;

export function deliveryFor(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY;
}
