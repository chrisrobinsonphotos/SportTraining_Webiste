import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { packs } from "@/data/packs";

const SITE_URL = "https://sporttraining.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const tiendaRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/tienda`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...products.map((p) => ({
      url: `${SITE_URL}/tienda/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...packs.map((p) => ({
      url: `${SITE_URL}/tienda/pack/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...tiendaRoutes,
    {
      url: `${SITE_URL}/prueba`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/condiciones-de-venta`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/envios`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/devoluciones`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
