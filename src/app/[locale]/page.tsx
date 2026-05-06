import LandingPage from "@/components/landing/landing-page";
import { getDictionary } from "@/lib/get-dictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);

  return <LandingPage dict={dict} lang={locale} />;
}
