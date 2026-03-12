import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiGrid, FiList, FiCopy, FiSearch, FiLayers } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ModelsSidebar from "@/components/models-sidebar";
import ModelCard from "@/components/model-card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ModelsPage() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [sortBy, setSortBy] = useState<string>("most-popular");

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100 overflow-hidden">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <ModelsSidebar />

        <main className="flex-1 p-4 lg:p-8 space-y-4 lg:space-y-6 overflow-y-auto ml-0 lg:ml-[260px]">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h1 className="text-2xl font-bold">{t("modelsPage.models", "Models")}</h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder={t("common.search")}
                  className="w-full sm:w-64 pl-10 dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1 sm:flex-none dark:border-gray-700 dark:hover:bg-gray-800">
                  <FiLayers className="mr-2 h-4 w-4" />
                  {t("modelsPage.compare", "Compare")}
                </Button>
                <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-md">
                  <Button
                    variant={viewMode === "card" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("card")}
                    className="dark:hover:bg-gray-700"
                  >
                    <FiGrid />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                    className="dark:hover:bg-gray-700"
                  >
                    <FiList />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Models Count and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("modelsPage.modelsCount", { count: 639 })}</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px] dark:border-gray-700 dark:bg-gray-900">
                <SelectValue placeholder={t("modelsPage.sortOptions.mostPopular")} />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                <SelectItem value="most-popular">{t("modelsPage.sortOptions.mostPopular")}</SelectItem>
                <SelectItem value="newest">{t("modelsPage.sortOptions.newest")}</SelectItem>
                <SelectItem value="top-weekly">{t("modelsPage.sortOptions.topWeekly")}</SelectItem>
                <SelectItem value="pricing-low-high">{t("modelsPage.sortOptions.pricingLowHigh")}</SelectItem>
                <SelectItem value="pricing-high-low">{t("modelsPage.sortOptions.pricingHighLow")}</SelectItem>
                <SelectItem value="context-high-low">{t("modelsPage.sortOptions.contextHighLow")}</SelectItem>
                <SelectItem value="throughput-high-low">{t("modelsPage.sortOptions.throughputHighLow")}</SelectItem>
                <SelectItem value="latency-low-high">{t("modelsPage.sortOptions.latencyLowHigh")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Models List */}
          {viewMode === "card" ? (
            <div className="space-y-4">
              <ModelCard />
              <ModelCard />
              <ModelCard />
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              {/* Table Header */}
              <div className="min-w-[800px] grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                <div className="col-span-3">{t("modelsPage.table.modelName")}</div>
                <div className="col-span-2">{t("modelsPage.table.weeklyTokens")}</div>
                <div className="col-span-2">{t("modelsPage.table.inputPrice")}</div>
                <div className="col-span-2">{t("modelsPage.table.outputPrice")}</div>
                <div className="col-span-2">{t("modelsPage.table.context")}</div>
                <div className="col-span-1">{t("modelsPage.table.released")}</div>
              </div>
              {/* Table Rows */}
              <div className="space-y-0 min-w-[800px]">
                <ModelTableRow
                  name="ByteDance Seed: Seed-2.0-Lite"
                  modelId="bytedance-seed/seed-2.0-lite"
                  weeklyTokens="76.4M"
                  inputPrice="$0.25"
                  outputPrice="$2"
                  context="262,144"
                  released="Mar 10, 2026"
                  favicon="bytedance-seed"
                />
                <ModelTableRow
                  name="Qwen: Qwen3.5-9B"
                  modelId="qwen/qwen3.5-9b"
                  weeklyTokens="906M"
                  inputPrice="$0.10"
                  outputPrice="$0.15"
                  context="262,144"
                  released="Mar 10, 2026"
                  favicon="qwen"
                />
                <ModelTableRow
                  name="OpenAI: GPT-4o"
                  modelId="openai/gpt-4o"
                  weeklyTokens="1.2B"
                  inputPrice="$5.00"
                  outputPrice="$15.00"
                  context="128,000"
                  released="May 13, 2024"
                  favicon="openai"
                />
                <ModelTableRow
                  name="Anthropic: Claude 3.5 Sonnet"
                  modelId="anthropic/claude-3.5-sonnet"
                  weeklyTokens="2.8B"
                  inputPrice="$3.00"
                  outputPrice="$15.00"
                  context="200,000"
                  released="Jun 20, 2024"
                  favicon="anthropic"
                />
                <ModelTableRow
                  name="Google: Gemini 2.0 Flash"
                  modelId="google/gemini-2.0-flash"
                  weeklyTokens="1.5B"
                  inputPrice="$0.10"
                  outputPrice="$0.40"
                  context="1,048,576"
                  released="Dec 11, 2024"
                  favicon="google"
                />
                <ModelTableRow
                  name="Meta: Llama 3.1 405B"
                  modelId="meta/llama-3.1-405b"
                  weeklyTokens="850M"
                  inputPrice="$0.80"
                  outputPrice="$0.80"
                  context="131,072"
                  released="Jul 23, 2024"
                  favicon="meta"
                />
                <ModelTableRow
                  name="Mistral: Mistral Large 2"
                  modelId="mistral/mistral-large-2"
                  weeklyTokens="420M"
                  inputPrice="$2.00"
                  outputPrice="$6.00"
                  context="131,072"
                  released="Jul 24, 2024"
                  favicon="mistral"
                />
                <ModelTableRow
                  name="Cohere: Command R+"
                  modelId="cohere/command-r-plus"
                  weeklyTokens="380M"
                  inputPrice="$2.50"
                  outputPrice="$10.00"
                  context="128,000"
                  released="Mar 27, 2024"
                  favicon="cohere"
                />
                <ModelTableRow
                  name="AI21: Jamba 1.5 Large"
                  modelId="ai21/jamba-1.5-large"
                  weeklyTokens="290M"
                  inputPrice="$2.00"
                  outputPrice="$8.00"
                  context="256,000"
                  released="Oct 15, 2024"
                  favicon="ai21"
                />
                <ModelTableRow
                  name="DeepSeek: DeepSeek V3"
                  modelId="deepseek/deepseek-v3"
                  weeklyTokens="1.1B"
                  inputPrice="$0.27"
                  outputPrice="$1.10"
                  context="64,000"
                  released="Dec 26, 2024"
                  favicon="deepseek"
                />
                <ModelTableRow
                  name="xAI: Grok 2"
                  modelId="xai/grok-2"
                  weeklyTokens="650M"
                  inputPrice="$2.00"
                  outputPrice="$10.00"
                  context="131,072"
                  released="Aug 13, 2024"
                  favicon="xai"
                />
                <ModelTableRow
                  name="01.AI: Yi-Lightning"
                  modelId="01.ai/yi-lightning"
                  weeklyTokens="180M"
                  inputPrice="$0.20"
                  outputPrice="$0.20"
                  context="16,384"
                  released="Sep 5, 2024"
                  favicon="01.ai"
                />
                <ModelTableRow
                  name="Moonshot AI: Kimi K2"
                  modelId="moonshotai/kimi-k2"
                  weeklyTokens="520M"
                  inputPrice="$0.30"
                  outputPrice="$1.20"
                  context="128,000"
                  released="Nov 8, 2024"
                  favicon="moonshot"
                />
              </div>
            </div>
          )}

          <Footer />
        </main>
      </div>
    </div>
  );
}

