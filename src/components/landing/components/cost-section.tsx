"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";



function AnimatedTotal() {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `$${Math.round(v).toLocaleString()}+`);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, 8500, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function CostSection({ dict }: { dict: any }) {
  return (
    <section id="cost" className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {dict.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {/* ── Mobile: card list (< md) ──────────────── */}
          <div className="space-y-3 md:hidden">
            {dict.items.map(({ label, cost }: any) => (
              <div
                key={label}
                className="rounded-xl border border-white/8 bg-white/3 p-4"
              >
                <p className="mb-1 text-sm text-white/60">{label}</p>
                <p className="text-base font-semibold text-white">{cost}</p>
              </div>
            ))}
            {/* Total card */}
            <div className="rounded-xl border border-brand-coral/25 bg-status-error-bg p-4">
              <p className="mb-1 text-sm font-bold text-brand-coral">
                {dict.totalLeak}
              </p>
              <p className="text-2xl font-black text-brand-coral">
                <AnimatedTotal /> / month
              </p>
            </div>
          </div>

          {/* ── Desktop: table (md+) ──────────────────── */}
          <div className="hidden overflow-hidden rounded-2xl border border-white/8 bg-white/3 md:block">
            {/* Header row */}
            <div className="grid grid-cols-2 bg-(--brand-sage)/10 px-6 py-3">
              <span className="text-sm font-semibold text-(--brand-sage)">{dict.gapHeader}</span>
              <span className="text-right text-sm font-semibold text-(--brand-sage)">{dict.costHeader}</span>
            </div>

            {/* Data rows */}
            {dict.items.map(({ label, cost }: any) => (
              <div
                key={label}
                className="grid grid-cols-2 items-center gap-4 border-t border-white/5 px-6 py-4 odd:bg-white/1"
              >
                <span className="text-sm text-white/70">{label}</span>
                <span className="text-right text-sm font-semibold text-white">{cost}</span>
              </div>
            ))}

            {/* Total row */}
            <div className="grid grid-cols-2 items-center gap-4 border-t border-brand-coral/25 bg-status-error-bg px-6 py-5">
              <span className="text-base font-bold text-brand-coral">
                {dict.totalLeak}
              </span>
              <span className="text-right text-xl font-black text-brand-coral">
                <AnimatedTotal /> / month
              </span>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-white/30">
          {dict.conservativeNote}
        </p>
      </div>
    </section>
  );
}
