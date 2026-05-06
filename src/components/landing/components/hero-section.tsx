"use client";

import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ArrowDown,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const FLOWS = [
  { name: "WhatsApp lead triage", detail: "94% accuracy", state: "Running", sage: true },
  { name: "Missed-call recovery", detail: "12 bookings today", state: "Running", sage: true },
  { name: "After-hours qualification", detail: "Sync in progress", state: "Learning", sage: false },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSection({ dict }: { dict: any }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 md:pb-24 lg:px-8 lg:pb-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── Left column ─────────────────────────────── */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold tracking-widest text-white/70 uppercase">
              {dict.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div {...fadeUp(0.1)} className="space-y-2">
            <h1
              className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {dict.title.split("from")[0]}
              <br />
              {dict.title.split("from")[1] ? `from ${dict.title.split("from")[1]}` : ""}
            </h1>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            {...fadeUp(0.2)}
            className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            {dict.subtitle}
          </motion.p>

          {/* Trust badges */}
          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50"
          >
            {[dict.trust.workflows, dict.trust.analytics, dict.trust.permissions].map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-(--brand-sage)" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
              className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-(--brand-sage) px-8 py-4 text-lg font-bold text-(--brand-navy) transition-all hover:brightness-110 active:scale-95 sm:w-auto"
            >
              {dict.ctaPrimary}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 px-6 py-4 text-base font-medium text-white/60 transition-colors hover:text-white sm:w-auto"
            >
              <ArrowDown className="h-4 w-4" aria-hidden />
              {dict.ctaSecondary}
            </button>
          </motion.div>
        </div>

        {/* ── Right column — Command Center card ─────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none"
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--brand-sage) 12%, transparent), transparent 54%), radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--brand-gold) 8%, transparent), transparent 48%)",
            }}
            aria-hidden
          />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
            {/* Header */}
            <div className="border-b border-white/8 px-5 py-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Adeptos Command Center</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                {[
                  { label: "Qualified leads", value: "43", Icon: Users },
                  { label: "Avg response", value: "18s", Icon: Timer },
                  { label: "Conversion", value: "+27%", Icon: TrendingUp },
                ].map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/8 bg-white/3 px-2.5 py-2"
                  >
                    <div className="mb-1 flex items-center gap-1 text-white/40">
                      <Icon className="h-3 w-3" />
                      <span className="truncate">{label}</span>
                    </div>
                    <p className="text-sm font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Flows */}
            <div className="space-y-3 px-5 py-4">
              <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Active Flows
                </p>
                <div className="space-y-2.5">
                  {FLOWS.map(({ name, detail, state, sage }) => (
                    <div key={name} className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{name}</p>
                        <p className="text-xs text-white/40">{detail}</p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                          sage
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-(--brand-gold)/20 bg-(--brand-gold)/10 text-(--brand-gold)",
                        )}
                      >
                        {state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2.5">
                  <p className="mb-1 text-[11px] text-white/40">Automations running</p>
                  <p className="text-base font-bold text-white">118</p>
                </div>
                <div className="rounded-lg border border-white/8 bg-white/3 px-3 py-2.5">
                  <p className="mb-1 text-[11px] text-white/40">Successful executions</p>
                  <p className="text-base font-bold text-white">97.4%</p>
                </div>
              </div>

              {/* Recommendation bar */}
              <div className="flex items-center gap-2 rounded-xl border border-(--brand-sage)/20 bg-(--brand-sage)/5 px-3.5 py-2.5">
                <Sparkles className="h-4 w-4 shrink-0 text-(--brand-sage)" />
                <p className="text-sm font-medium text-white/80">
                  AI optimization recommendation ready
                </p>
                <Activity className="ml-auto h-4 w-4 shrink-0 text-(--brand-sage)" />
              </div>
            </div>

            {/* CTA bar */}
            <div className="border-t border-white/8 px-5 py-3">
              <button
                onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-(--brand-sage) py-2.5 text-sm font-bold text-(--brand-navy) transition-all hover:brightness-110"
              >
                <CalendarDays className="h-4 w-4" />
                Book Free AI Audit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
