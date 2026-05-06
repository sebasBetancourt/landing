"use client";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  tag: string;
  setup: string;
  monthly: string;
  delivery: string;
  features: string[];
  guarantee: string;
  cta: string;
  popular?: boolean;
  premium?: boolean;
}



function PlanCard({ plan, index, mostPopularLabel }: { plan: Plan; index: number; mostPopularLabel: string }) {
  const scrollToFinalCta = () =>
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.1 }}
      className={cn(
        "relative flex h-full min-h-0 flex-col rounded-2xl border bg-white/3 p-5 md:p-8",
        plan.popular
          ? "border-(--brand-sage) shadow-[0_0_40px_rgba(202,223,158,0.15)] md:scale-105"
          : "border-white/8",
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-(--brand-sage) px-4 py-1 text-xs font-bold text-(--brand-navy) uppercase tracking-widest">
          {mostPopularLabel}
        </span>
      )}

      <p className="mb-1 text-xs text-white/40">{plan.tag}</p>
      <h3 className="mb-1 text-xl font-bold text-white">{plan.name}</h3>
      <p className="mb-4 text-xs text-white/30">{plan.delivery}</p>

      {/* Features */}
      <ul className="mb-6 mt-2 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--brand-sage)" />
            {f}
          </li>
        ))}
      </ul>

      {/* Guarantee */}
      <p className="mb-6 text-xs leading-relaxed text-white/40">{plan.guarantee}</p>

      {/* CTA */}
      <button
        onClick={scrollToFinalCta}
        className={cn(
          "flex min-h-11 w-full items-center justify-center rounded-full py-3 text-sm font-bold transition-all hover:brightness-110 active:scale-95",
          plan.popular
            ? "bg-(--brand-sage) text-(--brand-navy)"
            : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        )}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}

export function PricingSection({ dict }: { dict: any }) {
  const plans: Plan[] = [
    {
      name: dict.starter.title,
      tag: dict.starter.tagline,
      setup: dict.starter.setup,
      monthly: "$497",
      delivery: dict.starter.ready,
      features: dict.starter.features,
      guarantee: dict.starter.guarantee,
      cta: dict.cta,
    },
    {
      name: dict.growth.title,
      tag: dict.growth.tagline,
      setup: dict.growth.setup,
      monthly: "$1,997",
      delivery: dict.growth.ready,
      features: dict.growth.features,
      guarantee: dict.growth.guarantee,
      cta: dict.cta,
      popular: true,
    },
    {
      name: dict.enterprise.title,
      tag: dict.enterprise.tagline,
      setup: dict.enterprise.setup,
      monthly: "$3,500–$5,500+",
      delivery: dict.enterprise.ready,
      features: dict.enterprise.features,
      guarantee: dict.enterprise.guarantee,
      cta: dict.ctaEnterprise,
      premium: true,
    },
  ];
  return (
    <section id="pricing" className="bg-white/2 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-(--brand-gold)">
            {dict.title}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            {dict.subtitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
            {dict.guarantee}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} mostPopularLabel={dict.mostPopular} />
          ))}
        </div>
      </div>
    </section>
  );
}
