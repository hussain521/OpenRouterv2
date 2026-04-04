import SectionHeader from "./SectionHeader";
import ModelCard from "./ModelCard";
import { useTranslation } from "react-i18next";

export default function FeaturedModels() {
  const { t } = useTranslation();
  
  const models = [
    {
      logo: "/OpenAI.svg",
      name: "GPT-4",
      provider: "OpenAI",
      badge: t("common.new"),
      tokens: "128k",
      trend: "+5.24%",
    },
    {
      logo: "/GoogleGemini.svg",
      name: "Gemini 1.5 Pro",
      provider: "Google",
      tokens: "1M",
      trend: "+10.5%",
    },
    {
      logo: "/Meta.png",
      name: "Llama 3",
      provider: "Meta",
      tokens: "400k",
      trend: "+8.1%",
    },
    {
      logo: "/GoogleVertex.svg",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      tokens: "200k",
      trend: "+12.39%",
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
