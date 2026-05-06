import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/get-dictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: ["IA", "Agentes Inteligentes", "Automatización", "Adeptos", "Eficiencia Operativa", "SaaS"],
    authors: [{ name: "Adeptos Team" }],
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: "https://adeptos.ai",
      siteName: "Adeptos",
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
