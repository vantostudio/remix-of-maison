const LOCAL_SITE_URL = "http://localhost:3000";

interface SiteUrlEnvironment {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
}

const addProtocol = (value: string) => {
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(value)) return value;

  const protocol = /^(localhost|127\.0\.0\.1)(:|\/|$)/i.test(value)
    ? "http"
    : "https";

  return `${protocol}://${value}`;
};

/** Resolve a safe absolute origin for metadata, robots, and sitemap URLs. */
export function getSiteUrl(
  environment?: SiteUrlEnvironment,
): URL {
  const env = environment ?? process.env;
  const candidates = [
    env.NEXT_PUBLIC_SITE_URL,
    env.VERCEL_PROJECT_PRODUCTION_URL,
    env.VERCEL_URL,
    LOCAL_SITE_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    try {
      const url = new URL(addProtocol(value));
      if (url.protocol !== "http:" && url.protocol !== "https:") continue;
      return new URL(url.origin);
    } catch {
      // Try the next source rather than breaking the entire production build.
    }
  }

  return new URL(LOCAL_SITE_URL);
}
