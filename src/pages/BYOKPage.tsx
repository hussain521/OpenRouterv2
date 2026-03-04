import { Info, Search, SquarePen } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function BYOKPage() {
  usePageTitle("BYOK");
  const [showAll, setShowAll] = useState(false);

  // All providers data - simplified
  const allProviders = [
    { name: "AI21", iconColor: "bg-[#ff007a]", textColor: "text-white", iconText: "a" },
    { name: "AionLabs", iconColor: "bg-[#e5e7eb]", textColor: "text-gray-700", iconText: "Ai" },
    { name: "Alibaba Cloud Int.", iconColor: "bg-[#ff7a00]", textColor: "text-white", iconText: "↷" },
    { name: "Amazon Bedrock", iconColor: "bg-[#232f3e]", textColor: "text-white", iconText: "aws" },
    { name: "Anthropic", iconColor: "bg-[#f5f5e6]", textColor: "text-gray-900", iconText: "A" },
    { name: "Arcee AI", iconColor: "bg-[#00bfa5]", textColor: "text-white", iconText: "A" },
    { name: "AtlasCloud", iconColor: "bg-[#4f46e5]", textColor: "text-white", iconText: "A" },
    { name: "Azure", iconColor: "bg-[#0078d4]", textColor: "text-white", iconText: "A" },
    { name: "Baseten", iconColor: "bg-[#00c853]", textColor: "text-white", iconText: "⚡" },
    { name: "Cerebras", iconColor: "bg-[#ff3d00]", textColor: "text-white", iconText: "C" },
    { name: "Cloudflare", iconColor: "bg-[#f38020]", textColor: "text-white", iconText: "CF" },
    { name: "Cohere", iconColor: "bg-[#39194d]", textColor: "text-white", iconText: "C" },
    { name: "CoreWeave", iconColor: "bg-[#00d4ff]", textColor: "text-white", iconText: "CW" },
    { name: "Databricks", iconColor: "bg-[#ff3621]", textColor: "text-white", iconText: "DB" },
    { name: "DeepInfra", iconColor: "bg-[#7c3aed]", textColor: "text-white", iconText: "DI" },
    { name: "DeepSeek", iconColor: "bg-[#00a8ff]", textColor: "text-white", iconText: "DS" },
    { name: "Featherless", iconColor: "bg-[#22c55e]", textColor: "text-white", iconText: "F" },
    { name: "Fireworks AI", iconColor: "bg-[#e11d48]", textColor: "text-white", iconText: "FW" },
    { name: "Gemini", iconColor: "bg-[#4285f4]", textColor: "text-white", iconText: "G" },
    { name: "GitHub Models", iconColor: "bg-[#24292e]", textColor: "text-white", iconText: "GH" },
    { name: "Groq", iconColor: "bg-[#f97316]", textColor: "text-white", iconText: "G" },
    { name: "Hugging Face", iconColor: "bg-[#ffcc00]", textColor: "text-gray-900", iconText: "🤗" },
    { name: "Hyperbolic", iconColor: "bg-[#8b5cf6]", textColor: "text-white", iconText: "H" },
    { name: "Inflection", iconColor: "bg-[#00bcd4]", textColor: "text-white", iconText: "Pi" },
    { name: "Lambda", iconColor: "bg-[#00e676]", textColor: "text-white", iconText: "λ" },
    { name: "Lepton AI", iconColor: "bg-[#10b981]", textColor: "text-white", iconText: "L" },
    { name: "Llama.cpp", iconColor: "bg-[#8b4513]", textColor: "text-white", iconText: "🦙" },
    { name: "Mancer", iconColor: "bg-[#ff00ff]", textColor: "text-white", iconText: "M" },
    { name: "Mistral", iconColor: "bg-[#ff6b6b]", textColor: "text-white", iconText: "M" },
    { name: "Modal", iconColor: "bg-[#000000]", textColor: "text-white", iconText: "M" },
    { name: "Monster API", iconColor: "bg-[#9333ea]", textColor: "text-white", iconText: "👾" },
    { name: "Nebius", iconColor: "bg-[#0ea5e9]", textColor: "text-white", iconText: "N" },
    { name: "Novita", iconColor: "bg-[#ec4899]", textColor: "text-white", iconText: "N" },
    { name: "OctoAI", iconColor: "bg-[#ff4500]", textColor: "text-white", iconText: "🐙" },
    { name: "OpenAI", iconColor: "bg-[#10a37f]", textColor: "text-white", iconText: "OAI" },
    { name: "Perplexity", iconColor: "bg-[#1e90ff]", textColor: "text-white", iconText: "P" },
    { name: "Predibase", iconColor: "bg-[#6366f1]", textColor: "text-white", iconText: "PB" },
    { name: "Recursal.ai", iconColor: "bg-[#059669]", textColor: "text-white", iconText: "R" },
    { name: "Replicate", iconColor: "bg-[#000000]", textColor: "text-white", iconText: "R" },
    { name: "Samba Nova", iconColor: "bg-[#ff5722]", textColor: "text-white", iconText: "SN" },
    { name: "Scale", iconColor: "bg-[#5e72e4]", textColor: "text-white", iconText: "S" },
    { name: "SiliconFlow", iconColor: "bg-[#00bfa5]", textColor: "text-white", iconText: "SF" },
    { name: "Together", iconColor: "bg-[#0066ff]", textColor: "text-white", iconText: "T" },
    { name: "VertexAI", iconColor: "bg-[#4285f4]", textColor: "text-white", iconText: "V" },
    { name: "Voyage AI", iconColor: "bg-[#00c9ff]", textColor: "text-white", iconText: "V" },
    { name: "Weight & Biases", iconColor: "bg-[#ffcc00]", textColor: "text-gray-900", iconText: "W&B" },
    { name: "Workers AI", iconColor: "bg-[#f38020]", textColor: "text-white", iconText: "WA" },
    { name: "xAI", iconColor: "bg-[#000000]", textColor: "text-white", iconText: "xAI" },
    { name: "Yandex", iconColor: "bg-[#ffcc00]", textColor: "text-gray-900", iconText: "Я" },
    { name: "Yi", iconColor: "bg-[#ff4500]", textColor: "text-white", iconText: "Yi" },
    { name: "Zephyr", iconColor: "bg-[#7c3aed]", textColor: "text-white", iconText: "Z" },
    { name: "Zhipu AI", iconColor: "bg-[#3b82f6]", textColor: "text-white", iconText: "智" },
  ];

  // Determine which providers to show
  const displayedProviders = showAll ? allProviders : allProviders.slice(0, 10);
  const remainingCount = allProviders.length - 10;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      <DashboardLayout title="BYOK">
        <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
          {/* Top: intro + search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <p className="text-[13px]">
                Use your own provider API keys on OpenRouter
              </p>
              <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            </div>

            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search providers..."
                className="h-9 w-full rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 pl-9 pr-4 text-[13px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Provider list */}
          <section className="space-y-3">
            <h2 className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Available</h2>

            <div className="mt-1 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-[13px]">
              <div className="divide-y divide-gray-200 dark:divide-gray-700" key={showAll ? 'all' : 'limited'}>
                {displayedProviders.map((provider, index) => (
                  <ProviderRow
                    key={`${provider.name}-${index}`}
                    name={provider.name}
                    status="Not configured"
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
                {showAll ? 'Show less' : `Show ${remainingCount} more`}
              </button>
            </div>
          </section>

          {/* Info footer */}
          <section className="space-y-4 pt-2 text-[13px] text-gray-600 dark:text-gray-300">
            <h3 className="text-[16px] font-medium text-gray-900 dark:text-gray-100">
              Key Priority and Fallback
            </h3>
            <div className="max-w-4xl space-y-3 leading-relaxed">
              <p>OpenRouter always prioritizes using your provider keys when available.</p>
              <p>
                By default, if your key encounters a rate limit or failure, OpenRouter will
                fall back to using shared OpenRouter credits.
              </p>
              <p>
                You can configure individual keys with "Always use this key" to
                prevent any fallback to OpenRouter credits. When this option is enabled,
                OpenRouter will only use your key for requests to that provider. This may
                result in rate limit errors if your key is exhausted, but ensures all
                requests go through your account.
              </p>
              <p>
                If you wish to never use shared OpenRouter credits for a model, you must{" "}
                <strong className="font-medium text-gray-800 dark:text-gray-200">
                  both specify "Always use this key" and pin the provider
                </strong>{" "}
                by specifying it as{" "}
                <a href="#" className="text-[#6366F1] hover:underline">
                  your only provider
                </a>{" "}
                when making the request.
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