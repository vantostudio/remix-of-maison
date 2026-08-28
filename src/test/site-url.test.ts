import { describe, expect, it } from "vitest";

import { getSiteUrl } from "@/lib/site-url";

describe("getSiteUrl", () => {
  it("ignores an empty configured URL and uses Vercel's production domain", () => {
    const url = getSiteUrl({
      NEXT_PUBLIC_SITE_URL: "",
      VERCEL_PROJECT_PRODUCTION_URL: "kairos-watches.vercel.app",
    });

    expect(url.toString()).toBe("https://kairos-watches.vercel.app/");
  });

  it("falls through malformed values and normalizes an explicit origin", () => {
    const url = getSiteUrl({
      NEXT_PUBLIC_SITE_URL: "://not-a-url",
      VERCEL_URL: "preview-kairos.vercel.app",
    });

    expect(url.toString()).toBe("https://preview-kairos.vercel.app/");
  });

  it("uses localhost when no deployment URL is available", () => {
    expect(getSiteUrl({}).toString()).toBe("http://localhost:3000/");
  });
});
