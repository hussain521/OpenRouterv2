import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FaRobot } from "react-icons/fa";

const models = [
  {
    rank: 1,
    name: "MiniMax M2.5",
    company: "minimax",
    tokens: "2.01T",
    change: "+23%",
  },
  {
    rank: 2,
    name: "Step 3.5 Flash (free)",
    company: "stepfun",
    tokens: "1.07T",
    change: "+112%",
  },
  {
    rank: 3,
    name: "Gemini 3 Flash Preview",
    company: "google",
    tokens: "994B",
    change: "-8%",
  },
  {
    rank: 4,
    name: "DeepSeek V3.2",
    company: "deepseek",
    tokens: "939B",
    change: "+23%",
  },
  {
    rank: 5,
    name: "Claude Sonnet 4.6",
    company: "anthropic",
    tokens: "794B",
    change: "+16%",
  },
  {
    rank: 6,
    name: "Claude Opus 4.6",
    company: "anthropic",
    tokens: "769B",
    change: "+7%",
  },
  {
    rank: 7,
    name: "Kimi K2.5",
    company: "moonshotai",
    tokens: "568B",
    change: "-34%",
  },
  {
    rank: 8,
    name: "Gemini 2.5 Flash",
    company: "google",
    tokens: "540B",
    change: "+4%",
  },
  {
    rank: 9,
    name: "Grok 4.1 Fast",
    company: "x-ai",
    tokens: "534B",
    change: "-10%",
  },
  {
    rank: 10,
    name: "gpt-oss - 120b",
    company: "openai",
    tokens: "517B",
    change: "+36%",
  },
  {
    rank: 11,
    name: "GPT-4 Turbo",
    company: "openai",
    tokens: "489B",
    change: "+15%",
  },
  {
    rank: 12,
    name: "Claude Haiku 3.5",
    company: "anthropic",
    tokens: "467B",
    change: "+8%",
  },
  {
    rank: 13,
    name: "Llama 3.1 70B",
    company: "meta",
    tokens: "445B",
    change: "+22%",
  },
  {
    rank: 14,
    name: "Mixtral 8x7B",
    company: "mistral",
    tokens: "398B",
    change: "-5%",
  },
  {
    rank: 15,
    name: "Yi Large",
    company: "yi",
    tokens: "374B",
    change: "+19%",
  },
  {
    rank: 16,
    name: "Command R+",
    company: "cohere",
    tokens: "352B",
    change: "+12%",
  },
  {
    rank: 17,
    name: "Qwen 2.5 72B",
    company: "alibaba",
    tokens: "329B",
    change: "+7%",
  },
  {
    rank: 18,
    name: "Phi-3.5 Medium",
    company: "microsoft",
    tokens: "307B",
    change: "-3%",
  },
  {
    rank: 19,
    name: "Gemma 2 27B",
    company: "google",
    tokens: "285B",
    change: "+14%",
  },
  {
    rank: 20,
    name: "Solar 10.7B",
    company: "upstage",
    tokens: "263B",
    change: "+9%",
  },
];

export default function Leaderboard() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const [timePeriod, setTimePeriod] = useState("thisWeek");

  const itemsToShow = showMore ? 20 : 10;
  const left = models.slice(0, Math.ceil(itemsToShow / 2));
  const right = models.slice(Math.ceil(itemsToShow / 2), itemsToShow);

  const Row = ({ item }: { item: { rank: number; name: string; company: string; tokens: string; change: string } }) => (
    <div className="flex  items-center justify-between py-3   last:border-none">
      <div className="flex items-center gap-3">
        <span className="w-6 text-gray-500 dark:text-gray-400 text-sm">{item.rank}.</span>

        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
          <FaRobot className="text-gray-600 dark:text-gray-400 text-sm" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t("common.by")} {item.company}</p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-sm text-gray-900 dark:text-gray-100">{item.tokens} {t("modelCard.tokensLabel")}</p>
        <p
          className={`text-xs font-medium ${
            item.change.includes("-")
              ? "text-red-500 dark:text-red-400"
              : "text-green-500 dark:text-green-400"
          }`}
        >
          {item.change}
        </p>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-6xl mx-auto border-0 shadow-none bg-white dark:bg-black">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("nav.rankings", "LLM Leaderboard")}
          </h2>

          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t("globalRanking.today", "Today")}</SelectItem>
              <SelectItem value="thisWeek">{t("globalRanking.thisWeek", "This Week")}</SelectItem>
              <SelectItem value="thisMonth">{t("globalRanking.thisMonth", "This Month")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            onClick={() => setShowMore(!showMore)}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {showMore ? t("common.viewLess", "Show less") : t("common.viewAll", "Show more")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
