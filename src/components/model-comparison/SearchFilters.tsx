import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronDown, X } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedInputModalities: string[];
  setSelectedInputModalities: (modalities: string[]) => void;
  selectedOutputModalities: string[];
  setSelectedOutputModalities: (modalities: string[]) => void;
  selectedPricingFilter: string;
  setSelectedPricingFilter: (filter: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

const modalities = ["text", "image", "embeddings", "audio", "video"];

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedInputModalities,
  setSelectedInputModalities,
  selectedOutputModalities,
  setSelectedOutputModalities,
  selectedPricingFilter,
  setSelectedPricingFilter,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}: SearchFiltersProps) {
  const { t } = useTranslation();
  const [inputDropdownOpen, setInputDropdownOpen] = useState(false);
  const [outputDropdownOpen, setOutputDropdownOpen] = useState(false);
  const inputDropdownRef = useRef<HTMLDivElement>(null);
  const outputDropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleInputModality = (modality: string) => {
    setSelectedInputModalities(
      selectedInputModalities.includes(modality)
        ? selectedInputModalities.filter((m) => m !== modality)
        : [...selectedInputModalities, modality]
    );
  };

  const toggleOutputModality = (modality: string) => {
    setSelectedOutputModalities(
      selectedOutputModalities.includes(modality)
        ? selectedOutputModalities.filter((m) => m !== modality)
        : [...selectedOutputModalities, modality]
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

  return (
    <div className="space-y-4">
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
                      checked={selectedOutputModalities.includes(modality)}
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
                selectedPricingFilter === "free" ? "" : "free"
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
    </div>
  );
}