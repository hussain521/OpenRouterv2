import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface ModelCardProps {
  logo: React.ReactNode;
  name: string;
  provider: string;
  badge?: string;
  tokens: string;
  trend: string;
}

export default function ModelCard({
  logo,
  name,
  provider,
  badge,
  tokens,
  trend,
}: ModelCardProps) {
  const { t } = useTranslation();
  const isPositive = trend.startsWith("+");

  return (
    <Card className="group rounded-2xl border border-gray-200 dark:border-border bg-white dark:bg-card shadow-sm hover:shadow-md transition-all duration-300 p-0 cursor-pointer h-full">
      <CardContent className="p-3 sm:p-4 lg:p-6 h-full flex flex-col">
        {/* Top Info */}
        <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-100 dark:bg-muted flex items-center justify-center flex-shrink-0">
            {logo}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start sm:items-center gap-2 flex-col sm:flex-row">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg leading-tight dark:text-white line-clamp-2 sm:line-clamp-1">
                {name}
              </h3>
              {badge && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 dark:text-gray-200 px-1.5 sm:px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0 self-start">
                  {badge}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-tight">
              {t("common.by")} {provider}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-3 sm:my-4 lg:my-6" />

        {/* Stats */}
        <div className="flex justify-between text-xs sm:text-sm mt-auto">
          <div className="min-w-0 flex-1">
            <p className="text-gray-500 dark:text-gray-400 mb-1">{t("modelCard.tokens")}</p>
            <p className="font-semibold text-gray-900 dark:text-white truncate">{tokens}</p>
          </div>

          <div className="text-right min-w-0 flex-1">
            <p className="text-gray-500 dark:text-gray-400 mb-1">{t("modelCard.weeklyTrend")}</p>
            <p
              className={`font-semibold truncate ${
                isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
