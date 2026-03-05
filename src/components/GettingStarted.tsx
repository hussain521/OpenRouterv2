import StepCard from "./StepCard";
import { useTranslation } from "react-i18next";

export default function GettingStarted() {
  const { t } = useTranslation();
  
  return (
    <section className="py-8 md:py-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
        <StepCard
          step={1}
          title={t("gettingStarted.step1.title")}
          description={t("gettingStarted.step1.description")}
        >
          <div className="h-16 md:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </StepCard>

        <StepCard
          step={2}
          title={t("gettingStarted.step2.title")}
          description={t("gettingStarted.step2.description")}
        >
          <div className="h-16 md:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </StepCard>

        <StepCard
          step={3}
          title={t("gettingStarted.step3.title")}
          description={t("gettingStarted.step3.description")}
        >
          <div className="h-16 md:h-20 bg-gray-100 dark:bg-gray-700 rounded-lg" />
        </StepCard>
      </div>
    </section>
  );
}
