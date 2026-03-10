import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface PopularApp {
  name: string;
  desc: string;
  tokens: string;
  borderColor: string;
}

interface PopularAppsSectionProps {
  apps: PopularApp[];
}

export function PopularAppsSection({ apps }: PopularAppsSectionProps) {
  const { t } = useTranslation();

  const getHoverColorClass = (borderColor: string) => {
    switch (borderColor) {
      case 'border-blue-500':
        return 'group-hover:text-blue-500';
      case 'border-purple-500':
        return 'group-hover:text-purple-500';
      case 'border-green-500':
        return 'group-hover:text-green-500';
      case 'border-orange-500':
        return 'group-hover:text-orange-500';
      default:
        return '';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        {t("appRanking.mostPopular")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map((app, i) => (
          <Card 
            key={i} 
            className={`rounded-2xl border ${app.borderColor} group transition-all hover:shadow-lg`}
          >
            <CardContent className="p-6 space-y-3">
              <div className="w-12 h-12 bg-muted rounded-xl"></div>

              <h3 className={`font-semibold text-lg transition-colors ${getHoverColorClass(app.borderColor)}`}>
                {t(app.name)}
              </h3>

              <p className="text-sm text-muted-foreground">{t(app.desc)}</p>

              <p className="text-sm text-muted-foreground">
                {t(app.tokens)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}