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
import { useTranslation } from "react-i18next";

interface ModelSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ModelCategory = "all" | "input" | "output" | "free";

interface ModelInfo {
  id: string;
  nameKey: string;
  provider: string;
  categories: ModelCategory[];
  description: string;
  available?: boolean;
}

const MODELS: ModelInfo[] = [
  {
    id: "aion-2.0",
    nameKey: "aion20",
    provider: "DeepSeek",
    categories: ["all", "output"],
    description: "modelDescriptions.aion2",
    available: true,
  },
  {
    id: "gemini-3.1-pro-preview",
    nameKey: "gemini31ProPreview",
    provider: "Google",
    categories: ["all", "input", "output"],
    description: "modelDescriptions.geminiProPreview",
    available: true,
  },
  {
    id: "claude-sonnet-4.6",
    nameKey: "claudeSonnet46",
    provider: "Anthropic",
    categories: ["all", "input", "output"],
    description: "modelDescriptions.claudeSonnet",
    available: true,
  },
  {
    id: "qwen-3.5-plus-2026-02-15",
    nameKey: "qwen35Plus",
    provider: "Qwen",
    categories: ["all", "input", "output", "free"],
    description: "modelDescriptions.qwenPlus",
    available: true,
  },
  {
    id: "glm-5",
    nameKey: "glm5",
    provider: "Zhipu",
    categories: ["all", "input", "output"],
    description: "modelDescriptions.glm5",
    available: false,
  },
];

export function ModelSelectionDialog({
  open,
  onOpenChange,
}: ModelSelectionDialogProps) {
  const { t } = useTranslation();
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
        t(`hardcodedStrings.models.${model.nameKey}`, model.nameKey).toLowerCase().includes(q) ||
        model.provider.toLowerCase().includes(q) ||
        model.id.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, hideUnavailable, query, t]);

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
            {t("modelSelection.selectModels")}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="mt-2 space-y-4">
          {/* Top controls */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder={t("modelSelection.searchModels")}
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
                {t("modelSelection.input")}
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
                {t("modelSelection.output")}
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
                {t("modelSelection.free")}
              </Button>

              <Button
                type="button"
                variant={hideUnavailable ? "default" : "outline"}
                size="sm"
                className="rounded-full px-3 h-7"
                onClick={() => setHideUnavailable((v) => !v)}
              >
                {t("modelSelection.hideUnavailable")}
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
                  {t("common.clear")}
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
                      <span className="font-medium">{t(`hardcodedStrings.models.${model.nameKey}`, model.nameKey)}</span>
                      <span className="text-xs text-muted-foreground">
                        {model.provider}
                      </span>
                    </div>
                    {model.available === false && (
                      <span className="text-[10px] rounded-full border px-2 py-0.5 text-muted-foreground">
                        {t("modelSelection.unavailable")}
                      </span>
                    )}
                  </button>
                );
              })}

              {filteredModels.length === 0 && (
                <div className="px-3 py-4 text-xs text-muted-foreground">
                  {t("modelSelection.noModelsMatch")}
                </div>
              )}
            </div>

            <div className="md:w-1/2 rounded-xl border bg-muted/40 p-3 text-sm space-y-2 max-h-72 overflow-y-auto">
              {selectedModel ? (
                <>
                  <div className="font-medium">{t(`hardcodedStrings.models.${selectedModel.nameKey}`, selectedModel.nameKey)}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t(selectedModel.description)}
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {t("modelSelection.selectModelForDetails")}
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
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            size="sm"
            className="rounded-xl px-4"
            onClick={() => onOpenChange(false)}
          >
            {t("common.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}