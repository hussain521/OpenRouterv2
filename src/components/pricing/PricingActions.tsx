import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function PricingActions() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 lg:mb-20">
      <Button
        variant="outline"
        size="lg"
        className="border-[#6467f2] text-[#6467f2] hover:bg-[#6467f2] hover:text-white dark:border-[#6467f2] dark:text-[#6467f2] transition-all duration-200"
      >
        {t("pricing.getStartedForFree")}
      </Button>
      <Button
        size="lg"
        className="bg-[#6467f2] hover:bg-[#5558e6] text-white transition-all duration-200"
      >
        {t("pricing.buyCredits")}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="border-[#6467f2] text-[#6467f2] hover:bg-[#6467f2] hover:text-white dark:border-[#6467f2] dark:text-[#6467f2] transition-all duration-200"
      >
        {t("pricing.contactSales")}
      </Button>
    </div>
  );
}