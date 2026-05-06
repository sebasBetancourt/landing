"use client";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export function DashboardPreviewSection({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section id="dashboard" className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {dict.badge}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60 md:text-lg">
            {dict.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* ── Dashboard mockup ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mx-auto w-full max-w-[600px] lg:mx-0"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a2a32] shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 rounded-md bg-white/8 px-3 py-1 text-xs text-white/40">
                  adeptos.ai/dashboard
                </span>
              </div>

              {/* Dashboard body */}
              <div className="p-5 space-y-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Valvetronic Designs Dashboard</p>
                    <p className="text-xs text-white/40">Jan 1 – Dec 31, 2024</p>
                  </div>
                  <span className="rounded-full bg-(--brand-sage)/15 px-3 py-1 text-xs font-semibold text-(--brand-sage)">
                    {dict.live}
                  </span>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {[
                    { label: "Draft Orders", value: "46" },
                    { label: "Checked Out", value: "11" },
                    { label: dict.conversion, value: "23.9%" },
                    { label: dict.revenue, value: "$16,217" },
                    { label: "Abandoned", value: "35" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-white/5 px-3 py-2.5">
                      <p className="text-[10px] text-white/40">{label}</p>
                      <p className="text-sm font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Escalation metrics */}
                <div className="rounded-xl bg-white/3 border border-white/8 p-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    Escalation Metrics
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { label: "Total Escalated", value: "254" },
                      { label: "Non-Escalated", value: "501" },
                      { label: dict.escalationRate, value: "33.6%" },
                      { label: dict.totalTickets, value: "755" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] text-white/40">{label}</p>
                        <p className="text-sm font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini bar chart */}
                <div className="rounded-xl bg-white/3 border border-white/8 p-3">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    Weekly conversations
                  </p>
                  <div className="flex items-end gap-1.5 h-14">
                    {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-(--brand-sage)/30 transition-all"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-[9px] text-white/25">
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Agent chat mockup ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-[260px] overflow-hidden rounded-3xl border border-white/10 bg-[#1a2a32] shadow-2xl sm:max-w-[300px]">
              {/* Status bar */}
              <div className="flex items-center justify-between bg-white/5 px-4 py-2">
                <span className="text-[10px] text-white/40">9:41 AM</span>
                <div className="flex gap-1">
                  <span className="text-[10px] text-white/40">●●●</span>
                </div>
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--brand-sage)/20 text-xs font-bold text-(--brand-sage)">
                  VD
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Valvetronic Designs</p>
                  <p className="text-[10px] text-emerald-400">● {dict.live}</p>
                </div>
              </div>

              {/* Chat */}
              <div className="space-y-3 px-4 py-4">
                {/* User bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-red-900/60 px-3 py-2">
                    <p className="text-xs text-white">
                      Hey what kind of systems do you have for Ferrari?
                    </p>
                  </div>
                </div>

                {/* Agent bubble */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">
                    <p className="text-xs leading-relaxed text-white/85">
                      We carry full Ferrari exhaust systems for 458, 488, F8, Roma,
                      and SF90 — titanium and stainless options. Free shipping on
                      all orders. Want me to pull up specs for your specific model?
                    </p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 border-t border-white/8 px-4 py-3">
                <div className="flex-1 rounded-full bg-white/8 px-4 py-2 text-xs text-white/30">
                  {lang === "en" ? "Message..." : "Escribe un mensaje..."}
                </div>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-(--brand-sage)/20 text-(--brand-sage)">
                  <Mic className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Footer */}
              <div className="bg-white/3 px-4 py-2 text-center text-[10px] text-white/30">
                Powered by 🤖 adeptos.ai
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
