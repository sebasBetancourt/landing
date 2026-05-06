/**
 * Canonical paths and URLs for legal/public pages (privacy policy, terms of service).
 * Used so Meta, external links, and in-app navigation all resolve to the same pages.
 *
 * - Clean URLs (e.g. https://app.adeptos.ai/privacy-policy) are used for Meta dashboard and direct access.
 * - Hash URLs (e.g. https://app.adeptos.ai/#/privacy-policy) work when navigating inside the SPA.
 */
export const LEGAL_PATHS = {
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
} as const;

/** Paths that must be served as clean URLs (no hash) for external access (e.g. Meta verification). */
export const CLEAN_URL_PATHS: string[] = [LEGAL_PATHS.privacyPolicy, LEGAL_PATHS.termsOfService];

/**
 * Link to the main app home. Use an anchor so it works both when the page is
 * opened via clean URL (e.g. /privacy-policy) and when inside the hash router (#/privacy-policy).
 */
export const APP_HOME_HREF = "/";
