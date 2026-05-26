import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description:
    "Aviso legal de Sport Training. Información sobre el titular de la web, datos de contacto y condiciones de uso.",
  alternates: {
    canonical: "/legal",
  },
};

export default function AvisoLegalPage() {
  return (
    <LegalPageLayout
      eyebrow="Información legal"
      title="Aviso Legal"
      subtitle="En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se facilita la siguiente información sobre el titular de este sitio web."
      lastUpdated="7 de mayo de 2026"
    >
      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento del artículo 10 de la LSSI-CE, se informa al usuario de
        los siguientes datos del titular del sitio web:
      </p>
      <ul>
        <li>
          <strong>Razón social:</strong>{" "}
          <span className="placeholder">[Razón Social Completa]</span>
        </li>
        <li>
          <strong>Nombre comercial:</strong> Sport Training
        </li>
        <li>
          <strong>NIF / CIF:</strong>{" "}
          <span className="placeholder">[NIF/CIF]</span>
        </li>
        <li>
          <strong>Domicilio social:</strong> C. Cisne, 3, 30009 Murcia, España
        </li>
        <li>
          <strong>Teléfono:</strong>{" "}
          <a href="tel:+34622443495">+34 622 443 495</a>
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <span className="placeholder">[email de contacto]</span>
        </li>
        <li>
          <strong>Inscripción registral:</strong>{" "}
          <span className="placeholder">
            [Datos de inscripción en el Registro Mercantil, si aplica]
          </span>
        </li>
        <li>
          <strong>Sitio web:</strong>{" "}
          <a href="https://sporttraining.es">https://sporttraining.es</a>
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente aviso legal regula el uso del sitio web{" "}
        <a href="https://sporttraining.es">sporttraining.es</a> (en adelante, el
        Sitio Web), del que es titular Sport Training. El acceso al Sitio Web
        implica la aceptación, sin reservas, de las presentes condiciones por
        parte del usuario.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El usuario se compromete a hacer un uso adecuado de los contenidos y
        servicios que Sport Training ofrece a través del Sitio Web y a no
        emplearlos para incurrir en actividades ilícitas o contrarias a la buena
        fe y al ordenamiento legal.
      </p>
      <p>
        Sport Training se reserva el derecho de retirar del Sitio Web,
        unilateralmente y sin previo aviso, cualquier contenido o información
        que considere que pueda incumplir lo dispuesto en este aviso legal.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del Sitio Web, incluyendo a título enunciativo
        textos, fotografías, gráficos, imágenes, iconos, tecnología, software,
        enlaces y demás contenidos audiovisuales o sonoros, así como su diseño
        gráfico y códigos fuente, son propiedad intelectual de Sport Training o
        de terceros, sin que puedan entenderse cedidos al usuario ninguno de los
        derechos de explotación reconocidos por la normativa vigente en materia
        de propiedad intelectual sobre los mismos.
      </p>
      <p>
        Las marcas, nombres comerciales o signos distintivos son titularidad de
        Sport Training o de terceros, sin que pueda entenderse que el acceso al
        Sitio Web atribuya ningún derecho sobre las citadas marcas, nombres
        comerciales o signos distintivos.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        Sport Training no se hace responsable, en ningún caso, de los daños y
        perjuicios de cualquier naturaleza que pudieran ocasionar a título
        enunciativo: errores u omisiones en los contenidos, falta de
        disponibilidad del Sitio Web o la transmisión de virus o programas
        maliciosos en los contenidos, a pesar de haber adoptado todas las
        medidas tecnológicas necesarias para evitarlo.
      </p>

      <h2>6. Enlaces a sitios de terceros</h2>
      <p>
        El Sitio Web puede contener enlaces a otros sitios web. Sport Training
        no se responsabiliza del contenido, exactitud o disponibilidad de estos
        sitios externos. La presencia de enlaces no implica relación,
        recomendación ni supervisión por parte de Sport Training.
      </p>

      <h2>7. Modificación del aviso legal</h2>
      <p>
        Sport Training se reserva el derecho de modificar el presente aviso
        legal en cualquier momento. Las modificaciones serán efectivas desde su
        publicación en el Sitio Web.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para la
        resolución de cualquier controversia, las partes se someten, con
        renuncia expresa a cualquier otro fuero que pudiera corresponderles, a
        los Juzgados y Tribunales de Murcia.
      </p>
    </LegalPageLayout>
  );
}
