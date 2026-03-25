import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import SupportHero from "@/components/support/SupportHero";
import SupportCards from "@/components/support/SupportCards";
import FAQContainer from "@/components/support/FAQContainer";
import SupportActions from "@/components/support/SupportActions";
import { useState, useEffect } from "react";

export default function SupportPage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle(t('support.pageTitle'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <TopBanner />
      </div>
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <SupportHero />
        <SupportCards />
        <FAQContainer />
        <SupportActions />
      </div>

      <Footer />
    </div>
  );
}
