import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

export default function SystemPromptSection() {
  const { t } = useTranslation();

  return (
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
  );
}