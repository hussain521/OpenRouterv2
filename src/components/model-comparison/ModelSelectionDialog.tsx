import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { useModels, type Model } from "@/context/ModelsContext";
import { SearchFilters } from "./SearchFilters";

interface ModelSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onModelSelect: (model: Model) => void;
}

export function ModelSelectionDialog({
  open,
  onOpenChange,
  onModelSelect,
}: ModelSelectionDialogProps) {
  const { t } = useTranslation();
  const { models } = useModels();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInputModalities, setSelectedInputModalities] = useState<string[]>([]);
  const [selectedOutputModalities, setSelectedOutputModalities] = useState<string[]>([]);
  const [selectedPricingFilter, setSelectedPricingFilter] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Filter models based on search and filters
  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesInputModalities =
      selectedInputModalities.length === 0 ||
      selectedInputModalities.some((modality) =>
        model.inputModalities.includes(modality),
      );

    const matchesOutputModalities =
      selectedOutputModalities.length === 0 ||
      selectedOutputModalities.some((modality) =>
        model.outputModalities.includes(modality),
      );

    const matchesPricing =
      !selectedPricingFilter || model.pricingTier === selectedPricingFilter;

    const matchesDate =
      selectedMonth === "all" || selectedYear === "all" ||
      !selectedMonth ||
      !selectedYear ||
      (model.released.getMonth() + 1 === parseInt(selectedMonth) &&
        model.released.getFullYear() === parseInt(selectedYear));

    return (
      matchesSearch &&
      matchesInputModalities &&
      matchesOutputModalities &&
      matchesPricing &&
      matchesDate
    );
  });

  const handleModelSelect = (model: Model) => {
    onModelSelect(model);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="z-[60]">
      <DialogContent
        className="max-w-lg max-h-[85vh] overflow-y-auto relative z-[70]"
        onClose={() => onOpenChange(false)}
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle>{t('modelComparison.selectModelDialog.title')}</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedInputModalities={selectedInputModalities}
            setSelectedInputModalities={setSelectedInputModalities}
            selectedOutputModalities={selectedOutputModalities}
            setSelectedOutputModalities={setSelectedOutputModalities}
            selectedPricingFilter={selectedPricingFilter}
            setSelectedPricingFilter={setSelectedPricingFilter}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          {/* Models List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => handleModelSelect(model)}
              >
                <img
                  src={`/${model.favicon}.png`}
                  alt={model.provider}
                  className="w-8 h-8 rounded flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/vite.svg";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {model.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {model.provider}
                  </div>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {model.released.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}

            {filteredModels.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                {t('modelComparison.selectModelDialog.noModelsFound')}
              </div>
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}