function ModelTableRow({ name, modelId, weeklyTokens, inputPrice, outputPrice, context, released, favicon }: {
  name: string;
  modelId: string;
  weeklyTokens: string;
  inputPrice: string;
  outputPrice: string;
  context: string;
  released: string;
  favicon: string;
}) {
  return (
    <div className="min-w-[800px] grid grid-cols-12 gap-4 text-sm border-b border-gray-200 dark:border-gray-700 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
      <div className="col-span-3 flex items-center gap-2 min-w-0">
        <img
          src={`/${favicon}.png`}
          alt={name.split(":")[0]}
          className="w-5 h-5 rounded flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/vite.svg";
          }}
        />
        <div className="relative group/name cursor-pointer inline-flex items-center gap-2 min-w-0">
          <span className="font-medium hover:underline text-gray-900 dark:text-gray-100 truncate">{name}</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 opacity-0 group-hover/name:opacity-100 transition-opacity flex-shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 dark:hover:bg-gray-700"
                    onClick={() => navigator.clipboard.writeText(modelId)}
                  >
                    <FiCopy className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-gray-800 dark:border-gray-700">
                  <p>Copy model id: {modelId}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="col-span-2 text-gray-600 dark:text-gray-400 truncate">{weeklyTokens}</div>
      <div className="col-span-2 text-gray-600 dark:text-gray-400 truncate">{inputPrice}</div>
      <div className="col-span-2 text-gray-600 dark:text-gray-400 truncate">{outputPrice}</div>
      <div className="col-span-2 text-gray-600 dark:text-gray-400 truncate">{context}</div>
      <div className="col-span-1 text-gray-600 dark:text-gray-400 truncate">{released}</div>
    </div>
  );
}
