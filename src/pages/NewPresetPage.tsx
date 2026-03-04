import { useState } from "react";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [modelsDialogOpen, setModelsDialogOpen] = useState(false);
  usePageTitle("New Preset");

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
              New Preset
            </h1>
          </div>
          <Button className="rounded-xl px-6">Save Preset</Button>
        </div>
        <div className="space-y-8 mt-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">Basic Info</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Preset name and description for identification and organization.
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Enter preset name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input placeholder="enter-preset-slug" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Short description..." rows={3} />
                </div>
              </div>
            </div>

            <Separator />

            {/* System Prompt */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">System Prompt</h2>
                </div>
              </div>
              <div className="md:col-span-2">
                <Textarea placeholder="Write system prompt..." rows={4} />
              </div>
            </div>

            <Separator />

            {/* Models */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">Models</h2>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-medium">Model Selection (Optional)</h3>
                  <p className="text-sm text-muted-foreground">
                    Specify which model(s) this preset should use. Leave empty to
                    allow any model. If multiple models are selected, they will be
                    used as fallbacks.
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="rounded-xl w-fit gap-2"
                  onClick={() => setModelsDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add model
                </Button>
              </div>
            </div>

            <Separator />

            {/* Provider Routing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-gray-500" />
                  <h2 className="font-medium text-base">Provider Routing</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Control which providers are used and routing preferences.
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
                      Include Provider Preferences
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">sort</label>
                    <Input placeholder="--" />
                    <p className="text-xs text-muted-foreground">
                      The sorting strategy to use for this request.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">data_collection</label>
                    <Input placeholder="--" />
                    <p className="text-xs text-muted-foreground">
                      Data collection setting if no available model provider meets
                      the requirement.
                    </p>
                  </div>
                </div>

                {/* order / only / ignore */}
                {[
                  {
                    title: "order" as ProviderSectionKey,
                    description: "An ordered list of provider slugs.",
                  },
                  {
                    title: "only" as ProviderSectionKey,
                    description: "List of provider slugs to allow.",
                  },
                  {
                    title: "ignore" as ProviderSectionKey,
                    description: "List of provider slugs to ignore.",
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
                          ? "All selected"
                          : "Select All"}
                      </Button>
                    </div>

                    <Input placeholder="Search..." />

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
                      <h3 className="text-sm font-medium">quantizations</h3>
                      <p className="text-xs text-muted-foreground">
                        A list of quantization levels to filter the provider by.
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto"
                      type="button"
                      onClick={selectAllQuantizations}
                    >
                      {areAllQuantizationsSelected ? "All selected" : "Select All"}
                    </Button>
                  </div>

                  <Input placeholder="Search..." />

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
                  <h3 className="text-sm font-medium">max_price</h3>
                  <p className="text-xs text-muted-foreground">
                    Maximum price (USD per million tokens) you want to pay for
                    this request.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Prompt</label>
                      <Input placeholder="e.g. 5.00" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Completion</label>
                      <Input placeholder="e.g. 10.00" />
                    </div>
                  </div>
                </div>

                {/* preferred_min_throughput */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    preferred_min_throughput
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Preferred minimum throughput (tokens per second). Can be a
                    single value or percentile-specific cutoffs.
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
                  <h3 className="text-sm font-medium">preferred_max_latency</h3>
                  <p className="text-xs text-muted-foreground">
                    Preferred maximum latency (in seconds). Can be a single value
                    or percentile-specific cutoffs.
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
                    <label className="text-sm font-medium">Allow fallbacks</label>
                    <p className="text-xs text-muted-foreground">
                      Whether fallback models can be used when the primary model
                      is unavailable.
                    </p>
                    <Input placeholder="true" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      Require parameters
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Require a specific provider parameter preset.
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
                  <h2 className="font-medium text-base">Parameters</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Override default generation settings like temperature and
                  max tokens.
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                {[
                  {
                    label: "Temperature",
                    help: "Controls randomness in the output. Lower values are more deterministic.",
                  },
                  {
                    label: "Top P",
                    help: "Nucleus sampling parameter. Controls diversity via cumulative probability.",
                  },
                  {
                    label: "Top K",
                    help: "Limits the number of highest probability tokens to consider.",
                  },
                  {
                    label: "Frequency Penalty",
                    help: "Reduces repetition based on token frequency in the text so far.",
                  },
                  {
                    label: "Presence Penalty",
                    help: "Reduces repetition based on whether tokens appear in the text so far.",
                  },
                  {
                    label: "Repetition Penalty",
                    help: "Penalizes repetition. Values > 1 discourage repetition, < 1 encourage it.",
                  },
                  {
                    label: "Max Tokens",
                    help: "Maximum number of tokens to generate.",
                  },
                  {
                    label: "Seed",
                    help: "Random seed for deterministic outputs (when supported).",
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
                          Include
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
                  <h2 className="font-medium text-base">Reasoning</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Configure reasoning (thinking) parameters for models that
                  support extended reasoning.
                </p>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Include</span>
                  <input type="checkbox" className="h-4 w-4" />
                </div>

                <div className="space-y-4 rounded-xl border p-4 bg-muted/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        Enable Reasoning
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Enable extended reasoning for models that support it.
                      </p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          Reasoning Effort
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Controls how much reasoning the model performs.
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          Include
                        </span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                    <Input
                      placeholder="Medium"
                      className="max-w-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">
                          Reasoning Max Tokens
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Maximum number of tokens for reasoning.
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          Include
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
                          Exclude Reasoning from Response
                        </label>
                        <p className="text-xs text-muted-foreground">
                          When enabled, reasoning tokens will not be included in
                          the response output.
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          Exclude
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