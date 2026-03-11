import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiHeart, FiCopy } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import ModelCategoryTags from "@/components/model-category-tags";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ModelCard() {
  const { t } = useTranslation();
  const modelId = "bytedance-seed/seed-2.0-lite";

  return (
    <Card className="p-6 flex flex-col gap-4 border-none shadow-none dark:bg-card border-b rounded-none w-full">
      <div className="flex justify-between items-start w-full">
        <div className="space-y-2 flex-1">
          <div className="relative group/name cursor-pointer inline-flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground hover:underline">ByteDance Seed: Seed-2.0-Lite</h3>
            <div className="absolute left-full top-1/2 -translate-y-1/2 opacity-0 group-hover/name:opacity-100 transition-opacity">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => navigator.clipboard.writeText(modelId)}
                    >
                      <FiCopy className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy model id: {modelId}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <ModelCategoryTags />
          <p className="text-sm text-muted-foreground">
            Seed-2.0-Lite is a balanced model designed for high-frequency
            enterprise workloads, optimizing both capability and cost.
          </p>


          <div className="text-xs text-muted-foreground flex gap-4 pt-2">
            <span>Mar 10, 2026</span>
            <span>262K {t("modelCard.contextLabel")}</span>
            <span>$0.25 {t("modelCard.pricingLabel")}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">73.8M {t("modelCard.tokensLabel")}</div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
            <FiHeart />
          </Button>
        </div>
      </div>
    </Card>
  );
}
