"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useCartHydrated } from "@/hooks/useCartHydrated";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/format";
import { deliveryFor } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * `span` is the field's width on a 12-column grid. A postal code does not
 * deserve the same room as a street address, and giving each input a width
 * that matches its content makes the form far quicker to scan.
 */
const fields = [
  { name: "firstName", label: "First name", type: "text", required: true, span: "col-span-6" },
  { name: "lastName", label: "Last name", type: "text", required: true, span: "col-span-6" },
  { name: "email", label: "Email", type: "email", required: true, span: "col-span-12 sm:col-span-7" },
  { name: "phone", label: "Phone", type: "tel", required: true, span: "col-span-12 sm:col-span-5" },
  { name: "address", label: "Address", type: "text", required: true, span: "col-span-12" },
  { name: "city", label: "City", type: "text", required: true, span: "col-span-7 sm:col-span-5" },
  { name: "postalCode", label: "Postal code", type: "text", required: false, span: "col-span-5 sm:col-span-3" },
  { name: "country", label: "Country", type: "text", required: true, span: "col-span-12 sm:col-span-4" },
] as const;

const inputClass =
  "w-full h-11 rounded-md border border-hairline bg-surface px-4 text-body text-foreground " +
  "placeholder:text-subtle-foreground outline-hidden focus:border-accent focus:ring-2 focus:ring-accent/25 transition-colors";

export const CheckoutView = () => {
  const router = useRouter();
  const { toast } = useToast();
  const hydrated = useCartHydrated();
  const { items, getSubtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    notes: "",
  });

  const subtotal = getSubtotal();
  const delivery = deliveryFor(subtotal);
  const total = subtotal + delivery;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          notes: formData.notes,
          items: items.map((item) => ({
            productId: item.product.id,
            slug: item.product.slug,
            quantity: item.quantity,
          })),
        }),
      });

      const body = (await response.json()) as {
        reference?: string;
        error?: string;
      };

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "We could not submit that",
          description: body.error ?? "Please check your details and try again.",
        });
        return;
      }

      toast({
        title: "Order request submitted",
        description: `Reference ${body.reference}. We’ll be in touch shortly to complete your order.`,
      });

      clearCart();
      router.push("/");
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "We could not reach the shop. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Same reason as the bag: wait for the persisted cart before deciding
  // whether there is anything to check out.
  if (!hydrated) {
    return (
      <section className="band-surface py-14 md:py-20">
        <div className="container-page">
          <h1 className="text-heading-lg">Check out.</h1>
          <p className="sr-only">Loading your order…</p>
          <div className="mt-10 grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2 grid grid-cols-12 gap-x-3 sm:gap-x-4 gap-y-5" aria-hidden>
              {["col-span-6", "col-span-6", "col-span-12", "col-span-12", "col-span-7", "col-span-5"].map(
                (span, index) => (
                  <div key={index} className={span}>
                    <div className="h-4 w-24 rounded-md bg-surface-sunk animate-pulse" />
                    <div className="mt-2 h-11 rounded-md bg-surface-sunk animate-pulse" />
                  </div>
                ),
              )}
            </div>
            <div aria-hidden className="h-72 rounded-3xl bg-surface-sunk animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="band-surface py-28 md:py-40">
        <div className="container-content text-center">
          <h1 className="text-heading-lg font-semibold text-foreground">
            Nothing to check out.
          </h1>
          <p className="mt-5 text-body text-muted-foreground">
            Add a watch to your bag first.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/products">Shop all watches</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="band-surface py-14 md:py-20">
      <div className="container-page">
        <h1 className="text-heading-lg font-semibold text-foreground">
          Check out.
        </h1>

        {/* Online payment is not live — say so plainly, once, up top. */}
        <div className="mt-8 flex gap-3 rounded-3xl bg-background p-5 md:p-6">
          <AlertCircle className="w-5 h-5 shrink-0 text-accent" />
          <div>
            <p className="text-body font-semibold text-foreground">
              Online payment isn’t live yet.
            </p>
            <p className="mt-1 text-body-sm text-muted-foreground max-w-[60ch]">
              Send your order request below and we’ll confirm stock, then arrange
              payment and delivery with you directly.
            </p>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <h2 className="text-heading-sm font-semibold text-foreground">
              Your details
            </h2>

            <div className="mt-6 grid grid-cols-12 gap-x-3 sm:gap-x-4 gap-y-5">
              {fields.map((field) => (
                <div key={field.name} className={field.span}>
                  <label
                    htmlFor={field.name}
                    className="block text-body-sm text-muted-foreground mb-1.5"
                  >
                    {field.label}
                    {field.required && <span className="text-subtle-foreground"> *</span>}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              ))}

              <div className="col-span-12">
                <label
                  htmlFor="notes"
                  className="block text-body-sm text-muted-foreground mb-1.5"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Sizing, engraving, or anything else we should know."
                  className={cn(inputClass, "h-auto py-3 resize-y")}
                />
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Submit order request"}
              </Button>
            </div>
          </form>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 rounded-3xl bg-background p-6 md:p-7">
            <h2 className="text-subheading font-semibold text-foreground">
              Order summary
            </h2>

            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <div className="relative w-14 h-16 shrink-0 overflow-hidden rounded-md bg-surface">
                    <Media
                      src={item.product.images[0]}
                      alt={item.product.name}
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-semibold text-foreground line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-body-sm text-subtle-foreground numerals">
                      {item.quantity} × {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <p className="text-body-sm text-foreground numerals">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="hairline my-5" />

            <dl className="space-y-3">
              <div className="flex justify-between text-body-sm">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="text-foreground numerals">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-body-sm">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="text-foreground numerals">
                  {delivery === 0 ? "Free" : formatPrice(delivery)}
                </dd>
              </div>
            </dl>

            <div className="hairline my-5" />

            <div className="flex justify-between items-baseline">
              <span className="text-body font-semibold text-foreground">Total</span>
              <span className="text-heading-sm font-semibold text-foreground numerals">
                {formatPrice(total)}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
