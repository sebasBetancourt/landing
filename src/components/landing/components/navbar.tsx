"use client";

import { BRAND_URLS } from "@/shared/constants/brand";
import { cn } from "@/shared/lib/utils";
import { CalendarDays, Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const NAV_HEIGHT = "4.5rem"; // 72px — keep in sync with spacer div

export function Navbar({ dict, lang }: { dict: any; lang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const NAV_ITEMS = [
    { id: "features", label: dict.features },
    { id: "results", label: dict.results },
    { id: "pricing", label: dict.pricing },
    { id: "how-it-works", label: dict.howItWorks },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = "";
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    if (pathname && !pathname.endsWith(`/${lang}`) && pathname !== `/${lang}`) {
      router.push(`/${lang}/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLocale = lang === "en" ? "es" : "en";
    if (!pathname) {
      router.push(`/${newLocale}`);
      return;
    }
    const newPath = pathname.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  };

  const bookAudit = () => {
    window.dispatchEvent(new Event("open-chatbot"));
    setMobileMenuOpen(false);
  };
  
  const goToLogin = () => {
    window.location.href = "https://app.adeptos.ai/#/login";
  };

  return (
    <>
      {/* ── Nav bar ────────────────────────────────────── */}
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/5 bg-(--brand-navy)/85 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            : "border-b border-transparent bg-transparent",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10"
          style={{ height: NAV_HEIGHT }}
        >
          {/* Logo — min-w-0 prevents overflow on 320px */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-(--brand-sage)"
            aria-label="Adeptos — top"
          >
            <img
              src={BRAND_URLS.horizontalGrayOnDark}
              alt="Adeptos"
              className="h-8 w-auto shrink-0 object-contain"
              decoding="async"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "min-h-11 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  activeSection === item.id
                    ? "text-(--brand-sage)"
                    : "text-white/60 hover:text-white",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={toggleLanguage}
              className="group flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/40 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5 text-(--brand-sage) transition-transform duration-300 group-hover:rotate-12" />
              <div className="flex items-center gap-1.5 uppercase tracking-widest">
                <span className={cn("transition-colors", lang === "en" ? "text-white" : "")}>EN</span>
                <span className="text-white/20 font-normal">/</span>
                <span className={cn("transition-colors", lang === "es" ? "text-white" : "")}>ES</span>
              </div>
            </button>
            <button
              onClick={goToLogin}
              className="min-h-11 rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {dict.signIn}
            </button>
            <button
              onClick={bookAudit}
              className="flex min-h-11 items-center gap-2 rounded-full bg-(--brand-sage) px-5 py-2 text-sm font-semibold text-(--brand-navy) transition-all hover:brightness-110 active:scale-95"
            >
              <CalendarDays className="h-4 w-4" />
              {dict.bookAudit}
            </button>
          </div>

          {/* Mobile actions (Language + Hamburger) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="group flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white/40 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5 text-(--brand-sage) transition-transform duration-300 group-hover:rotate-12" />
              <div className="flex items-center gap-1 uppercase tracking-widest">
                <span className={cn("transition-colors", lang === "en" ? "text-white" : "")}>EN</span>
                <span className="text-white/20 font-normal">/</span>
                <span className={cn("transition-colors", lang === "es" ? "text-white" : "")}>ES</span>
              </div>
            </button>
            <button
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/70 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen((p) => !p)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen drawer ──────────────────── */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-(--brand-navy) lg:hidden"
          style={{ top: NAV_HEIGHT }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="divide-y divide-white/5">
            {/* Nav links */}
            <div>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "flex w-full items-center border-b border-white/5 px-6 py-4 text-lg font-medium transition-colors",
                    activeSection === item.id
                      ? "bg-(--brand-sage)/8 text-(--brand-sage)"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Auth + CTA */}
            <div className="flex flex-col gap-3 px-6 py-6">
              <button
                onClick={() => {
                  goToLogin();
                  setMobileMenuOpen(false);
                }}
                className="flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-base font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                Sign in
              </button>
              <button
                onClick={bookAudit}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-(--brand-sage) py-3.5 text-base font-bold text-(--brand-navy) transition-all hover:brightness-110"
              >
                <CalendarDays className="h-4.5 w-4.5" />
                Book Free AI Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer — same height as nav */}
      <div style={{ height: NAV_HEIGHT }} aria-hidden />
    </>
  );
}
