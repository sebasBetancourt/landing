# Adeptos marketing assets

Official logos, isotypes, and horizontal lockups for web and print. PDFs contain color specs from the brand manual.

## Using these in the app

The UI imports these via **`@/shared/constants/brand`** (`BRAND_URLS`) and the **`AdeptosLogo`** component (`@/shared/components/brand`). Prefer those instead of hard-coding paths.

Encoded URL examples (spaces as `%20`):

- Dark UI (sidebar, landing): `Isotipo blanco@300x.png`, `logo vertical blanco@300x.png`, `logo blanco@300x.png`
- Light UI (print / light surfaces): `Isotipo negro@300x.png`, `logo vertical negro@300x.png`, `logo negro@300x.png`

## Brand colors (UI tokens)

| Token | Hex | Role |
| --- | --- | --- |
| Gold | `#c8b273` | Primary / CTAs / accents |
| Navy | `#22333b` | Dark chrome, sidebar (dark) |
| Olive | `#313628` | Elevated surfaces (dark) |
| Sage | `#cadf9e` | Secondary accent, highlights |
| Gray | `#666666` | Muted text |
| Surface | `#f5f5f5` | Light app background |
| Ink | `#0d0908` | Primary text (light mode) |

Shadcn maps these via `oklch` in `src/index.css` (`:root` / `.dark`). Globals: `--brand-gold`, `--brand-navy`, etc.

## Favicon

`index.html` uses `/adeptos_logo.png` at the repo root of `public/`. Replace that file if you update the master favicon; optional: point the link to a marketing isotype.
