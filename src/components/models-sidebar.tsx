import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FiBox } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FiCode } from "react-icons/fi";
import { FiTag } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import { FiLayers } from "react-icons/fi";
import { FiSliders } from "react-icons/fi";
import { FiServer } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useModels } from "@/context/ModelsContext";
import { ArrowRight } from "lucide-react";
import i18n from "@/lib/i18n";

interface ModelsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ModelsSidebar({ isOpen = false, onClose }: ModelsSidebarProps) {
  const { t } = useTranslation();
  const { models, filters, toggleFilter, updateFilter, resetFilters } = useModels();
  const [inputOpen, setInputOpen] = useState(true);
  const [contextOpen, setContextOpen] = useState(true);
  const [outputOpen, setOutputOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [seriesOpen, setSeriesOpen] = useState(false);
  const [providersOpen, setProvidersOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [parametersOpen, setParametersOpen] = useState(false);
  const [distillableOpen, setDistillableOpen] = useState(false);
  const [providerSearch, setProviderSearch] = useState("");

  const contextSliderValue = useMemo(() => {
    const [minContext] = filters.contextRange;
    const normalizedValue = ((minContext - 4000) / (1048576 - 4000)) * 100;

    if (!Number.isFinite(normalizedValue)) {
      return [0];
    }

    return [Math.min(100, Math.max(0, Math.round(normalizedValue)))];
  }, [filters.contextRange]);

  const handleContextRangeChange = (value: number[]) => {
    const [nextValue = 0] = value;
    const clampedValue = Math.min(100, Math.max(0, nextValue));
    const minContext = 4000 + (clampedValue / 100) * (1048576 - 4000);

    updateFilter("contextRange", [Math.floor(minContext), 1048576]);
  };

  const providers = useMemo(() => {
    const allProviders = models.map((model) => model.provider);
    const uniqueProviders = [...new Set(allProviders)].sort();
    if (!providerSearch) {
      return uniqueProviders;
    }
    return uniqueProviders.filter((provider) =>
      provider.toLowerCase().includes(providerSearch.toLowerCase())
    );
  }, [models, providerSearch]);

  // Check if any filters are active
  const hasActiveFilters =
    filters.searchQuery.trim() !== "" ||
    filters.inputModalities.length > 0 ||
    filters.outputModalities.length > 0 ||
    filters.contextRange[0] !== 4000 || filters.contextRange[1] !== 1048576 ||
    filters.pricingTiers.length > 0 ||
    filters.series.length > 0 ||
    filters.providers.length > 0 ||
    filters.categories.length > 0 ||
    filters.parameters.length > 0 ||
    filters.distillable;
const isRTL = () => {
  return i18n.dir() === "rtl";
};
  // Close sidebar on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        w-[260px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black
        flex flex-col h-[calc(100vh-64px)] fixed top-[64px] left-0 overflow-hidden z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:flex
      `}>
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-3 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        {/* Clear Filters Button */}
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className={`w-full px-4 py-2 text-sm rounded-md transition-colors ${
              hasActiveFilters
                ? "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10"
                : "text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
            }`}
          >
            {t("modelsSidebar.clearFilters")}
            {hasActiveFilters && (
              <span className="mx-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full">
               
                  {t("active")}
              </span>
            )}
          </button>
        </div>

        {/* Input Modalities */}

        <div className="mb-6">
          <button
            onClick={() => setInputOpen(!inputOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiBox />
              {t("modelsSidebar.inputModalities")}
            </div>

           {inputOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>

          {inputOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.inputModalities.includes("text")}
                  onChange={() => toggleFilter('inputModalities', 'text')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.modalities.text")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.inputModalities.includes("image")}
                  onChange={() => toggleFilter('inputModalities', 'image')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.modalities.image")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.inputModalities.includes("file")}
                  onChange={() => toggleFilter('inputModalities', 'file')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.modalities.file")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.inputModalities.includes("audio")}
                  onChange={() => toggleFilter('inputModalities', 'audio')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.modalities.audio")}
              </label>

              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.inputModalities.includes("video")}
                  onChange={() => toggleFilter('inputModalities', 'video')}
                  className="rounded border-gray-300"
                />
                <div className="flex items-center gap-2">
                  {t("modelsSidebar.modalities.video")}
                  <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    {t("common.new")}
                  </span>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Output Modalities */}

        <div className="mb-6">
          <button
            onClick={() => setOutputOpen(!outputOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiBox />
              {t("modelsSidebar.outputModalities")}
            </div>

            {outputOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>

          {outputOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.outputModalities.includes("text")}
                  onChange={() => toggleFilter('outputModalities', 'text')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.modalities.text")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.outputModalities.includes("image")}
                  onChange={() => toggleFilter('outputModalities', 'image')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.modalities.image")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.outputModalities.includes("audio")}
                  onChange={() => toggleFilter('outputModalities', 'audio')}
                  className="rounded border-gray-300"
                />
                <div className="flex items-center gap-2">
                  {t("modelsSidebar.modalities.audio")}
                  <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    {t("common.new")}
                  </span>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Context Length */}

        <div className="mb-6">
          <button
            onClick={() => setContextOpen(!contextOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiCode />
              {t("modelsSidebar.contextLength")}
            </div>

            {contextOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>

          {contextOpen && (
            <div className="mt-4 px-2">
              <Slider
                value={contextSliderValue}
                max={100}
                step={1}
                onValueChange={handleContextRangeChange}
              />

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>{t("modelsSidebar.contextValues.4k", "4K")}</span>
                <span>{t("modelsSidebar.contextValues.64k", "64K")}</span>
                <span>{t("modelsSidebar.contextValues.1m", "1M")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Prompt pricing */}

        <div className="mb-6">
          <button
            onClick={() => setPricingOpen(!pricingOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiDollarSign />
              {t("modelsSidebar.promptPricing")}
            </div>

            {pricingOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>

          {pricingOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.pricingTiers.includes("free")}
                  onChange={() => toggleFilter('pricingTiers', 'free')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.pricing.free", "Free")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.pricingTiers.includes("affordable")}
                  onChange={() => toggleFilter('pricingTiers', 'affordable')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.pricing.range1", "Affordable")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.pricingTiers.includes("mid-range")}
                  onChange={() => toggleFilter('pricingTiers', 'mid-range')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.pricing.range2", "Mid-range")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.pricingTiers.includes("premium")}
                  onChange={() => toggleFilter('pricingTiers', 'premium')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.pricing.range3", "Premium")}
              </label>
            </div>
          )}
        </div>

        {/* Series */}

        <div className="mb-6">
          <button
            onClick={() => setSeriesOpen(!seriesOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiLayers />
              {t("modelsSidebar.seriesTitle")}
            </div>

            {seriesOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>

          {seriesOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.series.includes("gpt4")}
                  onChange={() => toggleFilter('series', 'gpt4')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.series.gpt4", "GPT-4")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.series.includes("claude3")}
                  onChange={() => toggleFilter('series', 'claude3')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.series.claude3", "Claude 3")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.series.includes("geminiPro")}
                  onChange={() => toggleFilter('series', 'geminiPro')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.series.geminiPro", "Gemini Pro")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.series.includes("llama3")}
                  onChange={() => toggleFilter('series', 'llama3')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.series.llama3", "LLaMA 3")}
              </label>
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={filters.series.includes("mistral")}
                  onChange={() => toggleFilter('series', 'mistral')}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.series.mistral", "Mistral")}
              </label>
            </div>
          )}
        </div>

        {/* Providers */}
        <div className="mb-6">
          <button
            onClick={() => setProvidersOpen(!providersOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiServer />
              {t("modelsSidebar.providersTitle")}
            </div>
            {providersOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>
          {providersOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <div className="relative">
                <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-muted-foreground h-3.5 w-3.5" />
                <Input
                  placeholder={t("modelsSidebar.searchProviders" )}
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  className="w-full h-8 pl-8 text-xs dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div className="max-h-40 overflow-y-auto scrollbar-hide pt-2">
                {providers.map((provider) => (
                  <label
                    key={provider}
                  className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.providers.includes(provider)}
                    onChange={() => toggleFilter("providers", provider)}
                    className="rounded border-gray-300"
                  />
                    {provider}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Categories */}

        <div className="mb-6">
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiTag />
              {t("modelsSidebar.categoriesTitle")}
            </div>

            {categoriesOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>

          {categoriesOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              {[
                "academia",
                "finance",
                "health",
                "legal",
                "marketing",
                "coding",
                "roleplay",
              ].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleFilter("categories", category)}
                    className="rounded border-gray-300"
                  />
                  {t(`modelsSidebar.categories.${category}`)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Supported Parameters */}

        <div className="mb-6">
          <button
            onClick={() => setParametersOpen(!parametersOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiSliders />
              {t("modelsSidebar.supportedParameters")}
            </div>

            {parametersOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>

          {parametersOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              {[
                "temperature",
                "topP",
                "topK",
                "maxTokens",
                "frequencyPenalty",
                "presencePenalty",
              ].map((param) => (
                <label
                  key={param}
                  className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.parameters.includes(param)}
                    onChange={() => toggleFilter("parameters", param)}
                    className="rounded border-gray-300"
                  />
                  {t(`modelsSidebar.parameters.${param}`)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Distillable */}

        <div className="mb-6">
           <button
            onClick={() => setDistillableOpen(!distillableOpen)}
            className="flex items-center justify-between w-full font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FiCode />
              {t("modelsSidebar.distillable", "Distillable")}
              <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {t("common.new")}
              </span>
            </div>
            {distillableOpen ? (
  <FiChevronDown />
) : (
  <ArrowRight size={16} className={isRTL() ? "rotate-180" : ""} />
)}
          </button>
          {distillableOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <label className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={!!filters.distillable}
                  onChange={() => updateFilter('distillable', !filters.distillable)}
                  className="rounded border-gray-300"
                />
                {t("modelsSidebar.distillable", "Distillable")}
              </label>
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
