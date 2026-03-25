import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";

export default function BasicInfoSection() {
  const { t } = useTranslation();

  return (
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
  );
}