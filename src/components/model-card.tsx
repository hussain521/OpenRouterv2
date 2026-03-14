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
import type { Model } from "@/context/ModelsContext";

interface ModelCardProps {
  model: Model;
}

export default function ModelCard({ model }: ModelCardProps) {
  const { t } = useTranslation();

  const formatPrice = (input: number, output: number) => {
    if (input === 0 && output === 0) return "Free";
    if (input < 1) return `$${input.toFixed(3)}`;
    return `$${input.toFixed(2)}`;
  };

  const formatContext = (context: number) => {
    if (context >= 1000000) {
      return `${(context / 1000000).toFixed(1)}M`;
    } else if (context >= 1000) {
      return `${(context / 1000).toFixed(0)}K`;
    }
    return context.toString();
  };

  // Deterministic category mapping
  const categoryColorMap: Record<string, { color: string; count: number }> = {
    coding: { color: "bg-blue-500", count: 45 },
    academia: { color: "bg-green-500", count: 32 },
    finance: { color: "bg-yellow-500", count: 28 },
    legal: { color: "bg-purple-500", count: 19 },
    marketing: { color: "bg-orange-500", count: 25 },
    health: { color: "bg-red-500", count: 22 },
    roleplay: { color: "bg-pink-500", count: 15 },
  };

  const getCategoryData = (category: string) => {
    return categoryColorMap[category] || { color: "bg-gray-500", count: 10 };
  };

  return (
    <Card className="p-6 flex flex-col gap-4 border-none shadow-none dark:bg-card border-b rounded-none w-full">
      <div className="flex justify-between items-start w-full">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <img
              src={`/${model.favicon}.png`}
              alt={model.provider}
              className="w-5 h-5 rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/vite.svg";
              }}
            />
            <div className="relative group/name cursor-pointer inline-flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground hover:underline">
                {model.provider}: {model.name}
              </h3>
              <div className="absolute left-full top-1/2 -translate-y-1/2 opacity-0 group-hover/name:opacity-100 transition-opacity">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => navigator.clipboard.writeText(model.modelId)}
                      >
                        <FiCopy className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy model id: {model.modelId}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          <ModelCategoryTags categories={model.categories.map(category => {
            const categoryData = getCategoryData(category);
            return {
              nameKey: category,
              count: categoryData.count,
              color: categoryData.color
            };
          })} />
          <p className="text-sm text-muted-foreground">
            {model.series} model supporting {model.inputModalities.join(", ")} input and {model.outputModalities.join(", ")} output.
          </p>

          <div className="text-xs text-muted-foreground flex gap-4 pt-2">
            <span>{model.released.toLocaleDateString()}</span>
            <span>{formatContext(model.context)} {t("modelCard.contextLabel", "context")}</span>
            <span>{formatPrice(model.inputPrice, model.outputPrice)} {t("modelCard.pricingLabel", "pricing")}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">{model.weeklyTokens} {t("modelCard.tokensLabel", "tokens")}</div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
            <FiHeart />
          </Button>
        </div>
      </div>
    </Card>
  );
}
