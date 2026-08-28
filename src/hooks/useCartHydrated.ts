"use client";

import { useSyncExternalStore } from "react";

import { useCart } from "@/hooks/useCart";

/**
 * The bag is persisted to localStorage, which the server cannot see. So the
 * server always renders an empty cart while the browser rehydrates a full one,
 * and React reports a hydration mismatch.
 *
 * `useSyncExternalStore` is the sanctioned way out: React deliberately uses the
 * server snapshot for the first client render — matching the HTML exactly — and
 * only then re-renders with the real value. Anything that reads persisted cart
 * state during render should gate on this.
 */
const subscribe = (onStoreChange: () => void) =>
  useCart.persist.onFinishHydration(onStoreChange);

const getSnapshot = () => useCart.persist.hasHydrated();

const getServerSnapshot = () => false;

export function useCartHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
