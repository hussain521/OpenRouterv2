import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface TrendingApp {
  name: string;
  tokens: string;
  growth: string;
  borderColor: string;
}

interface TrendingAppsSectionProps {
  apps: TrendingApp[];
}

export function TrendingAppsSection({ apps }: TrendingAppsSectionProps) {
  const { t } = useTranslation();

  const getHoverColorClass = (borderColor: string) => {
    switch (borderColor) {
      case 'border-blue-500':
        return 'group-hover:text-blue-500';
      case 'border-red-500':
        return 'group-hover:text-red-500';
      case 'border-yellow-500':
        return 'group-hover:text-yellow-500';
      case 'border-pink-500':
        return 'group-hover:text-pink-500';
      case 'border-indigo-500':
        return 'group-hover:text-indigo-500';
      case 'border-teal-500':
        return 'group-hover:text-teal-500';
      default:
        return '';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        {t("appRanking.trending")}
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {apps.map((app, i) => (
          <Card 
            key={i} 
            className={`rounded-xl border ${app.borderColor} group transition-all hover:shadow-lg`}
          >
            <CardContent className="p-4 space-y-3">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>

              <h4 className={`text-sm font-semibold transition-colors ${getHoverColorClass(app.borderColor)}`}>
                {t(app.name)}
              </h4>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t(app.tokens)}</span>

                <span className="text-green-500 font-medium">
                  {t(app.growth)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}