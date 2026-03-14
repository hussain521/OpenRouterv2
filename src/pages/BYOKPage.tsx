import { Info, Search, SquarePen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function BYOKPage() {
  const { t } = useTranslation();
  usePageTitle(t("byok.pageTitle"));
  const [showAll, setShowAll] = useState(false);

  // All providers data - simplified
  const allProviders = [
    { nameKey: "ai21", iconColor: "bg-[#ff007a]", textColor: "text-white", iconText: "a" },
    { nameKey: "aionLabs", iconColor: "bg-[#e5e7eb]", textColor: "text-gray-700", iconText: "Ai" },
    { nameKey: "alibaba", iconColor: "bg-[#ff7a00]", textColor: "text-white", iconText: "↷" },
    { nameKey: "amazonBedrock", iconColor: "bg-[#232f3e]", textColor: "text-white", iconText: "aws" },
    { nameKey: "anthropic", iconColor: "bg-[#f5f5e6]", textColor: "text-gray-900", iconText: "A" },
    { nameKey: "arceeAI", iconColor: "bg-[#00bfa5]", textColor: "text-white", iconText: "A" },
    { nameKey: "atlasCloud", iconColor: "bg-[#4f46e5]", textColor: "text-white", iconText: "A" },
    { nameKey: "azure", iconColor: "bg-[#0078d4]", textColor: "text-white", iconText: "A" },
    { nameKey: "baseten", iconColor: "bg-[#00c853]", textColor: "text-white", iconText: "⚡" },
    { nameKey: "cerebras", iconColor: "bg-[#ff3d00]", textColor: "text-white", iconText: "C" },
    { nameKey: "cloudflare", iconColor: "bg-[#f38020]", textColor: "text-white", iconText: "CF" },
    { nameKey: "cohere", iconColor: "bg-[#39194d]", textColor: "text-white", iconText: "C" },
    { nameKey: "coreweave", iconColor: "bg-[#00d4ff]", textColor: "text-white", iconText: "CW" },
    { nameKey: "databricks", iconColor: "bg-[#ff3621]", textColor: "text-white", iconText: "DB" },
    { nameKey: "deepinfra", iconColor: "bg-[#7c3aed]", textColor: "text-white", iconText: "DI" },
    { nameKey: "deepseek", iconColor: "bg-[#00a8ff]", textColor: "text-white", iconText: "DS" },
    { nameKey: "featherless", iconColor: "bg-[#22c55e]", textColor: "text-white", iconText: "F" },
    { nameKey: "fireworksAI", iconColor: "bg-[#e11d48]", textColor: "text-white", iconText: "FW" },
    { nameKey: "gemini", iconColor: "bg-[#4285f4]", textColor: "text-white", iconText: "G" },
    { nameKey: "githubModels", iconColor: "bg-[#24292e]", textColor: "text-white", iconText: "GH" },
    { nameKey: "groq", iconColor: "bg-[#f97316]", textColor: "text-white", iconText: "G" },
    { nameKey: "huggingFace", iconColor: "bg-[#ffcc00]", textColor: "text-gray-900", iconText: "🤗" },
    { nameKey: "hyperbolic", iconColor: "bg-[#8b5cf6]", textColor: "text-white", iconText: "H" },
    { nameKey: "inflection", iconColor: "bg-[#00bcd4]", textColor: "text-white", iconText: "Pi" },
    { nameKey: "lambda", iconColor: "bg-[#00e676]", textColor: "text-white", iconText: "λ" },
    { nameKey: "leptonAI", iconColor: "bg-[#10b981]", textColor: "text-white", iconText: "L" },
    { nameKey: "llamaCpp", iconColor: "bg-[#8b4513]", textColor: "text-white", iconText: "🦙" },
    { nameKey: "mancer", iconColor: "bg-[#ff00ff]", textColor: "text-white", iconText: "M" },
    { nameKey: "mistral", iconColor: "bg-[#ff6b6b]", textColor: "text-white", iconText: "M" },
    { nameKey: "modal", iconColor: "bg-[#000000]", textColor: "text-white", iconText: "M" },
    { nameKey: "monsterAPI", iconColor: "bg-[#9333ea]", textColor: "text-white", iconText: "👾" },
    { nameKey: "nebius", iconColor: "bg-[#0ea5e9]", textColor: "text-white", iconText: "N" },
    { nameKey: "novita", iconColor: "bg-[#ec4899]", textColor: "text-white", iconText: "N" },
    { nameKey: "octoAI", iconColor: "bg-[#ff4500]", textColor: "text-white", iconText: "🐙" },
    { nameKey: "openai", iconColor: "bg-[#10a37f]", textColor: "text-white", iconText: "OAI" },
    { nameKey: "perplexity", iconColor: "bg-[#1e90ff]", textColor: "text-white", iconText: "P" },
    { nameKey: "predibase", iconColor: "bg-[#6366f1]", textColor: "text-white", iconText: "PB" },
    { nameKey: "recursalAI", iconColor: "bg-[#059669]", textColor: "text-white", iconText: "R" },
    { nameKey: "replicate", iconColor: "bg-[#000000]", textColor: "text-white", iconText: "R" },
    { nameKey: "sambaNova", iconColor: "bg-[#ff5722]", textColor: "text-white", iconText: "SN" },
    { nameKey: "scale", iconColor: "bg-[#5e72e4]", textColor: "text-white", iconText: "S" },
    { nameKey: "siliconFlow", iconColor: "bg-[#00bfa5]", textColor: "text-white", iconText: "SF" },
    { nameKey: "together", iconColor: "bg-[#0066ff]", textColor: "text-white", iconText: "T" },
    { nameKey: "vertexAI", iconColor: "bg-[#4285f4]", textColor: "text-white", iconText: "V" },
    { nameKey: "voyageAI", iconColor: "bg-[#00c9ff]", textColor: "text-white", iconText: "V" },
    { nameKey: "weightsBiases", iconColor: "bg-[#ffcc00]", textColor: "text-gray-900", iconText: "W&B" },
    { nameKey: "workersAI", iconColor: "bg-[#f38020]", textColor: "text-white", iconText: "WA" },
    { nameKey: "xai", iconColor: "bg-[#000000]", textColor: "text-white", iconText: "xAI" },
    { nameKey: "yandex", iconColor: "bg-[#ffcc00]", textColor: "text-gray-900", iconText: "Я" },
    { nameKey: "yi", iconColor: "bg-[#ff4500]", textColor: "text-white", iconText: "Yi" },
    { nameKey: "zephyr", iconColor: "bg-[#7c3aed]", textColor: "text-white", iconText: "Z" },
    { nameKey: "zhipuAI", iconColor: "bg-[#3b82f6]", textColor: "text-white", iconText: "智" },
  ];

  // Determine which providers to show
  const displayedProviders = showAll ? allProviders : allProviders.slice(0, 10);
  const remainingCount = allProviders.length - 10;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title={t("settings.byok")}>
        <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
          {/* Top: intro + search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <p className="text-[13px]">
                {t("byok.subtitle")}
              </p>
              <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            </div>

            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder={t("byok.searchPlaceholder")}
                className="h-9 w-full rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 pl-9 pr-4 text-[13px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Provider list */}
          <section className="space-y-3">
            <h2 className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{t("byok.available")}</h2>

            <div className="mt-1 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-[13px]">
              <div className="divide-y divide-gray-200 dark:divide-gray-700" key={showAll ? 'all' : 'limited'}>
                {displayedProviders.map((provider, index) => (
                  <ProviderRow
                    key={`${provider.nameKey}-${index}`}
                    name={t(`hardcodedStrings.providers.${provider.nameKey}`, provider.nameKey)}
                    status={t("byok.notConfigured")}
                    iconColor={provider.iconColor}
                    textColor={provider.textColor}
                    iconText={provider.iconText}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="flex h-10 w-full items-center justify-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                {showAll ? t("byok.showLess") : t("byok.showMore", { count: remainingCount })}
              </button>
            </div>
          </section>

          {/* Info footer */}
          <section className="space-y-4 pt-2 text-[13px] text-gray-600 dark:text-gray-300">
            <h3 className="text-[16px] font-medium text-gray-900 dark:text-gray-100">
              {t("byok.keyPriority.title")}
            </h3>
            <div className="max-w-4xl space-y-3 leading-relaxed">
              <p>{t("byok.keyPriority.priorityDesc")}</p>
              <p>{t("byok.keyPriority.fallbackDesc")}</p>
              <p>{t("byok.keyPriority.alwaysUseDesc")}</p>
              <p>
                {t("byok.keyPriority.neverUseCreditsDesc1")}{" "}
                <strong className="font-medium text-gray-800 dark:text-gray-200">
                  {t("byok.keyPriority.neverUseCreditsDesc2")}
                </strong>{" "}
                {t("byok.keyPriority.neverUseCreditsDesc3")}{" "}
                <a href="#" className="text-[#6366F1] hover:underline">
                  {t("byok.keyPriority.yourOnlyProvider")}
                </a>{" "}
                {t("byok.keyPriority.neverUseCreditsDesc4")}
              </p>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  );
}

type ProviderRowProps = {
  name: string;
  status: string;
  iconColor?: string;
  textColor?: string;
  iconText?: string;
};

function ProviderRow({
  name,
  status,
  iconColor = "bg-gray-100",
  textColor = "text-gray-800",
  iconText,
}: ProviderRowProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between px-5 py-3 text-left text-[13px] hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold ${iconColor} ${textColor}`}
        >
          {iconText || name.charAt(0)}
        </div>
        <span className="text-[13px] text-gray-800 dark:text-gray-200">{name}</span>
      </div>
      <div className="flex items-center gap-3 text-[12px]">
        <span className="text-gray-400 dark:text-gray-500">{status}</span>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
          <SquarePen className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}