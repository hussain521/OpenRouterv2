import { useTranslation } from "react-i18next";
import { usePricingData } from "@/hooks/usePricingData";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PricingTable() {
  const { t } = useTranslation();
  const features = usePricingData();

  return (
    <div className="bg-white dark:bg-black rounded-xl overflow-hidden mb-8">
      {/* Mobile Card Layout */}
      <div className="block lg:hidden">
        <div className="space-y-4 p-4 sm:p-6">
          {/* Free Plan */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 sm:p-6 bg-gray-50 dark:bg-black">
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
              {t("pricing.plans.free")}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 gap-1 sm:gap-0"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t(feature.nameKey)}
                  </span>
                  <div className="flex items-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      )
                    ) : (
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                        {feature.free}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pay-as-you-go Plan */}
          <div className="border-2 border-[#6467f2] rounded-lg p-4 sm:p-6 bg-blue-50 dark:bg-black relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#6467f2] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {t("common.popular", "Popular")}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white pt-2">
              {t("pricing.plans.payAsYouGo")}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 gap-1 sm:gap-0"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t(feature.nameKey)}
                  </span>
                  <div className="flex items-center">
                    {typeof feature.pay === "boolean" ? (
                      feature.pay ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      )
                    ) : (
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                        {feature.pay}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 sm:p-6 bg-gray-50 dark:bg-black">
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
              {t("pricing.plans.enterprise")}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0 gap-1 sm:gap-0"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t(feature.nameKey)}
                  </span>
                  <div className="flex items-center">
                    {typeof feature.enterprise === "boolean" ? (
                      feature.enterprise ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      )
                    ) : (
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                        {feature.enterprise}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-black h-[60px]">
              <TableHead className="w-[300px] font-semibold text-gray-900 dark:text-gray-100"></TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100">
                {t("pricing.plans.free")}
              </TableHead>
              <TableHead className="text-center bg-blue-50 dark:bg-black font-semibold text-gray-900 dark:text-gray-100 relative">
                {t("pricing.plans.payAsYouGo")}
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100">
                {t("pricing.plans.enterprise")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {features.map((feature, i) => (
              <TableRow
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <TableCell className="font-medium text-gray-900 dark:text-gray-100 py-4">
                  {t(feature.nameKey)}
                </TableCell>

                <TableCell className="text-center py-4">
                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <Check className="mx-auto text-green-600 w-5 h-5" />
                    ) : (
                      <X className="mx-auto text-gray-400 w-5 h-5" />
                    )
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      {feature.free}
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-center bg-blue-50 dark:bg-black py-4">
                  {typeof feature.pay === "boolean" ? (
                    feature.pay ? (
                      <Check className="mx-auto text-green-600 w-5 h-5" />
                    ) : (
                      <X className="mx-auto text-gray-400 w-5 h-5" />
                    )
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      {feature.pay}
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-center py-4">
                  {typeof feature.enterprise === "boolean" ? (
                    feature.enterprise ? (
                      <Check className="mx-auto text-green-600 w-5 h-5" />
                    ) : (
                      <X className="mx-auto text-gray-400 w-5 h-5" />
                    )
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      {feature.enterprise}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}