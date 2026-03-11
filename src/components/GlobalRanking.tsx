import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

const rankingKeys = [
  "openClaw",
  "kiloCode",
  "blackbox",
  "liteLLM",
  "claudeCode",
  "descript",
  "janitorAI",
  "cline",
  "isekaiZero",
  "rooCode",
]

function RankingRow({ item, rank }: { item: { name: string; desc: string; tokens: string }; rank: number }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-none">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 dark:text-gray-400 w-6">
          {rank}.
        </span>

        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800"></div>

        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.desc}
          </p>
        </div>
      </div>

      <span className="font-medium text-gray-900 dark:text-gray-100">
        {item.tokens}
      </span>
    </div>
  )
}

export function GlobalRanking() {
  const { t } = useTranslation()
  const left = rankingKeys.slice(0, 5)
  const right = rankingKeys.slice(5, 10)

  return (
    <Card className="rounded-2xl mt-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
          {t("globalRanking.title")}
        </CardTitle>

        <select className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>{t("globalRanking.today")}</option>
          <option>{t("globalRanking.thisWeek")}</option>
          <option>{t("globalRanking.thisMonth")}</option>
        </select>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            {left.map((key, index) => (
              <RankingRow
                key={key}
                item={{
                  name: t(`globalRanking.items.${key}.name`),
                  desc: t(`globalRanking.items.${key}.desc`),
                  tokens: t(`globalRanking.items.${key}.tokens`),
                }}
                rank={index + 1}
              />
            ))}
          </div>

          <div>
            {right.map((key, index) => (
              <RankingRow
                key={key}
                item={{
                  name: t(`globalRanking.items.${key}.name`),
                  desc: t(`globalRanking.items.${key}.desc`),
                  tokens: t(`globalRanking.items.${key}.tokens`),
                }}
                rank={index + 6}
              />
            ))}
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-center items-center gap-6 mt-8 text-sm">
          <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
            ‹
          </button>

          <span className="text-gray-500 dark:text-gray-400">
            {t("globalRanking.pagination")}
          </span>

          <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
            ›
          </button>
        </div>
      </CardContent>
    </Card>
  )
}