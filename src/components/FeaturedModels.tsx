import SectionHeader from "./SectionHeader";
import ModelCard from "./ModelCard";

export default function FeaturedModels() {
  const models = [
    {
      logo: "/OpenAI.svg",
      name: "Claude Opus 4.6",
      provider: "OpenAI",
      badge: "New",
      tokens: "555.8B",
      trend: "+102.39%",
    },
    {
      logo: "/GoogleGemini.svg",
      name: "Gemini 3 Pro Preview",
      provider: "Google",
      tokens: "446.9B",
      trend: "+5.24%",
    },
    {
      logo: "/GoogleVertex.svg",
      name: "Vertex AI Preview",
      provider: "Google",
      tokens: "178.7B",
      trend: "-8.84%",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Featured Models"
          subtitle="300+ active models on 60+ providers"
          viewAll
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {models.map((model, index) => (
            <ModelCard key={index} {...model} />
          ))}
        </div>
      </div>
    </section>
  );
}
