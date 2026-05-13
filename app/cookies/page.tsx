import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies de Sport Training Murcia. Información sobre las cookies que utilizamos, su finalidad y cómo gestionarlas.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Cookies"
      title="Política de Cookies"
      subtitle="Esta política explica qué cookies utilizamos en sporttraining.es, con qué finalidad y cómo puedes gestionarlas. Cumple con el artículo 22.2 de la LSSI-CE y las directrices de la AEPD sobre el uso de cookies."
      lastUpdated="7 de mayo de 2026"
    >
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se descargan en el
        dispositivo del usuario al acceder a determinadas páginas web. Permiten
        a la web recordar información sobre la visita, como el idioma
        preferido, la sesión iniciada o las páginas visitadas, mejorando la
        experiencia de navegación.
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <p>
        En sporttraining.es utilizamos las cookies estrictamente necesarias
        para el funcionamiento del sitio, así como cookies de terceros para
        análisis y funcionalidad.
      </p>

      <h3>2.1. Cookies técnicas (necesarias)</h3>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cookies de sesión Next.js</td>
            <td>
              Garantizar el funcionamiento básico del sitio y la navegación
              entre páginas.
            </td>
            <td>Sesión</td>
          </tr>
        </tbody>
      </table>

      <h3>2.2. Cookies de terceros</h3>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mailchimp (Intuit Inc.)</td>
            <td>
              Gestión de la newsletter y seguimiento de aperturas y clics en
              comunicaciones.
            </td>
            <td>Hasta 2 años</td>
          </tr>
          <tr>
            <td>
              <span className="placeholder">[Google Analytics — pendiente]</span>
            </td>
            <td>
              <span className="placeholder">
                [Análisis de tráfico y comportamiento agregado, si se instala]
              </span>
            </td>
            <td>
              <span className="placeholder">[Hasta 2 años]</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Nota:</strong> esta tabla refleja el inventario actual.
        Cualquier nueva herramienta (analítica, píxel publicitario, mapa de
        calor, etc.) será añadida antes de su activación, junto con la opción
        de consentimiento correspondiente.
      </p>

      <h2>3. Consentimiento</h2>
      <p>
        Al acceder por primera vez al sitio web, mostramos un banner
        informativo que permite aceptar, rechazar o configurar las cookies no
        esenciales. Las cookies técnicas no requieren consentimiento, ya que
        son necesarias para el funcionamiento del sitio.
      </p>

      <h2>4. Cómo gestionar o eliminar cookies</h2>
      <p>
        Puedes configurar tu navegador para aceptar, rechazar o eliminar las
        cookies. A continuación, los enlaces a las instrucciones de los
        navegadores más utilizados:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2>5. Cambios en la política de cookies</h2>
      <p>
        Esta política puede actualizarse cuando se introduzcan nuevas cookies o
        cambie la normativa aplicable. Recomendamos revisarla periódicamente.
      </p>

      <h2>6. Más información</h2>
      <p>
        Para cualquier consulta sobre nuestra política de cookies, puedes
        contactar con nosotros en{" "}
        <span className="placeholder">[email de contacto]</span>.
      </p>
    </LegalPageLayout>
  );
}
