import { z } from "zod";

import { SORT_OPTIONS } from "@/types/catalog";

/** Shared between the client forms and the route handlers that receive them. */

export const orderLineSchema = z.object({
  productId: z.string().min(1),
  slug: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
});

export const orderRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(6, "Please enter a contact number").max(40),
  address: z.string().trim().min(5, "Please enter a shipping address").max(400),
  city: z.string().trim().min(2, "Please enter a city").max(120),
  postalCode: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().min(2, "Please enter a country").max(120),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  items: z.array(orderLineSchema).min(1, "Your bag is empty"),
});

export type OrderRequestInput = z.infer<typeof orderRequestSchema>;


export const productQuerySchema = z.object({
  collection: z.string().trim().min(1).optional(),
  sort: z.enum(SORT_OPTIONS).optional(),
  newOnly: z.coerce.boolean().optional(),
});
