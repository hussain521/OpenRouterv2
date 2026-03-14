import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/components/ui/dialog";
import { Plus, Search, ChevronDown, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useModels, type Model } from "@/context/ModelsContext";

export default function ModelComparisonPage() {
  const { t } = useTranslation();
  const slots = [1, 2, 3];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInputModalities, setSelectedInputModalities] = useState<
    string[]
  >([]);
  const [selectedOutputModalities, setSelectedOutputModalities] = useState<
    string[]
  >([]);
  const [selectedPricingFilter, setSelectedPricingFilter] =
    useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [inputDropdownOpen, setInputDropdownOpen] = useState(false);
  const [outputDropdownOpen, setOutputDropdownOpen] = useState(false);
  const inputDropdownRef = useRef<HTMLDivElement>(null);
  const outputDropdownRef = useRef<HTMLDivElement>(null);
  const { models } = useModels();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputDropdownRef.current && !inputDropdownRef.current.contains(event.target as Node)) {
        setInputDropdownOpen(false);
      }
      if (outputDropdownRef.current && !outputDropdownRef.current.contains(event.target as Node)) {
        setOutputDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const modalities = ["text", "image", "embeddings", "audio", "video"];

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

  const toggleInputModality = (modality: string) => {
    setSelectedInputModalities((prev) =>
      prev.includes(modality)
        ? prev.filter((m) => m !== modality)
        : [...prev, modality],
    );
  };

  const toggleOutputModality = (modality: string) => {
    setSelectedOutputModalities((prev) =>
      prev.includes(modality)
        ? prev.filter((m) => m !== modality)
        : [...prev, modality],
    );
  };

  const clearInputModalities = () => {
    setSelectedInputModalities([]);
  };

  const clearOutputModalities = () => {
    setSelectedOutputModalities([]);
  };

  const clearPricingFilter = () => {
    setSelectedPricingFilter("");
  };

  const handleModelSelect = (model: Model) => {
    // Here you would add logic to add the selected model to comparison
    console.log("Selected model:", model);
    setDialogOpen(false);
  };

  const handleCardClick = () => {
    console.log("Card clicked, opening dialog");
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-foreground max-w-7xl mx-auto">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="pt-16 min-h-screen">
        <div className="p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">{t('modelComparison.title')}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t('modelComparison.subtitle')}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map((slot) => (
              <Card
                key={slot}
                className="h-[420px] border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/40 transition"
                onClick={handleCardClick}
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Plus className="w-6 h-6" />
                  <span className="text-sm">{t('modelComparison.addModel')}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Footer />
      </main>

      {/* Add Model Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        className="z-[60]"
      >
        <DialogContent
          className="max-w-lg max-h-[85vh] overflow-y-auto relative z-[70]"
          onClose={() => setDialogOpen(false)}
          showCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle>{t('modelComparison.selectModelDialog.title')}</DialogTitle>
          </DialogHeader>

          <DialogBody className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t('modelComparison.selectModelDialog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {/* Input Modalities Dropdown */}
              <div className="relative" ref={inputDropdownRef}>
                <Button
                  variant={
                    selectedInputModalities.length > 0 ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setInputDropdownOpen(!inputDropdownOpen)}
                  className="flex items-center gap-1"
                >
                  {t('modelComparison.selectModelDialog.inputModalities')}
                  <ChevronDown className="w-3 h-3" />
                </Button>

                {inputDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                    <div className="p-2 space-y-1">
                      {modalities.map((modality) => (
                        <label
                          key={modality}
                          className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedInputModalities.includes(modality)}
                            onChange={() => toggleInputModality(modality)}
                            className="w-3 h-3"
                          />
                          <span className="text-sm capitalize">{modality}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {selectedInputModalities.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearInputModalities}
                    className="ml-1 h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Output Modalities Dropdown */}
              <div className="relative" ref={outputDropdownRef}>
                <Button
                  variant={
                    selectedOutputModalities.length > 0 ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setOutputDropdownOpen(!outputDropdownOpen)}
                  className="flex items-center gap-1"
                >
                  {t('modelComparison.selectModelDialog.outputModalities')}
                  <ChevronDown className="w-3 h-3" />
                </Button>

                {outputDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                    <div className="p-2 space-y-1">
                      {modalities.map((modality) => (
                        <label
                          key={modality}
                          className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedOutputModalities.includes(
                              modality,
                            )}
                            onChange={() => toggleOutputModality(modality)}
                            className="w-3 h-3"
                          />
                          <span className="text-sm capitalize">{modality}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {selectedOutputModalities.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearOutputModalities}
                    className="ml-1 h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Free Pricing Filter */}
              <div className="flex items-center gap-1">
                <Button
                  variant={
                    selectedPricingFilter === "free" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setSelectedPricingFilter(
                      selectedPricingFilter === "free" ? "" : "free",
                    )
                  }
                >
                  {t('modelComparison.selectModelDialog.free')}
                </Button>

                {selectedPricingFilter === "free" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearPricingFilter}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Date Filters */}
            <div className="flex gap-2">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t('modelComparison.selectModelDialog.monthFilter')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('modelComparison.selectModelDialog.allMonths')}</SelectItem>
                  <SelectItem value="1">{t('modelComparison.selectModelDialog.months.january')}</SelectItem>
                  <SelectItem value="2">{t('modelComparison.selectModelDialog.months.february')}</SelectItem>
                  <SelectItem value="3">{t('modelComparison.selectModelDialog.months.march')}</SelectItem>
                  <SelectItem value="4">{t('modelComparison.selectModelDialog.months.april')}</SelectItem>
                  <SelectItem value="5">{t('modelComparison.selectModelDialog.months.may')}</SelectItem>
                  <SelectItem value="6">{t('modelComparison.selectModelDialog.months.june')}</SelectItem>
                  <SelectItem value="7">{t('modelComparison.selectModelDialog.months.july')}</SelectItem>
                  <SelectItem value="8">{t('modelComparison.selectModelDialog.months.august')}</SelectItem>
                  <SelectItem value="9">{t('modelComparison.selectModelDialog.months.september')}</SelectItem>
                  <SelectItem value="10">{t('modelComparison.selectModelDialog.months.october')}</SelectItem>
                  <SelectItem value="11">{t('modelComparison.selectModelDialog.months.november')}</SelectItem>
                  <SelectItem value="12">{t('modelComparison.selectModelDialog.months.december')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t('modelComparison.selectModelDialog.yearFilter')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('modelComparison.selectModelDialog.allYears')}</SelectItem>
                  <SelectItem value="2024">{t('modelComparison.selectModelDialog.years.2024')}</SelectItem>
                  <SelectItem value="2025">{t('modelComparison.selectModelDialog.years.2025')}</SelectItem>
                  <SelectItem value="2026">{t('modelComparison.selectModelDialog.years.2026')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
    </div>
  );
}
