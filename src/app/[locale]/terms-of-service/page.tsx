import TermsOfServicePage from "@/components/landing/legal/terms-of-service-page";
import { getDictionary } from "@/lib/get-dictionary";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);
  return <TermsOfServicePage dict={dict.legal} lang={locale} />;
}
