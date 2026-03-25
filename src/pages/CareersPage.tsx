import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import WhyOpenRouter from "@/components/careers/WhyOpenRouter";
import CareersBenefits from "@/components/careers/CareersBenefits";
import CareersOpenPositions from "@/components/careers/CareersOpenPositions";

export default function CareersPage() {
  const { t } = useTranslation();
  usePageTitle(t("careers.pageTitle"));

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Navbar />
      <CareersHero />
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border/50 h-px w-full max-w-4xl mx-auto"
      />
      <WhyOpenRouter />
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border/50 h-px w-full max-w-4xl mx-auto"
      />
      <CareersBenefits />
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border/50 h-px w-full max-w-4xl mx-auto"
      />
      <CareersOpenPositions />
      <Footer />
    </div>
  );
}
