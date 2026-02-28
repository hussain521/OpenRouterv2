import SectionHeader from "./SectionHeader";
import AgentCard from "./AgentCard";

export default function FeaturedAgents() {
  const agents = [
    {
      image: "/OpenAI.svg",
      logo: "/OpenAI.svg",
      name: "OpenAI",
      description: "The easiest way to go from idea to app",
    },
    {
      image: "/Meta.png",
      logo: "/GoogleGemini.svg",
      name: "Google Gemini",
      description: "AI agent for builders",
    },
    {
      image: "/Meta.png",
      logo: "/Meta.png",
      name: "Meta AI",
      description: "Everything you need for agentic development",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Featured Agents"
          subtitle="250k+ apps using OpenRouter with 4.2M+ users globally"
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
