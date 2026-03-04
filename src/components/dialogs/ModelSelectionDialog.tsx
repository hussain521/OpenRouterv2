import { useMemo, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ModelSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ModelCategory = "all" | "input" | "output" | "free";

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  categories: ModelCategory[];
  description: string;
  available?: boolean;
}

const MODELS: ModelInfo[] = [
  {
    id: "aion-2.0",
    name: "Aion-2.0",
    provider: "DeepSeek",
    categories: ["all", "output"],
    description:
      "Aion-2.0 is a variant of DeepSeek V3.2 optimized for immersive roleplaying and storytelling. It is particularly strong at introducing tension, crises, and conflict into stories, making narratives feel more engaging.",
    available: true,
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro Preview",
    provider: "Google",
    categories: ["all", "input", "output"],
    description:
      "Preview version of Gemini 3.1 Pro for advanced reasoning tasks, coding, and multi-modal understanding.",
    available: true,
  },
  {
    id: "claude-sonnet-4.6",
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    categories: ["all", "input", "output"],
    description:
      "Balanced Claude model with strong reasoning, long-context support, and fast response times suitable for a wide range of assistant use cases.",
    available: true,
  },
  {
    id: "qwen-3.5-plus-2026-02-15",
    name: "Qwen3.5 Plus 2026-02-15",
    provider: "Qwen",
    categories: ["all", "input", "output", "free"],
    description:
      "General-purpose Qwen3.5 model, updated 2026-02-15, with strong multilingual capabilities and competitive performance on coding and chat benchmarks.",
    available: true,
  },
  {
    id: "glm-5",
    name: "GLM 5",
    provider: "Zhipu",
    categories: ["all", "input", "output"],
    description:
      "Latest GLM series model with strong Chinese and English understanding, optimized for chat and knowledge-intensive tasks.",
    available: false,
  },
];

export function ModelSelectionDialog({
  open,
  onOpenChange,
}: ModelSelectionDialogProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ModelCategory>("all");
  const [hideUnavailable, setHideUnavailable] = useState(true);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(MODELS[0]?.id ?? null);

  const filteredModels = useMemo(() => {
    return MODELS.filter((model) => {
      if (activeCategory !== "all" && !model.categories.includes(activeCategory)) {
        return false;
      }

      if (hideUnavailable && model.available === false) {
        return false;
      }

      if (!query.trim()) return true;

      const q = query.toLowerCase();
      return (
        model.name.toLowerCase().includes(q) ||
        model.provider.toLowerCase().includes(q) ||
        model.id.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, hideUnavailable, query]);

  const selectedModel =
    filteredModels.find((m) => m.id === selectedModelId) ??
    filteredModels[0] ??
    MODELS[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl rounded-2xl"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader className="items-start gap-2">
          <DialogTitle className="text-lg font-semibold">
            Select models
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="mt-2 space-y-4">
          {/* Top controls */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="Search models"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-full md:max-w-xs rounded-xl"
            />

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Button
                type="button"
                variant={activeCategory === "input" ? "default" : "outline"}
                size="sm"
                className="rounded-full px-3 h-7"
                onClick={() =>
                  setActiveCategory((prev) =>
                    prev === "input" ? "all" : "input",
                  )
                }
              >
                Input
              </Button>
              <Button
                type="button"
                variant={activeCategory === "output" ? "default" : "outline"}
                size="sm"
                className="rounded-full px-3 h-7"
                onClick={() =>
                  setActiveCategory((prev) =>
                    prev === "output" ? "all" : "output",
                  )
                }
              >
                Output
              </Button>
              <Button
                type="button"
                variant={activeCategory === "free" ? "default" : "outline"}
                size="sm"
                className="rounded-full px-3 h-7"
                onClick={() =>
                  setActiveCategory((prev) => (prev === "free" ? "all" : "free"))
                }
              >
                Free
              </Button>

              <Button
                type="button"
                variant={hideUnavailable ? "default" : "outline"}
                size="sm"
                className="rounded-full px-3 h-7"
                onClick={() => setHideUnavailable((v) => !v)}
              >
                Hide Unavailable
              </Button>

              {query || activeCategory !== "all" || !hideUnavailable ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-3 h-7 text-xs text-muted-foreground hover:bg-transparent underline-offset-2 hover:underline"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("all");
                    setHideUnavailable(true);
                  }}
                >
                  Clear
                </Button>
              ) : null}
            </div>
          </div>

          {/* Models list + description */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-1/2 rounded-xl border bg-muted/40 max-h-72 overflow-y-auto divide-y">
              {filteredModels.map((model) => {
                const isSelected = selectedModel?.id === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedModelId(model.id)}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between gap-2 hover:bg-accent/60 ${
                      isSelected ? "bg-accent" : ""
                    } ${model.available === false ? "opacity-60" : ""}`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{model.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {model.provider}
                      </span>
                    </div>
                    {model.available === false && (
                      <span className="text-[10px] rounded-full border px-2 py-0.5 text-muted-foreground">
                        Unavailable
                      </span>
                    )}
                  </button>
                );
              })}

              {filteredModels.length === 0 && (
                <div className="px-3 py-4 text-xs text-muted-foreground">
                  No models match your filters.
                </div>
              )}
            </div>

            <div className="md:w-1/2 rounded-xl border bg-muted/40 p-3 text-sm space-y-2 max-h-72 overflow-y-auto">
              {selectedModel ? (
                <>
                  <div className="font-medium">{selectedModel.name}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedModel.description}
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Select a model on the left to see details.
                </p>
              )}
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="mt-3 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-xl px-4"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className="rounded-xl px-4"
            onClick={() => onOpenChange(false)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}