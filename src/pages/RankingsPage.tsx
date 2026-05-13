import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AIModelChart } from "@/components/charts/ai-model-chart"
import { MarketShareChart } from "@/components/charts/market-share-chart"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useTranslation } from "react-i18next"
import { usePageTitle } from "@/hooks/usePageTitle"
import Leaderboard from "@/components/Leaderboard"

export default function RankingsPage() {
  const { t } = useTranslation()
  usePageTitle(t("nav.rankings", "AI Model Rankings"))

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      <main className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-foreground">
            {t("nav.rankings", "AI Model Rankings")}
          </h1>
          <p className="text-gray-700 dark:text-muted-foreground text-sm sm:text-base">
            {t("explore.rankings.description", "Based on real usage data from millions of users accessing models through OpenRouter.")}
          </p>
        </div>

        <Card className="border-0 shadow-none bg-white dark:bg-background">
          <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-foreground">
              {t("features.models", "Top Models")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            <div className="min-w-0 overflow-x-auto">
              <AIModelChart />
            </div>
            <div className="min-w-0 overflow-x-auto">
              <Leaderboard/>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none bg-white dark:bg-background">
          <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-foreground">
              {t("globalRanking.marketShare.title", "Market Share")}
            </CardTitle>
            <p className="text-sm text-gray-700 dark:text-muted-foreground">
              {t("globalRanking.marketShare.subtitle", "Compare OpenRouter token share by model author")}
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            <div className="min-w-0 overflow-x-auto">
              <MarketShareChart />
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}