"use client";
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { APP_HOME_HREF, LEGAL_PATHS } from "@/shared/constants/legal-urls"
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { Globe } from "lucide-react";

export default function TermsOfServicePage({ dict, lang }: { dict: any; lang: string }) {
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
            {dict.terms.title}
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
          {lang === "es" ? <TermsEs /> : <TermsEn />}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800/50">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-700">
              &copy; {new Date().getFullYear()} Adeptos LLC. {dict.back === "Back" ? "All rights reserved." : "Todos los derechos reservados."}
            </p>
            <div className="flex items-center gap-5 text-xs text-neutral-600">
              <Link href={`/${lang}${LEGAL_PATHS.privacyPolicy}`} className="hover:text-neutral-400 transition-colors">
                {dict.privacy.title}
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

function TermsEn() {
  return (
    <>
      <Section title="1. Acceptance of Terms">
        <p>By accessing and using Adeptos (&quot;the Service&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Service.</p>
      </Section>
      <Section title="2. Description of Service">
        <p>Adeptos is an artificial intelligence agent management platform that allows users to create, configure, and manage AI agents for various business purposes. The Service includes tools for integration with multiple communication platforms and third-party services.</p>
      </Section>
      <Section title="3. User Accounts">
        <p>To use the Service, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account and password, and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>
      </Section>
      <Section title="4. Acceptable Use">
        <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You must not:</p>
        <List items={[
          "Use the Service for illegal or unauthorized activities",
          "Interfere with or disrupt the operation of the Service",
          "Attempt to access restricted areas of the Service",
          "Transmit viruses, malware, or malicious code",
          "Violate the intellectual property rights of third parties",
          "Collect information from other users without their consent",
        ]} />
      </Section>
      <Section title="5. Intellectual Property">
        <p>The Service and its original content, features, and functionality are owned by Adeptos and are protected by international copyright, trademark, patent, and other intellectual property laws. You may not copy, modify, distribute, sell, or rent any part of the Service without our prior written permission.</p>
      </Section>
      <Section title="6. User Content">
        <p>You retain all rights to the content you create, upload, or transmit through the Service. By using the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content solely for the purpose of providing and improving the Service.</p>
      </Section>
      <Section title="7. Payments and Billing">
        <p>Certain features of the Service may require payment of fees. All fees will be clearly indicated before you are charged. You agree to pay all fees associated with your use of the Service. Fees are non-refundable except as required by law.</p>
      </Section>
      <Section title="8. Limitation of Liability">
        <p>To the maximum extent permitted by law, Adeptos shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.</p>
      </Section>
      <Section title="9. Service Modifications">
        <p>We reserve the right to modify, suspend, or discontinue the Service, or any part thereof, at any time and for any reason, with or without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.</p>
      </Section>
      <Section title="10. Terms Modifications">
        <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. It is recommended that you review these Terms periodically.</p>
      </Section>
      <Section title="11. Termination">
        <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms.</p>
      </Section>
      <Section title="12. Governing Law">
        <p>These Terms shall be governed and construed in accordance with the laws of the country where Adeptos operates, without regard to its conflict of law provisions.</p>
      </Section>
      <Section title="13. Contact">
        <p>If you have any questions about these Terms of Service, you can contact us through the support channels available on the platform.</p>
      </Section>
    </>
  )
}

function TermsEs() {
  return (
    <>
      <Section title="1. Aceptación de los Términos">
        <p>Al acceder y utilizar Adeptos (&quot;el Servicio&quot;), usted acepta cumplir y estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar el Servicio.</p>
      </Section>
      <Section title="2. Descripción del Servicio">
        <p>Adeptos es una plataforma de gestión de agentes de inteligencia artificial que permite a los usuarios crear, configurar y gestionar agentes de IA para diversos fines comerciales. El Servicio incluye herramientas para la integración con múltiples plataformas de comunicación y servicios de terceros.</p>
      </Section>
      <Section title="3. Cuentas de Usuario">
        <p>Para utilizar el Servicio, debe crear una cuenta proporcionando información precisa y completa. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, y de todas las actividades que ocurran bajo su cuenta. Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.</p>
      </Section>
      <Section title="4. Uso Aceptable">
        <p>Usted acepta utilizar el Servicio solo para fines legales y de acuerdo con estos Términos. No debe:</p>
        <List items={[
          "Utilizar el Servicio para actividades ilegales o no autorizadas",
          "Interferir o interrumpir el funcionamiento del Servicio",
          "Intentar acceder a áreas restringidas del Servicio",
          "Transmitir virus, malware o código malicioso",
          "Violar los derechos de propiedad intelectual de terceros",
          "Recopilar información de otros usuarios sin su consentimiento",
        ]} />
      </Section>
      <Section title="5. Propiedad Intelectual">
        <p>El Servicio y su contenido original, características y funcionalidad son propiedad de Adeptos y están protegidos por leyes internacionales de derechos de autor, marcas registradas, patentes y otras leyes de propiedad intelectual. No puede copiar, modificar, distribuir, vender ni alquilar ninguna parte del Servicio sin nuestro permiso previo por escrito.</p>
      </Section>
      <Section title="6. Contenido del Usuario">
        <p>Usted conserva todos los derechos sobre el contenido que crea, sube o transmite a través del Servicio. Al utilizar el Servicio, nos otorga una licencia mundial, no exclusiva y libre de regalías para utilizar, reproducir, modificar y distribuir su contenido únicamente con el fin de proporcionar y mejorar el Servicio.</p>
      </Section>
      <Section title="7. Pagos y Facturación">
        <p>Ciertas características del Servicio pueden requerir el pago de tarifas. Todas las tarifas se indicarán claramente antes de que se le cobre. Usted acepta pagar todas las tarifas asociadas con su uso del Servicio. Las tarifas no son reembolsables excepto cuando lo exija la ley.</p>
      </Section>
      <Section title="8. Limitación de Responsabilidad">
        <p>En la máxima medida permitida por la ley, Adeptos no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, ni de ninguna pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, ni de ninguna pérdida de datos, uso, fondo de comercio u otras pérdidas intangibles.</p>
      </Section>
      <Section title="9. Modificaciones del Servicio">
        <p>Nos reservamos el derecho de modificar, suspender o interrumpir el Servicio, o cualquier parte del mismo, en cualquier momento y por cualquier motivo, con o sin previo aviso. No seremos responsables ante usted ni ante ningún tercero por ninguna modificación, suspensión o interrupción del Servicio.</p>
      </Section>
      <Section title="10. Modificaciones de los Términos">
        <p>Nos reservamos el derecho de modificar estos Términos en cualquier momento. Le notificaremos de cualquier cambio publicando los nuevos Términos en esta página y actualizando la fecha de &quot;Última actualización&quot;. Se recomienda que revise estos Términos periódicamente.</p>
      </Section>
      <Section title="11. Terminación">
        <p>Podemos cancelar o suspender su cuenta y el acceso al Servicio inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, sin limitación, si incumple estos Términos.</p>
      </Section>
      <Section title="12. Ley Aplicable">
        <p>Estos Términos se regirán e interpretarán de acuerdo con las leyes del país donde opera Adeptos, sin tener en cuenta sus disposiciones sobre conflictos de leyes.</p>
      </Section>
      <Section title="13. Contacto">
        <p>Si tiene alguna pregunta sobre estos Términos de Servicio, puede contactarnos a través de los canales de soporte disponibles en la plataforma.</p>
      </Section>
    </>
  )
}
