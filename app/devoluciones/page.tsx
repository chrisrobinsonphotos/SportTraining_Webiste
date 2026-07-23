import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Devoluciones",
  description:
    "Política de devoluciones y derecho de desistimiento de la tienda online de Sport Training: plazos, procedimiento, excepciones y reembolsos.",
  alternates: {
    canonical: "/devoluciones",
  },
};

export default function DevolucionesPage() {
  return (
    <LegalPageLayout
      eyebrow="Tienda online"
      title="Devoluciones"
      subtitle="Derecho de desistimiento y política de devoluciones de la tienda online de sporttraining.es, conforme al Real Decreto Legislativo 1/2007."
      lastUpdated="23 de julio de 2026"
    >
      <h2>1. Derecho de desistimiento</h2>
      <p>
        El cliente tiene derecho a desistir de su compra, sin necesidad de
        justificación, en un plazo de <strong>14 días naturales</strong> desde
        la recepción del pedido.
      </p>
      <p>
        Para ejercerlo, basta con comunicarlo dentro del plazo por correo
        electrónico a{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a>,
        indicando: número de pedido, nombre del cliente y producto(s) que
        desea devolver.
      </p>

      <h2>2. Excepción: productos precintados</h2>
      <p>
        Por razones de protección de la salud y de higiene, el derecho de
        desistimiento <strong>no aplica a productos precintados que hayan
        sido desprecintados tras la entrega</strong> (artículo 103.e del Real
        Decreto Legislativo 1/2007). Esto incluye la suplementación
        deportiva cuyo precinto o envase original haya sido abierto.
      </p>
      <p>
        Los productos deben devolverse sin abrir, con su precinto intacto y en
        su embalaje original.
      </p>

      <h2>3. Cómo devolver el producto</h2>
      <p>Una vez comunicado el desistimiento:</p>
      <ul>
        <li>
          El cliente puede entregar el producto en el centro (C. Cisne, 3,
          30009 Murcia) o enviarlo por el medio que prefiera.
        </li>
        <li>
          El plazo para devolver el producto es de 14 días naturales desde la
          comunicación del desistimiento.
        </li>
        <li>
          <span className="placeholder">
            [Confirmar: los gastos de devolución corren a cargo del cliente,
            salvo producto defectuoso o error en el envío]
          </span>
        </li>
      </ul>

      <h2>4. Reembolso</h2>
      <p>
        El reembolso se realizará por el mismo medio de pago utilizado en la
        compra, en un plazo máximo de 14 días naturales desde la recepción del
        producto devuelto (o desde la prueba de su envío), incluyendo los
        gastos de envío iniciales si la devolución es total.
      </p>

      <h2>5. Producto defectuoso o pedido erróneo</h2>
      <p>
        Si el producto llega dañado, en mal estado o no se corresponde con lo
        pedido, el cliente debe comunicarlo a{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a>{" "}
        (idealmente con fotografía) en el momento de detectarlo. En estos
        casos, la reposición o el reembolso íntegro —incluidos todos los
        gastos— corre a cargo de Sport Training. Aplica la garantía legal de
        conformidad.
      </p>

      <h2>6. Atención al cliente</h2>
      <p>
        Para cualquier duda sobre una devolución:{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a> ·{" "}
        <a href="tel:+34622443495">+34 622 443 495</a>.
      </p>
    </LegalPageLayout>
  );
}
