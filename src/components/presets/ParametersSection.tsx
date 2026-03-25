import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Sliders } from "lucide-react";

export default function ParametersSection() {
  const { t } = useTranslation();

  const parameters = [
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
  ];

  return (
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
        {parameters.map((param) => (
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

            <Input
              type="number"
              className="max-w-xs"
              placeholder="1.00"
            />
          </div>
        ))}
      </div>
    </div>
  );
}