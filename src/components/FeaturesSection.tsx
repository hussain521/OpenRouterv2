import FeatureCard from "./FeatureCard";
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation();
  
  const features = [
    {
      image: "/GoogleVertex.svg",
      title: t("features.oneApi.title"),
      description: t("features.oneApi.description"),
      linkText: t("features.oneApi.linkText"),
    },
    {
      image: "/Meta.png",
      title: t("features.availability.title"),
      description: t("features.availability.description"),
      linkText: t("features.availability.linkText"),
    },
    {
      image: "/images/performance.png",
      title: t("features.performance.title"),
      description: t("features.performance.description"),
      linkText: t("features.performance.linkText"),
    },
    {
      image: "/images/security.png",
      title: t("features.dataPolicies.title"),
      description: t("features.dataPolicies.description"),
      linkText: t("features.dataPolicies.linkText"),
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
