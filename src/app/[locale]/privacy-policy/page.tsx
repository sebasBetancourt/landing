import PrivacyPolicyPage from "@/components/landing/legal/privacy-policy-page";
import { getDictionary } from "@/lib/get-dictionary";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as any);
  return <PrivacyPolicyPage dict={dict.legal} lang={locale} />;
}
