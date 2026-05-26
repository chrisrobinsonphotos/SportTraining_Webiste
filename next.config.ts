import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    qualities: [75, 80, 85, 90],
  },
  async redirects() {
    return [
      // Canonical: always serve non-www. Belt-and-suspenders on top of Vercel's
      // domain redirect setting (Vercel → Project → Domains → www → Redirect to non-www).
      // Without this, if Vercel is misconfigured, Google sees www vs non-www conflict.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sporttraining.es" }],
        destination: "https://sporttraining.es/:path*",
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;
