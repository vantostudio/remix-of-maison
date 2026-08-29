import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Legacy singular product route from the Vite/react-router build.
      { source: "/product/:slug", destination: "/products/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
