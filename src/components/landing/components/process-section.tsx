"use client";
import { motion } from "framer-motion";



export function ProcessSection({ dict }: { dict: any }) {
  const tiers = [
    { name: "AI Starter", time: dict.readyLabel + " 24–72 Hours" },
    { name: "AI Growth", time: dict.readyLabel + " 5–7 Days" },
    { name: "AI Enterprise", time: dict.readyLabel + " 4–6 Weeks" },
  ];
  return (
    <section id="process" className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {dict.title}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* ── Timelines ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {tiers.map(({ name, time }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
                className="rounded-2xl border border-white/8 bg-white/3 p-6"
              >
                <p className="mb-1 text-lg font-bold text-(--brand-sage)">{name}</p>
                <p className="text-3xl font-black text-(--brand-gold) md:text-4xl">{time}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── What Happens Next ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="mb-8 text-xl font-bold text-white">{dict.whatHappensNext}</h3>
            <ol className="space-y-6">
              {dict.steps.map((step: string, i: number) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--brand-sage)/20 text-sm font-bold text-(--brand-sage)">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-base text-white/70">{step}</p>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-sm text-white/35">
              {dict.noContracts}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
