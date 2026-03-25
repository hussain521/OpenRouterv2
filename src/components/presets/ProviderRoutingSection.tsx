import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network } from "lucide-react";

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

export default function ProviderRoutingSection() {
  const { t } = useTranslation();
  
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

  return (
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
                    checked={providerSelections[section.title].includes(provider)}
                    onChange={() => toggleProvider(section.title, provider)}
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
  );
}