import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y protección de datos de Sport Training Murcia, conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <LegalPageLayout
      eyebrow="Protección de datos"
      title="Política de Privacidad"
      subtitle="Esta política describe cómo Sport Training trata los datos personales que recopila a través del sitio web, mensajería y correo electrónico, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD)."
      lastUpdated="13 de mayo de 2026"
    >
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Denominación social:</strong> St Levante Group, SL
        </li>
        <li>
          <strong>Nombre comercial:</strong> Sport Training
        </li>
        <li>
          <strong>CIF:</strong> B26906602
        </li>
        <li>
          <strong>Domicilio:</strong> Calle Cisne, 3, 30009 Murcia, España
        </li>
        <li>
          <strong>Email de contacto:</strong>{" "}
          <a href="mailto:info@sporttraining.es">info@sporttraining.es</a>
        </li>
        <li>
          <strong>Teléfono:</strong>{" "}
          <a href="tel:+34622443495">+34 622 443 495</a>
        </li>
        <li>
          <strong>Sitio web:</strong>{" "}
          <a href="https://sporttraining.es">sporttraining.es</a>
        </li>
      </ul>

      <h2>2. Datos que recopilamos y cómo los obtenemos</h2>
      <p>
        Recopilamos datos personales a través de los siguientes canales:
      </p>

      <h3>Formulario de contacto y sitio web</h3>
      <ul>
        <li>Nombre, correo electrónico, teléfono y mensaje.</li>
        <li>
          Datos de navegación: dirección IP, tipo de navegador, páginas visitadas
          y tiempo de permanencia, recogidos mediante cookies conforme a nuestra{" "}
          <a href="/cookies">Política de Cookies</a>.
        </li>
      </ul>

      <h3>Suscripción a la newsletter (correo electrónico)</h3>
      <ul>
        <li>Nombre y correo electrónico.</li>
        <li>Datos de interacción con los envíos (aperturas, clics).</li>
        <li>Segmento de suscripción (tipo de socio, modalidad de interés).</li>
      </ul>
      <p>
        Las comunicaciones por correo se gestionan a través de{" "}
        <strong>MailerLite</strong>. Puede consultar su política de privacidad en{" "}
        <a
          href="https://www.mailerlite.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          mailerlite.com
        </a>
        .
      </p>

      <h3>Instagram Direct (bot de mensajería)</h3>
      <ul>
        <li>Nombre de usuario de Instagram y nombre público.</li>
        <li>Contenido de los mensajes que nos envíe.</li>
        <li>Identificador único de usuario de Instagram.</li>
        <li>Historial de conversación dentro de la plataforma ManyChat.</li>
      </ul>
      <p>
        Esta interacción está sujeta también a la{" "}
        <a
          href="https://privacycenter.instagram.com/policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidad de Meta/Instagram
        </a>
        .
      </p>

      <h3>WhatsApp Business</h3>
      <ul>
        <li>Número de teléfono móvil y nombre de perfil de WhatsApp.</li>
        <li>Contenido de los mensajes intercambiados.</li>
        <li>Historial de conversación dentro de ManyChat (si aplica).</li>
      </ul>
      <p>
        Esta interacción está sujeta también a la{" "}
        <a
          href="https://www.whatsapp.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidad de WhatsApp
        </a>{" "}
        (Meta Platforms).
      </p>

      <h2>3. Finalidad del tratamiento</h2>
      <p>Tratamos los datos personales con las siguientes finalidades:</p>
      <ul>
        <li>Atender consultas y solicitudes recibidas a través del sitio web o mensajería.</li>
        <li>
          Enviar comunicaciones comerciales y newsletter, siempre que el usuario
          haya prestado su consentimiento expreso.
        </li>
        <li>Gestionar la relación como socio o cliente del centro.</li>
        <li>
          Mejorar la experiencia de uso del sitio web mediante el análisis de
          datos de navegación.
        </li>
        <li>Cumplir con las obligaciones legales aplicables.</li>
      </ul>

      <h2>4. Base legal del tratamiento</h2>
      <ul>
        <li>
          <strong>Consentimiento del interesado</strong> (Art. 6.1.a RGPD) para
          el envío de comunicaciones comerciales, newsletter, y comunicaciones vía
          WhatsApp o Instagram (opt-in).
        </li>
        <li>
          <strong>Ejecución de un contrato o medidas precontractuales</strong>{" "}
          (Art. 6.1.b RGPD) cuando el usuario solicita información sobre servicios
          o formaliza una suscripción.
        </li>
        <li>
          <strong>Interés legítimo</strong> (Art. 6.1.f RGPD) para responder
          consultas y el análisis estadístico del uso del sitio web.
        </li>
        <li>
          <strong>Obligación legal</strong> (Art. 6.1.c RGPD) para el
          cumplimiento de obligaciones fiscales y contables.
        </li>
      </ul>
      <p>
        Cuando el tratamiento se base en su consentimiento, tiene derecho a
        retirarlo en cualquier momento sin que ello afecte a la licitud del
        tratamiento anterior a su retirada.
      </p>

      <h2>5. Plazo de conservación</h2>
      <ul>
        <li>
          <strong>Datos de contacto y consultas:</strong> hasta 2 años desde la
          última interacción.
        </li>
        <li>
          <strong>Suscripción a comunicaciones:</strong> mientras la suscripción
          esté activa. Al darse de baja, los datos se eliminan o anonimizan en un
          plazo máximo de 30 días.
        </li>
        <li>
          <strong>Datos de facturación y contratos:</strong> 5 años según la
          legislación fiscal española.
        </li>
        <li>
          <strong>Conversaciones de Instagram/WhatsApp:</strong> hasta 1 año
          desde la última interacción, salvo que exista una relación contractual
          vigente.
        </li>
      </ul>

      <h2>6. Destinatarios y encargados del tratamiento</h2>
      <p>
        No vendemos ni cedemos sus datos a terceros. Para prestar nuestros
        servicios contamos con los siguientes encargados del tratamiento, que
        acceden a los datos bajo nuestras instrucciones y con las garantías
        contractuales exigidas por el RGPD:
      </p>
      <ul>
        <li>
          <strong>ManyChat Inc.</strong> — plataforma de automatización de
          mensajería (Instagram Direct y WhatsApp). Con sede en EE.UU.;
          tratamiento sujeto a cláusulas contractuales estándar de la UE.
        </li>
        <li>
          <strong>Meta Platforms Ireland Ltd.</strong> — infraestructura de
          Instagram y WhatsApp Business. Con sede en Irlanda (UE).
        </li>
        <li>
          <strong>MailerLite UAB</strong> — plataforma de email marketing. Con
          sede en Lituania (UE).
        </li>
        <li>
          <strong>Proveedor de alojamiento web</strong> — infraestructura de
          sporttraining.es.
        </li>
      </ul>
      <p>
        Cuando el encargado esté ubicado fuera del Espacio Económico Europeo, la
        transferencia se realiza con las salvaguardas adecuadas (cláusulas
        contractuales tipo aprobadas por la Comisión Europea u otro mecanismo
        equivalente).
      </p>

      <h2>7. Derechos del interesado</h2>
      <p>El usuario tiene derecho a:</p>
      <ul>
        <li>
          <strong>Acceso:</strong> conocer qué datos personales tratamos.
        </li>
        <li>
          <strong>Rectificación:</strong> solicitar la corrección de datos
          inexactos o incompletos.
        </li>
        <li>
          <strong>Supresión:</strong> solicitar la eliminación de los datos
          cuando ya no sean necesarios o retire su consentimiento.
        </li>
        <li>
          <strong>Limitación:</strong> solicitar la limitación del tratamiento en
          determinados supuestos.
        </li>
        <li>
          <strong>Portabilidad:</strong> recibir los datos en un formato
          estructurado y de uso común.
        </li>
        <li>
          <strong>Oposición:</strong> oponerse al tratamiento basado en interés
          legítimo o con fines de marketing directo.
        </li>
        <li>
          <strong>Retirar el consentimiento</strong> en cualquier momento, sin
          coste y sin necesidad de justificación.
        </li>
      </ul>
      <p>
        Para ejercer estos derechos puede contactar con nosotros en{" "}
        <a href="mailto:info@sporttraining.es">info@sporttraining.es</a> o por
        escrito a Calle Cisne, 3, 30009 Murcia, adjuntando copia de un documento
        identificativo. Responderemos en el plazo máximo de un mes.
      </p>

      <h2>8. Reclamaciones ante la autoridad de control</h2>
      <p>
        Si considera que el tratamiento de sus datos personales infringe la
        normativa aplicable, tiene derecho a presentar una reclamación ante la
        Agencia Española de Protección de Datos (AEPD). Más información en{" "}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          aepd.es
        </a>
        .
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Sport Training adopta las medidas técnicas y organizativas necesarias
        para garantizar la seguridad de los datos personales y evitar su
        alteración, pérdida, tratamiento o acceso no autorizado.
      </p>

      <h2>10. Cookies</h2>
      <p>
        Nuestro sitio web utiliza cookies propias y de terceros para analizar el
        uso del sitio y mejorar la experiencia del usuario. Consulte nuestra{" "}
        <a href="/cookies">Política de Cookies</a> para más información y para
        gestionar sus preferencias.
      </p>

      <h2>11. Modificaciones</h2>
      <p>
        Esta política puede modificarse para adaptarse a cambios legislativos o a
        la propia evolución del sitio web. Cuando se produzcan cambios
        significativos, se lo comunicaremos por los canales disponibles. Se
        recomienda consultarla periódicamente.
      </p>
    </LegalPageLayout>
  );
}
