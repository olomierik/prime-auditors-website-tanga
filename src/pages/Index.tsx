import { useEffect } from "react";
import { useParams } from "react-router-dom";
import i18n from "@/i18n";
import { Toaster } from "@/components/ui/sonner";
import LedgerNav from "@/components/ledger/LedgerNav";
import LedgerHero from "@/components/ledger/LedgerHero";
import LedgerMarquee from "@/components/ledger/LedgerMarquee";
import LedgerServices from "@/components/ledger/LedgerServices";
import LedgerPractice from "@/components/ledger/LedgerPractice";
import LedgerStatement from "@/components/ledger/LedgerStatement";
import LedgerContact from "@/components/ledger/LedgerContact";
import LedgerFooter from "@/components/ledger/LedgerFooter";

/* Prime Auditors homepage — "The Ledger" editorial redesign.
   Self-contained (its own nav + footer per the design handoff); rendered
   outside the shared Layout so the dark long-scroll page is pixel-faithful. */

const Index = () => {
  const { locale } = useParams();

  // The homepage sits outside the shared Layout, so it syncs the locale itself.
  useEffect(() => {
    if (locale === "en" || locale === "zh") i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <div className="min-h-screen bg-prime-blue-deepest font-open-sans antialiased">
      <LedgerNav />
      <main>
        <LedgerHero />
        <LedgerMarquee />
        <LedgerServices />
        <LedgerPractice />
        <LedgerStatement />
        <LedgerContact />
      </main>
      <LedgerFooter />
      <Toaster />
    </div>
  );
};

export default Index;
