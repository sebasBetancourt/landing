"use client";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { MessageSquare, MoonStar, TrendingDown, UserX } from "lucide-react";

const PROBLEMS_ICONS = [MessageSquare, UserX, TrendingDown, MoonStar];


export function ProblemSection({ dict }: { dict: any }) {
  return (
    <section
      id="features"
      className="bg-white/2 py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-(--brand-sage)">
            {dict.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            {dict.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {dict.items.map((item: any, i: number) => {
            const Icon = PROBLEMS_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(202,223,158,0.3)" }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-5 md:p-6",
                  "transition-colors duration-300",
                )}
              >
                {/* Decorative number */}
                <span
                  className="pointer-events-none absolute right-4 top-4 select-none text-7xl font-black leading-none text-(--brand-sage)/15"
                  aria-hidden
                >
                  0{i + 1}
                </span>

                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--brand-sage)/20 bg-(--brand-sage)/10">
                  <Icon className="h-5 w-5 text-(--brand-sage)" />
                </div>

                <h3 className="mb-2 text-base font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
