import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface PresetHeaderProps {
  onSave?: () => void;
}

export default function PresetHeader({ onSave }: PresetHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Check if we came from settings path
    if (location.pathname.includes('/settings/')) {
      navigate('/settings/presets');
    } else {
      navigate('/presets');
    }
  };

  return (
    <div className="flex items-center justify-between w-full -mt-16">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-[22px] font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          {t("presets.new.pageTitle")}
        </h1>
      </div>
      <Button className="rounded-xl px-6" onClick={onSave}>
        {t("presets.new.savePreset")}
      </Button>
    </div>
  );
}