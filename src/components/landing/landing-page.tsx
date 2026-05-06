"use client";

import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/shared/hooks/use-document-title";

import { BonusSection } from "@/components/landing/components/bonus-section";
import { CostSection } from "@/components/landing/components/cost-section";
import { DashboardPreviewSection } from "@/components/landing/components/dashboard-preview-section";
import { FinalCTA } from "@/components/landing/components/final-cta";
import { HeroSection } from "@/components/landing/components/hero-section";
import { HowItWorksSection } from "@/components/landing/components/how-it-works-section";
import { MarketOpportunitySection } from "@/components/landing/components/market-opportunity-section";
import { Navbar } from "@/components/landing/components/navbar";
import { PricingSection } from "@/components/landing/components/pricing-section";
import { ProblemSection } from "@/components/landing/components/problem-section";
import { ProcessSection } from "@/components/landing/components/process-section";
import { ResultsSection } from "@/components/landing/components/results-section";
import { ChatBotAudit } from "@/components/landing/components/chat-bot-audit";

export default function Home({ dict, lang }: { dict: any; lang: string }) {
  useDocumentTitle(lang === "es" ? "Inicio" : "Home");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener("open-chatbot", handleOpenChat);
    return () => window.removeEventListener("open-chatbot", handleOpenChat);
  }, []);

  return (
    <div className="landing-dark-context landing-page-bg landing-apollo-type">
      <main className="relative z-10">
        <Navbar dict={dict.navbar} lang={lang} />
        <HeroSection dict={dict.hero} />
        <ProblemSection dict={dict.problem} />
        <CostSection dict={dict.cost} />
        <HowItWorksSection dict={dict.howItWorks} />
        <DashboardPreviewSection dict={dict.dashboardPreview} lang={lang} />
        <ResultsSection dict={dict.results} lang={lang} />
        <MarketOpportunitySection dict={dict.marketOpportunity} />
        <PricingSection dict={dict.pricing} />
        <BonusSection dict={dict.bonus} />
        <ProcessSection dict={dict.process} />
        <FinalCTA dict={dict.finalCta} footerDict={dict.footer} lang={lang} />
        <ChatBotAudit isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} lang={lang} />
      </main>
    </div>
  );
}
