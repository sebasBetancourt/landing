import { BRAND_NAME, BRAND_URLS } from "@/shared/constants/brand";
import { cn } from "@/shared/lib/utils";

export type AdeptosLogoVariant =
  | "isotype"
  | "wordmark-vertical"
  | "logotype"
  | "horizontal-gray";

export interface AdeptosLogoProps {
  /** Use logos meant for dark UI surfaces (sidebar, landing) vs light cards. */
  forBackground: "dark" | "light";
  variant?: AdeptosLogoVariant;
  className?: string;
  imgClassName?: string;
  alt?: string;
}

function srcFor(variant: AdeptosLogoVariant, forBackground: "dark" | "light"): string {
  const lightBg = forBackground === "light";
  switch (variant) {
    case "horizontal-gray":
      return BRAND_URLS.horizontalGrayOnDark;
    case "wordmark-vertical":
      return lightBg ? BRAND_URLS.wordmarkVerticalOnLight : BRAND_URLS.wordmarkVerticalOnDark;
    case "logotype":
      return lightBg ? BRAND_URLS.logotypeOnLight : BRAND_URLS.logotypeOnDark;
    case "isotype":
    default:
      return lightBg ? BRAND_URLS.isotypeOnLight : BRAND_URLS.isotypeOnDark;
  }
}

export function AdeptosLogo({
  forBackground,
  variant = "isotype",
  className,
  imgClassName,
  alt = BRAND_NAME,
}: AdeptosLogoProps) {
  return (
    <span className={cn("inline-flex items-center justify-center shrink-0", className)}>
      <img
        src={srcFor(variant, forBackground)}
        alt={alt}
        className={cn("h-8 w-auto max-w-[200px] object-contain object-left", imgClassName)}
        decoding="async"
      />
    </span>
  );
}
