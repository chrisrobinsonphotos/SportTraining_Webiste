import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Envíos",
  description:
    "Condiciones de envío de la tienda online de Sport Training: zonas, gastos, plazos de entrega y recogida en el centro de Murcia.",
  alternates: {
    canonical: "/envios",
  },
};

export default function EnviosPage() {
  return (
    <LegalPageLayout
      eyebrow="Tienda online"
      title="Envíos"
      subtitle="Condiciones de envío y entrega de los pedidos realizados en la tienda online de sporttraining.es."
      lastUpdated="23 de julio de 2026"
    >
      <h2>1. Zona de envío</h2>
      <p>
        <span className="placeholder">
          [Confirmar zona de envío: España peninsular / solo Región de Murcia /
          otras zonas]
        </span>
      </p>

      <h2>2. Gastos de envío</h2>
      <p>
        Los gastos de envío, si los hay, se muestran de forma desglosada en el
        proceso de compra antes de confirmar el pedido.
      </p>
      <p>
        <span className="placeholder">
          [Confirmar tarifa de envío y, si aplica, umbral de envío gratuito —
          p. ej. "envío gratuito a partir de X €"]
        </span>
      </p>

      <h2>3. Plazos de entrega</h2>
      <p>
        <span className="placeholder">
          [Confirmar plazo estimado de entrega — p. ej. "48–72 h laborables
          desde la confirmación del pedido"]
        </span>
      </p>
      <p>
        Los plazos son estimados y pueden verse afectados por causas ajenas a
        Sport Training (transportista, festivos, causa mayor). Si un pedido se
        retrasa de forma significativa, se informará al cliente por correo
        electrónico.
      </p>

      <h2>4. Recogida en el centro</h2>
      <p>
        <span className="placeholder">
          [Confirmar si se ofrece recogida sin coste en el centro — C. Cisne,
          3, 30009 Murcia — y en qué horario]
        </span>
      </p>

      <h2>5. Incidencias en la entrega</h2>
      <p>
        Si el pedido llega dañado o no llega en el plazo indicado, escribe a{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a>{" "}
        indicando el número de pedido. Las incidencias de transporte las
        gestiona Sport Training directamente con el transportista; el cliente
        no tiene que reclamar al transportista por su cuenta.
      </p>
    </LegalPageLayout>
  );
}
