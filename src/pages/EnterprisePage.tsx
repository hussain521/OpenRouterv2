import { useTranslation } from "react-i18next";
import { usePageTitle } from "@/hooks/usePageTitle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { useState, useEffect } from "react";
import EnterpriseHero from "@/components/enterprise/EnterpriseHero";
import EnterpriseCustomerLogos from "@/components/enterprise/EnterpriseCustomerLogos";
import EnterpriseFeaturesComparison from "@/components/enterprise/EnterpriseFeaturesComparison";
import EnterpriseFromPocToProd from "@/components/enterprise/EnterpriseFromPocToProd";
import EnterpriseInfrastructure from "@/components/enterprise/EnterpriseInfrastructure";
import EnterpriseAgreements from "@/components/enterprise/EnterpriseAgreements";
import EnterpriseBilling from "@/components/enterprise/EnterpriseBilling";
import EnterpriseCTA from "@/components/enterprise/EnterpriseCTA";

export default function EnterprisePage() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  usePageTitle("Enterprise - OpenRouter");

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Enterprise Hero Section */}
        <EnterpriseHero />

        {/* Customer Logos Section */}
        <div className="mt-16 lg:mt-20">
          <EnterpriseCustomerLogos />
        </div>

        {/* Features Comparison Section */}
        <div className="mt-16 lg:mt-20">
          <EnterpriseFeaturesComparison />
        </div>

        {/* From Proof-of-Concept to Production Section */}
        <div className="mt-16 lg:mt-20">
          <EnterpriseFromPocToProd />
        </div>

        {/* Enterprise-Grade AI Infrastructure Section */}
        <div className="mt-16 lg:mt-20">
          <EnterpriseInfrastructure />
        </div>

        {/* Enterprise Agreements Section */}
        <div className="mt-16 lg:mt-20">
          <EnterpriseAgreements />
        </div>

        {/* Simple Setup & Billing Section */}
        <div className="mt-16 lg:mt-20">
          <EnterpriseBilling />
        </div>

        {/* Ready to Transform CTA Section */}
        <div className="mt-16 lg:mt-20">
          <EnterpriseCTA />
        </div>
      </div>

      <Footer />
    </div>
  );
}
      
