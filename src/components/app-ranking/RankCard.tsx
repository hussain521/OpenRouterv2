import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface RankItem {
  name: string;
  desc: string;
  tokens: string;
}

interface RankCardProps {
  title: string;
  data: RankItem[];
}

export function RankCard({ title, data }: RankCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg">{title}</CardTitle>

        <button className="text-sm text-blue-600 hover:underline">
          {t("appRanking.viewAll")} →
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-start justify-between gap-4 p-3 -mx-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <div className="flex items-start gap-4">
              <span className="text-sm text-muted-foreground w-4">
                {index + 1}.
              </span>

              <div className="w-10 h-10 rounded-lg bg-muted"></div>

              <div>
                <p className="font-medium">{t(item.name)}</p>

                <p className="text-sm text-muted-foreground">{t(item.desc)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t(item.tokens)}</span>
              <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}