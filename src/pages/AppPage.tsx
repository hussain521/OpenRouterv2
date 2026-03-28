import Navbar from "@/components/Navbar";
import { GlobalRanking } from "@/components/GlobalRanking";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { PopularAppsSection } from "@/components/app-ranking/PopularAppsSection";
import { RankCard } from "@/components/app-ranking/RankCard";
import { TrendingAppsSection } from "@/components/app-ranking/TrendingAppsSection";

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

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 lg:space-y-12 dark:bg-gray-950">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{t("appRanking.title")}</h1>

        <PopularAppsSection apps={popularApps} />

        <TrendingAppsSection apps={trendingApps} />

        {/* Rankings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
