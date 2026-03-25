import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ModelSelectionDialog } from "@/components/dialogs";
import { Bot, Plus } from "lucide-react";

export default function ModelsSection() {
  const { t } = useTranslation();
  const [modelsDialogOpen, setModelsDialogOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-gray-500" />
            <h2 className="font-medium text-base">{t("presets.new.models.title")}</h2>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1">
            <h3 className="font-medium">{t("presets.new.models.selection.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("presets.new.models.selection.description")}
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-xl w-fit gap-2"
            onClick={() => setModelsDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            {t("presets.new.models.addModel")}
          </Button>
        </div>
      </div>

      {/* Model selection dialog */}
      <ModelSelectionDialog
        open={modelsDialogOpen}
        onOpenChange={setModelsDialogOpen}
      />
    </>
  );
}