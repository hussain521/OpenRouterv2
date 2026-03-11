import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, ArrowLeft, Info, FileText, Bot, Network, Sliders, Brain } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DashboardLayout from "@/components/DashboardLayout";
import { ModelSelectionDialog } from "@/components/dialogs";
import { usePageTitle } from "@/hooks/usePageTitle";

const PROVIDERS = [
  "AI21",
  "AionLabs",
  "Alibaba",
  "Ambient",
  "Amazon Bedrock",
  "Amazon Nova",
  "Anthropic",
  "Arcee AI",
] as const;

const QUANTIZATION_OPTIONS = ["int4", "int8", "fp4", "fp6", "fp8", "bf16", "fp32"] as const;

type ProviderSectionKey = "order" | "only" | "ignore";

export default function NewPresetPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [modelsDialogOpen, setModelsDialogOpen] = useState(false);
  usePageTitle(t("presets.new.pageTitle"));

  // Provider routing state
  const [includeProviderPrefs, setIncludeProviderPrefs] = useState(false);
  const [providerSelections, setProviderSelections] = useState<
    Record<ProviderSectionKey, string[]>
  >({
    order: [],
    only: [],
    ignore: [],
  });
  const [selectedQuantizations, setSelectedQuantizations] = useState<string[]>([]);

  const toggleProvider = (section: ProviderSectionKey, provider: string) => {
    setProviderSelections((prev) => {
      const current = prev[section] ?? [];
      const exists = current.includes(provider);
      const next = exists
        ? current.filter((p) => p !== provider)
        : [...current, provider];

      return {
        ...prev,
        [section]: next,
      };
    });
  };

  const selectAllProviders = (section: ProviderSectionKey) => {
    setProviderSelections((prev) => ({
      ...prev,
      [section]: [...PROVIDERS],
    }));
  };

  const areAllProvidersSelected = (section: ProviderSectionKey) =>
    providerSelections[section]?.length === PROVIDERS.length;

  const toggleQuantization = (q: string) => {
    setSelectedQuantizations((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q],
    );
  };

  const selectAllQuantizations = () => {
    setSelectedQuantizations([...QUANTIZATION_OPTIONS]);
  };

  const areAllQuantizationsSelected = selectedQuantizations.length === QUANTIZATION_OPTIONS.length;

  const handleBack = () => {
    // Check if we came from settings path
    if (location.pathname.includes('/settings/')) {
      navigate('/settings/presets');
    } else {
      navigate('/presets');
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>
      
      <DashboardLayout
        title=""
      >
        {/* Custom Header */}
        <div className="flex items-center justify-between w-full -mt-16">
          <div className="flex items-center gap-3 ">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-[22px] font-semibold  text-gray-900 dark:text-gray-100 tracking-tight">
              {t("presets.new.pageTitle")}
            </h1>
          </div>
          <Button className="rounded-xl px-6">{t("presets.new.savePreset")}</Button>
        </div>
        <div className="space-y-8 mt-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">{t("presets.new.basicInfo.title")}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("presets.new.basicInfo.description")}
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("presets.new.name.label")}</label>
                  <Input placeholder={t("presets.new.name.placeholder")} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("presets.new.slug.label")}</label>
                  <Input placeholder={t("presets.new.slug.placeholder")} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("presets.new.description.label")}</label>
                  <Textarea placeholder={t("presets.new.description.placeholder")} rows={3} />
                </div>
              </div>
            </div>

            <Separator />

            {/* System Prompt */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">{t("presets.new.systemPrompt.title")}</h2>
                </div>
              </div>
              <div className="md:col-span-2">
                <Textarea placeholder={t("presets.new.systemPrompt.placeholder")} rows={4} />
              </div>
            </div>

            <Separator />

            {/* Models */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">{t("presets.new.models.title")}</h2>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{t("presets.new.models.selection.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("presets.new.models.selection.description")}
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="rounded-xl w-fit gap-2"
                  onClick={() => setModelsDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  {t("presets.new.models.addModel")}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Provider Routing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">{t("presets.new.providerRouting.title")}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("presets.new.providerRouting.description")}
                </p>
              </div>

              <div className="md:col-span-2 space-y-8">
                {/* Provider Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={includeProviderPrefs}
                      onChange={(e) => setIncludeProviderPrefs(e.target.checked)}
                    />
                    <span className="text-sm font-medium">
                      {t("presets.new.providerRouting.includePreferences")}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("newPreset.sortLabel")}</label>
                    <Input placeholder="--" />
                    <p className="text-xs text-muted-foreground">
                      {t("presets.new.providerRouting.sort.description")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("newPreset.dataCollectionLabel")}</label>
                    <Input placeholder="--" />
                    <p className="text-xs text-muted-foreground">
                      {t("presets.new.providerRouting.dataCollection.description")}
                    </p>
                  </div>
                </div>

                {/* order / only / ignore */}
                {[
                  {
                    title: "order" as ProviderSectionKey,
                    description: t("presets.new.providerRouting.order.description"),
                  },
                  {
                    title: "only" as ProviderSectionKey,
                    description: t("presets.new.providerRouting.only.description"),
                  },
                  {
                    title: "ignore" as ProviderSectionKey,
                    description: t("presets.new.providerRouting.ignore.description"),
                  },
                ].map((section) => (
                  <div key={section.title} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{section.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="text-xs p-0 h-auto"
                        type="button"
                        onClick={() => selectAllProviders(section.title)}
                      >
                        {areAllProvidersSelected(section.title)
                          ? t("presets.new.allSelected")
                          : t("presets.new.selectAll")}
                      </Button>
                    </div>

                    <Input placeholder={t("common.search")} />

                    <div className="border rounded-xl p-4 h-40 overflow-y-auto space-y-2">
                      {PROVIDERS.map((provider) => (
                        <div key={provider} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={providerSelections[section.title].includes(
                              provider,
                            )}
                            onChange={() =>
                              toggleProvider(section.title, provider)
                            }
                          />
                          <span className="text-sm">{provider}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantizations */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{t("presets.new.providerRouting.quantizations.title")}</h3>
                      <p className="text-xs text-muted-foreground">
                        {t("presets.new.providerRouting.quantizations.description")}
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto"
                      type="button"
                      onClick={selectAllQuantizations}
                    >
                      {areAllQuantizationsSelected ? t("presets.new.allSelected") : t("presets.new.selectAll")}
                    </Button>
                  </div>

                  <Input placeholder={t("common.search")} />

                  <div className="border rounded-xl p-4 h-32 overflow-y-auto space-y-2">
                    {QUANTIZATION_OPTIONS.map((q) => (
                      <div key={q} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={selectedQuantizations.includes(q)}
                          onChange={() => toggleQuantization(q)}
                        />
                        <span className="text-sm">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-6">
                {/* max_price */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{t("presets.new.maxPrice.title")}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t("presets.new.maxPrice.description")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">{t("presets.new.maxPrice.prompt")}</label>
                      <Input placeholder="e.g. 5.00" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">{t("presets.new.maxPrice.completion")}</label>
                      <Input placeholder="e.g. 10.00" />
                    </div>
                  </div>
                </div>

                {/* preferred_min_throughput */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    {t("presets.new.preferredMinThroughput.title")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("presets.new.preferredMinThroughput.description")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["p50", "p75", "p99"].map((p) => (
                      <div key={p} className="space-y-1">
                        <label className="text-xs font-medium">{p}</label>
                        <Input placeholder="e.g. 100" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* preferred_max_latency */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{t("presets.new.preferredMaxLatency.title")}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t("presets.new.preferredMaxLatency.description")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["p50", "p75", "p99"].map((p) => (
                      <div key={p} className="space-y-1">
                        <label className="text-xs font-medium">{p}</label>
                        <Input placeholder="e.g. 5.0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booleans / enums */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">{t("presets.new.allowFallbacks.label")}</label>
                    <p className="text-xs text-muted-foreground">
                      {t("presets.new.allowFallbacks.description")}
                    </p>
                    <Input placeholder="true" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      {t("presets.new.requireParameters.label")}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {t("presets.new.requireParameters.description")}
                    </p>
                    <Input placeholder="undefined" />
                  </div>
                </div>
              </div>
              </div>
            </div>

            <Separator />

            {/* Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">{t("presets.new.parameters.title")}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("presets.new.parameters.description")}
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                {[
                  {
                    label: t("presets.new.parameters.temperature.label"),
                    help: t("presets.new.parameters.temperature.help"),
                  },
                  {
                    label: t("presets.new.parameters.topP.label"),
                    help: t("presets.new.parameters.topP.help"),
                  },
                  {
                    label: t("presets.new.parameters.topK.label"),
                    help: t("presets.new.parameters.topK.help"),
                  },
                  {
                    label: t("presets.new.parameters.frequencyPenalty.label"),
                    help: t("presets.new.parameters.frequencyPenalty.help"),
                  },
                  {
                    label: t("presets.new.parameters.presencePenalty.label"),
                    help: t("presets.new.parameters.presencePenalty.help"),
                  },
                  {
                    label: t("presets.new.parameters.repetitionPenalty.label"),
                    help: t("presets.new.parameters.repetitionPenalty.help"),
                  },
                  {
                    label: t("presets.new.parameters.maxTokens.label"),
                    help: t("presets.new.parameters.maxTokens.help"),
                  },
                  {
                    label: t("presets.new.parameters.seed.label"),
                    help: t("presets.new.parameters.seed.help"),
                  },
                ].map((param) => (
                  <div key={param.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          {param.label}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {param.help}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {t("presets.new.include")}
                        </span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>

                    {/* يمكنك استبدال هذا بـ Slider حقيقي من shadcn إذا أردت */}
                    <Input
                      type="number"
                      className="max-w-xs"
                      placeholder="1.00"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">{t("presets.new.reasoning.title")}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("presets.new.reasoning.description")}
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t("presets.new.include")}</span>
                  <input type="checkbox" className="h-4 w-4" />
                </div>

                <div className="space-y-4 rounded-xl border p-4 bg-muted/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        {t("presets.new.reasoning.enable.label")}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {t("presets.new.reasoning.enable.description")}
                      </p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          {t("presets.new.reasoning.effort.label")}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {t("presets.new.reasoning.effort.description")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {t("presets.new.include")}
                        </span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                    <Input
                      placeholder={t("presets.new.reasoning.effort.placeholder")}
                      className="max-w-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          {t("presets.new.reasoning.maxTokens.label")}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {t("presets.new.reasoning.maxTokens.description")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {t("presets.new.include")}
                        </span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                    <Input
                      type="number"
                      placeholder="1024"
                      className="max-w-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          {t("presets.new.reasoning.exclude.label")}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {t("presets.new.reasoning.exclude.description")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {t("presets.new.exclude")}
                        </span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>

        {/* Model selection dialog */}
        <ModelSelectionDialog
          open={modelsDialogOpen}
          onOpenChange={setModelsDialogOpen}
        />
      </DashboardLayout>
    </div>
  );
}