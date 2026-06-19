import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    qualities: [75, 80, 85, 90],
  },
  async redirects() {
    return [
      // ── Canonical: www → non-www ──────────────────────────────────────────────
      // Belt-and-suspenders on top of Vercel's domain redirect setting.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sporttraining.es" }],
        destination: "https://sporttraining.es/:path*",
        permanent: true, // 301
      },

      // ── Dead routes → homepage ────────────────────────────────────────────────
      // These pages were linked in an earlier version of the site but were never
      // built (work paused). Redirecting prevents 404s for any URLs Google may
      // have already crawled. Using 302 (temporary) so we can build the real pages
      // later without the redirect being cached permanently by Google.

      // Training disciplines
      { source: "/entrenamientos", destination: "/", permanent: false },
      { source: "/entrenamientos/:path*", destination: "/", permanent: false },

      // Gym info pages
      { source: "/gym", destination: "/", permanent: false },
      { source: "/gym/:path*", destination: "/", permanent: false },

      // Membership modalities
      { source: "/modalidades", destination: "/", permanent: false },
      { source: "/modalidades/:path*", destination: "/", permanent: false },

      // Shop
      { source: "/tienda", destination: "/contacto", permanent: false },

      // Community & schedule
      { source: "/comunidad", destination: "/", permanent: false },
      { source: "/horario", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
