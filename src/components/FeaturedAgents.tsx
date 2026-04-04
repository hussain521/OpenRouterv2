import SectionHeader from "./SectionHeader";
import AgentCard from "./AgentCard";
import { useTranslation } from "react-i18next";

export default function FeaturedAgents() {
  const { t } = useTranslation();
  
  const agents = [
    {
      image: "/images/agents/gpt4.png",
      logo: "/OpenAI.svg",
      name: "GPT-4 Agent",
      description: "An agent powered by GPT-4, capable of complex reasoning and task completion.",
    },
    {
      image: "/images/agents/gemini.png",
      logo: "/GoogleGemini.svg",
      name: "Gemini Agent",
      description: "An agent leveraging Gemini's multimodal capabilities for advanced understanding.",
    },
    {
      image: "/images/agents/llama3.png",
      logo: "/Meta.png",
      name: "Llama 3 Agent",
      description: "An agent built on Meta's Llama 3, offering strong performance and efficiency.",
    },
    {
      image: "/images/agents/claude3.png",
      logo: "/Anthropic.svg",
      name: "Claude 3 Agent",
      description: "An agent utilizing Claude 3 for sophisticated dialogue and content generation.",
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
