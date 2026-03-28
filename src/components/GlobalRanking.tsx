import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
  "dummy1",
  "dummy2",
  "dummy3",
  "dummy4",
  "dummy5",
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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(rankingKeys.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRankingKeys = rankingKeys.slice(startIndex, endIndex)

  const left = currentRankingKeys.slice(0, 5)
  const right = currentRankingKeys.slice(5, 10)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

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
                rank={startIndex + index + 1}
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
                rank={startIndex + index + 6}
              />
            ))}
          </div>
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(currentPage - 1)
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={i + 1 === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(i + 1)
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(currentPage + 1)
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  )
}