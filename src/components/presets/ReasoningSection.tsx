import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";

export default function ReasoningSection() {
  const { t } = useTranslation();

  return (
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
  );
}