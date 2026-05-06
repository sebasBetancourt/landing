// src/shared/lib/brand-colors.ts
// Fuente de verdad del sistema de color Adeptos
// Usar SIEMPRE los tokens CSS — nunca importar estos hex directamente en componentes

export const BRAND_COLORS = {
  // Paleta base
  navy:      "#22333b",  // → var(--brand-navy)       → bg-[--brand-navy]
  navyLight: "#2d4a56",  // → var(--brand-navy-light)
  navyDeep:  "#172930",  // → var(--brand-navy-deep)
  sage:      "#cadf9e",  // → var(--brand-sage)        → bg-[--brand-sage]
  gold:      "#c8b273",  // → var(--brand-gold)        → bg-[--brand-gold]
  olive:     "#313628",  // → var(--brand-olive)
  surface:   "#f8faf5",  // → var(--brand-surface)

  // Accent palette
  coral:    "#ed6a5a",  // → var(--brand-coral)    → status: error
  steel:    "#b4c5e4",  // → var(--brand-steel)    → status: info
  lavender: "#e5e1ee",  // → var(--brand-lavender) → status: neutral
  orange:   "#ff5714",  // → var(--brand-orange)   → status: critical
  cyan:     "#1be7ff",  // → var(--brand-cyan)     → status: live/success

  // Basic
  surface2: "#f5f5f5",  // → var(--brand-surface) legacy
  ink:      "#0d0908",  // dark text
  gray:     "#666666",  // muted text
} as const

// Mapa semántico de status → variante de componente
export const STATUS_MAP = {
  active:   "success",
  inactive: "neutral",
  pending:  "pending",
  error:    "error",
  live:     "live",
  critical: "critical",
  info:     "info",
  warning:  "warning",
} as const satisfies Record<string, string>
