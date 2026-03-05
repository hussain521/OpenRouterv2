import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  const [iconIndex, setIconIndex] = useState(0);
  
  const logos = [
    "/GoogleAIStudio.svg",
    "/GoogleGemini.svg",
    "/GoogleVertex.svg",
    "/Meta.png",
    "/OpenAI.svg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % logos.length);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 md:py-18">
      <div className="max-w-5xl mx-auto text-center px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t("hero.unifiedInterface")}
        </h1>

        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
          {t("hero.better")}{" "}
          <span className="text-indigo-600 font-medium hover:text-indigo-400 cursor-pointer">
            {t("hero.prices")}
          </span>
          , {t("hero.better")}{" "}
          <span className="text-indigo-600 font-medium hover:text-indigo-400 cursor-pointer">
            {t("hero.uptime")}
          </span>
          , {t("hero.noSubscriptions")}.
        </p>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <Button className="w-full sm:w-48 px-6 md:px-8 py-4 md:py-6 text-sm md:text-base rounded-md bg-[#6467F2] hover:bg-indigo-700">
            {t("hero.getApiKey")}
          </Button>

          <Button variant="outline" className="w-full sm:w-48 px-6 md:px-8 py-4 md:py-6 text-sm md:text-base rounded-md flex items-center justify-center gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800">
            <span>{t("hero.exploreModels")}</span>
            <img
              src={logos[iconIndex]}
              alt={t("common.aiProviderLogo")}
              className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
