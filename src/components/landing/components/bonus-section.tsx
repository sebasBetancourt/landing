"use client";
import { motion } from "framer-motion";



export function BonusSection({ dict }: { dict: any }) {
  return (
    <section
      id="bonus"
      className="border-y border-white/5 py-16 md:py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--brand-sage) 5%, transparent), transparent 60%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full bg-(--brand-sage) px-6 py-2 text-sm font-black uppercase tracking-widest text-(--brand-navy)">
            Free Bonus
          </span>
          <h2 className="mt-6 text-2xl font-bold text-white md:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/60">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Items grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {dict.items.map(({ title, value, desc }: any, i: number) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="rounded-xl border border-white/8 bg-white/3 p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold leading-snug text-white">{title}</h3>
                <span className="shrink-0 rounded-md bg-(--brand-gold)/10 px-2 py-1 text-xs font-bold text-(--brand-gold)">
                  {value}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/50">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
