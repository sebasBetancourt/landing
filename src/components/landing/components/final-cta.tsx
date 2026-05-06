"use client";
import { AdeptosLogo } from "@/shared/components/brand";
import { BRAND_NAME } from "@/shared/constants/brand";
import { LEGAL_PATHS } from "@/shared/constants/legal-urls";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export function FinalCTA({ dict, footerDict, lang }: { dict: any; footerDict: any; lang: string }) {
  return (
    <>
      <section
        id="final-cta"
        className="relative overflow-hidden py-16 md:py-24 lg:py-32"
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in srgb, var(--brand-sage) 10%, transparent), transparent)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          {/* Logo */}
          <AdeptosLogo
            forBackground="dark"
            variant="horizontal-gray"
            imgClassName="h-8 w-auto shrink-0 mx-auto mb-8 object-contain"
          />

          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
            {dict.title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            {dict.availability1}{" "}
            <span className="font-semibold text-white">{dict.availabilityHighlight}</span>{" "}
            {dict.availability2}
          </p>

          <p className="mx-auto mt-3 max-w-xl text-base text-white/50">
            {dict.earlyAdopters}
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
            className="group mx-auto mt-10 flex w-full max-w-[420px] items-center justify-center gap-3 rounded-full bg-(--brand-sage) px-6 py-4 text-lg font-bold text-(--brand-navy) transition-all hover:brightness-110 active:scale-95 md:px-10 md:py-5 md:text-xl"
          >
            {dict.cta}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Secondary — WhatsApp */}
          <div className="mt-5 flex min-h-11 items-center justify-center gap-2 text-base text-white/50">
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span>{dict.whatsAppLabel}</span>
            <a
              href="https://wa.me/12166247930"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center font-semibold text-white/70 transition-colors hover:text-white"
            >
              +1 216 624 7930
            </a>
          </div>

          <div className="mt-2 flex min-h-11 items-center justify-center gap-2 text-base text-white/50">
            <Mail className="h-4 w-4 shrink-0" />
            <span>{dict.emailLabel}</span>
            <a
              href="mailto:admin@adeptos.ai"
              className="flex min-h-11 items-center font-semibold text-white/70 transition-colors hover:text-white"
            >
              admin@adeptos.ai
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-white/30 sm:flex-row sm:text-left">
            {/* Left — brand */}
            <div className="flex items-center gap-2">
              <AdeptosLogo
                forBackground="dark"
                variant="isotype"
                imgClassName="h-5 w-5 object-contain opacity-50"
              />
              <span>© 2026 {BRAND_NAME} AI LLC. {footerDict.rights}</span>
            </div>

            {/* Centre — legal */}
            <div className="flex items-center gap-4">
              <Link
                href={`/${lang}${LEGAL_PATHS.privacyPolicy}`}
                className="transition-colors hover:text-white/60"
              >
                {footerDict.privacy}
              </Link>
              <span aria-hidden>·</span>
              <Link
                href={`/${lang}${LEGAL_PATHS.termsOfService}`}
                className="transition-colors hover:text-white/60"
              >
                {footerDict.terms}
              </Link>
            </div>

            {/* Right — contact */}
            <div className="flex items-center gap-3">
              <span>adeptos.ai</span>
              <span aria-hidden>·</span>
              <a
                href="mailto:ryan@adeptos.ai"
                className="transition-colors hover:text-white/60"
              >
                ryan@adeptos.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
