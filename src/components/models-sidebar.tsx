import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FiBox } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FiCode } from "react-icons/fi";
import { FiTag } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import { FiLayers } from "react-icons/fi";
import { FiSliders } from "react-icons/fi";

import { Slider } from "@/components/ui/slider";

export default function ModelsSidebar() {
  const { t } = useTranslation();
  const [inputOpen, setInputOpen] = useState(true);
  const [contextOpen, setContextOpen] = useState(true);
  const [outputOpen, setOutputOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [seriesOpen, setSeriesOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [parametersOpen, setParametersOpen] = useState(false);

  return (
    <aside className="w-[260px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black flex flex-col h-[calc(100vh-64px)] fixed top-[64px] left-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
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

            {inputOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {inputOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.modalities.text")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.modalities.image")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.modalities.file")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.modalities.audio")}</div>

              <div className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                {t("modelsSidebar.modalities.video")}
                <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  {t("common.new")}
                </span>
              </div>
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

            {outputOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {outputOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.modalities.text")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.modalities.image")}</div>
              <div className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">
                {t("modelsSidebar.modalities.audio")}
                <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  {t("common.new")}
                </span>
              </div>
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

            {contextOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {contextOpen && (
            <div className="mt-4 px-2">
              <Slider defaultValue={[10]} max={100} step={1} />

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>{t("modelsSidebar.contextValues.4k")}</span>
                <span>{t("modelsSidebar.contextValues.64k")}</span>
                <span>{t("modelsSidebar.contextValues.1m")}</span>
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

            {pricingOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {pricingOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.pricing.free")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.pricing.range1")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.pricing.range2")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.pricing.range3")}</div>
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
              {t("modelsSidebar.series")}
            </div>

            {seriesOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {seriesOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.series.gpt4")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.series.gpt35")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.series.claude3")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.series.geminiPro")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.series.llama3")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.series.mistral")}</div>
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
              {t("modelsSidebar.categories")}
            </div>

            {categoriesOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {categoriesOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.categories.academia")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.categories.finance")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.categories.health")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.categories.legal")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.categories.marketing")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.categories.coding")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.categories.roleplay")}</div>
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

            {parametersOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {parametersOpen && (
            <div className="mt-3 ml-6 space-y-2 text-gray-500 dark:text-gray-400">
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.parameters.temperature")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.parameters.topP")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.parameters.topK")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.parameters.maxTokens")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.parameters.frequencyPenalty")}</div>
              <div className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">{t("modelsSidebar.parameters.presencePenalty")}</div>
            </div>
          )}
        </div>

        {/* Distillable */}

        <div className="mt-4">
          <button className="flex items-center justify-between w-full text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
            <div className="flex items-center gap-2">
              <FiCode />
              {t("modelsSidebar.distillable")}
              <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {t("common.new")}
              </span>
            </div>

            <FiChevronRight />
          </button>
        </div>
      </div>
    </aside>
  );
}
