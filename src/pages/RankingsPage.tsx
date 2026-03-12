import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AIModelChart } from "@/components/charts/ai-model-chart"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useTranslation } from "react-i18next"
import { usePageTitle } from "@/hooks/usePageTitle"
import Leaderboard from "@/components/Leaderboard"

export default function RankingsPage() {
  const { t } = useTranslation()
  usePageTitle(t("nav.rankings", "AI Model Rankings"))

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 transition-all duration-300">
        <Navbar />
      </div>

      <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            {t("nav.rankings", "AI Model Rankings")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
            {t("explore.rankings.description", "Based on real usage data from millions of users accessing models through OpenRouter.")}
          </p>
        </div>

        <Card className="border-0 shadow-none bg-white dark:bg-black">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-900 dark:text-gray-100">
              {t("features.models", "Top Models")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <AIModelChart />
            <Leaderboard/>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}