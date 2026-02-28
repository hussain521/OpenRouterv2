import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      image: "/GoogleVertex.svg",
      title: "One API for Any Model",
      description:
        "Access all major models through a single, unified interface. OpenAI SDK works out of the box.",
      linkText: "Browse all",
    },
    {
      image: "/Meta.png",
      title: "Higher Availability",
      description:
        "Reliable AI models via our distributed infrastructure. Fall back to other providers when one goes down.",
      linkText: "Learn more",
    },
    {
      image: "/images/performance.png",
      title: "Price and Performance",
      description:
        "Keep costs in check without sacrificing speed. OpenRouter runs at the edge for minimal latency.",
      linkText: "Learn more",
    },
    {
      image: "/images/security.png",
      title: "Custom Data Policies",
      description:
        "Protect your organization with fine grained data policies. Ensure prompts only go to trusted providers.",
      linkText: "View docs",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
