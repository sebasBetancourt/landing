"use client";
import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";



type TestimonialSlide = {
  id: string;
  author: string;
  role?: string;
  company: string;
  text: string;
  href?: string;
  hrefLabel?: string;
};



function Stars() {
  return (
    <div className="flex shrink-0 gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialsCarousel({ dict, lang }: { dict: any; lang: string }) {
  const [index, setIndex] = useState(0);
  const TESTIMONIAL_SLIDES = dict.testimonials || [];
  const count = TESTIMONIAL_SLIDES.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = TESTIMONIAL_SLIDES[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
      className="mt-12 md:mt-16"
    >
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-(--brand-sage)">
            {dict.clientVoices}
          </p>
          <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">{dict.whatTeamsSay}</h3>
        </div>
        <p className="text-xs text-white/35">
          {index + 1} / {count}
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] md:p-10"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative min-h-[200px] md:min-h-[180px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                    {slide.company}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">{slide.author}</p>
                  {slide.role ? (
                    <p className="text-sm text-white/45">{slide.role}</p>
                  ) : null}
                </div>
                <Stars />
              </div>
              <blockquote className="text-base leading-relaxed text-white/70 md:text-lg">
                &ldquo;{slide.text}&rdquo;
              </blockquote>
              {slide.href ? (
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit text-sm font-medium text-(--brand-sage) transition-colors hover:text-(--brand-sage)/80"
                >
                  {slide.hrefLabel ?? slide.href} →
                </a>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/8 pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {TESTIMONIAL_SLIDES.map((s: TestimonialSlide, i: number) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-(--brand-sage)"
                    : "w-2 bg-white/20 hover:bg-white/35",
                )}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ResultsSection({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section id="results" className="bg-white/2 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 max-w-2xl md:mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-(--brand-sage)">
            {dict.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            {dict.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {dict.items.map((company: any, idx: number) => (
            <motion.article
              key={company.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
              className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/3 p-5 md:p-7"
            >
              <h3 className="mb-3 text-lg font-bold text-white md:text-xl">{company.name}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-white/60 md:text-[15px]">
                {company.desc}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {company.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <TestimonialsCarousel dict={dict} lang={lang} />
      </div>
    </section>
  );
}
