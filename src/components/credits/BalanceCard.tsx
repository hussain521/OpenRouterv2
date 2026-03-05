import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface BalanceCardProps {
  balance: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const { t } = useTranslation();
  
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between overflow-hidden border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm   bg-gray-100 dark:bg-zinc-900 px-8 py-6">
        <div className="flex items-baseline gap-2 text-gray-900 dark:text-gray-100">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-3xl font-semibold">{balance.toFixed(2)}</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-white/60",
                "dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-zinc-800",
              )}
            >
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-xs">
              {t("credits.currentBalanceTooltip")}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
