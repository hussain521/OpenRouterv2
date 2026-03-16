import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ComparisonCardsProps {
  onAddModel: () => void;
}

export function ComparisonCards({ onAddModel }: ComparisonCardsProps) {
  const { t } = useTranslation();
  const slots = [1, 2, 3];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {slots.map((slot) => (
        <Card
          key={slot}
          className="h-[420px] border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/40 transition"
          onClick={onAddModel}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Plus className="w-6 h-6" />
            <span className="text-sm">{t('modelComparison.addModel')}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}