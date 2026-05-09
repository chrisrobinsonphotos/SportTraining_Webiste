import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin"],
      },
    ],
    sitemap: "https://sporttraining.es/sitemap.xml",
    host: "https://sporttraining.es",
  };
}
