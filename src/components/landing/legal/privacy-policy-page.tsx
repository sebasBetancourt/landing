"use client";
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { APP_HOME_HREF, LEGAL_PATHS } from "@/shared/constants/legal-urls"
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { Globe } from "lucide-react";

export default function PrivacyPolicyPage({ dict, lang }: { dict: any; lang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = lang === "en" ? "es" : "en";
    if (!pathname) return;
    const newPath = pathname.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative min-h-screen bg-[var(--brand-navy)] text-[var(--brand-surface)]">
      {/* Subtle noise texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <main className="relative z-10">
        {/* Top bar */}
        <div className="border-b border-neutral-800/50">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
            <Link
              href={`/${lang}`}
              className="group inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>{dict.back}</span>
            </Link>
            <button
              onClick={toggleLanguage}
              className="group flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white/40 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5 text-(--brand-sage) transition-transform duration-300 group-hover:rotate-12" />
              <div className="flex items-center gap-1 uppercase tracking-widest">
                <span className={cn("transition-colors", lang === "en" ? "text-white" : "")}>EN</span>
                <span className="text-white/20 font-normal">/</span>
                <span className={cn("transition-colors", lang === "es" ? "text-white" : "")}>ES</span>
              </div>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-16 sm:pt-20 pb-10">
          <p className="text-xs tracking-widest uppercase text-neutral-600 mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            {dict.privacy.title}
          </h1>
          <p className="mt-3 text-sm text-neutral-600">
            {dict.lastUpdated}: {new Date().toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div className="h-px bg-neutral-800/50" />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12 space-y-12">
          {lang === "es" ? <PrivacyEs /> : <PrivacyEn />}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800/50">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-700">
              &copy; {new Date().getFullYear()} Adeptos LLC. {dict.back === "Back" ? "All rights reserved." : "Todos los derechos reservados."}
            </p>
            <div className="flex items-center gap-5 text-xs text-neutral-600">
              <Link href={`/${lang}${LEGAL_PATHS.termsOfService}`} className="hover:text-neutral-400 transition-colors">
                {dict.terms.title}
              </Link>
              <a href="https://adeptos.ai" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
                adeptos.ai
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-medium text-white mb-4">{title}</h2>
      <div className="text-[15px] text-neutral-400 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5 pl-4">
      {items.map((item) => (
        <li key={item} className="relative pl-3 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-neutral-700">
          {item}
        </li>
      ))}
    </ul>
  )
}

function DefinitionList({ items }: { items: { term: string; desc: string }[] }) {
  return (
    <dl className="mt-3 space-y-3 pl-2">
      {items.map((item) => (
        <div key={item.term} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-neutral-700">
          <dt className="inline font-medium text-neutral-300">{item.term}: </dt>
          <dd className="inline">{item.desc}</dd>
        </div>
      ))}
    </dl>
  )
}

function PrivacyEn() {
  return (
    <>
      <Section title="1. Introduction">
        <p>Adeptos (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our artificial intelligence agent management service.</p>
      </Section>
      <Section title="2. Information We Collect">
        <h3 className="text-base font-medium text-neutral-200 mt-6 mb-2">2.1. Information You Provide to Us</h3>
        <p>We collect information that you provide directly to us, including:</p>
        <List items={[
          "Account information (name, email address, password)",
          "Profile information (profile picture, contact information)",
          "Billing and payment information",
          "Content you create or upload to the platform",
          "Communications with our support team",
        ]} />
        <h3 className="text-base font-medium text-neutral-200 mt-8 mb-2">2.2. Automatically Collected Information</h3>
        <p>When you use our Service, we automatically collect certain information, including:</p>
        <List items={[
          "Device information (device type, operating system, unique identifiers)",
          "Usage information (pages visited, time spent, features used)",
          "Log information (IP addresses, browser type, referring pages)",
          "Cookies and similar technologies",
        ]} />
        <h3 className="text-base font-medium text-neutral-200 mt-8 mb-2">2.3. Third-Party Information</h3>
        <p>We may receive information about you from third-party service providers, such as authentication services or integrated payment platforms.</p>
      </Section>
      <Section title="3. How We Use Your Information">
        <p>We use the collected information to:</p>
        <List items={[
          "Provide, maintain, and improve our Service",
          "Process transactions and send related notifications",
          "Send technical communications, updates, and security alerts",
          "Respond to your comments, questions, and support requests",
          "Personalize and improve your experience on the platform",
          "Detect, prevent, and address technical issues and fraudulent activities",
          "Comply with legal obligations and enforce our terms",
        ]} />
      </Section>
      <Section title="4. Sharing Your Information">
        <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
        <DefinitionList items={[
          { term: "Service Providers", desc: "With third parties who perform services on our behalf (hosting, analytics, payment processing)" },
          { term: "Legal Compliance", desc: "When required by law or to protect our rights" },
          { term: "Business Transfers", desc: "In case of merger, acquisition, or sale of assets" },
          { term: "With Your Consent", desc: "When you explicitly authorize us to share information" },
        ]} />
      </Section>
      <Section title="5. Information Security">
        <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
      </Section>
      <Section title="6. Data Retention">
        <p>We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless the law requires or permits a longer retention period. When we delete information, we do so securely.</p>
      </Section>
      <Section title="7. Your Rights">
        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
        <DefinitionList items={[
          { term: "Access", desc: "Request a copy of the personal information we have about you" },
          { term: "Rectification", desc: "Correct inaccurate or incomplete information" },
          { term: "Deletion", desc: "Request deletion of your personal information" },
          { term: "Objection", desc: "Object to the processing of your personal information" },
          { term: "Portability", desc: "Receive your information in a structured and commonly used format" },
          { term: "Withdraw Consent", desc: "Withdraw your consent when processing is based on consent" },
        ]} />
        <p className="mt-4">To exercise these rights, you can contact us through the support channels available on the platform.</p>
      </Section>
      <Section title="8. Cookies and Tracking Technologies">
        <p>We use cookies and similar technologies to collect information and improve your experience. You can configure your browser to reject cookies, but this may affect the functionality of the Service.</p>
      </Section>
      <Section title="9. Third-Party Links">
        <p>Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We recommend reviewing the privacy policies of any site you visit.</p>
      </Section>
      <Section title="10. Children's Privacy">
        <p>Our Service is not directed to children under 18 years of age. We do not knowingly collect personal information from children. If we discover that we have collected information from a child without parental consent, we will take steps to delete that information.</p>
      </Section>
      <Section title="11. International Transfers">
        <p>Your information may be transferred and processed in countries other than your own. By using our Service, you consent to the transfer of your information to these countries.</p>
      </Section>
      <Section title="12. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Policy on this page and updating the &quot;Last updated&quot; date. It is recommended that you review this Policy periodically.</p>
      </Section>
      <Section title="13. Contact">
        <p>If you have questions or concerns about this Privacy Policy or our privacy practices, you can contact us through the support channels available on the platform.</p>
      </Section>
    </>
  )
}

function PrivacyEs() {
  return (
    <>
      <Section title="1. Introducción">
        <p>Adeptos (&quot;nosotros&quot;, &quot;nuestro&quot;, o &quot;la Plataforma&quot;) se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestro servicio de gestión de agentes de inteligencia artificial.</p>
      </Section>
      <Section title="2. Información que Recopilamos">
        <h3 className="text-base font-medium text-neutral-200 mt-6 mb-2">2.1. Información que nos Proporciona</h3>
        <p>Recopilamos información que usted nos proporciona directamente, incluyendo:</p>
        <List items={[
          "Información de la cuenta (nombre, correo electrónico, contraseña)",
          "Información del perfil (foto de perfil, información de contacto)",
          "Información de facturación y pago",
          "Contenido que crea o sube a la plataforma",
          "Comunicaciones con nuestro equipo de soporte",
        ]} />
        <h3 className="text-base font-medium text-neutral-200 mt-8 mb-2">2.2. Información Recopilada Automáticamente</h3>
        <p>Cuando utiliza nuestro Servicio, recopilamos automáticamente cierta información, incluyendo:</p>
        <List items={[
          "Información del dispositivo (tipo de dispositivo, sistema operativo, identificadores únicos)",
          "Información de uso (páginas visitadas, tiempo empleado, características utilizadas)",
          "Información de registro (direcciones IP, tipo de navegador, páginas de referencia)",
          "Cookies y tecnologías similares",
        ]} />
        <h3 className="text-base font-medium text-neutral-200 mt-8 mb-2">2.3. Información de Terceros</h3>
        <p>Podemos recibir información sobre usted de proveedores de servicios externos, como servicios de autenticación o plataformas de pago integradas.</p>
      </Section>
      <Section title="3. Cómo Usamos su Información">
        <p>Usamos la información recopilada para:</p>
        <List items={[
          "Proporcionar, mantener y mejorar nuestro Servicio",
          "Procesar transacciones y enviar notificaciones relacionadas",
          "Enviar comunicaciones técnicas, actualizaciones y alertas de seguridad",
          "Responder a sus comentarios, preguntas y solicitudes de soporte",
          "Personalizar y mejorar su experiencia en la plataforma",
          "Detectar, prevenir y abordar problemas técnicos y actividades fraudulentas",
          "Cumplir con las obligaciones legales y hacer cumplir nuestros términos",
        ]} />
      </Section>
      <Section title="4. Compartir su Información">
        <p>No vendemos su información personal. Podemos compartir su información en las siguientes circunstancias:</p>
        <DefinitionList items={[
          { term: "Proveedores de Servicios", desc: "Con terceros que realizan servicios en nuestro nombre (alojamiento, análisis, procesamiento de pagos)" },
          { term: "Cumplimiento Legal", desc: "Cuando lo exija la ley o para proteger nuestros derechos" },
          { term: "Transferencias Comerciales", desc: "En caso de fusión, adquisición o venta de activos" },
          { term: "Con su Consentimiento", desc: "Cuando nos autoriza explícitamente a compartir información" },
        ]} />
      </Section>
      <Section title="5. Seguridad de la Información">
        <p>Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger su información personal contra el acceso, alteración, divulgación o destrucción no autorizados. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.</p>
      </Section>
      <Section title="6. Retención de Datos">
        <p>Retenemos su información personal durante el tiempo que sea necesario para cumplir con los propósitos descritos en esta Política de Privacidad, a menos que la ley exija o permita un período de retención más largo. Cuando eliminamos información, lo hacemos de forma segura.</p>
      </Section>
      <Section title="7. Sus Derechos">
        <p>Dependiendo de su ubicación, puede tener los siguientes derechos con respecto a su información personal:</p>
        <DefinitionList items={[
          { term: "Acceso", desc: "Solicitar una copia de la información personal que tenemos sobre usted" },
          { term: "Rectificación", desc: "Corregir información inexacta o incompleta" },
          { term: "Eliminación", desc: "Solicitar la eliminación de su información personal" },
          { term: "Objeción", desc: "Oponerse al procesamiento de su información personal" },
          { term: "Portabilidad", desc: "Recibir su información en un formato estructurado y de uso común" },
          { term: "Retirar el Consentimiento", desc: "Retirar su consentimiento cuando el procesamiento se base en el consentimiento" },
        ]} />
        <p className="mt-4">Para ejercer estos derechos, puede contactarnos a través de los canales de soporte disponibles en la plataforma.</p>
      </Section>
      <Section title="8. Cookies y Tecnologías de Seguimiento">
        <p>Utilizamos cookies y tecnologías similares para recopilar información y mejorar su experiencia. Puede configurar su navegador para que rechace las cookies, pero esto puede afectar la funcionalidad del Servicio.</p>
      </Section>
      <Section title="9. Enlaces a Terceros">
        <p>Nuestro Servicio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios externos. Recomendamos revisar las políticas de privacidad de cualquier sitio que visite.</p>
      </Section>
      <Section title="10. Privacidad de los Niños">
        <p>Nuestro Servicio no está dirigido a niños menores de 18 años. No recopilamos a sabiendas información personal de niños. Si descubrimos que hemos recopilado información de un niño sin el consentimiento de los padres, tomaremos medidas para eliminar esa información.</p>
      </Section>
      <Section title="11. Transferencias Internacionales">
        <p>Su información puede ser transferida y procesada en países distintos al suyo. Al utilizar nuestro Servicio, usted acepta la transferencia de su información a estos países.</p>
      </Section>
      <Section title="12. Cambios a Esta Política">
        <p>Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos sobre cualquier cambio publicando la nueva Política en esta página y actualizando la fecha de &quot;Última actualización&quot;. Se recomienda que revise esta Política periódicamente.</p>
      </Section>
      <Section title="13. Contacto">
        <p>Si tiene preguntas o inquietudes sobre esta Política de Privacidad o nuestras prácticas de privacidad, puede contactarnos a través de los canales de soporte disponibles en la plataforma.</p>
      </Section>
    </>
  )
}

