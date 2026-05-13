import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sport Training Murcia",
    short_name: "Sport Training",
    description:
      "Centro integral de entrenamiento de alto rendimiento en Murcia. HYROX, Funcional, CrossTraining y Entrenamiento Adaptado desde 2007.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["fitness", "health", "sports"],
    lang: "es",
  };
}
