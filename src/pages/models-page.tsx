import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiGrid, FiList, FiCopy, FiSearch, FiLayers, FiFilter } from "react-icons/fi";
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
import { useModels } from "@/context/ModelsContext";

export default function ModelsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { filteredModels, filters, sortBy, setSearchQuery, setSortBy } = useModels();
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-foreground">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex pt-16 min-h-screen relative">
        <ModelsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-5 lg:space-y-6 overflow-y-auto lg:ml-[260px] min-h-0">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              {/* Filter button for mobile */}
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden h-9 w-9 dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() => setSidebarOpen(true)}
              >
                <FiFilter className="h-4 w-4" />
              </Button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{t("modelsPage.models", "Models")}</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:flex-none min-w-0">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t("common.search")}
                  value={filters.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 lg:w-64 pl-9 h-9 sm:h-10 text-sm dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-xs sm:text-sm px-3 sm:px-4 h-9 sm:h-10 dark:border-gray-700 dark:hover:bg-gray-800"
                  onClick={() => navigate('/compare')}
                >
                  <FiLayers className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{t("modelsPage.compare", "Compare")}</span>
                  <span className="sm:hidden">{t("modelsPage.compare", "Compare")}</span>
                </Button>
                <div className="flex items-center gap-0.5 sm:gap-1 border border-gray-200 dark:border-gray-700 rounded-md p-0.5">
                  <Button
                    variant={viewMode === "card" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("card")}
                    className="h-8 w-8 sm:h-9 sm:w-9 dark:hover:bg-gray-700"
                  >
                    <FiGrid className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("table")}
                    className="h-8 w-8 sm:h-9 sm:w-9 dark:hover:bg-gray-700"
                  >
                    <FiList className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Models Count and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t("modelsPage.modelsCount", { count: filteredModels.length })}</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] lg:w-[200px] text-sm h-9 sm:h-10 dark:border-gray-700 dark:bg-gray-900">
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
            <div className="space-y-3 sm:space-y-4">
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
              {filteredModels.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t("modelsPage.noModelsFound")}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              {/* Table Header */}
              <div className="min-w-[320px] sm:min-w-[600px] lg:min-w-[800px] grid grid-cols-8 sm:grid-cols-12 gap-1 sm:gap-2 lg:gap-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2 px-3 sm:px-4 lg:px-6 pt-3">
                <div className="col-span-3 sm:col-span-4 lg:col-span-3">{t("modelsPage.table.modelName")}</div>
                <div className="col-span-2 sm:col-span-2">{t("modelsPage.table.weeklyTokens")}</div>
                <div className="col-span-1 sm:col-span-2">{t("modelsPage.table.inputPrice")}</div>
                <div className="col-span-1 sm:col-span-2">{t("modelsPage.table.outputPrice")}</div>
                <div className="col-span-1 sm:col-span-2">{t("modelsPage.table.context")}</div>
                <div className="hidden sm:block sm:col-span-0 lg:col-span-1">{t("modelsPage.table.released")}</div>
              </div>
              {/* Table Rows */}
              <div className="space-y-0 min-w-[320px] sm:min-w-[600px] lg:min-w-[800px]">
                {filteredModels.map((model) => (
                  <ModelTableRow
                    key={model.id}
                    name={`${model.provider}: ${model.name}`}
                    modelId={model.modelId}
                    weeklyTokens={model.weeklyTokens}
                    inputPrice={`$${model.inputPrice.toFixed(2)}`}
                    outputPrice={`$${model.outputPrice.toFixed(2)}`}
                    context={model.context.toLocaleString()}
                    released={model.released.toLocaleDateString()}
                    favicon={model.favicon}
                  />
                ))}
                {filteredModels.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {t("modelsPage.noModelsFound")}
                    </p>
                  </div>
                )}
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
    <div className="min-w-[700px] sm:min-w-[800px] grid grid-cols-12 gap-2 sm:gap-4 text-xs sm:text-sm border-b border-gray-200 dark:border-gray-700 py-2 sm:py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
      <div className="col-span-4 sm:col-span-3 flex items-center gap-1.5 sm:gap-2 min-w-0">
        <img
          src={`/${favicon}.png`}
          alt={name.split(":")[0]}
          className="w-4 h-4 sm:w-5 sm:h-5 rounded flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/vite.svg";
          }}
        />
        <div className="relative group/name cursor-pointer inline-flex items-center gap-1 sm:gap-2 min-w-0">
          <span className="font-medium hover:underline text-gray-900 dark:text-gray-100 truncate text-xs sm:text-sm">{name}</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 opacity-0 group-hover/name:opacity-100 transition-opacity flex-shrink-0 hidden sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 sm:h-6 sm:w-6 dark:hover:bg-gray-700"
                    onClick={() => navigator.clipboard.writeText(modelId)}
                  >
                    <FiCopy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-gray-800 dark:border-gray-700">
                  <p className="text-xs">Copy model id: {modelId}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-2 text-gray-600 dark:text-gray-400 truncate text-xs sm:text-sm">{weeklyTokens}</div>
      <div className="col-span-1 sm:col-span-2 text-gray-600 dark:text-gray-400 truncate text-xs sm:text-sm">{inputPrice}</div>
      <div className="col-span-1 sm:col-span-2 text-gray-600 dark:text-gray-400 truncate text-xs sm:text-sm">{outputPrice}</div>
      <div className="col-span-1 sm:col-span-2 text-gray-600 dark:text-gray-400 truncate text-xs sm:text-sm">{context}</div>
      <div className="hidden sm:block sm:col-span-0 lg:col-span-1 text-gray-600 dark:text-gray-400 truncate text-xs sm:text-sm">{released}</div>
    </div>
  );
}
