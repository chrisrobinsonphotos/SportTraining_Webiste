import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Condiciones de Venta",
  description:
    "Condiciones generales de venta de la tienda online de Sport Training: precios, proceso de compra, pago, envío, desistimiento y garantías.",
  alternates: {
    canonical: "/condiciones-de-venta",
  },
};

export default function CondicionesVentaPage() {
  return (
    <LegalPageLayout
      eyebrow="Tienda online"
      title="Condiciones de Venta"
      subtitle="Estas condiciones generales regulan la compra de productos a través de la tienda online de sporttraining.es, conforme a la Ley 34/2002 (LSSI-CE) y al Real Decreto Legislativo 1/2007 (Ley General para la Defensa de los Consumidores y Usuarios)."
      lastUpdated="23 de julio de 2026"
    >
      <h2>1. Identificación del vendedor</h2>
      <ul>
        <li>
          <strong>Razón social:</strong> St Levante Group, S.L.
        </li>
        <li>
          <strong>Nombre comercial:</strong> Sport Training
        </li>
        <li>
          <strong>CIF:</strong> B26906602
        </li>
        <li>
          <strong>Domicilio:</strong> C. Cisne, 3, 30009 Murcia, España
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href="mailto:info@sporttraining.es">info@sporttraining.es</a>
        </li>
        <li>
          <strong>Teléfono:</strong>{" "}
          <a href="tel:+34622443495">+34 622 443 495</a>
        </li>
      </ul>

      <h2>2. Ámbito y aceptación</h2>
      <p>
        Las presentes condiciones se aplican a todas las compras realizadas en
        la tienda online de sporttraining.es (suplementación deportiva y
        productos relacionados). Al completar un pedido, el cliente declara
        haber leído y aceptado estas condiciones sin reservas.
      </p>
      <p>
        La tienda está dirigida a consumidores finales mayores de 18 años con
        residencia en España.
      </p>

      <h2>3. Productos y precios</h2>
      <p>
        Los precios se muestran en euros (€) e incluyen el IVA aplicable. Los
        gastos de envío, si los hay, se muestran de forma desglosada antes de
        confirmar el pedido. Sport Training se reserva el derecho de modificar
        los precios en cualquier momento; los cambios no afectarán a pedidos ya
        confirmados.
      </p>
      <p>
        Las imágenes de los productos son orientativas. En caso de error
        tipográfico manifiesto en el precio, Sport Training contactará con el
        cliente para ofrecerle la compra al precio correcto o la anulación sin
        coste.
      </p>

      <h2>4. Proceso de compra</h2>
      <p>
        El pedido se realiza añadiendo productos al carrito y completando el
        pago a través de la pasarela segura. Tras el pago, el cliente recibirá
        una confirmación por correo electrónico con el resumen del pedido. Si
        no la recibe, puede solicitarla en{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a>.
      </p>

      <h2>5. Pago</h2>
      <p>
        Los pagos se procesan mediante <strong>Stripe</strong>, pasarela de
        pago certificada PCI DSS. Sport Training no almacena en ningún momento
        los datos completos de la tarjeta del cliente. Medios de pago
        aceptados: tarjeta de crédito o débito y los métodos que Stripe ofrezca
        en el momento de la compra.
      </p>

      <h2>6. Envío y entrega</h2>
      <p>
        Las condiciones, plazos y gastos de envío se detallan en la página de{" "}
        <a href="/envios">Envíos</a>.
      </p>

      <h2>7. Derecho de desistimiento y devoluciones</h2>
      <p>
        El cliente dispone de un plazo de 14 días naturales desde la recepción
        del pedido para desistir de la compra, con las excepciones legales
        aplicables a productos precintados. El procedimiento completo se
        detalla en la página de{" "}
        <a href="/devoluciones">Devoluciones</a>.
      </p>

      <h2>8. Garantía</h2>
      <p>
        Todos los productos gozan de la garantía legal de conformidad prevista
        en el Real Decreto Legislativo 1/2007. En caso de producto defectuoso o
        no conforme (error en el pedido, envase dañado, producto en mal
        estado), el cliente debe comunicarlo a{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a> y
        Sport Training procederá a la reposición o al reembolso sin coste para
        el cliente.
      </p>

      <h2>9. Atención al cliente</h2>
      <p>
        Para cualquier consulta, incidencia o reclamación:{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a> ·{" "}
        <a href="tel:+34622443495">+34 622 443 495</a>. Las reclamaciones se
        responderán en el plazo máximo de un mes.
      </p>

      <h2>10. Resolución de litigios</h2>
      <p>
        En caso de controversia, el cliente puede acudir a la plataforma
        europea de resolución de litigios en línea:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>11. Ley aplicable y jurisdicción</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Para cualquier
        controversia serán competentes los juzgados y tribunales que
        correspondan conforme a la normativa de consumidores y usuarios.
      </p>
    </LegalPageLayout>
  );
}
