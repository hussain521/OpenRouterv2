import FeatureCard from "./FeatureCard";
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation();
  
  const features = [
    {
      image: "/images/features/single-api.png",
      title: "Unified API",
      description: "Access all models through a single, consistent API.",
      linkText: "Learn More",
    },
    {
      image: "/images/features/high-availability.png",
      title: "High Availability",
      description: "Ensure your applications are always available with our robust infrastructure.",
      linkText: "Discover",
    },
    {
      image: "/images/features/performance.png",
      title: "Top Performance",
      description: "Experience lightning-fast response times for all your AI needs.",
      linkText: "See Benchmarks",
    },
    {
      image: "/images/features/data-privacy.png",
      title: "Data Privacy & Security",
      description: "Your data is yours. We ensure top-tier security and privacy.",
      linkText: "Our Policies",
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
