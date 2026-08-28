/**
 * The shop trades in Kenyan shillings. `en-KE` renders these as "Ksh 80,500";
 * shillings are quoted whole, so fractions are dropped rather than shown as
 * ".00" on every price in the catalog.
 */
const currency = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return currency.format(amount);
}
