import SectionHeader from "./SectionHeader";
import ModelCard from "./ModelCard";
import { useTranslation } from "react-i18next";

export default function FeaturedModels() {
  const { t } = useTranslation();
  
  const models = [
    {
      logo: "/OpenAI.svg",
      name: t("featuredModels.models.claudeOpus.name"),
      provider: t("featuredModels.models.claudeOpus.provider"),
      badge: t("common.new"),
      tokens: "555.8B",
      trend: "+102.39%",
    },
    {
      logo: "/GoogleGemini.svg",
      name: t("featuredModels.models.geminiPro.name"),
      provider: t("featuredModels.models.geminiPro.provider"),
      tokens: "446.9B",
      trend: "+5.24%",
    },
    {
      logo: "/GoogleVertex.svg",
      name: t("featuredModels.models.vertexAI.name"),
      provider: t("featuredModels.models.vertexAI.provider"),
      tokens: "178.7B",
      trend: "-8.84%",
    },
  ];

  return (
    <section className="py-6 sm:py-8 lg:py-12 xl:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t("featuredModels.title")}
          subtitle={t("featuredModels.subtitle")}
          viewAll
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 auto-rows-fr">
          {models.map((model, index) => (
            <ModelCard key={index} {...model} />
          ))}
        </div>
      </div>
    </section>
  );
}
