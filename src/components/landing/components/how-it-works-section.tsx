"use client";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  CreditCard,
  MessageCircle,
  RefreshCw,
  UserCheck,
  Zap,
} from "lucide-react";

const STEPS_ICONS = [Zap, MessageCircle, UserCheck, RefreshCw, CalendarCheck, CreditCard];

export function HowItWorksSection({ dict }: { dict: any }) {
  return (
    <section id="how-it-works" className="bg-white/2 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            {dict.badge}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {dict.steps.map((step: any, i: number) => {
            const Icon = STEPS_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className={cn(
                  "group rounded-2xl border border-white/8 bg-white/3 p-5 md:p-6",
                  "transition-colors duration-300 hover:border-(--brand-sage)/30",
                )}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-(--brand-sage)/20 text-sm font-bold text-(--brand-sage)">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-(--brand-sage)" />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
