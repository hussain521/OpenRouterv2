import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

interface BuyCreditsSectionProps {
  onAddCredits: () => void;
  onViewUsage: () => void;
}

export function BuyCreditsSection({
  onAddCredits,
  onViewUsage,
}: BuyCreditsSectionProps) {
  const { t } = useTranslation();
  const [useCrypto, setUseCrypto] = useState(false);

  return (
    <div className="space-y-0">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {t("credits.buyCredits")}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
          <span>{t("credits.useCrypto")}</span>
          <Switch
            checked={useCrypto}
            onCheckedChange={setUseCrypto}
            className="data-[state=unchecked]:bg-gray-200"
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <Button
          className="h-10 w-full rounded-md bg-[#4F46E5] text-[13px] font-medium text-white shadow-sm hover:bg-[#4338CA]"
          onClick={onAddCredits}
        >
          {t("credits.addCredits")}
        </Button>

        <div className="mt-3 space-y-1">
          <button
            type="button"
            onClick={onViewUsage}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] dark:text-[#6366F1] hover:underline underline-offset-2"
          >
            <span>{t("credits.viewUsage")}</span>
            <ExternalLink className="h-3 w-3" />
          </button>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {t("credits.needInvoicing")}{" "}
            <a
              href="#"
              className="text-[11px] text-[#4F46E5] dark:text-[#6366F1] hover:underline underline-offset-2"
            >
              {t("credits.contactSales")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}