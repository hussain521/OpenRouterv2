import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalRanking } from "@/components/GlobalRanking";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

function RankCard({ title, data }: any) {
  const { t } = useTranslation();

  return (
    <Card className="rounded-2xl dark:bg-gray-900 dark:border-gray-800">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg dark:text-white">{title}</CardTitle>

        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {t("appRanking.viewAll")} →
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        {data.map((item: any, index: number) => (
          <div key={index} className="flex items-start justify-between gap-4 p-3 -mx-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <div className="flex items-start gap-4">
              <span className="text-sm text-muted-foreground w-4">
                {index + 1}.
              </span>

              <div className="w-10 h-10 rounded-lg bg-muted dark:bg-gray-800"></div>

              <div>
                <p className="font-medium dark:text-white">{t(item.name)}</p>

                <p className="text-sm text-muted-foreground dark:text-gray-400">{t(item.desc)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium dark:text-gray-300">{t(item.tokens)}</span>
              <span className="text-muted-foreground dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function AppPage() {
  const { t } = useTranslation();

  const popularApps = [
    {
      name: "apps.openClaw.name",
      desc: "apps.openClaw.desc",
      tokens: "apps.openClaw.tokens",
      borderColor: "border-blue-500",
    },
    {
      name: "apps.kiloCode.name",
      desc: "apps.kiloCode.desc",
      tokens: "apps.kiloCode.tokens",
      borderColor: "border-purple-500",
    },
    {
      name: "apps.blackbox.name",
      desc: "apps.blackbox.desc",
      tokens: "apps.blackbox.tokens",
      borderColor: "border-green-500",
    },
    {
      name: "apps.liteLLM.name",
      desc: "apps.liteLLM.desc",
      tokens: "apps.liteLLM.tokens",
      borderColor: "border-orange-500",
    },
  ];

  const trendingApps = [
    {
      name: "apps.openClaw.name",
      tokens: "trending.openClaw.tokens",
      growth: "trending.openClaw.growth",
      borderColor: "border-blue-500",
    },
    {
      name: "apps.blackbox.name",
      tokens: "trending.blackbox.tokens",
      growth: "trending.blackbox.growth",
      borderColor: "border-red-500",
    },
    {
      name: "apps.liteLLM.name",
      tokens: "trending.liteLLM.tokens",
      growth: "trending.liteLLM.growth",
      borderColor: "border-yellow-500",
    },
    {
      name: "apps.claude.name",
      tokens: "trending.claude.tokens",
      growth: "trending.claude.growth",
      borderColor: "border-pink-500",
    },
    {
      name: "apps.descript.name",
      tokens: "trending.descript.tokens",
      growth: "trending.descript.growth",
      borderColor: "border-indigo-500",
    },
    {
      name: "apps.paperboy.name",
      tokens: "trending.paperboy.tokens",
      growth: "trending.paperboy.growth",
      borderColor: "border-teal-500",
    },
  ];

  const codingAgents = [
    {
      name: "apps.kiloCode.name",
      desc: "apps.kiloCode.desc",
      tokens: "ranking.kiloCode",
    },
    {
      name: "apps.blackbox.name",
      desc: "apps.blackbox.desc",
      tokens: "ranking.blackbox",
    },
    {
      name: "apps.liteLLM.name",
      desc: "apps.liteLLM.desc",
      tokens: "ranking.liteLLM",
    },
    {
      name: "apps.claude.name",
      desc: "apps.claude.desc",
      tokens: "ranking.claude",
    },
    {
      name: "apps.cline.name",
      desc: "apps.cline.desc",
      tokens: "ranking.cline",
    },
  ];

  const productivity = [
    {
      name: "apps.openClaw.name",
      desc: "apps.openClaw.desc",
      tokens: "ranking.openClaw",
    },
    {
      name: "apps.hermes.name",
      desc: "apps.hermes.desc",
      tokens: "ranking.hermes",
    },
    {
      name: "apps.gobii.name",
      desc: "apps.gobii.desc",
      tokens: "ranking.gobii",
    },
    {
      name: "apps.openWebui.name",
      desc: "apps.openWebui.desc",
      tokens: "ranking.openWebui",
    },
    {
      name: "apps.jobleads.name",
      desc: "apps.jobleads.desc",
      tokens: "ranking.jobleads",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container max-w-7xl mx-auto py-12 space-y-12 dark:bg-gray-950">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("appRanking.title")}</h1>

        {/* Most Popular */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t("appRanking.mostPopular")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularApps.map((app, i) => (
              <Card key={i} className={`rounded-2xl border ${app.borderColor} group transition-all hover:shadow-lg dark:bg-gray-900 dark:hover:shadow-2xl`}>
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 bg-muted dark:bg-gray-800 rounded-xl"></div>

                  <h3 className={`font-semibold text-lg transition-colors text-gray-900 dark:text-white ${
                    app.borderColor === 'border-blue-500' ? 'group-hover:text-blue-500 dark:group-hover:text-blue-400' :
                    app.borderColor === 'border-purple-500' ? 'group-hover:text-purple-500 dark:group-hover:text-purple-400' :
                    app.borderColor === 'border-green-500' ? 'group-hover:text-green-500 dark:group-hover:text-green-400' :
                    app.borderColor === 'border-orange-500' ? 'group-hover:text-orange-500 dark:group-hover:text-orange-400' : ''
                  }`}>{t(app.name)}</h3>

                  <p className="text-sm text-muted-foreground dark:text-gray-400">{t(app.desc)}</p>

                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {t(app.tokens)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t("appRanking.trending")}
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingApps.map((app, i) => (
              <Card key={i} className={`rounded-xl border ${app.borderColor} group transition-all hover:shadow-lg dark:bg-gray-900 dark:hover:shadow-2xl`}>
                <CardContent className="p-4 space-y-3">
                  <div className="w-10 h-10 bg-muted dark:bg-gray-800 rounded-lg"></div>

                  <h4 className={`text-sm font-semibold transition-colors text-gray-900 dark:text-white ${
                    app.borderColor === 'border-blue-500' ? 'group-hover:text-blue-500 dark:group-hover:text-blue-400' :
                    app.borderColor === 'border-red-500' ? 'group-hover:text-red-500 dark:group-hover:text-red-400' :
                    app.borderColor === 'border-yellow-500' ? 'group-hover:text-yellow-500 dark:group-hover:text-yellow-400' :
                    app.borderColor === 'border-pink-500' ? 'group-hover:text-pink-500 dark:group-hover:text-pink-400' :
                    app.borderColor === 'border-indigo-500' ? 'group-hover:text-indigo-500 dark:group-hover:text-indigo-400' :
                    app.borderColor === 'border-teal-500' ? 'group-hover:text-teal-500 dark:group-hover:text-teal-400' : ''
                  }`}>{t(app.name)}</h4>

                  <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
                    <span>{t(app.tokens)}</span>

                    <span className="text-green-500 dark:text-green-400 font-medium">
                      {t(app.growth)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rankings */}
        <div className="grid md:grid-cols-2 gap-6">
          <RankCard
            title={t("appRanking.topCodingAgents")}
            data={codingAgents}
          />

          <RankCard
            title={t("appRanking.topProductivity")}
            data={productivity}
          />

          <RankCard title={t("appRanking.topCreative")} data={codingAgents} />

          <RankCard
            title={t("appRanking.topEntertainment")}
            data={productivity}
          />
        </div>

        <GlobalRanking />
      </div>

      <Footer />
    </>
  );
}
