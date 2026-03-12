import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { usePageTitle } from "@/hooks/usePageTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Route, ArrowUpDown, Layers, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
 
export default function RoutingPage() {
  const { t } = useTranslation();
  usePageTitle(t("settings.routing"));
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300 ">
        <Navbar />
      </div>
      <DashboardLayout title={t("settings.routing")}>
        <RoutingSettingsContent />
      </DashboardLayout>
    </div>
  );
}

export function RoutingSettingsContent() {
  const { t } = useTranslation();
  const [allowedModels, setAllowedModels] = useState(
    "anthropic/*,\nopenai/gpt-4o,\ngoogle/*"
  );
  const [preventOverrides, setPreventOverrides] = useState(false);
  const [showMatchedModels, setShowMatchedModels] = useState(false);

  const matchedModels = [
    "anthropic/claude-haiku-4.5",
    "anthropic/claude-opus-4.6",
    "anthropic/claude-sonnet-4.5",
    "anthropic/claude-sonnet-4.6",
    "deepseek/deepseek-r1",
    "google/gemini-2.5-flash-lite",
    "google/gemini-3-flash-preview",
    "google/gemini-3-pro-preview",
    "google/gemini-3.1-pro-preview",
    "meta-llama/llama-3.3-70b-instruct",
    "minimax/minimax-m2.5",
    "mistralai/codestral-2508",
    "mistralai/mistral-large",
    "mistralai/mistral-medium-3.1",
    "mistralai/mistral-small-3.2-24b-instruct-2506",
    "moonshotai/kimi-k2-thinking",
    "moonshotai/kimi-k2.5",
    "openai/gpt-5",
    "openai/gpt-5-mini",
    "openai/gpt-5-nano",
    "openai/gpt-5.1",
    "openai/gpt-5.2",
    "openai/gpt-5.2-pro",
    "openai/gpt-oss-120b",
    "perplexity/sonar",
    "qwen/qwen3-235b-a22b",
    "x-ai/grok-3",
    "x-ai/grok-3-mini",
    "x-ai/grok-4",
    "z-ai/glm-5",
  ];

  return (
    <div className="space-y-8 pt-4 text-[13px] text-gray-700 dark:text-gray-300">
      <div className="  mx-auto py-10 px-6 space-y-12">

        {/* ================= Auto Router ================= */}
        <section className="space-y-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 space-y-2">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Route className="h-5 w-5" />
                {t("routing.autoRouter.title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("routing.autoRouter.description")}
              </p>
            </div>

            <div className="col-span-9 space-y-6">
              <p className="text-sm text-muted-foreground">
                {t("routing.autoRouter.routeDescription")}
                <span className="text-primary ml-1 cursor-pointer">
                  openrouter/auto
                </span>
                . {t("routing.autoRouter.learnMore")}
              </p>

              <div className="space-y-2">
                <Label>{t("routing.autoRouter.allowedModels.label")}</Label>
                <textarea
                  className="w-full min-h-[120px] rounded-xl border bg-muted px-3 py-2 text-sm resize-none"
                  placeholder="anthropic/*, openai/gpt-4o, google/*"
                  value={allowedModels}
                  onChange={(e) => setAllowedModels(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {t("routing.autoRouter.allowedModels.help")}
                </p>
                <button
                  type="button"
                  className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground"
                  onClick={() => setShowMatchedModels((prev) => !prev)}
                >
                  <span>{showMatchedModels ? "▴" : "▾"}</span>
                  <span>{t("routing.autoRouter.modelsMatched", { count: 30 })}</span>
                </button>
                {showMatchedModels && (
                  <div className="mt-1 max-h-40 overflow-y-auto rounded-md bg-muted px-3 py-2 text-xs font-mono text-foreground border border-border">
                    {matchedModels.map((model) => (
                      <div key={model}>{model}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Label className="font-medium">{t("routing.autoRouter.preventOverrides")}</Label>
                <Switch
                  checked={preventOverrides}
                  onCheckedChange={setPreventOverrides}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {t("routing.autoRouter.preventOverridesTooltip")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex justify-end">
                <Button className="rounded-xl px-6">{t("common.save")}</Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ================= Default Provider Sort ================= */}
        <section>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 space-y-2">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5" />
                {t("routing.providerSort.title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("routing.providerSort.description")}
              </p>
            </div>

            <div className="col-span-9 space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("routing.providerSort.chooseDescription")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("routing.providerSort.defaultDescription")}
                <span className="text-primary ml-1 cursor-pointer">
                  {t("routing.providerSort.learnMore")}
                </span>
              </p>

              <Select defaultValue="balanced">
                <SelectTrigger className="w-72 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">{t("routing.providerSort.balanced")}</SelectItem>
                  <SelectItem value="price">{t("routing.providerSort.lowestPrice")}</SelectItem>
                  <SelectItem value="uptime">{t("routing.providerSort.highestUptime")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <Separator />

        {/* ================= Default Model ================= */}
        <section>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 space-y-2">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Layers className="h-5 w-5" />
                {t("routing.defaultModel.title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("routing.defaultModel.description")}
              </p>
            </div>

            <div className="col-span-9 space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("routing.defaultModel.appsDescription")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("routing.defaultModel.fallbackDescription")}
              </p>

              <Select>
                <SelectTrigger className="w-72 rounded-xl">
                  <SelectValue placeholder={t("routing.defaultModel.noDefault")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("routing.defaultModel.noDefault")}</SelectItem>
                  <SelectItem value="gpt4o">openai/gpt-4o</SelectItem>
                  <SelectItem value="claude">anthropic/claude-3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

 