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
    <section className="py-8 sm:py-12 lg:py-16 xl:py-18">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold tracking-tight text-gray-900 dark:text-foreground leading-tight">
          {t("hero.unifiedInterface")}
        </h1>

        <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("hero.better")}{" "}
          <span className="text-indigo-600 dark:text-primary font-medium hover:text-indigo-500 dark:hover:text-primary/80 cursor-pointer transition-colors">
            {t("hero.prices")}
          </span>
          , {t("hero.better")}{" "}
          <span className="text-indigo-600 dark:text-primary font-medium hover:text-indigo-500 dark:hover:text-primary/80 cursor-pointer transition-colors">
            {t("hero.uptime")}
          </span>
          , {t("hero.noSubscriptions")}.
        </p>

        <div className="mt-6 sm:mt-7 lg:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Button className="w-full sm:w-auto sm:min-w-[180px] lg:min-w-[200px] px-6 sm:px-7 lg:px-8 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-medium rounded-lg bg-[#6467F2] hover:bg-indigo-700 transition-colors">
            {t("hero.getApiKey")}
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto sm:min-w-[180px] lg:min-w-[200px] px-6 sm:px-7 lg:px-8 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-medium rounded-lg flex items-center justify-center gap-2 border-gray-200 dark:border-border text-gray-700 dark:text-muted-foreground hover:bg-gray-50 dark:hover:bg-accent transition-colors"
          >
            <span>{t("hero.exploreModels")}</span>
            <img
              src={logos[iconIndex]}
              alt={t("common.aiProviderLogo")}
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-300"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
