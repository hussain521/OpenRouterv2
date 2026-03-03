import { useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoutingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300 ">
        <Navbar />
      </div>
      <DashboardLayout title="Routing">
        <RoutingSettingsContent />
      </DashboardLayout>
    </div>
  );
}

export function RoutingSettingsContent() {
  const [allowedModels, setAllowedModels] = useState(
    "anthropic/*,\nopenai/gpt-4o,\ngoogle/*"
  );
  const [preventOverrides, setPreventOverrides] = useState(false);
  const [providerSort, setProviderSort] = useState("balanced");
  const [defaultModel, setDefaultModel] = useState("none");

  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      {/* Auto Router */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6 py-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          {/* Left label / description */}
          <div className="md:w-56 space-y-1.5">
            <h2 className="text-[13px] font-medium text-gray-900 dark:text-gray-100">Auto Router</h2>
            <p className="text-[12px] text-gray-500 dark:text-gray-400">
              Route to the best model for each request using{" "}
              <a
                href="#"
                className="text-[#6366F1] hover:underline"
              >
                openrouter/auto
              </a>
              .
            </p>
          </div>

          {/* Right controls */}
          <div className="flex-1 space-y-5">
            {/* Allowed models textarea */}
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-gray-700 dark:text-gray-300">
                Allowed Models
              </label>
              <textarea
                value={allowedModels}
                onChange={(e) => setAllowedModels(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-800 px-3 py-2 text-[12px] text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-300 dark:focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#A5B4FC] dark:focus:ring-[#6366F1]"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
                <p>
                  Model patterns to filter which models the auto‑router can route
                  between. Separate patterns with commas or newlines. Supports
                  wildcards like <code className="rounded bg-gray-100 dark:bg-gray-700 px-1">anthropic/*</code>.
                </p>
                <button
                  type="button"
                  className="ml-3 whitespace-nowrap text-[#6366F1] hover:underline"
                >
                  26 models matched
                </button>
              </div>
            </div>

            {/* Prevent overrides toggle + Save */}
            <div className="flex flex-col items-start justify-between gap-3 border-t border-gray-100 dark:border-gray-700 pt-4 text-[12px] text-gray-600 dark:text-gray-300 md:flex-row md:items-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-[12px] text-gray-700 dark:text-gray-300"
                onClick={() => setPreventOverrides((v) => !v)}
              >
                <span className="relative inline-flex h-4 w-7 items-center rounded-full border border-transparent bg-gray-200 dark:bg-gray-700 transition-colors">
                  <span
                    className={[
                      "absolute h-3 w-3 rounded-full bg-white dark:bg-gray-300 shadow transition-transform",
                      preventOverrides ? "translate-x-[10px]" : "translate-x-[2px]",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute inset-0 rounded-full transition-colors",
                      preventOverrides ? "bg-[#6366F1]" : "bg-transparent",
                    ].join(" ")}
                  />
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  Prevent overrides
                </span>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-[#A855F7] px-5 py-1.5 text-[12px] font-medium text-white hover:bg-[#9333EA]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Default Provider Sort */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6 py-5 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <h3 className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
              Default Provider Sort
            </h3>
            <p className="max-w-xl text-[12px] text-gray-500 dark:text-gray-400">
              Choose how providers should be sorted. Individual requests can
              override this setting.
            </p>
            <p className="max-w-xl text-[11px] text-gray-400 dark:text-gray-500">
              By default, OpenRouter balances low prices with high uptime.
            </p>
          </div>
          <div className="w-full max-w-xs">
            <Select value={providerSort} onValueChange={setProviderSort}>
              <SelectTrigger className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-800 text-[12px] text-gray-800 dark:text-gray-100 focus:border-gray-300 dark:focus:border-gray-500 focus:ring-1 focus:ring-[#A5B4FC] dark:focus:ring-[#6366F1]">
                <SelectValue placeholder="Select provider sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Default (balanced)</SelectItem>
                <SelectItem value="price">Lowest price first</SelectItem>
                <SelectItem value="latency">Lowest latency first</SelectItem>
                <SelectItem value="uptime">Highest uptime first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Default Model */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6 py-5 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <h3 className="text-[13px] font-medium text-gray-900 dark:text-gray-100">Default Model</h3>
            <p className="max-w-xl text-[12px] text-gray-500 dark:text-gray-400">
              Set the default model for apps and fallback routing. Apps will use
              this model by default, but they may override it if they choose to do so.
            </p>
          </div>
          <div className="w-full max-w-xs">
            <Select value={defaultModel} onValueChange={setDefaultModel}>
              <SelectTrigger className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-800 text-[12px] text-gray-800 dark:text-gray-100 focus:border-gray-300 dark:focus:border-gray-500 focus:ring-1 focus:ring-[#A5B4FC] dark:focus:ring-[#6366F1]">
                <SelectValue placeholder="Select default model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No default</SelectItem>
                <SelectItem value="openai/gpt-4o">openai/gpt-4o</SelectItem>
                <SelectItem value="anthropic/claude-3.5-sonnet">
                  anthropic/claude-3.5-sonnet
                </SelectItem>
                <SelectItem value="google/gemini-1.5-pro">
                  google/gemini-1.5-pro
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
}