import SectionHeader from "./SectionHeader";
import AgentCard from "./AgentCard";
import { useTranslation } from "react-i18next";

export default function FeaturedAgents() {
  const { t } = useTranslation();
  
  const agents = [
    {
      image: "/OpenAI.svg",
      logo: "/OpenAI.svg",
      name: "OpenAI",
      description: t("featuredAgents.openai.description"),
    },
    {
      image: "/Meta.png",
      logo: "/GoogleGemini.svg",
      name: "Google Gemini",
      description: t("featuredAgents.gemini.description"),
    },
    {
      image: "/Meta.png",
      logo: "/Meta.png",
      name: "Meta AI",
      description: t("featuredAgents.meta.description"),
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          title={t("featuredAgents.title")}
          subtitle={t("featuredAgents.subtitle")}
          viewAll
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
