import { useTranslation } from "react-i18next";
import { FaBuilding } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const marketShareData = [
  {
    rank: 1,
    name: "google",
    tokens: "731B",
    percentage: "34.8%",
    tokensNumeric: 731,
    color: "#FF6B6B"
  },
  {
    rank: 2,
    name: "anthropic",
    tokens: "422B",
    percentage: "20.1%",
    tokensNumeric: 422,
    color: "#4ECDC4"
  },
  {
    rank: 3,
    name: "openai",
    tokens: "403B",
    percentage: "19.2%",
    tokensNumeric: 403,
    color: "#45B7D1"
  },
  {
    rank: 4,
    name: "deepseek",
    tokens: "252B",
    percentage: "12.0%",
    tokensNumeric: 252,
    color: "#96CEB4"
  },
  {
    rank: 5,
    name: "meta-llama",
    tokens: "106B",
    percentage: "5.0%",
    tokensNumeric: 106,
    color: "#FFEAA7"
  },
  {
    rank: 6,
    name: "qwen",
    tokens: "61.2B",
    percentage: "2.9%",
    tokensNumeric: 61.2,
    color: "#DDA0DD"
  },
  {
    rank: 7,
    name: "mistralai",
    tokens: "52.8B",
    percentage: "2.5%",
    tokensNumeric: 52.8,
    color: "#98D8C8"
  },
  {
    rank: 8,
    name: "microsoft",
    tokens: "13.6B",
    percentage: "0.6%",
    tokensNumeric: 13.6,
    color: "#F7DC6F"
  },
  {
    rank: 9,
    name: "x-ai",
    tokens: "12.8B",
    percentage: "0.6%",
    tokensNumeric: 12.8,
    color: "#BB8FCE"
  },
  {
    rank: 10,
    name: "others",
    tokens: "46.7B",
    percentage: "2.2%",
    tokensNumeric: 46.7,
    color: "#F1948A"
  },
];

interface MarketShareItem {
  rank: number;
  name: string;
  tokens: string;
  percentage: string;
  tokensNumeric: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: MarketShareItem;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  const { t } = useTranslation();
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover/95 border border-border rounded-md backdrop-blur-sm shadow-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          ></div>
          <span className="text-popover-foreground font-medium text-sm">{t(`marketShare.companies.${data.name}`)}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground text-xs">{t('modelCard.tokens')}:</span>
            <span className="text-popover-foreground text-xs font-semibold">{data.tokens}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground text-xs">Share:</span>
            <span className="text-popover-foreground text-xs font-semibold">{data.percentage}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function MarketShareChart() {
  const { t } = useTranslation();

  const itemsToShow = 10;
  const left = marketShareData.slice(0, Math.ceil(itemsToShow / 2));
  const right = marketShareData.slice(Math.ceil(itemsToShow / 2), itemsToShow);

  const Row = ({ item }: { item: { rank: number; name: string; tokens: string; percentage: string; color: string } }) => (
    <div className="flex items-center justify-between py-3 last:border-none">
      <div className="flex items-center gap-3">
        <span className="w-6 text-gray-500 dark:text-muted-foreground text-sm">{item.rank}.</span>

        <div className="bg-gray-100 dark:bg-secondary p-2 rounded-full">
          <FaBuilding className="text-gray-600 dark:text-secondary-foreground text-sm" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm text-gray-900 dark:text-foreground truncate">{t(`marketShare.companies.${item.name}`)}</p>
          <p className="text-xs text-gray-500 dark:text-muted-foreground">{t('common.by')} {t(`marketShare.companies.${item.name}`)}</p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-sm text-gray-900 dark:text-foreground">{item.tokens}</p>
        <p className="text-xs text-gray-500 dark:text-muted-foreground">{item.percentage}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Chart */}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={marketShareData}
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              className="text-xs fill-gray-600 dark:fill-muted-foreground"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs fill-gray-600 dark:fill-muted-foreground"
              tick={{ fill: 'currentColor' }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="tokensNumeric" radius={[0, 4, 4, 0]}>
              {marketShareData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leaderboard Style List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-1">
          {left.map((item) => (
            <Row key={item.rank} item={item} />
          ))}
        </div>

        <div className="space-y-1">
          {right.map((item) => (
            <Row key={item.rank} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}