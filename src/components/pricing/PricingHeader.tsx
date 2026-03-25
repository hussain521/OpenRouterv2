import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function PricingHeader() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8 lg:mb-12">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {t("pricing.title")}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
        {t("pricing.subtitle")}
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <Button
          className="bg-[#6467f2] hover:bg-[#5558e6] text-white transition-all duration-200"
          size="lg"
        >
          {t("pricing.getStarted")}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-[#6467f2] text-[#6467f2] hover:bg-[#6467f2] hover:text-white dark:border-[#6467f2] dark:text-[#6467f2] transition-all duration-200"
        >
          {t("pricing.talkToSales")}
        </Button>
      </div>
    </div>
  );
}