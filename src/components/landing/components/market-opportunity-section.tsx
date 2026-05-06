"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Segment {
  label: string;
  pct: number;
  color: string;
  highlight?: boolean;
}



const CX = 120;
const CY = 120;
const R = 80;
const STROKE = 30;

function polarToXY(pct: number, r: number): [number, number] {
  const rad = (pct / 100) * 2 * Math.PI - Math.PI / 2;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function describeArc(startPct: number, endPct: number, r: number): string {
  const [sx, sy] = polarToXY(startPct, r);
  const [ex, ey] = polarToXY(endPct, r);
  const large = endPct - startPct > 50 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

function DonutChart({ segments, center }: { segments: Segment[]; center: any }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  let cursor = 0;

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 240"
      className="mx-auto w-full max-w-[340px]"
      aria-hidden
    >
      {segments.map(({ label, pct, color, highlight }, i) => {
        const start = cursor;
        const end = cursor + pct;
        cursor = end;
        const path = describeArc(start, end, R);
        return (
          <motion.path
            key={label}
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={highlight ? STROKE + 4 : STROKE}
            strokeLinecap="butt"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }}
          />
        );
      })}

      {/* Center text */}
      <text
        x={CX}
        y={CY - 6}
        textAnchor="middle"
        fill="var(--brand-gold)"
        fontSize="22"
        fontWeight="900"
      >
        &lt;5%
      </text>
      <text
        x={CX}
        y={CY + 10}
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize="7"
      >
        {center.line1}
      </text>
      <text
        x={CX}
        y={CY + 20}
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize="7"
      >
        {center.line2}
      </text>
    </svg>
  );
}

export function MarketOpportunitySection({ dict }: { dict: any }) {
  const segments: Segment[] = [
    { label: dict.chart.segments[0], pct: 55, color: "rgba(255,255,255,0.20)" },
    { label: dict.chart.segments[1], pct: 10, color: "rgba(202,223,158,0.60)" },
    { label: dict.chart.segments[2], pct: 8, color: "rgba(202,223,158,0.40)" },
    { label: dict.chart.segments[3], pct: 5, color: "var(--brand-gold)", highlight: true },
    { label: dict.chart.segments[4], pct: 22, color: "rgba(255,255,255,0.10)" },
  ];
  return (
    <section id="market" className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* ── Chart column ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-6 text-center text-sm font-semibold text-white/40 uppercase tracking-widest">
              {dict.chart.title}
            </p>
            <DonutChart segments={segments} center={dict.chart.center} />

            {/* Legend */}
            <div className="mt-6 space-y-2 px-4">
              {segments.map(({ label, pct, color, highlight }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm">
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className={highlight ? "font-semibold text-white" : "text-white/50"}>
                    {label}
                  </span>
                  <span className={highlight ? "ml-auto font-bold text-(--brand-gold)" : "ml-auto text-white/30"}>
                    {pct}%
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-[10px] text-white/20">
              Sources: Fullview, AI Automation Spot, OECD
            </p>
          </motion.div>

          {/* ── Copy column ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="space-y-5 text-center lg:text-left"
          >
            <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
              {dict.competitorsNote.split(".")[0]}.
              <br />
              <span className="text-(--brand-sage)">{dict.competitorsNote.split(".")[1]}</span>
            </h2>

            <p className="text-lg leading-relaxed text-white/60">
              {dict.adoptionText}
            </p>

            <p className="text-lg leading-relaxed text-white/60">
              {dict.birthOfInternet}
            </p>

            <p className="text-lg leading-relaxed text-white/60">
              {dict.socialMedia}
            </p>

            <p className="text-lg font-bold text-white">
              {dict.timeToAct}
            </p>

            <button
              onClick={() =>
                document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-2 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-(--brand-sage) px-8 py-4 font-bold text-(--brand-navy) transition-all hover:brightness-110 active:scale-95"
            >
              {dict.cta}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
