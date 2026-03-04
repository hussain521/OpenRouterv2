import { useState } from "react";
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
  usePageTitle("Routing");
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
                Auto Router
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure which models the Auto Router can route to.
              </p>
            </div>

            <div className="col-span-9 space-y-6">
              <p className="text-sm text-muted-foreground">
                Route to the best model for each request using
                <span className="text-primary ml-1 cursor-pointer">
                  openrouter/auto
                </span>
                . Learn more
              </p>

              <div className="space-y-2">
                <Label>Allowed Models</Label>
                <textarea
                  className="w-full min-h-[120px] rounded-xl border bg-muted px-3 py-2 text-sm resize-none"
                  placeholder="anthropic/*, openai/gpt-4o, google/*"
                  value={allowedModels}
                  onChange={(e) => setAllowedModels(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Model patterns to filter which models the auto-router can
                  route between. Separate patterns with commas or newlines.
                  Supports wildcards (e.g., "anthropic/*" matches all
                  Anthropic models). Leave empty to use all supported models.
                </p>
                <button
                  type="button"
                  className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground"
                  onClick={() => setShowMatchedModels((prev) => !prev)}
                >
                  <span>{showMatchedModels ? "▴" : "▾"}</span>
                  <span>30 models matched</span>
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
                <Label className="font-medium">Prevent overrides</Label>
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
                        When enabled, requests cannot override the allowed models list.
                        This ensures all requests are routed only to your specified models.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex justify-end">
                <Button className="rounded-xl px-6">Save</Button>
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
                Default Provider Sort
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose how providers should be sorted for your requests.
              </p>
            </div>

            <div className="col-span-9 space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose how providers should be sorted. Individual requests can
                override this setting.
              </p>
              <p className="text-sm text-muted-foreground">
                By default, OpenRouter balances low prices with high uptime.
                <span className="text-primary ml-1 cursor-pointer">
                  Learn more
                </span>
              </p>

              <Select defaultValue="balanced">
                <SelectTrigger className="w-72 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Default (balanced)</SelectItem>
                  <SelectItem value="price">Lowest price</SelectItem>
                  <SelectItem value="uptime">Highest uptime</SelectItem>
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
                Default Model
              </h2>
              <p className="text-sm text-muted-foreground">
                Set the default model for apps and fallback routing.
              </p>
            </div>

            <div className="col-span-9 space-y-4">
              <p className="text-sm text-muted-foreground">
                Apps will use this model by default, but they may override it
                if they choose to do so.
              </p>
              <p className="text-sm text-muted-foreground">
                This model will also be used as your default fallback model.
              </p>

              <Select>
                <SelectTrigger className="w-72 rounded-xl">
                  <SelectValue placeholder="No default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No default</SelectItem>
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

 